import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { AddEditComponent } from './components/add-edit/add-edit.component';


@NgModule({
  declarations: [HomeComponent, AddEditComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    FlexLayoutModule,
    MatRippleModule
  ]
})
export class UserModule { }
