import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoggedIn = false;
  name = 'Nitin';

  constructor(private cookie: CookieService, private router: Router) {
    if (this.cookie.check('username')) {
      this.name = this.cookie.get('username');
      this.isLoggedIn = true;
    }
  }

  login(username, password): void {
    this.cookie.set('username', username, 10, '/');
    this.cookie.set('token', btoa(username + ':' + password), 10, '/');
    this.isLoggedIn = true;
    this.name = username;
    const _ = this.router.navigate(['user']);
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
    return this.isLoggedIn || this.cookie.check('username');
  }
}
