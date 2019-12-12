import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review) {
    return this.http.post<any>('https://localhost:44308/api/Review/addReviewToCompany', review);
  }
}
