import {Component, HostListener, Input} from '@angular/core';
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
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { CaseUploadService } from 'src/app/service/case-upload.service';
import { ElementRef, OnInit} from '@angular/core';
import { CaseDetailsForDataEntryNewService } from '../service/case-details-for-data-entry-new.service';
import { CaseDetailsForDataEntryService } from '../service/case-details-for-data-entry.service';
import * as XLSX from 'xlsx';



export interface UserData {
  _id: any;
  name: any;
  address: any;
  country: any;
  caseId:any,
  candidateName:any,
  client:any,
  subclient:any,
  branch:any,
  initiationDate:any,
  dataEntryCompletionDate:any,
  tatEndDate:any
}





@Component({
  selector: 'app-de-case-list',
  templateUrl: './de-case-list.component.html',
  styleUrls: ['./de-case-list.component.scss']
})
export class DeCaseListComponent {

  totalCount = 0;
  pageCount = 0;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  isSmallScreen: boolean = false;
  // displayedColumns = ['serialNumber','caseId','candidateName','client','subclient','branch','initiationDate','dataEntryCompletionDate','tatEndDate'];
  displayedColumns = ['serialNumber','caseId','candidateName','client','subclient','initiationDate','tatEndDate','checks','status','pchecks','rchecks'];
  dataSource: MatTableDataSource<UserData>;
  draftdataSource: MatTableDataSource<UserData>;
  draftdColumns = ['serialNumber','caseId','candidateName','client','subclient','initiationDate','tatEndDate','checks','pchecks','rchecks'];

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private caseUploadService:CaseUploadService,
    private caseDetailsDataEntryService:CaseDetailsForDataEntryService,
    private caseDetailsForDataEntryNewService:CaseDetailsForDataEntryNewService,
    private snackBar:MatSnackBar,
    private location:Location,
    private router:Router,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,

    ){
      this.dataSource = new MatTableDataSource();
      this.draftdataSource = new MatTableDataSource()
    }
    ngOnChanges(){
      this.ngOnInit();
    }
    ngOnInit(): void {
      // this.caseUploadService.findCasesWithStatus('INPUTQC-REJECTED').subscribe(
     
        
      //   (response) => {
          
          
      //     for (let i = 0; i < response.length; i++) {
      //       let item = response[i];
      //       console.log('ITEM' + i, item);
      //       let acase: any = {}; // Define acase with any type
      //       console.log("response",item);
      //       acase['case_id'] = item._id;
      //       acase['caseId'] = item.caseId;
      //       acase['candidateName'] = item.candidateName;
      //       acase['cientId'] = item.client ? item.client._id : '';
      //       acase['clientName'] = item.client ? item.client.name : '';
      //       acase['subclientId'] = item.subclient ? item.subclient._id : '';
      //       acase['subclientName'] = item.subclient ? item.subclient.name : '';
      //       acase['initiationDate'] = item.initiationDate;
      //       acase['tatEndDate'] = item.tatEndDate;
      //       acase['status'] = item.status;
      //       acase['employeeId'] = item.employeeId ? item.employeeId : (item.personalDetails ? item.personalDetails.empid : '');
      //       // acase['employeeId'] = item.personalDetails ? item.personalDetails.empid : '';
      //       acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
      //       if (item.package) {
      //         acase['packageName'] = item.package.name;
      //         acase['packageComponents'] =
      //           item.package.clientContractPackageComponents;
      //         acase['clientContractId'] = item.package.clientContract;
      //       } else if (item.profile) {
      //         acase['profileName'] = item.profile.name;
      //         acase['profileComponents'] =
      //           item.profile.clientContractProfileComponents;
      //         acase['clientContractId'] = item.profile.clientContract;
      //       } else {
      //         acase['componentsToCheck'] = item.componentsToCheck;
      //       }
      //       console.log("Test Item:",item.moveToDraft);
      //       if(item.moveToDraft != null){
      //         this.draftdataSource.data.push(acase)
      //         this.draftdataSource._updateChangeSubscription();
      //       } else{
      //         this.dataSource.data.push(acase);
      //         this.dataSource._updateChangeSubscription();

      //       }
      //     }
         
          
      //   },
 
      //   error=>{
  
      //   }
      // )

      // this.caseUploadService.findCasesWithStatus('DE-ALLOCATED').subscribe(
      //   (response) => {
          
          
      //     for (let i = 0; i < response.length; i++) {
      //       let item = response[i];
      //       console.log('ITEM' + i, item);
      //       let acase: any = {}; // Define acase with any type
      //       console.log("response",item);
      //       acase['case_id'] = item._id;
      //       acase['caseId'] = item.caseId;
      //       acase['candidateName'] = item.candidateName;
      //       acase['cientId'] = item.client ? item.client._id : '';
      //       acase['clientName'] = item.client ? item.client.name : '';
      //       acase['subclientId'] = item.subclient ? item.subclient._id : '';
      //       acase['subclientName'] = item.subclient ? item.subclient.name : '';
      //       acase['initiationDate'] = item.initiationDate;
      //       acase['tatEndDate'] = item.tatEndDate;
      //       acase['status'] = item.status;
      //       acase['employeeId'] = item.employeeId ? item.employeeId : (item.personalDetails ? item.personalDetails.empid : '');
      //       // acase['employeeId'] = item.personalDetails ? item.personalDetails.empid : '';;
      //       acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
      //       if (item.package) {
      //         acase['packageName'] = item.package.name;
      //         acase['packageComponents'] =
      //           item.package.clientContractPackageComponents;
      //         acase['clientContractId'] = item.package.clientContract;
      //       } else if (item.profile) {
      //         acase['profileName'] = item.profile.name;
      //         acase['profileComponents'] =
      //           item.profile.clientContractProfileComponents;
      //         acase['clientContractId'] = item.profile.clientContract;
      //       } else {
      //         acase['componentsToCheck'] = item.componentsToCheck;
      //       }
      //       console.log("Test Item:",item.moveToDraft);
      //       if(item.moveToDraft != null){
      //         this.draftdataSource.data.push(acase)
      //         this.draftdataSource._updateChangeSubscription();
      //       } else{
      //         this.dataSource.data.push(acase);
      //         this.dataSource._updateChangeSubscription();

      //       }
      //     }
      //     this.dataSource._updateChangeSubscription();
      //     this.draftdataSource._updateChangeSubscription();
      //   },
      //   (error) => {}
      // );
      
      this.loadCasesWithStatus('INPUTQC-REJECTED');
      this.loadCasesWithStatus('DE-ALLOCATED');

  this.checkScreenSize()
     
    }
    private loadCasesWithStatus(status: string): void {
      this.caseUploadService.findCasesWithStatus(status).subscribe(
        (response) => {
          response.forEach((item: any, index: number) => {
            let acase: any = {}; // Define acase with any type
            
            // Map response data to the acase object
            console.log("item: ",item);
            acase['case_id'] = item._id;
            acase['caseId'] = item.caseId;
            acase['candidateName'] = item.candidateName;
            acase['clientId'] = item.client ? item.client._id : '';
            acase['clientName'] = item.client ? item.client.name : '';
            acase['subclientId'] = item.subclient ? item.subclient._id : '';
            acase['subclientName'] = item.subclient ? item.subclient.name : '';
            acase['initiationDate'] = item.initiationDate;
            acase['tatEndDate'] = item.tatEndDate;
            acase['status'] = item.status;
            acase['employeeId'] = item.employeeId ? item.employeeId : (item.personalDetails ? item.personalDetails.empid : '');
            acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
            acase['totalChecks'] = item.totalChecks
            acase['pendingChecks']= item.pendingChecks
            acase['rejectChecks'] = item.rejectChecks
            // Package or Profile Mapping
            if (item.package) {
              acase['packageName'] = item.package.name;
              acase['packageComponents'] = item.package.clientContractPackageComponents;
              acase['clientContractId'] = item.package.clientContract;
            } else if (item.profile) {
              acase['profileName'] = item.profile.name;
              acase['profileComponents'] = item.profile.clientContractProfileComponents;
              acase['clientContractId'] = item.profile.clientContract;
            } else {
              acase['componentsToCheck'] = item.componentsToCheck;
            }
    
            console.log("Item Move to Draft:", item.moveToDraft);
    
            // Push to the correct dataSource based on moveToDraft field
            if (item.moveDraft != null) {
              this.draftdataSource.data.push(acase);
            } else {
              this.dataSource.data.push(acase);
            }
          });
    
          // Update change subscriptions for both data sources
          this.dataSource._updateChangeSubscription();
          this.draftdataSource._updateChangeSubscription();
        },
        (error) => {
          // Handle error
          console.error(`Error loading cases with status ${status}`, error);
        }
      );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkScreenSize();
    }

    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 768;
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    showDetails(row:any):void{
      console.log(row._id);
      this.showDetailsFlag =true;
     this.selectedRow =row;
      let caseDetails = ({
        case_id :row.case_id,
        caseId : row.caseId,
        candidateName : row.candidateName,
        initiationDate :row.initiationDate,
        tatEndDate :row.tatEndDate,
        clientId : row.client_id,
        clientName : row.clientName,
        subclient_id : row.subclient_id, 
        subclientName : row.subclientName,

      }) 
      console.log(row);         
    
      // this.caseDetailsDataEntryService.setCaseDetails(row);
      this.caseDetailsForDataEntryNewService.setCaseDetails(row);
     
      this.router.navigate([`/home/operations/dataentry/decaselist/${row.case_id}`]);
    

     
      
    }
    
    newDataEntry(){
      this.caseUploadService.findOneDeUnAllocatedCase().subscribe(
        response=>{
  //        //console.log(response);
          if(response){
            let caseDetails:any = ({
              case_id :response._id,
              caseId : response.caseId,
              candidateName : response.candidateName,
              clientId : response.client._id,
              clientName : response.client.name,
              subclientId : response.subclient._id,
              subclientName : response.subclient.name,
            })
            if(response.package){
              caseDetails["packageName"] = response.package.name;
              caseDetails["packageComponents"] = response.package.clientContractPackageComponents;                    
              caseDetails["clientContractId"] = response.package.clientContract
            }else if(response.profile){
              caseDetails["profileName"] = response.profile.name;
              caseDetails["profileComponents"] = response.profile.clientContractProfileComponents;                    
              caseDetails["clientContractId"] = response.profile.clientContract
            }else{
              caseDetails["componentsToCheck"] = response.componentsToCheck;
            }                
            this.caseDetailsDataEntryService.setCaseDetails(caseDetails);
            this.caseDetailsForDataEntryNewService.setCaseDetails(caseDetails);
  //          this.router.navigate(['dataentry/personaldetailsdataentry/false']);
  //          this.router.navigate(['dataentry/dataentrycomponentlist']);
            this.router.navigate([`home/dataentry/dataentryall/add`]);
  
          }else{
            this.showMessage("No new case available for data entry");
          }
        },
      
        error=>{
          this.showError(error.error.message);
        }
        
      )
    }
    detailsButtonClicked(rejectedItem:any){
  //    this.caseDetailsForDataEntryService.setCaseInputqcStatus("INPUTQC-COMPLETED");
      this.caseDetailsDataEntryService.setCaseDetails(rejectedItem);
      this.caseDetailsForDataEntryNewService.setCaseDetails(rejectedItem);
      //console.log("Anna rejecteditem is ",rejectedItem);
  //    //console.log(this.caseDetailsDataEntryService.readRequireditems());
  //    this.router.navigate([`dataentry/personaldetailsdataentry/true`])    
      this.router.navigate([`dataentry/dataentryall/modify`]);
    }
    detailsButtonOfHeldbackClicked(heldbackItem:any){
      this.caseDetailsDataEntryService.setCaseDetails(heldbackItem);
      this.caseDetailsForDataEntryNewService.setCaseDetails(heldbackItem);
      //console.log("Anna heldbackitem is ",heldbackItem);
  //    //console.log(this.caseDetailsDataEntryService.readRequireditems());
  //    this.router.navigate([`dataentry/personaldetailsdataentry/false`])        
      this.router.navigate([`dataentry/dataentryall/modify`]);
    }
    applyFilterRejectedCases(event:any){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();    
    }    
    applyFilterHeldbackCases(event:any){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();    
    }  
    exportHeldbackCasesToExcel(){
      const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Heldback Cases');
  
      /* save to file */
      XLSX.writeFile(wb, 'HeldbackCases.xlsx');    
    }
    exportRejectedCasesToExcel(){
      const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Rejected Cases');
  
      /* save to file */
      XLSX.writeFile(wb, 'RejectedCases.xlsx');    
    }  
    showMessage(msg:any){
      this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
    }
    showError(msg:any){
      this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
    }


    getClassToApply(item: { status: string | number | Date; }) {
      // console.log("status:",item.status);

      if (item.status == "INPUTQC-REJECTED") {
        return 'red'
      } 
      else {
        return 'black'
      }
    }

}
