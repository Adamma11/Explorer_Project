import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from 'src/app/model/case';
import { localreportsServer, server } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CaseUploadService {

  constructor(private http:HttpClient) { }
  uploadCase(acase:Case,file:File){
    const formData = new FormData();
    formData.append('caseZipFile',file,file.name);
    formData.append('client',acase.client);
    formData.append('subclient',acase.subclient);
    formData.append('candidateName',acase.candidateName);
    console.log("Tat being sent is ",acase.tat);
    formData.append('tat',String(acase.tat));
    formData.append('employeeId',acase.employeeId)
    console.log('status before appending to form data ',acase.status);
    formData.append("status",acase.status);
    if(acase.batch != null){
      formData.append('batch',acase.batch);
    }
    if(acase.package != null){
      formData.append('package',acase.package);
    }else if(acase.profile != null){
      formData.append('profile',acase.profile);
    }else{
      console.log('about to stringify components to check ',acase.componentsToCheck);
      console.log('Stringified components to check ',JSON.stringify(acase.componentsToCheck));
      formData.append('componentsToCheck',JSON.stringify(acase.componentsToCheck))
    }

//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}cases`,formData,options);
  }
  addACheck(case_id:string,checkToAdd:any){
    return this.http.put<any>(`${server}cases/addacheck/${case_id}`,checkToAdd)
  }
  uploadLoa(caseId:string,file:File,fileName:string){
    const formData = new FormData();

    formData.append('loaFile',file,file.name);
    formData.append('fileName',fileName);
    formData.append("caseId",caseId);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}cases/uploadloa`,formData)
  }
  createABatchCase(caseData:any){
    return this.http.post<any>(`${server}cases/batchcase`,caseData);
  }
  uploadExcelCase(caseData:any){
    return this.http.post<any>(`${server}cases/uploadexcelcase`,caseData);
  }
  findAllForAClientAndSubclient(clientId:string,subclientId:string){
    return this.http.get<Case[]>(`${server}cases/client/${clientId}/subclient/${subclientId}`);
  }
  findACase(caseId:string){
    return this.http.get<any>(`${server}cases/case/${caseId}`);
  }
  findAllForABatch(batch:string){
    return this.http.get<Case[]>(`${server}cases/batch/${batch}`);
  }
  findOneDeUnAllocatedCase(){
    return this.http.get<any>(`${server}cases/findonedeunallocated`);
  }
  downloadCandidateFile(caseId:string){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}cases/downloadcandidatefile/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadCaseFileForCDF(caseId:string){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}downloadcasefiles/case/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
  }
  updateStatus(caseId:string,status:any){
    return this.http.put<any>(`${server}cases/case/${caseId}`,status);
  }
  findCasesWithStatus(status:string){
    return this.http.get<any[]>(`${server}cases/status/${status}`);
  }
  findAllCasesWithStatus(status:string,pageCount:any){
    return this.http.get<any>(`${server}cases/allcases/status/${status}?pageCount=${pageCount}`);
  }
  findAllCasesForInputqc(){
    return this.http.get<any>(`${server}allcases/casesforinputqc`);
  }
  findACaseForReport(caseId:string,pageCount:number){
    return this.http.get<any>(`${server}cases/caseforreport/caseid/${caseId}?pageCount=${pageCount}`);
  }
  findAllPendingCases(client_id:string,pageCount:number){
    return this.http.get<any>(`${server}cases/pendingcases/${client_id}?pageCount=${pageCount}`);
  }
  searchByName(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}?pageCount=${pageCount}`);
  }
  searchByCandidateName(searchValue:string,client_id:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}/${client_id}?pageCount=${pageCount}`);
  }
  //
  searchByCandidateNameCrm(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}?pageCount=${pageCount}`);
  }
  //
  searchByCaseId(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbycaseid/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  searchByCaseIdNoRestrictions(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbycaseidnores/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  searchByInitiationDate(searchDateFrom:string,searchDateTo:string,client_id:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbyinitiationdate/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  searchByCompletionDate(searchDateFrom:string,searchDateTo:string,client_id:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchbycompletiondate/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  //archived
  searchUnarchivedCases(searchDateFrom:string,searchDateTo:string,client_id:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchUnarchivedCases/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  searchByCaseIdUnarchived(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchByCaseIdUnarchived/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  //archived
  // un archiving cases
  searchByCaseIdArchived(searchValue:string,pageCount:number){
    return this.http.get<any>(`${server}cases/searchArchivedCaseByCaseId/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  // un archiving cases

  getDataForCaseStatus(caseList:any){
    return this.http.post<any[]>(`${server}allcomponents/casestatusreport`,caseList);
  }
  createImageForReport(case_id:string){
    return this.http.get<any>(`${server}allcomponents/createimageforreport/${case_id}`)
  }
  updateCaseStatus(case_id:string,statusToUpdate:any){
    return this.http.put<any>(`${server}allcomponents/updatecasestatus/${case_id}`,statusToUpdate)
  }
  allocateCaseToUser(case_id:string,user_id:string){
    return this.http.put<any>(`${server}cases/allocatetouser/${case_id}`,user_id);
  }
  getCasesInOutputqc(){
    return this.http.get<any[]>(`${server}allcomponents/getcasesinoutputqc`);
  }
  setOutputqcGrade(case_id:string,caseDetails:any){
    return this.http.put<any>(`${server}cases/setoutputqcgrade/${case_id}`,caseDetails)
  }
  updateInsuffRaisedDate(case_id:string,caseDetails:any){
    return this.http.put<any>(`${server}cases/updateinsuffraiseddate/${case_id}`,caseDetails)
  }
  updateInsuffClearedDate(case_id:string,caseDetails:any){
    return this.http.put<any>(`${server}cases/updateinsuffcleareddate/${case_id}`,caseDetails)
  }
  uploadPdfReport(acase:any,file:File,fileTitle:string){
    const formData = new FormData();
    formData.append('reportFile',file,file.name);
    formData.append('caseId',acase.caseId);
    formData.append('fileName',fileTitle)
    formData.append("reportType",acase.reportType);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}cases/uploadpdfreport`,formData,options);
  }
  uploadCdeCase(aCase:any){
    const header = new HttpHeaders(); 
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}cases/initiatecdecase`,aCase);
  }
  resendMail(caseId:string,aCase:any){
    return this.http.put<any>(`${server}cases/resendmail/${caseId}`,aCase)
  }
  readUploadedPdfReportFileNames(caseId:string){
    return this.http.get<any[]>(`${server}cases/readreportfilenames/${caseId}`)
  }
  downloadPdfReport(caseId:string,reportType:string,fileName:string){
    return this.http.get<Blob>(`${server}cases/downloadpdfreport?caseId=${caseId}&&reportType=${reportType}&&fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'})
  }
  countCasesBetweenDates(dateFrom:string,dateTo:string,countType:string){
    return this.http.get<any>(`${server}cases/casecount?countType=${countType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`)
  }  
//new 09-feb23
componentcount(){
  return this.http.get<any[]>(`${localreportsServer}reports/countcomp`)
}
analystcomponentcount(){
  return this.http.get<any[]>(`${localreportsServer}reports/analystcont`)
}
TlCompletedcompcount(){
  return this.http.get<any[]>(`${localreportsServer}reports/tlcompletedcount`)
}
//
componentdayscount(){
  return this.http.get<any[]>(`${server}cases/pendingFrequencyBucket`)
}
componentcasescount(){
  return this.http.get<any[]>(`${server}cases/readCheckRatioData`)
}
//
//new 09-feb23
InitiatedCasesTillNow(countType:string){
  return this.http.get<any>(`${server}cases/initiatedcasecount?countType=${countType}`)
}
getLastSixMonthsCompletedCase(){
  return this.http.get<any[]>(`${server}cases/lastsixmonthscompletedcase`)
}
getCompletedCasescount(){
  return this.http.get<any[]>(`${server}cases/countofcompletedcases`)
}


  getLastSixmonthsCount(){
    return this.http.get<any[]>(`${server}cases/lastsixmonthscount`)
  }
  getCdeCaseDetails(accessToken:string){
    return this.http.get<any>(`${server}cdecase/getcdecasedetails?access_token=${accessToken}`)
  }
  getAllCdeCasesForSubclientWhereStatusIsMailSent(clientId:string,subclientId:string){
    return this.http.get<any[]>(`${server}cases/getcdecaseswithstatusmailsent/clientid/${clientId}/subclientid/${subclientId}`);
  }
  saveAuthorizationSignature(base64Data:string,accessToken:string){
    return this.http.post<any>(`${server}cdecase/saveauthorizationsignature?access_token=${accessToken}`,{signature:base64Data})
  }
  findAllCasesWithStatusCdeCompleted(pageCount:number){
    return this.http.get<any>(`${server}cases/cdecases/cdecompleted?pageCount=${pageCount}`)
  }
  packageUsed(packageId:string){
    return this.http.get<any>(`${server}cases/packageused/${packageId}`)
  }
  profileUsed(profileId:string){
    return this.http.get<any>(`${server}cases/profileused/${profileId}`)
  }
  // Added by Arjun on 23rd November
  findAllCasesWithStatusForMe(status:string,pageCount:number){
    return this.http.get<any>(`${server}cases/allcases/statusforme/${status}?pageCount=${pageCount}`);
  }
// Added by Arjun on 23rd November
// Added by Arjun on 23rd November 2022
  updateOutputqcAllocation(_id:string,user_id:string){
    return this.http.put<any>(`${server}cases/updateoutputqcallocation/${_id}`,{user_id:user_id})
  }


  exportComponentData(case_id:string, component_name:string){
    return this.http.get<any>(`${server}allcomponents/exportComponentData?caseId=${case_id}&compName=${component_name}`,{observe:'response',responseType:'blob' as 'json'});
  }
  compresed(caseId:string){
    return this.http.post<any>(`${server}archive/compress`,{caseIds: caseId});
  }
  deletecase(caseId:string){
    return this.http.delete<any>(`${server}cases/deletecase/${caseId}`);
  }

  decompress(caseId:string){
    return this.http.post<any>(`${server}archive/decompress`,{caseId: caseId});
  } 
  //Interim QC 08Aug23
  findAllCasesWithInterimStatusForMe(status:string,pageNumber:number,pageSize:number){
    return this.http.get<any>(`${server}cases/interimQc/${status}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  setInterimqcGrade(case_id:string,caseDetails:any){
    return this.http.put<any>(`${server}cases/setinterimqcgrade/${case_id}`,caseDetails)
  }

  ///LOA///
  downloadCaseFileForLOA(caseId:string){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}cases/downloadloa/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
  }

  //ADMIN DASHBOARD

  getInflowsAndOutflowsPerDay(){
    return this.http.get(`${server}cases/getInflowsAndOutflowsPerDay`);

  }

  getPendingFrequencyBucketDetails(type:string|null){
    return this.http.get(`${server}cases/pendingFrequencyBucket?${type}`);

  }

  getCasesBreakdown(type:string|null){
    return this.http.get(`${server}cases/getCasesBreakdown?${type}`);
  }

  getWipSummary(type:string|null){
    return this.http.get(`${server}cases/getWipSummary?${type}`);
  }
  
  getCaseDataForDashboard(){
    return this.http.get(`${server}cases/getCaseDataForDashboard`);
  }

  getClientCaseDataForDashboard(){
    return this.http.get(`${server}cases/getClientCaseDataForDashboard`);

  }
  getClientPendingFrequencyBucket(){
    return this.http.get(`${server}cases/clientPendingFrequencyBucket`);

  }
}
