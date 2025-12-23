import {server} from '../../config'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {

  constructor(private http:HttpClient) { }

  create(component:any,componentData:any){
    //console.log("this is componentData ",componentData);
    return this.http.post<any>(`${server}${component}`,componentData);
  }

  findAllForACase(component:any,caseId:any){
    return this.http.get<any[]>(`${server}${component}/${caseId}`);
  }

  readFileNames(component:any,caseId:any,componentId:any){
    return this.http.get<any[]>(`${server}${component}/readfilenames/${caseId}/${component}/${componentId}`);
  }

  findOne(component:any,caseId:any,componentId:any){
    return this.http.get<any>(`${server}${component}/findone/${caseId}/${componentId}`);
  }

  findComponentsFor(component:any,query:any){
    return this.http.get<any[]>(`${server}${component}/findcomponentsfor/${query}`); 
  }
  findComponentsForInteremQc(component:any,query:any){
    return this.http.get<any[]>(`${server}allcomponents/findcomponentsfor/${component}/${query}`); 
  }

  findInsufficienciesForScrutiny(component:any){
    return this.http.get<any[]>(`${server}${component}/insuff/insuffforscrutiny`);
  }

  findInsufficienciesForClient(component:any,pageCount:any){
    return this.http.get<any[]>(`${server}${component}/insuff/insuffforclient?pageCount=${pageCount}`);
  }

  updateInputqcStatus(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/updateinputqcstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }

  rejectInsuff2(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/rejectinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }

  approveInsuff2(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/approveinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }

  clearInsuff2(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/clearinsuff2/${componentData.case_id}/${componentData._id}`,componentData);
  }
  clearInsuff1(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/clearinsuff1/${componentData.case_id}/${componentData._id}`,componentData);
  }

  putItToVendorBucket(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/putittovendorbucket/${componentData.case_id}/${componentData._id}`,componentData);
  }

  insuffEmailTrigger(caseId:string,data:any){
    console.log('triggering mail', data)
    return this.http.post<any>(`${server}allcomponents/insuffMail/${caseId}`,data);
  }
  insuffRaisedEmailTrigger(caseId:string,data:any){
    return this.http.post<any>(`${server}allcomponents/insuffRaised/${caseId}`,data);
  }

  readProofOfWorks(component:any,caseId:any,componentId:any){
    return this.http.get<any[]>(`${server}${component}/readproofofworks/${caseId}/${component}/${componentId}`);
  }

  updateMentorReviewStatus(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/updatementorreviewstatus/${componentData.case_id}/${componentData._id}`,componentData);
  }

  uploadFile(component:any,componentData:any,file:File){
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
    return this.http.post<any>(`${server}${component}/uploadfile`,formData)
  }

  downloadFile(component:any,componentData:any,fileName:any){
    //    ?pageCount=${pageCount
          let headers = new HttpHeaders();
    //      return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
          return this.http.get<Blob>(`${server}${component}/downloadfile/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
      }

      downloadProofOfWorkAsJson(component:any,componentData:any,fileName:any){
        let headers = new HttpHeaders();
    //    return this.http.get<Blob>(`${server}${component}/downloadproofofwork/${componentData.caseId}/${component}/${componentData._id}/${fileName}`,{observe:'response',responseType:'blob' as 'json'});
        return this.http.get<any>(`${server}${component}/downloadproofofworkasjson/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
    
      }

      downloadProofOfWork(component:any,componentData:any,fileName:any){
        let headers = new HttpHeaders();
        // return this.http.get<Blob>(`${server}${component}/downloadProofOfWork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});
        return this.http.get<Blob>(`${server}allcomponents/downloadProofOfWork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

    
      } 

      // candidate docs 
      downloadCanDox(component:any,componentData:any,fileName:any){
        let headers = new HttpHeaders();
        return this.http.get<Blob>(`${server}allcomponents/downloadCanDox/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

    
      } 
            // candidate docs 


      deleteProofOfWork(component:any,componentData:any,fileName:any){
        const formData = new FormData();
        /*formData.append('fileName',fileName);
        formData.append("caseId",componentData.caseId);
        formData.append('case',componentData.case);
        formData.append('componentId',componentData._id);
        formData.append('componentName',component);    */
        // return this.http.delete<any>(`${server}${component}/deleteproofofwork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
        return this.http.delete<any>(`${server}allcomponents/deleteproofofwork/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
      }

      deleteCandidateDoc(component:any,componentData:any,fileName:any){
        return this.http.delete<any>(`${server}allcomponents/deletecandidatedocs/${componentData.caseId}/${component}/${componentData._id}?fileName=${fileName}`);
      }

      deleteCDF(caseId:any,fileName:any){
        return this.http.delete<any[]>(`${server}cases/cdf/${caseId}?fileName=${fileName}`);
      }

      updateVerificationStatus(component:any,componentData:any){
        return this.http.put<any>(`${server}${component}/updateverificationstatus/${componentData.case_id}/${componentData._id}`,componentData);
      }

      uploadProofOfWork(component:any,componentData:any,file:File){
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
        // return this.http.post<any>(`${server}${component}/uploadproofofwork`,formData)
        return this.http.post<any>(`${server}allcomponents/uploadproofofwork`,formData)

      }

      uploadCandidateDocs(component:any,componentData:any,file:File){
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
        console.log(componentData, component, file, )
        // return this.http.post<any>(`${server}${component}/uploadproofofwork`,formData)
        return this.http.post<any>(`${server}allcomponents/uploadcandidatedocs`,formData)

      }

      putItToFeBucket(component:any,componentData:any){
        return this.http.put<any>(`${server}${component}/putittofebucket/${componentData.case_id}/${componentData._id}`,componentData);
      }

      addNote(component:any,componentData:any){
        // return this.http.put<any>(`${server}${component}/addnote/${componentData.case_id}/${componentData._id}`,componentData)
        return this.http.put<any>(`${server}allcomponents/addnotes/${componentData.case_id}/${componentData._id}`,componentData)
        
      }

      searchInstitutionsFromMasters(component:any,institution:string) {

        return this.http.get<any>(`${server}${component}/searchInstitutionsFromMastersforanalyst/${institution}`);
    
      }
      clickToCall(callerData:any) {
        return this.http.post<any>(`${server}servetel/click_to_call`,callerData)
      }
  // stop check
  stopcheck(componentData: any) {
    return this.http.post<any>(`${server}allcomponents/stopcheck`, { component: componentData.componentName, _id: componentData.case_id, gradingComments: componentData.gradingComments });
  }

  //new date:28/11/22
  reinitiateCheck(component:any, componentData:any) {
    return this.http.put<any>(`${server}${component}/reinitiatecheck/${componentData.case_id}/${componentData._id}`, componentData);
  }
  reinitiateCase(componentData:any){
    return this.http.put<any>(`${server}cases/returnToFinalQc`, componentData);


  }

      ///Quick Note
findAllQuicknote(component: any,_id: any) {
  return this.http.get<[]>(`${server}${component}/getAllquicknoteForACheck/${_id}`);
}
// addQuickNote(component: any,_id: any, comment: string, colorType: string) {
//   return this.http.post<[]>(`${server}${component}/addquicknote`, { _id: _id, comment: comment, colorType: colorType })
// }
addQuickNote(component: any, _id: any, comment: string, colorType: string, p0: any[] | undefined) {
  return this.http.post<[]>(`${server}${component}/addquicknote`, { _id: _id, comment: comment, colorType: colorType })
}
//Quick Note
rejectInsuff1Clearance(component:any,componentData:any){
  return this.http.put<any>(`${server}${component}/rejectinsuff1clearance/${componentData.case_id}/${componentData._id}`,componentData);
}
approveInsuffClearance(component:any,componentData:any){
  return this.http.put<any>(`${server}${component}/approveinsuffclearance/${componentData.case_id}/${componentData._id}`,componentData);
}

  //delete Check
  deleteCheck(componentData:any){
    console.log("componentData",componentData);
    
    return this.http.delete<any>(`${server}allcomponents/deleteCheck/${componentData.component_id}/${componentData._id}`,componentData);
  }

  //Updatelhs
  update(component:any,componentData:any){
    return this.http.put<any>(`${server}${component}/${componentData.case_id}/${componentData._id}`,componentData);
  }

  readcdf(caseId:any){
    return this.http.get<any[]>(`${server}cases/cdf/${caseId}`);
  }

  downloadcdf(componentData:any,fileName:any){
    let headers = new HttpHeaders();
    return this.http.get<Blob>(`${server}allcomponents/downloadcdf/${componentData.caseId}/?fileName=${fileName}`,{observe:'response',responseType:'blob' as 'json'});

  }
  stopCheck(component: any,componentData: { case_id: any; _id: any; }){
    return this.http.put<any>(`${server}${component}/stopcheck/${componentData.case_id}/${componentData._id}`,componentData);
  }
  getToAndCCMailAddresses(componentName: string | number | boolean,componentId: string | number | boolean){
    const params = new HttpParams()
    .set('componentName',componentName)
    .set('componentId',componentId);

    return this.http.get<{to:string,cc:string}>(`${server}common/getToAndCCMailAddresses`,{params});
  }

  // createExcel(aCase:any,data:any, formData:any) {
  //   return this.http.post<any>(`${server}cases/uploadBulk`, formData);
  // }

  // createExcelCaseInitiation(aCase:any,data:any, formData:any) {
  //   return this.http.post<any>(`${server}cases/uploadBulkCaseInititaion`, formData );
  // }


  
  //  createExcel(aCase:any,data:any) {
  //   return this.http.post<any>(`${server}cases/uploadBulk`, {aCase,data} );
  // }
  createExcel(aCase: any,data: any,filePaths: any ) {
  return this.http.post<any>(`${server}cases/uploadBulk`, {aCase,data,filePaths} );
}
  // update -expo
  uploadCaseFiles(formData: FormData): Observable<any> {
    return this.http.post(`${server}cases/uploadFiles`, formData);
  }
  // end-15sep25

  createExcelCaseInitiation(aCase:any,data:any, formData:any) {
    return this.http.post<any>(`${server}cases/uploadBulkCaseInititaion`, formData );
  }
}
