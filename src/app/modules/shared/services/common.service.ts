import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RequestService } from '../../user/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoggedIn = false;
  name = 'Nitin';

  constructor(private cookie: CookieService, private router: Router, private userRequest: RequestService) {
    if (this.cookie.check('email')) {
      this.name = this.cookie.get('email');
      this.isLoggedIn = true;
    }
  }

  login(email, password, callback): void {
    this.userRequest.login({ email, password }, (resp) => {
      if (resp.status === 200) {
        this.cookie.set('email', email, 10, '/');
        this.cookie.set('token', btoa(email + ':' + password), 10, '/');
        this.isLoggedIn = true;
        this.name = email;
        callback(resp);
        const _ = this.router.navigate(['user']);
      } else {
        callback(resp);
      }
    });


  }

  signUp(payload, callback): void {
    this.userRequest.addUser(payload, (resp) => {
      if (resp.status === 200) {
        this.cookie.set('email', payload.email, 10, '/');
        this.cookie.set('token', btoa(payload.email + ':' + payload.password), 10, '/');
        this.isLoggedIn = true;
        this.name = payload.email;
        callback(resp);
        const _ = this.router.navigate(['user']);
      } else {
        callback(resp);
      }
    });
  }

  logout(): void {
    console.log('logout');
    this.isLoggedIn = false;
    this.clearCookies();
    const _ = this.router.navigate(['app', 'login']);
  }

  clearCookies(): void {
    this.cookie.deleteAll();
    this.cookie.deleteAll('/');
    this.cookie.deleteAll('/*');
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn || this.cookie.check('email');
  }

  dateParse(date: string): string {
    try {
      return new Date(date).toLocaleString();
    } catch {
      return date;
    }
  }
}
