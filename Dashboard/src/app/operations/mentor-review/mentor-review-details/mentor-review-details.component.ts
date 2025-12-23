import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { ComponentDataService } from '../../service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from 'src/app/shared/service/history.service';
import { QuicknoteComponent } from 'src/app/quicknote/quicknote.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';

interface ComponentDetails {
  caseId:any;
  _id:any;
}

@Component({
  selector: 'app-mentor-review-details',
  templateUrl: './mentor-review-details.component.html',
  styleUrls: ['./mentor-review-details.component.scss'] 
})
export class MentorReviewDetailsComponent {
   previewFile: any = null; //added line oct-16//
  @Input() selectedRow:any;
  @Output() dataToParent = new EventEmitter<any>();
  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  client_id!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string;
    /////
    fathername!: string;
    dob!: string;
    contact!:number;
    emailid!:string;
    doj!:string;
    process!:string;
    place!:string;
    /////
      ///tat//
  tatStartDate!:string;
  tatEndDate!:string;
   /////
  component_id!: string;
  componentName!: string;
  componentDisplayName!: string;
  componentType!: string;
      ///check wise comments
      colorType!:string; 
      comment!:string
      ShowComments:boolean=false;
       ///check wise comments
  componentFields!: any[];
  colorCodes!: any[];
  candidateDocuments!: string[];
  proofsUploaded!: string[];
  casedox!: string[]; 

  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;

  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;

  dataSourceHistory = new MatTableDataSource();
  historyDisplayedColumns = ['date','user','operation','status','remarks','nextfollowupdate','expectedclosuredate','allocatedToVendor','allocatedToFe','allocatedToVerifier','verificationcost'];

  providedDetailsForm = new FormGroup({

  })

  verifiedDetailsForm!:FormGroup

  educationPvForm = new FormGroup({
    universityOrInstitutionName:new FormControl('',[Validators.required]),
    address:new  FormControl('',[Validators.required]),
    pin:new FormControl('',Validators.required),
    city:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    contactNumber:new FormControl('')
  })
  mentorReviewStatusForm!:FormGroup
  constructor(
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
    private caseUploadService:CaseUploadService,
    private historyService:HistoryService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private location:Location,
    private router :Router,


  ){
    this.verifiedDetailsForm = this.fb.group({
      action:[''],
      verificationStatus:['',[Validators.required]],
      insufficiencyComments:[''],
      grade: [{ value: '', disabled: true }],
      gradingComments:[''],
      personContacted: [''],
      contactNumberOfPersonContacted: [''],
      interimOrFinal:[{ value: '', disabled: true }],
      // mode:[{ value: '', disabled: true }]
    })

    this.mentorReviewStatusForm = this.fb.group({
      status : ['',[Validators.required]],
      mentorReviewComments : ['']
    })
  }

  componentOnInit(){
    // console.log('selected row === ', this.selectedRow.colorCodes);
    // console.log('component data === ', this.componentDetailsForVerificationService.getVerificationItem());
    
    let {caseId, case_id, candidateName, client_id, clientName, subclient_id, subclientName, contact, fathername, dob, emailid, doj, process, place, tatStartDate, tatEndDate, colorCodes, componentFields,component_id,componentName, componentDisplayName, componentType, _id} = this.componentDetailsForVerificationService.getVerificationItem();
    this.caseId = caseId;
    this.case_id = case_id;
    this.candidateName = candidateName;
    this.client_id = client_id;
    this.clientName = clientName;
    this.subclient_id = subclient_id;
    this.subclientName = subclientName;
      /////
      this.fathername = fathername;
      this.dob = dob;
      this.contact = contact;
      this.emailid = emailid;
      this.doj = doj;
      this.process = process;
      this.place = place;
  /////
  this.tatStartDate = tatStartDate;
  this.tatEndDate  = tatEndDate;
    this.colorCodes = colorCodes;
    this.componentFields= componentFields;
    this.component_id = component_id;
    this.componentName = componentName;
    this.componentDisplayName = componentDisplayName;
    this.componentType = componentType;
    this._id = _id;
    this.colorType = this.componentDetailsForVerificationService.getVerificationItem().colorType;
    this.comment = this.componentDetailsForVerificationService.getVerificationItem().comments;
    console.log("Looking for scope of work",this.colorType,this.comment);
    if (!this.comment  ) {
      this.ShowComments = false;
    } else {
      this.ShowComments = true;
    }

    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response=>{
        this.componentFields = response;
        this.addFormFields();
        this.getLhsAndRhsDetails();
      },
      error=>{
        console.log(error);
      }
    )
    this.componentDataService.readFileNames(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        this.candidateDocuments = response;
      },
      error=>{
        console.log(error);
      }
    )
    
    // this.componentDataService.readProofOfWorks(this.componentName,this.caseId,this._id).subscribe(
    //   response=>{
    //     //console.log('response from read proof of works ',response);
    //     this.proofsUploaded = response;
    //   },
    //   error=>{
    //     console.log(error);
    //   }
    // )
    this.readCaseDox()

  this.readProofOfWork()
    this.getHistoryDetails();
  }

  ngOnChanges(){
    this.componentOnInit()
  }

  ngOnInit(){
    ///sharath///
        const intrimQCDetails=this.componentDetailsForVerificationService.getVerificationItem();
    if(!intrimQCDetails){
      this.router.navigate(['/home/mentorreview/mentorreviewlist'])
      return;
    }
    //////////////
    let row = this.componentDetailsForVerificationService.getVerificationItem();
    console.log('row == ', row);
    this.componentOnInit()
  }

  readProofOfWork(){
    this.proofsUploaded=[]
    this.componentDataService.readProofOfWorks(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        //console.log('response from read proof of works ',response);
        this.proofsUploaded = response;
      },
      error=>{
        //console.log(error);
      }
    )
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
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
    
      
      response=>{
        console.log("deta:",response);
        this.verifiedDetailsForm.get('verificationStatus')!.setValue(response.verificationStatus);
        this.verifiedDetailsForm.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
        this.verifiedDetailsForm.get('grade')!.setValue(response.grade);
        this.verifiedDetailsForm.get('gradingComments')!.setValue(response.gradingComments);
        this.verifiedDetailsForm.get('personContacted')!.setValue(response.personContacted);
        this.verifiedDetailsForm.get('contactNumberOfPersonContacted')!.setValue(response.contactNumberOfPersonContacted);
        this.verifiedDetailsForm.get('interimOrFinal')!.setValue(response.interimOrFinal);
        // this.verifiedDetailsForm.get('mode')!.setValue(response.mode);
        this.componentFields.forEach(item=>{
          if(item.type !='DATE'){
//            this.providedDetailsForm.get(item.name).setValue(response[item.name]);
//            this.verifiedDetailsForm.get(item.name+'Rhs').setValue(response[item.name+'Rhs']);
            if(this.providedDetailsForm.get(item.name) != null){
              this.providedDetailsForm.get(item.name)!.setValue(response[item.name]);
            }
            if (this.verifiedDetailsForm.get(item.name+'Rhs') !== null) {
              this.verifiedDetailsForm.get(item.name+'Rhs')!.setValue(response[item.name+'Rhs']);
            }
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
      },
      error=>{
        //console.log(error);
      }
    )
  }

  addFormFields(){
    this.componentFields.forEach(item=>{
      if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
        this.providedDetailsForm.addControl(item.name,new FormControl(''));
      }
      if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
        
        if(item.mandatory=='MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl('',[Validators.required]));
        }else if(item.mandatory == 'NOT-MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
        }else if(item.mandatory == 'FIELD-VALUE'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
          //console.log("item name for which value change listener is being added is  ",item.name);
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
  getValues(name:any){
    for(let field of this.componentFields){
      if(field.name == name){
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }

  // reviewStatusChanged(event:any){
  //   //console.log('status changed');
  //   const offcanvasElement = document.getElementById('statusOffcanvas');
  //   this.renderer.addClass(offcanvasElement, 'show');    
  //   if(this.mentorReviewStatusForm.get('status')?.value=='MENTOR-REVIEW-REJECTED'){
  //     this.mentorReviewStatusForm.get('mentorReviewComments')?.setValidators(Validators.required);
  //   }else{
  //     this.mentorReviewStatusForm.get('mentorReviewComments')?.clearAsyncValidators();
  //   }

  // }
  reviewStatusChanged(event:any) {
    // console.log('status changed');
        const offcanvasElement = document.getElementById('statusOffcanvas');
    this.renderer.addClass(offcanvasElement, 'show');    
    if (this.mentorReviewStatusForm.get('status')?.value === 'MENTOR-REVIEW-REJECTED') {
      this.mentorReviewStatusForm.get('mentorReviewComments')?.setValidators([Validators.required]);
    } else {
      this.mentorReviewStatusForm.get('mentorReviewComments')?.clearValidators();
    }
  
    // Update value and validity after changing validators
    this.mentorReviewStatusForm.get('mentorReviewComments')?.updateValueAndValidity();
  }

  closeOffcanvas(){
    const offcanvasElement = document.getElementById('statusOffcanvas');
    this.renderer.removeClass(offcanvasElement, 'show');
  }

  saveStatusButtonClicked(){
    // console.log("Raw VAlues",this.mentorReviewStatusForm.getRawValue());
    
    let mentorReviewStatusData = this.mentorReviewStatusForm.getRawValue();
    console.log("mentorReviewStatusData",this.mentorReviewStatusForm.getRawValue())
    mentorReviewStatusData.data  = this.verifiedDetailsForm.getRawValue()
    console.log("mentorReviewStatusData.data",mentorReviewStatusData);
    
    console.log("qwert",this.verifiedDetailsForm.getRawValue())


    
    mentorReviewStatusData.case_id = this.case_id;
    mentorReviewStatusData._id = this._id;
    this.componentDataService.updateMentorReviewStatus(this.componentName,mentorReviewStatusData).subscribe(
      response=>{
        console.log('res == ', response);
        console.log("mentorReviewStatusData",this.mentorReviewStatusForm.get('status')?.value);
        console.log("!!!!!!!!!!!!!!!",mentorReviewStatusData.status);
        if(mentorReviewStatusData.status === 'MENTOR-REVIEW-ACCEPTED'){
          this.caseUploadService.updateCaseStatus(this.case_id,{status:"MENTOR-REVIEW-ACCEPTED"}).subscribe(
            response2=>{
              console.log("Status Saved")
              // this.dataToParent.emit();
              this.showMessage("Data Saved"); 
              this.router.navigate(['/home/mentorreview/mentorreviewlist']).then(() => {
                // After navigation is complete, reload the page
                window.location.reload();
              });
              

            },
            error2=>{
              //console.log("error",error2)
              console.log("Error updating case status", error2)
            }
          )
        }else if (this.mentorReviewStatusForm.get('status')?.value === 'MENTOR-REVIEW-REJECTED') {
          // console.log("respoooooooo1111111",);

          this.caseUploadService.updateCaseStatus(this.case_id, { status: "MENTOR-REVIEW-REJECTED" }).subscribe(
            response2 => {
              console.log("respoooooooo22222",response2);
              // this.dataToParent.emit();
              this.showMessage("Data Saved");
              // this.router.navigate(["/home/mentorreview/mentorreviewlis"])
              this.router.navigate(['/home/mentorreview/mentorreviewlist']).then(() => {
                // After navigation is complete, reload the page
                window.location.reload();
              });
              
              
              

            },
            error2 => {
              this.showError("Error updating case status");
            }
          );
        }
   
      },
      error=>{
        console.log(error.error.message);
      }
    )
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

  ///preview file for all Doc's

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

// ///peview for checkDoc's

// previewCandidateDoc(fileName: string): void {
//   const componentData = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadCanDox(this.componentName, componentData, fileName).subscribe(
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
//             componentName: this.componentName // Optional
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

// //// preview for prove docs
// previewProofOfWork(fileName: string) {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
//     (response: HttpResponse<Blob>) => {
//       if (response.body) {
//         const fileBlob = response.body;
//         const fileType = response.body.type;

//         const dialogRef = this.dialog.open(FilePreviewDialogComponent, {
//           width: '900px',
//           data: {
//             fileName,
//             fileBlob,
//             fileType,
//             componentName: this.componentName
//           }
//         });

//         dialogRef.afterClosed().subscribe(result => {
//           if (result?.delete) {
//             this.deleteProofOfWork(fileName); // Call delete if user confirms
//           }
//         });
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }

////////added code oct-16///

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
    error =>this.showError(error.error.message)  
  );
}

///peview for checkDoc's

previewCandidateDoc(fileName: string): void {
  const componentData = {
    caseId: this.caseId,
    _id: this._id
  };

  this.componentDataService.downloadCanDox(this.componentName, componentData, fileName).subscribe(
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

//// preview for prove docs
previewProofOfWork(fileName: string) {
  const componentDetails = {
    caseId: this.caseId,
    _id: this._id
  };

  this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
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

// Close preview
closePreview(): void {
  this.previewFile = null;
}

handlePreviewClose(event?: { delete?: boolean }) {
  if (event?.delete && this.previewFile?.fileName) {
  if (this.previewFile.fileCategory === 'proofdoc') {
      this.deleteProofOfWork(this.previewFile.fileName);
    }
  }
 
  this.previewFile = null;
}
////////////////////////////



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


//////////
deleteProofOfWork(fileName:any){

  let componentDetails : ComponentDetails = ({
    caseId:this.caseId,
    _id:this._id
  })
 

  const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
    width:'400px',data:{message:`Are you sure that you want to delete the Annexure ?`}
  });
  deleteDialog.afterClosed().subscribe(result=>{
      if(result.event=='confirmed'){
        this.componentDataService.deleteProofOfWork(this.componentName,componentDetails,fileName).subscribe(
          response=>{
            this.showMessage("File Deleted");
            this.readProofOfWork()
          },
          error=>{
            this.showError("Error deleting the file")
          }
        )
      }
    })
}
/////////
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

// Compare Data 
compareLHSAndRHSValues():void{
  this.componentFields.forEach(item=>{
   const lhsValue = this.providedDetailsForm.get(item.name)?.value;
   const rhsValue = this.verifiedDetailsForm.get(item.name+"Rhs")?.value;
   console.log(item.name,lhsValue,rhsValue);
   
   const element = document.getElementById(item.name+"Rhs");
   if (element) {
    
    if (lhsValue!==rhsValue) {
 
      if(element.tagName==="MAT-SELECT"){
        const matSelectValueElement = element.querySelector('.mat-select-value');
        if(matSelectValueElement){
          this.renderer.setStyle(matSelectValueElement, 'color', 'red');
          return
        }
      }
      
      this.renderer.setStyle(element, 'color', 'red');

    }else{
      if(element.tagName==="MAT-SELECT"){
        const matSelectValueElement = element.querySelector('.mat-select-value');
        if(matSelectValueElement){
          this.renderer.setStyle(matSelectValueElement, 'color', 'red');
          return
        }
      }
      this.renderer.setStyle(element, 'color', 'black');
    }
  }


 
  })
}

downloadCDF
(fileName: string) {
  
  const componentData = {
    caseId: this.caseId,
    _id: this._id
  };
  console.log("ANy thing",componentData);
  // this.displayedProofOfWorkDocName = fileName;
  // const componentDetails = {
  //     caseId: this.selectedRow.caseId,
  //     componentId: this.selectedRow._id,
  //     componentName:this.selectedRow.componentName
  // };
  // console.log("ANy thing",componentDetails);
  this.componentDataService.downloadCanDox( this.componentName ,componentData, fileName).subscribe(
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
  
// this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
//   (response:any)=>{
//     FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
//   },
//   error=>{
//     //console.log(error);
//   }
// );
}

downloadcdfFile(fileName: string){
  this.displayedProofOfWorkDocName = fileName;
  const componentDetails = {
      caseId: this.caseId,
      _id: this._id
  };

  this.componentDataService.downloadcdf( componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
          if (response.body) {
              console.log("response", response.body.type);

                  FileSaver.saveAs(response.body, fileName + (response.body.type.includes("msword") ? "doc" : ""));
            
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

showMessage(msg: string){
  this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
showError(msg: string){
  this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
}
