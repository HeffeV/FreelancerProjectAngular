import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Review } from 'src/app/Models/review.model';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  requestedAssignments: Assignment[];
  inProgressAssignments: Assignment[];
  finishedAssignments: Assignment[];
  company: any = {};
  review: any = {} = new Review(0, 0 , '', '', null, null);
  constructor(private _assignmentService: AssignmentService, private _formBuilder: FormBuilder, private router: Router,
              private toast: ToastrService, private readonly reviewService: ReviewService) { }

  ngOnInit() {
    this._assignmentService.getRequestedAssignmentsByUserID().subscribe(result =>{
      this.requestedAssignments = result;
    });
    this._assignmentService.getInProgressAssignmentsByUserID().subscribe(result => {
      this.inProgressAssignments = result;
    });
    this._assignmentService.getFinishedAssignmentsByUserID().subscribe(result => {
      this.finishedAssignments = result;
      console.log(result);
    });
  }
 
  cancelAssignment(assignment){
    this._assignmentService.cancelAssignment(assignment).subscribe(result => {
      this.ngOnInit();
    });
  }
  viewDetails(assignment) {
    this._assignmentService.setAssignmentID(assignment.assignmentID);
    this.router.navigate(["/assignmentdetail"]);
  }

  changeCompany(company) {
    this.company = company;
    console.log(company);
  }
  addReview() {
    this.review.company = this.company;
    if (this.review.score > 10 || this.review.score < 0 || this.review.title === '' || this.review.description === '') {
      this.toast.error('Please fill in the fields correctly');
    } else {
      console.log(this.review);
      this.reviewService.addReview(this.review).subscribe(
        result => {console.log(result); this.ngOnInit(); this.toast.success('Your review has been added'); }
      );
    }
  }
}
