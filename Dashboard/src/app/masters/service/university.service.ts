
import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http:HttpClient) { }

  createUniversity(university:any){
    return this.http.post<any>(`${server}universities`,university);
  }
  readAllForMe(){
    return this.http.get<any[]>(`${server}universities`);
  }

  
  updateUniversity(name: string, university: any) {
    return this.http.put<any>(`${server}universities/${name}`, university);
  }

  findOneUniversity(name:string){
    return this.http.get<any>(`${server}universities/${name}`);
  }
}
