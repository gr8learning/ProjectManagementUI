import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(callback): any {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      maxHeight: (window.screen.height - 260) + 'px'
    });
    return dialogRef.afterClosed().subscribe((res) => {
      callback(res);
    });
  }
}
