import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  id: number;
  detail: string;
  createdOn: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 2, name: 'Helium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 3, name: 'Lithium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 4, name: 'Beryllium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 5, name: 'Boron', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 6, name: 'Carbon', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 7, name: 'Nitrogen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 8, name: 'Oxygen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 9, name: 'Fluorine', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 10, name: 'Neon', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
];

@Component({
  selector: 'app-home-project',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'detail', 'createdOn', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
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
