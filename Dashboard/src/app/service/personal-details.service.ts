import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDetails } from '../model/personal-details';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  constructor(
    private http:HttpClient
  ) { }
  create(personalDetails:PersonalDetails){
    return this.http.post<PersonalDetails>(`${server}personaldetails`,personalDetails);
  }
  update(_id:string,personalDetails:PersonalDetails){
    return this.http.put<PersonalDetails>(`${server}personaldetails/${_id}`,personalDetails);
  }
  find(){
    return this.http.get<PersonalDetails[]>(`${server}personaldetails`);
  }
  findForCde(accessToken:string){
    return this.http.get<PersonalDetails[]>(`${server}personaldetailsforcde?access_token=${accessToken}`);
  }  
}
