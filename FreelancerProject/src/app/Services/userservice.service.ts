import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { UserFilterModel } from '../Models/userfilter.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http: HttpClient) { }

  addUser(userReg: User) {
    return this.http.post<User>("https://localhost:5001/api/User", userReg);
  }
  getFilteredUsers(userfilter: UserFilterModel) {
    return this.http.post<User[]>("https://localhost:5001/api/User/filteredUsers", userfilter);
  }
  deleteUser(id: number) {
    return this.http.delete<User>("https://localhost:5001/api/User/" + id);
  }

  //current user returned (userid)
  getUser(): User {
    if (localStorage.getItem('token') != null) {
      let jwtData = localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt);
    }
    return null;
  }

  getUserID() {
    if (localStorage.getItem('token') != null) {
      let jwtData = localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt).UserID;
    }
    return null;
  }

}
