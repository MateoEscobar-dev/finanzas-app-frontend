import { Component, inject, OnInit } from '@angular/core'
import { PagetitleComponent } from '@shared/page-title/page-title.component'
import { TableComponent } from '@/app/components/table/table-crud.component'
import { GenericModalComponent } from '@/app/shared/generic-modal/generic-modal.component'
import { HistoryModalComponent } from '@/app/shared/history-modal/history-modal.component'
import { UserService } from '@/app/services/system/configuration/users.service'
import { RolesService } from '@/app/services/permissions/roles.service'
import { PermissionsService } from '@/app/services/permissions/permissions.service'
import {
  baseComponent,
  IFormField,
} from '@/app/shared/base-component/base-component'
import { TranslateModule } from '@ngx-translate/core'
import { Column } from '@/app/components/table/table.model'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'
import { CryptoService } from '@/app/services/crypto/crypto.service'
import { RowActionButton } from '@/app/components/table/table-crud.component'
import { environment } from '@/environments/environment'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    PagetitleComponent,
    TableComponent,
    GenericModalComponent,
    HistoryModalComponent,
    TranslateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent extends baseComponent implements OnInit {
  private userService = inject(UserService)
  private rolesService = inject(RolesService)
  private permissionsService = inject(PermissionsService)
  private cryptoService = inject(CryptoService)

  // Lista de roles disponibles
  protected roles: { value: string; label: string }[] = []
  protected isLoadingRoles = false

  // =========================================
  // PERMISOS DIRECTOS
  // =========================================
  protected isPermissionsModalVisible = false
  protected permissionsLoading = false
  protected permissionsSaving = false
  protected selectedUserId: number | null = null
  protected selectedUserLabel = ''
  protected allPermissions: { name: string; module: string }[] = []
  protected userDirectPermissions: string[] = []
  protected userRolePermissions: string[] = []
  // Agrupados por módulo
  protected permissionsByModule: Record<string, { name: string; checked: boolean }[]> = {}

  // =========================================
  // CONFIGURACIÓN DEL MÓDULO
  // =========================================
  protected override modulePermission = 'users'

  override ngOnInit() {
    this.loadRoles()
    super.ngOnInit()
  }

  // =========================================
  // CARGAR ROLES
  // =========================================

  protected loadRoles(): void {
    this.isLoadingRoles = true
    this.rolesService.getAll<any>({ take: 100 }).subscribe({
      next: (response: any) => {
        this.isLoadingRoles = false
        if (response?.data?.records && Array.isArray(response.data.records)) {
          this.roles = response.data.records.map((role: any) => ({
            value: String(role.id),
            label: role.name,
          }))
        } else if (Array.isArray(response)) {
          this.roles = response.map((role: any) => ({
            value: String(role.id),
            label: role.name,
          }))
        }
      },
      error: (err: any) => {
        this.isLoadingRoles = false
        console.error('Error loading roles:', err)
      },
    })
  }

  // =========================================
  // IMPLEMENTACIÓN DE MÉTODOS ABSTRACTOS
  // =========================================

  protected override getService() {
    return this.userService
  }

  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.userService,
      modulePermission: this.modulePermission,
      pageSize: this.pageSize,
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.document', accessor: 'document', defaultCanSort: true },
      { header: 'columns.first_name', accessor: 'first_name', defaultCanSort: true },
      { header: 'columns.second_name', accessor: 'second_name', defaultCanSort: false },
      {
        header: 'columns.first_last_name',
        accessor: 'first_last_name',
        defaultCanSort: true,
      },
      {
        header: 'columns.second_last_name',
        accessor: 'second_last_name',
        defaultCanSort: false,
      },
      { header: 'columns.email', accessor: 'email', defaultCanSort: true },
      { header: 'columns.phone', accessor: 'phone', defaultCanSort: false },
      { header: 'columns.birth_day', accessor: 'birth_day', defaultCanSort: false },
      {
        header: 'columns.status',
        accessor: 'active',
        Cell: ({ row }) => {
          const active = (row as any).active
          const statusText = active
            ? this.translateService.instant('status.active')
            : this.translateService.instant('status.inactive')
          const statusClass = active ? 'bg-success' : 'bg-danger'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
    ]
  }

  protected override defineFormFields(): IFormField[] {
    const isCreate = this.modalMode === 'create'
    return [
      {
        name: 'id',
        label: 'columns.id',
        type: 'text',
        required: false,
        hidden: true,
        colSize: 'col-12',
      },
      {
        name: 'document',
        label: 'columns.document',
        type: 'text',
        required: true,
        placeholder: '1234567890',
        colSize: 'col-6',
      },
      {
        name: 'first_name',
        label: 'columns.first_name',
        type: 'text',
        required: true,
        placeholder: 'Juan',
        colSize: 'col-6',
      },
      {
        name: 'second_name',
        label: 'columns.second_name',
        type: 'text',
        required: false,
        placeholder: 'Carlos',
        colSize: 'col-6',
      },
      {
        name: 'first_last_name',
        label: 'columns.first_last_name',
        type: 'text',
        required: true,
        placeholder: 'Pérez',
        colSize: 'col-6',
      },
      {
        name: 'second_last_name',
        label: 'columns.second_last_name',
        type: 'text',
        required: false,
        placeholder: 'García',
        colSize: 'col-6',
      },
      {
        name: 'email',
        label: 'columns.email',
        type: 'email',
        required: true,
        placeholder: 'usuario@ejemplo.com',
        colSize: 'col-6',
      },
      {
        name: 'password',
        label: 'labels.password',
        type: 'password',
        required: isCreate,
        placeholder: '••••••••',
        colSize: 'col-6',
      },
      {
        name: 'phone',
        label: 'columns.phone',
        type: 'text',
        required: true,
        placeholder: '+573001234567',
        colSize: 'col-6',
      },
      {
        name: 'phone_ext',
        label: 'columns.phone_ext',
        type: 'text',
        required: false,
        placeholder: '101',
        colSize: 'col-3',
      },
      {
        name: 'birth_day',
        label: 'columns.birth_day',
        type: 'date',
        required: true,
        colSize: 'col-6',
      },
      {
        name: 'roles',
        label: 'columns.roles',
        type: 'multiselect',
        required: false,
        colSize: 'col-12',
        options:
          this.roles.length > 0
            ? this.roles
            : [{ label: this.translateService.instant('labels.loading'), value: '' }],
      },
    ]
  }

  protected override getItemLabel(item: any): string {
    const name = [item.first_name, item.first_last_name].filter(Boolean).join(' ')
    return name || item.email || `Usuario #${item.id}`
  }

  // Botón extra: Gestionar permisos directos
  protected override defineRowActionButtons(): RowActionButton[] {
    return [
      {
        action: 'permissions',
        label: 'labels.direct_permissions',
        icon: 'mdi mdi-shield-account',
        class: 'btn-primary',
        permission: `${this.modulePermission}.edit`,
      },
    ]
  }

  protected override onCustomAction(action: string, data: any): void {
    if (action === 'permissions') {
      this.openPermissionsModal(data)
    }
  }

  // =========================================
  // MÉTODOS PERSONALIZADOS
  // =========================================

  protected override onEditClick(item: any): void {
    this.modalMode = 'edit'
    this.selectedItem = item

    if (item.id) {
      this.crud.getById(item.id).subscribe({
        next: (data: any) => {
          // Transformar roles objetos a array de IDs string
          if (data.roles && Array.isArray(data.roles)) {
            data.roles = data.roles.map((r: any) =>
              typeof r === 'object' ? String(r.id) : String(r)
            )
          }
          // Eliminar password del formulario en edición
          delete data.password

          this.selectedItem = data
          this.modalTitle = this.translateService.instant('actions.edit')
          this.openModal()
        },
        error: () =>
          this.showError(
            this.translateService.instant('errors.error'),
            this.translateService.instant('errors.load_record')
          ),
      })
    }
  }

  protected override onViewClick(item: any): void {
    this.modalMode = 'view'
    this.selectedItem = item

    if (item.id) {
      this.crud.getById(item.id).subscribe({
        next: (data: any) => {
          if (data.roles && Array.isArray(data.roles)) {
            data.roles = data.roles.map((r: any) =>
              typeof r === 'object' ? String(r.id) : String(r)
            )
          }
          delete data.password
          this.selectedItem = data
          this.modalTitle = this.translateService.instant('actions.view')
          this.openModal()
        },
        error: () =>
          this.showError(
            this.translateService.instant('errors.error'),
            this.translateService.instant('errors.load_record')
          ),
      })
    }
  }

  protected override submitForm(formData: any): void {
    // Encriptar contraseña con AES antes de enviar
    if (formData.password && formData.password.trim() !== '') {
      formData.password = this.cryptoService.encrypt(
        formData.password,
        environment.encryptSecret
      )
    } else {
      // En edición, si no se ingresó nueva contraseña, eliminar el campo
      delete formData.password
    }

    super.submitForm(formData)
  }

  // =========================================
  // GESTIÓN DE PERMISOS DIRECTOS
  // =========================================

  openPermissionsModal(item: any): void {
    this.selectedUserId = item.id
    this.selectedUserLabel = this.getItemLabel(item)
    this.isPermissionsModalVisible = true
    this.permissionsLoading = true
    this.permissionsByModule = {}

    // Cargar todos los permisos + permisos del usuario en paralelo
    let allPerms: any[] = []
    let userPermsData: any = null
    let loaded = 0

    const checkDone = () => {
      loaded++
      if (loaded === 2) {
        this.permissionsLoading = false
        this.userDirectPermissions = userPermsData?.data?.direct_permissions || []
        this.userRolePermissions = userPermsData?.data?.role_permissions || []
        this.buildPermissionsByModule(allPerms)
      }
    }

    this.permissionsService.getAll<any>({ take: 500 }).subscribe({
      next: (res: any) => {
        allPerms = res?.data?.records || (Array.isArray(res) ? res : [])
        checkDone()
      },
      error: () => {
        this.permissionsLoading = false
        this.showError(
          this.translateService.instant('errors.error'),
          'Error al cargar permisos'
        )
      },
    })

    this.userService.getUserPermissions(item.id).subscribe({
      next: (res: any) => {
        userPermsData = res
        checkDone()
      },
      error: () => {
        userPermsData = { data: { direct_permissions: [], role_permissions: [] } }
        checkDone()
      },
    })
  }

  private buildPermissionsByModule(perms: any[]): void {
    const grouped: Record<string, { name: string; checked: boolean }[]> = {}
    perms.forEach((p: any) => {
      const mod = p.module || 'general'
      if (!grouped[mod]) grouped[mod] = []
      grouped[mod].push({
        name: p.name,
        checked: this.userDirectPermissions.includes(p.name),
      })
    })
    this.permissionsByModule = grouped
  }

  get permissionsModuleKeys(): string[] {
    return Object.keys(this.permissionsByModule)
  }

  togglePermission(permName: string, checked: boolean): void {
    const mod = Object.keys(this.permissionsByModule).find((m) =>
      this.permissionsByModule[m].some((p) => p.name === permName)
    )
    if (!mod) return
    const perm = this.permissionsByModule[mod].find((p) => p.name === permName)
    if (perm) perm.checked = checked
  }

  saveDirectPermissions(): void {
    if (!this.selectedUserId) return
    this.permissionsSaving = true

    const selected: string[] = []
    Object.values(this.permissionsByModule).forEach((perms) => {
      perms.forEach((p) => { if (p.checked) selected.push(p.name) })
    })

    this.userService.syncUserPermissions(this.selectedUserId, selected).subscribe({
      next: () => {
        this.permissionsSaving = false
        this.showSuccess(this.translateService.instant('messages.updated_success'))
        this.closePermissionsModal()
      },
      error: (err: any) => {
        this.permissionsSaving = false
        this.showError(
          this.translateService.instant('errors.error'),
          err?.message || 'Error al guardar permisos'
        )
      },
    })
  }

  closePermissionsModal(): void {
    this.isPermissionsModalVisible = false
    this.permissionsByModule = {}
    this.selectedUserId = null
  }

  isRolePermission(permName: string): boolean {
    return this.userRolePermissions.includes(permName)
  }
}
