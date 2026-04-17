import { Injectable, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export interface ISwalConfig {
  titleKey?: string
  textKey?: string
  htmlKey?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmButtonTextKey?: string
  cancelButtonTextKey?: string
  showCancelButton?: boolean
  showConfirmButton?: boolean
  timer?: number
  params?: Record<string, any>
}

@Injectable({
  providedIn: 'root',
})
export class SwalHelperService {
  private translateService = inject(TranslateService)

  /**
   * Muestra un diálogo SweetAlert con traducciones automáticas
   * @param config Configuración del diálogo
   * @returns Promise con el resultado de SweetAlert
   */
  show(config: ISwalConfig): Promise<SweetAlertResult> {
    const translatedConfig: SweetAlertOptions = {
      title: config.titleKey
        ? this.translate(config.titleKey, config.params)
        : undefined,
      text: config.textKey
        ? this.translate(config.textKey, config.params)
        : undefined,
      html: config.htmlKey
        ? this.translate(config.htmlKey, config.params)
        : undefined,
      icon: config.icon,
      confirmButtonText: config.confirmButtonTextKey
        ? this.translate(config.confirmButtonTextKey, config.params)
        : this.translate('actions.confirm'),
      cancelButtonText: config.cancelButtonTextKey
        ? this.translate(config.cancelButtonTextKey, config.params)
        : this.translate('actions.cancel'),
      showCancelButton: config.showCancelButton ?? false,
      showConfirmButton: config.showConfirmButton ?? true,
      timer: config.timer,
      customClass: {
        popup: 'swal-popup-modern',
        confirmButton: 'swal-confirm-modern',
        cancelButton: 'swal-cancel-modern',
      },
    }

    return Swal.fire(translatedConfig)
  }

  /**
   * Diálogo de confirmación simple
   * @param titleKey Key de traducción del título
   * @param textKey Key de traducción del texto
   * @param params Parámetros para interpolación
   * @returns Promise<boolean> true si confirma, false si cancela
   */
  confirm(
    titleKey: string,
    textKey?: string,
    params?: Record<string, any>
  ): Promise<boolean> {
    return this.show({
      titleKey,
      textKey,
      icon: 'question',
      showCancelButton: true,
      params,
    }).then((result) => result.isConfirmed)
  }

  /**
   * Diálogo de éxito
   * @param titleKey Key de traducción del título
   * @param textKey Key de traducción del texto
   * @param params Parámetros para interpolación
   */
  success(
    titleKey: string,
    textKey?: string,
    params?: Record<string, any>
  ): Promise<SweetAlertResult> {
    return this.show({
      titleKey,
      textKey,
      icon: 'success',
      params,
    })
  }

  /**
   * Diálogo de error
   * @param titleKey Key de traducción del título
   * @param textKey Key de traducción del texto
   * @param params Parámetros para interpolación
   */
  error(
    titleKey: string,
    textKey?: string,
    params?: Record<string, any>
  ): Promise<SweetAlertResult> {
    return this.show({
      titleKey,
      textKey,
      icon: 'error',
      params,
    })
  }

  /**
   * Diálogo de advertencia
   * @param titleKey Key de traducción del título
   * @param textKey Key de traducción del texto
   * @param params Parámetros para interpolación
   */
  warning(
    titleKey: string,
    textKey?: string,
    params?: Record<string, any>
  ): Promise<SweetAlertResult> {
    return this.show({
      titleKey,
      textKey,
      icon: 'warning',
      params,
    })
  }

  /**
   * Diálogo de información
   * @param titleKey Key de traducción del título
   * @param textKey Key de traducción del texto
   * @param params Parámetros para interpolación
   */
  info(
    titleKey: string,
    textKey?: string,
    params?: Record<string, any>
  ): Promise<SweetAlertResult> {
    return this.show({
      titleKey,
      textKey,
      icon: 'info',
      params,
    })
  }

  /**
   * Traduce una key con parámetros opcionales
   * @param key Key de traducción
   * @param params Parámetros para interpolación
   * @returns Texto traducido
   */
  private translate(key: string, params?: Record<string, any>): string {
    return this.translateService.instant(key, params)
  }
}
