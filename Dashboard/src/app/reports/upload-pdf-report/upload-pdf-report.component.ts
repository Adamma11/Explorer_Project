import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
@Component({
  selector: 'app-upload-pdf-report',
  templateUrl: './upload-pdf-report.component.html',
  styleUrls: ['./upload-pdf-report.component.scss']
})
export class UploadPdfReportComponent {
  dataFromParent:any
  case_id:any
  caseId:any;
  candidateName:any;
  reportType:any;
  fileUploadForm:FormGroup;


  constructor(
    private snackBar:MatSnackBar,    
    private caseUploadService:CaseUploadService,
    private dialogRef:MatDialogRef<UploadPdfReportComponent>,    
    @Inject(MAT_DIALOG_DATA) data :any   
  ) {
      this.dataFromParent = data

      this.fileUploadForm= new FormGroup({
        reportFile: new FormControl(''),
        fileTitle: new FormControl('')
      })
   }

  ngOnInit(): void {
    this.caseId = this.dataFromParent.caseId
    this.candidateName = this.dataFromParent.candidateName
    // this.reportType = this.dataFromParent.reportType
    this.case_id = this.dataFromParent.case_id
  }
  uploadButtonClicked(){
    let indexOfLastDot = this.fileUploadForm.get('reportFile')!.value._files[0].name.lastIndexOf(".")
    let extension = this.fileUploadForm.get('reportFile')!.value._files[0].name.substring(indexOfLastDot+1,this.fileUploadForm.get('reportFile')!.value._files[0].name.length)
    if(extension.toLowerCase() != 'pdf'){
      this.showError("Only PDFs can be uploaded")
    }else{
      let acase = ({
        caseId:this.caseId,
        reportType:this.reportType
      })
      this.caseUploadService.uploadPdfReport(acase,this.fileUploadForm.get('reportFile')!.value._files[0],this.fileUploadForm.get('fileTitle')!.value).subscribe(
        report=>{
          this.showMessage("Report Uploaded")
          this.dialogRef.close()
        },
        error=>{
          this.showError("Error while uploading report")
        }
      )

    }
    
  }

selectReportType(e:any){
  this.reportType = e
  console.log("qwertt", this.reportType)
}





  cancelButtonClicked(){
    this.dialogRef.close();    
  }
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }    
}

