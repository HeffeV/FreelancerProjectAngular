import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://freelancerprojectapi.azurewebsites.net/api/Assignment");
  }
  putAssignment(assignment: any) {
    return this.http.put<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/" + assignment.assignmentID, assignment);
  }
  postAssignment(assignment: any) {
    return this.http.post<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment", assignment);
  }
  deleteAssigment(assignmentID) {
    return this.http.delete<Assignment>("https://freelancerprojectapi.azurewebsites.net/api/Assignment/"+ assignmentID);
  }
}