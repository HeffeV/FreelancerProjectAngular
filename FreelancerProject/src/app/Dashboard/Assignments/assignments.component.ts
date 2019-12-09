import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Assignment } from 'src/app/Models/assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._assignmentService.getAssignments().subscribe(result => {
      console.log(result);
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
  newAssignment() {
    const assignment = this.addAssignment.value;
    this._assignmentService.postAssignment(assignment).subscribe(a => {
      console.log(a);
      this.ngOnInit();
    });
  }
  putAssignment() {
    const assignment = this.updateAssignment.value;
    console.log(assignment);
    this._assignmentService.putAssignment(assignment).subscribe(a => {
      console.log(a);
      this.ngOnInit();
    });
  }

  deleteAssignment(assignmentID) {
    console.log(assignmentID);
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      console.log(a);
      this.ngOnInit();
    });
  }
}
