import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSubclient } from '../model/user-subclient';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserSubclientAccessService {

  constructor(private http:HttpClient) { }
  createMany(postData:any){
    return this.http.post<UserSubclient[]>(`${server}usersubclientaccess`,postData);
  }
  findAllSubclientsForMe(){
    return this.http.get<any[]>(`${server}usersubclientaccess`);
  }
  findAllSubclientsForAUser(userId:string){
    return this.http.get<any[]>(`${server}usersubclientaccess/${userId}`);
  }
  findAllSubclientsForAUserUsingEmailId(userEmailId:string){
    return this.http.get<any[]>(`${server}usersubclientaccess/useremail/${userEmailId}`);
  }
  deleteAllSubclientsForAUser(userId:string){
    return this.http.delete(`${server}usersubclientaccess/${userId}`);
  }
}
