import { Location } from '@angular/common';
import { HttpResponse,HttpErrorResponse,HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { DownloadWordReportService } from '../service/download-word-report.service';
import * as FileSaver from 'file-saver';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { GridAreaStyleBuilder } from '@angular/flex-layout/grid/typings/area/area';
import { isNgTemplate } from '@angular/compiler';
import { table } from 'console';
import { MatTabBody } from '@angular/material/tabs';
import { ColorMasterService} from 'src/app/administration/service/color-master.service';
import { VibeReportService } from '../service/vibe-report.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadPdfReportComponent } from '../upload-pdf-report/upload-pdf-report.component';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-word-report',
  templateUrl: './download-word-report.component.html',
  styleUrls: ['./download-word-report.component.scss']
})
export class DownloadWordReportComponent {
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
  displayedColumns = ['serialNumber','caseId','candidateName','client','subclient','tatEndDate','download']
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
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.colorMasterService.readAll().subscribe(
      response=>{
        this.colors = response;
      },
      error=>{
        this.showError("Error reading colors");
      }
    )
    this.findComponentsForWordReport();
  }

  findComponentsForWordReport(){
    this.caseUploadService.findAllCasesWithStatus("OUTPUTQC-ACCEPTED",this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        let resp = response.resp
        console.log("@@@@@@@@@@@@@@",resp);
        
        resp.forEach((item: { _id: any; caseId: any; subclient: { _id: any; name: any; }; client: { _id: any; name: any; colorCodes: any; }; tatEndDate: any; candidateName: any; reportType: any; })=>{
          let outputqcItem:any = ({

          })
          //console.log(item);
          outputqcItem["case_id"] = item._id;
          outputqcItem["caseId"] = item.caseId;
          outputqcItem["subclient_id"] = item.subclient._id;
          outputqcItem["subclientName"] = item.subclient.name;
          // outputqcItem["user_id"] = item.outputqcCompletedBy.user_id;
          // outputqcItem["userName"] = item.outputqcCompletedBy.name;
          outputqcItem["client_id"] = item.client._id;
          outputqcItem["clientName"] = item.client.name;
          outputqcItem["tatEndDate"] = item.tatEndDate;
          outputqcItem["candidateName"] = item.candidateName;
          outputqcItem["colorCodes"]=item.client.colorCodes;
          outputqcItem["reportType"]=item.reportType;
          this.dataSource.data.push(outputqcItem);
          this.dataSource._updateChangeSubscription();
      })
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error=>{
      this.showError("An error occured while reading cases for report")
    })

/*    this.componentService.findAllComponents().subscribe(
      response1=>{
        response1.forEach(component=>{
          this.componentDataService.findComponentsFor(component.name,'WORD-REPORT-DOWNLOAD').subscribe(
            response2=>{
              response2.forEach(item=>{
                    let outputqcItem = ({

                    })
                    //console.log(item);
                    outputqcItem["case_id"] = item.case._id;
                    outputqcItem["caseId"] = item.case.caseId;
                    outputqcItem["subclient_id"] = item.case.subclient._id;
                    outputqcItem["subclientName"] = item.case.subclient.name;
                    outputqcItem["client_id"] = item.case.subclient.client._id;
                    outputqcItem["clientName"] = item.case.subclient.client.name;
                    outputqcItem["tatEndDate"] = item.case.tatEndDate;
                    outputqcItem["candidateName"] = item.case.candidateName;
                    outputqcItem["colorCodes"]=item.case.subclient.client.colorCodes;
                    this.checkAndUpdate(outputqcItem).then(someData=>{

                    })
//                    this.dataSource.data.push(outputqcItem);
//                    this.dataSource._updateChangeSubscription();
              })
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            },
            error=>{
              this.showError(error.error.message);
            }
          )
        })
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        this.showError(error.error.message);
      }
    )*/


  }
  checkAndUpdate(outputqcItem:any){
    let promise = new Promise((resolve,reject)=>{
      let found = false;
      for(let i=0; i < this.dataSource.data.length;i++){
        let searchItem = this.dataSource.data[i];
        if(outputqcItem.caseId == searchItem.caseId){
          found = true;
        }
      }
      if(!found){
        this.dataSource.data.push(outputqcItem);
        this.dataSource._updateChangeSubscription();
      }
    })
    return promise;
  }

  backButtonClicked(){
    this.location.back();
  }
////New pdf report 1July23
// startConversionButtonClicked(item){

//   this.vibeReportSerice.convertPDfsToJpgs(item.caseId).subscribe(
//     (response:HttpResponse<Blob>)=>{
//       //console.log(response);
//       FileSaver.saveAs(response.body,`${item.caseId}.pdf`);
//       this.showDownloadDiv =false
//       this.showDeleteDiv=true
//     },

//     error=>{
//       this.showError("Error Converting PDFs")
//     }
//   )
// }
////New pdf report 1July23

  startConversionButtonClicked(item:any){
    this.selectedItem = item
    this.showDownloadReportDialog = true
    this.showConversionDiv = true
    this.showDeleteDiv=false
    this.showDownloadDiv=false
    this.conversionPending=true
    this.vibeReportSerice.convertPDfsToJpgs(item.caseId).subscribe(
      response=>{
        //console.log("Response from server ",response)
        if(response.message=='SUCCESS'){
          this.conversionPending = false
          this.showConversionDiv = false
          this.showDownloadDiv=true
          this.allJpegs = response.jpegsToDelete
        }
      },
      error=>{
        this.showError("Error Converting PDFs")
      }
    )
  }
  downloadReportButtonClicked(){
    if(this.selectedItem.client_id=='606492f37e2f346e622d5aff' || this.selectedItem.client_id=='60649e9323e15c6f745360b5' || this.selectedItem.client_id == "6065c2bda343b0a5461bff33" || this.selectedItem.client_id == "6375cf1bdaf93147973c59ca" ){
      this.vibeReportSerice.generateTCSWordReport(this.selectedItem.caseId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
          this.showDownloadDiv =false
          this.showDeleteDiv=true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    }
    // Tech Meh 
    else if(this.selectedItem.client_id == '6065850a539cbc9b9754a1f8'){
      this.vibeReportSerice.generateStandardWordTechMehReport(this.selectedItem.caseId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
          this.showDownloadDiv =false
          this.showDeleteDiv=true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    }
    // Tech Meh 
    else{
      this.vibeReportSerice.generateStandardWordReport(this.selectedItem.caseId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
          this.showDownloadDiv =false
          this.showDeleteDiv=true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    }
  }



  //new20-April-23
  downloadfinalClicked(item:any){

      this.vibeReportSerice.generateStandardFinalReport(item.case_id).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`${item.caseId}.pdf`);
          this.showDownloadDiv =false
          this.showDeleteDiv=true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    
  }
  //new20-April-23
  //new 06-jan-23 CC cases
  // downloadcc(){
  //   this.vibeReportSerice.downloadFinalReportPDF(this.selectedItem.caseId).subscribe(
  //     (response:HttpResponse<Blob>)=>{
  //       //console.log(response);
  //       FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
  //       // this.showDownloadDiv =false
  //       // this.showDeleteDiv=true
  //     },
  //     error=>{
  //       console.log("Error from jasper server ",error);
  //     })

  // }
  //new 06-jan-23 CC cases





  deleteJpegsButtonClicked(){
    this.vibeReportSerice.deleteJpegs(this.selectedItem.caseId,{jpegsToDelete:this.allJpegs}).subscribe(
      response=>{
        this.showMessage("Deletion Successful")
        this.showDownloadReportDialog=false
      },
      error=>{
        this.showMessage("Error Deleting")
      }
    )
  }
  async downloadButtonClicked(item:any){
    //console.log("report for  case id ",item.caseId);

    if(item.client_id=='606492f37e2f346e622d5aff' || item.client_id=='60649e9323e15c6f745360b5' || item.client_id == "6065c2bda343b0a5461bff33"){
      this.resourceLoaded = false
      this.vibeReportSerice.generateTCSWordReport(item.caseId).subscribe(
        (response:HttpResponse<Blob>|any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`${item.caseId}.docx`);
          this.showDownloadDiv =false
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    }else if(item.client_id=='606b00190fe1085f834a1dcb'){
      this.resourceLoaded = false
      this.vibeReportSerice.generateCGWordReport(item.caseId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          this.resourceLoaded=true
          //console.log(response);
          FileSaver.saveAs(response.body,`${item.caseId}.docx`); 
        },
        error=>{
          //console.log("Error from jasper server ",error);
      })
    }else{
      this.resourceLoaded = false
      this.vibeReportSerice.generateStandardWordReport(item.caseId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          this.resourceLoaded=true
          FileSaver.saveAs(response.body,`${item.caseId}.docx`);
        },
        error=>{
          //console.log("Error from jasper server ",error);
      })

    }
}
  //new 06-jan-23 CC cases
   downloadcc(item:any){
    this.resourceLoaded = false
    this.vibeReportSerice.downloadFinalReportPDF(item.caseId).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        //console.log(response);
        this.resourceLoaded=true
        FileSaver.saveAs(response.body,`${item.caseId}.pdf`);
        // this.showDownloadDiv =false
        // this.showDeleteDiv=true
      },
      error=>{
        console.log("Error from jasper server ",error);
      })

  }
  //new 06-jan-23 CC cases
uploadButtonClicked(item:any){
  let dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus= true;
  //console.log("Dialog Ref Contains  ",dialogConfig)
  dialogConfig.data = {
    case_id :item.case_id,
    caseId :item.caseId,
    candidateName:item.candidateName,
    reportType:item.reportType 
  }
  let dialogRef = this.dialog.open(UploadPdfReportComponent,dialogConfig)
}
getColor(grade:any):string | null{
  this.colors.forEach(item=>{
    //console.log("color code item is ",item);
    if(item._id == grade){
      return item.description;
    }
  })
  return null;
}
searchForCase(){
  this.dataSource.data.splice(0,this.dataSource.data.length);
  this.dataSource._updateChangeSubscription();
  this.caseUploadService.findACaseForReport(this.caseIdForReport,this.pageCount).subscribe(
    response=>{
      this.totalCount = response.totalCount
      let resp = response.resp
      resp.forEach((item: { _id: any; caseId: any; subclient: { _id: any; name: any; }; client: { _id: any; name: any; colorCodes: any; }; tatEndDate: any; candidateName: any; reportType: any; })=>{
        let outputqcItem:any = ({

        })
        //console.log(item);
        outputqcItem["case_id"] = item._id;
        outputqcItem["caseId"] = item.caseId;
        outputqcItem["subclient_id"] = item.subclient._id;
        outputqcItem["subclientName"] = item.subclient.name;
        // outputqcItem["user_id"] = item.outputqcCompletedBy.user_id;
        // outputqcItem["userName"] = item.outputqcCompletedBy.name;
        outputqcItem["client_id"] = item.client._id;
        outputqcItem["clientName"] = item.client.name;
        outputqcItem["tatEndDate"] = item.tatEndDate;
        outputqcItem["candidateName"] = item.candidateName;
        outputqcItem["colorCodes"]=item.client.colorCodes;
        outputqcItem["reportType"]=item.reportType;
        this.dataSource.data.push(outputqcItem);
        this.dataSource._updateChangeSubscription();
    })
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  },
  error=>{
    this.showError("An error occured while reading cases for report")
  })
}
loadMoreClicked(){
  this.pageCount = this.pageCount + 1;
  this.findComponentsForWordReport();
}
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }


  showDetails(row:any):void{
    console.log('show details', row._id);
    
    // this.showDetailsFlag =true;
    // // this.router.navigate([`home/masters/companydetails/${row._id}`]);
    // // this.companyService.findOneCompany(row._id).subscribe(
    // //   response  => {
    // //     this.selectedRow = response
    // //   }, error => {
    // //     console.log('error ', error);
    // //   }
    // // )
    // this.selectedRow =row;
    // let caseDetails = ({
    //   case_id :row.case_id,
    //   caseId : row.caseId,
    //   candidateName : row.candidateName,
    //   clientId : row.client_id,
    //   clientName : row.clientName,
    //   subclient_id : row.subclient_id,
    //   subclientName : row.subclientName,
    //   colorCodes:row.colorCodes
    // })      
    this.componentDetailsForVerification.setVerificationItem(row);
    this.router.navigate([`/home/verification/downloadwordreportnew/componentlist`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

