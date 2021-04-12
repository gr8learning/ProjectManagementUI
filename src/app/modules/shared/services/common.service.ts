import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoggedIn = false;
  name = 'Nitin';

  constructor() { }

  logout(): void {
    console.log('logout');
  }
}
