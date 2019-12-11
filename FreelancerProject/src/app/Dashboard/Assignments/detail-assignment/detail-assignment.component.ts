import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/Models/assignment.model';
import { FormBuilder } from '@angular/forms';
import { TagService } from 'src/app/Services/tag.service';
import { AssignmentService } from 'src/app/Services/assignment.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/company.service';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-detail-assignment',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.scss']
})
export class DetailAssignmentComponent implements OnInit {

  assignment: Assignment;
  show: Boolean = false;
  success: Boolean = false;
  error: Boolean = false

  constructor(private _formBuilder: FormBuilder, private _tagService: TagService, private _assignmentService: AssignmentService, private router: Router, private _companyService: CompanyService, private _userService: UserserviceService) { }

  ngOnInit() {
    this.success = false;
    this.error = false
    this._assignmentService.getAssignmentEdit().subscribe(result => {
      this.assignment = result;
      console.log(this.assignment);
      this.show = true;
    });
  }

  btnSelectCompany(id: number) {
    this._companyService.currentCompany.next(id);
    //router naar company details hier
    this.router.navigate(["/companydetail"]);
  }
  editAssignment(assignmentID) {
    this._assignmentService.setAssignmentID(assignmentID);
    this.router.navigate(['/editAssignment']);
  }
  deleteAssignment(assignmentID) {
    this._assignmentService.deleteAssigment(assignmentID).subscribe(a => {
      this.router.navigate(["/dashboard"]);
    });
  }
  apply(assignment) {
    this._assignmentService.applyForAssignment(assignment.assignmentID).subscribe((res: any) => {
      this.success = true;
    },
      err => {
        this.error = true;
        this.success = false;
      });
  }
}
