import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource([]);

  constructor(private globalService: GlobalService) { }

  getAllTask(callback): void {
    this.globalService.getCall('/task', callback);
  }

  getTaskById(id: number, callback): void {
    this.globalService.getCall('/task/' + id, callback);
  }

  addTask(payload, callback): void {
    this.globalService.postCall('/task', payload, callback);
  }

  updateTask(payload, callback): void {
    this.globalService.putCall('/task', payload, callback);
  }

  deleteAllTask(callback): void {
    this.globalService.deleteCall('/task', null, callback);
  }

  deleteTaskById(id: number, callback): void {
    this.globalService.deleteCall('/task/' + id, null, callback);
  }
}
