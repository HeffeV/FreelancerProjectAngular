import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';
import { Company } from '../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/getRandoms");
  }
  getCompanies(){
    return this.http.get<Company[]>("https://freelancerprojectapi.azurewebsites.net/api/Company/getRandoms");
  }
}
