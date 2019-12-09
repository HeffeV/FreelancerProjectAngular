import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../Models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  getTags() {
    return this.http.get<Tag[]>("https://freelancerprojectapi.azurewebsites.net/api/Tag");
  }
}
