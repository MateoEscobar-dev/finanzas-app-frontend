import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'el', 'it', 'ru', 'es', 'fr']
  private LANGUAGE_KEY = 'lang'
  public selectedLanguage: string = 'es'

  constructor(
    public translate: TranslateService,
    private cookieService: CookieService
  ) {
    // El idioma ya está configurado en app.config.ts
    // Solo necesitamos sincronizar la variable local
    this.selectedLanguage =
      this.translate.currentLang || this.translate.defaultLang || 'en'
  }

  /***
   * Cookie Language set
   */
  public setLanguage(lang: string) {
    this.translate.use(lang)
    this.cookieService.set('lang', lang)
    localStorage.setItem('lang', lang)
  }

  private languageMap: { [key: string]: number } = {
    sp: 1,
    es: 1,
    en: 2,
    el: 3,
    it: 4,
    ru: 5,
    fr: 6,
  }

  private languageMapData: { [key: string]: { key: string; value: number } } = {
    sp: { key: 'es-ES', value: 1 },
    es: { key: 'es-ES', value: 1 },
    en: { key: 'en-US', value: 2 },
    el: { key: 'el-GR', value: 3 },
    it: { key: 'it-IT', value: 4 },
    ru: { key: 'ru-RU', value: 5 },
    fr: { key: 'fr-FR', value: 6 },
  }

  getLanguageId(lang: string): number {
    return this.languageMap[lang] || 0
  }

  getLanguageInfo(
    lang: string,
    property?: 'key' | 'value'
  ): { key: string; value: number } | string | number | undefined {
    const langData = this.languageMapData[lang]
    if (!langData) return undefined

    if (property) {
      return langData[property]
    }

    return langData
  }
}
