import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../Models/review.model';
import { FilterReviewModel } from '../Models/reviewfilter.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review) {
    return this.http.post<any>('https://freelancerprojectapi.azurewebsites.net/api/Review/addreviewtocompany', review);
  }

  addReviewToUser(review) {
    return this.http.post<any>('https://freelancerprojectapi.azurewebsites.net/api/Review/addreviewtouser', review);
  }

  checkIfUserReviewedCompany(companyid) {
    return this.http.get<any>('https://freelancerprojectapi.azurewebsites.net/api/Review/checkifuserreviewedcompany/' + companyid);
  }


  getAllReviews() {
    return this.http.get<Review[]>("https://freelancerprojectapi.azurewebsites.net/api/Review");
  }
  adminUpdateReview(review: Review) {
    return this.http.put<Review>("https://freelancerprojectapi.azurewebsites.net/api/Review/adminPut", review);
  }
  adminDeleteReview(id: number) {
    return this.http.delete<Review>("https://freelancerprojectapi.azurewebsites.net/api/Review/" + id);
  }
  getFilteredReviews(filterModel: FilterReviewModel) {
    return this.http.post<Review[]>("https://localhost:44308/api/Review/filterReviews", filterModel);
  }
  
  checkIfCompanyReviewUser(companyid, userid) {
    return this.http.get<any>('https://localhost:44308/api/Review/checkifcompanyrevieweduser/'
     + companyid + '/' + userid);
  }
}
