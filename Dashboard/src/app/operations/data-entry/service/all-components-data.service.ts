import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class AllComponentsDataService {

  
  constructor(private  http:HttpClient) { }

  findAllInsufficienciesForScrutiny(){
    return this.http.get<any[]>(`${server}allcomponents/findallinsufficienciesforscrutiny`);
  }
  findAllInsufficienciesForClient(){
    return this.http.get<any[]>(`${server}allcomponents/findallinsufficienciesforclient`);
  }  
  createJpgs(caseId:any,componentName:any,check_id:any){
    return this.http.put<any[]>(`${server}allcomponents/createjpgs/${check_id}`,{"caseId":caseId,"componentName":componentName,"check_id":check_id});
  }

  searchInstitutionsFromMasters(search: string) {

    return this.http.get<any>(`${server}education/searchInstitutionsFromMasters?search=${search}`);

  }
  readAllName(search:any){
    return this.http.get<any>(`${server}employment/searchempbasicmaster?search=${search}`);
  }
  ///
  readAllComments(search:any){
    return this.http.get<any>(`${server}standardverbiage/searchallinsuffComments?search=${search}`);
  }

  ////////////////New Analyst Dashboard/////////////
  pendingChecksCount(){
    
    return this.http.get<number>(`${server}allcomponents/countOfAllChecksAllocatedToAnalystForVerification`);
  }
  rejectedChecksCount(){
   
    return this.http.get<number>(`${server}allcomponents/countOfRejectedChecksForAnalyst`);
  }
  wipChecksCount(){
   
    return this.http.get<number>(`${server}allcomponents/countOfWIPChecksForAnalyst`);
  }
  closedChecksCount(){
    
    return this.http.get<number>(`${server}allcomponents/countOfClosedChecksForTheMonth`);
  }

  insuffClearedChecksCount(){
    return this.http.get<number>(`${server}allcomponents/countOfInsuffClearedChecksForAnalyst`);
 
  }
}
