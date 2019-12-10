import { Component, OnInit } from '@angular/core';
import { BrowseAssignmentService } from 'src/app/Services/browseassignment.service';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder } from '@angular/forms';
import { Tag } from 'src/app/Models/tag.model';
import { FilterModel } from 'src/app/Models/filter.model';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-assignment',
  templateUrl: './browse-assignment.component.html',
  styleUrls: ['./browse-assignment.component.scss']
})
export class BrowseAssignmentComponent implements OnInit {

  hide:boolean=true;
  filterForm = this.fb.group({
    Title:[''],
    Tag:['']
  })
  tag:Tag;
  tags:Tag[]=[];
  filterModel=new FilterModel("",[],[],"","");

  assignments:Assignment[];
  constructor(private router:Router,private baService:BrowseAssignmentService,private fb: FormBuilder,private _assignmentService:AssignmentService) { }

  ngOnInit() {
    this.baService.getAssignments().subscribe((res:any)=>{
      this.assignments=res;
    });
    this.baService.getTags().subscribe((res:any)=>{
      this.tags=res;
    })
    this.onChanges();
  }

  btnAssignmentDetails(id:number){
    this._assignmentService.setAssignmentID(id);
    this.router.navigate(["/assignmentdetail"]);
  }

  onChanges(): void {
    this.filterForm.valueChanges.subscribe(val => {
      this.updateResults();
    });
  }

  updateResults(){
    this.filterModel.title=this.filterForm.value.Title;
    if(this.filterForm.value.Tag!=''){
      this.tag = this.tags.find(i=>i.tagID==this.filterForm.value.Tag)
      if(this.tag!=null){
        this.tags.splice(this.tags.indexOf(this.tag),1);
        this.filterModel.tags.push(this.tag);
      }
    }
    console.log(this.filterModel)
      this.baService.getFilteredAssignments(this.filterModel).subscribe((res:any)=>{
        this.assignments=res;      })
  }

}
