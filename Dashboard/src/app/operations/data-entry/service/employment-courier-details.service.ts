import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class EmploymentCourierDetailsService {

  constructor(
    private http:HttpClient
  ) { }

  create(employmentCourierDetailsData:any){
    return this.http.post<any>(`${server}courierdetailsemployment`,employmentCourierDetailsData);
  }
  readAllForAComponent(acase:any,componentName:any,componentId:any){
    return this.http.get<any[]>(`${server}courierdetailsemployment/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  } 
}
