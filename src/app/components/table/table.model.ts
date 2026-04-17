export type Column<T> = {
  header: string
  accessor: string
  defaultCanSort?: boolean
  Cell?: ({ row }: CellFormatter<T>) => string
  type?: string
}

export type TableInstance<T> = {
  columns: Column<T>[]
  data: T[]
}

export type CellFormatter<T> = {
  row: T
}
