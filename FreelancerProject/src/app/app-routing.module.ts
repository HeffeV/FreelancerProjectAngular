import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { AssignmentsComponent } from './Dashboard/Assignments/assignments.component';

//app routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addcompany', component: AddCompanyComponent},
  {path: 'assignments',  component: AssignmentsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
