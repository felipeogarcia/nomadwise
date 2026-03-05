import { useState, useMemo } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useDocumentStore } from '@/stores/useDocumentStore'
import useDataStore from '@/stores/useDataStore'
import { DocumentCard } from './components/DocumentCard'
import { DocumentForm } from './components/DocumentForm'
import { DocumentRecord, DOCUMENT_TYPES } from '@/types/documents'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, ShieldCheck } from 'lucide-react'

export default function DocumentsPage() {
  const { documents, isLoading, addDocument, updateDocument, deleteDocument } = useDocumentStore()
  const { vehicles } = useDataStore()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<DocumentRecord | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [vehicleFilter, setVehicleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const handleAdd = () => {
    setEditingDoc(null)
    setIsFormOpen(true)
  }

  const handleEdit = (doc: DocumentRecord) => {
    setEditingDoc(doc)
    setIsFormOpen(true)
  }

  const handleSubmit = async (
    data: Omit<DocumentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    file?: File | null,
  ) => {
    if (editingDoc) {
      await updateDocument(editingDoc.id, data, file)
    } else {
      await addDocument(data, file)
    }
  }

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Name filter
      if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
      // Type filter
      if (typeFilter !== 'all' && doc.type !== typeFilter) return false
      // Vehicle filter
      if (vehicleFilter !== 'all' && doc.vehicle_id !== vehicleFilter) return false

      // Status filter
      if (statusFilter !== 'all') {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const expiry = doc.expiry_date ? new Date(doc.expiry_date) : null

        if (statusFilter === 'valid') {
          if (!expiry) return true // sem validade = valido
          return expiry >= today
        }
        if (statusFilter === 'expiring') {
          if (!expiry) return false
          const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
          return diffDays >= 0 && diffDays <= 90
        }
        if (statusFilter === 'expired') {
          if (!expiry) return false
          return expiry < today
        }
      }
      return true
    })
  }, [documents, searchTerm, typeFilter, vehicleFilter, statusFilter])

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cofre de Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Armazene e gerencie passaportes, CNH, CRLV e seguros com segurança.
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Documento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documento..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            {DOCUMENT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Veículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Veículos</SelectItem>
            <SelectItem value="">(Sem vínculo)</SelectItem>
            {vehicles.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                {v.nickname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="valid">Válidos</SelectItem>
            <SelectItem value="expiring">Vencendo em breve</SelectItem>
            <SelectItem value="expired">Vencidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ErrorBoundary>
        {isLoading && documents.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onEdit={handleEdit}
                onDelete={deleteDocument}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-xl border border-dashed">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Nenhum documento encontrado</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
              {documents.length === 0
                ? 'Seu cofre está vazio. Adicione seu primeiro documento para manter tudo organizado na estrada.'
                : 'Nenhum documento corresponde aos filtros selecionados.'}
            </p>
            {documents.length === 0 && (
              <Button onClick={handleAdd} variant="outline" className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Adicionar Agora
              </Button>
            )}
          </div>
        )}
      </ErrorBoundary>

      <DocumentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        document={editingDoc}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
