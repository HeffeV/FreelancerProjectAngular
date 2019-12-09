import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/user-login.model';
import { FormBuilder } from '@angular/forms';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError;
  showError=false;
  loggedIn = true;
  model:UserLogin = new UserLogin("","");
  loginForm = this.fb.group({
  email: [''],
  password: ['']
  });
  submitted : boolean = false;

  constructor(private fb: FormBuilder,private _authenticateService : AuthenticateService,private router: Router) { 
    this._authenticateService.isLoggedin.subscribe(e=> {
      this.loggedIn=e
      })
  }

  ngOnInit() {
        //dubbele controle of er zeker een token aanwezig is en dus een gebruiker ingelogt is.
        if(localStorage.getItem("token")!=null){
          this.loggedIn=true
        }
        else{
          this.loggedIn=false;
        }
        //alle errors afzetten.
        this.showError=false;
  }

  onSubmit()
  {
    this.submitted = true;
    //model aanvullen met data van form
    this.model.password = this.loginForm.controls["password"].value;
    this.model.email = this.loginForm.controls["email"].value;
    //model naar back end sturen en kijken of deze klopt.
    this._authenticateService.authenticate(this.model).subscribe(
      (res: any) => {
        //als login klopt token aanvullen en naar dashboard navigeren.
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
        //gebruiker ingelogt zetten.
        this._authenticateService.isLoggedin.next(true);
      },
      err => {
        //indien inloggen niet gelukt is errors tonen.
          this.loginError='Incorrect username or password.';
          this.showError=true;
          this.submitted = false;
      }
    );
  }

}
