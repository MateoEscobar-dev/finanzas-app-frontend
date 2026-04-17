import { Component, OnInit, AfterViewInit } from '@angular/core'
import { HORIZONTAL_MENU } from '../shared/menu-meta'
import { MenuItem } from '../shared/models/menu.model'
import { CommonModule } from '@angular/common'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { findAllParent, findMenuItem } from '../shared/helper/utils'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-horizontal-topbar',
  imports: [CommonModule, RouterModule, TranslateModule, NgbDropdownModule],
  templateUrl: './horizontal-topbar.component.html',
  styles: ``,
})
export class HorizontalTopbarComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[] = []
  activeMenuItems: string[] = []

  constructor(
    router: Router,
    public translate: TranslateService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu()
      }
    })
  }

  ngOnInit(): void {
    this.menuItems = HORIZONTAL_MENU
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    })
  }

  /**
   * activate the menuitems
   */
  _activateMenu(): void {
    const div = document.getElementById('topnav-menu-content')
    let matchingMenuItem = null
    if (div) {
      const items: HTMLCollectionOf<HTMLAnchorElement> =
        div.getElementsByClassName(
          'nav-link-ref'
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
          this.activeMenuItems = [
            activeMt['key']!,
            ...findAllParent(this.menuItems, activeMt),
          ]
        }
      }
    }
  }

  hasSubmenu(menu: MenuItem): boolean {
    return menu.subMenu ? true : false
  }
}
