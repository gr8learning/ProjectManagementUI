import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../../shared/services/global.service';

const USER_DATA: IUser[] = [
  { id: 1, firstName: 'Hydrogen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 2, firstName: 'Helium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 3, firstName: 'Lithium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 4, firstName: 'Beryllium', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 5, firstName: 'Boron', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 6, firstName: 'Carbon', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 7, firstName: 'Nitrogen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 8, firstName: 'Oxygen', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 9, firstName: 'Fluorine', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
  { id: 10, firstName: 'Neon', lastName: 'Kumar', email: 'nitinkumar9054@gmail.com' },
];


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  dataSource = new MatTableDataSource(USER_DATA);

  constructor(private globalService: GlobalService) { }

  getAllUser(callback): void {
    this.globalService.getCall('/user', callback);
  }
}
