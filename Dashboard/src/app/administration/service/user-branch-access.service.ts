import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UserBranchAccessService {

  constructor(
    private http:HttpClient
  ) { }
  createMany(userBranchAccessData:any){
    return this.http.post<any[]>(`${server}userbranchaccess`,userBranchAccessData);
  }
  findAllForAUser(_id:string){
    return this.http.get<any[]>(`${server}userbranchaccess/user/${_id}`);
  }
  deleteForAUser(_id:string){
    return this.http.delete<any>(`${server}userbranchaccess/user/${_id}`);
  }
}
