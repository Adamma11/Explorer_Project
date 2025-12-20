import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class EducationPvService {


  constructor(
    private http:HttpClient
  ) { }
  create(pvEducationData: any){
    return this.http.post<any>(`${server}pveducation`,pvEducationData);
  }
  updateFeVerificationStatus(_id: any,pvEducationData: any){
    return this.http.put<any>(`${server}pveducation/updatefeverificationstatus/${_id}`,pvEducationData);
  }
  updateAnalystVerificationStatus(_id: any,pvEducationData: any){
    return this.http.put<any>(`${server}pveducation/updateanalystverificationstatus/${_id}`,pvEducationData);
  }  
  readAllForAComponent(acase: any,componentName: any,componentId: any){
    return this.http.get<any[]>(`${server}pveducation/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  }
  readAllFor(userType: any){
    return this.http.get<any[]>(`${server}pveducation/readallfor/${userType}`);
  }
  read(_id: any){
    return this.http.get<any>(`${server}pveducation/${_id}`);
  }
}
