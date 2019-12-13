import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { FormBuilder } from '@angular/forms';
import { UserFilterModel } from 'src/app/Models/userfilter.model';
import { Skill } from 'src/app/Models/skill.model';
import { TagUser } from 'src/app/Models/tag-user';
import { Tag } from 'src/app/Models/tag.model';
import { UserSkill } from 'src/app/Models/userskill.model';
import { AccountService } from 'src/app/Services/account.service';
import { TagService } from 'src/app/Services/tag.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss']
})
export class ManageusersComponent implements OnInit {

  filterModel: UserFilterModel;
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
  skills: Skill[] = [];
  users: User[];
  filterForm = this.fb.group({
    Email: [''],
    Username: [''],
    UserType: ['']
  });

  constructor(private userservice: UserserviceService, private fb: FormBuilder, private accountService: AccountService, private _tagService: TagService) { }

  ngOnInit() {
    this.findUser();
    this.filterForm.reset();
  }

  findUser() {
    this.filterForm.valueChanges.subscribe(e => {
      this.filterModel = new UserFilterModel(this.filterForm.value.Username,
        this.filterForm.value.Email,
        this.filterForm.value.UserType);
      this.userservice.getFilteredUsers(this.filterModel).subscribe(e => {
        this.users = e;
      });
    });
  }
  selectUser(user: User) {
    this.user = user;
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

  deleteSkill(us: UserSkill) {
    this.accountService.deleteSkill(us.userSkillID).subscribe(res => {
      const index = this.user.userSkills.indexOf(us, 0);
      if (index > -1) {
        this.user.userSkills.splice(index, 1);
        this.skills.push(us.skill);
      }
    });
  }

  saveUser() {
    console.log(this.user);
    this.accountService.updateUser(this.user).subscribe();
  }
  deleteUser(userid: number) {
    this.userservice.deleteUser(userid).subscribe(e => {
      this.ngOnInit();
    });
  }

}
