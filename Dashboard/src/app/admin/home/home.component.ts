import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
const queryParams = new URLSearchParams(window.location.search);
// console.log("queryParams 1",queryParams.get('aisdigital'));

if (queryParams.has('aisdigital')) {
  const aisdigitalValue = queryParams.get('aisdigital');
  console.log("aisdigital parameter value:", aisdigitalValue); // Log the value of aisdigital
  
  if (aisdigitalValue) {
    window.location.href = `https://uat-explorer.adamma.in/aisdigiapi/upload/${aisdigitalValue}`;
  } else {
    console.error("aisdigital value is not present in the query string");
  }
} else {
  console.error("aisdigital parameter not found in the query string");
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  constructor(private observer:BreakpointObserver){}


  // ngAfterViewInit(): void {
  //   this.observer.observe(['(max-width:800px)']).subscribe((res) =>{
  //     if(res.matches){
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();

  //     }else{
  //       this.sidenav.mode='side';
  //       this.sidenav.close();
  //     }
  //   })

  // }


  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    else {
      styleClass = 'default-body'
    }
    return styleClass;
  }
}