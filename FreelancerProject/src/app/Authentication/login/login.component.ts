import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Models/user-login.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError;
  showError = false;
  loggedIn = true;
  model: UserLogin = new UserLogin("", "");
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });
  submitted: boolean = false;

  resetPassForm = this.fb.group({
    email: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private _authenticateService: AuthenticateService, private router: Router, private _accountService: AccountService, private toast: ToastrService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      this.loggedIn = e
    })
  }

  ngOnInit() {
    //dubbele controle of er zeker een token aanwezig is en dus een gebruiker ingelogt is.
    if (localStorage.getItem("token") != null) {
      this.loggedIn = true
    }
    else {
      this.loggedIn = false;
    }
    //alle errors afzetten.
    this.showError = false;
  }

  resetPass() {
    this._accountService.resetPassword(this.resetPassForm.controls["email"].value).subscribe(res => {
      this.toast.success('An email has beent sent to your email adress');
    },
    (err) => {
     // this.toast.error('An error has occurred');
     this.toast.error(err.error.title);
    });
  }

  onSubmit() {
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
        this.loginError = 'Incorrect username or password.';
        this.showError = true;
        this.submitted = false;
      }
    );
  }

}
