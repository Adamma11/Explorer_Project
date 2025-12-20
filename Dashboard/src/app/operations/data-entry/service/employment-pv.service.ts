import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class EmploymentPvService {

  constructor(
    private http:HttpClient
  ) { }
  create(pvEmploymentData: any){
    return this.http.post<any>(`${server}pvemployment`,pvEmploymentData);
  }
  updateFeVerificationStatus(_id: any,pvEmploymentData: any){
    return this.http.put<any>(`${server}pvemployment/updatefeverificationstatus/${_id}`,pvEmploymentData);
  }
  updateAnalystVerificationStatus(_id: any,pvEmploymentData: any){
    return this.http.put<any>(`${server}pvemployment/updateanalystverificationstatus/${_id}`,pvEmploymentData);
  }  
  readAllForAComponent(acase: any,componentName: any,componentId: any){
    return this.http.get<any[]>(`${server}pvemployment/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  }
  readAllFor(userType: any){
    return this.http.get<any[]>(`${server}pvemployment/readallfor/${userType}`);
  }
  read(_id: any){
    return this.http.get<any>(`${server}pvemployment/${_id}`);
  }
}
