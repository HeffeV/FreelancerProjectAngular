import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../Models/tag.model';
import { TagAssignment } from '../Models/tag-assignment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  getTags() {
    return this.http.get<Tag[]>("https://freelancerprojectapi.azurewebsites.net/api/Tag");
  }
  postTag(tag: Tag) {
    return this.http.post<Tag>("https://freelancerprojectapi.azurewebsites.net/api/Tag", tag);
  }


  //TagAssignments
  deleteTagAssignments(id) {
    return this.http.delete<TagAssignment>("https://freelancerprojectapi.azurewebsites.net/api/Tag/tagAssignment/" + id);
  }
  postTagAssignment(tagAssignment: TagAssignment) {
    return this.http.post<TagAssignment>("https://freelancerprojectapi.azurewebsites.net/api/Tag/tagAssignment", tagAssignment);
  }
}
