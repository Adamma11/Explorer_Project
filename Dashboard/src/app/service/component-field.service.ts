import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentField } from '../model/component-field';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class ComponentFieldService {

  constructor(private http:HttpClient) { }

  createAllFieldsForAComponent(_id:string,postData:any){
    return this.http.post<ComponentField[]>(`${server}componentfields/component/${_id}`,postData);
  }
  findAllFieldsForAComponent(_id:string){
    return this.http.get<ComponentField[]>(`${server}componentfields/component/${_id}`);
  }
  findAllFieldsForAComponentForExcelUpload(_id:string){
    return this.http.get<any[]>(`${server}componentfields/component/${_id}`);
  }  
  deleteAllFieldsForAComponent(_id:string){
    return this.http.delete(`${server}componentfields/component/${_id}`);
  }    
}
