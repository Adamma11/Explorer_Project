import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientContractProfileService {

  constructor(private http:HttpClient) { }

  getClientContractProfileDetails(profile:any){
    return this.http.get<any>(`${server}clientcontractprofiles/${profile}`);
  } 

  findAllForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractprofiles/clientcontract/${clientContractId}`);
  }

  findAllWithoutFileUploadForAClientContract(clientContractId:any){
    return this.http.get<any[]>(`${server}clientcontractprofiles/clientcontract/${clientContractId}`);
  } 
}
