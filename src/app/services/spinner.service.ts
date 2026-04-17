import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner/spinner.component';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private dialogRef: MatDialogRef<SpinnerComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  showByComponents(showMessage: boolean, showTitle: boolean, title = 'loading-title', message = 'loading-message'): void {
    if (!this.dialogRef) {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.width = 'auto';
      config.height = 'auto';
      config.hasBackdrop = true;
      config.panelClass = 'transparent-dialog';
      config.data = { title, message, showTitle, showMessage };
      this.dialogRef = this.dialog.open(SpinnerComponent, config);
    }
  }
  show(title = 'loading-title', message = 'loading-message'): void {
    if (!this.dialogRef) {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.width = 'auto';
      config.height = 'auto';
      config.hasBackdrop = true;
      config.panelClass = 'transparent-dialog';
      config.data = { title, message, showTitle: true, showMessage: true };

      this.dialogRef = this.dialog.open(SpinnerComponent, config);
    }
  }

  hide(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
