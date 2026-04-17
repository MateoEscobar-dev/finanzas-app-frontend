import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core'
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { rootReducer } from './store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { provideEffects } from '@ngrx/effects'
import { JwtInterceptor } from '@core/helpers/jwt.interceptor'
import { ErrorInterceptor } from '@core/helpers/error.interceptor'
import { AuthenticationEffects } from '@store/authentication/authentication.effects'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { ToastrModule } from 'ngx-toastr'
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader'
import { authInterceptor } from './services/autenticacion/auth.interceptor'
import {
  DEFAULT_LINK_ACTIONS_PROVIDER,
  linkActionsInitializer,
} from './core/link-actions/link-actions.providers'
import { LanguageService } from './core/service/language.service'

// Obtener idioma inicial desde localStorage/cookie
function getInitialLanguage(): string {
  // 1. Intentar obtener de localStorage
  const savedLang = localStorage.getItem('lang')
  if (savedLang && savedLang.match(/en|el|it|ru|es|fr/)) {
    return savedLang
  }

  // 2. Intentar obtener del navegador
  const browserLang = navigator.language.split('-')[0]
  if (browserLang && browserLang.match(/en|el|it|ru|es|fr/)) {
    return browserLang
  }

  // 3. Fallback a inglés
  return 'en'
}
// required for AoT
export function createTranslateLoader(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend, [
    { prefix: 'assets/i18n/', suffix: '.json' },
    { prefix: 'assets/i18n/columns/', suffix: '.json' },
    { prefix: 'assets/i18n/actions/', suffix: '.json' },
    { prefix: 'assets/i18n/errors/', suffix: '.json' },
    { prefix: 'assets/i18n/labels/', suffix: '.json' },
    { prefix: 'assets/i18n/placeholders/', suffix: '.json' },
    { prefix: 'assets/i18n/validations/', suffix: '.json' },
    { prefix: 'assets/i18n/status/', suffix: '.json' },
    { prefix: 'assets/i18n/confirmations/', suffix: '.json' },
    { prefix: 'assets/i18n/messages/', suffix: '.json' },
  ])
}

// Scroll
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig)

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideRouter(routes, inMemoryScrollingFeature),
    provideStore(rootReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthenticationEffects),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
    TranslateService,
    importProvidersFrom(
      // HttpClientModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        defaultLanguage: getInitialLanguage(),
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpBackend],
        },
      }),
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        preventDuplicates: true,
      })
    ),
    DEFAULT_LINK_ACTIONS_PROVIDER,
    linkActionsInitializer,
  ],
}
