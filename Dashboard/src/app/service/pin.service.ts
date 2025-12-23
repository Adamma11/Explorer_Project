import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pin } from '../model/pin';
import {server} from '../config'
@Injectable({
  providedIn: 'root'
})
export class PinService {

  
  constructor(private http:HttpClient) { }
  findAllPins(){
    return this.http.get<Pin[]>(`${server}pins`);    
  }
  createPin(pin:Pin){
    return this.http.post<Pin>(`${server}pins`,pin);
  }
  findOnePin(pinCode:string):Observable<Pin>{
    return this.http.get<Pin>(`${server}pins/${pinCode}`);
  }
  findOnePinWithId(_id:string){
    return this.http.get<Pin>(`${server}pins/id/${_id}`);
  }  
  updatePin(pinCode:string,pin:Pin){
    return this.http.put<Pin>(`${server}pins/${pinCode}`,pin);
  }
  deletePin(pinCode:string){
    return this.http.delete(`${server}pins/${pinCode}`);
  }
  search(searchString:string){
    return this.http.get<Pin[]>(`${server}pins/searchfor/${searchString}`);
  }
  searchPinStartingFrom(searchString:string){
    return this.http.get<any>(`${server}pins/search/${searchString}`);
  }  
  getPinForCity(cityName:any){
    return this.http.get<any>(`${server}pins/pinforcity/${cityName}`);
  }
}
