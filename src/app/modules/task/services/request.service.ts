import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/itask';
import { MatTableDataSource } from '@angular/material/table';

const TASK_DATA: ITask[] = [
  {id: 1, projectId: 1, detail: 'Detail 1', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 2, projectId: 1, detail: 'Detail 2', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 3, projectId: 1, detail: 'Detail 3', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 4, projectId: 1, detail: 'Detail 4', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 5, projectId: 1, detail: 'Detail 5', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 6, projectId: 1, detail: 'Detail 6', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 7, projectId: 1, detail: 'Detail 7', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 8, projectId: 1, detail: 'Detail 8', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 9, projectId: 1, detail: 'Detail 9', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 10, projectId: 1, detail: 'Detail 10', status: 'New', assignedToUserId: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
];

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource(TASK_DATA);

  constructor() { }
}
