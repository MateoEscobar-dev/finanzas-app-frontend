import { TranslationService } from '@/app/core/service/translation.service';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule]
})
export class SpinnerComponent implements OnInit {
  translationService = inject(TranslationService);
  title = '';
  message = '';
  showTitle = true;
  showMessage = true;

  constructor(
    public spinnerRef: MatDialogRef<SpinnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; showTitle: boolean; showMessage: boolean }
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.showTitle = this.data.showTitle;
    this.showMessage = this.data.showMessage;
  }
}
