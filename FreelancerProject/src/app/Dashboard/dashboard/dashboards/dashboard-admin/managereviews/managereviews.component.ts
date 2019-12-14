import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/Models/review.model';
import { ReviewService } from 'src/app/Services/review.service';
import { FormBuilder } from '@angular/forms';
import { FilterReviewModel } from 'src/app/Models/reviewfilter.model';

@Component({
  selector: 'app-managereviews',
  templateUrl: './managereviews.component.html',
  styleUrls: ['./managereviews.component.scss']
})
export class ManagereviewsComponent implements OnInit {

  success: boolean;
  successInfo: string;
  registerError: string;
  error: boolean;

  reviews: Review[];
  review: Review;

  filterModel: FilterReviewModel;

  filterForm = this.fb.group({
    CompanyName: [''],
    Username: [''],
    Title: [''],
    UserReview: ['True']
  });

  constructor(private fb: FormBuilder, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getAllReviews().subscribe(e => {
      this.reviews = e;
    });
    this.filterForm = this.fb.group({
      CompanyName: [''],
      Username: [''],
      Title: [''],
      UserReview: ['True']
    });
    this.findReview();
    this.error = false;
    this.success = false;
    this.successInfo = "";
    this.registerError = "";
  }

  findReview() {
    this.filterForm.valueChanges.subscribe(e => {
      this.filterModel = new FilterReviewModel(this.filterForm.value.Title,
        this.filterForm.value.CompanyName,
        this.filterForm.value.Username,
        this.filterForm.value.UserReview);
      this.reviewService.getFilteredReviews(this.filterModel).subscribe(e => {
        this.reviews = e;
      })
    });
  }

  selectReview(review: Review) {
    this.review = review;
  }

  saveReview() {
    console.log(this.review);
    this.reviewService.adminUpdateReview(this.review).subscribe((res: any) => {
      this.success = true;
      this.successInfo = "Review updated successfully";
      this.ngOnInit();
    },
      e => {
        if (e.status == 404) {
          this.registerError = "Review not found!";
        }
        else {
          this.registerError = 'Something went wrong, please try again later.';
        }
        this.error = true;
      });
  }

  deleteReview(id: number) {
    this.reviewService.adminDeleteReview(id).subscribe((res: any) => {
      this.success = true;
      this.successInfo = "Review removed successfully";
      this.ngOnInit();
    },
      e => {
        if (e.status == 404) {
          this.registerError = "Review not found!";
        }
        else {
          this.registerError = 'Something went wrong, please try again later.';
        }
        this.error = true;
      });
  }

}
