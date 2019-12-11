import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';
import { BehaviorSubject } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { User } from '../Models/user.model';
import { UserAssignment } from '../Models/user-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignmentID: number;

  private assignment: number;
  userID: number;
  currentAssignment = new BehaviorSubject(this.assignment);

  constructor(private http: HttpClient, private _userService : UserserviceService) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment");
  }
  getRequestedAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/requestedAssignmentByUserID?userID=" + this.userID);
  }
  getInProgressAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/inProgressAssignmentByUserID?userID=" + this.userID);
  }
  getFinishedAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/finishedAssignmentByUserID?userID=" + this.userID);
  }
  getAssignmentsByCompany() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/byCompany?userID=" + this.userID);
  }
  putAssignment(assignment: Assignment) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/", assignment);
  }
  postAssignment(assignment: Assignment, companyID) {
    return this.http.post<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment?companyID=" + companyID, assignment);
  }
  deleteAssigment(assignmentID) {
    return this.http.delete<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + assignmentID);
  }
  publishAssignment(assignmentID) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/PublishAssignment?id=" + assignmentID, null);
  }
  closeAssignment(assignmentID) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/closeAssignment?id=" + assignmentID, null);
  }
  finishAssignment(assignmentID) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/FinishAssignment?id=" + assignmentID, null);
  }

  applyForAssignment(assignmentID) {
    this.userID = this._userService.getUserID();
    return this.http.post<UserAssignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/ApplyForAssignment?assignmentID=" + assignmentID +"&userID=" + this.userID, null);
  }
  cancelAssignment(assignment) {
    this.userID = this._userService.getUserID();
  }
  setAssignmentID(assignmentID) {
    this.assignmentID = assignmentID;
    //return this.http.delete<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + assignmentID);
  }
  getAssignmentEdit() {
    return this.http.get<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + this.assignmentID);
  }
}
