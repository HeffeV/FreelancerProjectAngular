import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  company: any = {};
  constructor(private readonly companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCompany(id);
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => {console.log(result); this.company = result; }
    );
  }

}
