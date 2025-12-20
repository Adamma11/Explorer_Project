import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class EducationRequestForPaymentService {

  constructor(
    private http:HttpClient    
  ) { }
  create(requestForPaymentEducationData:any){
    return this.http.post<any>(`${server}requestforpaymenteducation`,requestForPaymentEducationData);
  }
  updatePaymentReferenceNumber(_id:any,requestForPaymentEducationData:any){
    return this.http.put<any>(`${server}requestforpaymenteducation/${_id}`,requestForPaymentEducationData);
  }
  read(_id:any){
    return this.http.get<any>(`${server}requestforpaymenteducation/component/${_id}`);
  }
  readAllForAComponent(acase:any,componentName:any,componentId:any){
    return this.http.get<any[]>(`${server}requestforpaymenteducation/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  }
  readAllWithStatus(status:any){
    return this.http.get<any[]>(`${server}requestforpaymenteducation/readallwithstatus/${status}`);
  }
}
