import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientContractPackageService {

  constructor(private http:HttpClient) { }

  findOne(_id:any){
    return this.http.get<any>(`${server}clientcontractpackages/${_id}`);
  }

  findAllForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractpackages/clientcontract/${clientContractId}`);
  }

  findAllWithoutFileUpoadForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractpackages/clientcontract/${clientContractId}`);
  }
}
