import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder } from '@angular/forms';
import { AssignmentFilterModel } from 'src/app/Models/assignmentfilter.model';
import { FilterModel } from 'src/app/Models/filter.model';
import { Assignment } from 'src/app/Models/assignment.model';

@Component({
  selector: 'app-manageassignments',
  templateUrl: './manageassignments.component.html',
  styleUrls: ['./manageassignments.component.scss']
})
export class ManageassignmentsComponent implements OnInit {

  assignment: Assignment;
  assignments: Assignment[];
  filterModel: AssignmentFilterModel;
  filterForm = this.fb.group({
    Title: [''],
    Status: [''],
    Company: ['']
  });

  constructor(private fb: FormBuilder, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.findAssignment();
    this.filterForm.reset();
  }

  findAssignment() {
    this.filterForm.valueChanges.subscribe(e => {
      this.filterModel = new AssignmentFilterModel(this.filterForm.value.Title,
        this.filterForm.value.Company,
        this.filterForm.value.Status);
      this.assignmentService.filterAssignments(this.filterModel).subscribe(e => {
        this.assignments = e;
      })
    })
  }

}
