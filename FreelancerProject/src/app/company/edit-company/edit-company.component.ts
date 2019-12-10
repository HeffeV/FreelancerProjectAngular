import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagCompany } from 'src/app/Models/tag-company';
import { Tag } from 'src/app/Models/tag.model';
import { Company } from 'src/app/Models/company.model';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  id = '';
  company: any = {};
  location: any = {};
  contactInfo: any = {};
  tags: string[] = [];
  tag = '';
  constructor(private readonly companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.companyService.currentCompany.subscribe( (res: any) => {
      this.id = res;
      this.getCompany(this.id);
    });
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => { console.log(result); this.company = result;
                  this.fillTags(result.tagCompanies); 
                }
    );
  }

  fillTags(tags) {
    console.log(tags);
    tags.forEach(element => {
      this.tags.push(element.tag.tagName);
    });
    console.log(this.tags);
  }

  addTag(event) {
    this.tags.push(this.tag);
    this.tag = '';
    event.preventDefault();
  }

  onSubmit() {
    const addTags: TagCompany[] = [];
    this.tags.forEach(element => {
      this.company.tagCompanies.push(new TagCompany(0, null, new Tag( 0, element)));
    });
    console.log(this.company);
    this.companyService.updateCompany(this.company).subscribe(
      result => { console.log(result); this.router.navigate(['']);  }
    );
  }
}
