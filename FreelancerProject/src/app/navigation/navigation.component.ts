import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  title = 'FreelancerProject';
  @ViewChild('sidenav', { static: false }) sidenav: any;

  toggleSideNav() {
    this.sidenav.toggle();
  }

}
