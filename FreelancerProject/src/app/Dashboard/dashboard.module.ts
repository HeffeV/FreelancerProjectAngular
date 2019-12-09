import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsComponent } from './Assignments/assignments.component';
import {MatCardModule,MatInputModule,MatFormFieldModule, MatButtonModule} from '@angular/material';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [AssignmentsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class DashboardModule { }
