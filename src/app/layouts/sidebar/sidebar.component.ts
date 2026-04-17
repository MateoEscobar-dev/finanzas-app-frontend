import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { MenuItem } from '../shared/models/menu.model'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  NgbCollapse,
  NgbCollapseModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { findAllParent, findMenuItem } from '../shared/helper/utils'
import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { LanguageService } from '@/app/core/service/language.service'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ConfiguracionesService } from '@/app/services/configuraciones.service'
import { ApiService } from '@/app/services/api.service'

@Component({
  selector: 'app-sidebar',
  imports: [
    SimplebarAngularModule,
    RouterModule,
    NgbCollapseModule,
    CommonModule,
    TranslateModule,
    NgbTooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[] = []
  activeMenuItems: string[] = []
  render = inject(Renderer2)
  menuItemsOriginal: MenuItem[] = []
  private authService = inject(AutenticacionService)
  private langService = inject(LanguageService)

  constructor(
    router: Router,
    public translate: TranslateService,
    private api: ApiService,
    private configuraciones: ConfiguracionesService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu()
        this.hideBackdrop()
      }
    })
  }

  ngOnInit(): void {
    this.initMenu()

    this.configuraciones.reloadMenu$.subscribe(() => {
      this.initMenu()
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    })
  }

  /**
   * initialize menuitems
   */
  initMenu(): void {
    this.loadMenu().subscribe((data) => {
      this.setMenu(data)
    })
  }

  setMenu(menu: MenuItem[]) {
    this.normalizeMenu(menu)
    this.menuItems = menu
    this.menuItemsOriginal = JSON.parse(JSON.stringify(menu)) // copia profunda
  }

  /**
   * Normalizes menu items from API:
   * - Sets collapsed to false for items without children
   * - Ensures subMenu is always an array (never null)
   */
  private normalizeMenu(menu: MenuItem[]): void {
    menu.forEach((item) => {
      // Ensure subMenu is always an array
      if (!item.subMenu) {
        item.subMenu = []
      }

      // If no children, set collapsed to false
      if (item.subMenu.length === 0) {
        item.collapsed = false
      }

      // Recursively normalize submenu items
      if (item.subMenu.length > 0) {
        this.normalizeMenu(item.subMenu)
      }
    })
  }

  loadMenu(): Observable<MenuItem[]> {
    if (this.authService.currentUserValue) {
      const idUsuario =
        this.authService?.currentUserValue?.usuarioControlID ?? 0
      const lang = this.langService.getLanguageId(this.translate.currentLang)
      return this.api
        .get<{
          status: string
          message: string
          data: MenuItem[]
        }>(`menu/hierarchical?idUsuario=${idUsuario}&idioma=${lang}`)
        .pipe(map((response) => response.data || []))
    }
    return of([] as MenuItem[])
  }

  _activateMenu(): void {
    const div = document.querySelector('.side-nav')
    let matchingMenuItem = null

    if (div) {
      const items: HTMLCollectionOf<HTMLAnchorElement> =
        div.getElementsByClassName(
          'side-nav-link-ref'
        ) as HTMLCollectionOf<HTMLAnchorElement>

      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key')
        const activeMt = findMenuItem(this.menuItems, mid!)
        if (activeMt) {
          const matchingObjs = [
            activeMt['key']!,
            ...findAllParent(this.menuItems, activeMt),
          ]

          this.activeMenuItems = matchingObjs
          this.menuItems.forEach((menu: MenuItem) => {
            menu.collapsed = !matchingObjs.includes(menu.key!)
          })
        }
      }
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasSubmenu(menu: MenuItem): boolean {
    return menu.subMenu && menu.subMenu.length > 0 ? true : false
  }

  /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle()
    let openMenuItems: string[]
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key']!,
        ...findAllParent(this.menuItems, menuItem),
      ]
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true
        }
      })
    }
  }

  // Hide Backdrop
  hideBackdrop() {
    document.getElementById('custom-backdrop')?.classList.add('d-none')
    document.documentElement.classList.toggle('sidebar-enable')
  }
}
