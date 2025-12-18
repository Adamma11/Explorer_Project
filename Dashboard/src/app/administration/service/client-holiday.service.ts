import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientHoliday } from '../model/client-holiday';
import {server} from '../../config'
@Injectable({
  providedIn: 'root'
})
export class ClientHolidayService {

  constructor(private http:HttpClient) { }
  findAllHolidaysForAYear(year:string){
    return this.http.get<ClientHoliday[]>(`${server}clientholidays/${year}`);
  }
  createClientHolidays(postData:any){
    return this.http.post<ClientHoliday[]>(`${server}clientholidays`,postData);
  }
  deleteClientHolidays(year:string){
    return this.http.delete(`${server}clientholidays/${year}`);
  }  
}
