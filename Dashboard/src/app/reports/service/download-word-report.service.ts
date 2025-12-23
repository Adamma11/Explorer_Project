import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class DownloadWordReportService {

 
  constructor(
    private http:HttpClient
  ) { }
  downloadStandardWordReport(caseId:any,case_id:any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`http://15.207.82.218:9090/jasperserver/rest_v2/reports/vibereports/newstandardreports/new_std_main_page.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})        
//    return this.http.get<Blob>(`http://15.207.82.218:9090/jasperserver/rest_v2/reports/vibereports/tcsitmongoreportsnew/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})    
    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/newstandardreports/new_std_main_page.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})
//     return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/tcsitmongoreport/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=jasperadmin&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})
//    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/casereports/default_report_main.docx?$caseid=${caseId}?_idstring=${case_id}&j_username=jasperadmin&j_password=manju@123`,{observe:'response',responseType:'blob' as 'json'})
//       return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/casereports/default_report_main.docx?j_username=jasperadmin&j_password=jasperadmin&caseid=${caseId}&_idstring=${case_id}`,{observe:'response',responseType:'blob' as 'json'})
//      return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/casereports/test_report_main.docx?$caseid=${caseId}&j_username=jasperadmin&j_password=jasperadmin`,{observe:'response',responseType:'blob' as 'json'})
      
  }
  downloadTCSWordReport(caseId:any,case_id:any){
    let headers = new HttpHeaders();
// production    
    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/tcsitmongoreportsnew/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})        
//    return this.http.get<Blob>(`http://15.207.82.218:9090/jasperserver/rest_v2/reports/vibereports/tcsitmongoreportsnew/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})    
//    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/tcsitmongoreportsnew/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})
//     return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/tcsitmongoreport/tcs_it_main_mongo.docx?j_username=jasperadmin&j_password=jasperadmin&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})
//    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/casereports/default_report_main.docx?$caseid=${caseId}?_idstring=${case_id}&j_username=jasperadmin&j_password=manju@123`,{observe:'response',responseType:'blob' as 'json'})
//       return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/casereports/default_report_main.docx?j_username=jasperadmin&j_password=jasperadmin&caseid=${caseId}&_idstring=${case_id}`,{observe:'response',responseType:'blob' as 'json'})
//      return this.http.get<Blob>(`http://localhost:8080/jasperserver/rest_v2/reports/vibereports/casereports/test_report_main.docx?$caseid=${caseId}&j_username=jasperadmin&j_password=jasperadmin`,{observe:'response',responseType:'blob' as 'json'})
      
  }
  downloadCGWordReport(caseId:any,case_id:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`http://vibe.verifacts.co.in:8080/jasperserver/rest_v2/reports/vibereports/cgreports/cg_main_page.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})            
//    return this.http.get<Blob>(`http://15.207.82.218:9090/jasperserver/rest_v2/reports/vibereports/cgreports/cg_main_page.docx?j_username=jasperadmin&j_password=manju@123&_idstring=${case_id}&caseId=${caseId}`,{observe:'response',responseType:'blob' as 'json'})                
  }  
  downloadCaseStatusForInitiationDate(user_id:any,fromDate:any,toDate:any){
    return this.http.get<Blob>(`https://vibe.verifacts.co.in/jasperserver/rest_v2/reports/vibereports/trackers/case_status_report_initiation_date.xlsx?j_username=jasperadmin&j_password=manju@123&_idstring=${user_id}&fromDate=${fromDate}&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'})
  }  
  loginToReportServer(){
    let formData = new FormData();
    formData.append('j_username','jasperadmin');
    formData.append('j_password','jasperadmin');

    return this.http.post<any>(`http://localhost:8080/jasperserver/rest_v2/login`,formData);
  }
  getDataForWordReport(case_id:any){
    return this.http.get<any>(`${server}allcomponents/detailsforreport/${case_id}`)
  }
}
