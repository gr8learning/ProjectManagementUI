import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from '../../modules/shared/handlers/error-state-matcher';
import { CommonService } from '../../modules/shared/services/common.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  loginType: any;
  hidePass = true;
  loginForm = new FormGroup({
    username: new FormControl('guest', [Validators.minLength(3), Validators.maxLength(50)]),
    secret: new FormControl('guestLogin', [Validators.minLength(6), Validators.maxLength(40)])
  });
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(80)]),
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.pattern('(.)+[@](.)+[.](.)+'), Validators.maxLength(120)]),
    secret: new FormControl('', [Validators.minLength(6), Validators.maxLength(40)]),
  });

  autocomplete = 'off';

  get matcher(): any {
    return new MyErrorStateMatcher();
  }

  constructor(private routes: ActivatedRoute, private common: CommonService) { }

  ngOnInit(): void {
    this.routes.data.subscribe(data => {
      this.loginType = data.type;
    });
  }

  login(): any {
    this.common.login(this.usernameLogin.value, this.passwordLogin.value);
  }

  signup(): any {
  }

  get usernameLogin(): any {
    return this.loginForm.get('username');
  }

  get passwordLogin(): any {
    return this.loginForm.get('secret');
  }

}
