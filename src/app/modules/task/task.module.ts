import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GlobalService } from '../shared/services/global.service';
import { RequestService } from './services/request.service';


@NgModule({
  declarations: [HomeComponent, AddEditComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    FlexLayoutModule,
    MatRippleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [GlobalService, RequestService]
})
export class TaskModule { }
