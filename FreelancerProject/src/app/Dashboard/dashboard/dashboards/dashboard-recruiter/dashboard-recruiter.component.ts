import { Component, OnInit } from "@angular/core";
import { Assignment } from "src/app/Models/assignment.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AssignmentService } from "src/app/Services/assignment.service";
import { Router } from "@angular/router";
import { CompanyService } from "src/app/Services/company.service";
import { Company } from "src/app/Models/company.model";
import { UserserviceService } from "src/app/Services/userservice.service";
import { AccountService } from "src/app/Services/account.service";
import { Review } from 'src/app/Models/review.model';
import { ReviewService } from 'src/app/Services/review.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserCompany } from 'src/app/Models/user-company.model';
import { take } from 'rxjs/observable';

@Component({
  selector: "app-dashboard-recruiter",
  templateUrl: "./dashboard-recruiter.component.html",
  styleUrls: ["./dashboard-recruiter.component.scss"]
})
export class DashboardRecruiterComponent implements OnInit {
  companies: Company[] = [];
  addAssignment: FormGroup;
  updateAssignment: FormGroup;
  selectedAssignment: any = {};
  selectedUser: any = {};
  selectedCompany: any = {};
  review: any = {} = new Review(0, 0, '', '', null, null, false);
  checkSub: Subscription;
  invites: UserCompany[];
  inviteForm = this._formBuilder.group({
    email: ['']
  });
  succesInvite: Boolean = false;
  errorInvite: Boolean = false;

  constructor(
    private _assignmentService: AssignmentService,
    private _userService: UserserviceService,
    private _companyService: CompanyService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _accountService: AccountService,
    private companyService: CompanyService,
    private reviewService: ReviewService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.succesInvite = false;
    this.errorInvite = false;
    var userID = this._userService.getUserID();
    this._companyService.getCompaniesByUserID(userID).subscribe(result => {
      console.log(result);
      this.companies = result;
    });
    this._companyService.getCompanyInvites().subscribe(result => {
      this.invites = result;
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
    this.router.navigate(["/addAssignment"]);
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
    this.router.navigate(["/editAssignment"]);
  }
  //navigate to the details of this assignment
  viewAssignment(assignment: Assignment) {
    this._assignmentService.currentAssignment.next(assignment.assignmentID);
    this.router.navigate(["/assignmentdetail"]);
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

  changeSelectedUser(user, company) {
    this.selectedUser = user;
    this.selectedCompany = company;
    console.log('this is : ', this.selectedUser, this.selectedCompany);
  }
  addReview() {
    this.review.company = this.selectedCompany;
    this.review.user = this.selectedUser;
    if (this.review.score > 10 || this.review.score < 0 || this.review.title === '' || this.review.description === '') {
      this.toast.error('Please fill in the fields correctly');
    } else {
      console.log(this.review);
      this.reviewService.addReviewToUser(this.review).subscribe(
        result => { console.log(result); this.ngOnInit(); this.toast.success('Your review has been added'); }
      );
    }
  }

  checkIfCompanyReviewedUser(companyID, userID) {
    let show = false;
    this.checkSub = this.reviewService.checkIfCompanyReviewUser(companyID, userID)
    .subscribe(
      result => {
        show = result; console.log('the loggedin user has reviewed this ', result);
      }
    );
    this.checkSub.unsubscribe();
    return show;
  }

  watchInvites() {
    this._companyService.getCompanyInvites().subscribe(result => {
      this.invites = result;
      console.log(this.invites);
    });
  }
  acceptInvite(companyID) {
    this._companyService.acceptInvite(companyID).subscribe(result => {
      this.ngOnInit();
    });
  }
  declineInvite(companyID) {
    this._companyService.declineInvite(companyID).subscribe(result => {
      this.ngOnInit()
    });
  }

  leaveCompany(companyID) {
    this._companyService.leaveCompany(companyID).subscribe(result => {
      this.ngOnInit();
    });
  }

  modalRecruiterToCompany(company) {
    this.selectedCompany = company;
  }
  addRecruiterToCompany() {
    const { email } = this.inviteForm.value;
    this._companyService.inviteRecruiterToCompany(this.selectedCompany.companyID, email).subscribe((res: any) => {
      this.succesInvite = true;
      this.errorInvite = false;
    },
      err => {
        this.errorInvite = true;
        this.succesInvite = false;
      });

  }

}
