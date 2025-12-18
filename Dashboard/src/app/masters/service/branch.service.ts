import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http:HttpClient
  ) { }

  findAllBranches(){
    return this.http.get<any>(`${server}branches`);    
  }

  createBranch(branch:any){
    console.log(branch.address);
    return this.http.post<any>(`${server}branches`,branch);
  }

  findOneBranch(_id:string){
    return this.http.get<any>(`${server}branches/${_id}`);
  }

  updateBranch(_id:string,branch:any){
    return this.http.put<any>(`${server}branches/${_id}`,branch);
  }

  deleteBranch(_id:string){
    return this.http.delete(`${server}branches/${_id}`);
  }  

  getABranchForPin(pin:string){
    return this.http.get<any>(`${server}branches/getbranchforpin/${pin}`);
  }

}
