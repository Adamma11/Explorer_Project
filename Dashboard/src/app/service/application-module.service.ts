import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationModule } from 'src/app/model/application-module';
import {server} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationModuleService {

  constructor(private http:HttpClient) { }
  findAll(){
    return this.http.get<ApplicationModule[]>(`${server}applicationmodules`);
  }  
}
