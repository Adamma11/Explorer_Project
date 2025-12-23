import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientContractProfile } from '../model/client-contract-profile';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class ClientContractProfileService {

  constructor(private http:HttpClient) { }
  createManyForAClientContract(clientContractId:string,postData:any){
    return this.http.post<ClientContractProfile[]>(`${server}clientcontractprofiles/clientcontract/${clientContractId}`,postData);
  }
  findAllForAClientContract(clientContractId:string){
    return this.http.get<ClientContractProfile[]>(`${server}clientcontractprofiles/clientcontract/${clientContractId}`);
  }
  findAllWithoutFileUploadForAClientContract(clientContractId:string){
    return this.http.get<ClientContractProfile[]>(`${server}clientcontractprofiles/clientcontract/${clientContractId}`);
  }  
  deleteAllForAClientContract(clientContractId:string){
    return this.http.delete(`${server}clientcontractprofiles/clientcontract/${clientContractId}`);
  }   
  getClientContractProfileDetailsForCde(profile:string){
    return this.http.get<any>(`${server}cdecase/getcdecaseprofiledetails/${profile}`);
  }
  getClientContractProfileDetails(profile:string){
    return this.http.get<any>(`${server}clientcontractprofiles/${profile}`);
  }  
}
