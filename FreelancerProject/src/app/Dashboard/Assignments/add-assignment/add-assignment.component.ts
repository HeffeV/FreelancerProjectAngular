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
import { Router } from '@angular/router';
import { TagAssignment } from 'src/app/Models/tag-assignment';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  addAssignment: FormGroup;
  addTags: FormGroup;
  tags: Tag[] = [];
  assignment: Assignment = new Assignment(0, [], "", "", null, null, [], null, "");
  tassignment: any = {};
  tag: string;
  // companiesByUser: Company[];
  companyID: number;
  company: Company;

  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    // this._companyService.getCompaniesByUserID(this._userService.getUser().UserID).subscribe(result => {
    //   this.companiesByUser = result;
    // });
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
     this._companyService.currentCompany.subscribe(result => {
      this.companyID = result;
      this._companyService.getCompany(this.companyID).subscribe(result => {
        this.company = result;
      })

    });
  }
  addNameToAssignment() {
    this.assignment.description = this.tassignment.description;
    this.assignment.assignmentName = this.tassignment.assignmentName;
  }
  addTag(event) {
    const tagToAdd = new Tag(0, this.tag)
    const tagAssignments = new TagAssignment(0, null, tagToAdd)
    this.assignment.tagAssignments.push(tagAssignments);
    this.tag = '';
    event.preventDefault();
  }
  // selectCompany(company) {
  //   this.company = company;
  //   this.companyID = company.companyID;
  // }

  postAssignment() {
    this._assignmentService.postAssignment(this.assignment, this.companyID).subscribe(
      (res: any) => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
