import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class EducationCourierDetailsService {

  constructor(
    private http:HttpClient
  ) { }
  create(educationCourierDetailsData:any){
    return this.http.post<any>(`${server}courierdetailseducation`,educationCourierDetailsData);
  }
  readAllForAComponent(acase:any,componentName: any,componentId: any){
    return this.http.get<any[]>(`${server}courierdetailseducation/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  }  
}
