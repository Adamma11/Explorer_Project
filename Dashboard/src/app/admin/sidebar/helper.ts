import { animate, style, transition, trigger } from "@angular/animations";

export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
    permission?: boolean;
}

export interface INavbarNestedData {
  routeLink: string;
  label: string;
  permission?: boolean;
}

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ])
  ])


  export function isAllowed(screenCode: string) {
    
    const screens = localStorage.getItem('screens');
    // console.log('screencode == ', screenCode, "screens == ", screens);

    if(screens != null) {
      let indexOfScreen = localStorage.getItem('screens')?.indexOf(screenCode);
      // console.log('screencode == ', screenCode, "screens == ", screens, 'index == ', indexOfScreen);
      if (indexOfScreen != -1) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }
  
  export function  isOutputqcMenuRequired() {
    const screens = localStorage.getItem('screens');
    if (screens != null) {
      if (screens.indexOf("OPER-009") > -1 || screens.indexOf("OPER-025") > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  export function isDataEntryMenuRequired() {
    const screens = localStorage.getItem('screens');
    if (screens != null) {
      if (screens.indexOf("OPER-001") > -1 || screens.indexOf("OPER-002") > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  export function isVerificationsMenuRequired() {
    const screens = localStorage.getItem('screens');
    if (screens != null) {
      if (screens.indexOf("OPER-003") > -1 || screens.indexOf("OPER-004") > -1 || screens.indexOf("OPER-005") > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  export function isInsufficiencyMenuRequired() {
    const screens = localStorage.getItem('screens');
    if (screens != null) {
      if (screens.indexOf("OPER-010") > -1 || screens.indexOf("OPER-011") > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
