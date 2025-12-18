import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { DownloadWordReportService } from 'src/app/reports/service/download-word-report.service';
import * as FileSaver from 'file-saver';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { GridAreaStyleBuilder } from '@angular/flex-layout/grid/typings/area/area';
import { isNgTemplate } from '@angular/compiler';
import { table } from 'console';
import { MatTabBody } from '@angular/material/tabs';
import { ColorMasterService} from 'src/app/administration/service/color-master.service';

import { VibeReportService } from 'src/app/reports/service/vibe-report.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadPdfReportComponent } from 'src/app/reports/upload-pdf-report/upload-pdf-report.component';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { ComponentAccessService } from 'src/app/service/component-access.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';

@Component({
  selector: 'app-update-lhs-list',
  templateUrl: './update-lhs-list.component.html',
  styleUrls: ['./update-lhs-list.component.scss']
})
export class UpdateLhsListComponent {

  showDetailsFlag:boolean = false;
  selectedRow:any;
  showDeleteDiv=false
  allJpegs! :any[]
  showDownloadDiv=false
  showConversionDiv=false
  selectedItem:any
  showDownloadReportDialog=false
  conversionPending=true
  resourceLoaded:boolean=true
  caseIdForReport :any;
  pageCount = 0;
  totalCount = 0;
  displayedColumns = ['serialNumber','caseId','candidateName','client','subclient','tatEndDate','componentDisplayName','displayStatus']
  dataSource = new MatTableDataSource<any>();
  colors:any[]=[]
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(
    private componentDetailsForVerification:ComponentDetailsForVerificationService,
    private caseUploadService:CaseUploadService,
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private downloadWordReportService:DownloadWordReportService,
    private vibeReportSerice:VibeReportService,
    private dialog:MatDialog,
    private colorMasterService:ColorMasterService,
    private location:Location,
    private router:Router,
    private snackBar:MatSnackBar,
    private componentAccessService:ComponentAccessService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,  
  ) { }

  ngOnInit(): void {
    this.componentAccessService.readAllForAUser().subscribe(
      response=>{
        response.forEach(item1=>{
            this.componentDataService.findComponentsFor(item1.component.name,'UPDATE-LHS').subscribe(
              response2=>{
                  response2.forEach(item2=>{
                  let verificationItem:any = ({

                  })
                  //console.log(item2.case.subclient.client.name);
                  //console.log('item 2 contains color codes',item2.case.subclient.client.colorCodes);
                  //console.log('component type is ',item1.type);
                  verificationItem["_id"] = item2._id;
                  verificationItem["caseId"] = item2.case.caseId;
                  verificationItem["case_id"]=item2.case._id;
                  verificationItem["candidateName"]= item2.case.candidateName;
                  verificationItem["component_id"]=item1.component._id;
                  verificationItem["componentName"] = item1.component.name;
                  verificationItem["componentDisplayName"] = item1.component.displayName;
                  verificationItem["componentType"] = item1.component.type;
                  verificationItem["tatEndDate"]=item2.case.tatEndDate;
                  verificationItem["clientName"]=item2.case.subclient.client.name;
                  verificationItem["subclientName"]=item2.case.subclient.name;
                  verificationItem["colorCodes"]=item2.case.subclient.client.colorCodes;
                  verificationItem["displayStatus"]=item2.status =="UPDATE-LHS" ? "Update LHS" :"Not Known";
                  this.dataSource.data.push(verificationItem);
                })
                this.dataSource._updateChangeSubscription();
              },
              error=>{
                //console.log(error.error.message);
              }
            
            )

        })
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;                               
      },
      error=>{
        //console.log(error);
      }
    )
  }



  backButtonClicked(){
    this.location.back();
  }



  




  showDetails(row:any):void{
    console.log('show details', row._id);
    
    this.showDetailsFlag =true;
    // this.router.navigate([`home/masters/companydetails/${row._id}`]);
    // this.companyService.findOneCompany(row._id).subscribe(
    //   response  => {
    //     this.selectedRow = response
    //   }, error => {
    //     console.log('error ', error);
    //   }
    // )
   
    this.selectedRow =row;
    let caseDetails = ({
      case_id :row.case_id,
      caseId : row.caseId,
      candidateName : row.candidateName,
      clientId : row.client_id,
      clientName : row.clientName,
      subclient_id : row.subclient_id,
      subclientName : row.subclientName,
      colorCodes:row.colorCodes,
      component_id:row.component_id,
      displayStatus:row.displayStatus =="UPDATE-LHS" ? "Update LHS" :"Not Known",
      componentName:row.componentName,
      tatEndDate:row.tatEndDate,
      _id:row._id,
      componentDisplayName:row.componentDisplayName,
      componentType:row.componentType,




    })      
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails);
    this.router.navigate([`/home/verification/updatelhsdetails`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
