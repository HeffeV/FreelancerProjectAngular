import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../Models/company.model';
import { BehaviorSubject } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { CompanyFilterModel } from '../Models/companyfilter.model';
import { UserCompany } from '../Models/user-company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: number;

  currentCompany = new BehaviorSubject(this.company);

  constructor(private http: HttpClient, private _userService: UserserviceService) { }

  getCompaniesByUserID(userID: number) {
    return this.http.get<Company[]>("https://freelancerprojectapi.azurewebsites.net/api/Company/ByUser?userID=" + userID);
  }

  addCompany(company) {
    return this.http.post<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company/', company);
  }
  getCompany(companyID) {
    return this.http.get<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company/' + companyID);
  }
  getCompanyDetail(companyId) {
    return this.http.get<any>('https://freelancerprojectapi.azurewebsites.net/api/Company/' + companyId);
  }

  deleteCompany(id) {
    return this.http.delete<any>('https://freelancerprojectapi.azurewebsites.net/api/Company/' + id);
  }

  updateCompany(company) {
    return this.http.put<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company/', company);
  }
  updateImage(company) {
    return this.http.put<Company>('https://freelancerprojectapi.azurewebsites.net/api/Company/updateimage', company);
  }
  checkIfOwnCompany(company) {
    const userID = this._userService.getUserID();
    return this.http.get<any>("https://freelancerprojectapi.azurewebsites.net/api/Company/CheckIfOwnCompany?companyID=" + company.companyID + "&userID=" + userID);
  }
  filterCompanies(filtermodel: CompanyFilterModel) {
    return this.http.post<Company[]>("https://freelancerprojectapi.azurewebsites.net/api/Company/filteredCompanies", filtermodel);
  }
  getAllCompanies() {
    return this.http.get<Company[]>("https://freelancerprojectapi.azurewebsites.net/api/Company");
  }
  getCompanyInvites(){
    const userID = this._userService.getUserID();
    return this.http.get<UserCompany[]>("https://freelancerprojectapi.azurewebsites.net/api/Company/GetCompanyInvites?userID="+ userID);
  }
  acceptInvite(companyID){
    const userID = this._userService.getUserID();
    return this.http.put<UserCompany>("https://freelancerprojectapi.azurewebsites.net/api/Company/AcceptInviteCompany?companyID=" + companyID + "&recruiterID=" + userID, null);
  }
  declineInvite(companyID){
    const userID = this._userService.getUserID();
    return this.http.delete<UserCompany>("https://freelancerprojectapi.azurewebsites.net/api/Company/DeclineInviteCompany?companyID=" + companyID + "&recruiterID=" + userID);
  }
  leaveCompany(companyID){
    const userID = this._userService.getUserID();
    return this.http.delete<UserCompany>("https://localhost:5001/api/Company/LeaveCompany?companyID="+ companyID + "&recruiterID=" + userID);
  }
  inviteRecruiterToCompany(companyID, recruiterEmail) {
    return this.http.post<UserCompany>("https://freelancerprojectapi.azurewebsites.net/api/Company/InviteRecruiter?companyID=" + companyID + "&recruiterEmail=" + recruiterEmail, null);
  }
}

