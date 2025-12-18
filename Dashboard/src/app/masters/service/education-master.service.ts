import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EductionMasterService {

  constructor(private http:HttpClient) { }

  readAllForMe(){
    return this.http.get<any[]>(`${server}educationmaster`);
  }

  create(educationMaster:any){
    return this.http.post<any>(`${server}educationmaster`,educationMaster);
  }
  update(_id:any,educationMaster:any){
    return this.http.put<any>(`${server}educationmaster/${_id}`,educationMaster);
  }  
  read(_id:any){
    return this.http.get<any>(`${server}educationmaster/${_id}`);
  }

  findAllBranches(){
    return this.http.get<any[]>(`${server}branches`);    
  }
}
