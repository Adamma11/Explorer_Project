import { Component, Input } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';

  isLoggedIn:boolean = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(

    private loginService: AuthService,


  ){}
  ngOnInit(){
    this.checkLoggedIn();
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  checkLoggedIn(){
    this.loginService.getLoggedInValue().subscribe((loggedIn: boolean) => {
      // if (loggedIn) {
      //   this.router.navigate(['home/dashboard']).then(() => {
      //     window.location.reload();
      //   });
      // }
      this.isLoggedIn = loggedIn;
      // console.log(`loggedIn : ${loggedIn} and this.isLoggedIn : ${this.isLoggedIn}`);
    });
   }
}