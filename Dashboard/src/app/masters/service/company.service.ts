import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  readAllForMe(){
    return this.http.get<any[]>(`${server}companies`);
  }

  findOneCompany(id:string){
    return this.http.get<any>(`${server}companies/${id}`);
  }

  createCompany(company:any){
    return this.http.post<any>(`${server}companies`,company);
  }

  update(id:string,company:any){
    return this.http.put<any>(`${server}companies/${id}`,company);
  }

  deleteCompany(name:string){
    return this.http.delete(`${server}companies/${name}`);
  }
  searchCompanyStartingFrom(searchString:string){
    return this.http.get<any>(`${server}companies/search/${searchString}`);
  }

  
}
