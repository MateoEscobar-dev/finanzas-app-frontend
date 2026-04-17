import { CommonModule } from '@angular/common'
import {
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { BgCirclesComponent } from '@component/bg-circles/bg-circles.component'
import { environment } from '@/environments/environment'

@Component({
  selector: 'app-account-wrapper',
  imports: [CommonModule, BgCirclesComponent, RouterModule],
  template: `
    <bg-circles></bg-circles>
    <div class="account-pages pt-2 pt-sm-2 pb-2 pb-sm-2 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
            <div class="card shadow-lg border-0">
              <!-- Logo / Brand Header -->
              <div class="card-header py-3 text-center finance-header">
                <a routerLink="/" class="text-decoration-none">
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <i class="ri-wallet-3-fill finance-logo-icon"></i>
                    <span class="finance-logo-text">{{ appTitle }}</span>
                  </div>
                </a>
              </div>

              <div class="card-body p-4">
                <ng-content></ng-content>
              </div>
            </div>

            <ng-container
              *ngTemplateOutlet="bottomLinksTemplate"
            ></ng-container>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer footer-alt fw-light">
      2025 -
      {{ year }}
      &copy; {{ appTitle }}
    </footer>
  `,
  styles: `
    .finance-header {
      background: linear-gradient(135deg, #1a6b4b 0%, #0d9668 50%, #10b981 100%);
      border-bottom: 3px solid rgba(16, 185, 129, 0.3);
    }

    .finance-logo-icon {
      font-size: 1.75rem;
      color: #ffffff;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .finance-logo-text {
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5px;
    }

    .card {
      border-radius: 12px;
      overflow: hidden;
    }

    .footer-alt {
      color: rgba(255, 255, 255, 0.7);
    }
  `,
})
export class AccountWrapperComponent {
  appTitle = environment.appTitle
  year = new Date().getFullYear()

  @ContentChild('bottomLinks') bottomLinksTemplate!: TemplateRef<
    HTMLElement | HTMLElement[]
  >
}
