╔════════════════════════════════════════════════════════════════════════════════╗
║                         ARQUITECTURA DEL SISTEMA CRUD                          ║
╚════════════════════════════════════════════════════════════════════════════════╝


📊 DIAGRAMA DE FLUJO
═════════════════════════════════════════════════════════════════════════════════

                        ┌─────────────────────────┐
                        │   COMPONENTE USUARIO    │
                        │  (users.component.ts)   │
                        └────────────┬────────────┘
                                     │
                  ┌──────────────────┼──────────────────┐
                  ▼                  ▼                  ▼
        ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐
        │ Definir Columnas │ │ CrudController│ │ Configurar   │
        │ (Column[])      │ │ (gestiona     │ │ TableConfig  │
        │                 │ │  estado)      │ │              │
        └─────────────────┘ └──────┬───────┘ └──────┬───────┘
                                   │               │
                                   └───────┬───────┘
                                           ▼
                        ┌────────────────────────────────┐
                        │   TableComponent (CRUD)        │
                        │  (tabla-crud.component.ts)     │
                        └────────────┬───────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
           ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
           │ Renderizar   │  │ Validar      │  │ Enviar       │
           │ Tabla HTML   │  │ Permisos     │  │ Eventos      │
           │              │  │ (buttons)    │  │              │
           └──────────────┘ └──────────────┘ └────────┬─────┘
                                                      │
                                                      ▼
                        ┌────────────────────────────────┐
                        │   Componente (onTableAction)   │
                        │  (edit, delete, create, etc)   │
                        └────────────┬───────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────────────┐
                        │  CrudController Methods        │
                        │ (create, update, delete, etc)  │
                        └────────────┬───────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────────────┐
                        │   UserService (extends         │
                        │   CommonService)               │
                        └────────────┬───────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────────────┐
                        │   HTTP Requests to Backend     │
                        │   /api/users (GET, POST, etc)  │
                        └────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════
🏗️ ESTRUCTURA DE CLASES
═════════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────┐
│      ITableConfig<T>                │ ◄── Interfaz de configuración
├─────────────────────────────────────┤
│ • columns: Column<T>[]              │
│ • data: T[]                         │
│ • pageSize: number                  │
│ • enableCreate/Edit/Delete/etc      │
│ • onCreateClick, onEditClick, etc   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      TableComponent<T>              │ ◄── Componente genérico
├─────────────────────────────────────┤
│ @Input() config: ITableConfig<T>    │
│ @Output() rowAction                 │
│                                     │
│ • initializePermissions()           │ ◄── Valida permisos automáticamente
│ • sanitizeHtml()                    │
│ • handleSort()                      │
│ • updateTable()                     │
│ • onCreateClick()                   │ ◄── Emite eventos
│ • onEditClick()                     │
│ • onDeleteClick()                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      ICrudState<T>                  │ ◄── Estado del CRUD
├─────────────────────────────────────┤
│ • items: T[]                        │
│ • isLoading: boolean                │
│ • error: string | null              │
│ • currentPage: number               │
│ • pageSize: number                  │
│ • total: number                     │
│ • selectedItem: T | null            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      CrudController<T>              │ ◄── Controlador CRUD
├─────────────────────────────────────┤
│ • state$: Observable<ICrudState>    │
│                                     │
│ Methods:                            │
│ • loadItems(page, pageSize)         │ ◄── Get list (paginado)
│ • getById(id)                       │ ◄── Get by id
│ • create(data)                      │ ◄── POST
│ • update(id, data)                  │ ◄── PUT
│ • delete(id)                        │ ◄── DELETE
│ • clear()                           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      UsersComponent                 │ ◄── Componente específico
├─────────────────────────────────────┤
│ • crud: CrudController<IUser>       │
│ • tableConfig: ITableConfig<IUser>  │
│                                     │
│ • initializeCrud()                  │
│ • configureTable()                  │
│ • loadUsers()                       │
│ • onTableAction(event)              │
│ • onPageChange(page)                │
│ • openCreateModal()                 │
│ • openEditModal(user)               │
│ • deleteUser(user)                  │
└─────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════
📋 FLUJO DE DATOS DETALLADO
═════════════════════════════════════════════════════════════════════════════════

LISTAR USUARIOS:
────────────────

1. UsersComponent.ngOnInit()
   └─> initializeCrud()
       └─> CrudController<IUser> nuevo
       └─> configureTable()
       └─> loadUsers()

2. loadUsers(page = 1)
   └─> crud.loadItems(page, pageSize)
       └─> CrudController.loadItems()
           └─> this.setLoading(true)
           └─> UserService.getAll(options)
               └─> CommonService.getAll()
                   └─> GET /api/users?skip=0&take=10
                       └─> Backend retorna: { data: [], total, last_page, ... }
           └─> CrudController.stateSubject.next(estado)
               └─> observable emite nuevo estado

3. TableComponent escucha tableConfig.data
   └─> Se renderiza la tabla con los datos

4. Usuario hace click en "Editar"
   └─> onEditClick(row)
       └─> rowAction.emit({ action: 'edit', data: row })
       └─> Componente recibe evento
       └─> openEditModal(row)


EDITAR USUARIO:
───────────────

1. openEditModal(user)
   └─> crud.getById(user.id)
       └─> UserService.getById(id)
           └─> GET /api/users/{id}
       └─> Modal se abre con datos

2. Usuario modifica datos y clickea "Guardar"
   └─> crud.update(user.id, userData)
       └─> UserService.update(id, data)
           └─> PUT /api/users/{id}
       └─> Backend actualiza y retorna datos
       └─> CrudController.loadItems() automáticamente
           └─> Tabla se actualiza


ELIMINAR USUARIO:
─────────────────

1. onDeleteClick(user)
   └─> Mostrar Swal confirmar

2. Usuario confirma
   └─> crud.delete(user.id)
       └─> UserService.delete(id)
           └─> DELETE /api/users/{id}
       └─> Backend elimina
       └─> CrudController.loadItems() automáticamente
           └─> Tabla se actualiza


═════════════════════════════════════════════════════════════════════════════════
🔐 INTEGRACIÓN CON PERMISOS
═════════════════════════════════════════════════════════════════════════════════

TableComponent.initializePermissions():
┌────────────────────────────────────────────────────────────────┐
│ const module = 'users' (de config.permissionModule)            │
│                                                                │
│ this.canList = permissionService.hasPermission('users')       │
│ this.canCreate = permissionService.hasPermission('users.add') │
│ this.canEdit = permissionService.hasPermission('users.edit')  │
│ this.canDelete = permissionService.hasPermission('users.des.. │
│ this.canView = permissionService.hasPermission('users.view')  │
│ this.canHistory = permissionService.hasPermission('users.his. │
│                                                                │
│ En template:                                                   │
│ @if (canCreate) { <button>Crear</button> }                   │
│ @if (canEdit) { <button>Editar</button> }                    │
│ @if (canDelete) { <button>Eliminar</button> }                │
└────────────────────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════
📦 ARCHIVOS CREADOS
═════════════════════════════════════════════════════════════════════════════════

NUEVOS:
  ✅ src/app/components/table/table-crud.component.ts
  ✅ src/app/components/table/table-crud.component.html
  ✅ src/app/core/service/crud-controller.service.ts

MODIFICADOS:
  ✅ src/app/pages/system/configuration/users/users.component.ts
  ✅ src/app/pages/system/configuration/users/users.component.html
  ✅ src/app/shared/base-toolbar/base-toolbar.ts

DOCUMENTACIÓN:
  ✅ CRUD_GENERIC_GUIDE.md (este archivo)
  ✅ CRUD_ARCHITECTURE.md


═════════════════════════════════════════════════════════════════════════════════
✨ CARACTERÍSTICAS
═════════════════════════════════════════════════════════════════════════════════

✅ TABLA GENÉRICA:
   • Mostrar datos en tabla
   • Paginación (frontend y backend)
   • Búsqueda
   • Ordenamiento (click en header)
   • Responsive

✅ CRUD COMPLETO:
   • Create (POST)
   • Read (GET listado y por ID)
   • Update (PUT)
   • Delete (DELETE)
   • Paginación integrada

✅ PERMISOS:
   • Validación automática
   • Botones visibles/ocultos según permisos
   • Sin cambios de código

✅ REACTIVIDAD:
   • Observable state$
   • Cambios en tiempo real
   • Sin necesidad de refrescar

✅ REUTILIZABLE:
   • Un solo CrudController para todos los módulos
   • Una sola Table para todos los módulos
   • Solo cambiar config y columnas


═════════════════════════════════════════════════════════════════════════════════
🎯 EJEMPLO: COMPONENTE COMPLETO CON TODO
═════════════════════════════════════════════════════════════════════════════════

Para ver un ejemplo COMPLETO de cómo implementar esto en otro módulo,
lee: CRUD_GENERIC_GUIDE.md

Te mostrará paso a paso cómo implementar:
  1. Interfaz
  2. Servicio
  3. Componente
  4. Template


═════════════════════════════════════════════════════════════════════════════════
                            ¡LISTO PARA USAR!
═════════════════════════════════════════════════════════════════════════════════
