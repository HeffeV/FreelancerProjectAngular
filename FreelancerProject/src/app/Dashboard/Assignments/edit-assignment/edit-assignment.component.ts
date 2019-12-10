import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/Services/tag.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { Tag } from 'src/app/Models/tag.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  tassignment: any = {};
  assignment: Assignment;// = new Assignment(0, [], "", "", null, null, [], null);
  tag: string;
  tags: Tag[] = [];
  updateAssignment: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    this.updateAssignment = this._formBuilder.group({
      assignmentID: [0, Validators.required],
      tags: [''],
      description: [this.assignment.description, Validators.required],
      assignmentName: [this.assignment.assignmentName, Validators.required],
      location: [''],
      company: [{value: this.assignment.company.companyName, disabled: true}],
      user: ['']
    });
    this._assignmentService.getAssignmentEdit().subscribe(result => {
      this.assignment = result;
      console.log(this.assignment);
      this.updateAssignment.setValue({
        assignmentName: this.assignment.assignmentName,
        description: this.assignment.description,
        //company: this.assignment.company.companyName
        assignmentID: '',
        tags:'',
        location: '',
        company: '',
        user: '',
        status: this.assignment.status
      });
    });    
  }
  putAssignment() {
    this.assignment.description = this.tassignment.description;
    this.assignment.assignmentName = this.tassignment.assignmentName;
  }

  addTag(event) {
    const tagToAdd = new Tag(0, this.tag);
    this.assignment.tags.push(tagToAdd);
    this.tag = '';
    event.preventDefault();
  }
}
