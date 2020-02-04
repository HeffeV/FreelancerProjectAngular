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
    return this.http.get<Tag[]>("https://localhost:5001/api/Tag");
  }
  postTag(tag: Tag) {
    return this.http.post<Tag>("https://localhost:5001/api/Tag", tag);
  }
  updateTag(tag: Tag) {
    return this.http.put<Tag>("https://localhost:5001/api/Tag", tag);
  }
  deleteTag(id: number) {
    return this.http.delete<Tag>("https://localhost:5001/api/Tag/" + id);
  }


  //TagAssignments
  deleteTagAssignments(id) {
    return this.http.delete<TagAssignment>("https://localhost:5001/api/Tag/tagAssignment/" + id);
  }
  postTagAssignment(tagAssignment: TagAssignment) {
    return this.http.post<TagAssignment>("https://localhost:5001/api/Tag/tagAssignment", tagAssignment);
  }

  //TagUsers
  deleteTagUser(id) {
    return this.http.delete<TagUser>("https://localhost:5001/api/Tag/tagUser/" + id);
  }

  deleteTagCompany(id) {
    return this.http.delete<TagUser>("https://localhost:5001/api/Tag/tagCompany/" + id);
  }
}
