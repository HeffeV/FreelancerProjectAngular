import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../Models/tag.model';
import { TagAssignment } from '../Models/tag-assignment';
import { TagUser } from '../Models/tag-user';

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
  updateTag(tag: Tag) {
    return this.http.put<Tag>("https://freelancerprojectapi.azurewebsites.net/api/Tag", tag);
  }
  deleteTag(id: number) {
    return this.http.delete<Tag>("https://freelancerprojectapi.azurewebsites.net/api/Tag/" + id);
  }


  //TagAssignments
  deleteTagAssignments(id) {
    return this.http.delete<TagAssignment>("https://freelancerprojectapi.azurewebsites.net/api/Tag/tagAssignment/" + id);
  }
  postTagAssignment(tagAssignment: TagAssignment) {
    return this.http.post<TagAssignment>("https://freelancerprojectapi.azurewebsites.net/api/Tag/tagAssignment", tagAssignment);
  }

  //TagUsers
  deleteTagUser(id) {
    return this.http.delete<TagUser>("https://freelancerprojectapi.azurewebsites.net/api/Tag/tagUser/" + id);
  }
}
