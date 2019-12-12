import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkillService } from 'src/app/Services/skill.service';

@Component({
  selector: 'app-manageskills',
  templateUrl: './manageskills.component.html',
  styleUrls: ['./manageskills.component.scss']
})
export class ManageskillsComponent implements OnInit {


  createForm = this.fb.group({
    TagName: [''],
  })
  editForm = this.fb.group({
    TagName: [''],
    Tag: [''],
  })
  deleteForm = this.fb.group({
    Tag: [''],
  })

  constructor(private fb: FormBuilder, private skillservice: SkillService) { }

  ngOnInit() {
  }

}
