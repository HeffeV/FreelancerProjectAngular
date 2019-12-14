import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder } from '@angular/forms';
import { TagService } from 'src/app/Services/tag.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-assignment',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.scss']
})
export class DetailAssignmentComponent implements OnInit {

  assignment: Assignment;
  show: Boolean = false;
  success: Boolean = false;
  error: Boolean = false
  alreadyApplied: boolean;
  isAuthorized: boolean = false;
  currentUser: User;

  constructor(private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _authenticateService: AuthenticateService, private _accountService: AccountService, private _userService: UserserviceService, private location : Location) { }

  ngOnInit() {
    this.success = false;
    this.error = false;
    //get currentAssignment(ID)
    this._assignmentService.currentAssignment.subscribe(assignmentID => {
   
      //load the full assignment-object
    this._assignmentService.getAssignmentEdit(assignmentID).subscribe(result => {
      this.assignment = result;
      this.show = true;
      //check if the currentUser has already applied to this assignment
      this._assignmentService.alreadyApplied(this.assignment).subscribe(result => {
        result == null ? this.alreadyApplied = false : this.alreadyApplied = true;
      });

      var userID = this._userService.getUserID();
      this._accountService.getUser(userID).subscribe(result => {
        this.currentUser = result;

        this._assignmentService.checkIfOwnAssignment(this.assignment).subscribe(isOwnAssignment => {
          //if the currentuser is logged in and the currentuser owns the assignment (through his companies) and the currentuser is a recruiter
          //then the currentuser can edit and delete the assignment(ngIf in HTML)
          if (this._authenticateService.CheckLoggedIn() &&
            isOwnAssignment == true && this.currentUser.userType.type == "recruiter") {
            this.isAuthorized = true;
          }
        });
      });

    });
  })
  }

  //navigate to the details of the company thats owns this assignment
  btnSelectCompany(id: number) {
    this._companyService.currentCompany.next(id);
    this.router.navigate(["/companydetail"]);
  }
  //navigate to the edit-page for this assignment
  editAssignment(assignmentID) {
    this._assignmentService.currentAssignment.next(assignmentID);
    this.router.navigate(['/editAssignment']);
  }
  //delete this assignment
  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.router.navigate(["/dashboard"]);
    });
  }
  //apply for this assignment
  apply(assignment) {
    this._assignmentService.applyForAssignment(assignment.assignmentID).subscribe((res: any) => {
      this.success = true;
    },
      err => {
        this.error = true;
        this.success = false;
      });
  }
  //cancel applying for this assignment
  cancelAssignment(assignment) {
    this._assignmentService.cancelAssignment(assignment).subscribe(result => {
      this.ngOnInit();
    });
  }
  //company accepts this user for the assignment
  acceptCandidate(assignment,candidateID){
    this._assignmentService.acceptCandidate(assignment.assignmentID, candidateID).subscribe( result => {
      this.ngOnInit();
    })
  }
  //company declines this user's apply for the assignment
  declineCandidate(assignment,candidateID){
    this._assignmentService.declineCandidate(assignment.assignmentID, candidateID).subscribe( result => {
      this.ngOnInit();
    })
  }

  //navigate to the details page of this user
  viewCandidate(candidateID) {
    this._accountService.currentAccount.next(candidateID);
    this.router.navigate(["/account"]);
  }

  pageBack(){
    this.location.back();
  }

}
