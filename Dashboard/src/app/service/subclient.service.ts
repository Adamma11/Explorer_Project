import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subclient } from '../model/subclient';
import { server } from '../config'
@Injectable({
  providedIn: 'root'
})
export class SubclientService {

  constructor(private http:HttpClient) { }

  create(subclient:any):Observable<Subclient>{
    return this.http.post<Subclient>(`${server}subclients`,subclient);
  }
  findOne(_id:any):Observable<Subclient>{
    return this.http.get<Subclient>(`${server}subclients/${_id}`);
  }
  findAllForAClient(clientId:any){
    return this.http.get<Subclient[]>(`${server}subclients/client/${clientId}`);
  }
  findAll(){
    return this.http.get<any[]>(`${server}subclients`);
  }
  findAllForBranches(){
    return this.http.get<any[]>(`${server}subclients/branches`);
  }  
  update(_id:any,subclient:any):Observable<Subclient>{
    return this.http.put<Subclient>(`${server}subclients/${_id}`,subclient);
  }
  delete(_id:any){
    return this.http.delete(`${server}subclients/${_id}`);
  }  
  findAllForTheUser(){
    return this.http.get<any[]>(`${server}subclients/findforuser`)
  }
}
