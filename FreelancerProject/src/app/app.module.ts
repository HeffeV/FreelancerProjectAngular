import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { TokenInterceptor } from './Authentication/token.interceptor';
import { BrowseAssignmentModule } from './BrowseAssignments/browse-assignment.module';
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import { FileUploadModule } from 'ng2-file-upload';
import * as cloudinary from 'cloudinary-core';
import {ToastrModule} from 'ngx-toastr';
import { NavigationComponent } from './navigation/navigation.component';

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
    BrowseAssignmentModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    CloudinaryModule.forRoot(cloudinary, { cloud_name: 'mycloudname' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
