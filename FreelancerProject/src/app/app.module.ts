import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Navigation/navigation.component';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material';
import { DashboardModule } from './Dashboard/dashboard.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RxFormModule } from './Authentication/rxform.module';
import { DetailCompanyComponent } from './company/detail-company/detail-company.component';
import { AccountComponent } from './Account/account/account.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CompanyComponent,
    AddCompanyComponent,
    DetailCompanyComponent,
    AccountComponent,
    EditCompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    DashboardModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RxFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
