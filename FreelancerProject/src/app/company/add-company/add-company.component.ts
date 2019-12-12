import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/Models/company.model';
import { ContactInfo } from 'src/app/Models/contact-info.model';
import { Tag } from 'src/app/Models/tag.model';
import { CompanyService } from '../../Services/company.service';
import { Router } from '@angular/router';
import { TagCompany } from 'src/app/Models/tag-company';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  company: any = {};
  location: any = {};
  contactInfo: any = {};
  tags: string[] = [];
  tag = '';
  image = '';
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  private uploader: FileUploader = new FileUploader(null);
  constructor(private companyService: CompanyService, private router: Router,
              private toast: ToastrService) { }

  ngOnInit() {
    this.configureFileUploader();
  }


  addTag(event) {
    this.tags.push(this.tag);
    this.tag = '';
    event.preventDefault();
  }

  onSubmit() {
    const addTags: TagCompany[] = [];
    this.tags.forEach(element => {
      addTags.push(new TagCompany(0, null, new Tag(0, element)));
    });
    const newCompany = new Company(0, null, null, null, addTags, this.location,
      this.company.companyName, this.contactInfo, this.company.about, this.image);

    console.log(newCompany);

    this.companyService.addCompany(newCompany).subscribe(
      result => {console.log(result); this.router.navigate(['dashboard']); }
    );
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
      this.image = fileItem.data.url;
      console.log('image is ', this.image);
      this.toast.success('Image uploaded', 'The image has been added');
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
}
