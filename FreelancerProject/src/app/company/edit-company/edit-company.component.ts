import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private readonly companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompany(this.id);
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => { console.log(result); this.company = result; this.location = result.location; this.contactInfo = result.contactInfo; }
    );
  }
}
