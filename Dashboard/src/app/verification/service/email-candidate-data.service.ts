import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
import { HttpClient } from "@angular/common/http"
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailCandidateDataService {

  constructor(private http:HttpClient) { }

  sendEmail(emailData:any):Observable<any>{
  return this.http.post<any>(`${server}emailCandidateData/emailCandidateDataOfACheck`,emailData);
  }
  
  private emailStatusSubject = new BehaviorSubject<boolean>(false);
  emailStatus$ = this.emailStatusSubject.asObservable();

  setEmailBeingSent(status: boolean) {
    this.emailStatusSubject.next(status);
  }
}
