import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from './services/dialog.service';
import { SnackbarService } from './services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    NotFoundComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [AuthService, DialogService, SnackbarService]
})
export class SharedModule { }
