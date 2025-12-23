import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { server } from '../config';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private http:HttpClient
  ) { }

  Getchartinfo(){
    return this.http.get("http://localhost:3000/sales");
  }

 
}
