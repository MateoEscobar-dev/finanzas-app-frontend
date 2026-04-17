import { Component, inject, OnInit } from '@angular/core'
import { PagetitleComponent } from '@shared/page-title/page-title.component'
import { TableComponent } from '@/app/components/table/table-crud.component'
import { GenericModalComponent } from '@/app/shared/generic-modal/generic-modal.component'
import { HistoryModalComponent } from '@/app/shared/history-modal/history-modal.component'
import { ProgressModalComponent } from '@/app/shared/progress-modal/progress-modal.component'
import { ServerService } from '@/app/services/orchestration/server.service'
import { ServerOSService } from '@/app/services/orchestration/server-os.service'
import { ServerEnvironmentService } from '@/app/services/orchestration/server-environment.service'
import {
  baseComponent,
  IFormField,
} from '@/app/shared/base-component/base-component'
import { TranslateModule } from '@ngx-translate/core'
import { Column } from '@/app/components/table/table.model'
import { CommonModule } from '@angular/common'
import { IServer } from '@/app/interfaces/orchestration/server.interface'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'
import { SwalHelperService } from '@/app/core/service/swal-helper.service'
import { WebSocketService } from '@/app/core/service/websocket.service'

@Component({
  selector: 'app-servers',
  standalone: true,
  imports: [
    PagetitleComponent,
    TableComponent,
    GenericModalComponent,
    HistoryModalComponent,
    ProgressModalComponent,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.scss',
})
export class ServersComponent extends baseComponent implements OnInit {
  private serverService = inject(ServerService)
  private serverOSService = inject(ServerOSService)
  private serverEnvironmentService = inject(ServerEnvironmentService)
  private swalHelper = inject(SwalHelperService)
  private wsService = inject(WebSocketService)

  // Listas de catálogos
  protected operatingSystems: Array<{ value: number; label: string }> = []
  protected environments: Array<{ value: number; label: string }> = []
  protected isLoadingCatalogs = false

  // =========================================
  // PROPIEDADES DEL MODAL DE PROGRESO
  // =========================================
  protected isProgressModalVisible = false
  protected currentOperationId = ''
  protected progressModalTitle = ''

  // =========================================
  // PROPIEDADES DEL MODAL DE INSTALACIÓN
  // =========================================
  protected isInstallModalVisible = false
  protected installData = { domain: '', email: '' }
  protected currentServerToInstall: any = null

  // =========================================
  // PROPIEDADES DEL MODAL DE AGREGAR PROGRAMA
  // =========================================
  protected isAddProgramModalVisible = false
  protected addProgramData = { program_id: null, app_name: '', app_env: '', app_key: '', app_debug: false, app_url: '', telegram_bot_token: '', telegram_chat_ids: '' }
  protected currentServerForProgram: any = null
  protected availablePrograms: Array<{ value: number; label: string }> = []

  // =========================================
  // PROPIEDADES DEL MODAL DE CAMBIAR DOMINIO
  // =========================================
  protected isChangeDomainModalVisible = false
  protected changeDomainData = { domain: '' }
  protected currentServerForDomain: any = null

  // =========================================
  // CONFIGURACIÓN DEL MÓDULO
  // =========================================
  protected override modulePermission = 'servers'

  override ngOnInit() {
    this.loadCatalogs()
    super.ngOnInit()
    // Añadir botones personalizados junto al botón Crear (abren en _blank)
    if (this.tableConfig) {
      this.tableConfig = {
        ...this.tableConfig,
        customButtons: [
          {
            id: 'b1',
            label: 'open_bill',
            icon: 'mdi mdi-cart',
            url: 'https://bill.alexhost.com/cart/moldova/',
            class: 'btn-primary',
          },
          {
            id: 'b2',
            label: 'open_mi',
            icon: 'mdi mdi-web',
            url: 'https://mi.com.co/#',
            class: 'btn-info',
          },
          {
            id: 'b3',
            label: 'open_dns',
            icon: 'mdi mdi-earth',
            url: 'https://dnschecker.org/',
            class: 'btn-secondary',
          },
        ],
      }
    }
  }

  // =========================================
  // CARGAR CATÁLOGOS
  // =========================================

  protected loadCatalogs(): void {
    this.isLoadingCatalogs = true

    // Cargar Sistemas Operativos
    this.serverOSService.getAll<any>({ take: 100 }).subscribe({
      next: (response: any) => {
        this.operatingSystems = this.mapCatalogResponse(response)
      },
      error: (err: any) => {
        console.error('Error loading operating systems:', err)
      },
    })

    // Cargar Entornos
    this.serverEnvironmentService.getAll<any>({ take: 100 }).subscribe({
      next: (response: any) => {
        this.environments = this.mapCatalogResponse(response)
        this.isLoadingCatalogs = false
      },
      error: (err: any) => {
        console.error('Error loading environments:', err)
        this.isLoadingCatalogs = false
      },
    })
  }

  /**
   * Mapear respuesta del API a formato de opciones para selects
   */
  private mapCatalogResponse(
    response: any
  ): Array<{ value: number; label: string }> {
    if (response && Array.isArray(response)) {
      return response.map((item: any) => ({
        value: item.id,
        label: item.name,
      }))
    } else if (
      response?.data?.records &&
      Array.isArray(response.data.records)
    ) {
      return response.data.records.map((item: any) => ({
        value: item.id,
        label: item.name,
      }))
    }
    return []
  }

  // =========================================
  // IMPLEMENTACIÓN DE MÉTODOS ABSTRACTOS
  // =========================================

  protected override getService() {
    return this.serverService
  }

  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.serverService,
      modulePermission: this.modulePermission,
      pageSize: this.pageSize,
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.id', accessor: 'id', defaultCanSort: true },
      { header: 'columns.name', accessor: 'name', defaultCanSort: true },
      { header: 'columns.ip', accessor: 'ip', defaultCanSort: true },
      {
        header: 'columns.domain',
        accessor: 'domain',
        defaultCanSort: true,
      },
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
      {
        header: 'columns.installed',
        accessor: 'install',
        Cell: ({ row }) => {
          const install = (row as any).install
          const statusText = install
            ? this.translateService.instant('status.yes')
            : this.translateService.instant('status.not')
          const statusClass = install ? 'bg-info' : 'bg-warning'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
      {
        header: 'columns.program',
        accessor: 'program',
        Cell: ({ row }) => {
          const program = (row as any).program
          const statusText = program
            ? this.translateService.instant('status.yes')
            : this.translateService.instant('status.not')
          const statusClass = program ? 'bg-info' : 'bg-warning'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
      {
        header: 'columns.change_domain',
        accessor: 'change_domain',
        Cell: ({ row }) => {
          const change_domain = (row as any).change_domain
          const statusText = change_domain
            ? this.translateService.instant('status.yes')
            : this.translateService.instant('status.not')
          const statusClass = change_domain ? 'bg-info' : 'bg-warning'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
      {
        header: 'columns.service_status',
        accessor: 'service_status',
        Cell: ({ row }) => {
          const serviceStatus = (row as any).service_status || 'inactive'
          const statusText = this.translateService.instant(
            `service_status.${serviceStatus}`
          )
          const statusClass =
            serviceStatus === 'active'
              ? 'bg-success'
              : serviceStatus === 'paused'
                ? 'bg-warning'
                : 'bg-secondary'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
      {
        header: 'columns.custom_actions',
        accessor: 'custom_actions',
        Cell: ({ row }) => {
          const id = (row as any).id
          return `
            <div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-outline-primary" data-action="validate_status" data-row-id="${id}" title="Validar Estado">
                <i class="mdi mdi-stethoscope"></i>
              </button>
              <button class="btn btn-outline-success" data-action="install" data-row-id="${id}" title="Instalar">
                <i class="mdi mdi-cloud-download"></i>
              </button>
              <button class="btn btn-outline-info" data-action="add_program" data-row-id="${id}" title="Agregar Programa">
                <i class="mdi mdi-plus"></i>
              </button>
              <button class="btn btn-outline-warning" data-action="change_domain" data-row-id="${id}" title="Cambiar Dominio">
                <i class="mdi mdi-link"></i>
              </button>
              <button class="btn btn-outline-danger" data-action="deactivate_service" data-row-id="${id}" title="Desactivar Servicio">
                <i class="mdi mdi-pause"></i>
              </button>
              <button class="btn btn-outline-secondary" data-action="activate_service" data-row-id="${id}" title="Activar Servicio">
                <i class="mdi mdi-play"></i>
              </button>
              <button class="btn btn-outline-dark" data-action="automatic_shutdown" data-row-id="${id}" title="Apagado Automático">
                <i class="mdi mdi-power-sleep"></i>
              </button>
            </div>
          `
        },
      },
    ]
  }

  protected override defineFormFields(): IFormField[] {
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
        name: 'name',
        label: 'columns.name',
        type: 'text',
        required: true,
        placeholder: 'Production Web Server',
        colSize: 'col-12',
      },
      {
        name: 'ip',
        label: 'columns.ip',
        type: 'text',
        required: true,
        placeholder: '192.168.1.100',
        colSize: 'col-6',
      },
      {
        name: 'port',
        label: 'columns.port',
        type: 'number',
        required: false,
        placeholder: '22',
        colSize: 'col-6',
      },
      {
        name: 'domain',
        label: 'columns.domain',
        type: 'text',
        required: false,
        placeholder: 'ejemplo.com',
        colSize: 'col-6',
      },
      {
        name: 'email',
        label: 'columns.email',
        type: 'email',
        required: false,
        placeholder: 'admin@ejemplo.com',
        colSize: 'col-6',
      },
      {
        name: 'username',
        label: 'columns.username',
        type: 'text',
        required: true,
        placeholder: 'deploy',
        colSize: 'col-6',
      },
      {
        name: 'password',
        label: 'labels.password',
        type: 'password',
        required: this.modalMode === 'create',
        placeholder: '••••••••',
        colSize: 'col-6',
      },
      {
        name: 'service_status',
        label: 'columns.service_status',
        type: 'text',
        required: false,
        hidden: false,
        colSize: 'col-6',
      },
      {
        name: 'default_root',
        label: 'columns.default_root',
        type: 'text',
        required: false,
        placeholder: '/home',
        colSize: 'col-12',
      },
      {
        name: 'start_date',
        label: 'columns.start_date',
        type: 'date',
        required: false,
        colSize: 'col-6',
      },
      {
        name: 'end_date',
        label: 'columns.end_date',
        type: 'date',
        required: false,
        colSize: 'col-6',
      },
      {
        name: 'server_os_id',
        label: 'columns.operating_system',
        type: 'select',
        required: false,
        colSize: 'col-6',
        options:
          this.operatingSystems.length > 0
            ? this.operatingSystems
            : [{ label: 'Cargando...', value: 0 }],
      },
      {
        name: 'server_environment_id',
        label: 'columns.environment',
        type: 'select',
        required: false,
        colSize: 'col-6',
        options:
          this.environments.length > 0
            ? this.environments
            : [{ label: 'Cargando...', value: 0 }],
      },
      {
        name: 'description',
        label: 'columns.description',
        type: 'textarea',
        required: false,
        placeholder: 'Main production web server',
        colSize: 'col-12',
      },
      {
        name: 'notes',
        label: 'columns.notes',
        type: 'textarea',
        required: false,
        placeholder: 'Additional notes...',
        colSize: 'col-12',
      },
      {
        name: 'active',
        label: 'columns.status',
        type: 'checkbox',
        required: false,
        colSize: 'col-12',
      },
    ]
  }

  protected override getItemLabel(item: any): string {
    return item.name || item.ip || `Server #${item.id}`
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

  // =========================================
  // ACCIONES PERSONALIZADAS
  // =========================================

  public override onTableAction(event: { action: string; data: any }): void {
    switch (event.action) {
      case 'validate_status':
        this.onValidateStatus(event.data)
        break
      case 'install':
        this.onInstall(event.data)
        break
      case 'add_program':
        this.onAddProgram(event.data)
        break
      case 'change_domain':
        this.onChangeDomain(event.data)
        break
      case 'deactivate_service':
        this.onDeactivateService(event.data)
        break
      case 'activate_service':
        this.onActivateService(event.data)
        break
      case 'automatic_shutdown':
        this.onAutomaticShutdown(event.data)
        break
      default:
        super.onTableAction(event)
    }
  }

  /**
   * Genera un ID único para la operación
   */
  private generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Abre el modal de progreso
   */
  private openProgressModal(title: string, operationId: string): void {
    this.progressModalTitle = title
    this.currentOperationId = operationId
    this.isProgressModalVisible = true
  }

  /**
   * Cierra el modal de progreso
   */
  protected closeProgressModal(): void {
    this.isProgressModalVisible = false
    this.currentOperationId = ''
    this.progressModalTitle = ''
  }

  /**
   * Cancela la operación actual
   */
  protected cancelCurrentOperation(): void {
    if (this.currentOperationId) {
      // Aquí podrías enviar una señal de cancelación al backend
      // console.log('Cancelando operación:', this.currentOperationId)
      this.closeProgressModal()
    }
  }

  private onValidateStatus(server: any): void {
    const operationId = this.generateOperationId()

    // console.log('🎯 Suscribiendo al canal ANTES de la petición HTTP...')
    // IMPORTANTE: Suscribirse al canal ANTES de hacer la petición
    this.wsService.subscribeToOperation(operationId)

    this.openProgressModal(
      `Validando estado del servidor ${server.name}`,
      operationId
    )

    // Hacer la petición HTTP DESPUÉS de suscribirse
    // console.log('📡 Haciendo petición HTTP al backend...')
    this.serverService.validateStatus(server.id, operationId).subscribe({
      next: () => {
        // console.log(
        //   '✅ Petición HTTP completada, esperando eventos WebSocket...'
        // )
        // La respuesta inicial, el progreso viene por WebSocket
      },
      error: (err) => {
        this.swalHelper.error('Error al iniciar validación', err.message)
        this.closeProgressModal()
      },
    })
  }

  private onAutomaticShutdown(server: any): void {
    const operationId = this.generateOperationId()

    // IMPORTANTE: Suscribirse al canal ANTES de hacer la petición
    this.wsService.subscribeToOperation(operationId)

    this.openProgressModal(
      `Configurando apagado automático del servidor ${server.name}`,
      operationId
    )

    // Hacer la petición HTTP DESPUÉS de suscribirse
    this.serverService.automaticShutdown(server.id, operationId).subscribe({
      next: () => {
        // La respuesta inicial, el progreso viene por WebSocket
      },
      error: (err) => {
        this.swalHelper.error('Error al configurar apagado automático', err.message)
        this.closeProgressModal()
      },
    })
  }

  private async onInstall(server: any): Promise<void> {
    // Abrir modal para pedir dominio y email
    this.currentServerToInstall = server
    this.installData = { domain: '', email: '' }
    this.isInstallModalVisible = true
  }

  protected submitInstallForm(data: any): void {
    const { domain, email } = data

    if (!domain || !email) {
      this.swalHelper.warning(
        'Datos incompletos',
        'Por favor ingrese dominio y email'
      )
      return
    }

    this.isInstallModalVisible = false

    const operationId = this.generateOperationId()
    this.wsService.subscribeToOperation(operationId)
    this.openProgressModal(
      `Instalando en ${this.currentServerToInstall.name}`,
      operationId
    )

    this.serverService
      .install(this.currentServerToInstall.id, domain, email, operationId)
      .subscribe({
        next: () => {
          // Progreso por WebSocket
        },
        error: (err) => {
          this.swalHelper.error('Error al iniciar instalación', err.message)
          this.closeProgressModal()
        },
      })
  }

  protected closeInstallModal(): void {
    this.isInstallModalVisible = false
    this.currentServerToInstall = null
  }

  private async onAddProgram(server: any): Promise<void> {
    // Obtener programas disponibles
    try {
      const response = await this.serverService
        .getAvailablePrograms()
        .toPromise()

      // Usar mapCatalogResponse para procesar la respuesta (igual que con OS y environments)
      this.availablePrograms = this.mapCatalogResponse(response)

      if (this.availablePrograms.length === 0) {
        this.swalHelper.info('No hay programas disponibles')
        return
      }

      // Abrir modal con datos del servidor
      this.currentServerForProgram = server
      this.addProgramData = {
        program_id: null,
        app_name: server.app_name || 'Banca Virtual',
        app_env: server.app_env || 'local',
        app_key: server.app_key || 'base64:53ae/nixlmYKNr3uUooErj2U9IUvyFqxklJceccrzJ0=',
        app_debug: server.app_debug !== undefined ? server.app_debug : true,
        app_url: server.app_url || (server.domain ? `https://${server.domain}` : ''),
        telegram_bot_token: server.telegram_bot_token || '7851080727:AAETKZszJYzU-aCeAfWnTmF8OBdy5XlTERE',
        telegram_chat_ids: server.telegram_chat_ids || '6766003433, 7159857873',
      }
      this.isAddProgramModalVisible = true
    } catch (err: any) {
      this.swalHelper.error('Error al cargar programas', err.message)
    }
  }

  protected submitAddProgramForm(data: any): void {
    const { program_id } = data

    if (!program_id) {
      this.swalHelper.warning(
        'Datos incompletos',
        'Por favor seleccione un programa'
      )
      return
    }

    this.isAddProgramModalVisible = false

    const operationId = this.generateOperationId()
    this.wsService.subscribeToOperation(operationId)
    this.openProgressModal(
      `Agregando programa a ${this.currentServerForProgram.name}`,
      operationId
    )

    this.serverService
      .addProgram(this.currentServerForProgram.id, +program_id, operationId, data)
      .subscribe({
        next: () => {
          // Progreso por WebSocket
        },
        error: (err) => {
          this.swalHelper.error('Error al agregar programa', err.message)
          this.closeProgressModal()
        },
      })
  }

  protected closeAddProgramModal(): void {
    this.isAddProgramModalVisible = false
    this.currentServerForProgram = null
    this.loadItems() // Recargar lista para mostrar el nuevo programa
  }

  private async onChangeDomain(server: any): Promise<void> {
    // Abrir modal para cambiar dominio
    this.currentServerForDomain = server
    this.changeDomainData = { domain: server.domain || '' }
    this.isChangeDomainModalVisible = true
  }

  protected submitChangeDomainForm(data: any): void {
    const { domain } = data

    if (!domain) {
      this.swalHelper.warning(
        'Datos incompletos',
        'Por favor ingrese el nuevo dominio'
      )
      return
    }

    this.isChangeDomainModalVisible = false

    const operationId = this.generateOperationId()
    this.wsService.subscribeToOperation(operationId)
    this.openProgressModal(
      `Cambiando dominio de ${this.currentServerForDomain.name}`,
      operationId
    )

    this.serverService
      .changeDomain(this.currentServerForDomain.id, domain, operationId)
      .subscribe({
        next: () => {
          // Progreso por WebSocket
        },
        error: (err) => {
          this.swalHelper.error('Error al cambiar dominio', err.message)
          this.closeProgressModal()
        },
      })
  }

  protected closeChangeDomainModal(): void {
    this.isChangeDomainModalVisible = false
    this.currentServerForDomain = null
  }

  private async onDeactivateService(server: any): Promise<void> {
    const confirmed = await this.swalHelper.confirm(
      'server.deactivate.confirm_title',
      'server.deactivate.confirm_text',
      { name: server.name }
    )

    if (!confirmed) return

    const operationId = this.generateOperationId()
    this.wsService.subscribeToOperation(operationId)
    this.openProgressModal(
      `Desactivando servicio en ${server.name}`,
      operationId
    )

    this.serverService.deactivateService(server.id, operationId).subscribe({
      next: () => {
        // Progreso por WebSocket
      },
      error: (err) => {
        this.swalHelper.error('Error al desactivar servicio', err.message)
        this.closeProgressModal()
      },
    })
  }

  private async onActivateService(server: any): Promise<void> {
    const confirmed = await this.swalHelper.confirm(
      'server.activate.confirm_title',
      'server.activate.confirm_text',
      { name: server.name }
    )

    if (!confirmed) return

    const operationId = this.generateOperationId()
    this.wsService.subscribeToOperation(operationId)
    this.openProgressModal(`Activando servicio en ${server.name}`, operationId)

    this.serverService.activateService(server.id, operationId).subscribe({
      next: () => {
        // Progreso por WebSocket
      },
      error: (err) => {
        this.swalHelper.error('Error al activar servicio', err.message)
        this.closeProgressModal()
      },
    })
  }
}
