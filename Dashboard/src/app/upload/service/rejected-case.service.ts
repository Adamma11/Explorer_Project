import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RejectedCaseService {

  constructor(private http:HttpClient) { }

  create(rejectedCase:any){
    return this.http.post<any>(`${server}rejectedcases`,rejectedCase);
  }
  findAllForABatch(batch:string){
    return this.http.get<any[]>(`${server}rejectedcases/batch/${batch}`);
  }
}
