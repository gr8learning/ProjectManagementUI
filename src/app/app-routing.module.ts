import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { NoModuleSelectedComponent } from './components/no-module-selected/no-module-selected.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: NoModuleSelectedComponent },
      { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
      { path: 'task', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule) },
      { path: 'project', loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
