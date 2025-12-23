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

interface OutputqcItem {
  case_id?: string;
  caseId?: string;
  subclient_id?: string;
  subclientName?: string;
  client_id?: string;
  clientName?: string;
  tatEndDate?: Date;
  tatStartDate?: Date;
  candidateName?: string;
  colorCodes?: string;
  allocatedTo?: string;
}



@Component({
  selector: 'app-outputqc-case-list',
  templateUrl: './outputqc-case-list.component.html',
  styleUrls: ['./outputqc-case-list.component.scss']
})
export class OutputqcCaseListComponent {
  showDetailsFlag:boolean = false;
  selectedRow:any;
  displayedColumns: string[] = ['serialNumber','caseId','candidateName','client','subclient','tatstart','tatEndDate'];
  dataSource: MatTableDataSource<OutputqcItem>;
  totalCount = 0;
  pageCount = 0;
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
  ) {


    this.dataSource = new MatTableDataSource();


  }
  ngOnInit(): void {

    this.findComponentsForOutputqc();
   
    
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
      tatStartDate: row.tatStartDate,
      tatEndDate:row.tatEndDate,

    })      
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails);
    this.router.navigate([`/home/outputqc/outputqccomponentlist`]);
  }



  findComponentsForOutputqc(){
    this.caseUploadService.findAllCasesWithStatusForMe("MENTOR-REVIEW-ACCEPTED",this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        let  resp = response.resp
        console.log("response from server",response)
        resp.forEach((item: { _id: any; caseId: any; subclient: { _id: any; name: any; }; client: { _id: any; name: any; colorCodes: any; }; tatEndDate: any;initiationDate:any; candidateName: any; })=>{

          // let outputqcItem = ({
                
          // })
          // outputqcItem["case_id"] = item._id;
          // outputqcItem["caseId"] = item.caseId;
          // outputqcItem["subclient_id"] = item.subclient._id;
          // outputqcItem["subclientName"] = item.subclient.name;
          // outputqcItem["client_id"] = item.client._id;
          // outputqcItem["clientName"] = item.client.name;
          // outputqcItem["tatEndDate"] = item.tatEndDate;
          // outputqcItem["candidateName"] = item.candidateName;
          // outputqcItem["colorCodes"]=item.client.colorCodes;
          let outputqcItem: OutputqcItem = {
            case_id: item._id,
            caseId: item.caseId,
            subclient_id: item.subclient._id,
            subclientName: item.subclient.name,
            client_id: item.client._id,
            clientName: item.client.name,
            tatEndDate: item.tatEndDate,
            tatStartDate: item.initiationDate,
            candidateName: item.candidateName,
            colorCodes: item.client.colorCodes,


          };
          // this.dataSource.data.push(OutputqcItem)
          this.dataSource.data.push(outputqcItem);
          this.dataSource._updateChangeSubscription()          
        })
//        this.dataSource.paginator = this.paginator;
//        this.dataSource.sort = this.sort;

      },
      error=>{

      }
    )
  }

  checkAndUpdate(outputqcItem: OutputqcItem){
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

  }
  detailsButtonClicked(outputqcItem: { colorCodes: any; case_id: any; caseId: any; candidateName: any; client_id: any; clientName: any; subclient_id: any; subclientName: any; }){
    //console.log("selected outputqc item is ",outputqcItem);
    console.log('Outputqc item color codes is ',outputqcItem.colorCodes)
    let caseDetails = ({
      case_id :outputqcItem.case_id,
      caseId : outputqcItem.caseId,
      candidateName : outputqcItem.candidateName,
      clientId : outputqcItem.client_id,
      clientName : outputqcItem.clientName,
      subclientId : outputqcItem.subclient_id,
      subclientName : outputqcItem.subclientName,
      colorCodes:outputqcItem.colorCodes
    })    
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails)
    this.router.navigate([`outputqc/outputqccomponentlist`])

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
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cases in Outputqc');
  
    /* save to file */
    XLSX.writeFile(wb, 'CasesInOutputqc.xlsx');    
  }  
  loadMoreClicked(){
    this.pageCount = this.pageCount + 1
    this.findComponentsForOutputqc()
  }
  
  // applyFilter(event:Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  
  showMessage(msg:any){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  


 
}
