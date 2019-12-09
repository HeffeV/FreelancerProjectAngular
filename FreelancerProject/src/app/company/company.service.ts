import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }


  addCompany(company) {
    return this.http.post<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company?userid=' + 1, company);
  }

  getCompany(id) {
    
  }
}
