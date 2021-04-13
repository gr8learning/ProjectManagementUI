import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IProject } from '../../interfaces/iproject';

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

@Component({
  selector: 'app-home-project',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'detail', 'createdOn', 'actions'];
  dataSource = new MatTableDataSource(PROJECT_DATA);
  isEditMode = false;
  isAdd = false;
  selectedProject: IProject;

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  deleteProject(item: IProject): void {
    // console.log(item);
    this.dataSource.data.splice(this.dataSource.data.findIndex((value) => value === item), 1);
    this.dataSource._updateChangeSubscription();
  }

  setSelectedProject(project = {} as IProject ): void {
    if (!project.id) {
      this.selectedProject = {} as IProject;
      this.selectedProject.id = 1 + Math.max(0, ...Array.from(this.dataSource.data, (item) => item.id));
      this.selectedProject.name = '';
      this.selectedProject.detail = '';
      this.isAdd = true;
    } else {
      this.selectedProject = project;
      this.isAdd = false;
    }
    this.isEditMode = true;
  }

  updateProjectRecordById(updatedProject: {project: IProject, msg: string }): void {
    const index = this.dataSource.data.findIndex((value) => value.id === updatedProject.project.id);
    if (index >= 0) {
      this.dataSource.data[index] = updatedProject.project;
    } else if (updatedProject.msg === 'success') {
      this.dataSource.data.push(updatedProject.project);
    }
    this.isAdd = false;
    this.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }
}
