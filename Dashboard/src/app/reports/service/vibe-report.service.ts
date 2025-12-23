import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from 'src/app/config';
import { reportsServer } from 'src/app/config'
import { localreportsServer } from 'src/app/config'
@Injectable({
  providedIn: 'root'
})
export class VibeReportService {

  constructor(
    private http: HttpClient
  ) { }
  generateTlPendingReport(reportType: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //    return this.http.get<Blob>(`${server}reports/tlreport?reportType=${reportType}`,{observe:'response',responseType:'blob' as 'json'});
    
    //      return this.http.get<Blob>(`http://15.207.82.218/reportsserver/gettltracker?status="PENDING"`,{observe:'response',responseType:'blob' as 'json'});

    return this.http.get<Blob>(`${localreportsServer}reports/tlreport?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
    // return this.http.get<Blob>(`${localreportsServer}reports/tlreportdynamic?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateTlPendingReportAsArray(reportType: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    return this.http.get<any[]>(`${server}reports/tlreport?reportType=${reportType}`);
    //      return this.http.get<Blob>(`http://15.207.82.218/reportsserver/gettltracker?status="PENDING"`,{observe:'response',responseType:'blob' as 'json'});
  }
  generateTlPendingReportNew(userId: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    return this.http.get<Blob>(`${reportsServer}gettlpendingtracker?userId=${userId}`, { observe: 'response', responseType: 'blob' as 'json' });
    //      return this.http.get<Blob>(`http://15.207.82.218/reportsserver/gettltracker?status="PENDING"`,{observe:'response',responseType:'blob' as 'json'});
  }
  generateTlCompletedReport(reportType: any, dateFrom: any, dateTo: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/tlreport?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`,{observe:'response',responseType:'blob' as 'json'});
    // dynamic 
    return this.http.get<Blob>(`${localreportsServer}reports/tlreport?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
    // return this.http.get<Blob>(`${localreportsServer}reports/tlreportdynamic?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateTlCompletedReportNew(userId: any, dateFrom: any, dateTo: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    return this.http.get<Blob>(`${reportsServer}gettlcompletedtracker?dateFrom=${dateFrom}&&dateTo=${dateTo}&&userId=${userId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateCaseFlowReport(fromDate: any, toDate: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/caseflowreport?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/caseflowreport?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  //new 06-jan-23
  exportCaseHistory(fromDate: any, toDate: any) {
    return this.http.get<Blob>(`${server}casehistory/caseHistoryToExcel?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  //new 06-jan-23
  generateJsonCaseFlowReport(fromDate: any, toDate: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/caseflowreport?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<any[]>(`${localreportsServer}reports/jsoncaseflowreport?fromDate=${fromDate}&&toDate=${toDate}`);
  }
  generateAnalystTrackerReport() {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/analysttracker`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/analysttracker`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  //new 27-jan-23

  generateAnalystTrackerReportPendingReport(reportType: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/analysttracker?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateAnalystTrackerCompletedReport(reportType: any, dateFrom: any, dateTo: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/analysttracker?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  //new 27-jan-23
  //new 01-feb-23
  generateAnalystsummaryReportPendingReport(reportType: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/analystsummart?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateAnalystsummaryCompletedReport(reportType: any, dateFrom: any, dateTo: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/analystsummart?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateTlsummaryReportPendingReport(reportType: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/tlsummary?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateTlsummaryCompletedReport(reportType: any, dateFrom: any, dateTo: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/tlsummary?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  //new 01-feb-23




  // 04Apirl2023

  generateCrmCaseStatusReportPending(requiredCases: any, clientId: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport?requiredCases=${requiredCases}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateCrmCaseStatusReportCompleted(requiredCases: any, dateFrom: any, dateTo: any, clientId: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport?requiredCases=${requiredCases}&&dateFrom=${dateFrom}&&dateTo=${dateTo}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateCrmCaseStatusReportInitiationDate(requiredCases: any, dateFrom: any, dateTo: any, clientId: any) {
    // return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${client_id}?reportfor=INITIATION-DATE&dateFrom=${fromDate}&dateTo=${toDate}`,{observe:'response',responseType:'blob' as 'json'});  
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${clientId}?requiredCases=${requiredCases}&&dateFrom=${dateFrom}&&dateTo=${dateTo}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateCrmCaseStatusReportsearchByName(requiredCases: any, searchValue: any, clientId: any) {
    // return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${client_id}?reportfor=INITIATION-DATE&dateFrom=${fromDate}&dateTo=${toDate}`,{observe:'response',responseType:'blob' as 'json'});  
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport?requiredCases=${requiredCases}&&name=${searchValue}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  // 04Apirl2023

  generateCaseStatusReportPending(client_id: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/casestatusreport/${client_id}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${client_id}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateCaseStatusReportInitiationDate(fromDate: any, toDate: any, client_id: any) {
    //    return this.http.get<Blob>(`${server}reports/casestatusreport/${client_id}?reportfor=INITIATION-DATE&dateFrom=${fromDate}&dateTo=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${client_id}?reportfor=INITIATION-DATE&dateFrom=${fromDate}&dateTo=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateCaseStatusReportCompleted(fromDate: any, toDate: any, client_id: any) {
    //    return this.http.get<Blob>(,{observe:'response',responseType:'blob' as 'json'})            
    //        return this.http.get<Blob>(`${server}reports/casestatusreport/${client_id}?reportfor=COMPLETED&dateFrom=${fromDate}&dateTo=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/casestatusreport/${client_id}?reportfor=COMPLETED&dateFrom=${fromDate}&dateTo=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateSampleWordReport() {
    return this.http.get<Blob>(`${server}samplereport`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateStandardWordReport(caseId: any) {
    //    return this.http.get<Blob>(`${server}reports/standardwordreport/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/standardwordreport/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  //new Tech Meh 22Sep2023
  generateStandardWordTechMehReport(caseId: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/backgroundVerificationReport/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  //new Tech Meh 22Sep2023
  //new 06-jan-23
  downloadFinalReportPDF(caseId: any) {
    //    return this.http.get<Blob>(`${server}reports/standardwordreport/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${server}reports/downloadFinalReportPDF/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  //new 06-jan-23    
  generateTCSWordReport(caseId: any) {
    //    return this.http.get<Blob>(`${server}reports/tcswordreport/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/tcswordreport/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateCGWordReport(caseId: any) {
    //    return this.http.get<Blob>(`${server}reports/cgwordreport/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/cgwordreport/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  deleteJpegs(caseId: any, obj: any) {
    //return this.http.put<any>(`${server}reports/deletejpegs/${caseId}`,obj)
    return this.http.get<any>(`${reportsServer}deletejpgs?caseId=${caseId}&token=8f51ywtmahia7tgtzvfvj6blbfjles`)
  }
  updateCaseInsuffDates() {
    return this.http.get<Blob>(`${server}reports/updatecaseinsuffdates`, { observe: 'response', responseType: 'blob' as 'json' })
  }
  generateVendorTracker() {
    //    return this.http.get<Blob>(`${server}reports/vendortracker`,{observe:'response',responseType:'blob' as 'json'})
    return this.http.get<Blob>(`${localreportsServer}reports/vendortracker`, { observe: 'response', responseType: 'blob' as 'json' })
  }
  generateDataEntryStatusReport(fromDate: any, toDate: any) {
    //    return this.http.get<Blob>(`${server}reports/destatusreport?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/destatusreport?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateOutputqcStatusReport(reportType: any, fromDate: any, toDate: any) {
    //    return this.http.get<Blob>(`${server}reports/destatusreport?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/qcstatusreport?reportType=${reportType}&&fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateBillingTracker(fromDate: any, toDate: any, clientId: any) {
    //    return this.http.get<Blob>(`${server}reports/billingtracker?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/billingtracker?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateUnbilledTracker(fromDate: any, toDate: any) {
    //    return this.http.get<Blob>(`${server}reports/billingtracker?fromDate=${fromDate}&&toDate=${toDate}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/unbilledtracker?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  getClientInsufficiencies() {
    //    return this.http.get<Blob>(`${server}reports/insuffclienttracker`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/insuffclienttracker`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  getOpeningBalanceChecksOperationStats() {
    return this.http.get<any>(`${server}reports/operationstats?reportType=OPENING`)
  }
  getInitiatedChecksOperationStats() {
    return this.http.get<any>(`${server}reports/operationstats?reportType=INITIATED`)
  }
  getCompletedChecksOperationStats() {
    return this.http.get<any>(`${server}reports/operationstats?reportType=COMPLETED`)
  }
  getWIPChecksOperationStats() {
    return this.http.get<any>(`${server}reports/operationstats?reportType=WIP`)
  }
  getInsufChecksOperationStats() {
    return this.http.get<any>(`${server}reports/operationstats?reportType=INSUF`)
  }
  getDataEntryNewInitiationsDashboard() {
    return this.http.get<any>(`${server}cases/dashboard/deinitiated`)
  }
  getInputqcRejectionsForDashboard() {
    return this.http.get<any>(`${server}cases/dashboard/inputqcrejections`)
  }
  getInputqcAcceptanceForDashboard() {
    return this.http.get<any>(`${server}cases/dashboard/inputqcacceptance`)
  }
  generateCasesWithoutOutputqcDateReport() {
    return this.http.get<Blob>(`${server}reports/caseswithoutoutputqcdate`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  getOpeningBalanceChecksOperationStatsForAnalyst() {
    return this.http.get<any>(`${server}reports/operationstatsforanalyst?reportType=OPENING`)
  }
  getInitiatedChecksOperationStatsForAnalyst() {
    return this.http.get<any>(`${server}reports/operationstatsforanalyst?reportType=INITIATED`)
  }
  getCompletedChecksOperationStatsForAnalyst() {
    return this.http.get<any>(`${server}reports/operationstatsforanalyst?reportType=COMPLETED`)
  }
  getWIPChecksOperationStatsForAnalyst() {
    return this.http.get<any>(`${server}reports/operationstatsforanalyst?reportType=WIP`)
  }
  generateRejectionReport(dateFrom: any, dateTo: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/rejectionreport?dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }


  ////New pdf report 1July23
  convertPDfsToJpgs(caseId: any) {
    //    return this.http.get<any>(`${server}reports/convertpdfsttojpgs/${caseId}`)
    return this.http.get<any>(`${reportsServer}converttojpg?caseId=${caseId}&token=8f51ywtmahia7tgtzvfvj6blbfjles`)
  }

  // convertPDfsToJpgs(caseId){
  //   return this.http.get<Blob>(`${localreportsServer}reports/pdffilereport/${caseId}`,{observe:'response',responseType:'blob' as 'json'})
  // }
  ////New pdf report 1July23


  //ne 10-April-23
  generateStandardFinalReport(caseId: any) {
    //    return this.http.get<Blob>(`${server}reports/cgwordreport/${caseId}`,{observe:'response',responseType:'blob' as 'json'});
    return this.http.get<Blob>(`${localreportsServer}reports/finalreport/${caseId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  //// manjunath sir code 03july2023

  generateFollowupReport(dateFrom: any, dateTo: any, clientId: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/followupsreport?dateFrom=${dateFrom}&&dateTo=${dateTo}&&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });

  }
  //// manjunath sir code 03july2023

  ///04july23
  newgenerateBillingTracker(fromDate: any, toDate: any, clientId: any, caseType: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/newbillingtracker?fromDate=${fromDate}&&toDate=${toDate}&&clientId=${clientId}&&caseType=${caseType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  ///10Aug2023 DE and InputQc complition tracker
  generateDeComplitionReport(fromDate: any, toDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/decompletionreport?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateInputqcComplitionReport(fromDate: any, toDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/inputqccompletion?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  generateoutputqcComplitionReport(fromDate: any, toDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/outputqccompletionreport?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generatePendingTatReport() {
    return this.http.get<Blob>(`${localreportsServer}reports/pendingchecks`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateoutputqcPendingReport(fromDate: any, toDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/outputqcpendingreport?fromDate=${fromDate}&&toDate=${toDate}`, { observe: 'response', responseType: 'blob' as 'json' });
  }


  // Download reports 
  // downloadfinalreport(caseId: any,components: string[]){
  //   return this.http.get<any>(`${localreportsServer}reports/standardwordreport/${caseId}?components=${components}`,{observe:'response',responseType:'blob' as 'json'});
  // }
  
  // generatePWCWordReport(caseId:any,components:any) {
  //   return this.http.get<Blob>(`${localreportsServer}reports/pwcReport/${caseId}?components=${components}`,{observe:'response',responseType:'blob' as 'json'})
  // } 

  // generateindercommreportReport(caseId:any,components:any) {
  //   return this.http.get<Blob>(`${localreportsServer}reports/indercommreport/${caseId}?components=${components}`,{observe:'response',responseType:'blob' as 'json'})
  // }
  // generatetechMReportReport(caseId:any,components:any) {
  //   return this.http.get<Blob>(`${localreportsServer}reports/techMReport/${caseId}?components=${components}`,{observe:'response',responseType:'blob' as 'json'})
  // }
  downloadfinalreport(caseId: any,components: string[],reqDate: any){
    const encodedDate = encodeURIComponent(reqDate);
    return this.http.get<any>(`${localreportsServer}reports/standardwordreport/${caseId}?components=${components}&reqDate=${reqDate}`,{observe:'response',responseType:'blob' as 'json'});
  }
 
  generatePWCWordReport(caseId:any,components:any,reqDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/pwcReport/${caseId}?components=${components}&reqDate=${reqDate}`,{observe:'response',responseType:'blob' as 'json'})
  }
 
  generateindercommreportReport(caseId:any,components:any,reqDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/indercommreport/${caseId}?components=${components}&reqDate=${reqDate}`,{observe:'response',responseType:'blob' as 'json'})
  }
  generatetechMReportReport(caseId:any,components:any,reqDate: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/techMReport/${caseId}?components=${components}&reqDate=${reqDate}`,{observe:'response',responseType:'blob' as 'json'})
  }
 

  //////////////////New Status Trackers//
  generateStatusTracker(reportType: any, startdate: any, enddate: any,clientId:any) {

    return this.http.get<Blob>(`${localreportsServer}reports/dateWiseStatusTracker?querytype=${reportType}&&startdate=${startdate}&&enddate=${enddate}&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  
  StatusBasedReportGenerator(reportType: any,clientId:any) {
  
    return this.http.get<Blob>(`${localreportsServer}reports/StatusLevelTracker?reportType=${reportType}&clientId=${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
clientTracker(clientId:any){
      return this.http.get<Blob>(`${localreportsServer}reports/getClientTracker/${clientId}`, { observe: 'response', responseType: 'blob' as 'json' });

}


  generateAnalystPendingReport(reportType: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/DynamicAnalystTracker?reportType=${reportType}`, { observe: 'response', responseType: 'blob' as 'json' });
  }
  generateAnalystCompletedReport(reportType: any, dateFrom: any, dateTo: any) {
    return this.http.get<Blob>(`${localreportsServer}reports/DynamicAnalystTracker?reportType=${reportType}&&dateFrom=${dateFrom}&&dateTo=${dateTo}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

  //new code added Akshay nov 24
  getclientTrackerForCustomFields(clientId:any, payload: any){
      return this.http.post<Blob>(`${localreportsServer}reports/getclientTrackerForCustomFields/${clientId}`, {payload}, { observe: 'response', responseType: 'blob' as 'json' });

}
}
