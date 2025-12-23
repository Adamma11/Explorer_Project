import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  constructor(
    private http:HttpClient
  ) { }
  createPassword(passwordData:any){
    return this.http.post<any>(`${server}passwordcreate`,passwordData)
  }
  createPasswordForchange(passwordData:any){
    return this.http.post<any>(`${server}passwordcreate/createforpasswordchange`,passwordData)
  }
  createCdeUserPassword(passwordData:any){
    return this.http.post<any>(`${server}passwordcreate/cdepasswordcreate`,passwordData)
  }
  createCdeUserPasswordForRejection(passwordData:any){
    return this.http.post<any>(`${server}passwordcreate/cderjectionpassword`,passwordData)
  }  
}
