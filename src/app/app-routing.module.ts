import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { NoModuleSelectedComponent } from './components/no-module-selected/no-module-selected.component';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';
import { LoginSignupComponent } from './routes/login-signup/login-signup.component';
import { ContactComponent } from './routes/contact/contact.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: NoModuleSelectedComponent },
      { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
      { path: 'task', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule) },
      { path: 'project', loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule) }
    ]
  },
  {
    path: 'app', children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginSignupComponent, data: { type: 'login' } },
      { path: 'signup', component: LoginSignupComponent, data: { type: 'signup' } },
      { path: 'contact', component: ContactComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
