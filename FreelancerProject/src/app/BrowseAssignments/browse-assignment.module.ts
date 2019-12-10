import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseAssignmentComponent } from './browse-assignment/browse-assignment.component';



@NgModule({
  declarations: [BrowseAssignmentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatTreeModule
  ] ,
  exports:[BrowseAssignmentComponent]
})
export class BrowseAssignmentModule { }
