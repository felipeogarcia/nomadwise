import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react'
import { documentService } from '@/services/documentService'
import { DocumentRecord } from '@/types/documents'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'

interface DocumentState {
  documents: DocumentRecord[]
  isLoading: boolean
  alertsCount: number
  loadDocuments: () => Promise<void>
  addDocument: (
    data: Omit<DocumentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    file?: File | null,
  ) => Promise<void>
  updateDocument: (id: string, data: Partial<DocumentRecord>, file?: File | null) => Promise<void>
  deleteDocument: (id: string, filePath?: string | null) => Promise<void>
}

const DocumentContext = createContext<DocumentState | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const loadDocuments = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await documentService.getDocuments()
      setDocuments(data)
    } catch (e: any) {
      console.error(e)
      // Suppress error toast if it's just RLS or not setup yet, to avoid spam
      if (e.message !== 'Usuário não autenticado no Supabase') {
        toast({
          title: 'Erro',
          description: 'Falha ao carregar documentos.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

  const addDocument = async (
    data: Omit<DocumentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    file?: File | null,
  ) => {
    const tempId = crypto.randomUUID()
    const tempDoc: DocumentRecord = {
      ...data,
      id: tempId,
      user_id: user?.id || 'temp',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setDocuments((prev) => [tempDoc, ...prev])
    try {
      const saved = await documentService.addDocument(data, file)
      setDocuments((prev) => prev.map((d) => (d.id === tempId ? saved : d)))
      toast({ title: 'Sucesso', description: 'Documento salvo no cofre.' })
    } catch (e) {
      setDocuments((prev) => prev.filter((d) => d.id !== tempId))
      toast({ title: 'Erro', description: 'Falha ao salvar documento.', variant: 'destructive' })
      throw e
    }
  }

  const updateDocument = async (id: string, data: Partial<DocumentRecord>, file?: File | null) => {
    const previous = [...documents]
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)))
    try {
      const updated = await documentService.updateDocument(id, data, file)
      setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)))
      toast({ title: 'Atualizado', description: 'Documento atualizado com sucesso.' })
    } catch (e) {
      setDocuments(previous)
      toast({ title: 'Erro', description: 'Falha ao atualizar documento.', variant: 'destructive' })
      throw e
    }
  }

  const deleteDocument = async (id: string, filePath?: string | null) => {
    const previous = [...documents]
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    try {
      await documentService.deleteDocument(id, filePath)
      toast({ title: 'Removido', description: 'Documento removido do cofre.' })
    } catch (e) {
      setDocuments(previous)
      toast({ title: 'Erro', description: 'Falha ao remover documento.', variant: 'destructive' })
      throw e
    }
  }

  const alertsCount = useMemo(() => {
    const today = new Date().getTime()
    const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000

    return documents.filter((doc) => {
      if (!doc.expiry_date) return false
      const expiryTime = new Date(doc.expiry_date).getTime()
      return expiryTime - today <= ninetyDaysMs
    }).length
  }, [documents])

  return React.createElement(
    DocumentContext.Provider,
    {
      value: {
        documents,
        isLoading,
        alertsCount,
        loadDocuments,
        addDocument,
        updateDocument,
        deleteDocument,
      },
    },
    children,
  )
}

export function useDocumentStore() {
  const context = useContext(DocumentContext)
  if (context === undefined)
    throw new Error('useDocumentStore must be used within a DocumentProvider')
  return context
}
