import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company.model';
import { ContactInfo } from 'src/app/Models/contact-info.model';
import { Tag } from 'src/app/Models/tag.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  company: any = {};
  location: any = {};
  contactInfo: any = {};
  tags: string[] = [];
  tag = '';
  constructor() { }

  ngOnInit() {
  }


  addTag(event) {
    this.tags.push(this.tag);
    this.tag = '';
    event.preventDefault();
  }

  onSubmit() {
    const addTags: Tag[] = [];
    this.tags.forEach(element => {
      addTags.push(new Tag(0, element));
    });
    const newCompany = new Company(0, null, null, null, addTags, this.location,
      this.company.CompanyName, this.contactInfo, this.company.About);

    console.log(newCompany);

  }
}
