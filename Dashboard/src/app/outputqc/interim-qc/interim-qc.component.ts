import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { CompanyService } from 'src/app/masters/service/company.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';


interface InterimqcItem {
  case_id?: string;
  caseId?: string;
  subclientName?: string;
  client_id?: string;
  clientName?: string;
  tatEndDate?: Date;
  candidateName?: string;

}




@Component({
  selector: 'app-interim-qc',
  templateUrl: './interim-qc.component.html',
  styleUrls: ['./interim-qc.component.scss']
})
export class InterimQcComponent {
  showDetailsFlag:boolean = false;
  selectedRow:any;
  displayedColumns: string[] = ['serialNumber','caseId','candidateName','clientName','subclientName','tatEndDate'];
  dataSource: MatTableDataSource<InterimqcItem>;
  totalCount = 0;
  pageCount = 0;
  currentPageNumber=1;
  pageSize=0;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private caseUploadService:CaseUploadService,
    private router:Router,
    private snackBar:MatSnackBar,
    private location:Location
  ) {


    this.dataSource = new MatTableDataSource();

  }
  ngOnInit(): void {
    console.log("ngOnInit is called");
    this.findComponentsForInterimqc();
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


  addCompanyDetailsClicked() {

  
  }

  showDetails(row:any):void{
    // console.log('show details', row._id);
    
    // this.showDetailsFlag =true;
    // this.router.navigate([`home/masters/companydetails/${row._id}`]);
    // this.companyService.findOneCompany(row._id).subscribe(
    //   response  => {
    //     this.selectedRow = response
    //   }, error => {
    //     console.log('error ', error);
    //   }
    // )
    // this.selectedRow =row;
  }

  // findComponentsForInterimqc(){
  //   this.caseUploadService.findAllCasesWithInterimStatusForMe("MENTOR-REVIEW-ACCEPTED",this.currentPageNumber,this.pageSize).subscribe(
  //     response=>{
  //       this.totalCount = response.totalCount
  //       let  resp = response.resp
       
  //       console.log("resp[0]",resp[0]);
       
      
  //       // Assuming you have cleared the existing data before adding new items
  //       this.dataSource.data = [];
        
  //       resp.forEach((item: { _id: any; caseId: any; subclient: { name: any; }; client: { _id: any; name: any; }; tatEndDate: any; candidateName: any; })=>{

  //         console.log('Item:', item);
  //           let interimqcItem: InterimqcItem = {
              
  //             case_id: item._id ? item._id : '',
  //             caseId: item.caseId?item.caseId:'' ,
  //             subclientName: item.subclient ? item.subclient.name : '',
  //             client_id: item.client._id ?item.client._id:'',
  //             clientName: item.client.name ?item.client.name:'' ,
  //             tatEndDate: item.tatEndDate ?item.tatEndDate:'',
  //             candidateName: item.candidateName ? item.candidateName:'',

  //           };
  //         this.dataSource.data.push(interimqcItem)
                   
  //       })
  //       this.dataSource._updateChangeSubscription() 

  //     },
  //     error=>{
  //       console.log(`Error in findComponentsForInterimqc ${error}`)
  //     }
  //   )
  // }
  findComponentsForInterimqc() {
    this.caseUploadService.findAllCasesWithInterimStatusForMe("MENTOR-REVIEW-ACCEPTED", this.currentPageNumber, this.pageSize).subscribe(
      response => {
        this.totalCount = response.totalCount;
        let resp = response.resp;
  
        // Clear the existing data
        this.dataSource.data = [];
  
        // resp.forEach((item: any) => {
        //   // Check if the _id property exists before accessing it
        //   let interimqcItem: InterimqcItem = {
        //     case_id: item._id ? item._id : '',
        //     caseId: item.caseId ? item.caseId : '',
        //     subclientName: item.subclient ? item.subclient.name : '',
        //     client_id: item.client ? item.client._id : '',
        //     clientName: item.client ? item.client.name : '',
        //     tatEndDate: item.tatEndDate ? item.tatEndDate : '',
        //     candidateName: item.candidateName ? item.candidateName : '',
        //   };
  
        //   this.dataSource.data.push(interimqcItem);
        // });

        resp.forEach((item: any) => {
          let interimqcItem: InterimqcItem = {
            case_id: item._id || '',
            caseId: item.caseId || '',
            subclientName: item.subclient ? item.subclient.name : '' ,
            client_id: item.client,
            clientName:item.client ? item.client.name : '',
            tatEndDate: item.tatEndDate || '',
            candidateName: item.candidateName || '',
          };
        
          this.dataSource.data.push(interimqcItem);
        });
  
        this.dataSource._updateChangeSubscription();
  
      },
      error => {
        console.error(`Error in findComponentsForInterimqc ${error}`);
        // Handle error appropriately
      }
    );
  }
  

  checkAndUpdate(interimqcItem: InterimqcItem){
    let promise = new Promise((resolve,reject)=>{
      let found = false;
      for(let i=0; i < this.dataSource.data.length;i++){
        let searchItem = this.dataSource.data[i];
        if(interimqcItem.caseId == searchItem.caseId){
          found = true;
        }
      }
      if(!found){
        this.dataSource.data.push(interimqcItem);
        this.dataSource._updateChangeSubscription();
      }
    })
    return promise;
  }
  backButtonClicked(){
    this.location.back();
  }
  detailsButtonClicked(interimqcItem: { colorCodes: any; case_id: any; caseId: any; candidateName: any; client_id: any; clientName: any; subclient_id: any; subclientName: any; }){
    console.log("selected intermqc item is ",interimqcItem);
    console.log('intermqc item color codes is ',interimqcItem.colorCodes)
    let caseDetails = ({
      case_id :interimqcItem.case_id,
      caseId : interimqcItem.caseId,
      candidateName : interimqcItem.candidateName,
      clientId : interimqcItem.client_id,
      clientName : interimqcItem.clientName,
      subclientId : interimqcItem.subclient_id,
      subclientName : interimqcItem.subclientName,
      colorCodes:interimqcItem.colorCodes
    })    
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails)
    this.router.navigate([`outputqc/interimqccomponentlist`])

  }
  getClassToApply(item: { tatEndDate: string | number | Date; }){
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
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cases in Interimqc');
  
    /* save to file */
    XLSX.writeFile(wb, 'CasesInInterimqc.xlsx');    
  }  
  loadMoreClicked(){
    this.pageCount = this.pageCount + 1
    this.findComponentsForInterimqc()
  }
  

  
  showMessage(msg:any){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  

  getCurrentPageNumber() {
    console.log("getCurrentPageNumber is called");
    
    this.pageSize = this.paginator.pageSize;

    this.currentPageNumber = this.paginator.pageIndex + 1; 
    console.log("page size",this.pageSize);
    
    console.log('Current Page Number:', this.currentPageNumber);
    this.findComponentsForInterimqc();
  }




}
