import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { VibeReportService } from '../service/vibe-report.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'src/app/administration/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tl-pending-report',
  templateUrl: './tl-pending-report.component.html',
  styleUrls: ['./tl-pending-report.component.scss']
})
export class TlPendingReportComponent {

  resourceLoaded:boolean=true
  dateFrom!:Date | null
  dateTo!:Date | null
  reportType:string="PENDING"
  constructor(
    private location:Location,
    private activatedRoute:ActivatedRoute,
    private vibeReportService:VibeReportService,
    private snackBar:MatSnackBar,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'completed'){
      this.dateFrom = new Date()
      this.dateFrom.setDate(1)
      this.dateFrom.setHours(0)
      this.dateFrom.setMinutes(0)
      this.dateFrom.setSeconds(0)
      this.dateFrom.setMilliseconds(0)
      this.dateTo = new Date()
      if(this.dateTo.getMonth() == 1 || this.dateTo.getMonth() ==3 || this.dateTo.getMonth() == 5 || this.dateTo.getMonth() ==7 || this.dateTo.getMonth() ==8 || this.dateTo.getMonth() == 10 || this.dateTo.getMonth() == 12){
        this.dateTo.setDate(31)
      }else if(this.dateTo.getMonth() == 4 || this.dateTo.getMonth() ==6 || this.dateTo.getMonth() == 9 || this.dateTo.getMonth() ==11){
        this.dateTo.setDate(30)
      }else{
        this.dateTo.setDate(28)
      }
      this.dateTo.setMinutes(59)
      this.dateTo.setHours(23)
      this.dateTo.setSeconds(59)
      this.dateTo.setMilliseconds(9999)
      this.reportType='COMPLETED'
      this.generateReport()
    }else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'pending'){
      this.reportType='PENDING'
      this.generateReport()
    }
  }
  backButtonClicked(){
    this.location.back()
  }
  generateReport(){
    if(this.reportType == 'PENDING'){
      this.resourceLoaded = false
/*      this.userService.getCurrentUser().subscribe(
        userServiceResponse=>{
          this.vibeReportService.generateTlPendingReportNew(userServiceResponse._id).subscribe(
            response=>{
              //console.log(response);
              FileSaver.saveAs(response.body,`tl_pending.xlsx`);
              this.resourceLoaded = true
            },
            error=>{
              this.showError("Error downloading TL Pending Report")
            }

          )
        },
        error=>{
          this.showError("Could not get User Details")
        }

      )*/
      this.vibeReportService.generateTlPendingReport(this.reportType).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`Tl_Master_pending.csv`);
          this.resourceLoaded = true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    } else{
      this.resourceLoaded = false
/*      this.userService.getCurrentUser().subscribe(
        userServiceResponse=>{
          this.vibeReportService.generateTlCompletedReportNew(userServiceResponse._id,this.dateFrom,this.dateTo).subscribe(
            response=>{
              //console.log(response);
              FileSaver.saveAs(response.body,`tl_completed.xlsx`);
              this.resourceLoaded = true
            },
            error=>{
              this.showError("Error downloading TL Pending Report")
            }

          )
        },
        error=>{
          this.showError("Could not get User Details")
        }

      )*/


      this.vibeReportService.generateTlCompletedReport(this.reportType,this.dateFrom,this.dateTo).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`Tl_Master_completed.csv`);
          this.resourceLoaded = true
        },
        error=>{
          //console.log("Error from jasper server ",error);
        })
    }
/*      this.vibeReportService.generateSampleWordReport().subscribe(
        (response:HttpResponse<Blob>)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`sample_word_report.xlsx`);
        },
        error=>{
          //console.log("Error from jasper server ",error);
      })  */

  }
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
}
