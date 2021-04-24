import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/itask';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';
import { IIdValue } from '../../../shared/interfaces/iidvalue';
import { RequestService } from '../../services/request.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @Input() taskData: ITask;
  @Input() isAdd: boolean;
  @Input() userList: IIdValue;
  @Input() projectList: IIdValue;
  @Output() taskDataEmitter = new EventEmitter<{ task: ITask, msg: string }>();

  taskForm = new FormGroup({
    projectID: new FormControl('', []),
    detail: new FormControl('', [Validators.required, Validators.minLength(2)]),
    status: new FormControl('', []),
    assignedToUserID: new FormControl('', [])
  });

  statusOptions = ['New', 'InProgress', 'QA', 'Completed'];

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor(private request: RequestService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.taskForm.patchValue({
      projectID: this.taskData.projectID,
      detail: this.taskData.detail,
      status: this.taskData.status,
      assignedToUser: this.taskData.assignedToUserID,
    });
    this.request.getTaskById(this.taskData.id, (resp) => {
      if (resp.status === 200) {
        this.taskForm.patchValue(resp.body);
      }
    });
  }

  emitTask(isCancel = false): void {
    if (isCancel) {
      this.taskDataEmitter.emit({ task: {} as ITask, msg: 'cancel' });
    } else if (this.isAdd) {
      this.addTask();
    } else {
      this.updateTask();
    }
  }

  get projectID(): any {
    return this.taskForm.get('projectID');
  }

  get assignedToUserID(): any {
    return this.taskForm.get('assignedToUserID');
  }

  get detail(): any {
    return this.taskForm.get('detail');
  }

  get status(): any {
    return this.taskForm.get('status');
  }

  trimValue($event): void {
    $event.target.value = $event.target.value.trim();
  }

  getObjectKeys(object): any {
    return Object.keys(object).map((item) => parseInt(item, 10)).sort((a, b) => a > b ? 1 : a === b ? 0 : -1 );
  }

  addTask(): void {
    const item: ITask = {
      projectID: this.projectID.value,
      assignedToUserID: this.assignedToUserID.value,
      detail: this.detail.value,
      status: this.isAdd ? this.statusOptions[0] : this.status.value
    };
    this.request.addTask(item, (resp) => {
      if (resp.status === 200) {
        this.taskDataEmitter.emit({ task: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('Task added successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to add task');
      }
    });
  }

  updateTask(): void {
    const item: ITask = {
      id: this.taskData.id,
      projectID: this.projectID.value ? this.projectID.value : -1,
      assignedToUserID: this.assignedToUserID.value ? this.assignedToUserID.value : -1,
      detail: this.detail.value,
      status: this.status.value
    };
    this.request.updateTask(item, (resp) => {
      if (resp.status === 200) {
        this.taskDataEmitter.emit({ task: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('Task updated successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to update task details');
      }
    });
  }

}
