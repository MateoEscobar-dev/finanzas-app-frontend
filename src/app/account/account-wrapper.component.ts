import { CommonModule } from '@angular/common'
import {
  Component,
  ContentChild,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { BgCirclesComponent } from '@component/bg-circles/bg-circles.component'
import { environment } from '@/environments/environment'
import { LanguageService } from '@/app/core/service/language.service'

interface LangOption {
  code: string
  label: string
  flag: string
}

@Component({
  selector: 'app-account-wrapper',
  imports: [CommonModule, BgCirclesComponent, RouterModule],
  template: `
    <bg-circles></bg-circles>
    <div class="account-pages pt-2 pt-sm-2 pb-2 pb-sm-2 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-6 col-lg-7 col-md-9">
            <div class="card shadow-lg border-0">
              <!-- Logo / Brand Header -->
              <div class="card-header py-3 text-center finance-header">
                <div class="d-flex align-items-center justify-content-between px-1">
                  <div class="flex-grow-1 text-center">
                    <a routerLink="/" class="text-decoration-none">
                      <div class="d-flex align-items-center justify-content-center gap-2">
                        <i class="ri-wallet-3-fill finance-logo-icon"></i>
                        <span class="finance-logo-text">{{ appTitle }}</span>
                      </div>
                    </a>
                  </div>
                  <!-- Selector de idioma -->
                  <div class="lang-select-wrapper">
                    <select
                      class="lang-select"
                      [value]="currentLang.code"
                      (change)="onLangChange($event)"
                      title="Cambiar idioma"
                    >
                      @for (lang of languages; track lang.code) {
                        <option [value]="lang.code">{{ lang.flag }} {{ lang.code.toUpperCase() }}</option>
                      }
                    </select>
                  </div>
                </div>
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
      background: #1e293b;
      border-bottom: 1px solid #334155;
      padding: 16px 20px !important;
    }

    .finance-logo-icon {
      font-size: 1.4rem;
      color: #10b981;
    }

    .finance-logo-text {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: 0.3px;
    }

    .lang-select-wrapper {
      flex-shrink: 0;
    }

    .lang-select {
      appearance: none;
      background: #2d3f55;
      border: 1px solid #475569;
      border-radius: 6px;
      color: #cbd5e1;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 4px 10px;
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s ease;

      option {
        background: #1e293b;
        color: #f1f5f9;
      }

      &:hover, &:focus {
        border-color: #10b981;
        color: #f1f5f9;
      }
    }

    .card {
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06) !important;
    }

    .card-body {
      max-height: 72vh;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;

      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }
    }

    .footer-alt {
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.8rem;
    }
  `,
})
export class AccountWrapperComponent implements OnInit {
  appTitle = environment.appTitle
  year = new Date().getFullYear()

  private languageService = inject(LanguageService)

  languages: LangOption[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  ]

  currentLang: LangOption = this.languages[0]

  @ContentChild('bottomLinks') bottomLinksTemplate!: TemplateRef<
    HTMLElement | HTMLElement[]
  >

  ngOnInit(): void {
    // Detectar idioma del navegador o cookie/localStorage
    const browserLang = navigator.language.split('-')[0]
    const savedLang = localStorage.getItem('lang')
    const activeLang = savedLang || browserLang

    const found = this.languages.find((l) => l.code === activeLang)
    if (found) {
      this.currentLang = found
      this.languageService.setLanguage(found.code)
    }
  }

  changeLang(lang: LangOption): void {
    this.currentLang = lang
    this.languageService.setLanguage(lang.code)
  }

  onLangChange(event: Event): void {
    const code = (event.target as HTMLSelectElement).value
    const found = this.languages.find((l) => l.code === code)
    if (found) this.changeLang(found)
  }
}

