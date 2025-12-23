import { Component, EventEmitter, Input, Output, ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { ComponentDataService } from '../../../service/component-data.service';
import { DatePipe } from '@angular/common';
import { FileInput } from 'ngx-material-file-input';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';

import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-insuf-details',
  templateUrl: './client-insuf-details.component.html',
  styleUrls: ['./client-insuf-details.component.scss']
})
export class ClientInsufDetailsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() selectedRow:any;
  @Output() dataToParent = new EventEmitter<any>();

  component_id:any
  componentFields:any[]=[]
  candidateDocuments!: any[];
  displayedCandidateDocName!: string;
  candidateDocBlob!:Blob;
  showCandidateDocsDialog:boolean=false;
  insufficiencyClearanceRejectionComments!:string;
  insuffDetailsForm!: FormGroup;
  fileUploadForm!: FormGroup;
  file!:File
  selectedFiles: File[] = [];
  displayedProofOfWorkDocName!: string;

  // insuffDetailsForm=new FormGroup({
  //   caseId: new FormControl(''),
  //   candidateName:new FormControl(''),
  //   componentDisplayName:new FormControl(''),
  //   insufficiencyDetails:new FormControl(''),
  //   insufficiencyClearanceComments:new FormControl('',[Validators.required]),
  //   insufficiencyClearanceRejectionComments:new FormControl('')
  // })
  // fileUploadForm = new FormGroup({
  //   candidateDocFile:new FormControl(),
  //   fileTitle:new  FormControl('')
  // })

  constructor(   
    private componentDataService:ComponentDataService,
    private componentFieldService:ComponentFieldService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private caseUploadService:CaseUploadService,
    private snackBar:MatSnackBar,
    // private router :Router,
    ){
      this.insuffDetailsForm = this.fb.group({
        caseId:[''],
        candidateName:[''],
        componentDisplayName:[''],
        insufficiencyDetails:[''],
        insufficiencyClearanceComments:['',[Validators.required]],
        insufficiencyClearanceRejectionComments:['']
      })

      this.fileUploadForm = this.fb.group({
        candidateDocFile:[],
        fileTitle:['']
      })
  }

  componentOnInit(){
    // console.log("ANy thing",this.selectedRow);
    this.component_id = this.selectedRow.component_id;
    this.insuffDetailsForm.get('caseId')!.setValue(this.selectedRow.caseId);
    this.insuffDetailsForm.get('candidateName')!.setValue(this.selectedRow.candidateName);
    this.insuffDetailsForm.get('componentDisplayName')!.setValue(this.selectedRow.componentDisplayName);
    this.insuffDetailsForm.get('insufficiencyDetails')!.setValue(this.selectedRow.insufficiencyComments);    
    this.insuffDetailsForm.get('insufficiencyClearanceRejectionComments')!.setValue(this.selectedRow.insufficiencyClearanceRejectionComments);
    
    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response=>{
        // response.forEach(item=>{
        //      if(item.lhsRhs == 'BOTH' || item.lhsRhs =='LHS'){
        //        console.log('item === ', item);
               
        //      }  
        //   })
        this.componentFields = response.filter(item => (item.lhsRhs === 'BOTH' || item.lhsRhs === 'LHS')) 
        this.addFormFields();
        this.getLhsAndRhsDetails();
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnChanges(){
    this.componentOnInit()
    this.readFiles();
  }

  getLhsAndRhsDetails(){
    this.componentDataService.findOne(this.selectedRow.componentName,this.selectedRow.case_id,this.selectedRow._id).subscribe(
      response=>{
        this.componentFields.forEach(item=>{
          if(item.type !== 'DATE'){
            if(this.insuffDetailsForm.get(item.name) !== null){
              this.insuffDetailsForm.get(item.name)!.setValue(response[item.name]);
            }
          }else{
            if (this.insuffDetailsForm.get(item.name) !== null) {
            let dateValue = new Date(response[item.name]);
            let dd = String(dateValue.getDate()).padStart(2, '0');
            let mm = String(dateValue.getMonth() + 1).padStart(2, '0');
            let yyyy = dateValue.getFullYear();
            this.insuffDetailsForm.get(item.name)!.setValue(`${yyyy}-${mm}-${dd}`);
            } 
            if (this.insuffDetailsForm.get(item.name+'Rhs') !== null) {
              let dateValue = new Date(response[item.name+'Rhs']);
              let dd = String(dateValue.getDate()).padStart(2, '0');
              let mm = String(dateValue.getMonth() + 1).padStart(2, '0');
              let yyyy = dateValue.getFullYear();
              
              this.insuffDetailsForm.get(item.name+'Rhs')!.setValue(`${yyyy}-${mm}-${dd}`); 
            }
        }
        }) 
      },
      error=>{
        console.log(error);
      }
    )    
  }

  readFiles(){
    console.log("about to read files");
    this.componentDataService.readFileNames(this.selectedRow.componentName,this.selectedRow.caseId,this.selectedRow._id).subscribe(
      response=>{
        console.log('response from read proof of works ',response);
        this.candidateDocuments = response;          
      },
      error=>{
        console.log(error.error.message);
        
      }
    )    
  }

  chooseFile() {
    this.fileInput.nativeElement.click();
    
  }

  fileSelected(event: any) {
    const files: FileList = event.target.files;
    // Handle selected files here
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files.item(i)!);
    }
  }

  addFormFields(){
    this.componentFields.forEach(item=>{
      if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
        this.insuffDetailsForm.addControl(item.name,new FormControl(''));   
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

  clearInsuffButtonClicked(){
    let insuffItem = this.selectedRow;
    // console.log(this.insuffDetailsForm.value);
      insuffItem.scrutinyRejectionReason = this.insuffDetailsForm.get("insufficiencyClearanceRejectionComments")!.value;
      insuffItem.insufficiencyClearedComments = this.insuffDetailsForm.get("insufficiencyClearanceComments")!.value;
      console.log("Data sent for clearance ", insuffItem);
      this.dataToParent.emit(insuffItem);
      if (insuffItem.status == 'INSUF-1-REQ-ACCEPTED' || insuffItem.status == 'INSUF-1-CLEARANCE-REJECTED') {
        this.componentDataService.clearInsuff1(insuffItem.componentName, insuffItem).subscribe(
          response => {
            // this.componentDataService.insuffEmailTrigger(insuffItem.case_id,insuffItem).subscribe(data => {
            //   this.showMessage("mail sent successfully");
            // });
            this.dataToParent.emit(insuffItem);
            console.log("Insuff cleared");
            // this.insufficienciesDataSource.data.splice(this.insufficienciesDataSource.data.indexOf(insuffItem), 1);
            // this.insufficienciesDataSource._updateChangeSubscription();
          },
          error => {
            console.log(error.error.message);
          }
        )
      } else if (insuffItem.status == 'INSUF-2-REQ-ACCEPTED' || insuffItem.status == 'INSUF-2-CLEARANCE-REJECTED' || insuffItem.status == 'INSUF-3-REQ-ACCEPTED' || insuffItem.status == 'INSUF-3-CLEARANCE-REJECTED' || insuffItem.status == 'INSUF-4-REQ-ACCEPTED' || insuffItem.status == 'INSUF-4-CLEARANCE-REJECTED' || insuffItem.status == 'INSUF-5-REQ-ACCEPTED' || insuffItem.status == 'INSUF-5-CLEARANCE-REJECTED') {
        this.componentDataService.clearInsuff2(insuffItem.componentName, insuffItem).subscribe(
          response => {
            // this.componentDataService.insuffEmailTrigger(insuffItem.case_id,insuffItem).subscribe(data => {
            //   this.showMessage("mail sent successfully");
            // });
            this.dataToParent.emit(insuffItem);
            console.log("Insuff cleared");
            // this.insufficienciesDataSource.data.splice(this.insufficienciesDataSource.data.indexOf(insuffItem), 1);
            // this.insufficienciesDataSource._updateChangeSubscription();
          },
          error => {
            console.log(error.error.message);
          }
        )
      }
    
  }

  uploadFile(){
    const candidateDocFileValue = this.fileUploadForm.get('candidateDocFile')!.value;

    if (candidateDocFileValue instanceof FileList) {
      // If candidateDocFile is an input element of type file
      this.file = candidateDocFileValue[0];
    } else if (candidateDocFileValue instanceof FileInput) {
      // If candidateDocFile is a custom form control
      this.file = candidateDocFileValue.files[0];
    } else {
      console.error('Unexpected value for candidateDocFile:', candidateDocFileValue);
    }
    
    let componentData: any = {
      _id: this.selectedRow._id,
      case_id: this.selectedRow.case_id,
      caseId: this.selectedRow.caseId,
      fileName: this.fileUploadForm.get('fileTitle')!.value, 
    };
    this.componentDataService.uploadFile(this.selectedRow.componentName,componentData, this.file).subscribe(
      response=>{
        console.log("File Uploaded");
        this.candidateDocuments.push(this.fileUploadForm.get('fileTitle')!.value);
        this.fileUploadForm.reset();
      },
      error=>{
        console.log("Error uploading the file");
      }
    )    
  }

  downloadCDF
  (fileName: string) {
    
    
    // this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        caseId: this.selectedRow.caseId,
        componentId: this.selectedRow._id,
        componentName:this.selectedRow.componentName
    };
    console.log("ANy thing",componentDetails);
    this.caseUploadService.downloadCaseForCDFiii( this.selectedRow.componentName ,componentDetails, fileName).subscribe(
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
showMessage(msg: string){
  this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
showError(msg: string){
  this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
}