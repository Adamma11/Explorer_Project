import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http:HttpClient) { }
  findAllClients(){
    return this.http.get<any[]>(`${server}clients`);
  }
  findAClient(_id:string){
    return this.http.get<any>(`${server}clients/${_id}`)
  }
  createClient(client:any){
    console.log('about to create client');
    return this.http.post<any>(`${server}clients`,client);
  }
  updateClient(_id:string,client:any){
    return this.http.put<any>(`${server}clients/${_id}`,client);
  }
  deleteClient(_id:string){
    return this.http.delete(`${server}clients/${_id}`);
  }
  // exportToExcel(){
  //   return this.http.get(`${reportsServer}clients/exporttoexcel`)
  // }
  // writeClientDetails(){
  //   return this.http.get(`${localreportsServer}reports/writeclientdetails`,{observe:'response',responseType:'blob' as 'json'})
  // }
}
