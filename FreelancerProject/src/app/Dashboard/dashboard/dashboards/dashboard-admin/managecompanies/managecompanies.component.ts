import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';
import { FormBuilder } from '@angular/forms';
import { CompanyFilterModel } from 'src/app/Models/companyfilter.model';
import { Tag } from 'src/app/Models/tag.model';
import { TagCompany } from 'src/app/Models/tag-company';
import { TagService } from 'src/app/Services/tag.service';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-managecompanies',
  templateUrl: './managecompanies.component.html',
  styleUrls: ['./managecompanies.component.scss']
})
export class ManagecompaniesComponent implements OnInit {

  companies: Company[];
  company: Company;
  filterModel: CompanyFilterModel;

  tag = '';
  tagToAdd: Tag;
  tagCompany: TagCompany;

  filterForm = this.fb.group({
    Country: [''],
    Postcode: [''],
    Name: ['']
  });

  countries: any = [];

  constructor(private fb: FormBuilder, private companyService: CompanyService,
              private _tagService: TagService, private countryService: CountryService) { }

  ngOnInit() {
    this.findCompany();
    this.filterForm.reset();
    this.getCountries();
  }

  findCompany() {
    this.filterForm.valueChanges.subscribe(e => {
      this.filterModel = new CompanyFilterModel(this.filterForm.value.Country,
        this.filterForm.value.Name,
        this.filterForm.value.Postcode);
      this.companyService.filterCompanies(this.filterModel).subscribe(e => {
        this.companies = e;
      })
    })
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(e => {
      this.ngOnInit();
    });
  }

  saveCompany() {
    this.companyService.updateCompany(this.company).subscribe(e => {
      this.ngOnInit();
    });
  }

  selectCompany(company: Company) {
    this.company = company;
  }

  addTag(event) {
    this.tagToAdd = new Tag(0, this.tag)
    this.tagCompany = new TagCompany(0, null, this.tagToAdd);
    this.company.tagCompanies.push(this.tagCompany);
    this.tag = '';
    event.preventDefault();
  }

  deleteTag(tagCompany) {
    this._tagService.deleteTagCompany(tagCompany.tagCompanyID).subscribe(ta => {
      const index = this.company.tagCompanies.indexOf(tagCompany, 0);
      if (index > -1) {
        this.company.tagCompanies.splice(index, 1);
      }
    });
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      result => {console.log(result); this.countries = result; }
    );
  }
}
