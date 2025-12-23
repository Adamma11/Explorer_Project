import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:HttpClient) { }

  getCaseHistory(case_id:any){
    return this.http.get<any>(`${server}casehistory/case/${case_id}`)
  }
  getCheckHistory(case_id:any,component_id:any,_id:any){
    return this.http.get<any>(`${server}casehistory/case/${case_id}/component/${component_id}/check/${_id}`)
  }
  getCaseHistoryWithoutComponent(case_id:any){
    return this.http.get<any>(`${server}casehistory/case_Id/${case_id}`)
  }

  getCheckFieldsHistory(case_id:any,_id:any,){
      return this.http.get<any>(`${server}checkhistorys/check-history/${case_id}/${_id}`)
  }
}
