import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/itask';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';
import { IIdValue } from '../../../shared/interfaces/iidvalue';

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
    assignedToUser: new FormControl('', [])
  });

  statusOptions = ['New', 'InProgress', 'QA', 'Completed'];

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor() { }

  ngOnInit(): void {
    // console.log(this.userData);
    // console.log(this.userList);
    // console.log(this.projectList);
    this.taskForm.setValue({
      projectID: this.taskData.projectID < 0 ? '' : this.taskData.projectID ,
      detail: this.taskData.detail,
      status: this.taskData.status,
      assignedToUser: this.taskData.assignedToUserID,
    });
  }

  emitTask(isCancel = false): void {
    const item: ITask = {
      id: this.taskData.id,
      projectID: this.projectID.value,
      assignedToUserID: this.assignedToUser.value,
      detail: this.detail.value,
      status: this.isAdd ? this.statusOptions[0] : this.status.value,
      createdOn: this.isAdd ? new Date().toUTCString() : this.taskData.createdOn,
      assignedToUser: this.taskData.assignedToUser
    };
    this.taskDataEmitter.emit({ task: isCancel ? this.taskData : item, msg: isCancel ? 'cancel' : 'success' });
  }

  get projectID(): any {
    return this.taskForm.get('projectID');
  }

  get assignedToUser(): any {
    return this.taskForm.get('assignedToUser');
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

}
