import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AnalysisTypeService {

  constructor(
    private http:HttpClient
  ) { }

  create(analysisTypeData:any){
    return this.http.post<any>(`${server}analysistypes`,analysisTypeData)
  }
  read(_id:any){
    return this.http.get<any>(`${server}analysistypes/${_id}`)
  }
  readAll(){
    return this.http.get<any[]>(`${server}analysistypes`)
  }
  update(_id:any,analysisTypeData:any){
    return this.http.put<any>(`${server}analysistypes/${_id}`,analysisTypeData)
  }
  delete(_id:any){
    return this.http.delete<any>(`${server}analysistypes/${_id}`)
  }
}
