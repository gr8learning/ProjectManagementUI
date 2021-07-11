import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from '../../interfaces/iproject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';
import { RequestService } from '../../services/request.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

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

  constructor(private request: RequestService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.projectForm.patchValue({
      name: this.projectData.name,
      detail: this.projectData.detail,
    });
    if (!this.isAdd) {
      this.request.getProjectById(this.projectData.id, (resp) => {
        if (resp.status === 200) {
          this.projectForm.patchValue(resp.body);
        }
      });
    }
  }

  emitProject(isCancel = false): void {
    if (isCancel) {
      this.projectDataEmitter.emit({ project: {} as IProject, msg: 'cancel' });
    } else if (this.isAdd) {
      this.addProject();
    } else {
      this.updateProject();
    }
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

  addProject(): void {
    const item: IProject = {
      name: this.name.value,
      detail: this.detail.value
    };
    this.request.addProject(item, (resp) => {
      if (resp.status === 200) {
        this.projectDataEmitter.emit({ project: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('Project added successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to add project');
      }
    });
  }

  updateProject(): void {
    const item: IProject = {
      id: this.projectData.id,
      name: this.name.value,
      detail: this.detail.value,
      createdOn: this.projectData.createdOn
    };
    this.request.updateProject(item, (resp) => {
      if (resp.status === 200) {
        this.projectDataEmitter.emit({ project: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('Project updated successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to update project');
      }
    });
  }
}
