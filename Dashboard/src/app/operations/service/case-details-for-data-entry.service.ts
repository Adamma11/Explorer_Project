import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseDetailsForDataEntryService {
  currentComponent:any;
  caseInputqcStatus:any;

  constructor(private http:HttpClient) { }

  setCurrentComponent(cc:any){
    return this.currentComponent = cc;
  }

  setCaseInputqcStatus(caseInputqcStatus:any){
    this.caseInputqcStatus = caseInputqcStatus;
  }
}
