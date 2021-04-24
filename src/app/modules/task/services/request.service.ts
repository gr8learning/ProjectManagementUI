import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/itask';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';
import { IUser } from '../../user/interfaces/iuser';

const TASK_DATA: ITask[] = [
  {id: 1, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 1', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 2, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 2', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 3, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 3', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 4, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 4', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 5, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 5', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 6, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 6', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 7, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 7', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 8, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 8', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 9, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 9', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 10, assignedToUser: {} as IUser, projectID: 1, detail: 'Detail 10', status: 'New', assignedToUserID: 1, createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
];

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource(TASK_DATA);

  constructor(private globalService: GlobalService) { }

  getAllTask(callback): void {
    this.globalService.getCall('/task', callback);
  }
}
