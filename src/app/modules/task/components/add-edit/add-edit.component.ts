import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/itask';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @Input() taskData: ITask;
  @Input() isAdd: boolean;
  @Output() taskDataEmitter = new EventEmitter<{ task: ITask, msg: string }>();

  taskForm = new FormGroup({
    projectId: new FormControl('', []),
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
    this.taskForm.setValue({
      projectId: this.taskData.projectId < 0 ? '' : this.taskData.projectId ,
      detail: this.taskData.detail,
      status: this.taskData.status,
      assignedToUser: this.taskData.assignedToUser,
    });
  }

  emitTask(isCancel = false): void {
    const item: ITask = {
      id: this.taskData.id,
      projectId: this.projectId.value,
      assignedToUser: this.assignedToUser.value,
      detail: this.detail.value,
      status: this.isAdd ? this.statusOptions[0] : this.status.value,
      createdOn: this.isAdd ? new Date().toUTCString() : this.taskData.createdOn
    };
    this.taskDataEmitter.emit({ task: isCancel ? this.taskData : item, msg: isCancel ? 'cancel' : 'success' });
  }

  get projectId(): any {
    return this.taskForm.get('projectId');
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

}
