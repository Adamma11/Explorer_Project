import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {server} from '../config';
@Injectable({
  providedIn: 'root'
})
export class ComponentAccessService {

  constructor(private http:HttpClient) { }
  updateForARole(roleId:string,componentAccessData:any){
    console.log('in component access service updateForARole');
    return this.http.put<any[]>(`${server}componentaccesses/${roleId}`,componentAccessData);
  }
  readAllForARole(roleId:string){
    return this.http.get<any[]>(`${server}componentaccesses/readallforarole/${roleId}`);
  }
  readAllForAUser(){
    return this.http.get<any[]>(`${server}componentaccesses/readallforauser`);
  }  
  readAllComponents(){
    return this.http.get<any[]>(`${server}componentaccesses/readallcomponents`);
  }
}
