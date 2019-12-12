import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { Company } from 'src/app/Models/company.model';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-dashboard-recruiter',
  templateUrl: './dashboard-recruiter.component.html',
  styleUrls: ['./dashboard-recruiter.component.scss']
})
export class DashboardRecruiterComponent implements OnInit {

  companies: Company[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;

  constructor(private _assignmentService: AssignmentService, private _userService: UserserviceService, private _companyService: CompanyService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    var userID = this._userService.getUserID();
   this._companyService.getCompaniesByUserID(userID).subscribe(result => {
     console.log(result);
     this.companies = result;
   })
  }
  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.ngOnInit();
    });
  }
  GoToNewAssignment(companyID){
    this._companyService.currentCompany.next(companyID);
    this.router.navigate(['/addAssignment']);
  }
  GoToNewCompany(){
    this.router.navigate(['/addcompany']);
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
    this._assignmentService.currentAssignment.next(assignment.assignmentID);
    this.router.navigate(['/editAssignment']);
  }

}
