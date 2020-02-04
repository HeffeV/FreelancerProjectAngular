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
    return this.http.get<Skill[]>("https://localhost:5001/api/Skill/getSkills");
  }

  getAllCategories() {
    return this.http.get<Category[]>("https://localhost:5001/api/Skill/getCategories");
  }

  createCategory(category: Category) {
    return this.http.post<Category>("https://localhost:5001/api/Skill/PostCategory", category);
  }
  createSkill(skill: Skill) {
    return this.http.post<Skill>("https://localhost:5001/api/Skill/PostSkill", skill);
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>("https://localhost:5001/api/Skill/DeleteCategory?id=" + id);
  }

  deleteSkill(id: number) {
    return this.http.delete<Skill>("https://localhost:5001/api/Skill/DeleteSkill?id=" + id);
  }
}