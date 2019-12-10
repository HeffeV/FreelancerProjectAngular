import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user : User = null;

  constructor(private _accountService: AccountService) { 
    this.loadUser();
  }

  loadUser(){
    //this._accountService.getUser()
  }

  ngOnInit() {
  }

}
