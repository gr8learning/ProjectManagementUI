import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
