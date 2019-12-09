import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  assignments : any;
  addAssignment:FormGroup;
   updateAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService,private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._assignmentService.getAssignments().subscribe(result => {
      this.assignments = result;
    });
    this.addAssignment = this._formBuilder.group({
      assingmentName: ['', Validators.required],
      description: ['',Validators.required]
    });
    this.updateAssignment = this._formBuilder.group({
      assignmentID: ['',Validators.required],
      assingmentName: ['', Validators.required],
      description: ['',Validators.required]
    });
  }

  newAssignment() {
    const assignment = this.addAssignment.value;
    this._assignmentService.postAssignment(assignment).subscribe(a => {
      console.log(a);
    });
  }
  putAssignment() {
    const assignment = this.addAssignment.value;
    this._assignmentService.putAssignment(assignment).subscribe(a => {
      console.log(a);
    });
  }

  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe( a => {
      console.log(a);
    });
  }
}
