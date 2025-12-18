import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }
  createVendor(vendor:any){
    return this.http.post<any>(`${server}vendors`,vendor);
  }
  findAllVendors(){
    return this.http.get<any[]>(`${server}vendors`);
  }
  findAllVendorsForAddressComponent(){
    return this.http.get<any[]>(`${server}vendors/addresscomponent`);
  }
  findAllVendorsForEducationComponent(){
    return this.http.get<any[]>(`${server}vendors/educationcomponent`);
  }  
  findAllVendorsForEmploymentComponent(){
    return this.http.get<any[]>(`${server}vendors/employmentcomponent`);
  }    
  findAllVendorsForOtherComponent(component_id:any){
    return this.http.get<any[]>(`${server}vendors/othercomponent/${component_id}`);
  }    
  findAVendor(_id:string){
    return this.http.get<any>(`${server}vendors/${_id}`);
  }
  updateAVendor(_id:string,vendor:any){
    return this.http.put<any>(`${server}vendors/${_id}`,vendor);
  }
  deleteVendor(_id:string){
    return this.http.delete(`${server}vendors/${_id}`);
  }  
}
