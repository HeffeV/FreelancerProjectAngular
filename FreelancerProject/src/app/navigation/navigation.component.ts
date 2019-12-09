import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthenticateService } from '../Services/authenticate.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  title = 'FreelancerProject';
  @ViewChild('sidenav', { static: false }) sidenav: any;
  loggedIn = false;
  constructor(private _authenticateService : AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e;
      })
    }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.loggedIn=this._authenticateService.CheckLoggedIn();
  }

  logOut(){
    this._authenticateService.logOut();
  }

}
