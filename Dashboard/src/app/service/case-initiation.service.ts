import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CaseInitiationService {

  constructor(private http:HttpClient) { 
     }

     ////Managment Level and Client Dashboard/////
    getLastSixMonthsCaseInitiationCount(clientId?:string,clientIds?:string[]):Observable<any>{
      let params = new HttpParams();
      if(clientId){
        params = params.append('clientId',clientId)
      }
      if(clientIds?.length){
        params = params.append('clientId',clientIds.join(","))
      }
      return this.http.get(`${server}caseInitiation/lastSixMonthsCaseInitiationData`,{params:params})
    }

    getDateWiseCaseInitiationData(monthYear:string,clientId?:string,clientIds?:string[]):Observable<any>{
  
      let params = new HttpParams();
      
      if(clientId){
        params= params.append('clientId', clientId);
      }
      if(clientIds?.length){
        params = params.append('clientId',clientIds.join(","))
      }
  
      return this.http.get(`${server}caseInitiation/dateWiseCaseInitiationData/${monthYear}`,{params:params})
  
    }
    getLastSixMonthsOutputQcCompletionCount(clientId?:string,clientIds?:string[]):Observable<any>{
      let params = new HttpParams();
      if(clientId){
        params = params.append('clientId',clientId)
      }
      if(clientIds?.length){
        params = params.append('clientId',clientIds.join(","))
      }
      return this.http.get(`${server}caseInitiation/lastSixMonthsOutputQcCompletionCount`,{params:params});
    }

    getDateWiseCaseOutputQcCompletionCount(monthYear:string,clientId?:string,clientIds?:string[]):Observable<any>{
      let params = new HttpParams();
      if(clientId){
        params = params.append('clientId',clientId)
      }
      if(clientIds?.length){
        params = params.append('clientId',clientIds.join(","))
      }
      return this.http.get(`${server}caseInitiation/dateWiseOutputQcCompletionCount/${monthYear}`,{params:params})
  
    }

    getTotalActualComponentsCountForLastSixMonths(clientId?:string,clientIds?:string[]):Observable<any>{
      let params = new HttpParams();
      if(clientId){
        params = params.append('clientId',clientId)
      }
      if(clientIds?.length){
        params = params.append('clientId',clientIds.join(","))
      }
      return this.http.get(`${server}caseInitiation/totalActualComponentsCountForLastSixMonths`,{params:params})
    }
        ////Managment Level and Client Dashboard/////


        ///added code sep-28//

getMonthlyCaseInitiationTotal(monthYear: string, clientId?: string, clientIds?: string[]): Observable<any> {
  let params = new HttpParams();
  if (clientId) {
    params = params.append('clientId', clientId);
  }
  if (clientIds?.length) {
    params = params.append('clientId', clientIds.join(","));
  }

  return this.http.get(`${server}caseInitiation/monthlyCaseInitiationTotal/${monthYear}`, { params });
}
getTotalCaseInitiationCount(clientId?: string, clientIds?: string[]): Observable<any> {
  let params = new HttpParams();
  if (clientId) {
    params = params.append('clientId', clientId);
  }
  if (clientIds?.length) {
    params = params.append('clientId', clientIds.join(","));
  }

  return this.http.get(`${server}caseInitiation/totalCaseInitiationCount`, { params });
}

//////

}