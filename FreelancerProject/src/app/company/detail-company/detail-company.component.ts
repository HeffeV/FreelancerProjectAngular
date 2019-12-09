import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  company: any = {};
  constructor(private readonly companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCompany(id);
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => {console.log(result); this.company = result; }
    );
  }

  deleteCompany(id) {
    this.companyService.deleteCompany(id).subscribe(
      () => this.router.navigate(['home'])
    );
  }
}
