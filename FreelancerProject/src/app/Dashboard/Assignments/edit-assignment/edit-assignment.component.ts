import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/Services/tag.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { Tag } from 'src/app/Models/tag.model';
import { TagAssignment } from 'src/app/Models/tag-assignment';
import { Location } from 'src/app/Models/location.model';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  assignment: Assignment;
  tag: string;
  tags: Tag[] = [];
  tagToAdd: Tag;
  tagAssignments: TagAssignment;
  updateAssignment: FormGroup;
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  uploader: FileUploader = new FileUploader(null);
  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    //create a form to edit the assignment
    this.assignment;
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
    this._assignmentService.currentAssignment.subscribe(assignmentID => {
      this._assignmentService.getAssignmentEdit(assignmentID).subscribe(result => {
        this.assignment = result;
        //fill the values with the data from the assignment
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
    });

    this.configureFileUploader();

  }

  //save the assignment 
  //only values that are saved are the name and description
  putAssignment() {
    const { assignmentName, description } = this.updateAssignment.value;
    this.assignment.description = description;
    this.assignment.assignmentName = assignmentName;

    this._assignmentService.putAssignment(this.assignment).subscribe(result => {
      this.router.navigate(['assignmentdetail']);
    });
  }

  //create new tag 
  //backend checks if this tag already exists
  //add tag to list of tagsAssignment-objects in assignment
  addTag(event) {
    this.tagToAdd = new Tag(0, this.tag)
    this.tagAssignments = new TagAssignment(0, null, this.tagToAdd);
    this.assignment.tagAssignments.push(this.tagAssignments);
    this.tag = '';
    event.preventDefault();
  }

  //delete the tag from this assignment
  deleteTagAssignment(tagAssignment: TagAssignment) {
    if (tagAssignment.tagAssignmentID == 0) {
      const index = this.assignment.tagAssignments.indexOf(tagAssignment, 0);
      if (index > -1) {
        this.assignment.tagAssignments.splice(index, 1);
      }
    }
    else {
      this._tagService.deleteTagAssignments(tagAssignment.tagAssignmentID).subscribe(ta => {
        const index = this.assignment.tagAssignments.indexOf(tagAssignment, 0);
        if (index > -1) {
          this.assignment.tagAssignments.splice(index, 1);
        }
      });
    }
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