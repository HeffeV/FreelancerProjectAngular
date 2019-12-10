import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  loggedUser: any = null;
  id : number;
  user : User = {
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
         location: null
  };
  zeroAssignments : Boolean = false;

  constructor(private accountService: AccountService, private companyService: CompanyService, private userService : UserserviceService) { 
  }

  loadUser(id: number){
    this.accountService.getUser(id)
    .subscribe(res => {
      this.user.userAssignments = [];
      this.user = res;
      console.log(this.user);
      this.checkStatusFinished();
    });
  }

  checkStatusFinished(){
    if(this.user.userAssignments.filter(x => (x.assignment.status.statusID == 2) && (x.accepted == true)).length < 1){
      this.zeroAssignments = true;
    }
  }

  ngOnInit() {
    this.loggedUser = this.userService.getUser();
    this.accountService.currentAccount.subscribe((res:any)=>{
      this.id=res;
      if(this.id != null){
        this.loadUser(this.id);
      }
      else{
        this.loadUser(this.loggedUser.UserID);
      }
    });
  }

}
