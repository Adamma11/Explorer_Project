import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/administration/service/user.service';
import { DownloadWordReportService } from 'src/app/reports/service/download-word-report.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface UserData {
  _id: string;
  caseId:string,
  candidateName:string,
  employeeId:string,
  clientName:string,
  subclientName:string,
  initiationDate:any
  tatEndDate:any,
  displayStatus:string,
  completionDate?:any,
  details?:string,
  client_id?:any,
  status?:any
}


@Component({
  selector: 'app-utilities-case-status',
  templateUrl: './utilities-case-status.component.html',
  styleUrls: ['./utilities-case-status.component.scss']
})
export class UtilitiesCaseStatusComponent {

  showDetailsFlag: boolean = false;
  selectedRow: any;
  pageCount:number = 0;
  collection: any;
  p!: number;
  totalCount!: number;
  nameSearchValue!: string;
  caseIdSearchValue!: string;
  initiationStartDateSearchValue!: string;
  initiationEndDateSearchValue!: string;
  requiredCases:string="-1"
  startDate!: null;
  endDate!: null;
  xlsData:any[]=[]
  dataSource: MatTableDataSource<UserData>;
  displayedColumns = ['serialNumber','caseId','candidateName','employeeId','clientName','subclientName','initiationDate','tatEndDate','displayStatus','completionDate']
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  tableDataLoaded: boolean = false;

  constructor(
    private caseUpoadService:CaseUploadService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private downloadReportService:DownloadWordReportService,
    private userService:UserService,
    private router:Router,
    private location:Location,
  ){
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  caseTypeSelctionChanged(event:any){
    // if(this.requiredCases == 'PENDING'){
    //   this.pageCount = 0;
    //   this.totalCount = 0;
    //   this.searchPendingCases();
    // }
  }

  initializeDataSource(){
    this.dataSource.data.splice(0,this.dataSource.data.length)
    this.dataSource._updateChangeSubscription()    
  }

  ngOnInit(){
    // this.searchByCaseIdButtonClicked()
  }

  searchByCaseIdButtonClicked(){
    this.caseUpoadService.searchByCaseIdNoRestrictions(this.caseIdSearchValue,this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        let resp = response.resp;
        console.log("tets",resp);
        let acase = resp.map((item: any) => ({
          
          
          _id: item._id,
          caseId: item.caseId,
          candidateName: item.candidateName,
          clientName: item.subclient.client.name,
          subclientName: item.subclient.name,
          initiationDate: item.initiationDate,
          client_id: item.subclient.client._id,
          tatEndDate: item.tatEndDate,
          displayStatus: item.status == 'OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
          status: item.status,
          employeeId: item.employeeId,
        }));
        this.tableDataLoaded = true;

        this.dataSource.data = acase;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error=>{
        // this.showError("Error reading cases");
      }
    )         
  }

  showDetails(row:any){
    console.log('row === ', row);
    this.selectedRow = row;
    this.showDetailsFlag = true;
    this.componentDetailsForVerificationService.setVerificationItem(row)
    const columnToToggle = ['employeeId','clientName','subclientName','initiationDate','tatEndDate','displayStatus','completionDate'];
    columnToToggle.forEach(column => {
    const columnIdx = this.displayedColumns.indexOf(column);
    if (columnIdx !== -1) {
      this.displayedColumns.splice(columnIdx, 1);
    }
  });
    this.table.renderRows();
    // this.componentDetailsForVerificationService.setVerificationItem(row)
    // this.router.navigate([``]);
    this.router.navigate([`home/crm/utilitiescasestatuscomponetlist`]);

  }

}
