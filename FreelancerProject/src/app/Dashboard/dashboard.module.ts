import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatFormFieldModule,MatSelectModule,MatStepperModule,MatTreeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsComponent } from './Assignments/assignments/assignments.component';
import { AddAssignmentComponent } from './Assignments/add-assignment/add-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAssignmentComponent } from './Assignments/edit-assignment/edit-assignment.component';
import { DetailAssignmentComponent } from './Assignments/detail-assignment/detail-assignment.component';

@NgModule({
  declarations: [AssignmentsComponent, AddAssignmentComponent, DashboardComponent, EditAssignmentComponent, DetailAssignmentComponent],
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
    MatInputModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
