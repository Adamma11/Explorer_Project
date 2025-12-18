import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientContractService {

  constructor(private http:HttpClient) { }

  findAllForAClient(clientId:string){
    return this.http.get<any>(`${server}clientcontracts/client/${clientId}`);
  }
  findContractDetails(clientContractId:string){
    return this.http.get<any>(`${server}clientcontracts/${clientContractId}`);
  }
  createContract(clientContract:any){
    return this.http.post<any>(`${server}clientcontracts`,clientContract);
  }
  updateContract(_id:string,clientContract:any){
    return this.http.put<any>(`${server}clientcontracts/${_id}`,clientContract);
  }
  deleteContract(_id:string){
    return this.http.delete(`${server}clientcontracts/${_id}`);
  }  

  uploadFile(_id:string,file:any,fileName:any){
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
  readFileNames(_id:string){
    return this.http.get<any[]>(`${server}clientcontracts/readfilenames/${_id}`);
  }  
  getRelevantCrientContract(client_id:string,date:any){
    return this.http.get<any>(`${server}clientcontracts/client/${client_id}/relevantdate/${date}`);
  }
  getScopeofworkRelevantCrientContract(client_id:string){
    return this.http.get<any>(`${server}clientcontracts/client/${client_id}/scopeofwork`);
  }
  downloadFile(_id:string,fileName:any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/${_id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/?_id=${_id}&&fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadSowFile(_id:string){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}clientcontracts/downloadfile/${_id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}clientcontracts/downloadsowfile/${_id}`,{observe:'response',responseType:'blob' as 'json'});
  }
}
