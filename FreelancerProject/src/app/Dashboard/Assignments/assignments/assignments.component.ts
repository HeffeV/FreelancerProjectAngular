import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Assignment } from 'src/app/Models/assignment.model';
import { Tag } from 'src/app/Models/tag.model';
import { TagService } from 'src/app/Services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this._assignmentService.getAssignments().subscribe(result => {
      this.assignments = result;
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
      this.ngOnInit();
    });
  }
  putAssignment() {
    const assignment = this.updateAssignment.value;
    this._assignmentService.putAssignment(assignment).subscribe(a => {
      this.ngOnInit();
    });
  }

  deleteAssignment(assignmentID) {
    console.log(assignmentID);
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.ngOnInit();
    });
  }
  GoToNewAssignment(){
    this.router.navigate(['/addAssignment']);
  }
}