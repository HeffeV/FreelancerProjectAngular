import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Models/company.model';
import { CompanyService } from 'src/app/Services/company.service';
import { FormBuilder } from '@angular/forms';
import { CompanyFilterModel } from 'src/app/Models/companyfilter.model';
import { Tag } from 'src/app/Models/tag.model';
import { TagCompany } from 'src/app/Models/tag-company';

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

  constructor(private fb: FormBuilder, private companyService: CompanyService) { }

  ngOnInit() {
    this.findCompany();
    this.filterForm.reset();
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

}
