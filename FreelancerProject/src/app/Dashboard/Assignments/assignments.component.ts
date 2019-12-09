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
  addAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService,private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._assignmentService.getAssignments().subscribe(result => {
      this.assignments = result;
    });
    this.addAssignment = this._formBuilder.group({
      assingmentName: ['', Validators.required],
      description: ['',Validators.required]
    });
  }

  newAssignment() {
    const assingment = this.addAssignment.value;
    this._assignmentService.postAssignment(assingment).subscribe(a => {
      console.log(a);
    });
  }

}
