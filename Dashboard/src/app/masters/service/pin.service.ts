import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(
    private http:HttpClient
  ) { }

  findAllPins(){
    return this.http.get<any[]>(`${server}pins`);    
  }
  createPin(pin:any){
    return this.http.post<any>(`${server}pins`,pin);
  }
  findOnePin(pinCode:string){
    return this.http.get<any>(`${server}pins/${pinCode}`);
  }
  findOnePinWithId(_id:string){
    return this.http.get<any>(`${server}pins/id/${_id}`);
  }  
  updatePin(pinCode:string,pin:any){
    return this.http.put<any>(`${server}pins/${pinCode}`,pin);
  }
  deletePin(pinCode:string){
    return this.http.delete(`${server}pins/${pinCode}`);
  }
  search(searchString:string){
    return this.http.get<any[]>(`${server}pins/searchfor/${searchString}`);
  }
  searchPinStartingFrom(searchString:string){
    return this.http.get<any>(`${server}pins/search/${searchString}`);
  }  
  getPinForCity(cityName:any){
    return this.http.get<any>(`${server}pins/pinforcity/${cityName}`);
  }
}
