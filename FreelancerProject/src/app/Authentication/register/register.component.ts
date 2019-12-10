import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { UserType } from 'src/app/Models/user-type.model';
import { ContactInfo } from 'src/app/Models/contact-info.model';
import { Location } from 'src/app/Models/location.model';
import { User } from 'src/app/Models/user.model';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userType=new UserType(0,"")
  submitted: boolean = false;
  model: User;
  registerError;
  showError = false;
  registerForm = this.fb.group({
    Username: [''],
    Email: [''],
    UserType: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      },
      { validator: this.comparePasswords }
    )
  });
  informationForm = this.fb.group({
    Country: [''],
    PostCode: [''],
    Address: [''],
    BirthYear: [''],
    Name: [''],
    LastName: [''],
    MobileNumber: [''],
    Image: ['']
  });
  fileToUpload: File = null;
  @Input()
  responses: Array<any>;
  uploader: FileUploader;
  constructor(
    private fb: FormBuilder,
    private _userservice: UserserviceService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm.reset();
    this.informationForm.reset();
    this.showError = false;
    this.configureFileUploader();
  }

  // passwoords checken of ze overeenkomen
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (
      confirmPswrdCtrl.errors == null ||
      'passwordMismatch' in confirmPswrdCtrl.errors
    ) {
      // passwoords kloppen niet.
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      // passwoords kloppen.
      else confirmPswrdCtrl.setErrors(null);
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.value.userType=="Recruiter"){
      this.userType = new UserType(2,"recruiter");
    }
    else{
      this.userType = new UserType(1,"user");
    }
    this.model = new User(
      0,
      this.registerForm.value.Email,
      this.registerForm.value.Passwords.Password,
      this.registerForm.value.Username,
      this.informationForm.value.Name,
      this.informationForm.value.LastName,
      '',
      this.informationForm.value.BirthYear,
      '',
      this.informationForm.value.Image,
      this.userType,
      [],
      [],
      new ContactInfo(0, this.informationForm.value.MobileNumber, ''),
      [],
      [],
      [],
      new Location(
        0,
        this.informationForm.value.Country,
        this.informationForm.value.PostCode,
        this.informationForm.value.Address
      )
    );

    //gebruiker aanmaken.
    this._userservice.addUser(this.model).subscribe(
      (res: any) => {
        //indien user aangemaakt is verder gaan naar loginform
        this.router.navigate(['/login']);
      },
      e => {
        //indien username of email al bestaat error tonen.
        this.registerError = 'Username or Email already exists!';
        this.showError = true;
        this.submitted = false;
      }
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
      console.log('imageform is: ', this.informationForm.value.Image);
      console.log('Birthyear is ', this.informationForm.value.BirthYear);
      console.log('Name is is ', this.informationForm.value.Name);
      console.log('Lastname is ', this.informationForm.value.LastName);

      console.log(fileItem.data.url);
      this.informationForm.patchValue({
        Image: fileItem.data.url
      });
      console.log('imageform is: ', this.informationForm.value.Image);
      this.toast.success('Image upload successfull', '');
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
