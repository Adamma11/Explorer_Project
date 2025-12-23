import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { server } from './config';


@Injectable({
  providedIn: 'root'
})
export class AuthNewService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http:HttpClient,


  ) { }

  logIn(){
    this.loggedIn.next(true);
    this.router.navigate(['dashboard']);
  }

  logout(){
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  signout() {
    return this.http.post<any>(`${server}users/signout`, {});
  }
  // forget Password 

  forgotPassword(emailId: string):Observable<any>{
    return this.http.post(`${server}passwordvalidate/forgotPassword`, { userId: emailId });
  }
}
