import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/Services/tag.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { Tag } from 'src/app/Models/tag.model';
import { TagAssignment } from 'src/app/Models/tag-assignment';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  assignment: Assignment = new Assignment(0, [], "", "", null, null, [], null, "");
  tag: string;
  tags: Tag[] = [];
  tagToAdd:Tag;
  tagAssignments:TagAssignment;
  updateAssignment: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    this.updateAssignment = this._formBuilder.group({
      assignmentID: [0, Validators.required],
      tags: [''],
      description: ['', Validators.required],
      assignmentName: ['', Validators.required],
      location: [''],
      company: [''],
      user: [''],
      status: ['']
    });
    this._assignmentService.getAssignmentEdit().subscribe(result => {
      this.assignment = result;
      console.log(this.assignment);
      this.updateAssignment.setValue({
        assignmentName: this.assignment.assignmentName,
        description: this.assignment.description,
        company: this.assignment.company.companyName,
        assignmentID: '',
        tags: '',
        location: '',
        user: '',
        status: this.assignment.status.currentStatus
      });
    });
  }
  putAssignment() {
    const {assignmentName, description} =  this.updateAssignment.value;
    this.assignment.description  = description;
    this.assignment.assignmentName = assignmentName;
    console.log("SAVE"+this.assignment);
    this._assignmentService.putAssignment(this.assignment).subscribe( result => {
      this.ngOnInit();
    });
  }

  addTag(event) {
    this.tagToAdd = new Tag(0, this.tag)
    this.tagAssignments = new TagAssignment(0, null, this.tagToAdd);
    this.assignment.tagAssignments.push(this.tagAssignments);
    this.tag = '';
    console.log("ADD TAG"+this.assignment);
    // this._assignmentService.putAssignment(this.assignment).subscribe( result => {
    //   this.ngOnInit();
    // });
    event.preventDefault();
  }

  deleteTagAssignment(tagAssignment: TagAssignment) {
    this._tagService.deleteTagAssignments(tagAssignment.tagAssignmentID).subscribe(ta => {
      this.ngOnInit();
    });
  }
}