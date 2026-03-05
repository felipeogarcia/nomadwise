export type DocumentType = 'cnh' | 'pid' | 'crlv' | 'passport' | 'insurance' | 'other'

export interface DocumentRecord {
  id: string
  user_id: string
  vehicle_id?: string | null
  name: string
  type: DocumentType
  file_path?: string | null
  expiry_date?: string | null
  created_at: string
  updated_at: string
}

export const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'cnh', label: 'CNH' },
  { value: 'pid', label: 'PID (Internacional)' },
  { value: 'crlv', label: 'CRLV (Veículo)' },
  { value: 'passport', label: 'Passaporte' },
  { value: 'insurance', label: 'Seguro' },
  { value: 'other', label: 'Outros' },
]
