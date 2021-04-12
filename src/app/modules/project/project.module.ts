import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
