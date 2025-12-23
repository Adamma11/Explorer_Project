import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { AllComponentsDataService } from 'src/app/operations/service/all-components-data.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';


interface MentorReviewStatusData {
  status: string | null;
  mentorReviewComments: string | null;
  case_id: string;
  _id: string;
}

@Component({
  selector: 'app-tl-unallocated-review',
  templateUrl: './tl-unallocated-review.component.html',
  styleUrls: ['./tl-unallocated-review.component.scss']
})
export class TlUnallocatedReviewComponent {

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

  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;

  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;

  providedDetailsForm = new FormGroup<any>({

  })
  verifiedDetailsForm = new FormGroup<any>({
    action:new FormControl(''),
    verificationStatus:new FormControl('',[Validators.required]),
    insufficiencyComments:new FormControl(''),
    grade: new FormControl(''),
    gradingComments:new FormControl(''),
    personContacted: new FormControl(''),
    contactNumberOfPersonContacted: new FormControl(''),
    interimOrFinal:new  FormControl(''),
    mode:new  FormControl('')
  })
  educationPvForm = new FormGroup({
    universityOrInstitutionName:new FormControl('',[Validators.required]),
    address:new  FormControl('',[Validators.required]),
    pin:new FormControl('',Validators.required),
    city:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    contactNumber:new FormControl('')
  })
  mentorReviewStatusForm = new FormGroup({
    status : new FormControl('',[Validators.required]),
    mentorReviewComments : new FormControl('')
  })
  constructor(
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
    private caseUploadService:CaseUploadService,
    private allComponentsDataService:AllComponentsDataService,
    private location:Location,
    private dialog:MatDialog,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log("CaseId :",this.componentDetailsForVerificationService.getVerificationItem());

    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
    console.log("CaseId :",this.caseId);
    this.case_id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.candidateName = this.componentDetailsForVerificationService.getVerificationItem().candidateName;
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().client_id;
    this.clientName = this.componentDetailsForVerificationService.getVerificationItem().clientName;
    this.subclient_id = this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
    this.subclientName = this.componentDetailsForVerificationService.getVerificationItem().subclientName;
    this.colorCodes = this.componentDetailsForVerificationService.getVerificationItem().colorCodes;

    this.componentFields= this.componentDetailsForVerificationService.getVerificationItem().componentFields;
    this.component_id = this.componentDetailsForVerificationService.getVerificationItem().component_id;
    this.componentName = this.componentDetailsForVerificationService.getVerificationItem().componentName;
    this.componentDisplayName = this.componentDetailsForVerificationService.getVerificationItem().componentDisplayName;
    this.componentType = this.componentDetailsForVerificationService.getVerificationItem().componentType;

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

  }
  getLhsAndRhsDetails(){
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
      response=>{
        this.verifiedDetailsForm.get('verificationStatus')!.setValue(response.verificationStatus);
        this.verifiedDetailsForm.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
        this.verifiedDetailsForm.get('grade')!.setValue(response.grade);
        this.verifiedDetailsForm.get('gradingComments')!.setValue(response.gradingComments);
        this.verifiedDetailsForm.get('personContacted')!.setValue(response.personContacted);
        this.verifiedDetailsForm.get('contactNumberOfPersonContacted')!.setValue(response.contactNumberOfPersonContacted);
        this.verifiedDetailsForm.get('interimOrFinal')!.setValue(response.interimOrFinal);
        this.verifiedDetailsForm.get('mode')!.setValue(response.mode);
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
      },
      error=>{
        //console.log(error);
      }
    )
  }
  historyClicked(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
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

  reviewStatusChanged(event:any){
    //console.log('status changed');
    if(this.mentorReviewStatusForm.get('status')!.value=='MENTOR-REVIEW-REJECTED'){
      this.mentorReviewStatusForm.get('mentorReviewComments')!.setValidators(Validators.required);
    }else{
      this.mentorReviewStatusForm.get('mentorReviewComments')!.clearAsyncValidators();
    }
  }
  downloadCandidateDoc(fileName:any){
    this.displayedCandidateDocName = fileName;
    let componentDetails:any = ({

    })
    componentDetails["caseId"] = this.caseId;
    componentDetails["_id"] = this._id;
    this.componentDataService.downloadFile(this.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob>)=>{
        this.candidateDocBlob = response.body !== null ? response.body : new Blob();
        this.showCandidateDocsDialog = true;
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  downloadProofOfWork(fileName:any){
    this.displayedProofOfWorkDocName = fileName;
    let componentDetails:any = ({

    })
    componentDetails["caseId"] = this.caseId;
    componentDetails["_id"] = this._id;
    this.componentDataService.downloadProofOfWork(this.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob>)=>{
        this.proofOfWorkDocBlob = response.body!== null ? response.body : new Blob();
        this.showProofOfWorkDialog = true;
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  closeCandidateDocsDialog(){
    this.showCandidateDocsDialog = false;
  }
  closeProofOfWorkDocsDialog(){
    this.showProofOfWorkDialog = false;
  }
  backButtonClicked(){
    this.location.back();
  }
  saveStatusButtonClicked(){
    let mentorReviewStatusData = this.mentorReviewStatusForm.getRawValue() as MentorReviewStatusData;
    mentorReviewStatusData.case_id = this.case_id;
    mentorReviewStatusData._id = this._id;
    this.componentDataService.updateMentorReviewStatus(this.componentName,mentorReviewStatusData).subscribe(
      response=>{
        if(this.mentorReviewStatusForm.get('status')!.value == 'MENTOR-REVIEW-ACCEPTED'){
          this.caseUploadService.updateCaseStatus(this.case_id,{status:"MENTOR-REVIEW-ACCEPTED"}).subscribe(
            response2=>{
              this.showMessage("Status Saved")
              //console.log(response2);
/*              this.allComponentsDataService.createJpgs(this.caseId,this.componentName,this._id).subscribe(
                allComponentsResponse=>{
                  //console.log(allComponentsResponse);
                },
                error=>{
                  this.showError("Error Converting PDFs")
                }
              )*/

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

  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }

}
