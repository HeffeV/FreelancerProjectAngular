import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { UserType } from 'src/app/Models/user-type.model';
import { ContactInfo } from 'src/app/Models/contact-info.model';
import { Location } from 'src/app/Models/location.model';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted : boolean = false;
  model:User;
  registerError;
  showError=false;
  registerForm = this.fb.group({
    Username: [''],
    Email:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords }),
    });
    informationForm = this.fb.group({
      Country:[''],
      PostCode:[''],
      Address:[''],
      BirthYear:[''],
      Name:[''],
      LastName:[''],
      UserType:['false'],
      MobileNumber:[''],
    })
  constructor(private fb: FormBuilder, private _userservice:UserserviceService,private router:Router) { }

  ngOnInit() {
    this.registerForm.reset();
    this.informationForm.reset();
    this.showError=false;
  }

    //passwoords checken of ze overeenkomen
    comparePasswords(fb: FormGroup) {
      let confirmPswrdCtrl = fb.get('ConfirmPassword');
      //passwordMismatch
      //confirmPswrdCtrl.errors={passwordMismatch:true}
      if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
        //passwoords kloppen niet.
        if (fb.get('Password').value != confirmPswrdCtrl.value)
          confirmPswrdCtrl.setErrors({ passwordMismatch: true });
        else
        //passwoords kloppen.
          confirmPswrdCtrl.setErrors(null);
      }
    }

    onSubmit()
  {
    this.submitted = true;
    //model aanvullen.

    this.model = new User(0,
      this.registerForm.value.Email,
      this.registerForm.value.Passwords.Password,
      this.registerForm.value.Username,
      this.informationForm.value.Name,
      this.informationForm.value.LastName,
      "",
      this.informationForm.value.BirthYear,
      "",
      new UserType(1,"user"),[],[],
      new ContactInfo(0,this.informationForm.value.MobileNumber,""),
      [],[],[],
      new Location(0,this.informationForm.value.Country,this.informationForm.value.PostCode,this.informationForm.value.Address)
      );

    //gebruiker aanmaken.
    this._userservice.addUser(this.model).subscribe(
      (res:any)=>{
        //indien user aangemaakt is verder gaan naar loginform
        this.router.navigate(["/login"]);
      },
      e=>{
        //indien username of email al bestaat error tonen.
        this.registerError="Username or Email already exists!"
        this.showError=true;
        this.submitted = false;
  });
}

}
