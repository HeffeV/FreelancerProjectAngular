import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Review } from 'src/app/Models/review.model';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/Services/review.service';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/Models/company.model';

@Component({
  selector: "app-dashboard-user",
  templateUrl: "./dashboard-user.component.html",
  styleUrls: ["./dashboard-user.component.scss"]
})
export class DashboardUserComponent implements OnInit {
  checkSub: Subscription;
  requestedAssignments: Assignment[];
  inProgressAssignments: Assignment[];
  finishedAssignments: Assignment[];
  company: Company;
  reviewed = false;
  review: any = ({} = new Review(0, 0, "", "", null, null, true));
  constructor(
    private _assignmentService: AssignmentService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private readonly reviewService: ReviewService
  ) {}

  ngOnInit() {
    //get the requested assignments for this user - the ones he applied for - hasnt been accepted or declined yet
    this._assignmentService
      .getRequestedAssignmentsByUserID()
      .subscribe(result => {
        this.requestedAssignments = result;
      });
    //get the in progress assignments for this user - the ones he applied for and has been selected for
    this._assignmentService
      .getInProgressAssignmentsByUserID()
      .subscribe(result => {
        this.inProgressAssignments = result;
      });
    //get the finished assignments for this user - the ones he applied for and has been selected for and he finished
    this._assignmentService
      .getFinishedAssignmentsByUserID()
      .subscribe(result => {
        this.finishedAssignments = result;
      });
  }
  //user cancels his apply for this assignment
  cancelAssignment(assignment) {
    this._assignmentService.cancelAssignment(assignment).subscribe(result => {
      this.ngOnInit();
    });
  }
  //navigate to the details of this assignment
  viewDetails(assignment) {
    this._assignmentService.currentAssignment.next(assignment.assignmentID);
    this.router.navigate(["/assignmentdetail"]);
  }

  changeCompany(company, companyID) {
    this.company = company;
    this.checkIfUserReviewedCompany(companyID);
  }
  addReview() {
    this.review.company = this.company;
    if (
      this.review.score > 10 ||
      this.review.score < 0 ||
      this.review.title === "" ||
      this.review.description === ""
    ) {
      this.toast.error("Please fill in the fields correctly");
    } else {
      console.log(this.review);
      this.reviewService.addReview(this.review).subscribe(result => {
        console.log(result);
        this.ngOnInit();
        this.toast.success("Your review has been added");
      });
    }
  }

  checkIfUserReviewedCompany(companyID) {
    this.reviewService
      .checkIfUserReviewedCompany(companyID)
      .subscribe(result => {
        this.reviewed = result;
      });
  }
}
