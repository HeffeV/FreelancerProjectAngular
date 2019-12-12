import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/Models/tag.model';
import { TagUser } from 'src/app/Models/tag-user';
import { Skill } from 'src/app/Models/skill.model';
import { UserSkill } from 'src/app/Models/userskill.model';
import { TagService } from 'src/app/Services/tag.service';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loggedUser: any = null;
  id: number = null;
  user: User = {
    userID: 0,
    email: "",
    password: "",
    username: "",
    name: "",
    lastName: "",
    bio: "",
    birthYear: 0,
    token: "",
    userType: null,
    userSkills: [],
    reviews: [],
    contactInfo: null,
    userCompanies: [],
    tagUsers: [],
    userAssignments: [],
    location: null,
    image: "",
  };
  zeroAssignments: Boolean = false;
  isEditable: Boolean = false;
  skills: Skill[] = [];
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  private uploader: FileUploader = new FileUploader(null);

  constructor(private accountService: AccountService, private companyService: CompanyService, private userService: UserserviceService, private assignmentservice: AssignmentService, private router: Router, private fb: FormBuilder, private _tagService: TagService) {
  }

  loadUser(id: number) {
    this.accountService.getUser(id)
      .subscribe(res => {
        this.user.userAssignments = [];
        this.user = res;
        this.user.reviews = this.user.reviews.filter(r => r.userReview == false);
        console.log(this.user);
        this.checkStatusFinished();
        this.getSkills();
      });
  }

  btnSelectAssignment(id: number) {
    this.assignmentservice.setAssignmentID(id);
    this.router.navigate(["/assignmentdetail"]);
  }

  onSubmit() {
    console.log(this.user);
    this.accountService.updateUser(this.user).subscribe();
    this.isEditable = false;
  }

  addTag(tag: string) {
    this.user.tagUsers.push(new TagUser(0, null, new Tag(0, tag)));
  }

  deleteTag(tagUser: TagUser) {
    this._tagService.deleteTagUser(tagUser.tagUserID).subscribe(ta => {
      const index = this.user.tagUsers.indexOf(tagUser, 0);
      if (index > -1) {
        this.user.tagUsers.splice(index, 1);
      }
    });
  }

  getSkills() {
    this.accountService.getSkills(this.user.userID).subscribe(res => {
      this.skills = res;
    });
  }

  onChange(skill) {
    if (skill != "") {
      this.user.userSkills.push(new UserSkill(0, null, this.skills.find(s => s.skillID == skill)));
      this.skills.splice(this.skills.indexOf(this.skills.find(s => s.skillID == skill)), 1);
    }
    console.log(this.user.userSkills);
  }

  deleteSkill(us: UserSkill) {
    this.accountService.deleteSkill(us.userSkillID).subscribe(res => {
      const index = this.user.userSkills.indexOf(us, 0);
      if (index > -1) {
        this.user.userSkills.splice(index, 1);
        this.skills.push(us.skill);
      }
    });
  }

  cancelEdit() {
    this.isEditable = false;
    this.loadUser(this.loggedUser.UserID);
  }

  checkStatusFinished() {
    if (this.user.userAssignments.filter(x => (x.assignment.status.statusID == 2) && (x.accepted == true)).length < 1) {
      this.zeroAssignments = true;
    }
  }

  changeToEditable() {
    this.isEditable = true;
  }

  ngOnInit() {
    this.loggedUser = this.userService.getUser();
    this.accountService.currentAccount.subscribe((res: any) => {
      this.id = res;
      if (this.id != null) {
        this.loadUser(this.id);
      }
      else {
        this.loadUser(this.loggedUser.UserID);
      }
    });

    this.configureFileUploader();
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
      this.user.image = fileItem.data.url;
      this.accountService.updateAvater(this.user).subscribe(
        result => {console.log(result); this.ngOnInit(); }
      );
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
