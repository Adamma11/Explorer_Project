import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../config';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(
    private http:HttpClient
  ) { }
  create(meetingData:any){
    return this.http.post<any>(`${server}meeting`,meetingData);
  }  
  update(_id:any,meetingData:any){
    return this.http.put<any>(`${server}meeting/${_id}`,meetingData);
  }    
  delete(_id:any){
    return this.http.delete<any>(`${server}meeting/${_id}`);
  }      
  read(_id:any){
    return this.http.get<any>(`${server}meeting/meeting/${_id}`);
  }        
  readAllForALeadOrProspect(leadOrProspect:any){
    return this.http.get<any[]>(`${server}meeting/leadorprospect/${leadOrProspect}`);
  }  
  updateStatus(_id:any,meetingData:any){
    return this.http.put<any>(`${server}meeting/updatestatus/${_id}`,meetingData);
  }
  readPendingApprovalForBde(){
    return this.http.get<any[]>(`${server}meeting/bde`);
  }
  readPendingApprovalForApprover(){
    return this.http.get<any[]>(`${server}meeting/approver`);
  }  

  getAllCrmMeetingDocsUsingLogedInUserId(){
    return this.http.get<any>(`${server}crmmeeting/getAllCrmMeetingDocsUsingLogedInUserId`);

  }
}