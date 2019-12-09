import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatFormFieldModule,MatSelectModule,MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsComponent } from './Assignments/assignments/assignments.component';
import { AddAssignmentComponent } from './Assignments/add-assignment/add-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AssignmentsComponent, AddAssignmentComponent, DashboardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
