import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistoryService } from 'src/app/shared/service/history.service';
import { AddcheckDialogComponent } from '../addcheck-dialog/addcheck-dialog.component';
import { StopcheckDialogComponent } from '../stopcheck-dialog/stopcheck-dialog.component';
import { ReinitiateCheckComponent } from '../reinitiate-check/reinitiate-check.component';
import { DeleteCheckComponent } from '../delete-check/delete-check.component';
import { DeConfirmDialogComponent } from 'src/app/operations/data-entry/de-confirm-dialog/de-confirm-dialog.component';
import { PersonalDetailsDataService } from 'src/app/operations/data-entry/service/personal-details-data.service';

export interface UserData {
  _id: string;
  component:any,
  field2:any,
  reinitiate:any,
  addCheck:any,
  stopCheck:any,
  status:any
  
}

@Component({
  selector: 'app-utilities-case-status-component-list',
  templateUrl: './utilities-case-status-component-list.component.html',
  styleUrls: ['./utilities-case-status-component-list.component.scss']
})
export class UtilitiesCaseStatusComponentListComponent {
  // @Input() selectedRow:any;
  selectedFiles: File[] = [];//added line nov 1//

  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  client_id!: string;
  clientName!: string;
  // subclient_id!: string;
  component_id!: string;
  subclientName!: string;
  fathername!: string;
  dob!: string;
  contact!:number;
  emailid!:string;
  doj!:string;
  process!:string;
  number!:string;
  place!:string;
  personalDetails!: string
  ///tat//
  tatStartDate!:string;
  tatEndDate!:string;
  colorCodes!: [];
   caseData: any = {
  caseId: '',
  case_id: '',
  candidateName: '',
  clientName: '',
  subclientName: '',
  fathername: '',
  emailid: '',
  doj: '',
  dob: '',
  place: '',
  process: '',
  number: '',
  tatStartDate: '',
  tatEndDate: '',
  
};
personalDetails_id: string = '';
  maxChecks:number=0;
  dataSource: MatTableDataSource<UserData>;
  displayedColumns= ['serialNumber','component','checkId','reinitiate','addCheck','stopCheck','reinitiatecase','deleteCheck','status'];
  
  dataSourceHistory = new MatTableDataSource();
  historyDisplayedColumns = ['date','user','operation','status','remarks','nextfollowupdate','expectedclosuredate','allocatedToVendor','allocatedToFe','allocatedToVerifier','verificationcost'];
  
  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private caseUploadService:CaseUploadService,
    private clientContractProfileService:ClientContractProfileService,
    private clientContractPackageService:ClientContractPackageService,
    private historyService:HistoryService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private dialog:MatDialog,
    private location:Location,
    private snackBar:MatSnackBar,
    private personalDetailsDataService:PersonalDetailsDataService,
    
    
  ) { 
    this.dataSource = new MatTableDataSource();
  }
  
  ngOnInit(){
    let getDetails = this.componentDetailsForVerificationService.getVerificationItem();
    console.log("test",getDetails);
    
    this._id = getDetails._id;
    this.caseId = getDetails.caseId;
    this.candidateName = getDetails.candidateName;
    this.client_id = getDetails.client_id;
    this.clientName = getDetails.clientName;
    // this.subclient_id = getDetails.subclient_id;
    this.subclientName = getDetails.subclientName;
    // console.log('selected row = ', getDetails);
  this.personalDetailsDataService.read(this._id).subscribe(
    (response) => {
      console.log("Personal Details Response:", response);
     this.personalDetails_id = response._id;
      this.caseData = {
        caseId: this.caseId,
        case_id: this.case_id,
        candidateName: this.candidateName,
        clientName: this.clientName,
        subclientName: this.subclientName,
        fathername: response.fathername || '',
        emailid: response.emailid || '',
        doj: response.doj || '',
        dob: response.dateofbirth || '',
        place: response.location || '',
        process: response.process || '',
        number: response.number || '',
        aadhernumber:response.aadhernumber || '',
        pancard:response.pancard || '',
        employeeid:response.employeeid || '',
        tatStartDate: response.tatStartDate || '',
        tatEndDate: response.tatEndDate || ''
      };
    },
    (error) => {
      this.showError(error.error.message);
    }
  );


    
    this.componentService.findAllComponents().subscribe(
      response=>{
        response.forEach(component=>{
          this.componentDataService.findAllForACase(component.name,this._id).subscribe(
            response2=>{
              response2.forEach(item=>{
                let componentDetails: any = {
                  _id: item._id,
                  caseId: this.caseId,
                  case_id: this._id,
                  candidateName: this.candidateName,
                  clientName: this.clientName,
                  subclientName: this.subclientName,
                  componentDisplayName: component.displayName,
                  // field2: this.fillFieldDetails(component.name, "field2", item),
                  checkId: item.checkId ? item.checkId : '',
                  componentName: component.name,
                  component_id: component._id,
                  colorCodes: this.colorCodes,
                  status: item.status
                };
                this.dataSource.data.push(componentDetails);
              })
              this.dataSource._updateChangeSubscription();
            },
            error=>{
              // this.showError(error.error.message);
            }
          )
        })
      },
      error=>{
        // this.showError(error.error.message);
      }
    )
  }
  
  stopCheckClicked(stopCheckItem:any) {
    //console.log('Item to approve is ',stopCheckItem);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      case_id: stopCheckItem.case_id,
      _id: stopCheckItem._id,
      componentName: stopCheckItem.componentName,
      caseId: stopCheckItem.caseId,
      componentDisplayName: stopCheckItem.componentDisplayName,
      candidateName: stopCheckItem.candidateName,
      status: stopCheckItem.status
    }
    const dialogRef = this.dialog.open(StopcheckDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          //console.log("data back is ",data);
          stopCheckItem.scrutinyRejectionReason = data.rejectionReason;
          stopCheckItem.status = "MENTOR-REVIEW-ACCEPTED"
          stopCheckItem.grade = "602f8b3743383ec9a7224970"
          stopCheckItem.gradingComments = data.stopCheckComments
          console.log("Stop checj",stopCheckItem)
          console.log("Stop data",data)
          this.componentDataService.stopcheck(stopCheckItem).subscribe(
            response => {
              console.log("stop check",stopCheckItem)
              this.showMessage("Stop Check Successful");
              this.dataSource._updateChangeSubscription();
              // stopCheckItem.status = "MENTOR-REVIEW-ACCEPTED"
              // this.componentDataService.stopcheck(stopCheckItem).subscribe(
              //   response=>{
              //     stopCheckItem.status = "MENTOR-REVIEW-ACCEPTED"
              //     this.caseUploadService.updateCaseStatus(this._id,{status:"MENTOR-REVIEW-ACCEPTED"}).subscribe(
              //       response=>{
              //         this.showMessage("Stop Check Successful");
              //         this.dataSource._updateChangeSubscription();
              //       }
              //     )
              
              //   },
              //   error=>{
              //     this.showError(error.error.message);
              //   }
              // )
              // venky 03/Jan/2025
              this.router.navigate(['/home/crm/utilitiescasestatus'])
            },
            (error: { error: { message: string }}) => {
              //console.log("Error in updating verification status ",error)
              this.showError(error.error.message)
            }
          )
          
        } else {
          // venky 03/Jan/2025
          this.router.navigate(['/home/crm/utilitiescasestatus'])
        }
        
      },
      error => {
        this.showError(error.error.message);
      }
    )
  }
  ///Delete Check
  deleteCheckClicked(item:any){
    //console.log('Item to approve is ',item);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.data = {
      case_id :item.case_id,
      check_id:item._id,
      componentName:item.componentName,
      caseId:item.caseId,
      componentDisplayName:item.componentDisplayName,
      candidateName:item.candidateName,
      status:item.status,
      component_id:item.component_id
    }
    const dialogRef = this.dialog.open(DeleteCheckComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data){
          //console.log("data back is ",data);
          item.scrutinyRejectionReason = data.rejectionReason;
          // item.status = "INPUTQC-ACCEPTED"
          //          item.gradingComments = data.stopCheckComments
          this.componentDataService.deleteCheck(item).subscribe(
            // this.componentDataService.updateVerificationStatus(item.componentName,item).subscribe(
            response=>{
              // venky 03/Jan/2025
              this.router.navigate(['/home/crm/utilitiescasestatus'])
            },
            error=>{
              
            }
          )
        } else{
          // venky 03/Jan/2025
          this.router.navigate(['/home/crm/utilitiescasestatus'])
        }
      })
    }
    ///Delete Check
    getCaseDetails(){
      this.caseUploadService.findACase(this._id).subscribe(
        response=>{
          if(response.package != null){
            this.clientContractPackageService.findOne(response.package).subscribe(
              response2=>{
                response2.clientContractPackageComponents.forEach((item: { maxChecks: string | null; })=>{
                  this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
                })
              },
              error=>{
                this,this.showError("Error getting profile check count")
              }
            )
          }else if(response.profile != null){
            this.clientContractProfileService.getClientContractProfileDetails(response.profile).subscribe(
              response2=>{
                response2.clientContractProfileComponents.forEach((item: { maxChecks: string | null; })=>{
                  this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
                })
              },
              error=>{
                this,this.showError("Error getting profile check count")
              }
            )
          }else{
            response.componentsToCheck.forEach((item: { maxChecks: string | null; })=>{
              this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
            })
          }
        },
        error=>{
          this.showError("Error getting count of checks")
        }
      )
    }
    addCheckButtonClicked(item: { case_id: any; componentName: any; caseId: any; componentDisplayName: any; candidateName: any; status: any; personalDetails:any; }){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus= true;
      dialogConfig.height="500px"
      dialogConfig.width="900px"
      //console.log("case _id of the item clicked ",item.case_id)
      //console.log("client _id of the item clicked ",this.client_id)
      dialogConfig.data = {
        client_id:this.client_id,
        case_id :item.case_id,
        componentName:item.componentName,
        caseId:item.caseId,
        componentDisplayName:item.componentDisplayName,
        candidateName:item.candidateName,
        status:item.status,
        personalDetails:this.personalDetails
      }
      const dialogRef = this.dialog.open(AddcheckDialogComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(
        data=>{
          // venky 03/Jan/2025
          this.router.navigate(['/home/crm/utilitiescasestatus'])
        })
        
      }
      reinitiateButtonClicked(item: { case_id: any; _id: any; componentName: any; caseId: any; componentDisplayName: any; candidateName: any; status: string; reinitiationComments: any; scrutinyRejectionReason: any; }) {
        //console.log('Item to approve is ',item);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          case_id: item.case_id,
          _id: item._id,
          componentName: item.componentName,
          caseId: item.caseId,
          componentDisplayName: item.componentDisplayName,
          candidateName: item.candidateName,
          status: item.status
        }
        const dialogRef = this.dialog.open(ReinitiateCheckComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          data => {
            if (data) {
              //console.log("data back is ",data);
              item.reinitiationComments = data.reinitiationComments
              
              item.scrutinyRejectionReason = data.rejectionReason;
              item.status = "INPUTQC-ACCEPTED"
              //          item.gradingComments = data.stopCheckComments
              this.componentDataService.reinitiateCheck(item.componentName, item).subscribe(
                // this.componentDataService.updateVerificationStatus(item.componentName,item).subscribe(
                response => {
                  
                  // venky 03/Jan/2025
                  this.router.navigate(['/home/crm/utilitiescasestatus'])
                },
                error => {
                  
                }
              )
            }
          })
        }
        
        // venky 31/December
        reinitiatecaseButtonClicked(item: { case_id: any; _id: any; componentName: any; caseId: any; componentDisplayName: any; candidateName: any; status: string; reinitiationComments: any; scrutinyRejectionReason: any; }) {
          //console.log('Item to approve is ',item);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '200px'
          dialogConfig.width = '400px'
          dialogConfig.data = {
            case_id: item.case_id,
            _id: item._id,
            componentName: item.componentName,
            caseId: item.caseId,
            componentDisplayName: item.componentDisplayName,
            candidateName: item.candidateName,
            status: item.status
          }
          const dialogRef = this.dialog.open(DeConfirmDialogComponent,dialogConfig);
          dialogRef.afterClosed().subscribe((data) => {
            if (data.event === 'confirmed') {
              this.componentDataService.reinitiateCase(item).subscribe(
                (response) => {
                  // console.log('response == ', response);
                  
                  // venky 03/Jan/2025
                  this.router.navigate(['/home/crm/utilitiescasestatus'])
                },
                (error) => {
                  // console.log('error == ', error);
                }
              );
            }
          });
        }
        
        backButtonClicked(){
          this.location.back();
        }
        
        fillFieldDetails(componentName:string,field:string,item:any){
          if(componentName == 'address'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.address
            }else{
              return item.city
            }
          }else if(componentName == 'addresscomprehensive'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }
          }else if(componentName == 'addressonline'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.fulladdwithpin
            }else{
              return item.city
            }
          }else if(componentName == 'addresstelephone'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.address
            }else{
              return item.city
            }
          }else if(componentName == 'bankstmt'){
            if(field == "field1"){
              return item.nameofbank
            }else if(field == "field2"){
              return "-"
            }else{
              return "-"
            }
          }else if(componentName == 'courtrecord'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.addresswithpin
            }else{
              return item.city
            }
          }else if (componentName == 'creditcheck'){
            if(field == "field1"){
              return item.nameasperpan
            }else if(field == "field2"){
              return item.taxid
            }else{
              return "-"
            }      
            
          }else if(componentName == 'creditequifax'){
            if(field == "field1"){
              return item.panname
            }else if(field == "field2"){
              return item.pannumber
            }else{
              return "-"
            }      
          }else if(componentName == 'credittrans'){
            if(field == "field1"){
              return item.nameasperpan
            }else if(field == "field2"){
              return item.pannumber
            }else{
              return "-"
            }      
          }else if(componentName == 'criminalrecord'){
            if(field == "field1"){
              return item.typeofaddress
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }      
          }else if(componentName == 'directorshipcheck'){
            if(field == "field1"){
              return item.directorname
            }else if(field == "field2"){
              return item.dinnumber
            }else{
              return "-"
            }      
          }else if(componentName == 'dlcheck'){
            if(field == "field1"){
              return item.nameasperdl
            }else if(field == "field2"){
              return item.dlnumber
            }else{
              return item.issuedate
            }      
          }else if(componentName == 'drugtestfive'){
            if(field == "field1"){
              return item.nameofemployee
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }      
          }else if(componentName == 'drugtestsix'){
            if(field == "field1"){
              return "-"
            }else if(field == "field2"){
              return "-"
            }else{
              return "-"
            }      
          }else if(componentName == 'drugtestseven'){
            if(field == "field1"){
              return item.nameofemploybee
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }      
          }else if(componentName == 'drugtesteight'){
            if(field == "field1"){
              return item.nameofemployee
            }else if(field == "field2"){
              return item.address
            }else{
              return item.city
            }      
          }else if(componentName == 'drugtestnine'){
            if(field == "field1"){
              return "-"
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }      
          }else if(componentName == 'drugtestten'){
            if(field == "field1"){
              return item.nameofemployee
            }else if(field == "field2"){  
              return item.address
            }else{
              return item.city
            }      
          }else if(componentName == 'education'){
            if(field == "field1"){
              item.typeofqualification
            }else if(field == "field2"){
              item.qualification
            }else{
              return (item.nameofuniversity != null ? item.nameofuniversity : item.nameofschool !== null ? item.nameofschool:"" )
            }      
          }else if (componentName == 'educationadvanced'){
            if(field == "field1"){
              return item.typeofqualifiction
            }else if(field == "field2"){
              return item.qualification
            }else{
              return (item.nameofuniverskty != null ? item.nameofuniverskty : item.nameofschool !== null ? item.nameofschool:"" )        
            }      
          }else if(componentName == 'educationcomprehensive'){
            if(field == "field1"){
              return item.typeofqualification
            }else if(field == "field2"){
              return item.qualification
            }else{
              return (item.nameofuniversity != null ? item.nameofuniversity : item.nameofschool !== null ? item.nameofschool:"" )                
            }      
          }else if(componentName == 'empbasic'){
            if(field == "field1"){
              return item.empstatus
            }else if(field == "field2"){
              return item.nameofemployer
            }else{
              return item.designation
            }
          }else if(componentName == 'empadvance'){
            if(field == "field1"){
              return item.empstatus
            }else if(field == "field2"){
              return item.nameofemployer
            }else{
              return item.designation
            }
          }else if(componentName == 'employment'){
            if(field == "field1"){
              return item.empstatus
            }else if(field == "field2"){
              return item.nameofemployer
            }else{
              return item.designation        
            }
          }else if(componentName == 'facisl3'){
            if(field == "field1"){
              return item.applicantname
            }else if(field == "field2"){
              return item.stcode
            }else{
              return "-"
            }
          }else if(componentName == 'gapvnf'){
            if(field == "field1"){
              return item.tenureofgap
            }else if(field == "field2"){
              return item.address
            }else{
              return item.city
            }      
          }else if(componentName == 'globaldatabase'){
            if(field == "field1"){
              return "-"
            }else if(field == "field2"){
              return "-"
            }else{
              return "-"
            }      
          }else if(componentName == 'identity'){
            if(field == "field1"){
              return item.typeofid
            }else if(field == "field2"){
              return item.nameasperid
            }else{
              return item.idnumber
            }      
          }else if(componentName == 'ofac'){
            if(field == "field1"){
              return item.candname
            }else if(field == "field2"){
              return item.ofac
            }else{
              return "-"
            }      
          }else if(componentName == 'passport'){
            if(field == "field1"){
              return item.passportnumber
            }else if(field == "field2"){
              return item.nationality
            }else{
              return item.expirydate
            }      
          }else if(componentName == 'physostan'){
            if(field == "field1"){
              return "-"
            }else if(field == "field2"){
              return "-"
            }else{
              return "-"
            }      
          }else if(componentName == 'refbasic'){
            if(field == "field1"){
              return item.name
            }else if(field == "field2"){
              return item.designation
            }else{
              return item.contact
            }      
          }else if(componentName = 'reference'){
            if(field == "field1"){
              return item.nameofreference
            }else if(field == "field2"){
              return item.designation
            }else{
              return item.contactdetails
            }      
          }else if(componentName == 'sitecheck'){
            if(field == "field1"){
              return item.name
            }else if(field == "field2"){
              return item.fulladdress
            }else{
              return item.city
            }      
          }else if(componentName == 'socialmedia'){
            if(field == "field1"){
              return item.searchname
            }else if(field == "field2"){
              return "-"
            }else{
              return "-"
            }      
          }else if(componentName == 'vddadvance'){
            if(field == "field1"){
              return item.companyname
            }else if(field == "field2"){
              return item.regdadd
            }else{
              return item.cin
            }
          }else{
            if(field == "field1"){
              return item.epicname
            }else if(field == "field2"){
              return item.epicnumber
            }else{
              return item.state
            }      
          }
        }
        
        showMessage(msg:string){
          this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
        }
        showError(msg:string){
          this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
        }

          saveCase() {
            console.log("Before save payload:", this.caseData, "personalDetails_id:", this.personalDetails_id, this._id);

            // create a clean payload with all fields + case
            const payload = {
              ...this.caseData,
              name: this.caseData.candidateName,
              fathername:this.caseData.fathername,
              dateofbirth:this.caseData.dob,
              number:this.caseData.number,
              emailid:this.caseData.emailid,
              employeeid:this.caseData.employeeid,
              doj:this.caseData.doj,
              process:this.caseData.process,
              location:this.caseData.place,
              aadhernumber:this.caseData.aadhernumber,
              pancard:this.caseData.pancard,
              case: this._id  // explicitly add case
            };

            console.log("Final payload being sent:", payload);

            this.personalDetailsDataService.update(this.personalDetails_id, payload).subscribe(
              (response) => {
                this.showMessage("Personal Details Saved");
              },
              (error) => {
                this.showError(error.error.message);
              }
            );
          }

                  
        getHistoryDetails(){
          if(this.component_id !== null && this._id !== null){
            this.historyService.getCheckHistory(this.case_id,this.component_id,this._id).subscribe(
              response=>{
                console.log("Got History ",response)
                this.dataSourceHistory = response
              },
              error=>{
                console.log("Error ",error)
              }
            )
          }else{
            this.historyService.getCaseHistory(this.case_id).subscribe(
              response=>{
                //console.log("trying to get for the case ",response)
                this.dataSourceHistory = response
              },
              error=>{
                console.log("Error ",error)
              }
            )
          }
        }


        onFileSelected(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFiles = Array.from(event.target.files);
    console.log("Selected files:", this.selectedFiles);
  }
}

uploadLoaFile() {
  if (!this.selectedFiles || this.selectedFiles.length === 0) {
    alert("Please select at least one file!");
    return;
  }

  this.selectedFiles.forEach((file) => {
    const fileName = file.name.replace(/\.[^/.]+$/, ""); // remove extension
    this.caseUploadService.uploadModify(this.caseData.caseId, file, fileName)
      .subscribe({
        next: (res) => {
          console.log(`Uploaded ${file.name}:`, res);
        },
        error: (err) => {
          console.error(`Error uploading ${file.name}:`, err);
        }
      });
  });

  alert("All files uploaded successfully!");
  console.log("Uploading LOA files for Case ID:", this.caseData.caseId);
}
      }
      
      