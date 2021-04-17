import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../modules/shared/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public common: CommonService) { }

  ngOnInit(): void {
  }

}
