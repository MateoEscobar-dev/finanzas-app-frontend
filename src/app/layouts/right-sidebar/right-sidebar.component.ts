import { Component, Renderer2, inject } from '@angular/core'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'

import {
  changeMode,
  changecolor,
  changelayout,
  changemenucolor,
  changeposition,
  changesidebarsize,
  changetopbarcolor,
  resetState,
} from '@store/layout/layout-action'
import { LayoutState } from '@store/layout/layout-reducers'
import {
  getLayoutColor,
  getLayoutPosition,
  getLayoutmode,
  getMenucolor,
  getSidebarsize,
  getTopbarcolor,
} from '@store/layout/layout-selector'

@Component({
    selector: 'app-right-sidebar',
    imports: [SimplebarAngularModule],
    templateUrl: './right-sidebar.component.html',
    styles: ``
})
export class RightSidebarComponent {
  public isRightSidebarOpen: boolean = false

    offcanvas = inject(NgbActiveOffcanvas)
  render = inject(Renderer2)
  store = inject(Store)

  layout: string = ''
  color: string = ''
  mode: string = ''
  topbar: string = ''
  menucolor: string = ''
  sidebarsize: string = ''
  position: string = ''

  ngOnInit(): void {
    this.store.select('layout').subscribe((data: LayoutState) => {
      this.layout = data.LAYOUT
      this.color = data.LAYOUT_COLOR
      this.mode = data.LAYOUT_MODE
      this.topbar = data.TOPBAR_COLOR
      this.menucolor = data.MENU_COLOR
      this.sidebarsize = data.SIDEBAR_SIZE
      this.position = data.LAYOUT_POSITION
    })
  }

  // Change Layout
  changeLayout(layout: string) {
    this.store.dispatch(changelayout({ layout }))
  }

  // Change Layout Color
  changeLayoutColor(color: string) {
    this.store.dispatch(changecolor({ color }))
    this.store.select(getLayoutColor).subscribe((color) => {
      this.render.setAttribute(document.documentElement, 'data-bs-theme', color)
    })
  }

  // Change Layout Mode
  changeLayoutMode(mode: string) {
    this.store.dispatch(changeMode({ mode }))
    this.store.select(getLayoutmode).subscribe((mode) => {
      this.render.setAttribute(
        document.documentElement,
        'data-layout-mode',
        mode
      )
    })
  }

  // Change Topbar Color
  changeTopbar(topbar: string) {
    this.store.dispatch(changetopbarcolor({ topbar }))
    this.store.select(getTopbarcolor).subscribe((topbar) => {
      this.render.setAttribute(
        document.documentElement,
        'data-topbar-colo',
        topbar
      )
    })
  }

  // Change Menu Color
  changeMenu(menu: string) {
    this.store.dispatch(changemenucolor({ menu }))
    this.store.select(getMenucolor).subscribe((menucolor) => {
      this.render.setAttribute(
        document.documentElement,
        'data-menu-color',
        menucolor
      )
    })
  }

  // Change Sidebar Size
  changeSize(size: string) {
    this.store.dispatch(changesidebarsize({ size }))
    this.store.select(getSidebarsize).subscribe((size) => {
      this.render.setAttribute(
        document.documentElement,
        'data-sidenav-size',
        size
      )
    })
  }

  // Change Layout Position
  changeLayoutPosition(position: string) {
    this.store.dispatch(changeposition({ position }))
    this.store.select(getLayoutPosition).subscribe((position) => {
      this.render.setAttribute(
        document.documentElement,
        'data-layout-position',
        position
      )
    })
  }

  // Show Sidebar User
  changeSidebarUser(event: Event) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.render.setAttribute(
        document.documentElement,
        'data-sidenav-user',
        'true'
      )
    } else {
      this.render.removeAttribute(document.documentElement, 'data-sidenav-user')
    }
  }

  // Reset Option
  reset() {
    this.store.dispatch(resetState())
  }
}
