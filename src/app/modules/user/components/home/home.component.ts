import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IUser } from '../../interfaces/iuser';

const USER_DATA: IUser[] = [
  { id: 1, firstName: 'Hydrogen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 2, firstName: 'Helium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 3, firstName: 'Lithium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 4, firstName: 'Beryllium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 5, firstName: 'Boron', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 6, firstName: 'Carbon', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 7, firstName: 'Nitrogen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 8, firstName: 'Oxygen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 9, firstName: 'Fluorine', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 10, firstName: 'Neon', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
];

@Component({
  selector: 'app-home-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource(USER_DATA);
  isEditMode = false;
  isAdd = false;
  selectedUser: IUser;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  deleteUser(item): void {
    // console.log(item);
    this.dataSource.data.splice(this.dataSource.data.findIndex((value) => value === item), 1);
    this.dataSource._updateChangeSubscription();
  }

  setSelectedUser(user = {} as IUser ): void {
    if (!user.id) {
      this.selectedUser = {} as IUser;
      this.selectedUser.id = 1 + Math.max(0, ...Array.from(this.dataSource.data, (item) => item.id));
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
    const index = this.dataSource.data.findIndex((value) => value.id === updatedUser.user.id);
    if (index >= 0) {
      this.dataSource.data[index] = updatedUser.user;
    } else if (updatedUser.msg === 'success') {
      this.dataSource.data.push(updatedUser.user);
    }
    this.isAdd = false;
    this.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }
}
