import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class EmploymentRequestForPaymentService {

  constructor(
    private http:HttpClient
  ) { }

  create(requestForPaymentEmploymentData:any){
    return this.http.post<any>(`${server}requestforpaymentemployment`,requestForPaymentEmploymentData);
  }
  updatePaymentReferenceNumber(_id:any,requestForPaymentEmploymentData:any){
    return this.http.put<any>(`${server}requestforpaymentemployment/${_id}`,requestForPaymentEmploymentData);
  }
  read(_id:any){
    return this.http.get<any>(`${server}requestforpaymentemployment/component/${_id}`);
  }
  readAllForAComponent(acase:any,componentName:any,componentId:any){
    return this.http.get<any[]>(`${server}requestforpaymentemployment/case/${acase}/componentname/${componentName}/componentid/${componentId}`);
  }
  readAllWithStatus(status:any){
    return this.http.get<any[]>(`${server}requestforpaymentemployment/readallwithstatus/${status}`);
  }  
}
