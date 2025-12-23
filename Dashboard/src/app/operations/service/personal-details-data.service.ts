import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsDataService {

  constructor(private http:HttpClient) { }

  create(personalDetailsData:any){
    return this.http.post<any>(`${server}personaldetailsdata`,personalDetailsData);
  }

  read(personalDetailsId:any){
    return this.http.get<any>(`${server}personaldetailsdata/${personalDetailsId}`);
  }

  updateInputqcStatus(caseId:any,personalDetailsData:any){
    return this.http.put<any>(`${server}personaldetailsdata/updateinputqcstatus/${caseId}`,personalDetailsData);
  } 
}
