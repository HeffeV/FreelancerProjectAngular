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
import { AssignmentsComponent } from './Dashboard/Assignments/assignments.component';
import { DashboardModule } from './Dashboard/dashboard.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { RouterModule, Routes } from '@angular/router';
import { RxFormModule } from './Authentication/rxform.module';

const appRoutes: Routes = [
  {
    path: 'assignments',
    component: AssignmentsComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CompanyComponent,
    AddCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    MatListModule,
    HttpClientModule,
    DashboardModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RxFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
