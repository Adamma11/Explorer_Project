import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentService } from 'src/app/administration/service/component.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-case-status-popup',
  templateUrl: './case-status-popup.component.html',
  styleUrls: ['./case-status-popup.component.scss']
})
export class CaseStatusPopupComponent {
caseId!: string;
  candidateName!: string;
  clientName!: string;
  subclientName!: string;
  maxChecks: number = 0;
  allComponentData: any[] = [];
  uploadedReportsDataSource = new MatTableDataSource();
  reportColumns = ['serialNumber', 'reportType', 'report', 'download'];

  constructor(
    public dialogRef: MatDialogRef<CaseStatusPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private componentService: ComponentService,
    private caseUploadService: CaseUploadService
  ) {}

  ngOnInit(): void {
    this.caseId = this.data.caseId;
    this.candidateName = this.data.candidateName;
    this.clientName = this.data.clientName;
    this.subclientName = this.data.subclientName;
    
    this.loadComponentData();
    this.loadReports();
  }

  loadComponentData(): void {
    this.componentService.findAllComponentDataforACase(this.data.case_id).subscribe(
      response => {
        this.allComponentData = response;
        this.allComponentData.forEach((comp: any) => {
          if (comp.status === "MENTOR-REVIEW-ACCEPTED" || comp.status === "OUTPUTQC-ACCEPTED") {
            comp.status = "COMPLETED";
          } else if (comp.status.toLowerCase().includes("insuf")) {
            comp.status = "INSUFFICIENCY";
          } else {
            comp.status = "PENDING";
          }
        });
      },
      error => {
        console.log("Error getting all components", error);
      }
    );
  }

  loadReports(): void {
    this.caseUploadService.readUploadedPdfReportFileNames(this.caseId).subscribe(
      response => {
        this.uploadedReportsDataSource.data = response;
        this.uploadedReportsDataSource._updateChangeSubscription();
      },
      error => {
        console.log("Error reading reports uploaded");
      }
    );
  }

  getGradingColor(grade: any): string {
    // Implement your grading color logic here
    // This should match the logic from your original component
    return '#6b728d'; // Default color
  }

  getFieldSize(componentField: any): number {
    return componentField.size;
  }

  downloadReportButtonClicked(item: any): void {
    this.caseUploadService.downloadPdfReport(this.caseId, item.type, item.fileName).subscribe(
      (response: HttpResponse<Blob> | any) => {
        FileSaver.saveAs(response.body, `${item.fileName}`);
      },
      error => {
        console.log("Error downloading pdf report");
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}