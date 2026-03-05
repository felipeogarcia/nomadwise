import { supabase } from '@/lib/supabase/client'
import { DocumentRecord } from '@/types/documents'

export const documentService = {
  async getDocuments(): Promise<DocumentRecord[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado no Supabase')

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as DocumentRecord[]
  },

  async addDocument(
    document: Omit<DocumentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    file?: File | null,
  ): Promise<DocumentRecord> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const docId = crypto.randomUUID()
    let filePath = null

    if (file) {
      filePath = `${user.id}/${docId}/${file.name}`
      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file)

      if (uploadError) throw uploadError
    }

    const { data, error } = await supabase
      .from('documents')
      .insert({
        id: docId,
        user_id: user.id,
        ...document,
        file_path: filePath,
      })
      .select()
      .single()

    if (error) {
      // Rollback file upload if db insert fails
      if (filePath) await supabase.storage.from('documents').remove([filePath])
      throw error
    }
    return data as DocumentRecord
  },

  async updateDocument(
    id: string,
    updates: Partial<DocumentRecord>,
    file?: File | null,
  ): Promise<DocumentRecord> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    let filePath = updates.file_path

    if (file) {
      filePath = `${user.id}/${id}/${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError
      updates.file_path = filePath
    }

    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data as DocumentRecord
  },

  async deleteDocument(id: string, filePath?: string | null): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    if (filePath) {
      await supabase.storage.from('documents').remove([filePath])
    }

    const { error } = await supabase.from('documents').delete().eq('id', id).eq('user_id', user.id)

    if (error) throw error
  },

  async getSignedUrl(filePath: string): Promise<string> {
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(filePath, 1800) // 30 minutes

    if (error) throw error
    return data.signedUrl
  },
}
