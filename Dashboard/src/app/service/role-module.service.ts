import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleModule } from '../model/role-module';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class RoleModuleService {

 
  constructor(private http:HttpClient) { }
  findAllModulesForARole(roleId:string){
    return this.http.get<RoleModule[]>(`${server}rolemoduleaccess/role/${roleId}`);
  }
  deleteAllModulesForARole(roleId:string){
    return this.http.delete(`${server}rolemoduleaccess/role/${roleId}`);
  }
  create(postData:any){
    return this.http.post<RoleModule[]>(`${server}rolemoduleaccess`,postData);
  }  
}
