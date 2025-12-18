import { Component, OnInit, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { UserService } from 'src/app/administration/service/user.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service'; 
import { DownloadWordReportService } from 'src/app/reports/service/download-word-report.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { VibeReportService } from 'src/app/reports/service/vibe-report.service';
import { SubclientService } from 'src/app/administration/service/subclient.service';
import { EducationRequestForPaymentService } from 'src/app/operations/data-entry/service/education-request-for-payment.service';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Client } from 'src/app/administration/model/client';

@Component({
  selector: 'app-new-case-status',
  templateUrl: './new-case-status.component.html',
  styleUrls: ['./new-case-status.component.scss']
})
export class NewCaseStatusComponent {

  filteredOptions!: Observable<any[]>;
  clients:any[]=[]
  requiredClient = new FormControl('');
  resourceLoaded :boolean = true
  pageCount:number = 0;
  collection: any;
  p!: number;
  totalCount!: number;
  nameSearchValue!: string;
  caseIdSearchValue!: string;
  initiationStartDateSearchValue!: Date | null;
  initiationEndDateSearchValue!:Date | null;
  requiredCases:string="-1"
  startDate!:Date|null;
  endDate!:Date|null;
  xlsData:any[]=[]
  tatEndDate?: Date;
  colorCodes!: any[];
  tatStartDate?: Date;
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['serialNumber','caseId','candidateName','employeeId','clientName','subclientName','initiationDate','tatEndDate','completionDate']
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  selectedRow:any; 
  showDetailsFlag:boolean = false;
  constructor(
    private caseUpoadService:CaseUploadService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private downloadReportService:DownloadWordReportService,
    private vibeReportService:VibeReportService,
    private userSubclientAccessService:UserSubclientAccessService,
    private userService:UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private location:Location,
    private snackBar:MatSnackBar
  ) { 
  // this.requiredClient = new FormGroup({
    
  // })

  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('reportType')=='initiationDate'){
      this.requiredCases="INITIATION-DATE"
      this.pageCount = 0;
      this.totalCount = 0;
      this.initiationStartDateSearchValue = new Date()
      this.initiationStartDateSearchValue.setDate(1)
      this.initiationStartDateSearchValue.setHours(0)
      this.initiationStartDateSearchValue.setMinutes(0)
      this.initiationStartDateSearchValue.setSeconds(0)
      this.initiationStartDateSearchValue.setMilliseconds(0)
      this.initiationEndDateSearchValue = new Date()
      if(this.initiationEndDateSearchValue.getMonth() == 1 || this.initiationEndDateSearchValue.getMonth() ==3 || this.initiationEndDateSearchValue.getMonth() == 5 || this.initiationEndDateSearchValue.getMonth() ==7 || this.initiationEndDateSearchValue.getMonth() ==8 || this.initiationEndDateSearchValue.getMonth() == 10 || this.initiationEndDateSearchValue.getMonth() == 12){
        this.initiationEndDateSearchValue.setDate(31)
      }else if(this.initiationEndDateSearchValue.getMonth() == 4 || this.initiationEndDateSearchValue.getMonth() ==6 || this.initiationEndDateSearchValue.getMonth() == 9 || this.initiationEndDateSearchValue.getMonth() ==11){
        this.initiationEndDateSearchValue.setDate(30)
      }else{
        this.initiationEndDateSearchValue.setDate(28)
      }
      this.initiationEndDateSearchValue.setMinutes(59)
      this.initiationEndDateSearchValue.setHours(23)
      this.initiationEndDateSearchValue.setSeconds(59)
      this.initiationEndDateSearchValue.setMilliseconds(9999)
      this.searchByInitiationDate()
    }else if(this.activatedRoute.snapshot.paramMap.get('reportType')=='completionDate'){

      this.requiredCases="COMPLETED"
      this.pageCount = 0;
      this.totalCount = 0;
      this.startDate = new Date()
      this.startDate.setDate(1)
      this.startDate.setHours(0)
      this.startDate.setMinutes(0)
      this.startDate.setSeconds(0)
      this.startDate.setMilliseconds(0)
      this.endDate = new Date()
      if(this.endDate.getMonth() == 1 || this.endDate.getMonth() ==3 || this.endDate.getMonth() == 5 || this.endDate.getMonth() ==7 || this.endDate.getMonth() ==8 || this.endDate.getMonth() == 10 || this.endDate.getMonth() == 12){
        this.endDate.setDate(31)
      }else if(this.endDate.getMonth() == 4 || this.endDate.getMonth() ==6 || this.endDate.getMonth() == 9 || this.endDate.getMonth() ==11){
        this.endDate.setDate(30)
      }else{
        this.endDate.setDate(28)
      }
      this.endDate.setMinutes(59)
      this.endDate.setHours(23)
      this.endDate.setSeconds(59)
      this.endDate.setMilliseconds(9999)
      this.searchByCompletionDate()
    }else if(this.activatedRoute.snapshot.paramMap.get('reportType')=='pending'){
      this.requiredCases="PENDING"
      this.pageCount = 0;
      this.totalCount = 0;
      this.searchPendingCases()
    }
    this.userSubclientAccessService.findAllSubclientsForMe().subscribe(
      response=>{
        //console.log("got the subclients",response)
        response.forEach(item=>{
          let found = false
          for(let i=0; i < this.clients.length;i++){
            let clientItem = this.clients[i]
            if(item.subclient.client._id.toString() == clientItem._id.toString()){
              found = true
              break;
            }
          }
          if(!found){
            let client = ({
              _id : item.subclient.client._id,
              name : item.subclient.client.name
            })
            this.clients.push(client)
          }
        })
      }, 
      error=>{
        this.showError("Error getting the clients for the user")
      }
    )
    this.filteredOptions = this.requiredClient.valueChanges
      .pipe(
        startWith(''),
        // map(value => this._filter(value))
        map(value => (value !== null ? this._filter(value) : []))
      );

  }
  displayFn(client: any): string {
    return client && client.name ? client.name : '';
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  ngAfterViewInit(){

  }
  caseTypeSelctionChanged(event:any){
    // if(this.requiredCases == 'PENDING'){
    //   this.pageCount = 0;
    //   this.totalCount = 0;
    //   this.searchPendingCases();
    // }
  }
  searchPendingCases(){
    //console.log("About to fetch pending cases");
    let count = 0;
    let empty = false;
    //console.log("Required client value is  ",this.requiredClient.value)
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        //console.log("Required client value is not null")
        // local_client_id = this.requiredClient.value._id
        this.requiredClient.valueChanges.subscribe((value:any) =>{
          local_client_id = value!._id
        })
      }
      //console.log("local_client_id is ",local_client_id)
    this.caseUpoadService.findAllPendingCases(local_client_id,this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        console.log("response",response)
        let resp = response.resp
        if(response.length == 0){
          empty = true;
        }else{
          //console.log('Pending Cases ',response);
          resp.forEach((item: { _id: any; caseId: any; candidateName: any; subclient: { client: { _id: any; name: any; colorCodes: any; };  name: any; }; initiationDate: any; tatEndDate: any;outputqcCompletionDate:any; status: string; invoiceDate: any; invoiceNumber: any; })=>{
            let acase = ({
              _id: item._id,
              caseId:item.caseId,
              candidateName:item.candidateName,
              clientName:item.subclient.client.name,
              subclientName:item.subclient.name,
              initiationDate:item.initiationDate,
              tatEndDate:item.tatEndDate,
              colorCodes: item.subclient.client.colorCodes,
              outputqcCompletionDate:item.outputqcCompletionDate,
              displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
              status:item.status,
              invoiceDate: item.invoiceDate,
              invoiceNumber: item.invoiceNumber,
            })
            this.dataSource.data.push(acase);
            this.dataSource._updateChangeSubscription();
          })
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

      },
      error=>{
        //console.log('error fetching pending cases');
      }
    )
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;


  }
  backButtonClicked(){
    this.location.back();
  }
  detailsButtonClicked(item: { _id: any; caseId: any; candidateName: any; client_id: any; clientName: any; subclient_id: any; subclientName: any;colorCodes:any }){
    //console.log("selected outputqc item is ",item);
    let caseDetails = ({
      case_id :item._id,
      caseId : item.caseId,
      candidateName : item.candidateName,
      clientId : item.client_id,
      clientName : item.clientName,
      subclientId : item.subclient_id,
      subclientName : item.subclientName,
     colorCodes:item.colorCodes
    })
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails)
    this.router.navigate([`crm/newcaseComplist`])
  }
  initializeDataSource(){
    this.dataSource.data.splice(0,this.dataSource.data.length)
    this.dataSource._updateChangeSubscription()
  }
  searchByNameButtonClicked(){
    this.initializeDataSource()
    this.searchByName()
  }
  searchByName(){
    if(this.nameSearchValue == null){
      this.showError('Type a name to search for');
    }else{
      this.caseUpoadService.searchByName(this.nameSearchValue,this.pageCount).subscribe(
        response=>{
          this.totalCount = response.totalCount
          let resp = response.resp
          resp.forEach((item: { _id: any; caseId: any; candidateName: any; subclient: { client: { _id: any; name: any; colorCodes: any; }; name: any; }; initiationDate: any; tatEndDate: any;outputqcCompletionDate:any; status: string; employeeId: any; invoiceDate: any; invoiceNumber: any; })=>{
            let acase = ({
              _id: item._id,
              caseId:item.caseId,
              candidateName:item.candidateName,
              clientName:item.subclient.client.name,
              subclientName:item.subclient.name,
              initiationDate:item.initiationDate,
              tatEndDate:item.tatEndDate,
              colorCodes: item.subclient.client.colorCodes,
              outputqcCompletionDate:item.outputqcCompletionDate,
              displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
              status:item.status,
              employeeId:item.employeeId,
              invoiceDate: item.invoiceDate,
              invoiceNumber: item.invoiceNumber,
            })
            this.dataSource.data.push(acase);
            this.dataSource._updateChangeSubscription();
          })
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error=>{
          this.showError("Error reading cases");
        }
      )
    }
  }
  searchByInitiationDateButtonClicked(){
    this.initializeDataSource()
    this.searchByInitiationDate();
  }
  searchByInitiationDate(){
    if(this.initiationStartDateSearchValue == null){
      this.showError('Enter Initiation Date');
    }else{
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        this.requiredClient.valueChanges.subscribe((value:any) =>{
          local_client_id = value!._id
        })
      }
      //console.log("local_client_id is ",local_client_id)
      this.caseUpoadService.searchByInitiationDate(this.initiationStartDateSearchValue,this.initiationEndDateSearchValue,local_client_id,this.pageCount).subscribe(
        response=>{
          //console.log(response);
          let resp = response.resp
          this.totalCount = response.totalCount
          resp.forEach((item: { _id: any; caseId: any; candidateName: any; subclient: { client: { _id: any; name: any; colorCodes: any; }; name: any; }; initiationDate: any; tatEndDate: any;outputqcCompletionDate:any; status: string; employeeId: any; invoiceDate: any; invoiceNumber: any; })=>{
            let acase = ({
              _id: item._id,
              caseId:item.caseId,
              candidateName:item.candidateName,
              clientName:item.subclient.client.name,
              subclientName:item.subclient.name,
              initiationDate:item.initiationDate,
              tatEndDate:item.tatEndDate,
              colorCodes: item.subclient.client.colorCodes,
              outputqcCompletionDate:item.outputqcCompletionDate,
              displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
              status:item.status,
              employeeId:item.employeeId,
              invoiceDate: item.invoiceDate,
              invoiceNumber: item.invoiceNumber,
            })
            this.dataSource.data.push(acase);
            this.dataSource._updateChangeSubscription();
          })
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error=>{
          this.showError("Error reading cases");
        }
      )
    }
  }
  searchByCompletionDateButtonClicked(){
    this.initializeDataSource()
    this.searchByCompletionDate()
  }
  searchByCompletionDate(){
    if(this.startDate == null || this.endDate == null){
      this.showError('Both Start Date and End Date are mandatory');
    }else{
      //console.log("Required client value is  ",this.requiredClient.value)
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        //console.log("Required client value is not null")
        // local_client_id = this.requiredClient.value._id
        this.requiredClient.valueChanges.subscribe((value:any) =>{
          local_client_id = value!._id
        })
      }
      //console.log("local_client_id is ",local_client_id)
      this.caseUpoadService.searchByCompletionDate(this.startDate,this.endDate,local_client_id,this.pageCount).subscribe(
        response=>{
          this.totalCount = response.totalCount
          let resp = response.resp;
          resp.forEach((item: { _id: any; caseId: any; candidateName: any; subclient: { client: { _id: any; name: any; colorCodes: any; }; name: any; }; initiationDate: any; tatEndDate: any;outputqcCompletionDate:any; status: string; employeeId: any; invoiceDate: any; invoiceNumber: any; })=>{
            let acase = ({
              _id: item._id,
              caseId:item.caseId,
              candidateName:item.candidateName,
              clientName:item.subclient.client.name,
              subclientName:item.subclient.name,
              initiationDate:item.initiationDate,
              tatEndDate:item.tatEndDate,
              colorCodes: item.subclient.client.colorCodes,
              outputqcCompletionDate:item.outputqcCompletionDate,
              displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
              status:item.status,
              employeeId:item.employeeId,
              invoiceDate: item.invoiceDate,
              invoiceNumber: item.invoiceNumber,
            })
            this.dataSource.data.push(acase);
            this.dataSource._updateChangeSubscription();
          })
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error=>{
          this.showError("Error reading cases");
        }
      )
    }
  }
  searchByCaseIdButtonClicked(){
    this.caseUpoadService.searchByCaseIdNoRestrictions(this.caseIdSearchValue,this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        console.log("response",response.invoiceNumber)
        let resp = response.resp;
        resp.forEach((item: { _id: any; caseId: any; candidateName: any; subclient: { client: { _id: any; name: any; colorCodes: any; }; name: any; }; initiationDate: any; tatEndDate: any;outputqcCompletionDate:any; status: string; employeeId: any; invoiceDate: any; invoiceNumber: any; })=>{
          let acase = ({
            _id: item._id,
            caseId:item.caseId,
            candidateName:item.candidateName,
            clientName:item.subclient.client.name,
            subclientName:item.subclient.name,
            initiationDate:item.initiationDate,
            tatEndDate:item.tatEndDate,
            colorCodes: item.subclient.client.colorCodes,
            outputqcCompletionDate:item.outputqcCompletionDate,
            displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
            status:item.status,
            employeeId:item.employeeId,
            invoiceDate: item.invoiceDate,
            invoiceNumber: item.invoiceNumber,
          })
          this.dataSource.data.push(acase);
          this.dataSource._updateChangeSubscription();
        })
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },


      error=>{
        this.showError("Error reading cases");
      }
    )
  }



  async exportToExcel(){
    if(this.requiredCases == 'INITIATION-DATE'){
      this.resourceLoaded = false
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        //console.log("Required client value is not null")
        // local_client_id = this.requiredClient.value._id
        this.requiredClient.valueChanges.subscribe((value:any) =>{
          local_client_id = value!._id
        })
      }
      this.vibeReportService.generateCaseStatusReportInitiationDate(this.initiationStartDateSearchValue,this.initiationEndDateSearchValue,local_client_id).subscribe(
        (response:HttpResponse<Blob>|any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`case_status_report.xlsx`);
          this.resourceLoaded=true
        },
        error=>{
          //console.log("Error from server ",error);
        }
      )

/*      this.userService.getMyUserId().subscribe(
        response1=>{
          this.downloadReportService.downloadCaseStatusForInitiationDate(response1._id,this.initiationStartDateSearchValue,this.initiationEndDateSearchValue).subscribe(
            (response2:HttpResponse<Blob>)=>{
              FileSaver.saveAs(response2.body,'case_status.xlsx')
            },
            error=>{
              this.showError("Error getting xlsx")
            }
          )
        },
        error=>{
          this.showError("Error getting xlsx")
        }
      )*/
    }else if(this.requiredCases == 'PENDING'){
      this.resourceLoaded = false;
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        //console.log("Required client value is not null")
        // local_client_id = this.requiredClient.value._id
        this.requiredClient.valueChanges.subscribe((value:any) =>{
          local_client_id = value!._id
        })
      }
      this.vibeReportService.generateCaseStatusReportPending(local_client_id).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`case_status_report.xlsx`);
          this.resourceLoaded = true
        },
        error=>{
          //console.log("Error from server ",error);
        })
    }else if(this.requiredCases == 'COMPLETED'){
      this.resourceLoaded = false
      let local_client_id = "-"
      if(this.requiredClient.value != ""){
        //console.log("Required client value is not null")
      //  / local_client_id = this.requiredClient.value._id
      this.requiredClient.valueChanges.subscribe((value:any) =>{
        local_client_id = value!._id
      })
      }
      this.vibeReportService.generateCaseStatusReportCompleted(this.startDate,this.endDate,local_client_id).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`case_status_report_now.xlsx`);
          this.resourceLoaded = true
        },
        error=>{
          //console.log("Error from server ",error);
        })
    }else{
      try{
        //console.log("About to call prepare data");
        await this.prepareData()
        //console.log("xlsx data is ",this.xlsData);
        //console.log("Got the data and prepareing xls");
        const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.xlsData);//converts a DOM TABLE element to a worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Available Checks');

        XLSX.writeFile(wb, 'AvailableChecks.xlsx');
      }catch(error){
        this.showError("Error in downloading xls");
      }

    }

  }
  prepareData(){
    return new Promise((resolve,reject)=>{
      let caseIdArray = new Array()
      this.dataSource.data.forEach(item=>{
        caseIdArray.push(item._id);
      })
      this.caseUpoadService.getDataForCaseStatus({cases:caseIdArray}).subscribe(
        response=>{
          //console.log(response);
          response.forEach(responseItem=>{
            if(responseItem.checks.length >0){
              for(let i=0; i < responseItem.checks.length;i++){
                let check = responseItem.checks[i];
                if(check.component != null){
                  responseItem[`check${i}`+ '.name'] = check.component.displayName
                }else{
                  responseItem[`check${i}`+ '.name'] = check +"." +i
                }
                responseItem[`check${i}`+ '.status'] = check.status
                //console.log('added check is ',check)
              }
              responseItem.client = responseItem.client.name
              responseItem.subclient = responseItem.subclient.name
            }
            this.xlsData.push(responseItem);
          })
          resolve(true)
        },
        error=>{
          reject()
          //console.log("Error",error);
        }
      )
    })

  }
  loadMoreClicked(){
    this.pageCount = this.pageCount + 1;
    if(this.requiredCases == 'COMPLETED'){
      this.searchByCompletionDate()
    }else if(this.requiredCases == 'INITIATION-DATE'){
      this.searchByInitiationDate()
    }else if(this.requiredCases == 'NAME-SEARCH'){
      this.searchByName()
    }else if(this.requiredCases == 'PENDING'){
      this.searchPendingCases()
    }
  }

  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }


//   showDetails(row: any): void {
//   console.log(row._id);
//   this.showDetailsFlag = true;

//    this.router.navigate([`home/crm/newcaseComplist`]);
//   // this.universityService.findOneUniversity(row._id).subscribe(
//   //   response => {
//   //     this.selectedRow = response;
//   //   },
//   //   error => {
//   //     console.log(error);
//   //   }
//   // );
// }

showDetails(row:any):void{
   console.log("selected outputqc item is ",row,row.colorCodes);

   let caseDetails = ({
    case_id :row._id,
    caseId : row.caseId,
    candidateName : row.candidateName,
    clientId : row.client_id,
    clientName : row.clientName,
    subclientId : row.subclient_id,
    subclientName : row.subclientName,
    tatStartDate: row.initiationDate,
    tatEndDate:row.tatEndDate,
     colorCodes:row.colorCodes
  })
  this.componentDetailsForVerificationService.setVerificationItem(caseDetails)
  this.router.navigate([`/home/crm/newcaseComplist`]);
}
}
function caseDetails(caseDetails: any) {
  throw new Error('Function not implemented.');
}
