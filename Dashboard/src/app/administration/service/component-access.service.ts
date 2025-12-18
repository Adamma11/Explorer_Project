import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class ComponentAccessService {

  constructor(private http:HttpClient) { }
  updateForARole(roleId: any,componentAccessData:any){
    console.log('in component access service updateForARole');
    return this.http.put<any[]>(`${server}componentaccesses/${roleId}`,componentAccessData);
  }
  readAllForARole(roleId:any){
    return this.http.get<any[]>(`${server}componentaccesses/readallforarole/${roleId}`);
  }
  readAllForAUser(){
    return this.http.get<any>(`${server}componentaccesses/readallforauser`);
  }  

  readAllForAUserWithClient(){
    return this.http.get<any>(`${server}componentaccesses/readallclientcomponentsforauser`);
  }  
  
  readAllComponents(){
    return this.http.get<any[]>(`${server}componentaccesses/readallcomponents`);
  }
}
