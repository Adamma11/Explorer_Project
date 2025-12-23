import { Component, EventEmitter, Input, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { ComponentDataService } from '../../../service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from 'src/app/shared/service/history.service';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-insuf-rejection',
  templateUrl: './insuf-rejection.component.html',
  styleUrls: ['./insuf-rejection.component.scss']
})
export class InsufRejectionComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() selectedRow: any;
  @Input() selectedTab: any;
  @Output() dataToParent = new EventEmitter<any>();
  _id!: string;
  caseId!: string;
  component_id!: string;
  componentFields: any[] = []
  clearance = false
  displayedCandidateDocName!: string;
  candidateDocuments: any[] = [];
  approveOrReject = '';
  candidateDocBlob!: Blob;
  rejectionReasonForm!: FormGroup;
  selectedFiles: File[] = [];
  dataFromParent:any;
  historyDisplayedColumns = ['date','user','operation','status','remarks','nextfollowupdate','expectedclosuredate','allocatedToVendor','allocatedToFe','allocatedToVerifier','verificationcost'];
  dataSourceHistory = new MatTableDataSource();

  constructor(
    private componentFieldService: ComponentFieldService,
    private componentDataService: ComponentDataService,
    private caseUploadService: CaseUploadService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private renderer: Renderer2,
    private snackBar:MatSnackBar,
    private historyService:HistoryService,
  ) {
    this.rejectionReasonForm = this.fb.group({
      caseId: [''],
      candidateName: [''],
      componentDisplayName: [''],
      insufficiencyComments: [''],
      insufficiencyClearedComments: [''],
      approveOrReject: [''],
      rejectionReason: ['', Validators.required]
    })
  }

  ngOnChanges(){
    // console.log(this.selectedRow);
    this.componentOnInit()
    
  }

  componentOnInit(){
    console.log(this.selectedRow);
    
    const { component_id, clearance } = this.selectedRow;
    this.component_id = component_id;
    const rejectionReasonForm = this.rejectionReasonForm;
    ['caseId', 'candidateName', 'componentDisplayName', 'insufficiencyComments', 'insufficiencyClearedComments'].forEach(controlName => {
      if (rejectionReasonForm.get(controlName)) {
        rejectionReasonForm.get(controlName)!.setValue(this.selectedRow[controlName]);
      }
    });

    this.clearance = clearance;
    this.readFiles();

    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response => {
        // this.componentFields.push(...response.filter(item => item.lhsRhs === 'BOTH' || item.lhsRhs === 'LHS'));
        this.componentFields = response.filter(item => item.lhsRhs === 'BOTH' || item.lhsRhs === 'LHS')
        this.addFormFields();
        this.getLhsAndRhsDetails();
      },
      error => {
        // Handle error
        console.log('error == ', error);
        
      }
    );
    this.getHistoryDetails()
    
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

  addFormFields() {
    this.componentFields.forEach(item => {
      if (item.lhsRhs == 'LHS' || item.lhsRhs == 'BOTH') {
        this.rejectionReasonForm.addControl(item.name, new FormControl(''));
      }
    })
  }

  getLhsAndRhsDetails() {
    this.componentDataService.findOne(this.selectedRow.componentName, this.selectedRow.case_id, this.selectedRow._id)
      .subscribe(
        response => {
          // console.log('response  === ', response);
          
          this.componentFields.forEach(item => {
            const control = this.rejectionReasonForm.get(item.name);

            if (item.type !== 'DATE' && control !== null) {
              control.setValue(response[item.name]);
            } else if (item.type === 'DATE') {
            const dateValue = new Date(response[item.name]);

            if (!isNaN(dateValue.getTime())) {
              const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-dd');
              control!.setValue(formattedDate);

              if (item.name + 'Rhs' in this.rejectionReasonForm.controls) {
                const rhsControl = this.rejectionReasonForm.get(item.name + 'Rhs');
                rhsControl!.setValue(formattedDate);
              }
            }
          }});
        },
        error => {
          // Handle error
          console.log('error === ', error);
          
        }
      );
  }

  closeOffcanvas(){
    const offcanvasElement = document.getElementById('statusOffcanvas');
    this.renderer.removeClass(offcanvasElement, 'show');
  }

  statusSelectionChanged(event: any){
    const offcanvasElement = document.getElementById('statusOffcanvas');
    this.renderer.addClass(offcanvasElement, 'show'); 
  }

  readFiles() {
    this.componentDataService.readFileNames(this.selectedRow.componentName, this.selectedRow.caseId, this.selectedRow._id).subscribe(
      response => {
        console.log('response from read proof of works ',response);
        this.candidateDocuments = response;
      },
      error => {
        console.log(error.error.message);
      }
    )
  }


  ///new//
//   saveButtonClicked() {
//   const insuffItem = this.selectedRow;
//   const status = this.approveOrReject;
//   const reason = this.rejectionReasonForm.get('rejectionReason')!.value;

//   console.log("insuffItem = ", insuffItem, " status = ", status, "reason = ", reason);

//   const triggerEmailAndEmit = (message: string) => {
//     this.componentDataService.insuffEmailTrigger(insuffItem.case_id, insuffItem).subscribe(() => {
//       this.showMessage("Mail sent successfully");
//     });
//     this.dataToParent.emit(insuffItem);
//     this.showMessage(message);
//   };

//   if (this.selectedTab === 'INSUF-RAISED') {
//     if (status === 'REJECT') {
//       if (['INSUF-2-REQ', 'COST-APPROVAL-REQ'].includes(insuffItem.status)) {
//         insuffItem.scrutinyRejectionReason = reason;
//         insuffItem.insufficiencyRejectionComments = reason;

//         this.componentDataService.rejectInsuff2(insuffItem.componentName, insuffItem).subscribe({
//           next: () => triggerEmailAndEmit("Rejected"),
//           error: (err) => console.log("Error in rejection:", err.error?.message || err),
//         });
//       } else if (insuffItem.status === 'CLARIFICATION-REQ') {
//         // Handle CLARIFICATION-REQ rejection if needed
//       }
//     } else {
//       // APPROVE
//       this.componentDataService.approveInsuff2(insuffItem.componentName, insuffItem).subscribe({
//         next: () => {
//           insuffItem.status = 'INSUF-2-REQ-ACCEPTED';
//           this.caseUploadService.updateInsuffRaisedDate(insuffItem.case_id, insuffItem).subscribe({
//             next: () => {
//               this.showMessage("Approved");
//               this.dataToParent.emit(insuffItem);
//             },
//             error: () => console.log("Error Approving"),
//           });
//         },
//         error: () => console.log("Error approving insufficiency"),
//       });
//     }

//   } else {
//     // Tab = Cleared
//     if (status === 'REJECT') {
//       insuffItem.insufficiencyClearanceRejectionComments = reason;

//       if (['INSUF-1-CLEARED', 'INSUF-2-CLEARED'].includes(insuffItem.status)) {
//         this.componentDataService.rejectInsuff1Clearance(insuffItem.componentName, insuffItem).subscribe({
//           next: () => {
//             triggerEmailAndEmit("Rejected the clearance");
//           },
//           error: () => {
//             this.showError("Error in rejection of cleared insufficiency");
//           }
//         });
//       }
//     } else {
//       // APPROVE clearance
//       this.componentDataService.approveInsuffClearance(insuffItem.componentName, insuffItem).subscribe({
//         next: () => {
//           this.caseUploadService.updateInsuffClearedDate(insuffItem.case_id, insuffItem).subscribe({
//             next: () => this.showMessage("Clearance Approved"),
//             error: () => this.showMessage("Error during Clearance Approval"),
//           });
//           this.dataToParent.emit(insuffItem);
//           this.showMessage("Insufficiency Cleared");
//         },
//         error: () => this.showError("Error clearing Insufficiency"),
//       });
//     }
//   }
// }

  ////////
  saveButtonClicked() {
    let insuffItem = this.selectedRow;
    // console.log('saved', this.rejectionReasonForm.get('approveOrReject')!.value, this.rejectionReasonForm.get('rejectionReason')!.value);
    // let status = this.rejectionReasonForm.get('approveOrReject')!.value;
    // let reason = this.rejectionReasonForm.get('rejectionReason')!.value
    let status = this.approveOrReject
    let reason = this.rejectionReasonForm.get('rejectionReason')!.value
    console.log("insuffItem = ", insuffItem, " status = ", status, "reason = ", reason);
     if (this.selectedTab === 'INSUF-RAISED'){
       if (status === 'REJECT') {
         if (insuffItem.status === 'INSUF-2-REQ' || insuffItem.status === 'COST-APPROVAL-REQ') {
           insuffItem.scrutinyRejectionReason = reason;
           insuffItem.insufficiencyRejectionComments = reason;
           this.componentDataService.rejectInsuff2(insuffItem.componentName, insuffItem).subscribe(
             response => {
               this.componentDataService.insuffEmailTrigger(insuffItem.case_id,insuffItem).subscribe(data => {
                 this.showMessage("mail sent successfully");
               });
               this.dataToParent.emit(insuffItem);
               // this..data.splice(this.insufficienciesDataSource.data.indexOf(insuffItem),1);
               // this.insufficienciesDataSource._updateChangeSubscription();
               this.showMessage("Rejected");
             },
             error => {
               console.log(error.error.message);
             }
           )
         } else if (insuffItem.status === 'CLARIFICATION-REQ') {
   
         } else if (insuffItem.status === 'COST-APPROVAL-REQ') {
   
         }
       } else {
         this.componentDataService.approveInsuff2(insuffItem.componentName, insuffItem).subscribe(
           response => {
             insuffItem.status = 'INSUF-2-REQ-ACCEPTED'
             console.log("Test Insuff",insuffItem.case_id, insuffItem);
            //  this.caseUploadService.updateInsuffRaisedDate(insuffItem.case_id, insuffItem).subscribe(
              this.caseUploadService.updateInsuffRaisedDate(insuffItem.case_id,insuffItem).subscribe(

               response => {
                this.showMessage("Approved");
                
                 this.dataToParent.emit(insuffItem);
               },
               (error: any) => {
                 console.log("Error Approving");
               }
             )
             this.dataToParent.emit(this.selectedRow);
             // this.insufficienciesDataSource.data.splice(this.insufficienciesDataSource.data.indexOf(insuffItem),1);
             // this.insufficienciesDataSource._updateChangeSubscription();
             this.showMessage("Approved");
           },
           (error: any) => {
             console.log("Error approving insufficiency");
           }
         )
       }
     } else {
      if(status === 'REJECT'){
        insuffItem.insufficiencyClearanceRejectionComments = reason
        if(insuffItem.status === 'INSUF-1-CLEARED'){
          this.componentDataService.rejectInsuff1Clearance(insuffItem.componentName,insuffItem).subscribe(
            response=>{
              this.componentDataService.insuffEmailTrigger(insuffItem.case_id,insuffItem).subscribe(data => {
                this.showMessage("mail sent successfully");
              })
              this.dataToParent.emit(insuffItem);
              // this.insufficienciesClearedDataSource.data.splice(this.insufficienciesClearedDataSource.data.indexOf(insuffItem),1);
              // this.insufficienciesClearedDataSource._updateChangeSubscription();
              this.showError("Rejected the clearance");
            },
            error=>{
              this.showError("Error in rejection of cleared insufficiency");
            }
          )
        }else if(insuffItem.status=='INSUF-2-CLEARED'){
          this.componentDataService.rejectInsuff1Clearance(insuffItem.componentName,insuffItem).subscribe(
            response=>{
              this.componentDataService.insuffEmailTrigger(insuffItem.case_id,insuffItem).subscribe(data => {
                this.showMessage("mail sent successfully");
              });
              this.dataToParent.emit(insuffItem);
              // this.insufficienciesClearedDataSource.data.splice(this.insufficienciesClearedDataSource.data.indexOf(insuffItem),1);
              // this.insufficienciesClearedDataSource._updateChangeSubscription();
              this.showError("Rejected the clearance");
            },
            error=>{
              this.showError("Error in rejection of cleared insufficiency");
            }
          )            
        }
      }else{
        this.componentDataService.approveInsuffClearance(insuffItem.componentName,insuffItem).subscribe(
          response=>{
            this.caseUploadService.updateInsuffClearedDate(insuffItem.case_id,insuffItem).subscribe(
              response=>{
                this.showMessage("Clearance Approved");
              },
              error=>{
                this.showMessage("Error during Clearance Approval");
                // console.log("Error during Clearance Approval
              }
            )
            this.dataToParent.emit(insuffItem)
            // this.insufficienciesClearedDataSource.data.splice(this.insufficienciesClearedDataSource.data.indexOf(insuffItem),1);
            // this.insufficienciesClearedDataSource._updateChangeSubscription();
            this.showMessage("Insufficiency Cleared");
          },
          error=>{
            this.showError("Error clearing Insufficiency");
          }
        )
      }
     }
  }

  // saveButtonClicked(){
  //   if (this.selectedTab === 'INSUF-RAISED') {
  //     console.log(this.selectedTab , {...this.rejectionReasonForm.value, approveOrReject: this.approveOrReject});
  //   } else{
  //     console.log(this.selectedTab, {...this.rejectionReasonForm.value, approveOrReject: this.approveOrReject});
  //   }
  //   // this.dataToParent.emit({...this.rejectionReasonForm.value, approveOrReject: this.approveOrReject});
  // }

  getHistoryDetails(){
    if(this.component_id !== null && this._id !== null){
      this.historyService.getCheckHistory(this.selectedRow.case_id,this.component_id,this.selectedRow._id).subscribe(
        response=>{
          // console.log("Got History ",response)
          this.dataSourceHistory = response
        },
        error=>{
          console.log("Error ",error)
        }
      )
    }else{
      this.historyService.getCaseHistory(this.caseId).subscribe(
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

  downloadCandidateDoc(fileName: any){
    console.log("afcskdjcnesdlnkc",Response)
    this.displayedCandidateDocName = fileName;
    let componentDetails:any = ({

    })
    componentDetails["caseId"] = this.dataFromParent.caseId;
    componentDetails["_id"] = this.dataFromParent._id;

    this.componentDataService.downloadProofOfWork(this.dataFromParent.componentName,componentDetails,fileName).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        this.candidateDocBlob = response.body;
        // this.showCandidateDocsDialog = true;
      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  
  cancelButtonClicked(event:any){
    event.preventDefault()
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
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  } 
}
