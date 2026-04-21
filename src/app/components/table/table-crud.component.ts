import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
  HostListener,
} from '@angular/core'
import { Column } from './table.model'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import {
  NgbRatingModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { NgApexchartsModule } from 'ng-apexcharts'
import { PermissionService } from '@/app/core/service/permission.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TranslateModule } from '@ngx-translate/core'

/**
 * Configuración para el componente TableComponent
 * Define cómo debe comportarse la tabla CRUD
 */
export interface ITableConfig<T> {
  // Datos y estructura
  columns: Column<T>[]
  data?: T[]

  // Paginación
  pageSize?: number
  enablePagination?: boolean

  // Búsqueda
  searchable?: boolean

  // CRUD
  enableCreate?: boolean
  enableEdit?: boolean
  enableDelete?: boolean
  enableView?: boolean
  enableHistory?: boolean

  // Activar/Desactivar
  enableActivate?: boolean // Mostrar botones de activar/desactivar
  activeFieldName?: string // Campo que indica si está activo (ej: 'active')
  onActivateClick?: (row: T) => void
  onDeactivateClick?: (row: T) => void

  // Permisos
  permissionModule?: string // ej: 'users', 'roles'

  // Callbacks
  onCreateClick?: () => void
  onEditClick?: (row: T) => void
  onDeleteClick?: (row: T) => void
  onViewClick?: (row: T) => void
  onHistoryClick?: (row: T) => void

  // Estilos
  tableClass?: string
  theadClass?: string
  // Botones personalizados a mostrar junto a las acciones principales
  customButtons?: CustomButton<T>[]
  // Botones de acción por fila (emiten rowAction con action=id)
  rowActionButtons?: RowActionButton[]
}

// Definición de botón personalizado
export interface CustomButton<_T = any> {
  id?: string
  label: string
  icon?: string
  url: string
  target?: string
  permission?: string
  class?: string
}

/**
 * Botón de acción por fila (emite rowAction con la acción definida)
 */
export interface RowActionButton {
  action: string           // ID de la acción (se emite en rowAction)
  label: string            // Clave i18n para tooltip
  icon: string             // Clase MDI, ej: 'mdi mdi-shield-account'
  class?: string           // CSS class del botón, ej: 'btn-primary'
  permission?: string      // Permiso requerido para mostrar el botón
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NgbRatingModule,
    FormsModule,
    NgApexchartsModule,
    NgbPaginationModule,
    TranslateModule,
  ],
  templateUrl: './table-crud.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T = any> implements OnInit, OnDestroy {
  // =========================================
  // INYECCIONES
  // =========================================
  private sanitizer = inject(DomSanitizer)
  private permissionService = inject(PermissionService)
  private destroy$ = new Subject<void>()

  // =========================================
  // INPUTS (CONFIGURACIÓN)
  // =========================================
  @Input() set config(value: ITableConfig<T>) {
    this._config = value
    // ✅ Actualizar pageSize desde config
    if (value.pageSize) {
      this.pageSize = value.pageSize
    }
    // ✅ Dispara actualización cuando cambia la config
    this.updateTable()
  }

  get config(): ITableConfig<T> {
    return this._config
  }

  private _config: ITableConfig<T> = {
    columns: [],
    pageSize: 10,
    enablePagination: true,
    searchable: true,
    enableCreate: true,
    enableEdit: true,
    enableDelete: true,
    permissionModule: 'users',
    customButtons: [],
  }

  // Para compatibilidad con versión anterior
  @Input() set tableClass(value: string) {
    if (this.config) this.config.tableClass = value
  }
  @Input() set theadClass(value: string) {
    if (this.config) this.config.theadClass = value
  }
  @Input() set columns(value: Column<T>[]) {
    if (this.config) this.config.columns = value
  }
  @Input() set data(value: T[]) {
    if (this.config) this.config.data = value
    this.updateTable()
  }
  @Input() set itemsPerPage(value: number) {
    if (this.config) this.config.pageSize = value
  }
  @Input() set searchable(value: boolean) {
    if (this.config) this.config.searchable = value
  }
  @Input() set pagination(value: boolean) {
    if (this.config) this.config.enablePagination = value
  }

  // =========================================
  // OUTPUTS (EVENTOS)
  // =========================================
  @Output() rowAction = new EventEmitter<{ action: string; data: T }>()
  @Output() pageChange = new EventEmitter<number>()
  @Output() search = new EventEmitter<string>()

  // =========================================
  // HOST LISTENERS
  // =========================================
  @HostListener('click', ['$event'])
  onHostClick(event: Event) {
    const target = event.target as HTMLElement

    // Buscar el botón que contiene data-action (puede ser el elemento clickeado o un ancestro)
    let actionElement = target
    if (!actionElement.hasAttribute('data-action')) {
      // Si el elemento no tiene data-action, buscar en sus ancestros
      actionElement = actionElement.closest('[data-action]') as HTMLElement
    }

    if (actionElement && actionElement.hasAttribute('data-action')) {
      const action = actionElement.getAttribute('data-action')
      const rowId = actionElement.getAttribute('data-row-id')
      if (action && rowId && this.config.data) {
        const row = this.config.data.find((r) => (r as any).id == rowId)
        if (row) {
          this.rowAction.emit({ action, data: row })
        }
      }
    }
  }

  // =========================================
  // PROPIEDADES DE ESTADO
  // =========================================
  sortConfig = { key: '', direction: '' }
  activePage = 1
  totalPages = 0
  pageSize = 10
  searchQuery = ''

  isLoading = false
  totalRecords = 0

  paginatedData: T[] = []
  sortedData: T[] = []
  filteredData: T[] = []

  // =========================================
  // PERMISOS
  // =========================================
  canList = true
  canCreate = false
  canEdit = false
  canDelete = false
  canView = false
  canHistory = false
  canActivate = false

  ngOnInit(): void {
    this.pageSize = this.config.pageSize || 10
    this.initializePermissions()
    this.updateTable()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // =========================================
  // INICIALIZACIÓN Y PERMISOS
  // =========================================

  private initializePermissions(): void {
    if (!this.config.permissionModule) {
      this.canCreate = true
      this.canEdit = true
      this.canDelete = true
      this.canView = true
      this.canHistory = true
      this.canActivate = true
      return
    }

    const module = this.config.permissionModule

    // Verificar permisos según el módulo
    this.canList = this.permissionService.hasPermission(module)
    this.canCreate = this.permissionService.hasPermission(`${module}.add`)
    this.canEdit = this.permissionService.hasPermission(`${module}.edit`)
    this.canDelete = this.permissionService.hasPermission(`${module}.destroy`)
    this.canView = this.permissionService.hasPermission(`${module}.view`)
    this.canHistory = this.permissionService.hasPermission(
      `${module}.historial`
    )
    this.canActivate = this.permissionService.hasPermission(
      `${module}.activate`
    )

    // Escuchar cambios de permisos
    this.permissionService.permissions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.canList = this.permissionService.hasPermission(module)
        this.canCreate = this.permissionService.hasPermission(`${module}.add`)
        this.canEdit = this.permissionService.hasPermission(`${module}.edit`)
        this.canDelete = this.permissionService.hasPermission(
          `${module}.destroy`
        )
        this.canView = this.permissionService.hasPermission(`${module}.view`)
        this.canHistory = this.permissionService.hasPermission(
          `${module}.historial`
        )
        this.canActivate = this.permissionService.hasPermission(
          `${module}.activate`
        )
      })
  }

  // =========================================
  // TABLA (FUNCIONALIDAD BÁSICA)
  // =========================================

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  handleSort(key: string): void {
    let direction = 'ascending'
    if (
      this.sortConfig.key === key &&
      this.sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    this.sortConfig = { key, direction }
    this.updateTable()
  }

  updateTable(): void {
    if (!this.config.data) return

    this.startIndex = (this.activePage - 1) * this.pageSize
    this.endIndex = this.startIndex + this.pageSize

    // Paginación
    this.paginatedData = this.config.data.slice(this.startIndex, this.endIndex)

    // Ordenamiento
    if (this.sortConfig.key) {
      const sortedArray = [...this.paginatedData]
      sortedArray.sort((a, b) => {
        const aVal = (a as any)[this.sortConfig.key]
        const bVal = (b as any)[this.sortConfig.key]

        if (aVal < bVal) {
          return this.sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (aVal > bVal) {
          return this.sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
      this.sortedData = sortedArray
    } else {
      this.sortedData = this.paginatedData
    }

    // Búsqueda
    this.searchTerm()

    // Actualizar total de páginas
    this.totalPages = Math.ceil((this.config.data?.length || 0) / this.pageSize)
  }

  searchTerm(): void {
    if (this.searchQuery.trim()) {
      this.filteredData = this.sortedData.filter((item) => {
        const itemObj = item as any
        return Object.values(itemObj).some((value: any) =>
          value
            ?.toString?.()
            ?.toLowerCase?.()
            ?.includes(this.searchQuery.toLowerCase())
        )
      })
    } else {
      this.filteredData = this.sortedData
    }
    this.search.emit(this.searchQuery)
  }

  changePage(page: number): void {
    this.activePage = page
    this.updateTable()
    this.pageChange.emit(page)
  }

  generatePageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }

  private startIndex = 0
  private endIndex = 0

  // =========================================
  // ACCIONES CRUD
  // =========================================

  onCreateClick(): void {
    if (this.config.onCreateClick) {
      this.config.onCreateClick()
    } else {
      this.rowAction.emit({ action: 'create', data: {} as T })
    }
  }

  onEditClick(row: T): void {
    if (this.config.onEditClick) {
      this.config.onEditClick(row)
    } else {
      this.rowAction.emit({ action: 'edit', data: row })
    }
  }

  onDeleteClick(row: T): void {
    if (this.config.onDeleteClick) {
      this.config.onDeleteClick(row)
    } else {
      this.rowAction.emit({ action: 'delete', data: row })
    }
  }

  onViewClick(row: T): void {
    if (this.config.onViewClick) {
      this.config.onViewClick(row)
    } else {
      this.rowAction.emit({ action: 'view', data: row })
    }
  }

  onHistoryClick(row: T): void {
    if (this.config.onHistoryClick) {
      this.config.onHistoryClick(row)
    } else {
      this.rowAction.emit({ action: 'history', data: row })
    }
  }

  onActivateClick(row: T): void {
    if (this.config.onActivateClick) {
      this.config.onActivateClick(row)
    } else {
      this.rowAction.emit({ action: 'activate', data: row })
    }
  }

  onDeactivateClick(row: T): void {
    if (this.config.onDeactivateClick) {
      this.config.onDeactivateClick(row)
    } else {
      this.rowAction.emit({ action: 'deactivate', data: row })
    }
  }

  // =========================================
  // HELPERS PARA ESTADO DE REGISTROS
  // =========================================

  isActive(row: T): boolean {
    if (!this.config.activeFieldName) return false
    const value = (row as any)[this.config.activeFieldName]
    // Soporta boolean true, string '1', number 1, etc.
    return value === true || value === 1 || value === '1'
  }

  isInactive(row: T): boolean {
    if (!this.config.activeFieldName) return false
    const value = (row as any)[this.config.activeFieldName]
    // Soporta boolean false, string '0', number 0, null, undefined, etc.
    return value === false || value === 0 || value === '0' || !value
  }

  // =========================================
  // UTILIDADES
  // =========================================

  // Comprueba si un botón personalizado debe mostrarse según permisos
  canShowButton(btn: CustomButton<T> | undefined): boolean {
    if (!btn) return false
    if (!btn.permission) return true
    return this.permissionService.hasPermission(btn.permission)
  }

  // Comprueba si un botón de acción por fila debe mostrarse según permisos
  canShowRowActionButton(btn: RowActionButton): boolean {
    if (!btn.permission) return true
    return this.permissionService.hasPermission(btn.permission)
  }

  // Emite acción personalizada por fila
  onRowActionButtonClick(btn: RowActionButton, row: T): void {
    this.rowAction.emit({ action: btn.action, data: row })
  }

  getColumnValue(row: T, accessor: string): any {
    return (row as any)[accessor]
  }
}
