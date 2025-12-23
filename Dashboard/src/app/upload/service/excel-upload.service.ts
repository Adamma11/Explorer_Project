import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {
  constructor(private http:HttpClient) { }

  create(excelUpload:any){
    return this.http.post<any>(`${server}exceluploads`,excelUpload);
  }

  getForOneReferenceNumber(referenceNumber:any){
    return this.http.get<any>(`${server}exceluploads/${referenceNumber}`);
  }

  getAllReferenceNumbersWithStatusOpen(){
    return this.http.get<any[]>(`${server}exceluploads`);
  } 
  getEmploymentInfo(data:any)  {
    console.log();
    
    return this.http.post<any[]>(`${server}allcomponents/employmentInfo`,data)
  }
}
