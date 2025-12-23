import {Component,OnInit, Input} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Route } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentAccessService } from 'src/app/administration/service/component-access.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { ComponentDetailsForVerificationService } from '../service/component-details-for-verification.service';
import { EducationPvService } from 'src/app/operations/data-entry/service/education-pv.service';
import { EmploymentPvService } from 'src/app/operations/data-entry/service/employment-pv.service';
import * as XLSX from 'xlsx';
import { ComponentFieldService } from 'src/app/service/component-field.service';

export interface VerificationItem  {
  
  Agging?: string;
  _id?: any;
  caseId: any;
  candidateName: any;
  casestatus: any;
  checkstatus: any,
  clientName: any;
  subclientName: any;
  component_id:any;
  tatEndDate: any;
  tatStartDate:any;
  componentDisplayName: any;
  AllocatedDate: any;
  displayStatus: any;
  internaltat: any;
  days: any;
  valuepitch: any;
  action: any;
  PV?: boolean;
  componentName?: string;
  componentType?: string;
  verificationAllocationDate?: any;
  nextfollowupdate?: any;
  insufficiencyClearedDate?: any;
  case_id?: any;
  verificationAllocatedTo: any;
  timeDifference:any;
  internalTAtDays:any;
  client_id:any;
  colorCodes:any;
  allocatedUser:any;
  profile:any;
  package:any;
  insufficiencyClearedComments:any;
  insufficiencyRejectionComments:any;
  updateLhsComments:any;
  periodofstay:any;
  status?:any;
  comments : any,
  checkId?:any,
  colorType: any,
  dateofbirth:any;
  mobilenumber:any;
  fathername:any,
  
  emailid:any,
  doj:any,
  location:any,
  process:any,
  number:any,
  verifyIdForValuePitch:any,
  address:any,
  pin:any,
  city:any,
  university:any,
  employername:any,
  institutename:any,
  field1?:any,
  field2?:any,
  field3?:any
  field4?:any
  
  
  
}


@Component({
  selector: 'app-analyst-list-of-checks',
  templateUrl: './analyst-list-of-checks.component.html',
  styleUrls: ['./analyst-list-of-checks.component.scss']
})
export class AnalystListOfChecksComponent implements OnInit {
  selectedRow:any; 
  selectedTab:string ='NEWCHECKS';
  showDetailsFlag:boolean = false;
  dataSource = new MatTableDataSource<VerificationItem>();
  // displayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'displayStatus', 'internaltat', 'days', 'valuepitch'];
  // displayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend'];
   displayedColumns = [
  'serialNumber', 'caseId', 'checkId', 'candidateName',
  'checkname', 'tatstart', 'tatend', 'clientName', 'Agging'
];

  wipDataSource = new MatTableDataSource<VerificationItem>();
  // wipDisplayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'nextfollowupdate', 'insufficiencyClearedDate', 'displayStatus', 'internaltat', 'days', 'action'];
  wipDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend',   'displayStatus','clientName', 'Agging' ];
  
  onHoldDataSource = new MatTableDataSource<VerificationItem>();
  // wipDisplayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'nextfollowupdate', 'insufficiencyClearedDate', 'displayStatus', 'internaltat', 'days', 'action'];
  onHoldDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend',   'displayStatus','clientName', 'Agging' ];
  
  rejectedDataSource = new MatTableDataSource<VerificationItem>();
  // rejectedDisplayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'displayStatus', 'internaltat', 'days'];
  rejectedDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend','clientName','Agging'];
  
  insufficiencyDataSource = new MatTableDataSource<VerificationItem>();
  // insufficiencyDisplayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'displayStatus', 'action'];
  insufficiencyDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend','clientName', 'Agging'];
  
  insufficiencyRejectedDataSource = new MatTableDataSource<VerificationItem>();
  insufficiencyRejectedDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend','clientName', 'Agging'];
  
  
  todayFollowUpDataSource = new MatTableDataSource<VerificationItem>();
  // todayFollowUpDisplayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'tatEndDate', 'componentDisplayName', 'AllocatedDate', 'displayStatus', 'action'];
  todayFollowUpDisplayedColumns = ['serialNumber', 'caseId','checkId' , 'candidateName','checkname','tatstart','tatend','clientName', 'Agging'];
  
  
  
  activeTabIndex: number = 0;
  vendors: any[] = [];
  selectedVendor: any;
  components: any[] = [];
  selectedComponent: any;
  
  @ViewChild('table1', { read: MatSort, static: false })
  public sort!: MatSort;
  @ViewChild('paginator1', { static: true }) paginator1!: MatPaginator | undefined;
  
  @ViewChild('table2', { read: MatSort, static: false })
  public sort1!: MatSort;
  @ViewChild('paginator2', { static: true })
  paginator2!: MatPaginator | undefined;
  
  @ViewChild('table2', { read: MatSort, static: false })
  public sort2!: MatSort;
  @ViewChild('paginator2', { static: true })
  paginator3!: MatPaginator | undefined;
  paginator: any;
  
  
  
  
  constructor(
    private componentFieldServices: ComponentFieldService,
    private componentService: ComponentService,
    private componentAccessService: ComponentAccessService,
    private componentDataService: ComponentDataService,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private educationPvService: EducationPvService,
    private employmentPvService: EmploymentPvService,
    private router: Router
  ) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator1 || null;
    this.dataSource.sort = this.sort;
    
    // Check if paginator2 is defined before using it
    if (this.paginator2) {
      this.wipDataSource.paginator = this.paginator2 || null;
      this.wipDataSource.sort = this.sort1;
    }
  }
  
  ngOnInit(): void {
    // console.log('ssdcsddsf',this.listChecks);
    this.listChecks();
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.wipDataSource.filter = filterValue.trim().toLowerCase();
    this.onHoldDataSource.filter = filterValue.trim().toLowerCase()
    this.rejectedDataSource.filter = filterValue.trim().toLowerCase();
    this.insufficiencyDataSource.filter = filterValue.trim().toLowerCase();
    this.insufficiencyRejectedDataSource.filter = filterValue.trim().toLowerCase()
    this.todayFollowUpDataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      
    }
    if (this.wipDataSource.paginator) {
      this.wipDataSource.paginator.firstPage();
      
    }
    if (this.onHoldDataSource.paginator) {
      this.onHoldDataSource.paginator.firstPage();
      
    }
    if (this.rejectedDataSource.paginator) {
      this.rejectedDataSource.paginator.firstPage();
      
    }
    if (this.insufficiencyDataSource.paginator) {
      this.insufficiencyDataSource.paginator.firstPage();
      
    }if (this.insufficiencyRejectedDataSource.paginator) {
      this.insufficiencyRejectedDataSource.paginator.firstPage();
      
    }
    if (this.todayFollowUpDataSource.paginator) {
      this.todayFollowUpDataSource.paginator.firstPage();
      
    }
  }
  
  
  addBranchDetailsClicked() {
    
    // this.router.navigate(['home/masters/branchdetails']);
    //  this.router.navigate([`home/dataentry/dataentryall/add`]);
  }
  
  showDetails(row:any):void{
    console.log(row._id);
    this.showDetailsFlag =true;
    this.selectedRow =row;
    
    console.log('component type is  ', row);
    this.router.navigate([`home/verification/analystcomponentverification/${row._id}`]);
    this.componentDetailsForVerificationService.setVerificationItem(row);
    
    //console.log('status is   ',item.status);
    // this.componentDataService.allocateCheckToMyself(row.componentName, row).subscribe(
    
    //   response => { 
    //     if (row.PV) {
    //       if (row.componentType == 'education') {
    //         this.router.navigate(['verification/analysteducationpv'])
    //       } else if (row.componentType == 'employment') {
    
    //         this.router.navigate(['verification/analystemploymentpv'])
    //       }
    //     } else {
      //       //console.log("Item pv ",item.PV);
    //       //console.log("Item status ",item.status);
    //       if (row.status == 'FE-COMPLETED' || row.status == 'FE-INSUFFICIENT' || row.status == 'FE-COULD-NOT-VERIFY') {
    //         this.router.navigate(['verification/analystfecheckedcomponent']);
    //       } else if (row.status == 'VENDOR-COMPLETED' || row.status == 'VENDOR-INSUF' || row.status == 'FE-INSUFFICIENT' || row.status == 'VENDOR-COULD-NOT-VERIFY') {
    //         this.router.navigate(['verification/analystvendorcheckedcomponent']);
    //       } else {
      //         //console.log("I am here because ",item.status);
    //         this.router.navigate(['verification/analystcomponentverification']);
    //       }
    
    //     }
    //   }
    // )
  }
  
  ////09Aug2025///
  // your.component.ts
  // commented on 13Nov2025
  // listChecks() {
  //   // 1️⃣ Get accessible components for the logged-in user
  //   this.componentAccessService.readAllForAUser().subscribe(
  //     (accessList: any[]) => {
  //       if (!accessList || accessList.length === 0) {
  //         return;
  //       }
        
  //       // Extract component names
  //       const componentNames = accessList.map(a => a.component.name);
  //       console.log("test comp",componentNames);
        
  //       // 2️⃣ Call the new multi-component API
  //       this.componentDataService.getAllChecksAllocatedToMeForVerificationMulti(componentNames)
  //       .subscribe((results: any[]) => {
  //         results.forEach(result => {
  //           // console.log("data:....res......",result);
            
  //           const compName = result.component;
  //           const compData = result.data;
            
  //           compData.forEach((item: { status: string; stage: string; }) => {
  //             const verificationItem = this.buildVerificationItem(item, compName);
  //             ////
              
  //             ///
  //             // Categorization logic (WIP, insufficiency, rejected, etc.)
  //             if (item.status === 'MENTOR-REVIEW-REJECTED' || item.status === 'OUTPUTQC-REJECTED') {
  //               this.rejectedDataSource.data.push(verificationItem);
  //             } else if (item.stage === 'ON-HOLD') {
  //               this.onHoldDataSource.data.push(verificationItem);
  //             } else if (item.stage === 'INSUF-REJ') {
  //               this.insufficiencyRejectedDataSource.data.push(verificationItem);
  //             } else if (item.stage === 'INSUF-CLEAR') {
  //               this.insufficiencyDataSource.data.push(verificationItem);
  //             } else if (item.stage === 'WIP' && item.status !== 'VERIFICATION-COMPLETED') {
  //               this.wipDataSource.data.push(verificationItem);
  //             } else {
  //               this.dataSource.data.push(verificationItem);
  //             }
  //           });
  //         });
          
  //         // 3️⃣ Update tables
  //         this.rejectedDataSource._updateChangeSubscription();
  //         this.onHoldDataSource._updateChangeSubscription();
  //         this.todayFollowUpDataSource._updateChangeSubscription();
  //         this.insufficiencyRejectedDataSource._updateChangeSubscription();
  //         this.insufficiencyDataSource._updateChangeSubscription();
  //         this.wipDataSource._updateChangeSubscription();
  //         this.dataSource._updateChangeSubscription();
  //       });
  //     },
  //     error => {
  //       console.error('Error fetching component access list:', error);
  //     }
  //   );
  // }
    listChecks() {
    // 1️⃣ Get accessible components for the logged-in user
    this.componentAccessService.readAllForAUser().subscribe(
      (accessList: any[]) => {
        if (!accessList || accessList.length === 0) {
          return;
        }
        
        // Extract component names
        const componentNames = accessList.map(a => a.component.name);
        console.log("test comp",componentNames);
        
        // 2️⃣ Call the new multi-component API
        this.componentDataService.getAllChecksAllocatedToMeForVerificationMulti(componentNames)
        .subscribe((results: any[]) => {
          results.forEach(result => {
            // console.log("data:....res......",result);
            
            const compName = result.component;
            const compData = result.data;
            
          //   compData.forEach((item: { status: string; stage: string; }) => {
          //     const verificationItem = this.buildVerificationItem(item, compName);
              
          //     // Categorization logic (WIP, insufficiency, rejected, etc.)
          //     if (item.status === 'MENTOR-REVIEW-REJECTED' || item.status === 'OUTPUTQC-REJECTED') {
          //       this.rejectedDataSource.data.push(verificationItem);
          //     } else if (item.stage === 'ON-HOLD') {
          //       this.onHoldDataSource.data.push(verificationItem);
          //     } else if (item.stage === 'INSUF-REJ') {
          //       this.insufficiencyRejectedDataSource.data.push(verificationItem);
          //     } else if (item.stage === 'INSUF-CLEAR') {
          //       this.insufficiencyDataSource.data.push(verificationItem);
          //     } else if (item.stage === 'WIP' && item.status !== 'VERIFICATION-COMPLETED') {
          //       this.wipDataSource.data.push(verificationItem);
          //     } else {
          //       this.dataSource.data.push(verificationItem);
          //     }
          //   });
          // });
//Akshay
          compData.forEach((item: { status: string; stage: string; nextfollowupdate:string }) => {
              // end
              console.log("item form data",item)
              const verificationItem = this.buildVerificationItem(item, compName);
              
              // Categorization logic (WIP, insufficiency, rejected, etc.)
              if (item.status === 'MENTOR-REVIEW-REJECTED' || item.status === 'OUTPUTQC-REJECTED') {
                this.rejectedDataSource.data.push(verificationItem);
              } else if (item.stage === 'ON-HOLD') {
                this.onHoldDataSource.data.push(verificationItem);
              } else if (item.stage === 'INSUF-REJ') {
                this.insufficiencyRejectedDataSource.data.push(verificationItem);
              } else if (item.stage === 'INSUF-CLEAR') {
                this.insufficiencyDataSource.data.push(verificationItem);
              } else if (item.stage === 'WIP' && item.status !== 'VERIFICATION-COMPLETED') {
                this.wipDataSource.data.push(verificationItem);
              } 
              else {
                this.dataSource.data.push(verificationItem);
              }
              // Akshay-06Nov2025
              if (item?.nextfollowupdate) {
              this.todayFollowUpDataSource.data.push(verificationItem);
            }
            //end
            });
          });
          
          // 3️⃣ Update tables
          this.rejectedDataSource._updateChangeSubscription();
          this.onHoldDataSource._updateChangeSubscription();
          this.todayFollowUpDataSource._updateChangeSubscription();
          this.insufficiencyRejectedDataSource._updateChangeSubscription();
          this.insufficiencyDataSource._updateChangeSubscription();
          this.wipDataSource._updateChangeSubscription();
          //Akshay
          this.todayFollowUpDataSource._updateChangeSubscription();
          //Akshay
          this.dataSource._updateChangeSubscription();
        });
      },
      error => {
        console.error('Error fetching component access list:', error);
      }
    );
  }
    // commented on 13Nov2025

  // Helper function to build a VerificationItem
  private buildVerificationItem(item: any, componentName: string) {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    console.log("data:..........",item);
    
    const caseData = item.case || {};
    const subclientData = caseData.subclient || {};
    const clientData = subclientData.client || {};
    const profileData = caseData.profile || {};
    const packageData = caseData.package || {};
    
    const initiationDate = caseData.initiationDate ? new Date(caseData.initiationDate) : null;
    const timeDifference = initiationDate
    ? Math.round((currentDate.getTime() - initiationDate.getTime()) / oneDay)
    : null;
    
    const internalTAtDays = caseData.internalTAtDays || null;
    console.log("colore codddeeess",clientData.colorCodes );
    
    let verificationItem: any = {
      _id: item._id || null,
      caseId: caseData.caseId || null,
      case_id: caseData._id || null,
      candidateName: caseData.candidateName || null,
      component_id: item.component?._id || null,
      componentName: item.component?.name || componentName || null,
      casestatus: caseData.status || null,
      checkstatus: item.status || null,
      componentDisplayName: item.component?.displayName || null,
      componentType: item.component?.type || null,
      tatEndDate: caseData.tatEndDate || null,
      tatStartDate: caseData.initiationDate || null,
      verificationAllocationDate: item.verificationAllocationDate || null,
      verificationAllocatedTo: item.verificationAllocatedTo?.name || null,
      nextfollowupdate: item.nextfollowupdate || null,
      insufficiencyClearedDate: item.insufficiencyClearedDate || null,
      allocatedUser: item.verificationAllocatedTo?.name || null,
      timeDifference: timeDifference,
      internalTAtDays: internalTAtDays,
      client_id: clientData._id || null,
      clientName: clientData.name || null,
      subclientName: subclientData.name || null,
      colorCodes: clientData.colorCodes || null,
      profile: profileData.name || null,
      package: packageData.name || null,
      insufficiencyClearedComments: item.insufficiencyClearedComments || null,
      insufficiencyRejectionComments: item.insufficiencyRejectionComments || null,
      updateLhsComments: item.updateLhsComments || null,
      periodofstay: item.tenureofstay ? item.tenure : null,
      status: item.status || null,
      colorType: (item.comments && item.comments.length > 0) 
      ? item.comments[item.comments.length - 1].colorType || "" 
      : "",
      comments: (item.comments && item.comments.length > 0) 
      ? item.comments[item.comments.length - 1].comment || "" 
      : "",
      checkId: item.checkId || '',
      displayStatus: item.status === 'FE-COMPLETED' ? "PV FE Verified" : undefined,
    };
    
    if (item.personalDetailsData != null) {
      verificationItem["dateofbirth"] = item.personalDetailsData.dateofbirth;
      verificationItem["mobilenumber"] = item.personalDetailsData.mobilename;
      verificationItem["fathername"] = item.personalDetailsData.fathername;
      verificationItem["emailid"] = item.personalDetailsData.emailid;
      verificationItem["doj"] = item.personalDetailsData.doj;
      verificationItem["location"] = item.personalDetailsData.location;
      verificationItem["process"] = item.personalDetailsData.process;
      verificationItem["number"] = item.personalDetailsData.number;
      
      if (item.personalDetailsData.candidatename != null) {
        verificationItem["candidateName"] = item.personalDetailsData.candidatename;
      }
      console.log("test",item.component);
      console.log("compsss",item.component?.name);
      
        if (item.component?.name === 'webandmedia') {
                      verificationItem["field1"] = item?.name || '';
                      verificationItem["field2"] = item?.internationalmedia || '';
                      verificationItem["field3"] = item?.racism || '';
                      verificationItem["field4"] = item?.behavior || '';
                    }
                    
                    if (item.component?.name === 'currentaddress' || item.component?.name === 'permanentaddress' || item.component?.name === 'permanentandcurrentaddress') {
                      verificationItem["field1"] = item?.address || '';
                      verificationItem["field2"] = item?.city || '';
                      verificationItem["field3"] = item?.state || '';
                      verificationItem["field4"] = item?.postalcode || '';
                    }
                    
                    if (item.component?.name === 'previousaddresscheck') {
                      verificationItem["field1"] = item?.name || '';
                      verificationItem["field2"] = item?.address || '';
                      verificationItem["field3"] = item?.city || '';
                      verificationItem["field4"] = item?.state || '';
                    }
                    
                    if (item.component?.name === 'criminalcourt' || item.component?.name === 'criminalcourtrecordcheckpermanentaddress' || item.component?.name === 'criminalonline' || item.component?.name === 'criminalverbal' || item.component?.name === 'criminalwritten') {
                      verificationItem["field1"] = item?.name || '';
                      verificationItem["field2"] = item?.fathername || '';
                      verificationItem["field3"] = item?.dob || '';
                      verificationItem["field4"] = item?.address || '';
                    }
                    
                    if (item.component?.name == 'employment') {
                      verificationItem["employername"] = item.organization;
                    }
                    if (item.component?.name == 'education') {
                      verificationItem["institutename"] = item.institutename;
                    }
                    
                    if (item.component?.name == 'criminalrecord') {
                      verificationItem["address"] = item.fulladdress;
                      verificationItem["pin"] = item.pin;
                      verificationItem["city"] = item.city;
                    }
                    if (item.component?.name == 'courtrecord') {
                      verificationItem["address"] = item.addresswithpin;
                      verificationItem["pin"] = item.pin;
                      verificationItem["city"] = item.city;
                      verificationItem["verifyIdForValuePitch"] = item.verifyIdForValuePitch ? item.verifyIdForValuePitch : "";
                    }
    }
    
    // Aging calculation
    if (verificationItem.tatStartDate && verificationItem.tatEndDate) {
      const tatEnd = new Date(verificationItem.tatEndDate);
      let remainingDays = Math.ceil((tatEnd.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
      if (remainingDays < 0) remainingDays = 0;
      verificationItem["AggingDays"] = remainingDays;
      verificationItem["Agging"] = `${remainingDays} day's`;
    }
    
    return verificationItem;
  }
  
  
  
  
  
  
  checkDate(): boolean {
    let reqDate = new Date();
    reqDate.setMonth(8);
    reqDate.setFullYear(2023);
    reqDate.setDate(15);
    
    return new Date() <= reqDate;
  }
  backButtonClicked() {
    
  }
  
  
  tabsChanged(e:any){
    console.log('event ', e.value);
    this.selectedTab = e.value
  }
  
  
  
  
  
  exportToExcel(){
    switch(this.selectedTab){
      case 'NEWCHECKS':
      this.exportCommonListToExcel()
      break
      case 'WIP':
      this.exportWIPToExcel()
      break
      case 'ON-HOLD':
      this.exportonHoldToExcel()
      break
      case 'REJECTED':
      this.exportRejectedToExcel()
      break
      case 'INSUFFICIENCY-CLEARED':
      this.exportInsufficiencyToExcel()
      break
      case 'INSUFFICIENCY-REJECTED':
      this.exportInsufficiencyRejectedToExcel()
      break
      case 'TODAYS-FOLLOW-UP':
      this.exportTodayFollowUpToExcel()
      break
      default:
      console.log('Unknown tab');
    }
    
  }
  
  exportCommonListToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Available Checks');
    
    /* save to file */
    XLSX.writeFile(wb, 'AvailableChecks.xlsx');
  }
  
  exportWIPToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.wipDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'WIP Checks');
    
    /* save to file */
    XLSX.writeFile(wb, 'WIPChecks.xlsx');
  }
  
  exportonHoldToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.onHoldDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ON-HOLD Checks');
    
    /* save to file */
    XLSX.writeFile(wb, 'ONHOLDChecks.xlsx');
  }
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  applyWipFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wipDataSource.filter = filterValue.trim().toLowerCase();
  }
  getClassToApply(item: { tatEndDate: string | number | Date; }) {
    let currentDate = new Date()
    let tatEndDate = new Date(item.tatEndDate)
    let days = Math.floor((tatEndDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    // let today = `${new Date().getDate()+1}/${new Date().getMonth()}`
    // let folloupDate = `${new Date(item.nextfollowupdate).getDate()}/${new Date(item.nextfollowupdate).getMonth()}`
    // console.log("NEXT Follow up:", today, folloupDate)
    if (days <= 7 && days > 0) {
      return 'goldenrod'
    } else if (days <= 0) {
      return 'red'
    }
    // else if(today <= 0){
    //   return 'DeepSkyBlue'
    
    // }
    else {
      return 'black'
    }
  }
  
  exportRejectedToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rejectedDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rejected Checks');
    
    /* save to file */
    XLSX.writeFile(wb, 'RejectedChecks.xlsx');
  }
  
  //05Aug2023
  exportInsufficiencyToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.insufficiencyDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Insuff Cleared');
    
    /* save to file */
    XLSX.writeFile(wb, 'InsuffCleared.xlsx');
  }
  exportInsufficiencyRejectedToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.insufficiencyRejectedDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Insuff Rejected');
    
    /* save to file */
    XLSX.writeFile(wb, 'InsuffCleared.xlsx');
  }
  applyInsuffFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.insufficiencyDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyInsuffRejectedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.insufficiencyRejectedDataSource.filter = filterValue.trim().toLowerCase();
  }
  exportTodayFollowUpToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.todayFollowUpDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Todays Followup');
    
    /* save to file */
    XLSX.writeFile(wb, 'TodaysFolloup.xlsx');
  }
  applyTodayFollowUpFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.todayFollowUpDataSource.filter = filterValue.trim().toLowerCase();
  }
  
  // tabChanged(index: number) {
  //   this.activeTabIndex = index;
  // }
  
  
  
}
