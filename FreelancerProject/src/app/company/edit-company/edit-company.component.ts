import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagCompany } from 'src/app/Models/tag-company';
import { Tag } from 'src/app/Models/tag.model';
import { Company } from 'src/app/Models/company.model';
import { TagService } from 'src/app/Services/tag.service';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  id = '';
  company: Company;
  location: any = {};
  contactInfo: any = {};
  tag = '';
  tagToAdd:Tag;
  tagCompany:TagCompany;
  countries: any = [];

  constructor(private readonly companyService: CompanyService, private route: ActivatedRoute, private router: Router,
              private readonly _tagService: TagService, private countryService: CountryService) { }

  ngOnInit() {
    this.companyService.currentCompany.subscribe((res: any) => {
      this.id = res;
      this.getCompany(this.id);
    });
    this.countryService.getCountries().subscribe(
      result => {console.log(result); this.countries = result; }
    );
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => {
        this.company = result;
      }
    );
  }


  addTag(event) {
    this.tagToAdd = new Tag(0, this.tag)
    this.tagCompany = new TagCompany(0, null, this.tagToAdd);
    this.company.tagCompanies.push(this.tagCompany);
    this.tag = '';
    event.preventDefault();
  }

  onSubmit() {
    this.companyService.updateCompany(this.company).subscribe(
      result => {
        console.log(result);
        this.companyService.currentCompany.next(this.company.companyID);
        this.router.navigate(['companydetail']);
      }
    );
  }

  deleteTag(tagCompany) {
    this._tagService.deleteTagCompany(tagCompany.tagCompanyID).subscribe(ta => {
      const index = this.company.tagCompanies.indexOf(tagCompany, 0);
      if (index > -1) {
        this.company.tagCompanies.splice(index, 1);
      }
    });
  }
}
