import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ContactComponent } from './components/contact.component'
import { FaqComponent } from './components/faq.component'
import { Feature1Component } from './components/feature1.component'
import { Feature2Component } from './components/feature2.component'
import { FooterComponent } from './components/footer.component'
import { HomeComponent } from './components/home.component'
import { PricingComponent } from './components/pricing.component'
import { ServiceComponent } from './components/service.component'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-landing',
    imports: [
        CommonModule,
        ContactComponent,
        FaqComponent,
        Feature1Component,
        Feature2Component,
        FooterComponent,
        HomeComponent,
        PricingComponent,
        ServiceComponent,
        RouterModule,
    ],
    template: `
    <!-- NAVBAR START -->
    <nav class="navbar navbar-expand-lg py-lg-3 navbar-dark">
      <div class="container">
        <!-- logo -->
        <a routerLink="/" class="navbar-brand me-lg-5">
          <img
            src="assets/images/logo.png"
            alt="logo"
            class="logo-dark"
            height="22"
          />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="mdi mdi-menu"></i>
        </button>

        <!-- menus -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <!-- left menu -->
          <ul class="navbar-nav me-auto align-items-center">
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">Home</a>
            </li>
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">Features</a>
            </li>
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">Pricing</a>
            </li>
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">FAQs</a>
            </li>
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">Clients</a>
            </li>
            <li class="nav-item mx-lg-1">
              <a class="nav-link active" href="javascript:void(0);">Contact</a>
            </li>
          </ul>

          <!-- right menu -->
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item me-0">
              <a
                href="#"
                target="_blank"
                class="nav-link d-lg-none"
                >Purchase now</a
              >
              <a
                href="#"
                target="_blank"
                class="btn btn-sm btn-light rounded-pill d-none d-lg-inline-flex"
              >
                <i class="mdi mdi-basket me-2"></i> Purchase Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- NAVBAR END -->

    <!-- START HERO -->
    <app-home></app-home>
    <!-- END HERO -->

    <!-- START SERVICES -->
    <app-service></app-service>
    <!-- END SERVICES -->

    <!-- START FEATURES 1 -->
    <app-feature1></app-feature1>
    <!-- END FEATURES 1 -->

    <!-- START FEATURES 2 -->
    <app-feature2></app-feature2>
    <!-- END FEATURES 2 -->

    <!-- START PRICING -->
    <app-pricing></app-pricing>
    <!-- END PRICING -->

    <!-- START FAQ -->
    <app-faq></app-faq>
    <!-- END FAQ -->

    <!-- START CONTACT -->
    <app-contact></app-contact>
    <!-- END CONTACT -->

    <!-- START FOOTER -->
    <app-footer></app-footer>
    <!-- END FOOTER -->
  `,
    styles: ``
})
export class LandingComponent {}
