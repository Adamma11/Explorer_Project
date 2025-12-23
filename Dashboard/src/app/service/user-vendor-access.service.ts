import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserVendorAccess } from '../model/user-vendor-access';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserVendorAccessService {

  constructor(private http:HttpClient) { }
  create(postData:any){
    return this.http.post<UserVendorAccess[]>(`${server}uservendoraccess`,postData);
  }
  findAllVendorsForAUser(userId:string){
    return this.http.get<UserVendorAccess[]>(`${server}uservendoraccess/${userId}`);
  }
  deleteAllVendorsForAUser(userId:string){
    return this.http.delete(`${server}uservendoraccess/${userId}`);
  }
}
