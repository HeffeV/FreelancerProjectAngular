import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<any>("https://freelancerprojectapi.azurewebsites.net/api/Assignment");
  }
  putAssignment(assignment: any) {
    return this.http.put<any>("https://freelancerprojectapi.azurewebsites.net/api/Assignment", assignment.assignmentID, assignment);
  }
  postAssignment(assignment: any) {
    return this.http.post<any>("https://freelancerprojectapi.azurewebsites.net/api/Assignment", assignment);
  }
  deleteAssigment(assignmentID) {
    return this.http.delete<any>("https://freelancerprojectapi.azurewebsites.net/api/Assignment", assignmentID);
  }
}
