import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorMasterService } from 'src/app/administration/service/color-master.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CasehistoryDialogComponent } from 'src/app/shared/casehistory-dialog/casehistory-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { StopcheckDialogComponent } from '../stopcheck-dialog/stopcheck-dialog.component';
import * as FileSaver from 'file-saver';
// import { ClientContract } from 'src/app/administration/model/client-contract';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
// import { ComponentField } from 'src/app/administration/model/component-field';
import { ComponentField } from 'src/app/model/component-field';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-case-status-component-list',
  templateUrl: './case-status-component-list.component.html',
  styleUrls: ['./case-status-component-list.component.scss']
})
export class CaseStatusComponentListComponent {
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
  componentFields:any;
  componentName!: string;
  isLoading!: boolean;
  filteredUniversities!: any[];
  filteredCompanies!: any[];  
  componentDisplayName!: string;
  component_id!: string;
  componentType!: string;
  allComponentData:any
  pdfUrl!: Blob;
  showDocumentDialog:boolean=false;

  componentDataEntryForm = new FormGroup({
    dataEntryStatus: new FormControl(''),
    insufficiencyComments: new FormControl(''), 

  });

//  displayedColumns= ['serialNumber','component','addCheck','stopCheck','status'];
  displayedColumns= ['serialNumber','component','field1','field2','field3','displayStatus','gradingColor'];
  reportColumns= ['serialNumber','reportType','report','download'];
  dataSource = new MatTableDataSource();
  uploadedReportsDataSource = new MatTableDataSource();
  constructor(
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private colorMasterService:ColorMasterService,
    private componentFieldService:ComponentFieldService,
    private caseUploadService:CaseUploadService,
    private clientContractProfileService:ClientContractProfileService,
    private clientContractPackageService:ClientContractPackageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private dialog:MatDialog,    
    private snackBar:MatSnackBar,
    private location:Location

  ) { }

  ngOnInit(): void {
    this._id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
    this.candidateName = this.componentDetailsForVerificationService.getVerificationItem().candidateName;
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().client_id;
    this.clientName = this.componentDetailsForVerificationService.getVerificationItem().clientName;
    this.subclient_id = this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
    this.subclientName = this.componentDetailsForVerificationService.getVerificationItem().subclientName;
    
    this.componentFields= this.componentDetailsForVerificationService.getVerificationItem().componentFields;
    this.component_id = this.componentDetailsForVerificationService.getVerificationItem().component_id;
    this.componentName = this.componentDetailsForVerificationService.getVerificationItem().componentName;    
    this.componentDisplayName = this.componentDetailsForVerificationService.getVerificationItem().componentDisplayName;
    this.componentType = this.componentDetailsForVerificationService.getVerificationItem().componentType;
    console.log("id",this._id)
    console.log("caseId",this.caseId)
    console.log("component_id",this.component_id)

    this.componentService.findAllComponentDataforACase(this._id).subscribe(
      response=>{
        console.log('response == ', response);
        
        this.allComponentData = response
        console.log("Check",this.allComponentData )
        this.allComponentData.forEach((comp:any) => {
          if(comp.status === "MENTOR-REVIEW-ACCEPTED" || comp.status === "OUTPUTQC-ACCEPTED" ){
            comp.status = "COMPLETED"
          }else if(comp.status.toLowerCase().includes("insuf")){
            comp.status = "INSUFFICIENCY"
          }else{
            comp.status = "PENDING"
          }
        })
      }
       ,
      error=>{
        console.log("Error getting all componenets", error)
      })
      

    console.log("Case Id being sent to reports to fetch for is  ",this.caseId);
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
    // this.componentService.findAllComponents().subscribe(
    //   response=>{
    //     response.forEach(component=>{
    //       this.componentDataService.findAllForACase(component.name,this._id).subscribe(
    //         response2=>{
    //           response2.forEach(item=>{
    //             let componentDetails = ({

    //             })
    //             componentDetails["_id"] = item._id;
    //             componentDetails["caseId"] = this.caseId;
    //             componentDetails["case_id"] = this._id;
    //             componentDetails["candidateName"] = this.candidateName;
    //             componentDetails["clientName"] = this.clientName;
    //             componentDetails["subclientName"] = this.subclientName;
    //             componentDetails["componentDisplayName"]=component.displayName;
    //             componentDetails["componentName"]=component.name;
    //             componentDetails["component_id"]=component._id;
    //             componentDetails["status"]=item.status;
    //             componentDetails["field1"] = this.fillFieldDetails(component.name,"field1",item)
    //             componentDetails["field2"] = this.fillFieldDetails(component.name,"field2",item)
    //             componentDetails["field3"] = this.fillFieldDetails(component.name,"field3",item)
    //             if(item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED'){
    //               componentDetails["displayStatus"] ="Completed"
    //               componentDetails["gradingColor"] = item.grade != null ? this.getGradingColor(item.grade) :""
    //             }else if(item.status == 'INSUF-2-REQ-ACCEPTED' || item.status == 'INSUF-2-REQ' ||  item.status == 'INSUF-1-REQ-ACCEPTED' || item.status == 'INSUF-1-REQ' ||  item.status=='CLARIFICATION-REQ-ACCEPTED' || item.status=='COST-APPROVAL-REQ-ACCEPTED'){
    //               componentDetails["displayStatus"] ="Insuf / Cost Approval / Clarification"
    //             }else{
    //               componentDetails["displayStatus"] ="Pending"
    //             }
    //             this.dataSource.data.push(componentDetails);
    //           })
    //           this.dataSource._updateChangeSubscription();
    //         },
    //         error=>{
    //           this.showError(error.error.message);
    //         }
    //       )
    //     })
    //   },
    //   error=>{
    //     this.showError(error.error.message);
    //   }
    // )
    this.getCaseDetails()

  }
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
  getGradingColor(grade: { toString: () => any; }){
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
  downloadReportButtonClicked(item: { type: any; fileName: any; }){
    ////console.log("about to download report for  case",this.caseId)
    ////console.log("about to download report of type",item.type)
    ////console.log("about to download report with file name",item.fileName)
    this.caseUploadService.downloadPdfReport(this.caseId,item.type,item.fileName).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        console.log("aasdascsadsad",response);
        FileSaver.saveAs(response.body,`${item.fileName}`);
      },
      error=>{
        this.showError("Error downloading pdf report")
      }) 
        
  }

  ///

  viewReportButtonClicked(item: { type: any; fileName: any; }) {

    this.caseUploadService.downloadPdfReport(this.caseId, item.type, item.fileName).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        this.pdfUrl = response.body;
        console.log("blob is ",this.pdfUrl);
        this.showDocumentDialog = true;
        console.log("showing the document now");
      },
      error => {
        this.showError("Error downloading PDF report");
      }
    );
  }

  closeDocumentDialog(){
    this.showDocumentDialog=false;
  }

  
  ////
  getColorCode(grade:any){
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
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }

  addFormFields(){
    this.componentFields.forEach((item: { lhsRhs: string; name: any; })=>{
      if(item.lhsRhs=="LHS" || item.lhsRhs=="BOTH"){
        this.componentDataEntryForm.addControl(item.name,new FormControl(''));   
      }
    })
  }  
  getComponentDetails(){
/*    this.componentService.findAComponent(this.currentComponent).subscribe(
      response=>{
        this.currentComponentFileUploadRequired = response.fileUploadRequired;
        this.currentComponentName = response.name;
        this.currentComponentDisplayName = response.displayName;
        this.currentComponentFields = response.componentFields;
        this.addFormControls();
        //console.log('saved_id is ',this.saved_id);
        if(this.saved_id !=''){
          this.componentDataService.findOne(this.currentComponentName,this.case_id,this.saved_id).subscribe(
            response=>{
//              this.componentDataEntryForm.setValue(response)
              //console.log('response is ',response);
              this.currentComponentFields.forEach(item=>{
                if(item.type != 'DATE'){
                  this.componentDataEntryForm.get(item.name).setValue(response[item.name]);
                }else{
                  this.componentDataEntryForm.get(item.name).setValue(this.datePipe.transform(response[item.name],'yyyy-MM-dd'));
                }
              })
//              this.componentDataEntryForm.get('status').setValue(response.dataEntryStatus);
//              this.componentDataEntryForm.get('insufficiencyComments').setValue(response.insufficiencyComments);              
              this.inputqcForm.get('status').setValue(response.status);
              this.inputqcForm.get('inputqcComments').setValue(response.inputqcComments);                            
              //console.log(response);
              //console.log('about to get files if any');
              this.componentDataService.readFileNames(this.currentComponentName,this.caseId,this.saved_id).subscribe(
                response2=>{
                  this.files = response2;                  
                  //console.log('files  is ',this.files);
                },
                error=>{
                  //console.log(error);
                }
              )

            },
            error=>{
              //console.log(error);
              this.showError(error.error.message);
            }
            
          )
        }
      },
      error=>{
        //console.log("error ",error.error.message);
      }
    )    */
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
      response=>{
        this.componentFields.forEach((item:any)=>{
          if(item.type != 'DATE'){
            //console.log("item  name is ",item.name);
            this.componentDataEntryForm.get(item.name)?.setValue(response[item.name]);
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
//            this.componentDataEntryForm.get(item.name).setValue(this.datePipe.transform(response[item.name],'yyyy-MM-dd'));
            this.componentDataEntryForm.get(item.name)?.setValue(yyyy+ '-' + stringmm + '-' +stringdd)
          }     
          //console.log("Item Status is ",item.status);
          this.componentDataEntryForm.get('dataEntryStatus')?.setValue(response.status);
          if(response.status=="INSUF-1-REQ"){
            this.componentDataEntryForm.get('dataEntryStatus')?.setValue(response.status);
            this.componentDataEntryForm.get('insufficiencyComments')?.setValue(response.insufficiencyComments);
          }
        }) 
      },
      error=>{
        //console.log(error);
      }
    ) 

  }  

  addUniversityChangeListener(control:AbstractControl){

  }  
  addCompanyChangeListener(control:AbstractControl){

  }  
  getFlexPercent(size:number){
    if(size <= 30){
      return "15%"
    }else{
      return "30%"
    }
  }
  getFieldSize(componentField:any){
    return componentField.size;
  } 
  getValues(name:any){
    for(let field of this.componentFields){
      if(field.name == name){
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }  
}
