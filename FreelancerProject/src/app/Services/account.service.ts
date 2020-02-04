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

  private account: number = null;

  currentAccount = new BehaviorSubject(this.account);

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>("https://localhost:5001/api/User/" + id);
  }

  updateUser(user: User) {
    return this.http.put("https://localhost:5001/api/User", user);
  }

  getSkills(id: number): Observable<Skill[]> {
    return this.http.get<Skill[]>("https://localhost:5001/api/Skill/" + id);
  }

  deleteSkill(id: number) {
    return this.http.delete<UserSkill>("https://localhost:5001/api/Skill/userSkill/" + id);
  }

  updateAvater(user) {
    return this.http.put('https://localhost:5001/api/User/updateavatar', user);
  }

  resetPassword(email: string) {
    return this.http.put("https://localhost:5001/api/User/resetPassword/" + email, null);
  }
}
