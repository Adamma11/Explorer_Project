import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {

  constructor(private http:HttpClient) { }
  create(component: any,componentData: any){
    //console.log("this is componentData ",componentData);
    return this.http.post<any>(`${server}${component}`,componentData);
  }
  createForCde(component: any,componentData: any,accessToken: any){
    //console.log("this is componentData ",componentData);
    return this.http.post<any>(`${server}${component}forcde?access_token=${accessToken}`,componentData);
  }
  update(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateForCde(component: any,componentData: { case_id: any; _id: any; },accessToken: any){
    return this.http.put<any>(`${server}${component}forcde/${componentData.case_id}/${componentData._id}?access_token=${accessToken}`,componentData);
  }
  delete(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.delete<any>(`${server}${component}/deletecheck/case/${componentData.case_id}/component/${componentData._id}`);
  }
  deleteForCde(component: any,case_id: any,check_id: any,accessToken: any){
    return this.http.delete<any>(`${server}${component}forcde/deletecheck/case/${case_id}/component/${check_id}?access_token=${accessToken}`);
  }
  deleteAllFilesForCde(component: any,caseId: any,check_id: any,accessToken: any){
    return this.http.delete<any>(`${server}${component}forcde/deleteallfiles/case/${caseId}/component/${check_id}?access_token=${accessToken}`);
  }
  uploadFile(component: string | Blob, componentData: { fileName: string | Blob; caseId: string | Blob; case: string | Blob; _id: string | Blob; }, files: File[]) {
    const formData = new FormData();
  
    // Append each file to FormData
    files.forEach(file => {
      formData.append(file.name, file);
    });
  
    // Append other data
    formData.append('fileName', componentData.fileName);
    formData.append("caseId", componentData.caseId);
    formData.append('case', componentData.case);
    formData.append('componentId', componentData._id);
    formData.append('componentName', component);
  
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
      headers: header
    };
  
    // Post the form data to the backend
    return this.http.post<any>(`${server}allcomponents/uploadfile`, formData, options);
  }
  
//   uploadFile(component: string | Blob,componentData: { fileName: string | Blob; caseId: string | Blob; case: string | Blob; _id: string | Blob; },file:File[]){
//     const formData = new FormData();

//     //console.log('in upload  file ',componentData);
//     file.forEach((f) => { formData.append(f.name, f); });
//     // formData.append('componentFile',file,file.name);
//     formData.append('fileName',componentData.fileName);
//     formData.append("caseId",componentData.caseId);
//     formData.append('case',componentData.case);
//     formData.append('componentId',componentData._id);
//     formData.append('componentName',component);

// //    formData.append('file',file);
//     const header = new HttpHeaders();
//     const params = new HttpParams();
//     const options = {
//       params,
//       reportProgress:true,
//       headers:header
//     }
//     console.log("fileesssss",formData);
    
//     // return this.http.post<any>(`${server}${component}/uploadfile`,formData)
//     return this.http.post<any>(`${server}allcomponents/uploadfile`,formData)
//   }
  uploadFileForCde(component: string | Blob,componentData: { fileName: string | Blob; caseId: string | Blob; case: string | Blob; _id: string | Blob; },file:File,accessToken: any){
    const formData = new FormData();

    //console.log('in upload  file ',componentData);
    formData.append('componentFile',file,file.name);
    formData.append('fileName',componentData.fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);

//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}${component}forcde/uploadfile?access_token=${accessToken}`,formData)
  }
  uploadProofOfWork(component: string | Blob,componentData: { fileName: string | Blob; caseId: string | Blob; case_id: string | Blob; _id: string | Blob; },file:File){
    const formData = new FormData();

    //console.log('in upload  file ',componentData);
    formData.append('componentFile',file,file.name);
    formData.append('fileName',componentData.fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case_id);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);

//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}${component}/uploadproofofwork`,formData)
  }
  uploadPvProofOfWork(component: string | Blob,componentData: { fileName: string | Blob; caseId: string | Blob; case_id: string | Blob; _id: string | Blob; },file:File){
    const formData = new FormData();

    //console.log('in upload  file ',componentData);
    formData.append('componentFile',file,file.name);
    formData.append('fileName',componentData.fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case_id);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);

//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}${component}/uploadpvproofofwork`,formData)
  }
  uploadPaymentProof(component: string | Blob,componentData: { fileName: string | Blob; caseId: string | Blob; case_id: string | Blob; _id: string | Blob; },file:File){
    const formData = new FormData();

    //console.log('in upload  file ',componentData);
    formData.append('componentFile',file,file.name);
    formData.append('fileName',componentData.fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case_id);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);

//    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}${component}/uploadpaymentproof`,formData)
  }
  deleteProofOfWork(component: any,componentData: { caseId: any; _id: any; },fileName: any){
    const formData = new FormData();
    /*formData.append('fileName',fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);    */
    return this.http.delete<any>(`${server}${component}/deleteproofofwork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
  }

  deleteProofOfWorks(component:any,componentData:any,fileName:any){
    const formData = new FormData();
    /*formData.append('fileName',fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);    */
    // return this.http.delete<any>(`${server}${component}/deleteproofofwork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
    return this.http.delete<any>(`${server}allcomponents/deleteproofofwork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
  }

  deleteCandidatedocs(component:any,componentData:any,fileName:any){
    return this.http.delete<any>(`${server}allcomponents/deletecandidatedocs/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
  }

    deleteCdf(caseId:any,fileName:any){
    return this.http.delete<any>(`${server}allcomponents/deletecdf/${caseId}?fileName=${fileName}`);
  }

  deleteFile(component: string | Blob,componentData: { caseId: string | Blob; case: string | Blob; _id: string | Blob; },fileName: string | Blob){
    const formData = new FormData();
    formData.append('fileName',fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);
    return this.http.delete<any>(`${server}${component}/deletefile/${componentData.caseId}/${component}/${componentData._id}/${fileName}`);
  }
  deleteFileForCde(component: any,componentData: { caseId: any; _id: any; },fileName: any,accessToken: any){
/*    const formData = new FormData();
    formData.append('fileName',fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);    */
    return this.http.delete<any>(`${server}${component}forcde/deletefile/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}&access_token=${accessToken}`);
  }
  downloadFile(component: any,componentData: { caseId: any; _id: any; },fileName: any){
//    ?pageCount=${pageCount
      let headers = new HttpHeaders();
//      return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
      return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadFileForCde(component: any,componentData: { caseId: any; _id: any; },fileName: any,accessToken: any){
    //    ?pageCount=${pageCount
          let headers = new HttpHeaders();
    //      return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
          return this.http.get<Blob>(`${server}${component}forcde/downloadfile/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}&access_token=${accessToken}`,{observe:'response',responseType:'blob' as 'json'});
  }
  downloadProofOfWork(component: any,componentData: { caseId: any; _id: any; },fileName: any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}${component}/downloadproofofwork/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}${component}/downloadProofOfWork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

  } 
  //13-jan-23
  downloadProofOfWorkAsJson(component: any,componentData: { caseId: any; _id: any; },fileName: any){
    let headers = new HttpHeaders();
//    return this.http.get<Blob>(`${server}${component}/downloadproofofwork/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<any>(`${server}${component}/downloadproofofworkasjson/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);

  }

  //13-jan-23

  downloadPaymentProofs(component: any,componentData: { caseId: any; _id: any; },fileName: any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}${component}/downloadpaymentproof/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

  }

  findOne(component: any,caseId: any,componentId: any){
    return this.http.get<any>(`${server}${component}/findone/${caseId}/${componentId}`);
  }
  findOneForCde(component: any,caseId: any,serialNumber: any,accessToken: any){
    return this.http.get<any>(`${server}${component}forcde/findone/${caseId}/${serialNumber}?access_token=${accessToken}`);
  }
  findAllForACase(component: any,caseId: any){
    return this.http.get<any[]>(`${server}${component}/${caseId}`);
  }
  updateDataEntryStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updatedataentrystatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateInputqcStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updateinputqcstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  allocateCheckToMyself(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktomyself/${componentData.case_id}/${componentData._id}`,componentData);
  }
  allocateCheckToFe(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktofe/${componentData.case_id}/${componentData._id}`,componentData);
  } 
  allocateCheckToVendor(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktovendor/${componentData.case_id}/${componentData._id}`,componentData);
  }
//15feb23
allocateCheckToFeTL(component: any,componentData: { case_id: any; _id: any; }){
  return this.http.put<any>(`${server}${component}/allocatechecktofetl/${componentData.case_id}/${componentData._id}`,componentData);
}
//
 


  updateVerificationStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updateverificationstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  //new date:28/11/22
  reinitiateCheck(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/reinitiatecheck/${componentData.case_id}/${componentData._id}`,componentData);
  }
  ocwenreinitiateCheck(case_id: any){
    return this.http.post<any[]>(`${server}allcomponents/reinitiateAllPostHireComponents/${case_id}`,{});
    // return this.http.put<any>(`${server}${component}/reinitiatecheck/${componentData.case_id}/${componentData._id}`,componentData);
  }
  ocwenstopCheck(case_id: any){
    return this.http.post<any[]>(`${server}allcomponents/stopAllPostHireComponentChecks/${case_id}`,{});
    // return this.http.put<any>(`${server}${component}/reinitiatecheck/${componentData.case_id}/${componentData._id}`,componentData);
  }

  putItToFeBucket(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/putittofebucket/${componentData.case_id}/${componentData._id}`,componentData);
  }
  putItToVendorBucket(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/putittovendorbucket/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateVerifierReviewStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updateverifierreviewstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateFeVerificationStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updatefeverificationstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateVendorVerificationStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updatevendorverificationstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateMentorReviewStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updatementorreviewstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  updateOutputqcStatus(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/updateoutputqcstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }
  approveInsuff2(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/approveinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }
  rejectInsuff2(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/rejectinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }
  rejectInsuff1Clearance(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/rejectinsuff1clearance/${componentData.case_id}/${componentData._id}`,componentData);
  }
  rejectInsuff2Clearance(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/rejectinsuff2clearance/${componentData.case_id}/${componentData._id}`,componentData);
  }
  clearInsuff2(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/clearinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }
  clearInsuff1(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/clearinsuff1/${componentData.case_id}/${componentData._id}`,componentData);
  }
  approveInsuffClearance(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/approveinsuffclearance/${componentData.case_id}/${componentData._id}`,componentData);
  }
  readFileNames(component: any,caseId: any,componentId: any){
    return this.http.get<any[]>(`${server}${component}/readfilenames/${caseId}/${component}/${componentId}`);
  }
  readFileNamesForCde(component: any,caseId: any,componentId: any,accessToken: any){
    return this.http.get<any[]>(`${server}${component}forcde/readfilenames/${caseId}/${component}/${componentId}?access_token=${accessToken}`);
  }
  readProofOfWorks(component: any,caseId: any,componentId: any){
    return this.http.get<any[]>(`${server}${component}/readproofofworks/${caseId}/${component}/${componentId}`);
  }
  readPaymentProofs(component: any,caseId: any,componentId: any){
    return this.http.get<any[]>(`${server}${component}/readpaymentproofs/${caseId}/${component}/${componentId}`);
  }
  findComponentsWithInputqcStatus(component: any,inputqcStatus: any){
    return this.http.get<any[]>(`${server}${component}/findwithinputqcstatus/${inputqcStatus}`);
  }
  findComponentsFor(component: any,query: any){
    return this.http.get<any[]>(`${server}${component}/findcomponentsfor/${query}`); 
  }
  findComponentsForVendorManager(component: any,query: any,pageCount: any){
    return this.http.get<any>(`${server}${component}/findcomponentsforvendormanager/${query}?pageCount=${pageCount}`);
  }

  findUnallocatedComponentsForVerification(component: any){
    return this.http.get<any[]>(`${server}${component}/find/unallocated/verification`);
  }
  getAllChecksAllocatedToMeForVerification(component: any){
    return this.http.get<any[]>(`${server}${component}/user/getallchecksallocatedtomeforverification`);
  }
  findInsufficienciesForClient(component: any,pageCount: any){
    return this.http.get<any[]>(`${server}${component}/insuff/insuffforclient?pageCount=${pageCount}`);
  }
  searchInsufficienciesForClient(component: any,caseId: any){
    return this.http.get<any[]>(`${server}${component}/insuff/searchacaseininsuffforclient?caseId=${caseId}`);
  }
  findInsufficienciesForScrutiny(component: any){
    return this.http.get<any[]>(`${server}${component}/insuff/insuffforscrutiny`);
  }
  allocateCheckToVerifier(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktoverifier/${componentData.case_id}/${componentData._id}`,componentData)
  }
  allocateCheckToAUser(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktoauser/${componentData.case_id}/${componentData._id}`,componentData)
  }  
  addNote(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/addnote/${componentData.case_id}/${componentData._id}`,componentData)
  }
  stopCheck(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/stopcheck/${componentData.case_id}/${componentData._id}`,componentData);
  }
  getGrade(component: any){
    return this.http.get<any[]>(`${server}${component}`)
  }

  getdetailsForAComponent(component_id: any,_id: any){
    return this.http.get<any[]>(`${server}allcomponents/detailsForAComponent/${component_id}/${_id}`);
  }
  
  // stop check 
  stopcheck(componentData: { componentName: any; _id: any; gradingComments: any; }){
    return this.http.post<any>(`${server}allcomponents/stopcheck`,{component: componentData.componentName, _id: componentData._id,gradingComments: componentData.gradingComments });
  }

  ///new
  searchInstitutionsFromMasters(component: any,institution:string) {

    return this.http.get<any>(`${server}${component}/searchInstitutionsFromMastersforanalyst/${institution}`);

  }
  allocateCheckToVendorUser(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocatechecktovendoruser/${componentData.case_id}/${componentData._id}`,componentData);
  }
  clickToCall(callerData: any) {
    return this.http.post<any>(`${server}servetel/click_to_call`,callerData)
  }
  ///03july2023
  clearCostApproval(component: any,componentData: { case_id: any; _id: any; }){ 
    return this.http.put<any>(`${server}${component}/clearcostapproval/${componentData.case_id}/${componentData._id}`,componentData);
  }  
  ///


  ///address allocate my self 10Aug2023
  allocateCheckToFeMyself(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/allocateChecktofemyself/${componentData.case_id}/${componentData._id}`,componentData);
  }


    /////////Clear insuff Mail 17Nov2023///
    insuffEmailTrigger(caseId:any,data:any){
      return this.http.post<any>(`${server}allcomponents/insuffMail/${caseId}`,data);
    }

  ///insuff rised
  insuffRaisedEmailTrigger(caseId:any,data:any){
    return this.http.post<any>(`${server}allcomponents/insuffRaised/${caseId}`,data);
  }

  readcdf(caseId:any){
    return this.http.get<any[]>(`${server}cases/cdf/${caseId}`);
  }
  downloadcdf(componentData:any,fileName:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}allcomponents/downloadcdf/${componentData.caseId}/?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

  }

  downloadProofOfWorkk(component:any,componentData:any,fileName:any){
    let headers = new HttpHeaders();
    // return this.http.get<Blob>(`${server}${component}/downloadProofOfWork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}allcomponents/downloadProofOfWork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});


  } 

  downloadCanDox(component:any,componentData:any,fileName:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}allcomponents/downloadCanDox/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});


  } 


  /////////////Email ////////
  downloadEmailAttachment(component: any,componentData:any,fileName: string){
    //    ?pageCount=${pageCount
          let headers = new HttpHeaders();
    //      return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
          return this.http.get<Blob>(`${server}common/downloadEmailAttachment/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
      }
  
  
  uploadEmailAttachments(component: string | Blob,componentData: { fileName?: any; caseId?: any; case_id?: any; _id?: any; },file:File){
    const formData = new FormData();
  
    //console.log('in upload  file ',componentData);
    formData.append('componentFile',file,file.name);
    formData.append('fileName',componentData.fileName);
    formData.append("caseId",componentData.caseId);
    formData.append('case',componentData.case_id);
    formData.append('componentId',componentData._id);
    formData.append('componentName',component);
  
  //    formData.append('file',file);
    const header = new HttpHeaders();
    const params = new HttpParams();
    const options = {
      params,
      reportProgress:true,
      headers:header
    }
    return this.http.post<any>(`${server}common/uploadEmailAttachments`,formData)
  }
  
  
  
  
  
  readEmailAttachments(component: any,caseId: any,componentId: any){
    return this.http.get<any[]>(`${server}common/readEmailAttachments/${caseId}/${component}/${componentId}`);
  }

  /////////
  getDropboxData(){
    return this.http.get<any>(`${server}identity/getDropboxChecks`)
  }
  reinitiateChecks(component: string | null,data: { caseId: any; }){
    if(component === null ){
      return this.http.post<any>(`${server}identity/generatePdfWithSurepass`,data);
    }else if(component === 'globaldatabase'){
      // console.log('data == ', data);
      return this.http.get(`${server}wc/reportStatus/${data.caseId}`,{ responseType: 'blob' })
    }else{
      return this.http.post<any>(`${server}${component}/generatePdfWithSurepass`,data);
    }
    
  }
  // new  services 09Aug2025//////
  findAllUnallocatedComponentsForUser(componentNames: string[]) {
  return this.http.post<any[]>(`${server}allcomponents/unallocated/verification/`, { componentNames });
}

// component-data.service.ts
getAllChecksAllocatedToMeForVerificationMulti(componentNames: string[]) {
  return this.http.post<any[]>(`${server}allcomponents/user/getallchecksallocatedtomeforverificationmulti`, { componentNames } );
}


//////New Deleted///
////code added oct-09//

deletecdf(componentData: any, fileName: string) {
  return this.http.delete(`${server}allcomponents/deletecdf/${componentData.caseId}?fileName=${fileName}`);
}

//end//

////code added oct-30//
uploadcdf(componentName: string, componentData: any, file: File) {
  const formData = new FormData();
  formData.append('componentName', componentName);
  formData.append('caseId', componentData.caseId);
  formData.append('fileName', componentData.fileName);
  formData.append('cdfFile', file);

  return this.http.post(`${server}allcomponents/uploadcdf`, formData);
}

///

}
