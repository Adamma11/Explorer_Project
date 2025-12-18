import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server} from '../../config';
@Injectable({
  providedIn: 'root'
})
export class ScreenAccessService {

  constructor(private http:HttpClient) { }
  create(screenAccessData:any){
    return this.http.post<any[]>(`${server}screenaccesses`,screenAccessData);
  }
  updateForARole(roleId:string,screenAccessData:any){
    return this.http.put<any[]>(`${server}screenaccesses/${roleId}`,screenAccessData);
  }  
  readAllForARole(roleId:string){
    return this.http.get<any[]>(`${server}screenaccesses/${roleId}`);
  }
}
