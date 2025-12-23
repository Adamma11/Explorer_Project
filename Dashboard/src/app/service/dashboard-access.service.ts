import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../config';
@Injectable({
  providedIn: 'root'
})
export class DashboardAccessService {

  constructor(
    private http:HttpClient
  ) { }
  readForARole(role_id:string){
    return this.http.get<any[]>(`${server}dashboardaccesses/role/${role_id}`)
  }
  createMany(dashboardAccessData:any){
    return this.http.post<any[]>(`${server}dashboardaccesses`,dashboardAccessData)
  }
  deleteForARole(role_id:string){
    return this.http.delete<any[]>(`${server}dashboardaccesses/role/${role_id}`)
  }
  readAllForCurrentUser(){
    return this.http.get<any[]>(`${server}dashboardaccesses/user`)
  }
  getUpcomingHoliday(){
    return this.http.get<any[]>(`${server}defaultcalendar/upcomingHoliday`)
  }

}
