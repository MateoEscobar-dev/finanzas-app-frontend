import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, inject } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { PermissionService } from '@/app/core/service/permission.service'

/**
 * Directiva para mostrar/ocultar elementos basado en roles
 *
 * Ejemplos de uso:
 * - *appHasRole="'Administrator'" => Mostrar solo si tiene el rol 'Administrator'
 * - *appHasRole="['Administrator', 'Manager']; strategy: 'all'" => Mostrar si tiene TODOS los roles
 * - *appHasRole="['Administrator', 'Manager']; strategy: 'any'" => Mostrar si tiene AL MENOS UNO
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>)
  private viewContainer = inject(ViewContainerRef)
  private permissionService = inject(PermissionService)
  private destroy$ = new Subject<void>()

  @Input() appHasRole: string | string[] = []
  @Input() appHasRoleStrategy: 'any' | 'all' = 'any'

  ngOnInit(): void {
    this.updateView()
    this.permissionService.roles$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateView()
    })
  }

  private updateView(): void {
    const hasRole = this.checkRole()
    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  private checkRole(): boolean {
    const roles = Array.isArray(this.appHasRole) ? this.appHasRole : [this.appHasRole]

    if (this.appHasRoleStrategy === 'all') {
      return this.permissionService.hasAllRoles(roles)
    }

    return this.permissionService.hasAnyRole(roles)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
