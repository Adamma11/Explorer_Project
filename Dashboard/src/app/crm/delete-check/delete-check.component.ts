import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';

@Component({
  selector: 'app-delete-check',
  templateUrl: './delete-check.component.html',
  styleUrls: ['./delete-check.component.scss']
})
export class DeleteCheckComponent {
  pows:string[]=[];
  displayedPowName!: string;
  powBlob!: Blob;
  showPowDialog:boolean=false;
  insufficiencyClearanceRejectionComments!: string;
  reinitiationForm: FormGroup;
  fileUploadForm: FormGroup; 
  dataFromParent:any;

  constructor(
    private fb:FormBuilder,
    private componentDataService:ComponentDataService,
    private snackBar:MatSnackBar,
    private dialogRef:MatDialogRef<DeleteCheckComponent>,
    @Inject(MAT_DIALOG_DATA) data:any       
  ) { 
    this.dataFromParent = data;  
    this.reinitiationForm = this.fb.group({
      caseId: [''],
      candidateName: [''],
      componentDisplayName: [''],
      stopCheckComments: ['']
    })

    this.fileUploadForm = this.fb.group({
      powFile: [''],
      fileTitle: ['']
    }) 
  }

  ngOnInit(): void {
    this.reinitiationForm.get('caseId')!.setValue(this.dataFromParent.caseId);
    this.reinitiationForm.get('candidateName')!.setValue(this.dataFromParent.candidateName);
    this.reinitiationForm.get('componentDisplayName')!.setValue(this.dataFromParent.componentDisplayName);
    this.readPows()
  }

  readPows(){
    this.componentDataService.readProofOfWorks(this.dataFromParent.componentName,this.dataFromParent.caseId,this.dataFromParent._id).subscribe(
      response=>{
        this.pows = response;          
      },
      error=>{
        this.showError(error.error.message);
      }
    )    
  }

  cancelButtonClicked(){
    this.dialogRef.close()
  }



  deleteButtonClicked(){
    this.dialogRef.close(this.reinitiationForm.value)
  }

  uploadFile(){
    let componentData = {
      _id: this.dataFromParent._id,
      case_id: this.dataFromParent.case_id,
      caseId: this.dataFromParent.caseId,
      fileName: this.fileUploadForm.get('fileTitle')!.value
    }
    this.componentDataService.uploadProofOfWork(this.dataFromParent.componentName,componentData,this.fileUploadForm.get('powFile')!.value.files[0]).subscribe(
      response=>{
        this.showMessage("File Uploaded");
        this.pows.push(this.fileUploadForm.get('fileTitle')!.value);
      },
      error=>{
        this.showError("Error uploading the file");
      }
    )    

  }
  downloadPow(fileName:string){
    this.displayedPowName = fileName;
    let componentDetails = {
      caseId: this.dataFromParent.caseId,
      _id: this.dataFromParent._id
    }
    this.componentDataService.downloadProofOfWork(this.dataFromParent.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob>)=>{
        if (response.body !== null) {
          this.powBlob = response.body;
          this.showPowDialog = true;
        } else {
          this.showError("Response body is null");
        }
      },
      error=>{
        this.showError(error.error.message);
      }
    )


  }
  closePowDialog(){
    this.showPowDialog = false;
  }
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
}

