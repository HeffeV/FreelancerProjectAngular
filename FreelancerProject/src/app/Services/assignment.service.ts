import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignmentID: number;

  private assignment:number;

  currentAssignment = new BehaviorSubject(this.assignment);

  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment");
  }
  putAssignment(assignment: Assignment) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + assignment.assignmentID, assignment);
  }
  postAssignment(assignment: Assignment, companyID) {
    return this.http.post<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment?companyID=" + companyID, assignment);
  }
  deleteAssigment(assignmentID) {
    return this.http.delete<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/"+ assignmentID);
  }
  publishAssignment(assignmentID) {
     return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/PublishAssignment?id=" + assignmentID,null);
  }

  setAssignmentID(assignmentID){
    this.assignmentID = assignmentID;
  }
  getAssignmentEdit(){
    return this.http.get<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + this.assignmentID);
  }
}
