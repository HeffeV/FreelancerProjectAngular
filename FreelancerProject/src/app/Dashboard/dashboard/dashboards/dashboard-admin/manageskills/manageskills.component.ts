import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkillService } from 'src/app/Services/skill.service';
import { Category } from 'src/app/Models/category.model';
import { Skill } from 'src/app/Models/skill.model';

@Component({
  selector: 'app-manageskills',
  templateUrl: './manageskills.component.html',
  styleUrls: ['./manageskills.component.scss']
})
export class ManageskillsComponent implements OnInit {

  success: boolean;
  successInfo: string = "";
  registerError: string = "";
  error: boolean;
  categories: Category[];
  category: Category;
  skill: Skill;
  skills: Skill[];

  createCategoryForm = this.fb.group({
    CategoryName: [''],
  })
  createSkillForm = this.fb.group({
    Category: [''],
    Skill: [''],
  })
  deleteSkillForm = this.fb.group({
    Skill: [''],
  })
  deleteCategoryForm = this.fb.group({
    Category: [''],
  })

  constructor(private fb: FormBuilder, private skillservice: SkillService) { }

  ngOnInit() {
    this.skillservice.getAllCategories().subscribe(e => {
      this.categories = e;
    });
    this.skillservice.getAllSkills().subscribe(e => {
      this.skills = e;
    })
    this.createCategoryForm.reset();
    this.createSkillForm.reset();
    this.deleteSkillForm.reset();
    this.deleteCategoryForm.reset();
  }

  createCategory() {
    this.category = new Category(0, this.createCategoryForm.value.CategoryName);
    this.skillservice.createCategory(this.category).subscribe((res: any) => {
      this.success = true;
      this.successInfo = this.category.categoryName + " created successfully.";
      this.error = false;
      this.ngOnInit();
    },
      e => {
        if (e.status == 404) {
          this.registerError = this.category.categoryName + ' already exists! ';
        }
        else {
          this.registerError = 'Something went wrong, please try again later.';
        }
        this.success = false;
        this.error = true;
      });
  }

  createSkill() {
    this.skill = new Skill(0,
      this.createSkillForm.value.Skill,
      new Category(0, this.createSkillForm.value.Category));

    this.skillservice.createSkill(this.skill).subscribe((res: any) => {
      this.success = true;
      this.error = false;
      this.successInfo = this.skill.skillName + " created successfully.";
      this.ngOnInit();
    },
      e => {
        if (e.status == 404) {
          this.registerError = this.skill.skillName + ' already exists! ';
        }
        else {
          this.registerError = 'Something went wrong, please try again later.';
        }
        this.success = false;
        this.error = true;
      })
  }

  deleteSkill() {
    this.skillservice.deleteSkill(this.deleteSkillForm.value.Skill).subscribe((res: any) => {
      this.success = true;
      this.error = false;
      this.successInfo = "Deleted skill successfully.";
      this.ngOnInit();
    },
      e => {
        this.registerError = 'Something went wrong, please try again later.';
        this.success = false;
        this.error = true;
      })
  }

  deleteCategory() {
    this.skillservice.deleteCategory(this.deleteCategoryForm.value.Category).subscribe((res: any) => {
      this.success = true;
      this.error = false;
      this.successInfo = "Deleted category successfully.";
      this.ngOnInit();
    },
      e => {
        this.registerError = 'Something went wrong, please try again later.';
        this.success = false;
        this.error = true;
      })
  }

}
