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
    this._assignmentService.publishAssignment(assignment.assignmentID).subscribe();
    this.ngOnInit();
  }
  editAssignment(assignment: Assignment){
    this._assignmentService.setAssignmentID(assignment.assignmentID);
    this.router.navigate(['/editAssignment']);
  }
}