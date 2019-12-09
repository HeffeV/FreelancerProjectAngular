import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http: HttpClient) { }
  
addUser(userReg: User) {
  return this.http.post<User>("https://freelancerprojectapi.azurewebsites.net/api/User", userReg);
}

//current user returned (username)
  getUser(){
    if(localStorage.getItem('token')!=null){
      let jwtData=localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt);
    }
    return null;
  }

}
