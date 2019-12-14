import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { Company } from 'src/app/Models/company.model';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-dashboard-recruiter',
  templateUrl: './dashboard-recruiter.component.html',
  styleUrls: ['./dashboard-recruiter.component.scss']
})
export class DashboardRecruiterComponent implements OnInit {

  companies: Company[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;
  selectedAssignment: any = {};

  constructor(private _assignmentService: AssignmentService,
    private _userService: UserserviceService,
    private _companyService: CompanyService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _accountService: AccountService,
    private companyService: CompanyService) { }

  ngOnInit() {
    var userID = this._userService.getUserID();
    //get the currentUser that is logged in
    this._companyService.getCompaniesByUserID(userID).subscribe(result => {
      console.log(result);
      this.companies = result;
    });
  }
  //delete the assignment
  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.ngOnInit();
    });
  }
  //navigate to page to add a new assignment for this company
  GoToNewAssignment(companyID) {
    this._companyService.currentCompany.next(companyID);
    this.router.navigate(['/addAssignment']);
  }
  //navigate to page to add a new company
  GoToNewCompany() {
    this.router.navigate(['/addcompany']);
  }

  //publishAssignment - means set status to Open
  publishAssignment(assignment) {
    this._assignmentService.publishAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }
  //publishAssignment - means set status to Closed
  closeAssignment(assignment) {
    this._assignmentService.closeAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }
  //publishAssignment - means set status to Finished
  finishAssignment(assignment) {
    this._assignmentService.finishAssignment(assignment.assignmentID).subscribe(result => {
      this.ngOnInit();
    });
  }
  //navigate to the edit-page for this assignment
  editAssignment(assignment: Assignment) {
    this._assignmentService.currentAssignment.next(assignment.assignmentID);
    this.router.navigate(['/editAssignment']);
  }
  //navigate to the details of this assignment
  viewAssignment(assignment: Assignment) {
    this._assignmentService.currentAssignment.next(assignment.assignmentID);
    this.router.navigate(['/assignmentdetail']);
  }
  //company accepts this user for the assignment
  acceptCandidate(assignment, candidateID) {
    this._assignmentService.acceptCandidate(assignment.assignmentID, candidateID).subscribe(result => {
      this.ngOnInit();
    })
  }
  //company accepts this user for the assignment
  declineCandidate(assignment, candidateID) {
    this._assignmentService.declineCandidate(assignment.assignmentID, candidateID).subscribe(result => {
      this.ngOnInit();
    })
  }
  //navigate to the details page of this user
  viewCandidate(candidateID) {
    this._accountService.currentAccount.next(candidateID);
    this.router.navigate(["/account"]);
  }

  changeSelectedAssignment(assignment) {
    this.selectedAssignment = assignment;
  }

  //navigate to the details of the company thats owns this assignment
  goSelectCompany(id: number) {
    this.companyService.currentCompany.next(id);
    this.router.navigate(["/companydetail"]);
  }
}
