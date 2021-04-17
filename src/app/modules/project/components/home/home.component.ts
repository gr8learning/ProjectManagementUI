import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { IProject } from '../../interfaces/iproject';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-home-project',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../shared/styles.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'detail', 'createdOn', 'actions'];
  isEditMode = false;
  isAdd = false;
  selectedProject: IProject;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public request: RequestService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.request.dataSource.sort = this.sort;
  }

  deleteProject(item: IProject): void {
    // console.log(item);
    this.request.dataSource.data.splice(this.request.dataSource.data.findIndex((value) => value === item), 1);
    this.request.dataSource._updateChangeSubscription();
  }

  setSelectedProject(project = {} as IProject ): void {
    if (!project.id) {
      this.selectedProject = {} as IProject;
      this.selectedProject.id = 1 + Math.max(0, ...Array.from(this.request.dataSource.data, (item) => item.id));
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
    const index = this.request.dataSource.data.findIndex((value) => value.id === updatedProject.project.id);
    if (index >= 0) {
      this.request.dataSource.data[index] = updatedProject.project;
    } else if (updatedProject.msg === 'success') {
      this.request.dataSource.data.push(updatedProject.project);
    }
    this.isAdd = false;
    this.request.dataSource._updateChangeSubscription();
    this.isEditMode = false;
  }
}
