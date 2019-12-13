import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AssignmentFilterModel } from 'src/app/Models/assignmentfilter.model';
import { FilterModel } from 'src/app/Models/filter.model';
import { Assignment } from 'src/app/Models/assignment.model';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-manageassignments',
  templateUrl: './manageassignments.component.html',
  styleUrls: ['./manageassignments.component.scss']
})
export class ManageassignmentsComponent implements OnInit {

  companies: Company[];
  assignment: Assignment;
  assignments: Assignment[];
  filterModel: AssignmentFilterModel;
  filterForm = this.fb.group({
    Title: [''],
    Status: [''],
    Company: ['']
  });
  updateAssignment = this.fb.group({
    tags: [''],
    description: ['', Validators.required],
    assignmentName: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private assignmentService: AssignmentService, private companyService: CompanyService) { }

  ngOnInit() {
    this.findAssignment();
    this.filterForm.reset();
    this.companyService.getAllCompanies().subscribe(e => {
      this.companies = e;
    })
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

  deleteAssignment(id: number) {
    this.assignmentService.deleteAssigment(id).subscribe(e => {
      this.ngOnInit();
    });
  }

  selectAssignment(assignment: Assignment) {
    this.assignment = assignment;
  }
  saveAssignment() {
    this.assignmentService.putAssignment(this.assignment).subscribe(e => {
      this.ngOnInit();
    })
  }

}
