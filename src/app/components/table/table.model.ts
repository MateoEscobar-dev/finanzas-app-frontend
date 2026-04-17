export interface Column<T> {
  header: string
  accessor: string
  defaultCanSort?: boolean
  Cell?: ({ row }: CellFormatter<T>) => string
  type?: string
}

export interface TableInstance<T> {
  columns: Column<T>[]
  data: T[]
}

export interface CellFormatter<T> {
  row: T
}
