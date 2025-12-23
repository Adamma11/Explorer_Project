import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class BatchFileUploadService {

  constructor(private http:HttpClient) { }
  uploadFile(batch:any,zipFile:any){
    const formData = new FormData();
    formData.append('batchZipFile',zipFile,zipFile.name);
    formData.append('client',batch.client);
    formData.append('subclient',batch.subclient);
    formData.append('batchDescription',batch.batchDescription);
    formData.append('numberOfCases',batch.numberOfCases.toString());
    

    console.log('file being uploaded ',zipFile);
    console.log('client is ',batch.client);

    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }    
    return this.http.post(`${server}batches`,formData,options);
  //  const req = new HttpRequest('POST',`${server}batches`,formData,options);
//    return this.http.request(req);

  }
  getAllBatchesForAClientAndSubclient(client_id:string,subclient_id:string){
    return this.http.get<any[]>(`${server}batches/client/${client_id}/subclient/${subclient_id}`);    
  }
  getAllBatchesForAListOfClientAndSubclients(){
    return this.http.get<any[]>(`${server}batches/clientssubclients`);    
  }  
  getBatchDetails(batchId:string){
    return this.http.get<any>(`${server}batches/${batchId}`);
  }
  readBatchFiles(batch_id:any){
    return this.http.get<any[]>(`${server}batches/readbatchfiles/${batch_id}`);
  }
  downloadBatchFile(_id:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}batches/downloadbatchfile/${_id}`,{observe:'response',responseType:'blob' as 'json'});
  }
  deleteCaseFile(_id:any,fileName:any){
    return this.http.delete<any>(`${server}batches/deletecasefile/${_id}/${fileName}`);
  }
}
