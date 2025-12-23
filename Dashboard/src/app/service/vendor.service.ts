import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../model/vendor';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }
  createVendor(vendor:Vendor){
    return this.http.post<Vendor>(`${server}vendors`,vendor);
  }
  findAllVendors(){
    return this.http.get<Vendor[]>(`${server}vendors`);
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
  findAllVendorsForOtherComponent(component_id:string){
    return this.http.get<any[]>(`${server}vendors/othercomponent/${component_id}`);
  }    
  findAVendor(_id:string){
    return this.http.get<Vendor>(`${server}vendors/${_id}`);
  }
  updateAVendor(_id:string,vendor:Vendor){
    return this.http.put<Vendor>(`${server}vendors/${_id}`,vendor);
  }
  deleteVendor(_id:string){
    return this.http.delete(`${server}vendors/${_id}`);
  }  
}
