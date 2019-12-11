import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  requestedAssignments: Assignment[];
  inProgressAssignments: Assignment[];
  finishedAssignments: Assignment[];
  constructor(private _assignmentService: AssignmentService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this._assignmentService.getRequestedAssignmentsByUserID().subscribe(result =>{
      this.requestedAssignments = result;
    });
    this._assignmentService.getInProgressAssignmentsByUserID().subscribe(result => {
      this.inProgressAssignments = result;
    });
    this._assignmentService.getFinishedAssignmentsByUserID().subscribe(result => {
      this.finishedAssignments = result;
    });
  }
 
  //aangevraagde assignment annumeren -> userassignment
  cancelAssignment(assignment){
    
  }
}
