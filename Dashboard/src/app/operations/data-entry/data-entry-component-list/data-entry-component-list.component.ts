import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from '../../service/component-data.service';
import { PersonalDetailsDataService } from '../../service/personal-details-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { CaseDetailsForDataEntryNewService } from '../service/case-details-for-data-entry-new.service';
export interface UserData {
  _id:any,
  component:any,
  status:any
}

@Component({
  selector: 'app-data-entry-component-list',
  templateUrl: './data-entry-component-list.component.html',
  styleUrls: ['./data-entry-component-list.component.scss']
})
export class DataEntryComponentListComponent {
  requiredComponents: any[] = [];
  employeeId!:string;
  mode!: any;
  initialComponents: any[] = [];
  _id :any;
  caseId!:string;
  case_id: string = ''
  candidateName!:string;
  client_id! :string;
  clientName!:string;
  subclient_id! :string;
  subclientName!:string;
  maxChecks:number=0

  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns = ['serialNumber','component'];
  dataSource: MatTableDataSource<UserData>;
  caseStatus!:string;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(    
    private componentDetailsForVerificationService :ComponentDetailsForVerificationService,
    private caseUpoadService:CaseUploadService,
    private clientContractPackageService:ClientContractPackageService,
    private clientContractprofileService:ClientContractProfileService,
    private personalDetailsDataService:PersonalDetailsDataService,
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private location:Location,
    private caseDetailsForDataEntryNewService: CaseDetailsForDataEntryNewService,
    private activatedRoute: ActivatedRoute,
    private router:Router){
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    // this.findCases();
  //   let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
  //    console.log(verification);
  //   const {case_id,caseId,candidateName,client_id, clientName, subclient_id, subclientName} = verification;
  //   this._id = case_id;
  //   this.caseId = caseId;
  //   this.candidateName = candidateName;
  //   this.client_id = client_id;
  //   this.clientName = clientName;
  //   this.subclient_id = subclient_id;
  //   this.subclientName = subclientName;
  //   // this.getCaseDetails();
  //   // this.addComponents();
  // console.log("Details From DE",this.caseDetailsForDataEntryNewService.getCaseDetails());
  
    this.caseId = this.caseDetailsForDataEntryNewService.getCaseDetails().caseId;
    this.candidateName = this.caseDetailsForDataEntryNewService.getCaseDetails().candidateName;
    this.clientName = this.caseDetailsForDataEntryNewService.getCaseDetails().clientName;
    this.subclientName = this.caseDetailsForDataEntryNewService.getCaseDetails().subclientName;
    this.case_id = this.caseDetailsForDataEntryNewService.getCaseDetails().case_id;
    this.client_id = this.caseDetailsForDataEntryNewService.getCaseDetails().client_id;
    this.subclient_id = this.caseDetailsForDataEntryNewService.getCaseDetails().subclient_id;
    this.employeeId = this.caseDetailsForDataEntryNewService.getCaseDetails().employeeId;
    console.log("dagsdjgasdg", this.caseDetailsForDataEntryNewService.getCaseDetails().employeeId)
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');

    this.initialComponents = this.caseDetailsForDataEntryNewService.getCaseDetails().requiredComponents;
    console.log('Component Details For Data Entry',this.initialComponents);
    let arr:any = []
    this.initialComponents.forEach(val =>{
      arr.push(val.componentName)
    })
    this.dataSource.data = arr.map((componentName: any)  =>({
      component: componentName,
    }))
    console.log(this.dataSource);
    // this.addComponents();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCaseDetails(){
    this.caseUpoadService.findACase(this._id).subscribe(
      response=>{
        if(response.package !== null){
          this.clientContractPackageService.findOne(response.package).subscribe(
            response2=>{
              response2.clientContractPackageComponents.forEach((item : any)=>{
                this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
              })
            },
            error=>{
             console.log("Error getting profile check count")
            }
          )
        }else if(response.profile != null){
          this.clientContractprofileService.getClientContractProfileDetails(response.profile).subscribe(
            response2=>{
              response2.clientContractProfileComponents.forEach((item:any)=>{
                this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
              })
            },
            error=>{
              console.log("Error getting profile check count")
            }
          )
        }else{
          response.componentsToCheck.forEach((item:any)=>{
            this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
          })
        }
      },
      error=>{
        console.log("Error getting profile check count")
      }
    )
  }

  async addComponents(){
    await this.addPersonalDetails();
    await this.addIndividualComponents();
  }

  statusDisplayMap: Record<string, string> = {
    'DE-COMPLETED': 'Data Entry Completed',
    'INPUTQC-ACCEPTED': 'Inputqc Accepted',
    'INPUTQC-REJECTED': 'Inputqc Rejected',
    'INSUF-1-REQ': 'Insufficiency Requested',
    'INSUF-1-REQ-ACCEPTED': 'Insufficiency Request Accepted',
  }

  addPersonalDetails(){
    let promise = new Promise((resolve,reject)=>{
      this.personalDetailsDataService.read(this._id).subscribe(
        response => {
          const componentDetails: any = {
            caseId: this.caseId,
            case_id: this._id,
            candidateName: this.candidateName,
            clientName: this.clientName,
            subclientName: this.subclientName,
            componentDisplayName: 'Personal Details',
            componentName: 'personalDetails',
            status: response.status || 'DE-COMPLETED',
            displayStatus: this.statusDisplayMap[response.status] ||  'Data Entry Completed',
          };
            this.dataSource.data = [...this.dataSource.data, componentDetails];
          resolve(true); 
         },
        error => {
          console.log(error.error.message)
          reject(false)
        }      
      )
    })
    return promise;
  }

  addIndividualComponents(){
    let promise = new Promise((resolve,reject)=>{
      this.componentService.findAllComponents().subscribe(
        response => {
          response.forEach(component=>{
            this.componentDataService.findAllForACase(component.name,this._id).subscribe(
              response2 => {
                response2.forEach(item => {
                  const componentDetails: any = {
                    _id: item._id,
                    caseId: this.caseId,
                    case_id: this._id,
                    candidateName: this.candidateName,
                    clientName: this.clientName,
                    subclientName: this.subclientName,
                    subclientId: this.subclient_id,
                    subclient_id: this.subclient_id,
                    componentDisplayName: component.displayName,
                    componentName: component.name,
                    component_id: component._id,
                    componentType: component.type,
                    status: item.status,
                    displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
                  };
                  this.dataSource.data = [...this.dataSource.data, componentDetails];
                })
              },
              error => {
               console.log(error.error.message);
              }
            )
          })
          resolve(true);
        },
        error=>{
         console.log(error.error.message);
          reject(false);
        }
      )
      
    })
    return promise;
  }

  async confirmButtonClicked(){
    await this.getOverallStatus().then(data=>{
      //console.log("Overall status is",data)
      this.caseUpoadService.updateStatus(this._id,{status:this.caseStatus}).subscribe(
        response=>{
         console.log("Case Status Saved");
          this.location.back();
        },
        error=>{
          console.log("Error changing case status")
        }
      )
    });

  }

  getOverallStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.caseStatus = 'INPUTQC-ACCEPTED';
  
      for (const item of this.dataSource.data) {
        switch (item.status) {
          case 'DE-COMPLETED':
            this.caseStatus = 'DE-COMPLETED';
            break;
          case 'INPUTQC-REJECTED':
            this.caseStatus = 'INPUTQC-REJECTED';
            break;
          case 'INSUF-1-REQ':
            this.caseStatus = 'DE-COMPLETED';
            break;
        }
  
        if (this.caseStatus !== 'INPUTQC-ACCEPTED') {
          break; // Stop looping if the case status is already determined
        }
      }
      resolve(true);
    });
  }

  showDetails(row:any){  
      console.log('hello', row.status);
      this.selectedRow = row 
      
      this.componentDetailsForVerificationService.setVerificationItem(row);
      this.showDetailsFlag = true;
      console.log('selected value === ',this.selectedRow);
    
    // let { componentName } = row;
    // (componentName === 'personalDetails') ? 
    // (this.router.navigate([`/home/inputqc/personaldetailsinputqc`])) : 
    // (this.router.navigate([`/home/inputqc/componentinputqc`]));
  }

}
