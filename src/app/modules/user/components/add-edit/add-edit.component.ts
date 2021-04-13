import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/handlers/error-state-matcher';

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

  constructor() { }

  ngOnInit(): void {
    // console.log(this.userData);
    this.userForm.setValue({
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email
    });
  }

  emitUser(isCancel = false): void {
    const item: IUser = {
      id: this.userData.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value
    };
    this.userDataEmitter.emit({ user: isCancel ? this.userData : item, msg: isCancel ? 'cancel' : 'success' });
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

}
