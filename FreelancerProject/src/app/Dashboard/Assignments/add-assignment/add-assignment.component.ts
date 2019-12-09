import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { TagService } from 'src/app/Services/tag.service';
import { Tag } from 'src/app/Models/tag.model';
import { Assignment } from 'src/app/Models/assignment.model';
import { isNullOrUndefined } from 'util';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  addAssignment: FormGroup;
  addTags: FormGroup;
  tags: Tag[] = [];
  assignment: Assignment = new Assignment(0,[],"","",null,null,[],null);
  tag: string;
  companiesByUser: Company[];
  companyID: number;
  company: Company;

  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    this._companyService.getCompaniesByUserID(this._userService.getUser().UserID).subscribe(result => {
      this.companiesByUser = result;
    });
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
  addNameToAssignment(){
    const { description, assignmentName} = this.addAssignment.value;
    this.assignment.description = description;
    this.assignment.assignmentName = assignmentName;
  }
  addTag(event) {
    const tagToAdd = new Tag(0, this.tag)
    //this._tagService.postTag(tagToAdd).subscribe(result => {
      this.assignment.tags.push(tagToAdd);
      this.tag = '';
    //});
    event.preventDefault();
  }
  selectCompany(company){
    this.company = company;
    this.companyID = company.companyID;
  }
  postAssignment() {
    console.log(this.assignment);
    this._assignmentService.postAssignment(this.assignment, this.companyID).subscribe(result => {
      console.log(result);
    });
  }
}
