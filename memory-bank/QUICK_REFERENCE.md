# 🚀 Quick Reference Card

**Print this and keep it handy!**

---

## Create New CRUD Module in 3 Steps (20 minutes)

### Step 1: Create Component File
```typescript
// src/app/pages/system/roles/roles.component.ts
import { baseComponent } from '@/app/shared/base-component/base-component'
import { Column, IFormField } from '@/app/components/table/table.model'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  standalone: true,
  imports: [/* ... */]
})
export class RolesComponent extends baseComponent {
  private roleService = inject(RoleService)
  protected override modulePermission = 'roles'

  protected override getService() { return this.roleService }
  protected override getCrudConfig() { /* copy from users */ }
  protected override defineColumns() { /* define columns */ }
  protected override defineFormFields() { /* define fields */ }
  protected override getItemLabel(item: any) { return item.name }
}
```

### Step 2: Template
```html
<div class="card">
  <div class="card-header">
    <h4>{{ 'columns.role' | translate }}</h4>
  </div>
  <div class="card-body">
    <app-table-crud [config]="tableConfig"></app-table-crud>
  </div>
</div>
```

### Step 3: Done! ✅
The baseComponent handles: Create, Read, Update, Delete, Pagination, Permissions

---

## Most Used Methods

```typescript
// In baseComponent - these are already available:

// Load data
loadItems(page: number): void

// CRUD operations (called by user click)
onCreateClick(): void
onEditClick(item: any): void
onDeleteClick(item: any): void
onViewClick(item: any): void

// Form handling
submitForm(formData: any): void
openModal(): void
closeModal(): void

// Notifications
showSuccess(message: string): void
showError(title: string, message: string): void
showWarning(title: string, message: string): void
showInfo(message: string): void

// You implement these 5:
abstract getService(): CommonService<T>
abstract getCrudConfig(): ICrudConfig<T>
abstract defineColumns(): Column<T>[]
abstract defineFormFields(): IFormField[]
abstract getItemLabel(item: T): string
```

---

## Common Patterns

### Use in Template
```html
<!-- Table with all features -->
<app-table-crud 
  [config]="tableConfig"
  (action)="onTableAction($event)">
</app-table-crud>

<!-- Translate text -->
{{ 'actions.create' | translate }}
{{ 'columns.email' | translate }}
{{ 'status.active' | translate }}

<!-- Permission check -->
<button *hasPermission="'users.create'">Create</button>
```

### Use in Code
```typescript
// Check permission
if (this.permissionService.canDelete('users')) {
  // Allow delete
}

// Get translation
const label = this.translateService.instant('actions.delete')

// Override method
protected override onEditClick(item: any) {
  // Custom logic
  super.onEditClick(item)  // Call base
}

// Define columns
protected override defineColumns(): Column<any>[] {
  return [
    { header: 'columns.email', accessor: 'email' },
    { 
      header: 'columns.status', 
      accessor: 'is_active',
      cell: (item) => item.is_active ? '✓' : '✗'
    }
  ]
}

// Define form fields
protected override defineFormFields(): IFormField[] {
  return [
    {
      name: 'email',
      label: 'columns.email',
      type: 'email',
      required: true,
      colSize: 'col-12',
      validators: [Validators.email]
    }
  ]
}
```

---

## Translation Keys (50+)

### Common Ones to Use
```
actions.create, edit, delete, view, save, cancel
columns.id, email, name, status, created_at
status.active, inactive, pending
errors.error, validation, not_found
messages.success, created_success, deleted_success
```

### Use Anywhere
```html
{{ 'key.subkey' | translate }}
```

```typescript
this.translateService.instant('key.subkey')
```

---

## Form Fields Configuration

```typescript
interface IFormField {
  name: string                  // 'email', 'name', 'password'
  label: string                 // 'columns.email' (translation key)
  type: 'text' | 'email' | 
        'password' | 'number' |
        'date' | 'select' | 
        'textarea' | 'checkbox'
  required?: boolean            // true/false
  placeholder?: string          // 'Enter email...'
  colSize?: string              // 'col-6', 'col-12'
  options?: { label; value }[]  // For select fields
  validators?: any[]            // Validators.required, etc
}
```

---

## Permissions Pattern

### Set in Your Component
```typescript
export class RolesComponent extends baseComponent {
  protected override modulePermission = 'roles'  // 'users', 'products', etc
}
```

### Automatic Checking
The table automatically:
- Hides "Create" button if `canCreate` = false
- Hides "Edit" button if `canEdit` = false
- Hides "Delete" button if `canDelete` = false
- Hides "View" button if `canRead` = false

---

## Build & Run Commands

```bash
# Build
ng build

# Serve locally
ng serve

# Open in browser
http://localhost:4200

# Check errors
ng build --configuration development

# Watch mode
ng serve --watch
```

---

## File Locations Quick Map

```
/src/app/shared/base-component/
└── base-component.ts          ← The 450-line magic

/src/app/components/table/
├── table-crud.component.ts    ← Generic table
└── table.model.ts             ← Interfaces

/src/app/pages/system/configuration/users/
└── users.component.ts         ← Example (110 lines)

/src/app/core/service/
├── crud-controller.service.ts ← State management
└── permission.service.ts      ← Permission checking

/src/assets/i18n/
├── actions/                   ← 5 language files
├── columns/                   ← 5 language files
├── status/                    ← 5 language files
└── ...more categories

/memory-bank/
└── *.md                       ← 12+ guides
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Check import path, use absolute paths with `@/app` |
| "undefined service" | Inject with `inject(ServiceName)` not constructor |
| "Translation missing" | Add key to `/src/assets/i18n/*.json` files |
| "Permission denied" | Set `modulePermission = 'your_module'` |
| "Modal not appearing" | SweetAlert placeholder - Phase 5 will replace |
| "Form not submitting" | Implement `getService()` returning CommonService |
| "Build fails" | Run `ng build --configuration development` for errors |

---

## Key Concepts Cheat Sheet

```
baseComponent
├── Abstract class with 25+ methods
├── You extend it
└── You implement 5 methods

CrudController<T>
├── Generic state management
├── Uses RxJS Observable
└── Handles Create, Read, Update, Delete

IFormField
├── Describes a form field
├── Name, type, validation
└── Used by modal component

Column<T>
├── Describes a table column
├── Header text, data accessor
└── Optional custom cell renderer

ITableConfig<T>
├── Configuration for entire table
├── Columns, actions, permissions
└── Callbacks for user actions
```

---

## Useful Links

| Need | Link |
|------|------|
| Get Started | `memory-bank/0-START-HERE.md` |
| Create Module | `memory-bank/QUICK_START_CRUD.md` |
| Architecture | `memory-bank/BASE_COMPONENT_ARCHITECTURE.md` |
| Methods | `memory-bank/BASE_COMPONENT_REFERENCE.md` |
| Diagrams | `memory-bank/CRUD_ARCHITECTURE.md` |
| Next Steps | `memory-bank/ROADMAP_NEXT_STEPS.md` |
| Status | `memory-bank/PROJECT_STATUS.md` |
| Summary | `memory-bank/EXECUTIVE_SUMMARY.md` |

---

## Before You Code

- [ ] Read: QUICK_START_CRUD.md (20 min)
- [ ] Look at: UsersComponent (10 min)
- [ ] Understand: 5 abstract methods (10 min)
- [ ] Know: Your module permission name
- [ ] Know: Your backend endpoint URL
- [ ] Know: Your data model/interface

---

## Copy-Paste Ready

### Minimal Component
```typescript
@Component({
  selector: 'app-mymodule',
  template: `
    <div class="card">
      <div class="card-body">
        <app-table-crud [config]="tableConfig"></app-table-crud>
      </div>
    </div>
  `,
  standalone: true,
  imports: [TableCrudComponent]
})
export class MyModuleComponent extends baseComponent {
  private service = inject(MyService)
  protected override modulePermission = 'mymodule'

  protected override getService() { return this.service }
  
  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      pageSize: 10,
      actions: { create: true, edit: true, delete: true, view: true }
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.id', accessor: 'id' },
      { header: 'columns.name', accessor: 'name' }
    ]
  }

  protected override defineFormFields(): IFormField[] {
    return [
      { name: 'name', label: 'columns.name', type: 'text', required: true, colSize: 'col-12' }
    ]
  }

  protected override getItemLabel(item: any): string {
    return item.name
  }
}
```

---

## That's It! 🎉

You now have everything to:
- ✅ Create new CRUD modules (20 min each)
- ✅ Use centralized permissions
- ✅ Support multiple languages
- ✅ Build professional admin panels

**Next**: Read QUICK_START_CRUD.md and create your first module!

---

**Questions?** Check memory-bank/INDEX.md  
**Lost?** Start with memory-bank/0-START-HERE.md  
**Build issues?** See TECHNICAL_VALIDATION.md
