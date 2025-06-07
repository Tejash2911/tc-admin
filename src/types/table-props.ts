export interface ColumnI {
  key: string
  label: string
  type?: 'text' | 'status' | 'date' | 'action' | 'copy' | 'image' | 'boolean' | 'select'
  width?: string
  render?: (item: any) => React.ReactElement
  options?: Array<{ label: string; value: string }>
}

export interface TableProps {
  data: any[]
  columns: ColumnI[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  onView?: (item: any) => void
  onChange?: (item: any, newValue: string) => void
  loading?: boolean
  skeletonRows?: number
}
