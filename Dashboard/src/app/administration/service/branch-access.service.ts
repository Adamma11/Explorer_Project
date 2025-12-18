import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class BranchAccessService {

  constructor(
    private http:HttpClient
  ) { }

  updateForARole(roleId:string,branchAccessData:any){
    return this.http.put<any[]>(`${server}branchaccesses/${roleId}`,branchAccessData);
  }
  readAllForARole(roleId:string){
    return this.http.get<any[]>(`${server}branchaccesses/${roleId}`);
  }  
}
