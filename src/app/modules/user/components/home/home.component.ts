import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { IUser } from '../../interfaces/iuser';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  isEditMode = false;
  isAdd = false;
  selectedUser: IUser;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public request: RequestService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.request.dataSource.sort = this.sort;
  }

  deleteUser(item): void {
    // console.log(item);
    this.request.dataSource.data.splice(this.request.dataSource.data.findIndex((value) => value === item), 1);
    this.request.dataSource._updateChangeSubscription();
  }

  setSelectedUser(user = {} as IUser ): void {
    if (!user.id) {
      this.selectedUser = {} as IUser;
      this.selectedUser.id = 1 + Math.max(0, ...Array.from(this.request.dataSource.data, (item) => item.id));
      this.selectedUser.firstName = '';
      this.selectedUser.lastName = '';
      this.selectedUser.email = '';
      this.isAdd = true;
    } else {
      this.selectedUser = user;
      this.isAdd = false;
    }
    this.isEditMode = true;
  }

  updateUserRecordById(updatedUser: { user: IUser, msg: string }): void {
    const index = this.request.dataSource.data.findIndex((value) => value.id === updatedUser.user.id);
    if (index >= 0) {
      this.request.dataSource.data[index] = updatedUser.user;
    } else if (updatedUser.msg === 'success') {
      this.request.dataSource.data.push(updatedUser.user);
    }
    this.isAdd = false;
    this.request.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }
}
