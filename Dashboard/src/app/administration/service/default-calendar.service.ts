import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {server} from '../../config';
@Injectable({
  providedIn: 'root'
})
export class DefaultCalendarService {

  constructor(
    private http:HttpClient
  ) { }

  create(defaultCalendarDetails:any){
    return this.http.post<any>(`${server}defaultcalendar`,defaultCalendarDetails);
  }
  update(defaultCalendar_id:string,defaultCalendarDetails:any){
    return this.http.put<any>(`${server}defaultcalendar/${defaultCalendar_id}`,defaultCalendarDetails);
  }
  readAllForAnYear(year:any){
    return this.http.get<any[]>(`${server}defaultcalendar/${year}`)
  }
  delete(defaultCalendar_id:string){
    return this.http.delete<any>(`${server}defaultcalendar/${defaultCalendar_id}`);    
  }
}
