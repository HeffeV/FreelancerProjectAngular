import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { Company } from 'src/app/Models/company.model';
import { Assignment } from 'src/app/Models/assignment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies:Company[];
  assignments:Assignment[];

  constructor(private homeservice:HomeService) {
   }

  ngOnInit() {
    this.homeservice.getAssignments().subscribe((res:any)=>{
      this.assignments=res;
    });
    this.homeservice.getCompanies().subscribe((res:any)=>{
      this.companies=res;
    })
  }

}
