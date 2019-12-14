import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  constructor(private _userService : UserserviceService,private _accountService: AccountService) { }

  ngOnInit() {
    var userID = this._userService.getUserID();
    //get the currentUser that is logged in
    this._accountService.getUser(userID).subscribe(result => {
      this.currentUser = result;
    });
  }

}
