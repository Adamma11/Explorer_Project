import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {server} from '../config';
import {EmailTemplate} from "src/app/model/email-template";
@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {

  constructor(
    private http:HttpClient
  ) { }
  // create(emailTemplateData){
  //   return this.http.post<any>(`${server}emailtemplates`,emailTemplateData)
  // }
  // findOne(_id:string){
  //   return this.http.get<any>(`${server}emailtemplates/${_id}`)
  // }
  findAll():Observable<EmailTemplate[]>{
    return this.http.get<EmailTemplate[]>(`${server}emailtemplates`)
  }
  // findOneAndUpdate(_id:string,emailTemplateData){
  //   return this.http.put<any>(`${server}emailtemplates/${_id}`,emailTemplateData)
  // }
  // delete(_id:string){
  //   return this.http.delete<any>(`${server}emailtemplates/${_id}`)
  // }
}
