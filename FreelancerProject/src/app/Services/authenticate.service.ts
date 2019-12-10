import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin } from '../Models/user-login.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLoggedin = new BehaviorSubject(false);
  constructor(private _httpClient: HttpClient,private router:Router) { }
  authenticate(userLogin: UserLogin): Observable<User> {
  return this._httpClient.post<User>("https://freelancerprojectapi.azurewebsites.net/api/Authenticate/authenticate", userLogin);
  }
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
    this.isLoggedin.next(false);
  }

  //return bool of er een gebruiker ingelogt is ofniet.
  CheckLoggedIn(){
    if(localStorage.getItem("token")!=null){
      return true;
    }
    else{
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
