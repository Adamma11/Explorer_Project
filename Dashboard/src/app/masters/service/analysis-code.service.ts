import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class AnalysisCodeService {

  constructor(
    private http:HttpClient
  ) { }
  create(analysisCodeData:any){
    return this.http.post<any>(`${server}analysiscodes`,analysisCodeData)
  }
  read(analysisType:any,_id:any){
    return this.http.get<any>(`${server}analysiscodes/${analysisType}/${_id}`)
  }
  readAll(analysisType:any){
    return this.http.get<any[]>(`${server}analysiscodes/${analysisType}`)
  }
  update(analysisType:any,_id:any,analysisCodeData:any){
    return this.http.put<any>(`${server}analysiscodes/${analysisType}/${_id}`,analysisCodeData)
  }
  delete(analsysiType:any,_id:any){
    return this.http.delete<any>(`${server}analysistypes/${analsysiType}/${_id}`)
  }
}
