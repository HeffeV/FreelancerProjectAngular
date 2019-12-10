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
     userID: null,
        email: null,
         password: null,
         username: null,
         name: null,
         lastName: null,
         bio: null,
         birthYear: null,
         token: null,
         userType: null,
         skills: null,
         reviews: null,
         contactInfo: null,
         userCompanies: null,
         tagUsers: null,
         userAssignments: null,
         location: null,
         image:null,
  };

  constructor(private accountService: AccountService, private companyService: CompanyService, private userService : UserserviceService) { 
  }

  loadUser(id: number){
    this.accountService.getUser(id)
    .subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
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
