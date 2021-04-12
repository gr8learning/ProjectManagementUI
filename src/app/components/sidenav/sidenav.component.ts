import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../modules/shared/services/common.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() public sidenavClose = new EventEmitter();

  constructor(public common: CommonService) { }

  ngOnInit(): void {
  }

  public onSidenavClose = (logout = false) => {
    if (logout) {
      this.common.logout();
    }
    this.sidenavClose.emit();
  }
}
