import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }
  fileUpload(formData:any,clientContractId:string):any{
    return this.http.post<any>(`${server}${clientContractId}`,formData,
    {reportProgress:true,observe:'events'});
  }
}
