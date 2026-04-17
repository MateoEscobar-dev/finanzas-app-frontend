import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

export interface HistoryLog {
  id: number
  table: string
  id_item: string
  operation: string
  reason: string
  user: number
  date: string
  type: number
  action?: string // HTML button con detalles
  usuario: {
    id: number
    first_name: string
    second_name: string
    first_last_name: string
    second_last_name: string
    email: string
  }
}

@Component({
  selector: 'app-history-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="modal fade" [ngClass]="{ show: isVisible }" [style.display]="isVisible ? 'block' : 'none'" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0 shadow-lg">
          <!-- Header -->
          <div class="modal-header bg-gradient border-0 py-4">
            <h5 class="modal-title fw-bold fs-5 text-dark">
              <i class="mdi mdi-history me-2"></i>{{ 'actions.history' | translate }}
            </h5>
            @if (itemLabel) {
              <span class="badge bg-primary ms-2">{{ itemLabel }}</span>
            }
            <button
              type="button"
              class="btn-close"
              (click)="closeModal()"
              aria-label="Close"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body p-4">
            @if (logs && logs.length > 0) {
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="table-light">
                    <tr>
                      <th>{{ 'columns.date' | translate }}</th>
                      <th>{{ 'columns.operation' | translate }}</th>
                      <th>{{ 'columns.reason' | translate }}</th>
                      <th>{{ 'columns.user' | translate }}</th>
                      <th style="width: 120px; text-align: center;">{{ 'actions.actions' | translate }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (log of logs; track log.id) {
                      <tr>
                        <td>
                          <small class="text-muted">{{ log.date }}</small>
                        </td>
                        <td>
                          <span class="badge" [ngClass]="getOperationBadgeClass(log.operation)">
                            {{ log.operation }}
                          </span>
                        </td>
                        <td>
                          <small>{{ log.reason }}</small>
                        </td>
                        <td>
                          <small>
                            {{ log.usuario.first_name }} {{ log.usuario.first_last_name }}
                          </small>
                        </td>
                        <td class="text-center">
                          @if (log.action) {
                            <span [innerHTML]="sanitizeHtml(log.action)"></span>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <div class="alert alert-info">
                <i class="mdi mdi-information-outline me-2"></i>
                {{ 'messages.no_history' | translate }}
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="modal-footer border-top bg-light py-3 px-4">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="closeModal()"
            >
              {{ 'actions.close' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    @if (isVisible) {
      <div class="modal-backdrop fade show" (click)="closeModal()"></div>
    }
  `,
  styles: [
    `
      .modal.show {
        background-color: rgba(0, 0, 0, 0.5);
      }

      .modal-dialog {
        max-width: 900px;
      }

      .modal-header {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 0.5rem 0.5rem 0 0;
      }

      .modal-header .btn-close {
        filter: brightness(0) invert(1);
      }

      .modal-content {
        border-radius: 0.5rem;
      }

      .table {
        margin-bottom: 0;
      }

      .table thead th {
        border-bottom: 2px solid #dee2e6;
        font-weight: 600;
        color: #495057;
      }

      .table tbody tr:hover {
        background-color: #f8f9fa;
      }

      .badge {
        font-size: 0.75rem;
        padding: 0.4rem 0.6rem;
        font-weight: 500;
      }

      .table-responsive {
        border-radius: 0.375rem;
      }

      :host ::ng-deep .btn-info {
        background-color: #0dcaf0;
        border-color: #0dcaf0;
        color: white;
      }

      :host ::ng-deep .btn-info:hover {
        background-color: #0bb5da;
        border-color: #0bb5da;
      }
    `,
  ],
})
export class HistoryModalComponent {
  @Input() isVisible = false
  @Input() logs: HistoryLog[] = []
  @Input() itemLabel: string = ''
  @Output() close = new EventEmitter<void>()

  private sanitizer: DomSanitizer

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer
  }

  closeModal(): void {
    this.close.emit()
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  getOperationBadgeClass(operation: string): string {
    const lower = operation.toLowerCase()

    if (lower.includes('creación') || lower.includes('creation')) {
      return 'bg-success'
    } else if (lower.includes('update') || lower.includes('actualización')) {
      return 'bg-info'
    } else if (lower.includes('delete') || lower.includes('eliminación')) {
      return 'bg-danger'
    } else if (lower.includes('activat')) {
      return 'bg-success'
    } else if (lower.includes('desactiv')) {
      return 'bg-warning'
    }

    return 'bg-secondary'
  }
}
