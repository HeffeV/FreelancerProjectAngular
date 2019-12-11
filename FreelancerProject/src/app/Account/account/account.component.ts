import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Tag } from 'src/app/Models/tag.model';
import { TagUser } from 'src/app/Models/tag-user';
import { Skill } from 'src/app/Models/skill.model';

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
    skills: [],
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
  skills : Skill[] = [];


  constructor(private accountService: AccountService, private companyService: CompanyService, private userService: UserserviceService, private assignmentservice: AssignmentService, private router: Router, private fb: FormBuilder, ) {
  }

  loadUser(id: number) {
    this.accountService.getUser(id)
      .subscribe(res => {
        this.user.userAssignments = [];
        this.user = res;
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
    const index = this.user.tagUsers.indexOf(tagUser, 0);
    if (index > -1) {
      this.user.tagUsers.splice(index, 1);
    } 
  }

  getSkills(){
    this.accountService.getSkills().subscribe(res => {
      this.skills = res;
    });
  }

  onChange(skill){
      this.user.skills.push(this.skills.find(s => s.skillID == skill));
  }

  deleteSkill(skill: Skill) {
    const index = this.user.skills.indexOf(skill, 0);
    if (index > -1) {
      this.user.skills.splice(index, 1);
    } 
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
  }

}
