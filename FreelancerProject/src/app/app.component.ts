import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FreelancerProject';
  @ViewChild('sidenav', { static: false }) sidenav: any;

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
