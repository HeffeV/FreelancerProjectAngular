import { Component, OnInit, Input } from "@angular/core";
import { CompanyService } from "src/app/Services/company.service";
import { Router } from "@angular/router";
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { AssignmentService } from 'src/app/Services/assignment.service';

import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/Models/review.model';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: "app-detail-company",
  templateUrl: "./detail-company.component.html",
  styleUrls: ["./detail-company.component.scss"]
})
export class DetailCompanyComponent implements OnInit {

  id: number;
  company: any = {};
  review: any = {} = new Review(0, 0 , '', '', null, null);
  show: Boolean = false;
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  private uploader: FileUploader = new FileUploader(null);
  constructor(private readonly companyService: CompanyService, private router: Router, private _assignmentService :AssignmentService,
              private toast: ToastrService, private readonly reviewService: ReviewService) { }

  ngOnInit() {
    this.companyService.currentCompany.subscribe((res: any) => {
      this.id = res;
      this.getCompany(this.id);
    });
    this.configureFileUploader();
  }

  getCompany(id) {
    this.companyService.getCompanyDetail(id).subscribe(
      result => {
        console.log(result); this.company = result;
        this.show = true;
      }
    );
  }

  deleteCompany(id) {
    this.companyService
      .deleteCompany(id)
      .subscribe(() => this.router.navigate([""]));
  }

  editCompany(id) {
    this.companyService.currentCompany.next(id);
    this.router.navigate(["editcompany"]);
  }

  configureFileUploader() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/dnyqfmbol/image/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: "X-Requested-With",
          value: "XMLHttpRequest"
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append("upload_preset", "angularupload");
      form.append("folder", "angular_sample");
      form.append("file", fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      console.log(fileItem.data.url);
      this.company.image = fileItem.data.url;
      console.log(this.company);
      this.companyService.updateImage(this.company).subscribe(
        result => {console.log('the server sends back: ', result);
                   this.ngOnInit(); this.toast.success('Your company image has been changed'); }
      );
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response)
      });
  }

  btnSelectAssignment(id:number){
    this._assignmentService.setAssignmentID(id);
    this.router.navigate(["/assignmentdetail"]);
  }

  addReview() {
    this.review.company = this.company;
    if (this.review.score > 10 || this.review.score < 0 || this.review.title === '' || this.review.description === '') {
      this.toast.error('Please fill in the fields correctly');
    } else {
      this.toast.success('Your review has been added');
      console.log(this.review);
      this.reviewService.addReview(this.review).subscribe(
        result => {console.log(result); this.ngOnInit(); }
      );
    }
  }
}
