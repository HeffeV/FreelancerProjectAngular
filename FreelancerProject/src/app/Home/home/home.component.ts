import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { Company } from 'src/app/Models/company.model';
import { Assignment } from 'src/app/Models/assignment.model';
import { CompanyService } from 'src/app/Services/company.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies: Company[];
  assignments: Assignment[];

  constructor(private homeservice: HomeService, private companyservice: CompanyService, private assignmentservice: AssignmentService, private router: Router) {
  }

  ngOnInit() {
    this.homeservice.getAssignments().subscribe((res: any) => {
      this.assignments = res;
    });
    this.homeservice.getCompanies().subscribe((res: any) => {
      this.companies = res;
    })
  }

  btnSelectAssignment(id: number) {
    //this.assignmentservice.currentAssignment.next(id);
    //router hier
    this.assignmentservice.currentAssignment.next(id);
    this.router.navigate(["/assignmentdetail"]);
  }

  btnSelectCompany(id: number) {
    this.companyservice.currentCompany.next(id);
    //router naar company details hier
    this.router.navigate(["/companydetail"]);
  }

}
