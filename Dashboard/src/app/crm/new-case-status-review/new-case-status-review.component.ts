import { Component, Input, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { AllComponentsDataService } from 'src/app/operations/data-entry/service/all-components-data.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as FileSaver from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from 'src/app/shared/service/history.service';
import { QuicknoteComponent } from 'src/app/quicknote/quicknote.component';
import { CheckFieldHistoryComponent } from 'src/app/check-field-history/check-field-history.component';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';
import { PersonalDetailsDataService } from 'src/app/operations/data-entry/service/personal-details-data.service';

@Component({
  selector: 'app-new-case-status-review',
  templateUrl: './new-case-status-review.component.html',
  styleUrls: ['./new-case-status-review.component.scss']
})
export class NewCaseStatusReviewComponent {
   previewFile: any = null; //added line oct-16//
  
  @Input() selectedRow:any;
  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  client_id!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string;
  component_id!: string;
  componentName!: string;
  componentDisplayName!: string;
  componentType!: string;
  componentFields!: any[];
  colorCodes!: any[];
  candidateDocuments!: string[];
  proofsUploaded!: string[];
  casedox!: string[]; 
  
  dataSourceHistory = new MatTableDataSource();
  historyDisplayedColumns = ['date','user','operation','status','remarks','nextfollowupdate','expectedclosuredate','allocatedToVendor','allocatedToFe','allocatedToVerifier','verificationcost'];
  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;
  ///check wise comments
  colorType!:string;
  comment!:string
  ShowComments:boolean=false;
  ///check wise comments
  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;
  fathername!: string;
  dob!: string;
  contact!:number;
  emailid!:string;
  doj!:string;
  process!:string;
  number!:string;
  place!:string;
  tatStartDate !:string;
  tatEndDate!:string;
  providedDetailsForm = new FormGroup({
    
  })
  dataSource = new MatTableDataSource();
  
  verifiedDetailsForm:FormGroup;
  /*  educationPvForm = new FormGroup({
  universityOrInstitutionName:new FormControl('',[Validators.required]),
  address:new  FormControl('',[Validators.required]),
  pin:new FormControl('',Validators.required),
  city:new FormControl(''),
  state:new FormControl(''),
  country:new FormControl(''),
  contactNumber:new FormControl('')
  }) */
  outputqcStatusForm = new FormGroup({
    status : new FormControl('',[Validators.required]),
    outputqcComments : new FormControl('')
  })
  constructor(
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
    private caseUploadService:CaseUploadService,
    private allComponentsDataService:AllComponentsDataService,
    private dialog:MatDialog,
    private location:Location,
    private snackBar:MatSnackBar,
    private personalDetailsDataService:PersonalDetailsDataService,
    
    private historyService:HistoryService,
  ) { 
    this.verifiedDetailsForm = new FormGroup({
      action:new FormControl(''),
      verificationStatus:new FormControl('',[Validators.required]),
      insufficiencyComments:new FormControl(''),
      grade: new FormControl(''),
      gradingComments:new FormControl(''),
      personContacted: new FormControl(''),
      contactNumberOfPersonContacted: new FormControl(''),
      fieldcommentsRhs: new FormControl(''),
      interimOrFinal:new FormControl(''),
      // mode:new FormControl('')
    })
  }
  
  ngOnInit(): void {
    // let {caseId, case_id, candidateName, client_id, clientName, subclient_id, subclientName, colorCodes, componentFields,component_id,componentName, componentDisplayName, componentType, _id} = this.selectedRow;
    this.colorCodes = this.componentDetailsForVerificationService.getVerificationItem().colorCodes; 
    
    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
    this.case_id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.candidateName = this.componentDetailsForVerificationService.getVerificationItem().candidateName;
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().clientId;
    this.clientName = this.componentDetailsForVerificationService.getVerificationItem().clientName;
    this.subclient_id = this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
    this.subclientName = this.componentDetailsForVerificationService.getVerificationItem().subclientName;
    this.colorCodes = this.componentDetailsForVerificationService.getVerificationItem().colorCodes;
    console.log("color codes is ",this.colorCodes); 
    this.componentFields= this.componentDetailsForVerificationService.getVerificationItem().componentFields;
    this.component_id = this.componentDetailsForVerificationService.getVerificationItem().component_id;
    this.componentName = this.componentDetailsForVerificationService.getVerificationItem().componentName;
    this.componentDisplayName = this.componentDetailsForVerificationService.getVerificationItem().componentDisplayName;
    this.componentType = this.componentDetailsForVerificationService.getVerificationItem().componentType;
    this.colorType = this.componentDetailsForVerificationService.getVerificationItem().colorType;
    this.comment = this.componentDetailsForVerificationService.getVerificationItem().comments;
    // this.fathername = this.componentDetailsForVerificationService.getVerificationItem().fathername
    // this.dob = this.componentDetailsForVerificationService.getVerificationItem().dob
    // this.contact = this.componentDetailsForVerificationService.getVerificationItem().contact
    // this.emailid = this.componentDetailsForVerificationService.getVerificationItem().emailid
    // this.doj = this.componentDetailsForVerificationService.getVerificationItem().doj
    // this.process = this.componentDetailsForVerificationService.getVerificationItem().process
    // this.number = this.componentDetailsForVerificationService.getVerificationItem().number
    // this.place = this.componentDetailsForVerificationService.getVerificationItem().place
    // this.tatStartDate = this.componentDetailsForVerificationService.getVerificationItem().tatStartDate
    // this.tatEndDate = this.componentDetailsForVerificationService.getVerificationItem().tatEndDate
    console.log("Looking for scope of work",this.colorType,this.comment);
    if (!this.comment  ) { 
      this.ShowComments = false;
    } else {
      this.ShowComments = true;
    }
    this._id = this.componentDetailsForVerificationService.getVerificationItem()._id;
    
    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response=>{
        this.componentFields = response;
        this.addFormFields();
        this.getLhsAndRhsDetails();
      },
      error=>{
        //console.log(error);
      }
    )
    this.componentDataService.readFileNames(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        this.candidateDocuments = response;
      },
      error=>{
        //console.log(error);
      }
    )
    this.componentDataService.readProofOfWorks(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        //console.log('response from read proof of works ',response);
        this.proofsUploaded = response;
      },
      error=>{
        //console.log(error);
      }
    )
    this.personalDetailsDataService.read(this.case_id).subscribe(
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
    this.readCaseDox()
    
  }
  
  readCaseDox(){
    this.casedox=[]
    this.componentDataService.readcdf(this.caseId).subscribe(
      response=>{
        console.log('response from read proof of works ',response);
        this.casedox = response;
      },
      error=>{
        //console.log(error);
      }
    )
  }
  getLhsAndRhsDetails(){
    //console.log(`in get lhs and rhs details`);
    //console.log(`case_id is `,this.case_id);
    //console.log(`_id is `,this._id);
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
      response=>{
        //console.log('response for this component is ',response);
        this.verifiedDetailsForm.get('verificationStatus')!.setValue(response.verificationStatus);
        this.verifiedDetailsForm.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
        this.verifiedDetailsForm.get('grade')!.setValue(response.grade);
        this.verifiedDetailsForm.get('gradingComments')!.setValue(response.gradingComments);
        this.verifiedDetailsForm.get('personContacted')!.setValue(response.personContacted);
        this.verifiedDetailsForm.get('contactNumberOfPersonContacted')!.setValue(response.contactNumberOfPersonContacted);
        this.verifiedDetailsForm.get('fieldcommentsRhs')!.setValue(response.fieldcommentsRhs)
        this.verifiedDetailsForm.get('interimOrFinal')!.setValue(response.interimOrFinal);
        // this.verifiedDetailsForm.get('mode')!.setValue(response.mode);
        this.componentFields.forEach(item=>{
          if(item.type !='DATE'){
            //            this.providedDetailsForm.get(item.name).setValue(response[item.name]);
            //            this.verifiedDetailsForm.get(item.name+'Rhs').setValue(response[item.name+'Rhs']);
            if(this.providedDetailsForm.get(item.name) != null){
              this.providedDetailsForm.get(item.name)!.setValue(response[item.name]);
            }
            this.verifiedDetailsForm.get(item.name+'Rhs')!.setValue(response[item.name+'Rhs']);
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
            if(this.providedDetailsForm.get(item.name) != null){
              this.providedDetailsForm.get(item.name)!.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
            }
            dateValue = new Date(response[item.name+'Rhs']);
            dd = dateValue.getDate();
            mm = dateValue.getMonth()+1;
            yyyy = dateValue.getFullYear().toString();
            stringdd = '';
            stringmm = ''
            
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
            this.verifiedDetailsForm.get(item.name+'Rhs')!.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
          }
          
          
        })
        //         this.componentFields.forEach(item=>{
        //           if(this.providedDetailsForm.get(item.name) != null){
        //             if(item.type != 'DATE'){
        //               //console.log("item  name is ",item.name);
        //               this.providedDetailsForm.get(item.name).setValue(response[item.name]);
        //             }else{
          //               let dateValue = new Date(response[item.name]);
        //               let dd = dateValue.getDate();
        //               let mm = dateValue.getMonth()+1;
        //               let yyyy = dateValue.getFullYear().toString();
        //               let stringdd = '';
        //               let stringmm = ''
        //               if(dd < 10){
        //                 stringdd = '0'+dd;
        //               }else{
          //                 stringdd = dd.toString();
        //               }
        //               if(mm < 10){
        //                 stringmm = '0'+mm;
        //               }else{
          //                 stringmm= mm.toString();
        //               }
        //   //            this.componentDataEntryForm.get(item.name).setValue(this.datePipe.transform(response[item.name],'yyyy-MM-dd'));
        //               this.providedDetailsForm.get(item.name).setValue(yyyy+ '-' + stringmm + '-' +stringdd)
        //             }
        //           }
        //           if(this.verifiedDetailsForm.get(item.name + 'Rhs') != null){
        //             if(item.type != 'DATE'){
        //               //console.log("item  name is ",item.name);
        //               this.verifiedDetailsForm.get(item.name + 'Rhs').setValue(response[item.name + 'Rhs']);
        //             }else{ 
          //               let dateValue = new Date(response[item.name + 'Rhs']);
        //               let dd = dateValue.getDate();
        //               let mm = dateValue.getMonth()+1;
        //               let yyyy = dateValue.getFullYear().toString();
        //               let stringdd = '';
        //               let stringmm = ''
        //               if(dd < 10){
        //                 stringdd = '0'+dd;
        //               }else{
          //                 stringdd = dd.toString();
        //               }
        //               if(mm < 10){
        //                 stringmm = '0'+mm;
        //               }else{
          //                 stringmm= mm.toString();
        //               }
        //   //            this.componentDataEntryForm.get(item.name).setValue(this.datePipe.transform(response[item.name],'yyyy-MM-dd'));
        //               this.verifiedDetailsForm.get(item.name + 'Rhs').setValue(yyyy+ '-' + stringmm + '-' +stringdd)
        //             }
        //           }
        // //          this.verifiedDetailsForm.get(item.name+'Rhs').setValue(response[item.name+'Rhs']);
        //         })
      },
      error=>{
        //console.log(error);
      }
    )
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
  addFormFields(){
    this.componentFields.forEach(item=>{
      if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
        this.providedDetailsForm.addControl(item.name,new FormControl(''));
      }
      if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
        if(item.mandatory=='MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl('',[Validators.required]));
        }else if(item.mandatory=='NOT-MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
        }else if(item.mandatory=='FIELD-VALUE'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
          this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.valueChanges.subscribe(
            response=>{
              if(item.condition == '=='){
                if(this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.value == item.conditionValue){
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.setValidators([Validators.required]);
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true})
                }else{
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.clearValidators();
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }
              }else if(item.condition == '!='){
                if(this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.value != item.conditionValue){
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.setValidators([Validators.required]);
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }else{
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.clearValidators();
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }
              }
            },
            error=>{
              //console.log("Error during value change response",error)
            }
          )
        }
      }
      
    })
  }
  outputqcStatusChanged(event:any){
    if(this.outputqcStatusForm.get('status')!.value=='REJECTED'){
      this.outputqcStatusForm.get('outputqcComments')!.setValidators(Validators.required);
    }else{
      this.outputqcStatusForm.get('outputqcComments')!.clearAsyncValidators();
    }
  }
  downloadCandidateDoc(fileName:any){
    this.displayedCandidateDocName = fileName;
    let componentDetails:any = ({
      
    })
    componentDetails["caseId"] = this.caseId;
    componentDetails["_id"] = this._id;
    this.componentDataService.downloadFile(this.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        this.candidateDocBlob = response.body;
        this.showCandidateDocsDialog = true;
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  //09Aug2023
  downloadProofOfWork(fileName: string) {
    this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
      caseId: this.caseId,
      _id: this._id
    };
    
    this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          console.log("response", response.body.type);
          // if (response.body.type === "audio/mpeg") {
          //     FileSaver.saveAs(response.body, "audio.mp3");
          // } else if (response.body.type === "application/pdf") {
          //     this.proofOfWorkDocBlob = response.body;
          //     this.toggleProofOfWorkDialog();
          // } else {
            FileSaver.saveAs(response.body, fileName + "." +(response.body.type.includes("msword") ? "doc" : ""));
          // }
        } else {
          // Handle the case when response.body is null
          console.error("Received null response body");
        }
      },
      error => {
        this.showError(error.error.message);
      }
    );
  }
  closeProofOfWorkDocsDialog(){
    this.showProofOfWorkDialog = false;
  }
  closeCandidateDocsDialog(){
    this.showProofOfWorkDialog = false;
  }
  backButtonClicked(){
    this.location.back();
  }
  saveStatusButtonClicked(){
    let outputqcStatusData:any = this.outputqcStatusForm.getRawValue();
    outputqcStatusData.case_id = this.case_id;
    outputqcStatusData._id = this._id;
    //console.log(outputqcStatusData);
    this.componentDataService.updateOutputqcStatus(this.componentName,outputqcStatusData).subscribe(
      response=>{
        if(this.outputqcStatusForm.get('status')!.value == 'OUTPUTQC-ACCEPTED'){
          /*          this.caseUploadService.updateCaseStatus(this.case_id,{status:"OUTPUTQC-ACCEPTED"}).subscribe(
          response2=>{
          this.showMessage("Status Saved")
          //console.log(response2);
          this.allComponentsDataService.createJpgs(this.caseId,this.componentName,this._id).subscribe(
          allComponentsResponse=>{
          //console.log(allComponentsResponse);
          },
          error=>{
          this.showError("Error Converting PDFs")
          }
          )
          this.location.back();
          },
          error2=>{
          //console.log("error",error2)
          this.showError("Error updating case status")
          }
          )*/
          this.showMessage("Status Saved")
          this.location.back();
        }else{
          this.caseUploadService.updateStatus(this.case_id,{status:"OUTPUTQC-REJECTED"}).subscribe(
            response2=>{
              this.showMessage("Status Saved")
              this.location.back();
            },
            error2=>{
              //console.log("error",error2)
              this.showError("Error updating case status")
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
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus= true;
    dialogConfig.height = '600px'
    dialogConfig.width = '1024px'
    //console.log("Dialog Ref Contains  ",dialogConfig)
    dialogConfig.data = {
      case_id:this.case_id,
      component_id:this.component_id,
      _id:this._id
    }
    const dialogRef = this.dialog.open(HistoryDialogComponent,dialogConfig);
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
  
  
  QuickNote(){
    console.log(this.case_id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px'
    dialogConfig.width = '800px'
    
    
    dialogConfig.data = {
      case_id :this.case_id,
      _id:this._id,
      componentName:this.componentName
      
    }
    console.log("case id",this.case_id)
    // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
    const dialogRef = this.dialog.open(QuicknoteComponent,dialogConfig);
    
    
    
  }
  fieldHistory(){
    console.log(this.case_id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = '800px'
    // dialogConfig.width = '800px'
    
    
    dialogConfig.data = {
      case_id :this.case_id,
      _id:this._id,
      componentName:this.componentName
      
    }
    console.log("case id",this.case_id)
    // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
    const dialogRef = this.dialog.open(CheckFieldHistoryComponent,dialogConfig);
    
    
    
  }
  
  // QuickNote(){
  //   console.log(this.case_id);
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.height = '400px'
  //   dialogConfig.width = '400px'
  
  
  //   dialogConfig.data = {
  //     case_id :this.case_id,
  //     _id:this._id,
  //     componentName:this.componentName
  
  //   }
  //   console.log("case id",this.case_id)
  //   // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
  //   const dialogRef = this.dialog.open(QuicknoteComponent,dialogConfig);
  
  
  
  // }
  
  getClassToApply(){
    // let colorType = this.comments? this.comments.colorType : ""
    let colorType = this.colorType
    if(colorType === "RED"){
      return 'red'
    }else if(colorType === "VIOLET"){
      return 'Violet'
    }else if(colorType === "INDIGO"){
      return 'Indigo'
    }else if(colorType === "BLUE"){
      return 'Blue'
    }else if(colorType === "GREEN"){
      return 'Green'
    }else if(colorType === "YELLOW"){
      return 'Yellow'
    }else if(colorType === "ORANGE"){
      return 'Orange'
    }else if(colorType === "PINK"){
      return 'Pink'
    }else if(colorType === "GREY"){
      return 'Grey'
    }else if(colorType === "PURPLE"){
      return 'Purple'
    }else{
      return '#ED7014'
    }
  }
  
  // downloadCDF
  // (fileName: string) {
  
  
  //   // this.displayedProofOfWorkDocName = fileName;
  //   const componentDetails = {
  //     caseId: this.selectedRow.caseId,
  //     componentId: this.selectedRow._id,
  //     componentName:this.selectedRow.componentName
  //   };
  //   // console.log("ANy thing",componentDetails);
  //   this.caseUploadService.downloadCaseForCDFiii( this.selectedRow.componentName ,componentDetails, fileName).subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       if (response.body) {
  //         console.log("response", response.body.type);
  
  //         FileSaver.saveAs(response.body, fileName + "." + (response.body.type.includes("msword") ? "doc" : ""));
  
  //       } else {
    //         // Handle the case when response.body is null
  //         console.error("Received null response body");
  //       }
  //     },
  //     error => {
  //       this.showError(error.error.message);
  //     }
  //   );
  
  //   // this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
  //   //   (response:any)=>{
  //   //     FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
  //   //   },
  //   //   error=>{
  //   //     //console.log(error);
  //   //   }
  //   // );
  // }
  downloadCDF(fileName: string) {
    this.displayedCandidateDocName = fileName;
    
    // this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
      caseId: this.caseId,
      componentId: this._id,
      componentName:this.componentName
    };
    // console.log("ANy thing",componentDetails);
    this.caseUploadService.downloadCaseForCDFiii(componentDetails.componentName,componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          console.log("response", response.body.type);
          
          FileSaver.saveAs(response.body, fileName + "." + (response.body.type.includes("msword") ? "doc" : ""));
          
        } else {
          // Handle the case when response.body is null
          console.error("Received null response body");
        }
      },
      error => {
        this.showError(error.error.message);
      }
    );
    
    
  }
  
  previewCDF(fileName: string) {
    const componentDetails = {
      caseId: this.caseId,
      componentId: this._id,
      componentName: this.componentName
    };
    
    this.caseUploadService.downloadCaseForCDFiii(componentDetails.componentName, componentDetails, fileName)
    .subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          const fileBlob = response.body;
          const fileType = fileBlob.type;
          
          this.dialog.open(FilePreviewDialogComponent, {
            width: '900px',
            data: { fileName, fileBlob, fileType }
          });
        } else {
          console.error("Received null response body");
        }
      },
      error => this.showError(error.error.message)
    );
  }


  // previewCandidateDoc(fileName: string) {
  //   const componentDetails: any = {
  //     caseId: this.caseId,
  //     _id: this._id
  //   };
    
  //   this.componentDataService.downloadFile(this.componentName, componentDetails, fileName)
  //   .subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       if (response.body) {
  //         const fileBlob = response.body;
  //         const fileType = fileBlob.type;
          
  //         this.dialog.open(FilePreviewDialogComponent, {
  //           width: '900px',
  //           data: { fileName, fileBlob, fileType }
  //         });
  //       }
  //     },
  //     error => this.showError(error.error.message)
  //   );
  // }
  // previewProofOfWork(fileName: string) {
  //   const componentDetails = {
  //     caseId: this.caseId,
  //     _id: this._id
  //   };
    
  //   this.componentDataService.downloadProofOfWorkk(this.componentName, componentDetails, fileName)
  //   .subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       if (response.body) {
  //         const fileBlob = response.body;
  //         const fileType = fileBlob.type;
          
  //         this.dialog.open(FilePreviewDialogComponent, {
  //           width: '900px',
  //           data: { fileName, fileBlob, fileType }
  //         });
  //       }
  //     },
  //     error => this.showError(error.error.message)
  //   );
  // }
  
  // previewAllDoc(fileName: string): void {
  //   const componentDetails = {
  //     caseId: this.caseId,
  //     _id: this._id
  //   };
    
  //   this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       if (response.body) {
  //         const fileBlob = response.body;
  //         const fileType = response.body.type;
          
  //         this.dialog.open(FilePreviewDialogComponent, {
  //           width: '900px',
  //           data: {
  //             fileName,
  //             fileBlob,
  //             fileType,
  //             componentName: this.componentName // Optional: only if used in dialog
  //           }
  //         });
  //       } else {
  //         console.error("Received null response body");
  //       }
  //     },
  //     error => {
  //       this.showError(error.error.message);
  //     }
  //   );
  // }


  
//added code on oct-16//
    previewCandidateDoc(fileName: string) {
    const componentDetails: any = {
      caseId: this.caseId,
      _id: this._id
    };
    
    this.componentDataService.downloadFile(this.componentName, componentDetails, fileName)
    .subscribe(
      (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
          fileCategory: 'candidatedoc' 
        };
      }
    },
    error => this.showError(error.error.message)
  );
  }

  previewProofOfWork(fileName: string) {
    const componentDetails = {
      caseId: this.caseId,
      _id: this._id
    };
    
    this.componentDataService.downloadProofOfWorkk(this.componentName, componentDetails, fileName)
    .subscribe(
      (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
           fileCategory: 'proofdoc', 

        };
      }
    },
    error => this.showError(error.error.message)
  );
  }
  
  previewAllDoc(fileName: string): void {
    const componentDetails = {
      caseId: this.caseId,
      _id: this._id
    };
    
    this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
          fileCategory: 'casedoc'
        };
      }
    },
    error => this.showError(error.error.message)
  );
  }

  // Close preview
closePreview(): void {
  this.previewFile = null;
}

handlePreviewClose(event?: { delete?: boolean }) {
  if (event?.delete && this.previewFile?.fileName) {
    
  }
 
  this.previewFile = null;
}


///end///
  
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}

