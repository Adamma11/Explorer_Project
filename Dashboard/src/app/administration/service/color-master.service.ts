import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {server} from "../../config";
import {ColorMasterData,ApiResponse} from "../model/color-master";

@Injectable({
  providedIn: 'root'
})
export class ColorMasterService {

  constructor(private http:HttpClient) { }
  
  create(colorMasterData:ColorMasterData){
    return this.http.post<ApiResponse<ColorMasterData>>(`${server}colormaster`,colorMasterData);
  }
  update(colorMasterData:{colorMasters:ColorMasterData[]}){
    console.log("service",colorMasterData);
    
    return this.http.put<ApiResponse<ColorMasterData[]>>(`${server}colormaster`,colorMasterData);
  }  
  readAll(){
    return this.http.get<ColorMasterData[]>(`${server}colormaster`);
  }  
}
