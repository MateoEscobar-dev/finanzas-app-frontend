import { Component, Renderer2, inject, OnInit } from '@angular/core'
import { HorizontalComponent } from '../horizontal/horizontal.component'
import { VerticalComponent } from '../vertical/vertical.component'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-private-layout',
    imports: [HorizontalComponent, VerticalComponent],
    template: `
    @if (isVerticalLayoutRequested()) {
      <app-vertical></app-vertical>
    }
    @if (isHorizontalLayoutRequested()) {
      <app-horizontal></app-horizontal>
    }
  `,
    styles: ``
})
export class PrivateLayoutComponent implements OnInit {
  layoutType: string = ''

  private store = inject(Store)
  private render = inject(Renderer2)

  ngOnInit(): void {
    this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT
      this.render.setAttribute(
        document.documentElement,
        'data-bs-theme',
        data.LAYOUT_COLOR
      )
      this.render.setAttribute(
        document.documentElement,
        'data-layout-mode',
        data.LAYOUT_MODE
      )
      this.render.setAttribute(
        document.documentElement,
        'data-menu-color',
        data.MENU_COLOR
      )
      this.render.setAttribute(
        document.documentElement,
        'data-topbar-color',
        data.TOPBAR_COLOR
      )
      this.render.setAttribute(
        document.documentElement,
        'data-layout-position',
        data.LAYOUT_POSITION
      )
      this.render.setAttribute(
        document.documentElement,
        'data-sidenav-size',
        data.SIDEBAR_SIZE
      )
    })
    this.render.addClass(document.documentElement, 'menuitem-active')
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === 'horizontal'
  }
  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === 'vertical'
  }
}
