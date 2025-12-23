import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
// import { ComponentDataService } from 'src/app/data-entry/service/component-data.service';
import { ComponentDetailsForVerificationService } from '../service/component-details-for-verification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
@Component({
  selector: 'app-lhs-popup',
  templateUrl: './lhs-popup.component.html',
  styleUrls: ['./lhs-popup.component.scss']
})
export class LhsPopupComponent {

  dataFromParent:any;
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

  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;

  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;

  providedDetailsForm = new FormGroup({

  })

  constructor(
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
 
    private snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<LhsPopupComponent>){
    }

  ngOnInit(): void {
    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
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
        this.getLhsDetails();
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
  

  }
  getLhsDetails(){
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
      response=>{
        this.componentFields.forEach(item=>{
          if(item.type !='DATE'){
            if(this.providedDetailsForm.get(item.name) !== null){
              this.providedDetailsForm.get(item.name)?.setValue(response[item.name]);
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
            this.providedDetailsForm.get(item.name)?.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
          }


        }) 
      },
      error=>{
        console.log(error);
      }
    )    
  }
  getValues(name: any){
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
    

    })
  }  
  saveStatusButtonClicked() {
    let componentData: any = this.providedDetailsForm.getRawValue(); // Use `any` to allow adding properties dynamically
    componentData._id = this._id;
    componentData.case_id = this.case_id;
    componentData.case = this.case_id;
    componentData.caseId = this.caseId;
    componentData.status = "INPUTQC-ACCEPTED"; // Explicitly set the `status` property
  
    this.componentDataService.update(this.componentName, componentData).subscribe(
      response => {
        this.showMessage("LHS Updated");
        this.dialogRef.close({ event: 'confirmed' });
      },
      error => {
        this.showError("Error Updating LHS");
      }
    );
  }
  

  closeButtonClicked(){
    this.dialogRef.close({event:'cancel'})
  }

  showMessage(msg: string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showError(msg: string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
}
