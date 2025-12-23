import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { UserService } from 'src/app/administration/service/user.service';
import { AllComponentsDataService } from '../../../service/all-components-data.service';
import { ComponentDataService } from '../../../service/component-data.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
// import * as XLSX from 'xlsx';
// import { VibeReportService } from 'src/app/reports/service/vibe-report.service';
// import { HttpResponse } from '@angular/common/http';
// import * as FileSaver from 'file-saver';

export interface InsuffItems {
  _id: any;
  caseId: any;
  candidateName: any;
  clientName: any;
  subclientName: any;
  componentDisplayName: any;
  field: any;
  displayStatus: any;
  insufficiencyRaisedDate: any;
  insufficiencyComments: any;
}

@Component({
  selector: 'app-client-insuf-list',
  templateUrl: './client-insuf-list.component.html',
  styleUrls: ['./client-insuf-list.component.scss']
})
export class ClientInsufListComponent {
  totalCount = 0;
  pageCount = 0;
  subclients: any[] = []
  showDetailsFlag: boolean = false;
  selectedRow: any;
  receivedData!: any;
  displayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'componentDisplayName', 'field', 'displayStatus', 'insufficiencyRaisedDate', 'insufficiencyComments']
  dataSource: MatTableDataSource<InsuffItems>;

  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private componentService: ComponentService,
    private componentDataService: ComponentDataService,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private allComponentsDataService: AllComponentsDataService,
    private router: Router,
    private userSubclientAccesService: UserSubclientAccessService,
    private userService: UserService,
    // private vibeReportService: VibeReportService,
    ){
      this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
      this.fillData()
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

    receiveDataFromChild(data: any) {     
      let indexToRemove = this.dataSource.data.findIndex((item:any) => (item.caseId === data.caseId) && (item.componentName === data.componentName));
      // console.log(indexToRemove);
      if (indexToRemove !== -1) {
        this.showDetailsFlag = false;
        this.displayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'componentDisplayName', 'field', 'displayStatus', 'insufficiencyRaisedDate', 'insufficiencyComments']
        this.table.renderRows();
        this.dataSource.data.splice(indexToRemove,1);
        this.dataSource._updateChangeSubscription();
      }
    }

    async fillData() {
      await this.fillSubclientData();
      this.fillInsufficiencyData()
    }
    async fillInsufficiencyData() {
      this.componentService.findAllComponents().subscribe(
        response1 => {
          response1.forEach(item1 => {
            this.componentDataService.findInsufficienciesForClient(item1.name, this.pageCount).subscribe(
              response2 => {
                response2.forEach(async item2 => {
                  // console.log(item2);
                  let insuffComponent:any = ({
                    case_id: item2.case._id,
                    caseId: item2.case.caseId,
                    candidateName: item2.case.candidateName,
                    clientName: item2.case.subclient.client.name,
                    subclientName: item2.case.subclient.name,
                    _id: item2._id,
                    componentName: item1.name,
                    componentDisplayName: item1.displayName,
                    status: item2.status,
                    displayStatus: item2.status == 'INSUF-2-REQ-ACCEPTED' ? 'Insufficiency' : (item2.status == 'INSUF-2-CLEARANCE-REJECTED' ? 'Insuff Clearance Rejected' : (item2.status == 'INSUF-1-CLEARANCE-REJECTED' ? 'Insuff Clearance Rejected' : (item2.status == 'COST-APPROVAL-REQ-ACCEPTED') ? 'Cost Approval Request' : (item2.status == 'COST-APPROVAL-CLEARANCE-REJECTED' ? 'Cost Approval Rejected' : (item2.status == 'CLARIFICATION-REQ-ACCEPTED' ? 'Clarification Request' : (item2.status == 'INSUF-1-REQ-ACCEPTED' ? 'Insufficiency' : 'Clarification Clearance Rejected'))))),
                    component_id: item1._id,
                    field: this.fillFieldDetails(item1.name, item2),
                    insufficiencyRaisedDate: item2.insufficiencyRaisedDate,
                    insufficiencyComments: item2.insufficiencyComments,
                    insufficiencyClearanceRejectionComments: item2.insufficiencyClearanceRejectionComments,
                  })
                  this.dataSource.data.push(insuffComponent);
                  this.dataSource._updateChangeSubscription();
                  await this.checkSubclientAccess(item2,insuffComponent)
                })  
              },
              error => {
                console.log("Error loading inssufficiencies");
              }
            )
          })
  
        },
        error => {
  
        }
      )
    }
    fillFieldDetails(componentName:string, item:any) {
      if (componentName == 'address') {
        return item.typeofaddress
      } else if (componentName == 'addresscomprehensive') {
        return item.typeofaddress
      } else if (componentName == 'addressonline') {
        return item.typeofaddress
      } else if (componentName == 'addresstelephone') {
        return item.typeofaddress
      } else if (componentName == 'bankstmt') {
        return "-"
      } else if (componentName == 'courtrecord') {
        return item.typeofaddress
      } else if (componentName == 'creditcheck') {
        return item.taxid
      } else if (componentName == 'creditequifax') {
        return item.pannumber
      } else if (componentName == 'credittrans') {
        return item.pannumber
      } else if (componentName == 'criminalrecord') {
        return item.typeofaddress
      } else if (componentName == 'directorshipcheck') {
        return item.dinnumber
      } else if (componentName == 'dlcheck') {
        return item.dlnumber
      } else if (componentName == 'drugtestfive') {
        return item.fulladdress
      } else if (componentName == 'drugtestsix') {
        return "-"
      } else if (componentName == 'drugtestseven') {
        return item.fulladdress
      } else if (componentName == 'drugtesteight') {
        return item.address
      } else if (componentName == 'drugtestnine') {
        return item.fulladdress
      } else if (componentName == 'drugtestten') {
        return item.address
      } else if (componentName == 'education') {
        item.typeofqualification
      } else if (componentName == 'educationadvanced') {
        return item.typeofqualifiction
      } else if (componentName == 'educationcomprehensive') {
        return item.typeofqualification
      } else if (componentName == 'empbasic') {
        return item.nameofemployer
      } else if (componentName == 'empadvance') {
        return item.nameofemployer
      } else if (componentName == 'employment') {
        return item.nameofemployer
      } else if (componentName == 'facisl3') {
        return item.stcode
      } else if (componentName == 'gapvnf') {
        return item.tenureofgap
      } else if (componentName == 'globaldatabase') {
        return "-"
      } else if (componentName == 'identity') {
        return item.typeofid
      } else if (componentName == 'ofac') {
        return item.ofac
      } else if (componentName == 'passport') {
        return item.passportnumber
      } else if (componentName == 'physostan') {
        return "-"
      } else if (componentName == 'refbasic') {
        return item.name
      } else if (componentName = 'reference') {
        return item.nameofreference
      } else if (componentName == 'sitecheck') {
        return item.name
      } else if (componentName == 'socialmedia') {
        return item.searchname
      } else if (componentName == 'vddadvance') {
        return item.companyname
      } else {
        return item.epicnumber
      }
    }
    checkSubclientAccess(item2:any, insuffComponent:any) {
      let promise = new Promise((resolve, reject) => {
        this.subclients.forEach(subclientItem => {
          if (item2.case.subclient._id == subclientItem.subclient) {
            this.dataSource.data.push(insuffComponent);
            this.dataSource._updateChangeSubscription();
          }
        })
  
      })
      return promise
    }
  
    fillSubclientData() {
      let promise = new Promise((resolve, reject) => {
        this.userService.findOneUsingEmailId(localStorage.getItem("userId")).subscribe(
          response => {
            this.userSubclientAccesService.findAllSubclientsForAUser(response._id).subscribe(
              response2 => {
                this.subclients = response2;
                resolve(true)
              },
              error2 => {
                reject()
              }
            )
          },
          error => {
            reject()
          }
        )
      })
      return promise
    }

    showDetails(row:any):void{
      this.selectedRow = row;
      this.showDetailsFlag = true;
      const columnToToggle = ['componentDisplayName', 'field', 'displayStatus', 'insufficiencyRaisedDate', 'insufficiencyComments'];
      columnToToggle.forEach(column => {
      const columnIdx = this.displayedColumns.indexOf(column);
      if (columnIdx !== -1) {
        this.displayedColumns.splice(columnIdx, 1);
      }
    });
      this.table.renderRows();
    }

    
    exportToExcel(){
      console.log('export to excel');
    }
}
