import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/Services/company.service';
import { Router } from '@angular/router';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { AssignmentService } from 'src/app/Services/assignment.service';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {

  id: number;
  company: any = {};
  show: Boolean = false;
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  private uploader: FileUploader = new FileUploader(null);
  constructor(private readonly companyService: CompanyService, private router: Router, private _assignmentService :AssignmentService) { }

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
    this.companyService.deleteCompany(id).subscribe(
      () => this.router.navigate([''])
    );
  }

  editCompany(id) {
    this.companyService.currentCompany.next(id);
    this.router.navigate(['editcompany']);
  }

  configureFileUploader() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/dnyqfmbol/image/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'angularupload');
      form.append('folder', 'angular_sample');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      console.log(fileItem.data.url);
      //this.appService
      //.updateAvatar({ url: fileItem.data.url })
      //.subscribe(() => this.initializeAccount());
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
    //this.assignmentservice.currentAssignment.next(id);
    //router hier
    this._assignmentService.setAssignmentID(id);
    this.router.navigate(["/assignmentdetail"]);
  }
}
