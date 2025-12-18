import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class StandardVerbiageService {

  constructor(
    private http:HttpClient
  ) { }

  create(standardVerbiageData:any){
    return this.http.post<any>(`${server}standardVerbiage`,standardVerbiageData)
  }
  findOne(_id:any){
    return this.http.get<any>(`${server}standardVerbiage/${_id}`)
  }
  findAll(){
    return this.http.get<any[]>(`${server}standardVerbiage`)
  }
  findOneAndUpdate(_id:any,standardVerbiageData:any){
    return this.http.put<any>(`${server}standardVerbiage/${_id}`,standardVerbiageData)
  }
  delete(_id:any){
    return this.http.delete<any>(`${server}standardVerbiage/${_id}`)
  }
}
