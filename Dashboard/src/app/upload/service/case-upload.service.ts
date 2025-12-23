import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { server,localreportsServer } from 'src/app/config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CaseUploadService {
  constructor(private http:HttpClient) { }
  uploadCase(acase:any,file:File[]){
    
    const formData = new FormData();
    // formData.append('caseZipFile',file);
    file.forEach((f) => { formData.append(f.name, f); });

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
  addACheck(case_id: any,checkToAdd: any){
    return this.http.put<any>(`${server}cases/addacheck/${case_id}`,checkToAdd)
  }
  uploadLoa(caseId:any, file:any, fileName:any) {
    const formData = new FormData();

    formData.append('loaFile', file, file.name);
    formData.append('fileName', fileName);
    formData.append("caseId", caseId);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
      headers: header
    }
    return this.http.post<any>(`${server}cases/uploadloa`, formData)
  }
  createABatchCase(caseData:any){
    return this.http.post<any>(`${server}cases/batchcase`,caseData);
  }
  uploadExcelCase(caseData:any){
    return this.http.post<any>(`${server}cases/uploadexcelcase`,caseData);
  }
  findAllForAClientAndSubclient(clientId:string,subclientId:string){
    return this.http.get<any[]>(`${server}cases/client/${clientId}/subclient/${subclientId}`);
  }
  findACase(caseId:string){
    return this.http.get<any>(`${server}cases/case/${caseId}`);
  }
  findAllForABatch(batch:string){
    return this.http.get<any[]>(`${server}cases/batch/${batch}`);
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
    return this.http.get<Blob>(`${server}downloadcasefiles/downloadcdf/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadCaseForCDF(caseId:string,fileName:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}allcomponents/downloadcdf/${caseId}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadCaseForCDFiii(component:any,componentData:any,fileName:any){
    let headers = new HttpHeaders();
    // return this.http.get<Blob>(`${server}allcomponents/downloadcdf/${componentDetails.caseId}/${componentDetails.componentName}/${componentDetails._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}allcomponents/downloadCanDox/${componentData.caseId}/${component}/${componentData.componentId}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

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
  findAllCasesForInputqc(status:string,pageCount:any){
    return this.http.get<any>(`${server}cases/allcases/casesforinputqc/${status}?pageCount=${pageCount}`);
  }
  findACaseForReport(caseId:any,pageCount: any){
    return this.http.get<any>(`${server}cases/caseforreport/caseid/${caseId}?pageCount=${pageCount}`);
  }
  findAllPendingCases(client_id: string,pageCount: number){
    return this.http.get<any>(`${server}cases/pendingcases/${client_id}?pageCount=${pageCount}`);
  }
  searchByName(searchValue: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}?pageCount=${pageCount}`);
  }
  searchByCandidateName(searchValue: any,client_id: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}/${client_id}?pageCount=${pageCount}`);
  }
  //
  searchByCandidateNameCrm(searchValue: string,pageCount: number){
    return this.http.get<any>(`${server}cases/searchbyname/candidatename/${searchValue}?pageCount=${pageCount}`);
  }
  //
  searchByCaseId(searchValue: string,pageCount: number){
    return this.http.get<any>(`${server}cases/searchbycaseid/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  searchByCaseIdNoRestrictions(searchValue: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchbycaseidnores/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  searchByInitiationDate(searchDateFrom: Date,searchDateTo: Date | null,client_id: string,pageCount: number){
    return this.http.get<any>(`${server}cases/searchbyinitiationdate/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  searchByCompletionDate(searchDateFrom: Date,searchDateTo: Date,client_id: string,pageCount: number){
    return this.http.get<any>(`${server}cases/searchbycompletiondate/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  //archived
  searchUnarchivedCases(searchDateFrom: any,searchDateTo: any,client_id: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchUnarchivedCases/datefrom/${searchDateFrom}/dateto/${searchDateTo}/${client_id}?pageCount=${pageCount}`);
  }
  searchByCaseIdUnarchived(searchValue: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchByCaseIdUnarchived/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  //archived
  // un archiving cases
  searchByCaseIdArchived(searchValue: any,pageCount: any){
    return this.http.get<any>(`${server}cases/searchArchivedCaseByCaseId/caseid/${searchValue}?pageCount=${pageCount}`);
  }
  // un archiving cases

  getDataForCaseStatus(caseList: { cases: any[]; }){
    return this.http.post<any[]>(`${server}allcomponents/casestatusreport`,caseList);
  }
  createImageForReport(case_id: any){
    return this.http.get<any>(`${server}allcomponents/createimageforreport/${case_id}`)
  }
  updateCaseStatus(case_id: any,statusToUpdate: any){
    return this.http.put<any>(`${server}allcomponents/updatecasestatus/${case_id}`,statusToUpdate)
  }
  allocateCaseToUser(case_id: any,user_id: { user_id: any; }){
    return this.http.put<any>(`${server}cases/allocatetouser/${case_id}`,user_id);
  }
  getCasesInOutputqc(){
    return this.http.get<any[]>(`${server}allcomponents/getcasesinoutputqc`);
  }
  setOutputqcGrade(case_id: any,caseDetails: any){
    return this.http.put<any>(`${server}cases/setoutputqcgrade/${case_id}`,caseDetails)
  }
  updateInsuffRaisedDate(case_id: any,caseDetails: any){
    console.log('triggering mail', case_id, caseDetails)
    return this.http.put<any>(`${server}cases/updateinsuffraiseddate/${case_id}`,caseDetails)
  }
  updateInsuffClearedDate(case_id: any,caseDetails: any){
    return this.http.put<any>(`${server}cases/updateinsuffcleareddate/${case_id}`,caseDetails)
  }
  uploadPdfReport(acase: { caseId: string | Blob; reportType: string | Blob; },file:File,fileTitle: string | Blob){
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
  uploadCdeCase(aCase: any){
    const header = new HttpHeaders(); 
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}cases/initiatecdecase`,aCase);
  }
  resendMail(caseId: any,aCase: any){
    return this.http.put<any>(`${server}cases/resendmail/${caseId}`,aCase)
  }
  readUploadedPdfReportFileNames(caseId: any){
    return this.http.get<any[]>(`${server}cases/readreportfilenames/${caseId}`)
  }
  downloadPdfReport(caseId: any,reportType: any,fileName: any){
    return this.http.get<Blob>(`${server}cases/downloadpdfreport?caseId=${caseId}&&reportType=${reportType}&&fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'})
  }
  countCasesBetweenDates(dateFrom: any,dateTo: any,countType: any){
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
InitiatedCasesTillNow(countType: any){
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
  getCdeCaseDetails(accessToken: any){
    return this.http.get<any>(`${server}cdecase/getcdecasedetails?access_token=${accessToken}`)
  }
  getAllCdeCasesForSubclientWhereStatusIsMailSent(clientId: any,subclientId: any){
    return this.http.get<any[]>(`${server}cases/getcdecaseswithstatusmailsent/clientid/${clientId}/subclientid/${subclientId}`);
  }
  saveAuthorizationSignature(base64Data: any,accessToken: any){
    return this.http.post<any>(`${server}cdecase/saveauthorizationsignature?access_token=${accessToken}`,{signature:base64Data})
  }
  findAllCasesWithStatusCdeCompleted(pageCount: any){
    return this.http.get<any>(`${server}cases/cdecases/cdecompleted?pageCount=${pageCount}`)
  }
  packageUsed(packageId: any){
    return this.http.get<any>(`${server}cases/packageused/${packageId}`)
  }
  profileUsed(profileId: any){
    return this.http.get<any>(`${server}cases/profileused/${profileId}`)
  }
  // Added by Arjun on 23rd November
  findAllCasesWithStatusForMe(status:string,pageCount: number){
    return this.http.get<any>(`${server}cases/allcases/statusforme/${status}?pageCount=${pageCount}`);
  }
// Added by Arjun on 23rd November
// Added by Arjun on 23rd November 2022
  updateOutputqcAllocation(_id: string | undefined,user_id: any){
    return this.http.put<any>(`${server}cases/updateoutputqcallocation/${_id}`,{user_id:user_id})
  }


  exportComponentData(case_id: any, component_name: any){
    return this.http.get<any>(`${server}allcomponents/exportComponentData?caseId=${case_id}&compName=${component_name}`,{observe:'response',responseType:'blob' as 'json'});
  }
  compresed(caseId: any){
    return this.http.post<any>(`${server}archive/compress`,{caseIds: caseId});
  }
  deletecase(caseId: any){
    return this.http.delete<any>(`${server}cases/deletecase/${caseId}`);
  }

  decompress(caseId: any){
    return this.http.post<any>(`${server}archive/decompress`,{caseId: caseId});
  } 
  //Interim QC 08Aug23
  findAllCasesWithInterimStatusForMe(status:string,pageNumber: number,pageSize: number){
    return this.http.get<any>(`${server}cases/interimQc/${status}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  setInterimqcGrade(case_id: any,caseDetails: any){
    return this.http.put<any>(`${server}cases/setinterimqcgrade/${case_id}`,caseDetails)
  }

  ///LOA///
  downloadCaseFileForLOA(caseId:string){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}cases/downloadloa/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
  }


  ////Add Comments//
  findAllComments(_id:string) {
    return this.http.get<[]>(`${server}cases/getAllCommentsForACase/${_id}`);
  }
  addcomment(_id:string, comment:string, colorType:string) {
    return this.http.post<[]>(`${server}cases/addAComment/`, { case_id: _id, comment: comment, colorType: colorType })
  }




  ///////////////////////Dshboard/////////////////

  
    /// APIS Verifications
    downloadApiFile(data:string){
      let headers = new HttpHeaders();
      return this.http.get<Blob>(`${server}getExternal/download/${data}`,{observe:'response',responseType:'blob' as 'json'})
  
    }
    externalApiFile(data:any){
      return this.http.post<any>(`${server}getExternal/downloadApiReport`,data)
    }
    generateOtp(data:any){
      return this.http.post<any>(`${server}getExternal/generateOtp`,data)
    }
    generateAadharOtp(data:any){
      return this.http.post<any>(`${server}getExternal/downloadApiReport`,data)
    }
    ////////////////////////////////
    downloadloa(caseId:string,fileName: any){
            let headers = new HttpHeaders();
            return this.http.get<Blob>(`${server}cases/downloadfileloa/${caseId}/?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
        }

   //////////////////////////////////////////////////////////
   getInflowsAndOutflowsPerDay(clientId?:string,clientIds?:string[]){
    let params = new HttpParams();
    if (clientId) {
      params = params.append('clientId', clientId);
    }
    if(clientIds?.length){
      params = params.append('clientId',clientIds.join(","))
    }
    return this.http.get(`${server}cases/getInflowsAndOutflowsPerDay`,{params:params});

  }

  getPendingFrequencyBucketDetails(type:string|null,clientId?:string,clientIds?:string[]){

    let params = new HttpParams();
    if (clientId) {
      params = params.append("clientId",clientId);
    }
    if(clientIds?.length){
      params = params.append('clientId',clientIds.join(","))
    }
    return this.http.get(`${server}cases/pendingFrequencyBucket?type=${type}`,{params:params});

  }

  getCasesBreakdown(type:string|null,clientId?:string,clientIds?:string[]){
    let params = new HttpParams();
    if (clientId) {
      params = params.append("clientId",clientId);
    }
    if(clientIds?.length){
      params = params.append('clientId',clientIds.join(","))
    }
    return this.http.get(`${server}cases/getCasesBreakdown?type=${type}`,{params:params});
  }

  getWipSummary(type:string|null){
    return this.http.get(`${server}cases/getWipSummary?${type}`);
  }

    
getCaseDataForDashboard(){
return this.http.get(`${server}cases/getCaseDataForDashboard`);
}
getClientPendingFrequencyBucket(){
return this.http.get(`${server}cases/clientPendingFrequencyBucket`);

}    
tatupdate(case_id: any,tatedate:any){
  console.log("tat",tatedate);
  return this.http.put<any>(`${server}cases/tatupdate/${case_id}`,tatedate);
} 

///////////////////////////////cdelink/////////
cdelink(caseId: string) {
  return this.http.post<any>(`${server}cases/generatePasswordAndSendEmailToCandidate/${caseId}`,null );
}

updateDraftStatus(caseId:string,moveDraft:any){
  return this.http.put<any>(`${server}cases/caseDraft/${caseId}`,moveDraft);
}

  findAllCasesWithStatusForFinalQc(status:string,pageCount:any){
    return this.http.get<any>(`${server}cases/allcases/finalqcstatus/${status}?pageCount=${pageCount}`);
  }

  ////added code sep-19//
getTatStats() {
  return this.http.get<any>(`${server}cases/tatstats`);
}

getTatStatsTrend() {
  return this.http.get<any[]>(`${server}cases/tatstats-trend`);
}

//ended code sep-19

///added code sep-22
findCaseCountsForDashboard() {
  return this.http.get<any>(`${server}cases/dashboard/case-counts`);
}

findCombinedCount() {
  return this.http.get<any>(`${server}cases/dashboard/combined-count`);
}


 ///added code oct-11//

    uploadModify(caseId:any, file:any, fileName:any) {
    const formData = new FormData();

    formData.append('loaFile', file, file.name);
    formData.append('fileName', fileName);
    formData.append("caseId", caseId);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
      headers: header
    }
    return this.http.post<any>(`${server}cases/uploadModify`, formData)
  }

///////////////////////////////////


// Akshay
// Add this method to your CaseUploadService
uploadQuickNoteFiles(formData: FormData): Observable<any> {
  const header = new HttpHeaders();
  const params = new HttpParams();
  const options = {
    params,
    reportProgress: true,
    headers: header
  };
  
  // Use a dedicated endpoint for quick note files
  return this.http.post(`${server}cases/upload-quicknote-files`, formData, options);
}

}
