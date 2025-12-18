import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientContractComponentService {

  constructor(private http:HttpClient) { }
  createForAClientContract(clientContractId:any,postData:any){
    return this.http.post<any>(`${server}clientcontractcomponents/clientcontract/${clientContractId}`,postData);
  }
  findAllForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractcomponents/clientcontract/${clientContractId}`);
  }
  findDetailsForAComponent(clientContractId:any,component_id:any){
    return this.http.get<any>(`${server}clientcontractcomponents/clientcontract/${clientContractId}/component/${component_id}`);
  }  
  findAllWithoutFileUploadForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractcomponents/clientcontract/${clientContractId}/withoutfileupload`);
  }  
  deleteAllForAClientContract(clientContractId:any){
    return this.http.delete(`${server}clientcontractcomponents/clientcontract/${clientContractId}`);
  } 
}
