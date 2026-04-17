import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { PermissionService } from '@/app/core/service/permission.service'

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-content">
        <div class="error-icon">🔒</div>

        <h1>Acceso Denegado</h1>

        <p class="error-message">
          No tienes permiso para acceder a esta página.
        </p>

        <div *ngIf="userInfo" class="user-info">
          <h3>Tu Información:</h3>
          <p><strong>Usuario:</strong> {{ userInfo.email }}</p>
          <p><strong>Nombre:</strong> {{ userInfo.first_name }} {{ userInfo.first_last_name }}</p>
          <p><strong>Rol:</strong> {{ userInfo.roles.join(', ') }}</p>
        </div>

        <div class="actions">
          <button (click)="goHome()" class="btn btn-primary">
            ← Volver al Inicio
          </button>
          <button (click)="goBack()" class="btn btn-secondary">
            ← Atrás
          </button>
        </div>

        <div class="help-section">
          <p class="small-text">
            Si crees que esto es un error, contacta con el administrador.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .unauthorized-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .unauthorized-content {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 500px;
    }

    .error-icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    h1 {
      color: #dc3545;
      margin: 20px 0;
      font-size: 2.5em;
    }

    .error-message {
      color: #666;
      font-size: 1.1em;
      margin: 20px 0;
    }

    .user-info {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      text-align: left;
    }

    .user-info h3 {
      color: #667eea;
      margin-top: 0;
    }

    .user-info p {
      margin: 8px 0;
      color: #555;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin: 30px 0;
      justify-content: center;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .help-section {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }

    .small-text {
      color: #999;
      font-size: 0.9em;
      margin: 0;
    }
  `,
})
export class UnauthorizedComponent {
  private router = inject(Router)
  private permissionService = inject(PermissionService)

  userInfo = this.permissionService.getCurrentUser()

  goHome(): void {
    this.router.navigate(['/'])
  }

  goBack(): void {
    window.history.back()
  }
}
