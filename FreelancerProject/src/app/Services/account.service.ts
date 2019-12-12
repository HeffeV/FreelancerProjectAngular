import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../Models/skill.model';
import { UserSkill } from '../Models/userskill.model';

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

  updateUser(user: User){
    return this.http.put("https://freelancerprojectapi.azurewebsites.net/api/User", user);
  }

  getSkills(id: number): Observable<Skill[]>{
    return this.http.get<Skill[]>("https://freelancerprojectapi.azurewebsites.net/api/Skill/"+id);
  }

  deleteSkill(id: number){
    return this.http.delete<UserSkill>("https://freelancerprojectapi.azurewebsites.net/api/Skill/userSkill/" + id);
  }
}
