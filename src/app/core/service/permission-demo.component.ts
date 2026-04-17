import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PermissionService } from '@/app/core/service/permission.service'
import { HasPermissionDirective } from '@/app/core/guards/has-permission.directive'
import { HasRoleDirective } from '@/app/core/guards/has-role.directive'

/**
 * COMPONENTE DE DEMOSTRACIÓN DEL SISTEMA DE PERMISOS
 *
 * Este componente muestra en vivo cómo funciona el sistema de permisos y roles.
 * Puedes importarlo en tu app para ver ejemplos prácticos.
 *
 * Uso: Importa en un componente padre y agrega en la ruta para ver ejemplos
 */
@Component({
  selector: 'app-permission-demo',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, HasRoleDirective],
  template: `
    <div class="permission-demo">
      <h2>🔐 Sistema de Permisos - Demo</h2>

      <!-- SECCIÓN 1: INFO DEL USUARIO ACTUAL -->
      <div class="section">
        <h3>📋 Usuario Actual</h3>
        <div *ngIf="currentUser; else noUser" class="user-info">
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>Nombre:</strong> {{ currentUser.first_name }} {{ currentUser.first_last_name }}</p>
          <p><strong>Roles:</strong> {{ currentUser.roles.join(', ') }}</p>
        </div>
        <ng-template #noUser>
          <p class="warning">No hay usuario autenticado</p>
        </ng-template>
      </div>

      <!-- SECCIÓN 2: PERMISOS -->
      <div class="section">
        <h3>🔑 Permisos del Usuario</h3>
        <div class="permissions-list">
          <div *ngFor="let permission of allPermissions" class="permission-item">
            <span class="badge badge-success">{{ permission }}</span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: PRUEBAS DE LÓGICA -->
      <div class="section">
        <h3>✅ Pruebas de Verificación</h3>

        <div class="test-item">
          <strong>¿Tiene permiso 'users.add'?</strong>
          <span [ngClass]="canAddUsers ? 'text-success' : 'text-danger'">
            {{ canAddUsers ? '✓ Sí' : '✗ No' }}
          </span>
        </div>

        <div class="test-item">
          <strong>¿Tiene permiso 'users.edit' O 'users.destroy'?</strong>
          <span [ngClass]="canEditOrDelete ? 'text-success' : 'text-danger'">
            {{ canEditOrDelete ? '✓ Sí' : '✗ No' }}
          </span>
        </div>

        <div class="test-item">
          <strong>¿Es Administrador?</strong>
          <span [ngClass]="isAdmin ? 'text-success' : 'text-danger'">
            {{ isAdmin ? '✓ Sí' : '✗ No' }}
          </span>
        </div>

        <div class="test-item">
          <strong>¿Tiene ability '*' (full access)?</strong>
          <span [ngClass]="hasFullAccess ? 'text-success' : 'text-danger'">
            {{ hasFullAccess ? '✓ Sí' : '✗ No' }}
          </span>
        </div>
      </div>

      <!-- SECCIÓN 4: DIRECTIVAS EN ACCIÓN -->
      <div class="section">
        <h3>🎨 Directivas en Acción</h3>

        <div>
          <h4>Botones que aparecen solo si tienes permisos:</h4>

          <!-- Botón que solo aparece con permiso users.add -->
          <button
            *appHasPermission="'users.add'"
            class="btn btn-success">
            📝 Agregar Usuario (Requiere: users.add)
          </button>

          <!-- Botón que aparece si tienes users.edit O users.destroy -->
          <button
            *appHasPermission="['users.edit', 'users.destroy']"
            class="btn btn-warning">
            ✏️ Editar/Eliminar (Requiere: users.edit O users.destroy)
          </button>

          <!-- Sección solo para administradores -->
          <div *appHasRole="'Administrator'" class="alert alert-info">
            <strong>👑 Panel Administrativo</strong>
            <p>Solo ves esto porque eres Administrador</p>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 5: ACCIONES COMUNES -->
      <div class="section">
        <h3>⚙️ Acciones Comunes del Sistema</h3>

        <table class="table">
          <thead>
            <tr>
              <th>Acción</th>
              <th>¿Permitida?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Agregar Usuario (users.add)</td>
              <td [ngClass]="permissionService.canPerformAction('users.add') ? 'text-success' : 'text-danger'">
                {{ permissionService.canPerformAction('users.add') ? '✓' : '✗' }}
              </td>
            </tr>
            <tr>
              <td>Editar Usuario (users.edit)</td>
              <td [ngClass]="permissionService.canPerformAction('users.edit') ? 'text-success' : 'text-danger'">
                {{ permissionService.canPerformAction('users.edit') ? '✓' : '✗' }}
              </td>
            </tr>
            <tr>
              <td>Eliminar Usuario (users.destroy)</td>
              <td [ngClass]="permissionService.canPerformAction('users.destroy') ? 'text-success' : 'text-danger'">
                {{ permissionService.canPerformAction('users.destroy') ? '✓' : '✗' }}
              </td>
            </tr>
            <tr>
              <td>Ver Configuración (configuration)</td>
              <td [ngClass]="permissionService.canPerformAction('configuration') ? 'text-success' : 'text-danger'">
                {{ permissionService.canPerformAction('configuration') ? '✓' : '✗' }}
              </td>
            </tr>
            <tr>
              <td>Ver Roles (roles)</td>
              <td [ngClass]="permissionService.canPerformAction('roles') ? 'text-success' : 'text-danger'">
                {{ permissionService.canPerformAction('roles') ? '✓' : '✗' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .permission-demo {
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h2 {
      color: #333;
      border-bottom: 3px solid #007bff;
      padding-bottom: 10px;
    }

    .section {
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-left: 4px solid #007bff;
      border-radius: 4px;
    }

    h3 {
      color: #007bff;
      margin-top: 0;
    }

    h4 {
      color: #555;
    }

    .user-info {
      background: white;
      padding: 10px;
      border-radius: 4px;
      border-left: 3px solid #28a745;
    }

    .user-info p {
      margin: 5px 0;
    }

    .permissions-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .permission-item {
      display: inline-block;
    }

    .badge {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }

    .badge-success {
      background-color: #d4edda;
      color: #155724;
    }

    .test-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      margin: 5px 0;
      background: white;
      border-radius: 4px;
      border-left: 3px solid #ffc107;
    }

    .test-item strong {
      flex: 1;
    }

    .text-success {
      color: #28a745;
      font-weight: bold;
    }

    .text-danger {
      color: #dc3545;
      font-weight: bold;
    }

    .btn {
      padding: 10px 15px;
      margin: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      color: white;
    }

    .btn-success {
      background-color: #28a745;
    }

    .btn-warning {
      background-color: #ffc107;
      color: #333;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .alert {
      padding: 12px;
      margin: 10px 0;
      border-radius: 4px;
    }

    .alert-info {
      background-color: #d1ecf1;
      color: #0c5460;
      border-left: 4px solid #17a2b8;
    }

    .warning {
      color: #dc3545;
      font-weight: bold;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #007bff;
      color: white;
    }

    tr:hover {
      background-color: #f5f5f5;
    }
  `,
})
export class PermissionDemoComponent {
  permissionService = inject(PermissionService)

  currentUser = this.permissionService.getCurrentUser()
  allPermissions = this.permissionService.getAllPermissions()

  // Propiedades para los tests
  canAddUsers = this.permissionService.hasPermission('users.add')
  canEditOrDelete = this.permissionService.hasAnyPermission([
    'users.edit',
    'users.destroy',
  ])
  isAdmin = this.permissionService.hasRole('Administrator')
  hasFullAccess = this.permissionService.getAbilities().includes('*')
}
