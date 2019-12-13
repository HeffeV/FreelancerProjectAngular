import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Models/category.model';
import { Skill } from '../Models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAllSkills() {
    return this.http.get<Skill[]>("https://freelancerprojectapi.azurewebsites.net/api/Skill/getSkills");
  }

  getAllCategories() {
    return this.http.get<Category[]>("https://freelancerprojectapi.azurewebsites.net/api/Skill/getCategories");
  }

  createCategory(category: Category) {
    return this.http.post<Category>("https://freelancerprojectapi.azurewebsites.net/api/Skill/PostCategory", category);
  }
  createSkill(skill: Skill) {
    return this.http.post<Skill>("https://freelancerprojectapi.azurewebsites.net/api/Skill/PostSkill", skill);
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>("https://freelancerprojectapi.azurewebsites.net/api/Skill/DeleteCategory?id=" + id);
  }

  deleteSkill(id: number) {
    return this.http.delete<Skill>("https://freelancerprojectapi.azurewebsites.net/api/Skill/DeleteSkill?id=" + id);
  }
}