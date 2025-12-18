import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(private http:HttpClient) { }

  create(personalDetails:any){
    return this.http.post<any>(`${server}personaldetails`,personalDetails);
  }
  update(_id:string,personalDetails:any){
    return this.http.put<any>(`${server}personaldetails/${_id}`,personalDetails);
  }
  find(){
    return this.http.get<any[]>(`${server}personaldetails`);
  }
  findForCde(accessToken:any){
    return this.http.get<any[]>(`${server}personaldetailsforcde?access_token=${accessToken}`);
  } 
}
