import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface TaskElement {
  detail: string;
  id: number;
  status: string;
  assignedToUser: string;
  createdOn: string;
}

const ELEMENT_DATA: TaskElement[] = [
  {id: 1, detail: 'Detail 1', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 2, detail: 'Detail 2', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 3, detail: 'Detail 3', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 4, detail: 'Detail 4', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 5, detail: 'Detail 5', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 6, detail: 'Detail 6', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 7, detail: 'Detail 7', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 8, detail: 'Detail 8', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 9, detail: 'Detail 9', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 10, detail: 'Detail 10', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
];


@Component({
  selector: 'app-home-task',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'detail', 'status', 'assignedToUser', 'createdOn', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService) {
    auth.name = 'Nitin Kumar';
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

}
