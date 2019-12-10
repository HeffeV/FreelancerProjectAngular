import { Component, OnInit } from '@angular/core';
import { BrowseAssignmentService } from 'src/app/Services/browseassignment.service';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-browse-assignment',
  templateUrl: './browse-assignment.component.html',
  styleUrls: ['./browse-assignment.component.scss']
})
export class BrowseAssignmentComponent implements OnInit {

  filterForm = this.fb.group({
    Title:[''],
  })

  assignments:Assignment[];
  constructor(private baService:BrowseAssignmentService,private fb: FormBuilder) { }

  ngOnInit() {
    this.baService.getAssignments().subscribe((res:any)=>{
      this.assignments=res
    });
    this.onChanges();
  }

  btnAssignmentDetails(id:number){
    console.log(this.assignments[id].image);
  }

  onChanges(): void {
    this.filterForm.valueChanges.subscribe(val => {
      console.log(this.filterForm.value.Title);
        this.baService.getFilteredAssignments(this.filterForm.value.Title).subscribe((res:any)=>{
          this.assignments=res;      })
    });
  }

}
