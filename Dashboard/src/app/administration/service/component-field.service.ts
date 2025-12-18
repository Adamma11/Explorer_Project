import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentFieldService {

  constructor(private http:HttpClient) { }

  findAllFieldsForAComponent(_id:string){
    return this.http.get<any[]>(`${server}componentfields/component/${_id}`);
  }

  findAllFieldsForAComponentForExcelUpload(_id:string){
    return this.http.get<any[]>(`${server}componentfields/component/${_id}`);
  }  
}
