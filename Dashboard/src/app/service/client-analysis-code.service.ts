import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from '../config'
@Injectable({
  providedIn: 'root'
})
export class ClientAnalysisCodeService {

  constructor(
    private http:HttpClient
  ) { }
  create(clientAnalysisCodeData:any){
    return this.http.post<any>(`${server}clientanalysiscodes`,clientAnalysisCodeData)
  }
  deleteAllForClient(client:any){
    return this.http.delete<any>(`${server}clientanalysiscodes/deleteallforclient/${client}`)
  }
  readAllForAClientAndType(client:any,analysisType:any){
    return this.http.get<any>(`${server}clientanalysiscodes/${client}/${analysisType}`)
  }
  
  // sendEmail(client){
  //   return this.http.get<Client>(`${server}sendExpiryEmail`);
  //   return this.http.get<any>(`${server}clientanalysiscodes/sendExpiryEmail/${client}`);
  // }
}
