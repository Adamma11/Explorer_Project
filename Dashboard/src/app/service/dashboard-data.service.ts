import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { server } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private http:HttpClient) { }

  getClientDashboardCountData(){
    return this.http.get<any>(`${server}dashboardData/clientDashboardCount`);
  }

  getAnalystDashboardCountData(){
    return this.http.get<any>(`${server}dashboardData/analystDashboardCount`);
  }

  getTLDashboardCountData(){
    return this.http.get<any>(`${server}dashboardData/tlDashboardDataCount`);
  }

  getQcDashboardCountData(){
    return this.http.get<any>(`${server}dashboardData/qcDashboardDataCount`);
  }

  getInceptionDashboardData(){
    return this.http.get<any>(`${server}dashboardData/inceptionDashboardDataCount`);
  }
}