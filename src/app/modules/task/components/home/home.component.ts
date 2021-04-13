import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ITask } from '../../interfaces/itask';

const TASK_DATA: ITask[] = [
  {id: 1, projectId: 1, detail: 'Detail 1', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 2, projectId: 1, detail: 'Detail 2', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 3, projectId: 1, detail: 'Detail 3', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 4, projectId: 1, detail: 'Detail 4', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 5, projectId: 1, detail: 'Detail 5', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 6, projectId: 1, detail: 'Detail 6', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 7, projectId: 1, detail: 'Detail 7', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 8, projectId: 1, detail: 'Detail 8', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 9, projectId: 1, detail: 'Detail 9', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
  {id: 10, projectId: 1, detail: 'Detail 10', status: 'new', assignedToUser: 'Nitin', createdOn: 'Tue, 13 Apr 2021 08:49:23 GMT'},
];


@Component({
  selector: 'app-home-task',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'projectId', 'assignedToUser', 'detail', 'status', 'createdOn', 'actions'];
  dataSource = new MatTableDataSource(TASK_DATA);
  isEditMode = false;
  isAdd = false;
  selectedTask: ITask;

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

  setSelectedTask(task = {} as ITask ): void {
    if (!task.id) {
      this.selectedTask = {} as ITask;
      this.selectedTask.id = 1 + Math.max(0, ...Array.from(this.dataSource.data, (item) => item.id));
      this.selectedTask.projectId = -1;
      this.selectedTask.assignedToUser = '';
      this.selectedTask.detail = '';
      this.selectedTask.status = 'New';
      this.isAdd = true;
    } else {
      this.selectedTask = task;
      this.isAdd = false;
    }
    this.isEditMode = true;
  }

  updateTaskRecordById(updatedTask: { task: ITask, msg: string }): void {
    const index = this.dataSource.data.findIndex((value) => value.id === updatedTask.task.id);
    if (index >= 0) {
      this.dataSource.data[index] = updatedTask.task;
    } else if (updatedTask.msg === 'success') {
      this.dataSource.data.push(updatedTask.task);
    }
    this.isAdd = false;
    this.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }

}
