import { BehaviorSubject, Observable } from 'rxjs'
import { CommonService } from '@/app/core/service/common.service'

/**
 * Interfaz para la respuesta de listado con paginación del backend
 */
export interface IPaginatedResponse<T> {
  data: T[]
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number
  to: number
}

/**
 * Configuración para el controlador CRUD
 */
export interface ICrudConfig<T> {
  service: CommonService<T>
  modulePermission: string // ej: 'users', 'roles'
  pageSize?: number
  initialQuery?: any
}

/**
 * Estado del CRUD
 */
export interface ICrudState<T> {
  items: T[]
  isLoading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  total: number
  lastPage: number
  selectedItem: T | null
}

/**
 * Controlador de CRUD genérico
 * Maneja listados, paginación y llamadas al servicio
 */
export class CrudController<T = any> {
  private stateSubject = new BehaviorSubject<ICrudState<T>>({
    items: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    lastPage: 1,
    selectedItem: null,
  })

  constructor(private config: ICrudConfig<T>) {}

  // =========================================
  // GETTERS
  // =========================================

  get state(): ICrudState<T> {
    return this.stateSubject.value
  }

  get state$(): Observable<ICrudState<T>> {
    return this.stateSubject.asObservable()
  }

  get items(): T[] {
    return this.state.items
  }

  get isLoading(): boolean {
    return this.state.isLoading
  }

  get currentPage(): number {
    return this.state.currentPage
  }

  get pageSize(): number {
    return this.state.pageSize
  }

  get total(): number {
    return this.state.total
  }

  get lastPage(): number {
    return this.state.lastPage
  }

  // =========================================
  // MÉTODOS DE ESTADO
  // =========================================

  private updateState(partial: Partial<ICrudState<T>>): void {
    this.stateSubject.next({
      ...this.state,
      ...partial,
    })
  }

  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading })
  }

  setError(error: string | null): void {
    this.updateState({ error })
  }

  setItems(items: T[]): void {
    this.updateState({ items })
  }

  setPageSize(pageSize: number): void {
    this.updateState({ pageSize })
  }

  // =========================================
  // LISTADO CON PAGINACIÓN
  // =========================================

  /**
   * Cargar listado de items con paginación del backend
   */
  loadItems(page: number = 1, pageSize: number = this.config.pageSize || 10): Observable<any> {
    this.updateState({ isLoading: true, error: null, currentPage: page, pageSize })

    return new Observable((observer) => {
      // Crear condiciones para paginación
      const options = {
        skip: (page - 1) * pageSize,
        take: pageSize,
      }

      this.config.service.getAll<T>(options).subscribe({
        next: (response: any) => {
          // Transformar respuesta del backend (estructura personalizada)
          // Backend devuelve: { data: { records: [...], pagination: {...} }, status, message, code }
          let items: T[] = []
          let total = 0
          let lastPage = 1

          if (response && response.data) {
            // Si viene dentro de data.records (estructura personalizada del backend)
            if (response.data.records && Array.isArray(response.data.records)) {
              items = response.data.records
              total = response.data.pagination?.total || response.data.records.length
              lastPage = response.data.pagination?.pages || Math.ceil(total / pageSize)
            }
            // Si es un array simple
            else if (Array.isArray(response.data)) {
              items = response.data
              total = items.length
              lastPage = Math.ceil(total / pageSize)
            }
          }
          // Si la respuesta es un array directo (estructura Laravel estándar)
          else if (Array.isArray(response)) {
            items = response
            total = items.length
            lastPage = Math.ceil(total / pageSize)
          }

          this.updateState({
            items,
            total,
            lastPage,
            isLoading: false,
            currentPage: page,
            pageSize,
          })

          observer.next({ items, total, lastPage })
        },
        error: (err) => {
          const errorMsg = err?.message || 'Error al cargar datos'
          this.updateState({ error: errorMsg, isLoading: false })
          observer.error(err)
        },
      })
    })
  }

  /**
   * Obtener un item por ID
   */
  getById(id: number): Observable<T> {
    this.setLoading(true)
    return new Observable((observer) => {
      this.config.service.getById<T>(id).subscribe({
        next: (response: any) => {
          this.setLoading(false)

          // Transformar respuesta del backend (estructura personalizada)
          // Backend devuelve: { data: {...}, status, message, code } o { data: {...} }
          let item: T = response

          if (response && typeof response === 'object') {
            // Si viene dentro de data (estructura personalizada del backend)
            if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
              item = response.data
            }
          }

          this.updateState({ selectedItem: item })
          observer.next(item)
        },
        error: (err) => {
          this.setLoading(false)
          this.setError(err?.message || 'Error al obtener registro')
          observer.error(err)
        },
      })
    })
  }

  // =========================================
  // CREAR
  // =========================================

  /**
   * Crear un nuevo item
   */
  create(data: T): Observable<any> {
    this.setLoading(true)
    return new Observable((observer) => {
      this.config.service.insert(data).subscribe({
        next: (response) => {
          this.setLoading(false)
          // Recargar listado
          this.loadItems(1, this.pageSize).subscribe()
          observer.next(response)
        },
        error: (err) => {
          this.setLoading(false)
          this.setError(err?.message || 'Error al crear registro')
          observer.error(err)
        },
      })
    })
  }

  // =========================================
  // ACTUALIZAR
  // =========================================

  /**
   * Actualizar un item existente
   */
  update(id: number, data: T): Observable<T> {
    this.setLoading(true)
    return new Observable((observer) => {
      this.config.service.update(id, data).subscribe({
        next: (updatedItem) => {
          this.setLoading(false)
          // Recargar listado
          this.loadItems(this.currentPage, this.pageSize).subscribe()
          observer.next(updatedItem)
        },
        error: (err) => {
          this.setLoading(false)
          this.setError(err?.message || 'Error al actualizar registro')
          observer.error(err)
        },
      })
    })
  }

  // =========================================
  // ELIMINAR
  // =========================================

  /**
   * Eliminar un item
   */
  delete(id: number): Observable<any> {
    this.setLoading(true)
    return new Observable((observer) => {
      this.config.service.delete(id).subscribe({
        next: (response) => {
          this.setLoading(false)
          // Recargar listado
          this.loadItems(this.currentPage, this.pageSize).subscribe()
          observer.next(response)
        },
        error: (err) => {
          this.setLoading(false)
          this.setError(err?.message || 'Error al eliminar registro')
          observer.error(err)
        },
      })
    })
  }

  // =========================================
  // UTILIDADES
  // =========================================

  /**
   * Limpiar estado
   */
  clear(): void {
    this.stateSubject.next({
      items: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      pageSize: this.config.pageSize || 10,
      total: 0,
      lastPage: 1,
      selectedItem: null,
    })
  }
}
