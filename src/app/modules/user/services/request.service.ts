import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource([]);

  constructor(private globalService: GlobalService) { }

  getAllUser(callback): void {
    this.globalService.getCall('/user', callback);
  }

  getUserById(id: number, callback): void {
    this.globalService.getCall('/user/' + id, callback);
  }

  addUser(payload, callback): void {
    this.globalService.postCall('/user', payload, callback);
  }

  updateUser(payload, callback): void {
    this.globalService.putCall('/user', payload, callback);
  }

  deleteAllUser(callback): void {
    this.globalService.deleteCall('/user', null, callback);
  }

  deleteUserById(id: number, callback): void {
    this.globalService.deleteCall('/user/' + id, null, callback);
  }
}
