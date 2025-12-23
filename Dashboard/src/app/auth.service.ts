import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'loggedIn';
 loggedIn : boolean  =false;
 loggedInBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.loggedIn); 
 requiredScreens:any[]=[];

//  constructor(){
//   console.log('AuthService constructor');
//   console.log('localStorage value:', localStorage.getItem(this.loggedInKey));
//   const storedValue = localStorage.getItem(this.loggedInKey);
//   this.loggedInBehaviorSubject = new  BehaviorSubject(this.loggedIn);
//   this.loggedIn = localStorage.getItem(this.loggedInKey) === 'true';
//   this.loggedInBehaviorSubject.next(this.loggedIn);
//  }

constructor() {
  console.log('AuthService constructor');
  
  // Retrieve the login state from localStorage on service initialization
  const storedValue = localStorage.getItem(this.loggedInKey);

  // Ensure localStorage value is set to 'false' if it's null
  if (storedValue === null) {
    localStorage.setItem(this.loggedInKey, 'false');
  }

  // Initialize loggedIn and loggedInBehaviorSubject
  this.loggedIn = storedValue === 'true';
  this.loggedInBehaviorSubject = new BehaviorSubject(this.loggedIn);
  this.loggedInBehaviorSubject.next(this.loggedIn);
}

 changeToLoggedIn(){
  console.log('Changing to logged in');
  this.loggedIn = true;
  localStorage.setItem(this.loggedInKey, 'true');
  this.loggedInBehaviorSubject.next(true);
 }

 changeToLoggedOut(){
  this.loggedIn = false;
  localStorage.setItem(this.loggedInKey, 'false');
  this.loggedInBehaviorSubject.next(false);
 }

 getLoggedInValue():Observable<boolean>{
  return this.loggedInBehaviorSubject.asObservable();
 }

 setRequiredScreens(reqScreens:any){
    this.requiredScreens = reqScreens;
 }

 getRequiredScreens():any[]{
  return this.requiredScreens;
 }


}