import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  findAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${server}users`);
  }
  createUser(user:User){
    return this.http.post<User>(`${server}users`,user);
  }
  findOneUser(_id:string){
    return this.http.get<User>(`${server}users/${_id}`);
  }
  findOneUsingEmailId(emailId:string){
    return this.http.get<User>(`${server}users/email/${emailId}`);
  }
  updateUser(_id:string,user:User){
    return this.http.put<User>(`${server}users/${_id}`,user);
  }
  deleteUser(_id:string){
    return this.http.delete(`${server}users/${_id}`);
  }
  getUserForPin(pin:string){
    return this.http.get<any>(`${server}users/getuserforpin/${pin}`);
  }
  getUsersForTheComponent(component_id:string){
    return this.http.get<any[]>(`${server}users/getusersforcomponent/${component_id}`);
  }
  getMyUserId(){
    return this.http.get<any>(`${server}users/getmyuserid/nouserid/nouserid`);
  }
  getCurrentUser(){
    return this.http.get<any>(`${server}users/getmyuserid/nouserid/nouserid`);
  }
  //  getAllUsersReportingToMeRecursively(){
  //   return this.http.get<any>(`${server}users/getmyuserid/blank/new/usersreportingtome`);
  // }
  getAllUsersReportingToMeRecursively(){
    return this.http.get<any>(`${server}users/myuserid/blank/new/usersreportingtome`);
  }
  uploadSignatureFile(userId:string,signatureFile:File){
    const formData = new FormData()
    console.log("")
    formData.append('signatureFile',signatureFile,signatureFile.name)
    formData.append('fileName',userId)
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}users/uploadsignature`,formData)
  }
  // findAllUsersReportingToMe(){
  //   return this.http.get<any[]>(`${server}/users/myuserid/blank/new/usersreportingtome`);
  // }
  findAllUsersReportingToMe(){
    return this.http.get<User[]>(`${server}users/myuserid/blank/new/usersreportingtome`);
  }
  ///21Aug2023
  SendFollowupEmail(body:any){
    return this.http.post<any>(`${server}cases/sendfollowupemail`,body);
  }
  ////
}
