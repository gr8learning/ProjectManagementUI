import { Injectable } from '@angular/core';
import { IProject } from '../interfaces/iproject';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';

const PROJECT_DATA: IProject[] = [
  { id: 1, name: 'Hydrogen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 2, name: 'Helium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 3, name: 'Lithium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 4, name: 'Beryllium', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 5, name: 'Boron', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 6, name: 'Carbon', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 7, name: 'Nitrogen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 8, name: 'Oxygen', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 9, name: 'Fluorine', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
  { id: 10, name: 'Neon', detail: 'Project Detail', createdOn: 'Tue, 13 Apr 2021 08:58:07 GMT' },
];

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
