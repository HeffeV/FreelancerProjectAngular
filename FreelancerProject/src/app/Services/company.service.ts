import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompaniesByUserID(userID: number) {
    return this.http.get<Company[]>("https://freelancerprojectapi.azurewebsites.net/api/Company/ByUser?userID=" + userID);
  }

  addCompany(company) {
    return this.http.post<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company/', company);
  }

  getCompanyDetail(companyId) {
    return this.http.get<any>('https://freelancerprojectapi.azurewebsites.net/api/Company/' + companyId);
  }
}
