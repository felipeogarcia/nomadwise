import { FileText, MoreVertical, Edit2, Trash2, Eye, ExternalLink, Car } from 'lucide-react'
import { DocumentRecord, DOCUMENT_TYPES } from '@/types/documents'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExpirationBadge } from './ExpirationBadge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useDataStore from '@/stores/useDataStore'
import { documentService } from '@/services/documentService'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'

interface DocumentCardProps {
  document: DocumentRecord
  onEdit: (doc: DocumentRecord) => void
  onDelete: (id: string, path?: string | null) => void
}

export function DocumentCard({ document, onEdit, onDelete }: DocumentCardProps) {
  const { vehicles } = useDataStore()
  const [isOpening, setIsOpening] = useState(false)

  const vehicle = document.vehicle_id ? vehicles.find((v) => v.id === document.vehicle_id) : null
  const typeLabel = DOCUMENT_TYPES.find((t) => t.value === document.type)?.label || 'Documento'

  const handleView = async () => {
    if (!document.file_path) {
      toast({ description: 'Nenhum arquivo anexado a este documento.' })
      return
    }
    try {
      setIsOpening(true)
      const url = await documentService.getSignedUrl(document.file_path)
      window.open(url, '_blank')
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir o arquivo.',
        variant: 'destructive',
      })
    } finally {
      setIsOpening(false)
    }
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-md animate-fade-in-up">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h3
              className="font-semibold leading-none tracking-tight line-clamp-1"
              title={document.name}
            >
              {document.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5">{typeLabel}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView} disabled={!document.file_path || isOpening}>
              <Eye className="mr-2 h-4 w-4" /> Visualizar Arquivo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(document)}>
              <Edit2 className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(document.id, document.file_path)}
              className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 p-5 pt-0">
        <div className="flex flex-col gap-3 mt-2">
          {vehicle && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Car className="h-4 w-4" />
              <span>
                {vehicle.nickname} ({vehicle.plate})
              </span>
            </div>
          )}
          <div className="flex items-center mt-1">
            <ExpirationBadge expiryDate={document.expiry_date} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex justify-end border-t bg-muted/20 px-5 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
          onClick={handleView}
          disabled={!document.file_path || isOpening}
        >
          {isOpening ? 'Aberto...' : 'Acessar'} <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}
