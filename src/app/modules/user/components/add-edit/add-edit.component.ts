import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';
import { RequestService } from '../../services/request.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss', '../../../shared/styles.scss']
})
export class AddEditComponent implements OnInit {

  @Input() userData: IUser;
  @Input() isAdd: boolean;
  @Output() userDataEmitter = new EventEmitter<{ user: IUser, msg: string }>();

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor(private request: RequestService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email
    });
    if (!this.isAdd) {
      this.request.getUserById(this.userData.id, (resp) => {
        if (resp.status === 200) {
          this.userForm.patchValue(resp.body);
        }
      });
    }
  }

  emitUser(isCancel = false): void {
    if (isCancel) {
      this.userDataEmitter.emit({ user: {} as IUser, msg: 'cancel' });
    } else if (this.isAdd) {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  get firstName(): any {
    return this.userForm.get('firstName');
  }

  get lastName(): any {
    return this.userForm.get('lastName');
  }

  get email(): any {
    return this.userForm.get('email');
  }

  trimValue($event): void {
    $event.target.value = $event.target.value.trim();
  }

  addUser(): void {
    const item: IUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value
    };
    this.request.addUser(item, (resp) => {
      if (resp.status === 200) {
        this.userDataEmitter.emit({ user: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('User added successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to add user');
      }
    });
  }

  updateUser(): void {
    const item: IUser = {
      id: this.userData.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value
    };
    this.request.updateUser(item, (resp) => {
      if (resp.status === 200) {
        this.userDataEmitter.emit({ user: resp.body, msg: 'success' });
        this.snackbarService.openMessageSnackbar('User updated successfully');
      } else {
        this.snackbarService.openMessageSnackbar('Failed to update user');
      }
    });
  }
}
