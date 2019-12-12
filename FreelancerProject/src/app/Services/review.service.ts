import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review) {
    return this.http.post<any>('https://freelancerprojectapi.azurewebsites.net/api/Review/addreviewtocompany', review);
  }

  checkIfUserReviewedCompany(companyid) {
    return this.http.get<any>('https://freelancerprojectapi.azurewebsites.net/api/Review/checkifuserreviewedcompany/' + companyid);
  }
}
