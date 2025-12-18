import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {server} from '../../config';
import {SubclientNotification} from "src/app/model/subclient-notification";
@Injectable({
  providedIn: 'root'
})
export class SubclientNotificationService {

  constructor(
    private http:HttpClient
  ) { }
  create(subclientNotificationData:{subclientNotifications:SubclientNotification[]}):Observable<SubclientNotification[]>{
    return this.http.post<SubclientNotification[]>(`${server}subclientnotifications`,subclientNotificationData)
  }
  delete(subclient:string):Observable<{message: string}>{
    return this.http.delete<{message:string}>(`${server}subclientnotifications/${subclient}`)
  }
  findAllForASubclient(subclient:string):Observable<SubclientNotification[]> {
    return this.http.get<SubclientNotification[]>(`${server}subclientnotifications/${subclient}`)
  }
}
