import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { AllComponentsDataService } from 'src/app/operations/service/all-components-data.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import * as FileSaver from 'file-saver';
import { PersonalDetailsDataService } from 'src/app/operations/data-entry/service/personal-details-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-update-lhs-details',
  templateUrl: './update-lhs-details.component.html',
  styleUrls: ['./update-lhs-details.component.scss']
})
export class UpdateLhsDetailsComponent {
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
    casedox!: string[]; 

  tatStartDate!:string;
  tatEndDate!:string;

  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;

  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;

  changesRequired!: string;
  providedDetailsForm = new FormGroup({

  })
  dataSource = new MatTableDataSource();
  constructor(
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
    private caseUploadService:CaseUploadService,
    private allComponentsDataService:AllComponentsDataService,    
    private location:Location,
    private personalDetailsDataService:PersonalDetailsDataService,
    private dialog:MatDialog,
    
    private snackBar:MatSnackBar

  ) { }


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
        componentDetails['personalDetails'] = response._id,
        this.personalDetails= response._id
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

    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response=>{
        this.componentFields = response;
        this.addFormFields();
        this.getLhsDetails();
      },
      error=>{
        //console.log(error);
      }
    )
this.readCaseDox()
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
  getLhsDetails() {
    this.componentDataService.findOne(this.componentName, this.case_id, this._id).subscribe(
      response => {
        console.log("response", response);
        
        this.componentFields.forEach(item => {
          const formControl = this.providedDetailsForm.get(item.name);
          if (formControl) {
            if (item.type !== 'DATE') {
              formControl.setValue(response[item.name]);
            } else {
              const dateValue = new Date(response[item.name]);
              const dd = dateValue.getDate();
              const mm = dateValue.getMonth() + 1;
              const yyyy = dateValue.getFullYear().toString();
              const stringdd = (dd < 10) ? '0' + dd : dd.toString();
              const stringmm = (mm < 10) ? '0' + mm : mm.toString();
              formControl.setValue(yyyy + '-' + stringmm + '-' + stringdd);
            }
          } else {
            console.error(`Form control '${item.name}' not found.`);
          }
        });
        this.changesRequired = response.insufficiencyComments || response.updateLhsComments || response.addCheckComments;
      },
      error => {
        // Handle error
        console.error('Error fetching data:', error);
      }
    );    
  }
  
  // getLhsDetails(){
  //   this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
  //     response=>{
  //       console.log("response",response);
        
  //       this.componentFields.forEach(item=>{
  //         if(item.type !='DATE'){
  //           if(this.providedDetailsForm.get(item.name) != null){
  //             this.providedDetailsForm.get(item.name)!.setValue(response[item.name]);
  //           }
  //         }else{
  //           let dateValue = new Date(response[item.name]);
  //           let dd = dateValue.getDate();
  //           let mm = dateValue.getMonth()+1;
  //           let yyyy = dateValue.getFullYear().toString();
  //           let stringdd = '';
  //           let stringmm = ''

  //           if(dd < 10){
  //             stringdd = '0'+dd;
  //           }else{
  //             stringdd = dd.toString();
  //           }
  //           if(mm < 10){
  //             stringmm = '0'+mm;
  //           }else{
  //             stringmm= mm.toString();
  //           }
  //           this.providedDetailsForm.get(item.name)!.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
  //         }


  //       }) 
  //       this.changesRequired = response.insufficiencyComments
  //     },
  //     error=>{
  //       //console.log(error);
  //     }
  //   )    
  // }

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
    

    })
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
  saveStatusButtonClicked(){
    let componentData:any = this.providedDetailsForm.getRawValue()
    componentData._id=this._id
    componentData.case_id = this.case_id
    componentData.caseId = this.caseId
    componentData.status = "INPUTQC-ACCEPTED"
    //console.log("Trying to update ",componentData)
    this.componentDataService.update(this.componentName,componentData).subscribe(
      response=>{
        this.showMessage("LHS Updated")
        this.location.back();
      },
      error=>{
        this.showError(" Updating LHS")
        this.location.back();
      }
    )
  }
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
  // downloadProofOfWork(fileName:any){
  //   this.displayedProofOfWorkDocName = fileName;
  //   let componentDetails:any = ({

  //   })
  //   componentDetails["caseId"] = this.caseId;
  //   componentDetails["_id"] = this._id;
  //   this.componentDataService.downloadProofOfWork(this.componentName,componentDetails,fileName).subscribe(
  //     (response:HttpResponse<Blob>|any)=>{
  //       this.proofOfWorkDocBlob = response.body;
  //       this.showProofOfWorkDialog = true; 
  //     },
  //     error=>{
  //       this.showError(error.error.message);
  //     }
  //   )
  // }

  downloadCDF
  (fileName: string) {
    this.displayedCandidateDocName = fileName;
    // this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        //   componentDetails["caseId"] = this.caseId;
        //   componentDetails["_id"] = this._id;
        caseId: this.caseId,
        componentId: this._id,
        componentName:this.componentName
    };
    // console.log("ANy thing",componentDetails);
    this.caseUploadService.downloadCaseForCDFiii( componentDetails.componentName ,componentDetails, fileName).subscribe(
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

  downloadCandidateDoc(fileName:any){
    this.displayedCandidateDocName = fileName;
    let componentDetails:any = ({

    })
    componentDetails["caseId"] = this.caseId;
    componentDetails["_id"] = this._id;
    this.componentDataService.downloadFile(this.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob>|any)=>{
        this.candidateDocBlob = response.body;
        this.showCandidateDocsDialog = true;
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  } 

  closeProofOfWorkDocsDialog(){
    this.showProofOfWorkDialog = false;
  }  

  closeCandidateDocsDialog(){
    this.showCandidateDocsDialog = false;
  }  
  backButtonClicked(){
    this.location.back();    
  }


  previewCaseDocFile(fileName: string): void {
    const componentDetails = {
      caseId: this.caseId,
      _id: this._id
    };
  
    this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          const fileBlob = response.body;
          const fileType = response.body.type;
  
          this.dialog.open(FilePreviewDialogComponent, {
            width: '900px',
            data: {
              fileName,
              fileBlob,
              fileType
            }
          });
        } else {
          console.error("Received null response body");
        }
      },
      error => {
        this.showError(error.error.message);
      }
    );
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

  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }




}
