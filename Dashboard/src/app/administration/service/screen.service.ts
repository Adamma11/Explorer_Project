import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {server} from '../../config';
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    private http:HttpClient
  ) { }
  readAll(){
    return this.http.get<any[]>(`${server}screens`);
  }
}
