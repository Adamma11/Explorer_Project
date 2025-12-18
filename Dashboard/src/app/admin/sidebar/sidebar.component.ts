import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/auth.service';
import { server } from 'src/app/config';
import { AuthNewService } from 'src/app/auth-new.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { ElementRef,ViewChild } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent {
  private readonly logoutTime = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

  //////////////////new sid nav///////////
  @ViewChild('sidenav')
  sidenav!: ElementRef;
  isLoggedIn: boolean = false;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  roles: string[] = [];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  ////////////////////////////////////////
  userName=""
  userId=""
  panelOpenState = false;

  constructor(
    private loginService:LoginService,
    public router: Router,
    private authService: AuthService,
    private loginNewService:AuthNewService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,

    
  ){
    this.initLogoutTimer();
  }

  ngOnInit(){
    // window.location.reload();
    console.log('SidebarComponent ngOnInit');
    this.screenWidth = window.innerWidth;
    this.getUserName();
    this.checkLoginStatus();
    // console.log('this.isLoggedIn:', this.isLoggedIn);
  }
  ngAfterViewInit() {

    this.getUserName();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    
    if (!this.sidenav.nativeElement.contains(event.target)) {
      this.collapseSidenav();
    }
  }
  collapseSidenav() {
 
    this.closeSidenav();
  }
  // ngDoCheck(){
  //   this.getUserName();
  //   this.checkLoginStatus();
  //   // console.log('this.isLoggedIn:', this.isLoggedIn);
  // }
  getUserName(){
    this.loginService.getCurrentUser().subscribe(
      response=>{
        setTimeout(() => {
          this.userName = response.name,
          this.userId = response.userId
        },0)
         
       
        
        // this.cdr.detectChanges();
      },
      error=>{ 
        console.log("Error fetching user name",error.error.message);
      }
    )
  }




///////////////////new sid nav///////////////////////
checkLoginStatus() {
  if(localStorage.getItem('accessToken')){
    this.isLoggedIn=true;
    this.authService.changeToLoggedIn();
  }
  this.authService.getLoggedInValue().subscribe((loggedIn: boolean) => {
    this.isLoggedIn = loggedIn;
  });
}

toggleCollapse(): void {
  this.collapsed = !this.collapsed;
  this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
}

closeSidenav(): void {
  this.collapsed = false;
  this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
}

handleClick(item: INavbarData): void {
  this.shrinkItems(item);
  item.expanded = !item.expanded
}

// getActiveClass(data: INavbarData): string {
//   return this.router.url.includes(data.routeLink) ? 'active' : '';
// }
///shartah///
getActiveClass(data: INavbarData): string {
  // Check if the current URL matches the parent or any of its children
  if (this.router.url.startsWith(data.routeLink)) return 'active';

  if (data.items) {
    for (let child of data.items) {
      if (this.router.url.startsWith(child.routeLink)) {
        return 'active';
      }
    }
  }
  return '';
}
/////////////

shrinkItems(item: INavbarData): void {
  if (!this.multiple) {
    for(let modelItem of this.navData) {
      if (item !== modelItem && modelItem.expanded) {
        modelItem.expanded = false;
      }
    }
  }
}


///signout 
private initLogoutTimer(): void {
  setTimeout(() => {
    this.signoutClicked();
  }, this.logoutTime);
}

signoutClicked() {
  localStorage.clear();
      window.location.href = ``
  // this.loginNewService.signout().subscribe(
  //   response => {
  //     localStorage.clear();
  //     window.location.href = ``
  //   },
  //   error => {
  //     this.showError(error.error.message)
  //   },
  // )

}
showError(msg:any) {
  this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
}

 isAllowed(screenCode: string) {
  const screens = localStorage.getItem('screens');
  if(screens != null) {
    let indexOfScreen = localStorage.getItem('screens')?.indexOf(screenCode);
    if (indexOfScreen != -1) {
      return true;
    } else {
      return false;
    }
  }else{
    return false;
  }
}

//////////////////Shartah///////////
autoExpandActiveMenu(): void {
  for (let item of this.navData) {
    if (
      this.router.url.startsWith(item.routeLink) ||
      item.items?.some(child => this.router.url.startsWith(child.routeLink))
    ) {
      item.expanded = true;
    }
  }
}

// comment toggleCollapse/// and add this mouse over;

onMouseEnter() {
  this.collapsed = true;
  this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
}

onMouseLeave() {
  this.collapsed = false;
  this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
}

}
