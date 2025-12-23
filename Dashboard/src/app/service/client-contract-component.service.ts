import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientContractComponent } from '../model/client-contract-component';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class ClientContractComponentService {

  constructor(private http:HttpClient) { }
  createForAClientContract(clientContractId:any,postData:any){
    return this.http.post<ClientContractComponent[]>(`${server}clientcontractcomponents/clientcontract/${clientContractId}`,postData);
  }
  findAllForAClientContract(clientContractId:string){
    return this.http.get<any[]>(`${server}clientcontractcomponents/clientcontract/${clientContractId}`);
  }
  findDetailsForAComponent(clientContractId:string,component_id:string){
    return this.http.get<any>(`${server}clientcontractcomponents/clientcontract/${clientContractId}/component/${component_id}`);
  }  
  findAllWithoutFileUploadForAClientContract(clientContractId:string){
    return this.http.get<any[]>(`${server}clientcontractcomponents/clientcontract/${clientContractId}/withoutfileupload`);
  }  
  deleteAllForAClientContract(clientContractId:string){
    return this.http.delete(`${server}clientcontractcomponents/clientcontract/${clientContractId}`);
  }  

}
