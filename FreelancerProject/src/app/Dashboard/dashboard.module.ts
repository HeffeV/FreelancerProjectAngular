import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule, MatTreeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAssignmentComponent } from './Assignments/add-assignment/add-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAssignmentComponent } from './Assignments/edit-assignment/edit-assignment.component';
import { DetailAssignmentComponent } from './Assignments/detail-assignment/detail-assignment.component';
import { DashboardRecruiterComponent } from './dashboard/dashboards/dashboard-recruiter/dashboard-recruiter.component';
import { DashboardUserComponent } from './dashboard/dashboards/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboard/dashboards/dashboard-admin/dashboard-admin.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ManagetagsComponent } from './dashboard/dashboards/dashboard-admin/managetags/managetags.component';
import { ManageskillsComponent } from './dashboard/dashboards/dashboard-admin/manageskills/manageskills.component';
import { ManageusersComponent } from './dashboard/dashboards/dashboard-admin/manageusers/manageusers.component';
import { ManageassignmentsComponent } from './dashboard/dashboards/dashboard-admin/manageassignments/manageassignments.component';
import { ManagecompaniesComponent } from './dashboard/dashboards/dashboard-admin/managecompanies/managecompanies.component';
import { ManagereviewsComponent } from './dashboard/dashboards/dashboard-admin/managereviews/managereviews.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AddAssignmentComponent, DashboardComponent, EditAssignmentComponent, DetailAssignmentComponent, DashboardRecruiterComponent, DashboardUserComponent, DashboardAdminComponent, ManagetagsComponent, ManageskillsComponent, ManageusersComponent, ManageassignmentsComponent, ManagecompaniesComponent, ManagereviewsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule,
    MatButtonModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
