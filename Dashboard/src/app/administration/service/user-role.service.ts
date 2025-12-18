import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http:HttpClient) { }
  findAllUserRoles(){
    return this.http.get<any[]>(`${server}userroles`);    
  }
  findAllUsersForARole(roleId:string){
    return this.http.get<any[]>(`${server}userroles/role/${roleId}`);
  }
  findAllRolesForAUser(userId:string){
    return this.http.get<any[]>(`${server}userroles/user/${userId}`);
  }  
/*  createUserRole(userRole:UserRole){
    return this.http.post<UserRole>('http://15.207.82.218/api/userroles',userRole);
  }*/
  createUserRoles(postData:any){
    return this.http.post<any[]>(`${server}userroles/`,postData);
  }
  findOneUserRole(userId:string,roleId:string){
    return this.http.get<any>(`${server}roles/${userId}/${roleId}`);
  }
  updateRole(userId:string,roleId:string,userRole:any){
    return this.http.put<any>(`${server}roles/${userId}/${roleId}`,userRole);
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
  findAllUsersWithDetailsForARole(role_id:any){
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
