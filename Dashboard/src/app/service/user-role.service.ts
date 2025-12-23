import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../model/user-role';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http:HttpClient) { }
  findAllUserRoles(){
    return this.http.get<UserRole[]>(`${server}userroles`);    
  }
  findAllUsersForARole(roleId:string){
    return this.http.get<UserRole[]>(`${server}userroles/role/${roleId}`);
  }
  findAllRolesForAUser(userId:string){
    return this.http.get<UserRole[]>(`${server}userroles/user/${userId}`);
  }  
  createUserRoles(postData:any){
    return this.http.post<UserRole[]>(`${server}userroles/`,postData);
  }
  findOneUserRole(userId:string,roleId:string){
    return this.http.get<UserRole>(`${server}roles/${userId}/${roleId}`);
  }
  updateRole(userId:string,roleId:string,userRole:UserRole){
    return this.http.put<UserRole>(`${server}roles/${userId}/${roleId}`,userRole);
  }
  deleteRole(userId:string,roleId:string){
    return this.http.delete(`${server}roles/${userId}/${roleId}`);
  }
  deleteUsersForARole(roleId:string){
    return this.http.delete(`${server}userroles/role/${roleId}`);
  }
  deleteRolesForAUser(userId:string){
    return this.http.delete(`${server}userroles/user/${userId}`);
  }  
  findAllUsersWithDetailsForARole(role_id:string){
    return this.http.get<any[]>(`${server}userroles/alluserswithdetailsforrole/${role_id}`)
  }
    //address Roles
    findAllUsersWithDetailsForARoleAddress(roleIds:any){
      return this.http.get<any[]>(`${server}userroles/alluserswithdetailsforroleaddress/${roleIds}`)
    }
    //
  findallRolesForCurrentUser(){
    return this.http.get<any[]>(`${server}userroles/rolesforcurrentuser`)
  }
}
