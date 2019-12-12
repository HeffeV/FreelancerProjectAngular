import { Component, ViewChild, OnInit } from "@angular/core";
import { AuthenticateService } from "../Services/authenticate.service";
import { AccountService } from "../Services/account.service";
import { UserserviceService } from "../Services/userservice.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  title = "FreelancerProject";
  @ViewChild("sidenav", { static: false }) sidenav: any;
  loggedIn = false;
  user: any = {};
  constructor(
    private _authenticateService: AuthenticateService,
    private accountService: AccountService,
    private userService: UserserviceService
  ) {}

  ngOnInit() {
    this.accountService.getUser(2).subscribe(
      result => {this.user = result; console.log('logged in user: ', result); }
    );
  }
  toggleSideNav() {
    this.sidenav.toggle();
  }

  logOut() {
    this._authenticateService.logOut();
  }
  checkIfLoggedIn() {
    return this._authenticateService.CheckLoggedIn();
  }

}