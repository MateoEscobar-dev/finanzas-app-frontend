import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-pagetitle',
    imports: [],
    templateUrl: './page-title.component.html',
    styleUrl: './page-title.component.scss'
})

export class PagetitleComponent {
  @Input() title: string | undefined
  @Input() subtitle: string | undefined
  @Input() pagetitle: string | undefined
  @Input() button: string | undefined
  @Output() btnClick = new EventEmitter()

  onbuttonClick() {
    this.btnClick.emit()
  }
}
