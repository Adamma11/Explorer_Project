import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationComponent } from '../model/component';
import { server } from '../config'
@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http:HttpClient) { }
  findAllComponents(){
    return this.http.get<ApplicationComponent[]>(`${server}components`);    
  }
  findAComponent(_id:string){
    return this.http.get<ApplicationComponent>(`${server}components/${_id}`);
  }
  findAComponentForCde(_id:string,accessToken:string){
    return this.http.get<ApplicationComponent>(`${server}componentsforcde/${_id}?access_token=${accessToken}`);
  }  
  createComponent(component:ApplicationComponent){
    return this.http.post<ApplicationComponent>(`${server}components`,component);
  }
  updateComponent(_id:string,component:ApplicationComponent){
    return this.http.put<ApplicationComponent>(`${server}components/${_id}`,component);
  }  
  deleteComponent(_id:string){
    return this.http.delete(`${server}components/${_id}`);
  }
}
