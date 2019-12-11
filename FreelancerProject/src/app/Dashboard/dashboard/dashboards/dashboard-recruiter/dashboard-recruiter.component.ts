import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-recruiter',
  templateUrl: './dashboard-recruiter.component.html',
  styleUrls: ['./dashboard-recruiter.component.scss']
})
export class DashboardRecruiterComponent implements OnInit {

  assignments: Assignment[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this._assignmentService.getAssignmentsByCompany().subscribe(result => {
      this.assignments = result;
      console.log(this.assignments);
    });
    this.addAssignment = this._formBuilder.group({
      tags: [''],
      description: ['', Validators.required],
      assignmentName: ['', Validators.required],
      location: [''],
      company: [''],
      user: ['']
    });
    this.updateAssignment = this._formBuilder.group({
      assignmentID: ['', Validators.required],
      tags: [''],
      description: ['', Validators.required],
      assignmentName: ['', Validators.required],
      location: [''],
      company: [''],
      user: ['']
    });
  }
  putAssignment() {
    const assignment = this.updateAssignment.value;
    this._assignmentService.putAssignment(assignment).subscribe(a => {
      this.ngOnInit();
    });
  }

  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.ngOnInit();
    });
  }
  GoToNewAssignment(){
    this.router.navigate(['/addAssignment']);
  }

  publishAssignment(assignment){
    this._assignmentService.publishAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }
  closeAssignment(assignment){
    this._assignmentService.closeAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }
  finishAssignment(assignment){
    this._assignmentService.finishAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }

  editAssignment(assignment: Assignment){
    this._assignmentService.setAssignmentID(assignment.assignmentID);
    this.router.navigate(['/editAssignment']);
  }

}
