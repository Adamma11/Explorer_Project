import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDetailsForVerificationService {

  verificationItem:any;
  constructor() { }
  setVerificationItem(item: any){
    this.verificationItem = item;
    console.log("verificationItem", item)
  }
  getVerificationItem(){
    return this.verificationItem;
  }
}

