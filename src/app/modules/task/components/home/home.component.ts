import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSort } from '@angular/material/sort';
import { ITask } from '../../interfaces/itask';
import { RequestService } from '../../services/request.service';
import { RequestService as ProjectRequestService } from '../../../project/services/request.service';
import { RequestService as UserRequestService } from '../../../user/services/request.service';
import { IIdValue } from '../../../shared/interfaces/iidvalue';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../shared/services/dialog.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-home-task',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'projectID', 'assignedToUser', 'detail', 'status', 'createdOn', 'actions'];
  isEditMode = false;
  isAdd = false;
  selectedTask: ITask;

  userList = {} as IIdValue;
  projectList = {} as IIdValue;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public request: RequestService, private projectRequest: ProjectRequestService,
              private userRequest: UserRequestService, private dialogService: DialogService,
              private snackbarService: SnackbarService, public common: CommonService) { }

  ngOnInit(): void {
    this.projectRequest.getAllProject((resp) => {
      if (resp.status === 200) {
        resp.body.forEach((value) => {
          this.projectList[value.id] = value.name;
        });
      }
    });

    this.userRequest.getAllUser((resp) => {
      if (resp.status === 200) {
        resp.body.forEach((value) => {
          this.userList[value.id] = value.firstName + ' ' + value.lastName.toUpperCase();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.request.getAllTask((resp) => {
      if (resp.status === 200) {
        this.request.dataSource = new MatTableDataSource(resp.body);
        this.request.dataSource.sort = this.sort;
      }
    });
  }

  deleteTask(item): void {
    this.request.deleteTaskById(item.id, (resp) => {
      if (resp.status === 200) {
        this.request.dataSource.data.splice(this.request.dataSource.data.findIndex((value) => value === item), 1);
        this.request.dataSource._updateChangeSubscription();
        this.snackbarService.openMessageSnackbar('Task deleted successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to delete task');
      }
    });
  }

  setSelectedTask(task = {} as ITask): void {
    if (!task.id) {
      this.selectedTask = {} as ITask;
      this.selectedTask.id = 1 + Math.max(0, ...Array.from(this.request.dataSource.data, (item) => item.id));
      this.selectedTask.projectID = -1;
      this.selectedTask.assignedToUserID = -1;
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
    const index = this.request.dataSource.data.findIndex((value) => value.id === updatedTask.task.id);
    if (index >= 0) {
      this.request.dataSource.data[index] = updatedTask.task;
    } else if (updatedTask.msg === 'success') {
      this.request.dataSource.data.push(updatedTask.task);
    }
    this.isAdd = false;
    this.request.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }

  getUserById(id): string {
    return id >= 0 ? this.userList[id] : '';
  }

  getProjectById(id): string {
    return id >= 0 ? this.projectList[id] : '';
  }

  deleteAllTask(): void {
    this.dialogService.openConfirmationDialog((resp) => {
      if (resp) {
        this.request.deleteAllTask((deleteResp) => {
          if (deleteResp.status === 200) {
            this.request.dataSource = new MatTableDataSource([]);
            this.request.dataSource._updateChangeSubscription();
            this.snackbarService.openMessageSnackbar('All task deleted successfully');
          } else {
            this.snackbarService.openMessageSnackbar('Failed to delete all task');
          }
        });
      }
    });
  }

}
