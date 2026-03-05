import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2.45.0'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    )

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Acesso negado.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    if (profile?.role !== 'eliter') {
      return new Response(JSON.stringify({ error: 'Acesso negado.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const { quiz_id, assignment_id, answers } = body

    if (!quiz_id || !assignment_id || !Array.isArray(answers)) {
      return new Response(JSON.stringify({ error: 'Dados invalidos.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: quiz, error: quizError } = await supabaseAdmin
      .from('step_quizzes')
      .select('id, passing_percentage, max_attempts, step_id')
      .eq('id', quiz_id)
      .single()

    if (quizError || !quiz) {
      return new Response(JSON.stringify({ error: 'Prova nao encontrada.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: assignment, error: assignmentError } = await supabaseAdmin
      .from('eliter_program_assignments')
      .select('id, eliter_id')
      .eq('id', assignment_id)
      .single()

    if (assignmentError || !assignment || assignment.eliter_id !== profile.id) {
      return new Response(JSON.stringify({ error: 'Acesso negado.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { count: attemptCount, error: countError } = await supabaseAdmin
      .from('eliter_quiz_attempts')
      .select('id', { count: 'exact', head: false })
      .eq('assignment_id', assignment_id)
      .eq('quiz_id', quiz_id)

    if (countError) throw countError

    const currentAttempts = attemptCount || 0
    if (currentAttempts >= quiz.max_attempts) {
      return new Response(
        JSON.stringify({ error: 'Voce ja usou todas as suas tentativas para esta prova.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const { data: questions, error: questionsError } = await supabaseAdmin
      .from('quiz_questions')
      .select('id, question_type')
      .eq('quiz_id', quiz_id)

    if (questionsError) throw questionsError

    const questionMap = new Map(questions.map((q: any) => [q.id, q.question_type]))
    const questionIds = questions.map((q: any) => q.id)
    const answeredQuestionIds = answers.map((a: any) => a.question_id)

    const missingAnswers = questionIds.some((id) => !answeredQuestionIds.includes(id))

    let hasInvalidAnswers = false
    for (const ans of answers) {
      const qType = questionMap.get(ans.question_id)
      if (qType === 'open_ended') {
        if (
          !ans.answer_text ||
          typeof ans.answer_text !== 'string' ||
          ans.answer_text.trim() === ''
        ) {
          hasInvalidAnswers = true
        }
      } else {
        if (!ans.selected_option_id) {
          hasInvalidAnswers = true
        }
      }
    }

    if (missingAnswers || questionIds.length !== answeredQuestionIds.length || hasInvalidAnswers) {
      return new Response(
        JSON.stringify({ error: 'Preencha todas as respostas antes de enviar.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const { data: correctOptions, error: optionsError } = await supabaseAdmin
      .from('question_options')
      .select('id, question_id')
      .in('question_id', questionIds)
      .eq('is_correct', true)

    if (optionsError) throw optionsError

    let auto_graded_correct = 0
    let auto_graded_total = 0
    let open_ended_count = 0
    const total_questions = questionIds.length

    const processedAnswers = answers.map((ans: any) => {
      const qType = questionMap.get(ans.question_id)
      let is_correct = false

      if (qType === 'open_ended') {
        open_ended_count++
        is_correct = false
      } else {
        auto_graded_total++
        const correctOption = correctOptions.find((opt: any) => opt.question_id === ans.question_id)
        is_correct = correctOption ? correctOption.id === ans.selected_option_id : false
        if (is_correct) auto_graded_correct++
      }

      return {
        question_id: ans.question_id,
        selected_option_id: qType === 'open_ended' ? null : ans.selected_option_id,
        answer_text: qType === 'open_ended' ? ans.answer_text : null,
        is_correct,
      }
    })

    const needs_review = open_ended_count > 0
    const percentage =
      total_questions > 0 ? Math.round((auto_graded_correct / total_questions) * 100) : 0
    const passed = needs_review ? false : percentage >= quiz.passing_percentage
    const attempt_number = currentAttempts + 1

    const { data: attempt, error: attemptInsertError } = await supabaseAdmin
      .from('eliter_quiz_attempts')
      .insert({
        assignment_id,
        quiz_id,
        attempt_number,
        total_questions,
        correct_answers: auto_graded_correct,
        percentage,
        passed,
        needs_review,
      })
      .select('id')
      .single()

    if (attemptInsertError) throw attemptInsertError

    const answersToInsert = processedAnswers.map((ans) => ({
      attempt_id: attempt.id,
      question_id: ans.question_id,
      selected_option_id: ans.selected_option_id,
      answer_text: ans.answer_text,
      is_correct: ans.is_correct,
    }))

    const { data: insertedAnswers, error: answersInsertError } = await supabaseAdmin
      .from('eliter_quiz_answers')
      .insert(answersToInsert)
      .select('id, question_id')

    if (answersInsertError) throw answersInsertError

    if (needs_review) {
      const reviewsToInsert = processedAnswers
        .filter((ans) => questionMap.get(ans.question_id) === 'open_ended')
        .map((ans) => {
          const insertedAns = insertedAnswers.find((ia: any) => ia.question_id === ans.question_id)
          return {
            answer_id: insertedAns.id,
            status: 'pending',
          }
        })

      if (reviewsToInsert.length > 0) {
        const { error: reviewsInsertError } = await supabaseAdmin
          .from('open_ended_reviews')
          .insert(reviewsToInsert)

        if (reviewsInsertError) throw reviewsInsertError
      }
    }

    if (passed && !needs_review) {
      await supabaseAdmin.from('eliter_step_progress').upsert(
        {
          assignment_id,
          step_id: quiz.step_id,
          status: 'completed',
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'assignment_id, step_id' },
      )
    }

    const remaining_attempts = quiz.max_attempts - attempt_number

    let message = ''
    if (needs_review) {
      message =
        'Sua prova foi enviada! As perguntas objetivas foram corrigidas automaticamente. As perguntas abertas serao avaliadas pelo seu gestor. Voce sera notificado quando a correcao estiver concluida.'
    } else if (passed) {
      message = `Parabens! Voce foi aprovado com ${percentage}% de acerto!`
    } else if (remaining_attempts > 0) {
      message = `Voce acertou ${percentage}%. Precisa de pelo menos ${quiz.passing_percentage}%. Voce ainda tem ${remaining_attempts} tentativa(s).`
    } else {
      message = `Voce nao atingiu a pontuacao minima e usou todas as tentativas. Entre em contato com seu gestor.`
    }

    const responsePayload = {
      passed,
      percentage,
      correct_answers: auto_graded_correct,
      total_questions,
      attempt_number,
      max_attempts: quiz.max_attempts,
      remaining_attempts,
      message,
      needs_review,
      auto_graded_correct,
      auto_graded_total,
      open_ended_count,
    }

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Erro interno ao processar a prova.', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
