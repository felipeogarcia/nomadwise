import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2.45.0'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { submission_id } = body

    if (!submission_id) {
      return new Response(JSON.stringify({ error: 'submission_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Check existing evaluation and update/create status
    const { data: existingEval } = await supabase
      .from('ai_evaluations')
      .select('id')
      .eq('submission_id', submission_id)
      .maybeSingle()

    let evalId
    if (existingEval) {
      evalId = existingEval.id
      await supabase.from('ai_evaluations').update({ status: 'processing' }).eq('id', evalId)
    } else {
      const { data: newEval, error: insertError } = await supabase
        .from('ai_evaluations')
        .insert({
          submission_id,
          status: 'processing',
          provider_used: 'unknown',
          overall_score: 0,
          justification: '',
          is_qualified: false,
        })
        .select('id')
        .single()

      if (insertError) throw insertError
      evalId = newEval.id
    }

    const failEvaluation = async (message: string) => {
      await supabase
        .from('ai_evaluations')
        .update({ status: 'error', error_message: message })
        .eq('id', evalId)
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 2. Fetch Data
    const { data: submission, error: subError } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('id', submission_id)
      .single()

    if (subError || !submission) return failEvaluation('Submission not found.')

    const { data: answers, error: ansError } = await supabase
      .from('form_answers')
      .select('*')
      .eq('submission_id', submission_id)

    if (ansError) return failEvaluation('Error fetching answers.')

    let candidateText = `Candidato: ${submission.candidate_name}\nEmail: ${submission.candidate_email}\nTelefone: ${submission.candidate_phone || 'N/A'}\n\n`

    if (answers && answers.length > 0) {
      const questionIds = answers.map((a: any) => a.question_id)
      const { data: questions } = await supabase
        .from('form_questions')
        .select('*')
        .in('id', questionIds)
      const { data: options } = await supabase
        .from('form_question_options')
        .select('*')
        .in('question_id', questionIds)

      for (const ans of answers) {
        const q = questions?.find((q: any) => q.id === ans.question_id)
        if (!q) continue
        candidateText += `Pergunta: ${q.question_text}\n`
        if (q.question_type === 'open_ended') {
          candidateText += `Resposta: ${ans.answer_text || 'N/A'}\n\n`
        } else {
          if (ans.selected_option_ids) {
            const optIds = ans.selected_option_ids.split(',').map((id: string) => id.trim())
            const selectedOpts = options
              ?.filter((o: any) => optIds.includes(o.id))
              .map((o: any) => o.option_text)
            candidateText += `Resposta: ${selectedOpts?.join(', ') || 'N/A'}\n\n`
          } else {
            candidateText += `Resposta: N/A\n\n`
          }
        }
      }
    }

    // 3. AI Config
    const { data: aiConfig } = await supabase
      .from('ai_config')
      .select('provider')
      .eq('is_active', true)
      .maybeSingle()

    const provider = aiConfig?.provider || 'gemini'

    // 4. Prompt
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    const systemPrompt = `Voce e um assistente automatizado de avaliacao de candidatos responsavel por analisar o formulario de UM unico candidato para uma vaga na Adapta (Adapta Elite). A DATA DE HOJE E: ${dataAtual}. Sua missao e avaliar o fit cultural (CARVIE), qualificacao tecnica e comportamental deste candidato, aplicar os criterios de pre-filtragem e retornar APENAS a nota final (Overall Score) e a justificativa. Voce deve agir de forma objetiva, consistente e deterministica. CRITERIOS DE AVALIACAO (Calcule internamente): 1. PRE-FILTRAGEM (ELIMINATORIA): O candidato deve ser imediatamente DESQUALIFICADO (Overall Score = 0) se ocorrer QUALQUER uma destas situacoes: - A data de nascimento estiver vazia ou ausente. - A idade calculada (usando a data de hoje e a data de nascimento do candidato) for maior que 27 anos (ele deve ter 27 anos ou menos). - Nao comprovar experiencia em IA Generativa. - Nao comprovar experiencia em Engenharia de Prompts. - Nao demonstrar habilidade minima de comunicacao tecnica. Nota: Se desqualificado, a nota final e obrigatoriamente 0 e o motivo exato deve constar na justificativa. 2. JOB FIT SCORE (Peso 60% da nota final): Avalie Engenharia de Prompts (peso 5), Treinamento e Comunicacao (peso 4), Inovacao (peso 3), Gestao de Projetos (peso 3) e Automacao No/Low Code (peso 4). 3. CARVIE (Peso 30% da nota final): Avalie Curiosidade, Adaptabilidade, Responsabilidade, Velocidade, Iniciativa e Excelencia. 4. EVIDENCIA DE RESULTADOS (Peso 10% da nota final): Avalie profundidade dos projetos, senioridade e impacto. FORMATO DE SAIDA OBRIGATORIO: Responda APENAS com um JSON valido contendo exatamente dois campos: overall_score (numero inteiro de 0 a 100) e justification (string com a justificativa completa em portugues). Nao inclua nenhum texto antes ou depois do JSON. Voce DEVE obrigatoriamente realizar o calculo da idade passo a passo e pensar sobre as competencias ANTES de dar a nota final de 0 a 100.`

    // 5. AI Call with Retries
    let aiResponseRaw = ''
    try {
      const fetchAI = async () => {
        let attempt = 0
        while (attempt < 2) {
          let res
          if (provider === 'openai') {
            const key = Deno.env.get('OPENAI_API_KEY')
            if (!key) throw new Error('OPENAI_API_KEY missing')
            res = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.3,
                response_format: { type: 'json_object' },
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: candidateText },
                ],
              }),
            })
          } else {
            const key = Deno.env.get('GEMINI_API_KEY')
            if (!key) throw new Error('GEMINI_API_KEY missing')
            res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: candidateText }] }],
                  systemInstruction: { parts: [{ text: systemPrompt }] },
                  generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
                }),
              },
            )
          }

          if (res.ok) {
            const data = await res.json()
            if (provider === 'openai') {
              return data.choices[0].message.content
            } else {
              return data.candidates[0].content.parts[0].text
            }
          }

          if (res.status === 429) {
            if (attempt === 0) {
              await new Promise((r) => setTimeout(r, 3000))
              attempt++
              continue
            }
            throw new Error(
              'Limite de requisicoes da IA atingido. Tente novamente em alguns minutos.',
            )
          } else if (res.status === 500 || res.status === 503) {
            if (attempt === 0) {
              await new Promise((r) => setTimeout(r, 2000))
              attempt++
              continue
            }
            throw new Error(`Erro no servidor da IA (${res.status}).`)
          } else if (res.status === 400 || res.status === 401) {
            throw new Error('Erro de autenticacao com a IA. Verifique a chave de API.')
          } else {
            throw new Error(`Erro desconhecido da IA: ${res.status}`)
          }
        }
      }

      aiResponseRaw = (await fetchAI()) || ''
    } catch (error: any) {
      return failEvaluation(error.message)
    }

    // 6. Parsing
    let parsedResult: any = null
    try {
      parsedResult = JSON.parse(aiResponseRaw)
    } catch (e) {
      const match = aiResponseRaw.match(/\{[\s\S]*\}/)
      if (match) {
        try {
          parsedResult = JSON.parse(match[0])
        } catch (e2) {}
      }
    }

    if (
      !parsedResult ||
      typeof parsedResult.overall_score !== 'number' ||
      parsedResult.overall_score < 0 ||
      parsedResult.overall_score > 100 ||
      !parsedResult.justification
    ) {
      return failEvaluation('Resposta da IA em formato invalido.')
    }

    const isQualified = parsedResult.overall_score > 65

    // 7. Save Result & Pipeline
    await supabase
      .from('ai_evaluations')
      .update({
        provider_used: provider,
        overall_score: parsedResult.overall_score,
        justification: parsedResult.justification,
        is_qualified: isQualified,
        raw_response: aiResponseRaw,
        status: 'completed',
        error_message: null,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', evalId)

    if (isQualified) {
      const { data: existingPipe } = await supabase
        .from('pipeline_candidates')
        .select('id')
        .eq('submission_id', submission_id)
        .maybeSingle()

      if (!existingPipe) {
        await supabase.from('pipeline_candidates').insert({
          submission_id,
          evaluation_id: evalId,
          stage: 'candidatos',
          position: 0,
        })
      }
    }

    // 8. Update Submission Status
    await supabase.from('form_submissions').update({ status: 'reviewed' }).eq('id', submission_id)

    return new Response(
      JSON.stringify({
        submission_id,
        overall_score: parsedResult.overall_score,
        is_qualified: isQualified,
        justification: parsedResult.justification,
        provider_used: provider,
        status: 'completed',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
