import { Component, OnInit } from '@angular/core';
import { BrowseAssignmentService } from 'src/app/Services/browseassignment.service';
import { Assignment } from 'src/app/Models/assignment.model';

@Component({
  selector: 'app-browse-assignment',
  templateUrl: './browse-assignment.component.html',
  styleUrls: ['./browse-assignment.component.scss']
})
export class BrowseAssignmentComponent implements OnInit {

  assignments:Assignment[];
  constructor(private baService:BrowseAssignmentService) { }

  ngOnInit() {
    this.baService.getAssignments().subscribe((res:any)=>{
      this.assignments=res
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
      this.assignments.push(this.assignments[0]);
    });

  }

}
