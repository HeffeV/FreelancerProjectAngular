import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company.model';
import { ContactInfo } from 'src/app/Models/contact-info.model';
import { Tag } from 'src/app/Models/tag.model';
import { CompanyService } from '../../Services/company.service';
import { Router } from '@angular/router';
import { TagCompany } from 'src/app/Models/tag-company';

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
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
  }


  addTag(event) {
    this.tags.push(this.tag);
    this.tag = '';
    event.preventDefault();
  }

  onSubmit() {
    const addTags: TagCompany[] = [];
    this.tags.forEach(element => {
      addTags.push(new TagCompany(0, null, new Tag(0, element)));
    });
    const newCompany = new Company(0, null, null, null, addTags, this.location,
      this.company.companyName, this.contactInfo, this.company.about);

    console.log(newCompany);

    this.companyService.addCompany(newCompany).subscribe(
      result => {console.log(result)}
    );
  }
}
