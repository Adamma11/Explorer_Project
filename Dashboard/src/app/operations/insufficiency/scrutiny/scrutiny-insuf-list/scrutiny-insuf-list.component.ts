import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { AllComponentsDataService } from '../../../service/all-components-data.service';
import { ComponentDataService } from '../../../service/component-data.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
// import * as XLSX from 'xlsx';

// import * as XLSX from 'xlsx';


export interface InsuffItems {
  _id: any;
  caseId: any;
  candidateName: any;
  clientName: any;
  subclientName: any;
  branch: any;
  componentDisplayName: any;
  field: any;
  displayStatus: any;
  insufficiencyRaisedDate: any;
  insufficiency: any;
}

export interface InsuffItemsCleared {
  _id: any;
  caseId: any;
  candidateName: any;
  clientName: any;
  subclientName: any;
  branch: any;
  componentDisplayName: any;
  field: any;
  displayStatus: any;
  insufficiencyRaisedDate: any;
  insufficiency: any;
  insufficiencyClearedDate: any;
}

@Component({
  selector: 'app-scrutiny-insuf-list',
  templateUrl: './scrutiny-insuf-list.component.html',
  styleUrls: ['./scrutiny-insuf-list.component.scss']
})
export class ScrutinyInsufListComponent {
  totalCount = 0;
  pageCount = 0;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  insuffClearedSelectedRow: any;
  insuffClearedShowDetailsFlag: boolean = false;
  clearance: boolean = false;
  receivedData!: any;
  selectedIndex:number = 0;
  selectedTab:string = 'INSUF-RAISED';


  insuffItemsDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiency']
  insufficienciesDataSource: MatTableDataSource<InsuffItems>;

  insuffClearedDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiencyClearedDate','insufficiency']
  insufficienciesClearedDataSource: MatTableDataSource<InsuffItemsCleared>;  
  
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private caseUploadService:CaseUploadService,
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,    
    private allComponentsDataService:AllComponentsDataService,
    private router:Router,
    ){
      this.insufficienciesDataSource = new MatTableDataSource();
      this.insufficienciesClearedDataSource = new MatTableDataSource()
    }

    ngOnInit(): void {
      this.getInsuffList()
    }

    ngAfterViewInit(): void {
      this.insufficienciesDataSource.paginator = this.paginator;
      this.insufficienciesDataSource.sort = this.sort;

      this.insufficienciesClearedDataSource.paginator = this.paginator;
      this.insufficienciesClearedDataSource.sort = this.sort;
    }
  
    applyFilter1(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.insufficienciesDataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.insufficienciesDataSource.paginator) {
        this.insufficienciesDataSource.paginator.firstPage();
      }
    }

    applyFilter2(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.insufficienciesClearedDataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.insufficienciesClearedDataSource.paginator) {
        this.insufficienciesClearedDataSource.paginator.firstPage();
      }
    }

    tabChanged(event: any) {
      this.showDetailsFlag = false;
      this.insuffClearedShowDetailsFlag = false;
      this.insuffItemsDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiency']
      this.insuffClearedDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiencyClearedDate','insufficiency']
    }

    receiveDataFromChild(data: any) {
      let indexToRemove = -1;
      if (this.selectedTab === 'INSUF-RAISED') {
         indexToRemove = this.insufficienciesDataSource.data.findIndex(item => item.caseId === data.caseId);
         if (indexToRemove !== -1) {
          this.showDetailsFlag = false;
          this.insuffItemsDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiency']
          this.table.renderRows();
          this.insufficienciesDataSource.data.splice(indexToRemove,1);
          this.insufficienciesDataSource._updateChangeSubscription();
        }
      } else {
         indexToRemove = this.insufficienciesClearedDataSource.data.findIndex(item => item.caseId === data.caseId);
         if (indexToRemove !== -1) {
          this.insuffClearedShowDetailsFlag = false;
          this.insuffClearedDisplayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiencyClearedDate','insufficiency']
          this.table.renderRows();
          this.insufficienciesClearedDataSource.data.splice(indexToRemove,1);
          this.insufficienciesClearedDataSource._updateChangeSubscription();
        }
      }
    }

    getInsuffList(){
      this.componentService.findAllComponents().subscribe(
        response1=>{
          response1.forEach(item1=>{
            this.componentDataService.findInsufficienciesForScrutiny(item1.name).subscribe(
              response2=>{
                response2.forEach(item2=>{
                  console.log(item2);
                  let insuffComponent:any = ({
                    case_id:item2.case._id,
                    caseId:item2.case.caseId,
                    candidateName:item2.case.candidateName,
                    _id:item2._id,
                    componentName:item1.name,
                    componentDisplayName:item1.displayName,
                    status:item2.status,
                    displayStatus : item2.status == 'INSUF-2-REQ' ? 'Insuf 2 Req.' : (item2.status == 'INSUF-2-CLEARED' ? 'Insuf 2 Cleared':(item2.status == 'COST-APPROVAL-REQ' ? 'Cost Approval Request':(item2.status == 'COST-APPROVAL-CLEARED' ? 'Cost Approval Cleared':(item2.status == 'CLARIFICATION-REQ' ? 'Clarification Request' :(item2.status == 'CLARIFICATION-CLEARED' ? 'Clarification,Cleared':"Insuf 1 Request Cleared"))))),
                    field:this.fillFieldDetails(item1.name,item2),
                    insufficiencyRaisedDate:item2.insufficiencyRaisedDate,
                    clientName :item2.case.subclient.client.name,
                    subclientName:item2.case.subclient.name,
                    subclient:item2.case.subclient._id,
                    branchName : item2.case.subclient.branch.name,
                    branch_id : item2.case.subclient.branch._id,
                    insufficiencyComments:item2.insufficiencyComments,
                    insufficiencyClearedComments:item2.insufficiencyClearedComments,
                    component_id :item1._id
                  })
                  if(item2.status=='INSUF-1-CLEARED' || item2.status=='INSUF-2-CLEARED'){
                    this.insufficienciesClearedDataSource.data.push(insuffComponent);
                    this.insufficienciesClearedDataSource._updateChangeSubscription();                
                  }else{
                    this.insufficienciesDataSource.data.push(insuffComponent);
                    this.insufficienciesDataSource._updateChangeSubscription();                
                  }
                })
              },
              (error:Error)=> {
                //console.log("error is ",error)
                console.log("Error loading inssufficiencies", error);
              }
            )
          })
        }
      )
    }

    fillFieldDetails(componentName:string,item:any){
      if(componentName == 'address'){
          return item.typeofaddress
       }else if(componentName == 'addresscomprehensive'){
          return item.typeofaddress
      }else if(componentName == 'addressonline'){
          return item.typeofaddress
      }else if(componentName == 'addresstelephone'){
          return item.typeofaddress
      }else if(componentName == 'bankstmt'){
          return "-"
      }else if(componentName == 'courtrecord'){
          return item.typeofaddress
      }else if (componentName == 'creditcheck'){
          return item.taxid
      }else if(componentName == 'creditequifax'){
          return item.pannumber
      }else if(componentName == 'credittrans'){
          return item.pannumber
      }else if(componentName == 'criminalrecord'){
          return item.typeofaddress
      }else if(componentName == 'directorshipcheck'){
          return item.dinnumber
      }else if(componentName == 'dlcheck'){
          return item.dlnumber
      }else if(componentName == 'drugtestfive'){
          return item.fulladdress
      }else if(componentName == 'drugtestsix'){
          return "-"
      }else if(componentName == 'drugtestseven'){
          return item.fulladdress
      }else if(componentName == 'drugtesteight'){
         return item.address
      }else if(componentName == 'drugtestnine'){
          return item.fulladdress
      }else if(componentName == 'drugtestten'){
         return item.address
      }else if(componentName == 'education'){
          item.typeofqualification
      }else if (componentName == 'educationadvanced'){
          return item.typeofqualifiction
      }else if(componentName == 'educationcomprehensive'){
          return item.typeofqualification
      }else if(componentName == 'empbasic'){
         return item.nameofemployer
      }else if(componentName == 'empadvance'){
          return item.nameofemployer
      }else if(componentName == 'employment'){
          return item.nameofemployer
      }else if(componentName == 'facisl3'){
          return item.stcode
      }else if(componentName == 'gapvnf'){
          return item.tenureofgap
      }else if(componentName == 'globaldatabase'){
          return "-"
      }else if(componentName == 'identity'){
          return item.typeofid
      }else if(componentName == 'ofac'){
          return item.ofac
      }else if(componentName == 'passport'){
          return item.passportnumber
      }else if(componentName == 'physostan'){
          return "-"
      }else if(componentName == 'refbasic'){
          return item.name
      }else if(componentName = 'reference'){
          return item.nameofreference
      }else if(componentName == 'sitecheck'){
          return item.name
      }else if(componentName == 'socialmedia'){
          return item.searchname
      }else if(componentName == 'vddadvance'){
          return item.companyname
      }else{
          return item.epicnumber
      }
    } 

    showDetails(row:any){
      // console.log('selected value', row);
      this.selectedRow = {...row, clearance: false};
      this.showDetailsFlag = true;
      const columnToToggle = ['clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiency'];
      columnToToggle.forEach(column => {
      const columnIdx = this.insuffItemsDisplayedColumns.indexOf(column);
      if (columnIdx !== -1) {
        this.insuffItemsDisplayedColumns.splice(columnIdx, 1);
      }
    });
      this.table.renderRows();
    }

    insuffClearedShowDetails(row:any){
      if (row.insufficiencyClearedComments !== undefined) {
        this.clearance = true
      }
      // console.log("row === ", row.insufficiencyClearedComments );
      this.insuffClearedSelectedRow = {...row, clearance:true};
      this.insuffClearedShowDetailsFlag = true;
      const columnToToggle = ['clientName','subclientName','branch','componentDisplayName','field','displayStatus','insufficiencyRaisedDate','insufficiencyClearedDate','insufficiency'];
      columnToToggle.forEach(column => {
      const columnIdx = this.insuffClearedDisplayedColumns.indexOf(column);
      if (columnIdx !== -1) {
        this.insuffClearedDisplayedColumns.splice(columnIdx, 1);
      }
    });
      this.table.renderRows();
    }

    exportToExcel(){
      console.log('export to excel');
      
    }
}
