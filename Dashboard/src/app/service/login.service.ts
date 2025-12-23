import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient
  ) { }

  // login():Observable<any>{
  //   return this.http.post(``,data);vcfe3x
  // }
  validateUser(userPassword:any){
    return this.http.post<any>(`${server}passwordvalidate`,userPassword);
  }
  validateOtp(otpDetails:any){
    return this.http.post<any>(`${server}passwordvalidate/validateotp`,otpDetails);
  }  
  validateUserForChangePassword(userPassword:any){
    return this.http.post<any>(`${server}passwordvalidate/validateforchange`,userPassword);
  }
  getCurrentUser(){
    return this.http.get<any>(`${server}users/getmyuserid/nouserid/nouserid`);
  }
}
