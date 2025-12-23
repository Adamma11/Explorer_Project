import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComponentAccessService } from 'src/app/administration/service/component-access.service';
import { ComponentDataService } from '../../service/component-data.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as XLSX from 'xlsx';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

// export interface UserData {
//   _id: any;
//   caseId:any,
//   case_id:any,
//   candidateName:any,
//   clientName:any,
//   subclientName:any,
//   tatEndDate:any
//   tatStartDate:any;
//   componentDisplayName:any,
//   checkId:any,
//   displayStatus:any,
//   fathername: any,
//   dob: any,
//   contact: any,
//   emailid: any,
//   doj: any,
//   process: any,
//   place: any,
//   colorType: any,
//   comments: any,
// }
export interface UserData {
_id: any;
  caseId: any;
  case_id: any;
  candidateName: any;
  clientName: any;
  subclientName: any;
  tatEndDate: any;
  tatStartDate: any;
  component_id: any;
  componentName: any;
  componentDisplayName: any;
  componentType: any;
  checkId: any;
  fathername?: any;
  dob?: any;
  contact?: any;
  emailid?: any;
  doj?: any;
  process?: any;
  place?: any;
  displayStatus: string;
  colorCodes?: any;
  colorType?: string;
  comments?: string;
}
@Component({
  selector: 'app-mentor-review-list',
  templateUrl: './mentor-review-list.component.html',
  styleUrls: ['./mentor-review-list.component.scss']
})
export class MentorReviewListComponent {
  totalCount = 0;
  pageCount = 0;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  receivedData!: any;
  
  displayedColumns = ['serialNumber','caseId','checkId','candidateName','clientName','subclientName','tatstart','tatEndDate','componentDisplayName','displayStatus'];
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    private componentAccessService:ComponentAccessService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private location:Location,
    private router:Router
  ){
    this.dataSource = new MatTableDataSource();
  } 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.getTableData()
  }
 getTableData() {
  this.componentAccessService.readAllForAUser().pipe(
    switchMap((componentAccessList: any[]) => {
      const observables = componentAccessList.map(item1 =>
        this.componentDataService.findComponentsForInteremQc(item1.component.name, 'MENTOR-REVIEW').pipe(
          catchError(() => of([])), // Prevent error break
          map(response2 => ({ component: item1.component, data: response2 }))
        )
      );
      return forkJoin(observables);
    })
  ).subscribe(results => {
    const finalData: UserData[] = [];

    for (const { component, data } of results) {
      for (const item2 of data) {
        if (!item2.case) continue;

        const personalDetails = item2.personalDetailsData || {};
        console.log("pD",personalDetails);
        
        finalData.push({
          _id: item2._id,
          caseId: item2.case.caseId,
          case_id: item2.case._id,
          candidateName: item2.case.candidateName,
          component_id: component._id,
          componentName: component.name,
          componentDisplayName: component.displayName,
          componentType: component.type,
          tatEndDate: item2.case.tatEndDate,
          tatStartDate: item2.case.initiationDate,
          clientName: item2.case.subclient.client.name,
          subclientName: item2.case.subclient.name,
          colorCodes: item2.case.subclient.client.colorCodes,
          checkId: item2.checkId ?? '',
          fathername: personalDetails.fathername ?? null,
          dob: personalDetails.dateofbirth ?? null,
          contact: personalDetails.number ?? null,
          emailid: personalDetails.emailid ?? null,
          doj: personalDetails.doj ?? null,
          process: personalDetails.process ?? null, 
          place: personalDetails.location ?? null,
          displayStatus: item2.status === "VERIFICATION-COMPLETED" ? "New" : "Rejected",
          colorType: item2.comments?.[item2.comments.length - 1]?.colorType || "",
          comments: item2.comments?.[item2.comments.length - 1]?.comment || "",
        });
      }
    }

    this.dataSource.data = finalData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

  // getTableData(){
  //   this.componentAccessService.readAllForAUser().subscribe(
  //     response=>{
  //       response.forEach((item1: { component: { name: any; _id: any; displayName: any; type: any; }; })=>{
  //           this.componentDataService.findComponentsForInteremQc(item1.component.name,'MENTOR-REVIEW').subscribe(
  //             response2=>{
  //                 response2.forEach(item2=>{
  //                   // console.log("iteammmmmmmmmmmmmmmmmmmmmmm",item2);
  //                   if(!item2.case){
  //                     return
  //                   }
  //                   const personalDetails = item2.personalDetailsData || {};
  //                 let verificationItem:any = {
  
  
  //                     _id: item2._id,
  //                     caseId: item2.case.caseId,
  //                     case_id: item2.case._id,
  //                     candidateName: item2.case.candidateName,
  //                     component_id: item1.component._id,
  //                     componentName: item1.component.name,
  //                     componentDisplayName: item1.component.displayName,
  //                     componentType: item1.component.type,
  //                     tatEndDate: item2.case.tatEndDate,
  //                     tatStartDate:item2.case.initiationDate,
  //                     clientName: item2.case.subclient.client.name,
  //                     subclientName: item2.case.subclient.name,
  //                     colorCodes: item2.case.subclient.client.colorCodes,
  //                     checkId: item2.checkId ? item2.checkId : '',
  //                     fathername: personalDetails.fathername ?? null,
  //                     dob: personalDetails.dateofbirth ?? null,
  //                     contact: personalDetails.contact ?? null,
  //                     emailid: personalDetails.emailid ?? null,
  //                     doj: personalDetails.doj ?? null,
  //                     process: personalDetails.process ?? null,
  //                     place: personalDetails.location ?? null,
  
  
  //                     displayStatus: item2.status === "VERIFICATION-COMPLETED" ? "New" : "Rejected",
  //                                         // Quick note 
  //                     colorType: (item2.comments && item2.comments.length > 0) ? item2.comments[item2.comments.length - 1].colorType || "" : "",
  //                     comments: (item2.comments && item2.comments.length > 0) ? item2.comments[item2.comments.length - 1].comment || "" : "",
  //                 }
  //                 this.dataSource.data.push(verificationItem);
  //               })
  //               this.dataSource._updateChangeSubscription();
  //             },
  //             error=>{
  //               //console.log(error.error.message);
  //             }
  
  //           )
  
  //       })
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error=>{
  //       //console.log(error);
  //     }
  //   )
  // }
  
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getClassToApply(item:any){
    let currentDate = new Date()
    let tatEndDate = new Date(item.tatEndDate)
    let days = Math.floor((tatEndDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    if(days <= 7 && days > 0){
      return 'goldenrod'
    }else if(days <= 0){
      return 'red'
    }else{
      return 'black'
    }
  }
  
  exportToExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws,  'Checks in Mentor Review');
    
    /* save to file */
    XLSX.writeFile(wb, 'Checks in mentor review.xlsx');
  }
  
  showDetails(row:any){
    console.log('item === ', row);
    this.selectedRow = row;
    this.showDetailsFlag = true;
    
    this.componentDetailsForVerificationService.setVerificationItem(row);
    const columnToToggle = ['clientName','subclientName','tatEndDate','componentDisplayName','displayStatus'];
    columnToToggle.forEach(column => {
      const columnIdx = this.displayedColumns.indexOf(column);
      if (columnIdx !== -1) {
        this.displayedColumns.splice(columnIdx, 1);
      }
    });
    this.table.renderRows();
    this.router.navigate([`/home/mentorreview/mentorreviewdetails`]);
  }
  
  // receiveDataFromChild(data: any) {       
  //     this.showDetailsFlag = false;
  //     this.ngOnInit()
  // }
  
}
