import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, inject } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { PermissionService } from '@/app/core/service/permission.service'

/**
 * Directiva para mostrar/ocultar elementos basado en permisos
 *
 * Ejemplos de uso:
 * - *appHasPermission="'users.add'" => Mostrar solo si tiene el permiso 'users.add'
 * - *appHasPermission="['users.add', 'users.edit']; strategy: 'all'" => Mostrar si tiene TODOS los permisos
 * - *appHasPermission="['users.add', 'users.edit']; strategy: 'any'" => Mostrar si tiene AL MENOS UNO
 */
@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>)
  private viewContainer = inject(ViewContainerRef)
  private permissionService = inject(PermissionService)
  private destroy$ = new Subject<void>()

  @Input() appHasPermission: string | string[] = []
  @Input() appHasPermissionStrategy: 'any' | 'all' = 'any'

  ngOnInit(): void {
    this.updateView()
    this.permissionService.permissions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateView()
    })
  }

  private updateView(): void {
    const hasPermission = this.checkPermission()
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  private checkPermission(): boolean {
    const permissions = Array.isArray(this.appHasPermission)
      ? this.appHasPermission
      : [this.appHasPermission]

    if (this.appHasPermissionStrategy === 'all') {
      return this.permissionService.hasAllPermissions(permissions)
    }

    return this.permissionService.hasAnyPermission(permissions)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
