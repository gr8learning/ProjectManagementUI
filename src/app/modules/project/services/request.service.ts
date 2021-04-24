import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource([]);

  constructor(private globalService: GlobalService) { }

  getAllProject(callback): void {
    this.globalService.getCall('/project', callback);
  }

  getProjectById(id: number, callback): void {
    this.globalService.getCall('/project/' + id, callback);
  }

  addProject(payload, callback): void {
    this.globalService.postCall('/project', payload, callback);
  }

  updateProject(payload, callback): void {
    this.globalService.putCall('/project', payload, callback);
  }

  deleteAllProject(callback): void {
    this.globalService.deleteCall('/project', null, callback);
  }

  deleteProjectById(id: number, callback): void {
    this.globalService.deleteCall('/project/' + id, null, callback);
  }
}
