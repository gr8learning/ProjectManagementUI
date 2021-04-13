import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedModule: string;

  constructor(private router: Router) {
    this.setSelectedModule();
  }

  ngOnInit(): void {
  }

  setSelectedModule(): void {
    const path = window.location.pathname;
    if (path.startsWith('/task')) {
      this.selectedModule = 'task';
    } else if (path.startsWith('/project')) {
      this.selectedModule = 'project';
    } else if (path.startsWith('/user')) {
      this.selectedModule = 'user';
    } else {
      this.selectedModule = '';
    }
  }

  updateSelectedModule(value): void {
    this.selectedModule = value;
  }
  navigateTo(value): void {
    if (value) {
        const _ = this.router.navigate([value]);
    }
}

}
