import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientContractPackage } from '../model/client-contract-package';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class ClientContractPackageService {

  constructor(private http:HttpClient) { }
  createManyForAClientContract(clientContractId:string,postData:any){
    return this.http.post<ClientContractPackage[]>(`${server}clientcontractpackages/clientcontract/${clientContractId}`,postData);
  }
  findOne(_id:string){
    return this.http.get<any>(`${server}clientcontractpackages/${_id}`);
  }
  findAllForAClientContract(clientContractId:string){
    return this.http.get<ClientContractPackage[]>(`${server}clientcontractpackages/clientcontract/${clientContractId}`);
  }
  findAllWithoutFileUpoadForAClientContract(clientContractId:string){
    return this.http.get<ClientContractPackage[]>(`${server}clientcontractpackages/clientcontract/${clientContractId}/withoutfileupload`);
  }
  deleteAllForAClientContract(clientContractId:string){
    return this.http.delete(`${server}clientcontractpackages/clientcontract/${clientContractId}`);
  }  
}
