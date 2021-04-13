import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  providers: [AuthService]
})
export class SharedModule { }
