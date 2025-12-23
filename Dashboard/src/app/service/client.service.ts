import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import {reportsServer, server,localreportsServer} from '../config'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  findAllClients(){
    return this.http.get<Client[]>(`${server}clients`);
  }
  findAClient(_id:string):Observable<Client>{
    return this.http.get<Client>(`${server}clients/${_id}`)
  }
  createClient(client:Client){
    console.log('about to create client');
    return this.http.post<Client>(`${server}clients`,client);
  }
  updateClient(_id:string,client:Client){
    return this.http.put<Client>(`${server}clients/${_id}`,client);
  }
  deleteClient(_id:string){
    return this.http.delete(`${server}clients/${_id}`);
  }
  exportToExcel(){
    return this.http.get(`${reportsServer}clients/exporttoexcel`)
  }
  writeClientDetails(){
    return this.http.get(`${localreportsServer}reports/writeclientdetails`,{observe:'response',responseType:'blob' as 'json'})
  }
}
