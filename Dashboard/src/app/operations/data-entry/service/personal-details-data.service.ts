import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsDataService {
  constructor(private http:HttpClient) { }
  create(personalDetailsData:any){
    return this.http.post<any>(`${server}personaldetailsdata`,personalDetailsData);
  }
  update(personalDetailsId: any,personalDetailsData: any){
    return this.http.put<any>(`${server}personaldetailsdata/${personalDetailsId}`,personalDetailsData);
  }
  updateDataEntryStatus(caseId: any,personalDetailsData: any){
    return this.http.put<any>(`${server}personaldetailsdata/updatedataentrystatus/${caseId}`,personalDetailsData);
  }
  updateInputqcStatus(caseId: any,personalDetailsData: any){
    return this.http.put<any>(`${server}personaldetailsdata/updateinputqcstatus/${caseId}`,personalDetailsData);
  }  
  read(personalDetailsId: any){
    return this.http.get<any>(`${server}personaldetailsdata/${personalDetailsId}`);
  }
  readForCde(personalDetailsId: any,accessToken: any){
    return this.http.get<any>(`${server}personaldetailsdataforcde/${personalDetailsId}?access_token=${accessToken}`);
  }  
  createForCde(personalDetailsData:any,accessToken: any){
    return this.http.post<any>(`${server}personaldetailsdataforcde?access_token=${accessToken}`,personalDetailsData);
  } 
  updateForCde(personalDetails_id: any,personalDetailsData:any,accessToken: any){
    return this.http.put<any>(`${server}personaldetailsdataforcde/${personalDetails_id}?access_token=${accessToken}`,personalDetailsData);
  }
}
