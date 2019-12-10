import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  id:number;
  company: any = {};
  show:Boolean=false;
  constructor(private readonly companyService: CompanyService, private router: Router) { }

  ngOnInit() {
      this.companyService.currentCompany.subscribe((res:any)=>{
      this.id=res;
      this.getCompany(this.id);
    });
  }


  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => {console.log(result); this.company = result; 
      this.show=true;}
    );
  }

  deleteCompany(id) {
    this.companyService.deleteCompany(id).subscribe(
      () => this.router.navigate(['home'])
    );
  }
}
