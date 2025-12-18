import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmploymentMasterService {

  constructor(private http:HttpClient) { }

  create(employmentMaster:any){
    return this.http.post<any>(`${server}employmentmaster`,employmentMaster);
  }
  update(_id:string,employmentMaster:any){
    return this.http.put<any>(`${server}employmentmaster/${_id}`,employmentMaster);
  }  
  readAll(){
    return this.http.get<any[]>(`${server}employmentmaster`);
  }

  read(_id:string){
    return this.http.get<any>(`${server}employmentmaster/${_id}`);
  }

  findAllBranches(){
    return this.http.get<any[]>(`${server}branches`);    
  }
}
