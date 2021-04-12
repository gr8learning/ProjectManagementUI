import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-home-task',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) {
    auth.name = 'Nitin Kumar';
  }

  ngOnInit(): void {
  }

}
