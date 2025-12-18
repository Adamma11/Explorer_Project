import {server} from '../../config'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SubclientService {

  constructor(private http:HttpClient) { }

  create(subclient: any){
    return this.http.post<any>(`${server}subclients`,subclient);
  }
  findOne(_id: any){
    return this.http.get<any>(`${server}subclients/${_id}`);
  }
  findAllForAClient(clientId: any){
    return this.http.get<any[]>(`${server}subclients/client/${clientId}`);
  }
  findAll(){
    return this.http.get<any[]>(`${server}subclients`);
  }
  findAllForBranches(){
    return this.http.get<any[]>(`${server}subclients/branches`);
  }  
  update(_id: any,subclient: any){
    return this.http.put<any>(`${server}subclients/${_id}`,subclient);
  }
  delete(_id: any){
    return this.http.delete(`${server}subclients/${_id}`);
  }  
  findAllForTheUser(){
    return this.http.get<any[]>(`${server}subclients/findforuser`)
  }
}
