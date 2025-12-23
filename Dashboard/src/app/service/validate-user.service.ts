import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserService {

  constructor(private http:HttpClient) { }
  validateUser(userPassword:any){
    return this.http.post<any>(`${server}passwordvalidate`,userPassword);
  }
  validateOtp(otpDetails:any){
    return this.http.post<any>(`${server}passwordvalidate/validateotp`,otpDetails);
  }  
  validateUserForChangePassword(userPassword:any){
    return this.http.post<any>(`${server}passwordvalidate/validateforchange`,userPassword);
  }
}
