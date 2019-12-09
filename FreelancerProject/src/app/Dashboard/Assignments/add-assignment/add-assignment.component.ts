import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { TagService } from 'src/app/Services/tag.service';
import { Tag } from 'src/app/Models/tag.model';
import { Assignment } from 'src/app/Models/assignment.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  addAssignment: FormGroup;
  addTags: FormGroup;
  tags: Tag[] = [];
  assignment: Assignment;
  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService) { }

  ngOnInit() {
    this.addAssignment = this._formBuilder.group({
      description: ['', Validators.required],
      assignmentName: ['', Validators.required]
    });
    this.addTags = this._formBuilder.group({
      tags: ['', Validators.required]
    });
    this._tagService.getTags().subscribe(result => {
      this.tags = result;
    });
  }
  newAssignment(){
    const { description, assignmentName} = this.addAssignment.value;
    this.assignment = new Assignment(0, [],description, assignmentName, null, null, null);
  }
  addTagsToAssignment() {
    console.log(this.addTags.value);
    //this.assignment.tags.push();
  }
}
