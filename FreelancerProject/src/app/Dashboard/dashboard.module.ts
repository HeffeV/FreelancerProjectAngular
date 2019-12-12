import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatFormFieldModule,MatSelectModule,MatStepperModule,MatTreeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAssignmentComponent } from './Assignments/add-assignment/add-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAssignmentComponent } from './Assignments/edit-assignment/edit-assignment.component';
import { DetailAssignmentComponent } from './Assignments/detail-assignment/detail-assignment.component';
import { DashboardRecruiterComponent } from './dashboard/dashboards/dashboard-recruiter/dashboard-recruiter.component';
import { DashboardUserComponent } from './dashboard/dashboards/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboard/dashboards/dashboard-admin/dashboard-admin.component';
import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
  declarations: [AddAssignmentComponent, DashboardComponent, EditAssignmentComponent, DetailAssignmentComponent, DashboardRecruiterComponent, DashboardUserComponent, DashboardAdminComponent],
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
    FileUploadModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
