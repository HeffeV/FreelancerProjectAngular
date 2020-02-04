import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../Models/assignment.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from '../Models/filter.model';
import { Tag } from '../Models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class BrowseAssignmentService {

  private assignment: number;

  currentAssignment = new BehaviorSubject(this.assignment);

  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<Assignment[]>("https://localhost:5001/api/Assignment/AllOpenAssignments");
  }
  getFilteredAssignments(filterModel: FilterModel): Observable<Assignment[]> {
    return this.http.post<Assignment[]>("https://localhost:5001/api/Assignment/filterAssignments", filterModel);
  }
  getTags() {
    return this.http.get<Tag[]>("https://localhost:5001/api/Tag");
  }
}
