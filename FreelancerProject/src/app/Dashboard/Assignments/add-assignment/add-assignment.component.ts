import { Component, OnInit, Input } from '@angular/core';
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
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
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
  companiesByUser: Company[];
  companyID: number;
  company: Company;
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  private uploader: FileUploader = new FileUploader(null);
  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

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
    this.configureFileUploader();
  }
  addNameToAssignment() {
    this.assignment.description = this.tassignment.description;
    this.assignment.assignmentName = this.tassignment.assignmentName;
  }
  addTag(event) {
    const tagToAdd = new Tag(0, this.tag)
    //this._tagService.postTag(tagToAdd).subscribe(result => {
    const tagAssignments = new TagAssignment(0, null, tagToAdd)
    this.assignment.tagAssignments.push(tagAssignments);
    this.tag = '';
    console.log(this.assignment);
    //});
    event.preventDefault();
  }
  selectCompany(company) {
    this.company = company;
    this.companyID = company.companyID;
  }
  postAssignment() {

    console.log(this.companyID);
    this._assignmentService.postAssignment(this.assignment, this.companyID).subscribe(
      (res:any)=>{
        this.router.navigate(['/dashboard']);
      }
    );
  }
  configureFileUploader() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/dnyqfmbol/image/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: "X-Requested-With",
          value: "XMLHttpRequest"
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append("upload_preset", "angularupload");
      form.append("folder", "angular_sample");
      form.append("file", fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      console.log(fileItem.data.url);
      this.assignment.image = fileItem.data.url;
      console.log(this.assignment);
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response)
      });
  }
}
