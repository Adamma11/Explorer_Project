import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientContract } from '../model/client-contract';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class ClientContractService {

  constructor(private http:HttpClient) { }
  findAllForAClient(clientId:string){
    return this.http.get<ClientContract[]>(`${server}clientcontracts/client/${clientId}`);
  }
  findContractDetails(clientContractId:string){
    return this.http.get<ClientContract>(`${server}clientcontracts/${clientContractId}`);
  }
  createContract(clientContract:ClientContract){
    return this.http.post<ClientContract>(`${server}clientcontracts`,clientContract);
  }
  updateContract(_id:string,clientContract:ClientContract){
    return this.http.put<ClientContract>(`${server}clientcontracts/${_id}`,clientContract);
  }
  deleteContract(_id:string){
    return this.http.delete(`${server}clientcontracts/${_id}`);
  }  

  uploadFile(_id:any,file:any,fileName:any){
    const formData = new FormData();

    formData.append('contractFile',file,file.name);
    formData.append('fileName',fileName);
    formData.append("_id",_id);
        
//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }        
    return this.http.post<any>(`${server}clientcontracts/uploadfile`,formData)
  }
  readFileNames(_id:any){
    return this.http.get<any[]>(`${server}clientcontracts/readfilenames/${_id}`);
  }  
  getRelevantCrientContract(client_id:any,date:any){
    return this.http.get<any>(`${server}clientcontracts/client/${client_id}/relevantdate/${date}`);
  }
  getScopeofworkRelevantCrientContract(client_id:any){
    return this.http.get<any>(`${server}clientcontracts/client/${client_id}/scopeofwork`);
  }
  downloadFile(_id:any,fileName:any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/${_id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/?_id=${_id}&&fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadSowFile(_id:any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/${_id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}clientcontracts/downloadsowfile/${_id}`,{observe:'response',responseType:'blob' as 'json'});
  }
}
