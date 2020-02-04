import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';
import { BehaviorSubject } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { User } from '../Models/user.model';
import { UserAssignment } from '../Models/user-assignment.model';
import { AssignmentFilterModel } from '../Models/assignmentfilter.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignmentID: number;
  userID: number;
  currentAssignment = new BehaviorSubject(this.assignmentID);

  constructor(private http: HttpClient, private _userService: UserserviceService) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment");
  }
  getRequestedAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment/requestedAssignmentByUserID?userID=" + this.userID);
  }
  getInProgressAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment/inProgressAssignmentByUserID?userID=" + this.userID);
  }
  getFinishedAssignmentsByUserID() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment/finishedAssignmentByUserID?userID=" + this.userID);
  }
  getAssignmentsByCompany() {
    this.userID = this._userService.getUserID();
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment/byCompany?userID=" + this.userID);
  }
  putAssignment(assignment: Assignment) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/", assignment);
  }
  postAssignment(assignment: Assignment, companyID) {
    return this.http.post<Assignment>("https://localhost:5001/api/Assignment?companyID=" + companyID, assignment);
  }
  deleteAssigment(assignmentID) {
    return this.http.delete<Assignment>("https://localhost:5001/api/Assignment/" + assignmentID);
  }
  publishAssignment(assignmentID) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/PublishAssignment?id=" + assignmentID, null);
  }
  closeAssignment(assignmentID) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/closeAssignment?id=" + assignmentID, null);
  }
  finishAssignment(assignmentID) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/FinishAssignment?id=" + assignmentID, null);
  }

  applyForAssignment(assignmentID) {
    this.userID = this._userService.getUserID();
    return this.http.post<UserAssignment>("https://localhost:5001/api/Assignment/ApplyForAssignment?assignmentID=" + assignmentID + "&userID=" + this.userID, null);
  }
  cancelAssignment(assignment) {
    this.userID = this._userService.getUserID();
    return this.http.delete<UserAssignment>("https://localhost:5001/api/Assignment/CancelAssignment?assignmentID=" + assignment.assignmentID + "&userID=" + this.userID);
  }
  alreadyApplied(assignment) {
    this.userID = this._userService.getUserID();
    return this.http.get<UserAssignment>("https://localhost:5001/api/Assignment/UserAssignment?assignmentID=" + assignment.assignmentID + "&userID=" + this.userID);
  }

  checkIfOwnAssignment(assignment) {
    this.userID = this._userService.getUserID();
    return this.http.get<any>("https://localhost:5001/api/Assignment/CheckIfOwnAssignment?assignmentID=" + assignment.assignmentID + "&userID=" + this.userID);
  }
  getAssignmentEdit(assignmentID) {
    return this.http.get<Assignment>("https://localhost:5001/api/Assignment/" + assignmentID);
  }
  filterAssignments(filtermodel: AssignmentFilterModel) {
    return this.http.post<Assignment[]>("https://localhost:5001/api/Assignment/adminFilteredAssignments", filtermodel);
  }
  acceptCandidate(assignmentID, candidateID) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/AcceptAssignmentCandidate?assignmentID=" + assignmentID + "&candidateID=" + candidateID, null);
  }
  declineCandidate(assignmentID, candidateID) {
    return this.http.put<Assignment>("https://localhost:5001/api/Assignment/DeclineAssignmentCandidate?assignmentID=" + assignmentID + "&candidateID=" + candidateID, null);
  }
  CheckIfCandidateIsAccepted(assignmentID) {
    return this.http.get<any>("https://localhost:5001/api/Assignment/CheckIfCandidateIsAccepted?assignmentID=" + assignmentID);
  }
}