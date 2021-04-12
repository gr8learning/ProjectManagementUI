import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
