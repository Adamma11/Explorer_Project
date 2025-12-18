import {server} from '../../config'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(
    private http:HttpClient
  ) { }
  create(emailTemplateData:any){
    return this.http.post<any>(`${server}emailtemplates`,emailTemplateData)
  }
  findOne(_id:any){
    return this.http.get<any>(`${server}emailtemplates/${_id}`)
  }
  findAll(){
    return this.http.get<any[]>(`${server}emailtemplates`)
  }
  findOneAndUpdate(_id:any,emailTemplateData:any){
    return this.http.put<any>(`${server}emailtemplates/${_id}`,emailTemplateData)
  }
  delete(_id:any){
    return this.http.delete<any>(`${server}emailtemplates/${_id}`)
  }
  // findOneTemplate(_id: string){
  //   return this.http.get<any>(`${server}emailtemplates/${_id}`)
  // }
}
