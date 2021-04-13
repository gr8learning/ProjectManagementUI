import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from '../../interfaces/iproject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss', '../../../shared/styles.scss']
})
export class AddEditComponent implements OnInit {

  @Input() projectData: IProject;
  @Input() isAdd: boolean;
  @Output() projectDataEmitter = new EventEmitter<{ project: IProject, msg: string }>();

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    detail: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.projectData);
    this.projectForm.setValue({
      name: this.projectData.name,
      detail: this.projectData.detail,
    });
  }

  emitProject(isCancel = false): void {
    const item: IProject = {
      id: this.projectData.id,
      name: this.name.value,
      detail: this.detail.value,
      createdOn: this.isAdd ? new Date().toUTCString() : this.projectData.createdOn
    };
    this.projectDataEmitter.emit({ project: isCancel ? this.projectData : item, msg: isCancel ? 'cancel' : 'success' });
  }

  get name(): any {
    return this.projectForm.get('name');
  }

  get detail(): any {
    return this.projectForm.get('detail');
  }

  trimValue($event): void {
    $event.target.value = $event.target.value.trim();
  }
}
