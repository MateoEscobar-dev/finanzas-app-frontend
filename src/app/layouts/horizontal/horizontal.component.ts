import { Component, Renderer2, inject, OnInit } from '@angular/core'
import { TopbarComponent } from '../topbar/topbar.component'
import { RouterModule } from '@angular/router'
import { FooterComponent } from '../footer/footer.component'
import { HorizontalTopbarComponent } from '../horizontal-topbar/horizontal-topbar.component'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component'

@Component({
    selector: 'app-horizontal',
    imports: [
        TopbarComponent,
        HorizontalTopbarComponent,
        RouterModule,
        FooterComponent,
    ],
    template: `
    <!-- Begin page -->
    <div class="wrapper">
      <app-topbar
        (settingsButtonClicked)="onSettingsButtonClicked()"
        (mobileMenuButtonClicked)="onToggleMobileMenu()"
      ></app-topbar>
      <app-horizontal-topbar></app-horizontal-topbar>

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
    styles: ``
})
export class HorizontalComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas)
  private render = inject(Renderer2)

  ngOnInit(): void {
    this.render.setAttribute(document.documentElement, 'data-layout', 'topnav')
  }

  onSettingsButtonClicked() {
    this.offcanvasService.open(RightSidebarComponent, { position: 'end' })
  }

  onToggleMobileMenu() {
    document.getElementById('topnav-menu-content')?.classList.toggle('show')
  }
}
