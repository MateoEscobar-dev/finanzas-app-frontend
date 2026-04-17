import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router'
import { TitleService } from '@core/service/title.service'

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  showLoader: boolean = true

  constructor(
    private router: Router,
    private titleService: TitleService
  ) {
    this.router.events.subscribe((event: Event) => {
      this.checkRouteChange(event)
    })
  }

  ngOnInit(): void {
    this.titleService.init()
  }

  // show Loader when route change
  checkRouteChange(routerEvent: Event) {
    // if route change started
    if (routerEvent instanceof NavigationStart) {
      this.showLoader = true
    }
    // if route change ended
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      setTimeout(() => {
        this.showLoader = false
      }, 200)
    }
  }
}
