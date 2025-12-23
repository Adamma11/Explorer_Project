import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Branch } from '../model/branch';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }
  findAllBranches():Observable<Branch[]>{
    return this.http.get<Branch[]>(`${server}branches`);    
  }
  createBranch(branch:Branch){
    console.log(branch.address);
    return this.http.post<Branch>(`${server}branches`,branch);
  }
  findOneBranch(_id:string){
    return this.http.get<Branch>(`${server}branches/${_id}`);
  }
  updateBranch(_id:string,branch:Branch){
    return this.http.put<Branch>(`${server}branches/${_id}`,branch);
  }
  deleteBranch(_id:string){
    return this.http.delete(`${server}branches/${_id}`);
  }  
  getABranchForPin(pin:string){
    return this.http.get<any>(`${server}branches/getbranchforpin/${pin}`);
  }
}
