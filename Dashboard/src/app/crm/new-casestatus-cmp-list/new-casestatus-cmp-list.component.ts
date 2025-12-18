import { Component, OnInit } from '@angular/core';


import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorMasterService } from 'src/app/administration/service/color-master.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CasehistoryDialogComponent } from 'src/app/shared/casehistory-dialog/casehistory-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { StopcheckDialogComponent } from '../stopcheck-dialog/stopcheck-dialog.component';
import * as FileSaver from 'file-saver';
import { ClientContract } from 'src/app/model/client-contract';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { PersonalDetailsDataService } from 'src/app/operations/data-entry/service/personal-details-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalDetailsField } from 'src/app/administration/model/personal-details-field';
import { PersonalDetailsService } from 'src/app/administration/service/personal-details.service';


@Component({
  selector: 'app-new-casestatus-cmp-list',
  templateUrl: './new-casestatus-cmp-list.component.html',
  styleUrls: ['./new-casestatus-cmp-list.component.scss']
})
export class NewCasestatusCmpListComponent {
  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  client_id!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string;
  colorCodes!: [];
  colorMasters:any[]=[]
  maxChecks:number=0
  showDetailsFlag: boolean = false;
  selectedRow: any;
  fathername!: string;
  dob!: string;
  contact!:number;
  emailid!:string;
  doj!:string; 
  process!:string;
  number!:string;
  place!:string;
        ///tat//
        tatStartDate!:string;
        tatEndDate!:string;
         /////

  personalDetailsDataEntryform = new FormGroup({
    /*    dataEntryStatus: new FormControl('',[Validators.required]),
        insufficiencyComments: new FormControl(''),*/
      });
      personalDetailsFields!: PersonalDetailsField[];

//  displayedColumns= ['serialNumber','component','addCheck','stopCheck','status'];
//  displayedColumns= ['serialNumber','component','field1','field2','field3','displayStatus','gradingColor','action'];
displayedColumns= ['serialNumber','component','checkId','status'];
  reportColumns= ['serialNumber','reportType','report','reportDate','download'];
  dataSource = new MatTableDataSource();
  uploadedReportsDataSource = new MatTableDataSource();
  table: any;
  constructor(
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private colorMasterService:ColorMasterService,
    private caseUploadService:CaseUploadService,
    private clientContractProfileService:ClientContractProfileService,
    private clientContractPackageService:ClientContractPackageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private location:Location,
    private personalDetailsDataService:PersonalDetailsDataService,
    private personalDetailsService:PersonalDetailsService, 


  ) { }

  ngOnInit(): void {
    this._id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
    this.candidateName = this.componentDetailsForVerificationService.getVerificationItem().candidateName;
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().client_id;
    this.clientName = this.componentDetailsForVerificationService.getVerificationItem().clientName;
    this.subclient_id = this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
    this.subclientName = this.componentDetailsForVerificationService.getVerificationItem().subclientName;
    this.colorCodes =
    this.componentDetailsForVerificationService.getVerificationItem().colorCodes;
    this.tatStartDate =
    this.componentDetailsForVerificationService.getVerificationItem().tatStartDate;
    this.tatEndDate =
    this.componentDetailsForVerificationService.getVerificationItem().tatEndDate;

    console.log("colorCodes  ",this.colorCodes);
    this.caseUploadService.readUploadedPdfReportFileNames(this.caseId).subscribe(
      response=>{
        console.log("response from read uploaded pdf report file names is ",response)
        this.uploadedReportsDataSource.data = response;
        this.uploadedReportsDataSource._updateChangeSubscription()
      },
      error=>{
        this.showError("Error reading reports uploaded")
      }
    )
    this.colorMasterService.readAll().subscribe(
      response=>{
        this.colorMasters = response
      },
      error=>{
        this.showError("Error reading color master")
      }
    )
    this.personalDetailsDataService.read(this._id).subscribe(
      (response) => {
        //console.log("Response from personal details data is ",response);
        let componentDetails:any = {};
                 console.log("@@@@@@@@@@@@@@@",response);
        //          componentDetails["_id"] = item._id;
        componentDetails['caseId'] = this.caseId;
        componentDetails['case_id'] = this.case_id;
        componentDetails['candidateName'] = this.candidateName;
        componentDetails['clientName'] = this.clientName;
        componentDetails['subclientName'] = this.subclientName;

        componentDetails['fathername'] = response.fathername ;
        this.fathername =response.fathername
        componentDetails['emailid'] = response.emailid;
        this.emailid =response.emailid
        componentDetails['doj'] = response.doj;
        this.doj =response.doj
        componentDetails['dob'] = response.dateofbirth ;
        this.dob =response.dateofbirth ;
        componentDetails['place'] = response.location;
        this.place =response.location
        componentDetails['process'] = response.process;
        this.process =response.process
        componentDetails['number'] = response.number;
        this.number =response.number


        componentDetails['componentDisplayName'] = 'Personal Details';
        componentDetails['componentName'] = 'personalDetails';
        componentDetails['colorCodes'] = this.colorCodes;
        if (response.status != null) {
          componentDetails['status'] = response.status;
          componentDetails['displayStatus'] = response.status;
        } else {
          componentDetails['status'] = response.status;
          componentDetails['displayStatus'] = response.status;
        }
        
        this.dataSource.data.push(componentDetails);
        this.dataSource._updateChangeSubscription();
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
                let componentDetails:any = ({

                })
                // console.log("itemitemitem",item);
                
                componentDetails["_id"] = item._id;
                componentDetails["caseId"] = this.caseId;
                componentDetails["case_id"] = this._id;
                componentDetails["candidateName"] = this.candidateName;
                componentDetails["clientName"] = this.clientName;
                componentDetails["subclientName"] = this.subclientName;
                componentDetails["componentDisplayName"]=component.displayName;
                componentDetails["componentName"]=component.name;
                componentDetails["component_id"]=component._id;
                componentDetails['checkId'] = item.checkId ? item.checkId : '';
                componentDetails["status"]=item.status;  
                componentDetails["field1"] = this.fillFieldDetails(component.name,"field1",item)
                componentDetails["field2"] = this.fillFieldDetails(component.name,"field2",item)
                componentDetails["field3"] = this.fillFieldDetails(component.name,"field3",item)
                // colorCodes: item2.case.subclient.client.colorCodes,
                componentDetails["colorCodes"] = this.colorCodes;

                if (item && item.comments && item.comments.length > 0) {
                  componentDetails["colorType"] = item.comments[item.comments.length - 1].colorType || "";
                } else {
                  componentDetails["colorType"] = "";
                }
                
                if (item && item.comments && item.comments.length > 0) {
                  componentDetails["comments"] = item.comments[item.comments.length - 1].comment || "";
                } else {
                  componentDetails["comments"] = ""; 
                }
                if(item.status == 'OUTPUTQC-ACCEPTED' ){
                  componentDetails["displayStatus"] ="Final QC Completed"
                  componentDetails["gradingColor"] = item.grade != null ? this.getGradingColor(item.grade) :""
                }else if( item.status == 'MENTOR-REVIEW-ACCEPTED'){
                  componentDetails["displayStatus"] ="Interim QC Completed"
                  componentDetails["gradingColor"] = item.grade != null ? this.getGradingColor(item.grade) :""
                }else if(item.status == 'INSUF-2-REQ-ACCEPTED' || item.status == 'INSUF-2-REQ' ||  item.status == 'INSUF-1-REQ-ACCEPTED' || item.status == 'INSUF-1-REQ' ||  item.status=='CLARIFICATION-REQ-ACCEPTED' || item.status=='COST-APPROVAL-REQ-ACCEPTED'){
                  componentDetails["displayStatus"] ="Insuf / Cost Approval / Clarification"
                }else{
                  componentDetails["displayStatus"] = item.status
                }
                this.dataSource.data.push(componentDetails);
              })
              this.dataSource._updateChangeSubscription();
            },
            error=>{
              this.showError(error.error.message);
            }
          )
        })
      },
      error=>{
        this.showError(error.error.message);
      }
    )
    ///
    this.personalDetailsService.find().subscribe(
      response=>{
        // this.displayName = response[0].displayName;
        this.personalDetailsFields = response[0].personalDetailsFields;
        this.addFormControls();
        this.readPersonalDetails();
      },
      error=>{
        //console.log(error.error.message);
      }
    )   
//     this.personalDetailsDataService.read(this._id).subscribe(
//       response=>{

//           let componentDetails = ({

//           })
// //          //console.log(response);
// //          componentDetails["_id"] = item._id;
//           componentDetails["caseId"] = this.caseId;
//           componentDetails["case_id"] = this._id;
//           componentDetails["candidateName"] = this.candidateName;
//           componentDetails["clientName"] = this.clientName;
//           componentDetails["subclientName"] = this.subclientName;
//           componentDetails["componentDisplayName"]='Personal Details';
//           componentDetails["componentName"]='personalDetails';

//           if(response.status != null){
//             componentDetails["status"]=response.status;
//             if(response.status == 'DE-COMPLETED'){
//               componentDetails["displayStatus"]="Data Entry Completed"
//             }else if(response.status=='INPUTQC-REJECTED'){
//               componentDetails["displayStatus"]="Inputqc Rejected"
//             }else if(response.status=="INPUTQC-ACCEPTED"){
//               componentDetails["displayStatus"]="Inputqc Accepted"
//             }
//           }else{
//             componentDetails["status"]="DE-COMPLETED";
//             componentDetails["displayStatus"] = "Data Entry Completed";
//           }
//           this.dataSource.data.push(componentDetails);
//         // resolve(true); 
//        },
//       error=>{
//         this.showError(error.error.message);
//         // reject(false)
//       }      
//     )
    ///
    this.getCaseDetails()

  }
  //
  readPersonalDetails(){
    this.personalDetailsDataService.read(this._id).subscribe(
      response=>{
        if(response){
          for(let i=0; i < this.personalDetailsFields.length;i++){
            let item = this.personalDetailsFields[i];
            if(item.type !='DATE'){
              this.personalDetailsDataEntryform.get(item.name)!.setValue(response[item.name]);
            }else{
              let dateValue = new Date(response[item.name]);
              let dd = dateValue.getDate();
              let mm = dateValue.getMonth()+1;
              let yyyy = dateValue.getFullYear().toString();
              let stringdd = '';
              let stringmm = ''

              if(dd < 10){
                stringdd = '0'+dd;
              }else{
                stringdd = dd.toString();
              }
              if(mm < 10){
                stringmm = '0'+mm;
              }else{
                stringmm= mm.toString();
              }
              //console.log('converted value is ',yyyy+mm+stringdd)
              this.personalDetailsDataEntryform.get(item.name)!.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
            }            
          }
//          this.personalDetailsDataEntryform.get('dataEntryStatus').setValue(response.dataEntryStatus);
//          this.personalDetailsDataEntryform.get('insufficiencyComments').setValue(response.insufficiencyComments);
        }
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }  
  addFormControls(){
    this.personalDetailsFields.forEach(item=>{
      this.personalDetailsDataEntryform.addControl(item.name,new FormControl(''));
      if(item.mandatory){
        this.personalDetailsDataEntryform.get(item.name)!.setValidators(Validators.required);
      }
    })
    
  }

  getFlexPercent(size:number){
    if(size <= 30){
      return "15%"
    }else{
      return "30%"
    }
  }
  getFieldSize(personalDetailsField:PersonalDetailsField){
    return personalDetailsField.size;
  } 
  //

  fillFieldDetails(componentName:any,field:any,item:any){
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
  getCaseDetails(){
    this.caseUploadService.findACase(this._id).subscribe(
      response=>{
        if(response.package != null){
          this.clientContractPackageService.findOne(response.package).subscribe(
            response2=>{
              response2.clientContractPackageComponents.forEach((item: { maxChecks: string | null; })=>{
                console.log("Item Max checks  for package is ",item.maxChecks)
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
                console.log("Item Max checks  for profile is ",item.maxChecks)
                this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
              })
            },
            error=>{
              this,this.showError("Error getting profile check count")
            }
          )
        }else{
          response.componentsToCheck.forEach((item: { maxChecks: string | null; })=>{
            console.log("Item Max checks  for a lacarte is ",item.maxChecks)
            this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
          })
        }
      },
      error=>{
        this.showError("Error getting count of checks")
      }
    )
  }
  getGradingColor(grade:any){
    ////console.log("Checking for grade ",grade)
    for(let i=0;i < this.colorMasters.length;i++){
      let item = this.colorMasters[i]
      ////console.log("Checking in color master for item ",item._id)
      if(item._id.toString() == grade.toString()){
        ////console.log("Returning ",item.name)
        return item.name
      }
    }
  }
  addCheckClicked(){

  }
  stopCheckClicked(stopCheckItem:any){
    ////console.log('Item to approve is ',stopCheckItem);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.data = {
      case_id :stopCheckItem.case_id,
      _id:stopCheckItem._id,
      componentName:stopCheckItem.componentName,
      caseId:stopCheckItem.caseId,
      componentDisplayName:stopCheckItem.componentDisplayName,
      candidateName:stopCheckItem.candidateName,
      status:stopCheckItem.status
    }
    const dialogRef = this.dialog.open(StopcheckDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data){
          ////console.log("data back is ",data);
          stopCheckItem.scrutinyRejectionReason = data.rejectionReason;
            this.componentDataService.stopCheck(stopCheckItem.componentName,stopCheckItem).subscribe(
              response=>{
                this.showMessage("Insuff cleared");
                this.dataSource._updateChangeSubscription();
              },
              error=>{
                this.showError(error.error.message);
              }
            )
        }

      },
      error=>{
        this.showError(error.error.message);
      }
    )


  }
  historyClicked(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.height = '600px'
    dialogConfig.width = '1024px'
    ////console.log("Dialog Ref Contains  ",dialogConfig)
    dialogConfig.data = {
      case_id:this._id,
//      component_id:this.component_id,
//      _id:this._id
    }
    const dialogRef = this.dialog.open(CasehistoryDialogComponent,dialogConfig);
  }
  addCheckButtonClicked(){

  }
  backButtonClicked(){
    this.location.back();
  }
  downloadReportButtonClicked(item:any){
    ////console.log("about to download report for  case",this.caseId)
    ////console.log("about to download report of type",item.type)
    ////console.log("about to download report with file name",item.fileName)
    this.caseUploadService.downloadPdfReport(this.caseId,item.type,item.fileName).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        ////console.log(response);
        FileSaver.saveAs(response.body,`${item.fileName}`);
      },
      error=>{
        this.showError("Error downloading pdf report")
      })

  }
  getColorCode(grade: { toString: () => any; } | null){
    if(grade != null){
      for(let i=0;i < this.colorMasters.length;i++){
        let item = this.colorMasters[i]
        ////console.log("Checking in color master for item ",item._id)
        if(item._id.toString() == grade.toString()){
          ////console.log("Returning ",item.name)
          return item.colorCode
        }
      }
      return ""
    }else{
      return ""
    }
  }
  downloadCDF(){
    this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
      },
      error=>{
        ////console.log(error);
      }
    );
  }
  downloadLOA(){
    this.caseUploadService.downloadCaseFileForLOA(this.caseId).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        FileSaver.saveAs(response.body,`${this.caseId}_candidate_LOA_.pdf`);
      },
      error=>{
        ////console.log(error);
      }
    );
  }
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }

  // new-added
/*  actionButtonClicked(item){
    this.componentDetailsForVerificationService.setVerificationItem(item);
    this.router.navigate([`crm/casestatusreviewdetails/`]);
  }*/
  detailsButtonClicked(outputqcItem:any){
    this.componentDetailsForVerificationService.setVerificationItem(outputqcItem);
    this.router.navigate(['/home/crm/casestatusreviewdetails']);
  }  

  
  showDetails(row:any){  
  //    console.log('item === ', row);
  //   this.selectedRow = row;
  //   this.showDetailsFlag = true;
    
  //   this.componentDetailsForVerificationService.setVerificationItem(row);
  //   const columnToToggle = ['clientName','subclientName','tatEndDate','componentDisplayName','displayStatus'];
  //   columnToToggle.forEach(column => {
  //   const columnIdx = this.displayedColumns.indexOf(column);
  //   if (columnIdx !== -1) {
  //     this.displayedColumns.splice(columnIdx, 1);
  //   }
  // });
  //   this.table.renderRows();
  this.componentDetailsForVerificationService.setVerificationItem(row);
  this.router.navigate(['/home/crm/casestatusreviewdetails']);
}

}
