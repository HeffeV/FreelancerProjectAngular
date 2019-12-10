import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account:number;

  currentAccount = new BehaviorSubject(this.account);
  
  constructor(private http: HttpClient) { }

  getUser(id: number) : Observable<User>{
    return this.http.get<User>("https://freelancerprojectapi.azurewebsites.net/api/User/" + id);
  }
}
