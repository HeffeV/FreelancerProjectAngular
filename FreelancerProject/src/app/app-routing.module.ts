import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { AssignmentsComponent } from './Dashboard/Assignments/assignments/assignments.component';
import { AddAssignmentComponent } from './Dashboard/Assignments/add-assignment/add-assignment.component';
import { DetailCompanyComponent } from './company/detail-company/detail-company.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { AccountComponent } from './Account/account/account.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { EditAssignmentComponent } from './Dashboard/Assignments/edit-assignment/edit-assignment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addcompany', component: AddCompanyComponent},
  {path: 'companydetail/:id', component: DetailCompanyComponent},
  {path: 'editcompany/:id', component: EditCompanyComponent},
  {path: 'assignments',  component: AssignmentsComponent},
  {path: 'dashboard',  component: DashboardComponent},
  {path: 'account',  component: AccountComponent},
  {path: 'addAssignment',  component: AddAssignmentComponent},
  {path: 'editAssignment',  component: EditAssignmentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
