import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, UploadCloud, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

import { DocumentRecord, DocumentType, DOCUMENT_TYPES } from '@/types/documents'
import useDataStore from '@/stores/useDataStore'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  type: z.string().min(1, 'Selecione um tipo de documento'),
  vehicle_id: z.string().optional().nullable(),
  expiry_date: z.string().optional().nullable(),
  file: z
    .any()
    .refine((files) => {
      if (!files || files.length === 0) return true
      return files[0]?.size <= MAX_FILE_SIZE
    }, 'Tamanho máximo permitido é 10MB.')
    .refine((files) => {
      if (!files || files.length === 0) return true
      return ACCEPTED_FILE_TYPES.includes(files[0]?.type)
    }, 'Apenas PDF, JPG e PNG são suportados.')
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface DocumentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document?: DocumentRecord | null
  onSubmit: (
    data: Omit<DocumentRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    file?: File | null,
  ) => Promise<void>
}

export function DocumentForm({ open, onOpenChange, document, onSubmit }: DocumentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { vehicles } = useDataStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: document?.name || '',
      type: document?.type || '',
      vehicle_id: document?.vehicle_id || '',
      expiry_date: document?.expiry_date ? document.expiry_date.split('T')[0] : '',
      file: undefined,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      form.setValue('file', files)
      form.trigger('file')
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    form.setValue('file', undefined)
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      const submitData = {
        name: values.name,
        type: values.type as DocumentType,
        vehicle_id: values.vehicle_id || null,
        expiry_date: values.expiry_date ? new Date(values.expiry_date).toISOString() : null,
      }

      await onSubmit(submitData, selectedFile)
      onOpenChange(false)
      form.reset()
      setSelectedFile(null)
    } catch (error) {
      // Error handled by store
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{document ? 'Editar Documento' : 'Novo Documento'}</DialogTitle>
          <DialogDescription>
            Armazene seus documentos de forma segura. Arquivos limitados a 10MB (PDF/Imagens).
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: CNH João, CRLV da Bessie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DOCUMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Vencimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="vehicle_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veículo Vinculado (Opcional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Nenhum veículo</SelectItem>
                      {vehicles.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.nickname} ({v.plate})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Arquivo Anexo</FormLabel>
                  <FormControl>
                    <div className="mt-2">
                      {!selectedFile && !document?.file_path ? (
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor="dropzone-file"
                            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Clique para enviar</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, PNG, JPG (Max 10MB)
                              </p>
                            </div>
                            <Input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              accept=".pdf,image/png,image/jpeg,image/jpg"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-md border p-3 bg-muted/20">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="h-5 w-5 shrink-0 text-primary" />
                            <span className="truncate text-sm font-medium">
                              {selectedFile ? selectedFile.name : 'Arquivo já salvo no cofre'}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleClearFile}
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {document ? 'Salvar Alterações' : 'Adicionar Documento'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
