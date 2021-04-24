import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from '../../modules/shared/handlers/error-state-matcher';
import { CommonService } from '../../modules/shared/services/common.service';
import { SnackbarService } from '../../modules/shared/services/snackbar.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  loginType: any;
  hidePass = true;
  loginForm = new FormGroup({
    email: new FormControl('guest@welcome.in', [Validators.email, Validators.pattern('(.)+[@](.)+[.](.)+'), Validators.maxLength(120)]),
    secret: new FormControl('alpha', [Validators.minLength(4), Validators.maxLength(40)])
  });
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.minLength(3), Validators.maxLength(80)]),
    lastName: new FormControl('', [Validators.minLength(3), Validators.maxLength(80)]),
    email: new FormControl('', [Validators.email, Validators.pattern('(.)+[@](.)+[.](.)+'), Validators.maxLength(120)]),
    secret: new FormControl('', [Validators.minLength(4), Validators.maxLength(40)]),
    confirmSecret: new FormControl('', [Validators.minLength(4), Validators.maxLength(40), passwordMatchValidator ])
  });

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor(private routes: ActivatedRoute, private common: CommonService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.routes.data.subscribe(data => {
      this.loginType = data.type;
    });
  }

  login(): any {
    this.common.login(this.emailLogin.value, this.passwordLogin.value, (resp) => {
      if (resp.status === 200) {
        this.snackbarService.openMessageSnackbar('Login successful');
      } else {
        this.snackbarService.openMessageSnackbar('Login failed');
      }
    });
  }

  signUp(): any {
    this.common.signUp({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value
    }, (resp) => {
      if (resp.status === 200) {
        this.snackbarService.openMessageSnackbar('Signup successful');
      } else if (resp.status === 409) {
        this.snackbarService.openMessageSnackbar('Signup failed. Email already registered');
      } else {
        this.snackbarService.openMessageSnackbar('Signup failed');
      }
    });
  }

  get emailLogin(): any {
    return this.loginForm.get('email');
  }

  get passwordLogin(): any {
    return this.loginForm.get('secret');
  }

  get firstName(): any {
    return this.signupForm.get('firstName');
  }

  get lastName(): any {
    return this.signupForm.get('lastName');
  }

  get email(): any {
    return this.signupForm.get('email');
  }

  get password(): any {
    return this.signupForm.get('secret');
  }

  get confirmPassword(): any {
    return this.signupForm.get('confirmSecret');
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const parent = formGroup.parent as FormGroup;
  if (!parent) {
    return null;
  }
  return parent.get('secret').value === parent.get('confirmSecret').value ?
    null : { mismatch: true };
};
