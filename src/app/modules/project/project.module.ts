import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    FlexLayoutModule,
    MatRippleModule
  ]
})
export class ProjectModule { }
