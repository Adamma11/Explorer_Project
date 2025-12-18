import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'  
})
export class ComponentService {

 
  constructor(private http:HttpClient) { }
  findAllComponents(){
    return this.http.get<any[]>(`${server}components`);    
  }
  findAComponent(_id:string){
    return this.http.get<any>(`${server}components/${_id}`);
  }
  findAComponentForCde(_id:string,accessToken: any){
    return this.http.get<any>(`${server}componentsforcde/${_id}?access_token=${accessToken}`);
  }  
  createComponent(component:any){
    return this.http.post<any>(`${server}components`,component);
  }
  updateComponent(_id:string,component:any){
    return this.http.put<any>(`${server}components/${_id}`,component);
  }  
  deleteComponent(_id:string){
    return this.http.delete(`${server}components/${_id}`);
  }
  findAllComponentDataforACase(_id: string){
    return this.http.get<[]>(`${server}allcomponents/allComponentDataforACase/${_id}`);
  }
}
