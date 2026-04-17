import { Component, HostListener, Renderer2, inject } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { TopbarComponent } from '../topbar/topbar.component'
import { FooterComponent } from '../footer/footer.component'
import { RouterModule } from '@angular/router'
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { changesidebarsize } from '@store/layout/layout-action'
import { getSidebarsize } from '@store/layout/layout-selector'

@Component({
    selector: 'app-vertical',
    imports: [
        SidebarComponent,
        TopbarComponent,
        FooterComponent,
        RouterModule,
    ],
    template: `
    <!-- Begin page -->
    <div class="wrapper">
      <app-topbar
        (settingsButtonClicked)="onSettingsButtonClicked()"
        (mobileMenuButtonClicked)="onToggleMobileMenu()"
      ></app-topbar>
      <app-sidebar></app-sidebar>

      <div class="content-page">
        <div class="content">
          <!-- Start Content-->
          <div class="container-fluid">
            <router-outlet></router-outlet>
          </div>
          <!-- container -->
        </div>
        <!-- content -->
        <app-footer></app-footer>
      </div>
    </div>
  `,
    styles: ``,
    providers: [NgbActiveOffcanvas]
})
export class VerticalComponent {
  private offcanvasService = inject(NgbOffcanvas)
  private store = inject(Store)
  private render = inject(Renderer2)

  ngOnInit(): void {
    const layout = document.documentElement.getAttribute('data-layout')
    if (layout) { 
      this.render.removeAttribute(document.documentElement, 'data-layout')
    }
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
 
    if (document.documentElement.clientWidth <= 767) {
      this.store.dispatch(changesidebarsize({ size: 'full' }))
    } else if (document.documentElement.clientWidth <= 1024) {
      this.store.dispatch(changesidebarsize({ size: 'condensed' }))
      document.getElementById('custom-backdrop')?.classList.add('d-none')
    } else if (document.documentElement.clientWidth >= 1024) {
      this.store.dispatch(changesidebarsize({ size: 'default' }))
      document.getElementById('custom-backdrop')?.classList.add('d-none')
    }
    this.store.select(getSidebarsize).subscribe((size: string) => {
      this.render.setAttribute(
        document.documentElement,
        'data-sidenav-size',
        size
      )
    })
  }

  onSettingsButtonClicked() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }

  onToggleMobileMenu() {
    document.documentElement.classList.toggle('sidebar-enable')
    const size = document.documentElement.getAttribute('data-sidenav-size')
    if (document.documentElement.clientWidth >= 767) {
      if (size == 'condensed') {
        this.store.dispatch(changesidebarsize({ size: 'default' }))
      } else {
        this.store.dispatch(changesidebarsize({ size: 'condensed' }))
      }
    } else {
      document.getElementById('custom-backdrop')?.classList.remove('d-none')
    }
    this.store.select(getSidebarsize).subscribe((size: string) => {
      this.render.setAttribute(
        document.documentElement,
        'data-sidenav-size',
        size
      )
    })
  }
}
