import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  findAllRoles(){
    return this.http.get<Role[]>(`${server}roles`);    
  }
  createRole(role:Role){
    return this.http.post<Role>(`${server}roles`,role);
  }
  findOneRole(_id:string){
    return this.http.get<Role>(`${server}roles/${_id}`);
  }
  updateRole(_id:string,role:Role){
    return this.http.put<Role>(`${server}roles/${_id}`,role);
  }
  deleteRole(_id:string){
    return this.http.delete(`${server}roles/${_id}`);
  }  
}
