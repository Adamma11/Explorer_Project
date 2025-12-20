// import { Component, Input, SimpleChange } from '@angular/core';
// import { DatePipe, Location } from '@angular/common';
// import { HttpResponse } from '@angular/common/http';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
// import { CaseDetailsForDataEntryService } from '../../service/case-details-for-data-entry.service';
// import { ComponentDataService } from '../../service/component-data.service';
// import { BranchService } from 'src/app/masters/service/branch.service';
// import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { ChatboxComponent } from 'src/app/chatbox/chatbox.component';
// import { QuicknoteComponent } from 'src/app/quicknote/quicknote.component';
// import * as FileSaver from 'file-saver';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { EmailTemplateService } from 'src/app/masters/service/email-template.service';
// import { EmailCandidateDataService } from 'src/app/verification/service/email-candidate-data.service';
// import {componentKeys} from "src/app/componentKeys";
// import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
// import { finalize, forkJoin, throwError } from 'rxjs';
// // import * as FileSaver from 'file-saver';
// import { catchError,  switchMap, tap } from 'rxjs/operators';


// @Component({
//   selector: 'app-component-inputqc',
//   templateUrl: './component-inputqc.component.html', 
//   styleUrls: ['./component-inputqc.component.scss']
// })
// export class ComponentInputqcComponent {
//   @Input() selectedRow: any;
//   datePipe!: DatePipe;
//   _id: string = '';
//   displayedDocumentName!: string;
//   showDocumentDialog: boolean = false;
//   documentBlob!: Blob | any;
//   errorMsg!: string;
//   isLoading!: boolean;
//   filteredUniversities!: any[];
//   filteredCompanies!: any[];
//   currentComponent_id = '';
//   case_id!: string;
//   caseId!: string;
//   candidateName!: string;
//   clientId!: string;
//   clientName!: string;
//   subclient_id!: string;
//   subclientName!: string;
//   clientContractId!: string;
//   packageName!: string;
//   packageComponents!: any[];
//   profileName!: string;
//   profileComponents!: any[];
//   componentsToCheck!: any[];
//   component!: string;
//   componentName!: string;
//   componentFields!: any[];
//   componentDisplayName!: string;
//   component_id!: string;
//   componentType!: string;
//   currentComponentFileUploadRequired: boolean = false;
//   componentDataEntryForm!: FormGroup
//   inputqcForm!: FormGroup
//   // Add Comments 
//   ShowComments:boolean=false;
//   colorType!: string; 
//   comment!:string
//   // Add Comments 
//   files!: any[];
//   displayedProofOfWorkDocName!: string;
//   candidateDocuments!: string[]; 
//   proofsUploaded!: string[];
//   //Added 30Sep2024 start
//   componentFieldsLhs:any[]=[];
//   componentFieldsValues:any[]=[];
//   verificationMailSent:boolean=false;
//   //Added by anil on 4/5/2024 end
//     componentData :boolean = false

//     isSaving = false;
//   constructor(
//     private caseDetailsDataEntryService: CaseDetailsForDataEntryService,
//     private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
//     private componentFieldService: ComponentFieldService,
//     private componentDataService: ComponentDataService,
//     private caseUploadService: CaseUploadService,
//     private activatedRoute: ActivatedRoute,
//     private branchService: BranchService,
//     private location: Location,
//     private fb: FormBuilder,
//     private dialog: MatDialog,
//     private snackBar:MatSnackBar,
//     private emailTemplateService:EmailTemplateService,
//     private _EmailCandidateDataService:EmailCandidateDataService


//   ) { 
//     this.componentDataEntryForm = this.fb.group({
//       dataEntryStatus: [''],
//       insufficiencyComments: [''],
//     });
//     this.inputqcForm =  this.fb.group({
//       status: [''],
//       inputqcComments: ['']
//     })
//   }

//   ngOnChanges(changes: SimpleChange): void {
//     this.componentOnInit()
//   }

//   ngOnInit(){
//     this.componentOnInit()
//   }

//   componentOnInit() {
//     // this.files = new Array();
//     let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
//     console.log('verification == ', verification);
    
//     this.case_id = verification.case_id;
//     this.caseId = verification.caseId;
//     this.candidateName = verification.candidateName;
//     this.clientId = verification.clientId;
//     this.clientName = verification.clientName;
//     this.subclient_id = verification.subclient_id;
//     this.subclientName = verification.subclientName;
//     this.clientContractId = verification.clientContract;
//     this.componentFields = verification.componentFields;
//     this.component_id = verification.component_id;
//     this.componentName = verification.componentName;
//     this.componentDisplayName = verification.componentDisplayName;
//     this.componentType = verification.componentType;
//     this._id = verification._id;
//     console.log("Color Type",this._id);
//     console.log("Color Type",verification.comment);
//     ///check wise comments
//     this.colorType = this.componentDetailsForVerificationService.getVerificationItem().colorType;
//     this.comment = this.componentDetailsForVerificationService.getVerificationItem().comment;
//     if (!this.comment  ) {
//       this.ShowComments = false;
//     } else {
//       this.ShowComments = true;
//     }
// ///check wise comments
//     this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
//       response => {
//         this.componentFields = response;
//         this.addFormFields();
//         this.getComponentDetails();
//       },
//       error => {
//         console.log(error);
//       }
//     );

// this.readCdf()
//     this.readProofOfWork()

//   }
// readCdf(){
//   this.files=[]
//   this.componentDataService.readFileNames(this.componentName, this.caseId, this._id).subscribe(
//     response => {
//       console.log("files:",response);
      
//       this.files = response;
//     },
//     error => {
//       console.log(error);
//     }
//   )

// }

//   readProofOfWork(){
//     this.proofsUploaded=[]
//     this.componentDataService.readcdf(this.caseId).subscribe(
//       response=>{
//         console.log('response from read proof of works ',response);
//         this.proofsUploaded = response;
//       },
//       error=>{
//         //console.log(error);
//       }
//     )
//   }
//   ///new 20July2025///
//     addFormFields() {

//     for(let i=0; i<this.componentFields.length; i++){
//       const item = this.componentFields[i]
//       if(item != null){
//         this.componentData = true
//         console.log("this.componentData",this.componentData)
//       }
//       console.log("componentFields ",item);
//       if(item.lhsRhs =="LHS" || item.lhsRhs =="BOTH"){
//         this.componentDataEntryForm.addControl(item.name,new FormControl(''));   
//         this.componentFieldsLhs.push(item)
//       }
      
//     }
//   }
//   // addFormFields() {
//   //   // this.componentFields.forEach(item => {
//   //   //   if (item.lhsRhs == "LHS" || item.lhsRhs == "BOTH") {
//   //   //     this.componentDataEntryForm.addControl(item.name, new FormControl(''));
//   //   //   }
//   //   // })
//   //   for(let i=0; i<this.componentFields.length; i++){
//   //     const item = this.componentFields[i]
//   //     console.log("componentFields ",item);
//   //     if(item.lhsRhs =="LHS" || item.lhsRhs =="BOTH"){
//   //       this.componentDataEntryForm.addControl(item.name,new FormControl(''));   
//   //       this.componentFieldsLhs.push(item)
//   //     }
      
//   //   }
//   // }
//   ///new 20July2025///

//   getComponentDetails() {
//     this.componentDataService.findOne(this.componentName, this.case_id, this._id).subscribe(
//       response => {
//         this.componentFieldsValues = response
//         this.componentFields.forEach(item => {
//           if (item.type !== 'DATE') {
//             this.componentDataEntryForm.get(item.name)?.setValue(response[item.name]);
//           } else {
//             const dateValue = new Date(response[item.name]);
//             const dd = dateValue.getDate().toString().padStart(2, '0');
//             const mm = (dateValue.getMonth() + 1).toString().padStart(2, '0');
//             const yyyy = dateValue.getFullYear();

//             this.componentDataEntryForm.get(item.name)?.setValue(`${yyyy}-${mm}-${dd}`);
//           }
//           this.componentDataEntryForm.get('dataEntryStatus')!.setValue(response.status);
//           if (response.status == "INSUF-1-REQ") {
//             this.componentDataEntryForm.get('dataEntryStatus')!.setValue(response.status);
//             this.componentDataEntryForm.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
//           }
//         })
//       },
//       error => {
//         console.log(error);
//       }
//     )

//   }

//   getValues(name: any) {
//     for (let field of this.componentFields) {
//       if (field.name == name) {
//         let values = field.values.split(',');
//         return values;
//       }
//     }
//     return null;
//   }
// ////New 14July2025//
//   saveButtonClicked(): void {
//     if (this.isSaving) return;

//     this.isSaving = true;
//     console.log('update');

//     const operations = [];

//     if (["education", "employment"].includes(this.componentName)) {
//       operations.push(this.generateMailBody());
//     }

//     operations.push(this.updateComponentStatus());

//     forkJoin(operations).pipe(
//       finalize(() => this.isSaving = false)
//     ).subscribe({
//       next: () => this.showMessage("Component Status Saved"),
//       error: (err) => this.showMessage(err.message)
//     });
//   }
//     generateMailBody() {
//     return this.emailTemplateService.findOne('60f53b32ff55047d921e90aa').pipe(
//       switchMap(response => {
//         const data = {
//           caseId: this.caseId,
//           emailTemplate: response,
//           componentFieldsLhs: this.componentFieldsLhs,
//           componentFiledsValues: this.componentFieldsValues,
//           candidateDocs: this.files,
//           componentName: this.componentName,
//           componentDocId: this._id
//         };

//         this.componentFieldsLhs.forEach(item => {
//           item[item.name] = data.componentFiledsValues[item.name];
//         });

//         const htmlTable = this.generateHtmlTable(data);
//         const modifiedSubject = `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${componentKeys[data.componentName as keyof typeof componentKeys]}:${this._id}`;

//         return this.componentDataService.getToAndCCMailAddresses(data.componentName, data.componentDocId).pipe(
//           switchMap(next => {
//             if (!next.to) {
//               return throwError(() => new Error('No recipient address found'));
//             }

//             const payload = {
//               toEmail: next.to,
//               subject: modifiedSubject,
//               cc: localStorage.getItem('userId'),
//               body: this.processEmailContent(data.emailTemplate.content, htmlTable),
//               filenames: data.candidateDocs || [],
//               caseId: data.caseId,
//               componentDocId: data.componentDocId,
//               componentName: data.componentName,
//               folderName: "candidatedocs"
//             };

//             return this._EmailCandidateDataService.sendEmail(payload).pipe(
//               tap(() => this.verificationMailSent = true)
//             );
//           })
//         );
//       }),
//       catchError(error => {
//         this.showMessage(error?.message || "Failed to generate mail body");
//         return throwError(() => error);
//       })
//     );
//   }

//     private generateHtmlTable(data: any): string {
//     let htmlTable = `<style>
//       #customers {
//         font-family: Arial, Helvetica, sans-serif;
//         border-collapse: collapse;
//         width: 100%;
//       }
//       #customers td, #customers th {
//         border: 1px solid #ddd;
//         padding: 8px;
//       }
//       #customers tr:nth-child(even){background-color: #E2E2E2;}
//       #customers tr:hover {background-color: #ddd;}
//       #customers th {
//         padding-top: 12px;
//         padding-bottom: 12px;
//         text-align: left;
//         background-color: #003c5c;
//         color: white;
//       }
//     </style>
//     <table id="customers">
//       <thead>
//         <tr>
//           <th>Label</th>
//           <th>Details Provided</th>
//           <th>Details Verified</th>
//         </tr>
//       </thead>
//       <tbody>`;
    
//     for (let item of data.componentFieldsLhs) {
//       htmlTable += `<tr>
//         <td>${item.label}</td>
//         <td>${item[item.name] || ""}</td>
//         <td>${item[item.fieldname + "Rhs"] || ""}</td>
//       </tr>`;
//     }
    
//     htmlTable += "</tbody></table>";
//     return htmlTable;
//   }

//   private processEmailContent(content: string, htmlTable: string): string {
//     const pattern = /&lt;&lt;[^&lt;]*-TABLE&gt;&gt;/g;
//     return String(content).replace(pattern, htmlTable);
//   }

//   updateComponentStatus() {
//     const inputqcData: any = this.inputqcForm.getRawValue();
//     const inputqcComponentData: any = this.componentDataEntryForm.getRawValue();
//     const inputqcmainData: any = {
//       ...inputqcData,
//       ...inputqcComponentData,
//       case_id: this.case_id,
//       _id: this._id
//     };

//     if (inputqcData.status === 'INPUTQC-ACCEPTED') {
//       if (inputqcComponentData.dataEntryStatus === 'INSUF-1-REQ') {
//         return this.handleInsuffRequest(inputqcmainData);
//       } else if (inputqcComponentData.dataEntryStatus === "DE-COMPLETED") {
//         return this.handleCompletedStatus(inputqcmainData);
//       }
//     }

//     return this.handleDefaultStatusUpdate(inputqcmainData);
//   }

//   private handleInsuffRequest(inputqcmainData: any) {
//     inputqcmainData.status = 'INSUF-1-REQ-ACCEPTED';
    
//     const insuffDetails = {
//       caseId: this.caseId,
//       candidateName: this.candidateName,
//       componentDisplayName: this.componentDisplayName,
//       insufficiencyDetails: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//       subclient: this.subclient_id,
//       status: "INSUF-1-REQ-ACCEPTED",
//       insufficiencyComments: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//     };

//     return forkJoin([
//       this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData),
//       this.caseUploadService.updateInsuffRaisedDate(this.case_id, insuffDetails)
//     ]).pipe(
//       tap(() => {
//         this.showMessage("Data saved");
//         this.location.back();
//       }),
//       catchError(error => {
//         this.showMessage(error.error.message || "Error saving status");
//         return throwError(() => error);
//       })
//     );
//   }

//   private handleCompletedStatus(inputqcmainData: any) {
//     // if (this.componentType === 'address') {
//     //   return this.handleAddressComponent(inputqcmainData);
//     // }
    
//     return this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).pipe(
//       tap(() => {
//         this.showMessage("Data saved");
//         this.location.back();
//       }),
//       catchError(error => {
//         this.showMessage("Error updating component status");
//         return throwError(() => error);
//       })
//     );
//   }

//   private handleAddressComponent(inputqcmainData: any) {
//     const pinField = this.componentFields.find(item => 
//       item.name.toLowerCase().indexOf("pin") > -1
//     );

//     if (!pinField) {
//       return this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).pipe(
//         tap(() => {
//           this.showMessage("Data saved");
//           this.location.back();
//         })
//       );
//     }

//     const pinValue = this.componentDataEntryForm.get(pinField.name)!.value;
    
//     return this.branchService.getABranchForPin(pinValue).pipe(
//       switchMap(responseFromBranch => {
//         inputqcmainData.branch = responseFromBranch._id;
        
//         return this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).pipe(
//           switchMap(response => {
//             inputqcmainData.status = "ALLOCATE-TO-VENDOR";
//             return this.componentDataService.putItToVendorBucket(this.componentName, inputqcmainData);
//           })
//         );
//       }),
//       tap(() => {
//         this.showMessage("Data saved and allocated to vendor");
//         this.location.back();
//       }),
//       catchError(error => {
//         this.showMessage(error.error.message || "Error processing address component");
//         return throwError(() => error);
//       })
//     );
//   }

//   private handleDefaultStatusUpdate(inputqcmainData: any) {
//     return this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).pipe(
//       tap(() => {
//         if (inputqcmainData.status === 'INPUTQC-REJECTED') {
//           this.caseDetailsDataEntryService.setCaseInputqcStatus('INPUTQC-REJECTED');
//         }
//         this.showMessage("Data saved");
//         this.location.back();
//       }),
//       catchError(error => {
//         this.showMessage(error.error.message || "Error updating status");
//         return throwError(() => error);
//       })
//     );
//   }
//   // saveButtonClicked() {
//   //   console.log('update');
//   //   if(["education","employment"].includes(this.componentName)){
//   //     console.log("test1111:",this.componentName);

//   //     this.generateMailBody();
//   //     this.updateComponentStatus()
//   //     this.showMessage("Component Status  Saved"); 
//   //   }else{
//   //     console.log("test:",this.componentName);
      
//   //     this.updateComponentStatus()    
      
//   //   }
//   //   this.generateMailBody();
//   //   // this.updateComponentStatus()

//   // }
//   // generateMailBody(){
//   //   console.log("inside generateMailBody",this.componentFieldsLhs);
    
//   //   this.emailTemplateService.findOne('60f53b32ff55047d921e90aa').subscribe((response)=>{
//   //    const data={caseId:this.caseId,emailTemplate: response,componentFieldsLhs: this.componentFieldsLhs,componentFiledsValues:this.componentFieldsValues,candidateDocs:this.files,componentName:this.componentName,componentDocId:this._id}
  

    

    
    
//   //    this.componentFieldsLhs.forEach(item1 => {

//   //     item1[item1.name]=data.componentFiledsValues[item1.name]
//   //     // item1[item1.name +"Rhs"]=data.componentFiledsValues[item1.name+"Rhs"]

//   //   })
//   //     console.log("inside generateMailBody",this.componentFieldsLhs);
     
//   //   //  const modifiedSubject = String(data.emailTemplate.subject).replace(/<<CASE-ID>>/,data.caseId)
//   //   // const modifiedSubject = `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${componentKeys[data.componentName]}:${this._id}`
//   //   const modifiedSubject = `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${componentKeys[data.componentName as keyof typeof componentKeys]}:${this._id}`;



//   //    let htmlTable = `<style>
//   //    #customers {
//   //      font-family: Arial, Helvetica, sans-serif;
//   //      border-collapse: collapse;
//   //      width: 100%;
//   //    }
     
//   //    #customers td, #customers th {
//   //      border: 1px solid #ddd;
//   //      padding: 8px;
//   //    }
     
//   //    #customers tr:nth-child(even){background-color: #E2E2E2;}
     
//   //    #customers tr:hover {background-color: #ddd;}
     
//   //    #customers th {
//   //      padding-top: 12px;
//   //      padding-bottom: 12px;
//   //      text-align: left;
//   //      background-color: #003c5c;
//   //      color: white;
//   //    }
//   //    </style>
     
//   //        <table id="customers">
//   //        <thead>
//   //          <tr>
//   //            <th>Label</th>
//   //            <th>Details Provided</th>
//   //            <th>Details Verified</th>
//   //          </tr>
//   //        </thead>
//   //        <tbody>
//   //        `
         
//   //        for(let item of data.componentFieldsLhs){
//   //          htmlTable+=`<tr> <td>${item.label}</td>
//   //          <td>${item[item.name] || ""}</td>
//   //          <td>${item[item.fieldname+"Rhs"] || ""}</td>
//   //          </tr>`
//   //        }
//   //        htmlTable+="</tbody></table>"
     
     
//   //        const pattern = /&lt;&lt;[^&lt;]*-TABLE&gt;&gt;/g;
//   //        const htmlContent =String(data.emailTemplate.content).replace(pattern,htmlTable)
//   //        console.log("dataToSend",data);
//   //        this.componentDataService.getToAndCCMailAddresses(data.componentName,data.componentDocId).subscribe((next)=>{
//   //         console.log("Send Data Get:",next.to);
          
//   //         if(next.to){
//   //           const payload={
//   //             toEmail:next.to,
//   //             subject:modifiedSubject,
//   //             cc:localStorage.getItem('userId'),
//   //             body:htmlContent,
//   //             filenames: data.candidateDocs || [],
//   //             caseId:data.caseId,
//   //             componentDocId:data.componentDocId,
//   //             componentName:data.componentName,
//   //             folderName:"candidatedocs"
        
//   //           }

//   //            console.log("Payload",payload);
             
//   //    this._EmailCandidateDataService.sendEmail(payload).subscribe(res => {
//   //      console.log(res);
       
//   //      this.verificationMailSent=true;
//   //     //  this.updateComponentStatus()
//   //     // this.showMessage(res.message);    
//   //    },err =>{

//   //     this.showMessage(err.message);
//   //    })
//   //           console.log(payload);

//   //         }
    
//   //       },
//   //       (error)=>{
//   //          this.showMessage(error?.message || "Unexpected error occur. please, try again.")
//   //       }
//   //       )
      
        
//   //   },(error)=>{
//   //       console.log(error);
        
//   //   })
//   // }
// ////New 14July2025//

//   acceptRejectChanged(event: any) {
//     if (this.inputqcForm.get('status')!.value == 'INPUTQC-REJECTED') {
//       this.inputqcForm.get('inputqcComments')!.setValidators(Validators.required);
//       this.inputqcForm.get('inputqcComments')!.updateValueAndValidity({ emitEvent: true })
//     } else {
//       this.inputqcForm.get('inputqcComments')!.clearValidators();
//       this.inputqcForm.get('inputqcComments')!.updateValueAndValidity({ emitEvent: true })
//     }
//   }
//   ///14July2025//

// //   updateComponentStatus() {
// //     let inputqcData: any = this.inputqcForm.getRawValue() ;
// //     let inputqcComponentData: any =this.componentDataEntryForm.getRawValue()
// //     let inputqcmainData: any = {
// //       ...inputqcData,
// //       ...inputqcComponentData
// //   };
// //     console.log("inputqcData:",inputqcData);
    
// //     inputqcmainData.case_id = this.case_id;
// //     inputqcmainData._id = this._id;
// // console.log("status",this.inputqcForm.get('status')!.value, this.inputqcForm.get('status')?.value   );
// // // console.log("00Component Status  Saved", inputqcData.status);

// //     if (inputqcData.status === 'INPUTQC-ACCEPTED') {
// //       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === 'INSUF-1-REQ') {
// //         inputqcData.status = 'INSUF-1-REQ-ACCEPTED';
// //       }
// //       // console.log("0Component Status  Saved");

// //       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === "DE-COMPLETED") {
// //         if (this.componentType == 'address') {
// //           // console.log("1Component Status  Saved");

// //           for (let i = 0; i < this.componentFields.length; i++) {
// //             let item = this.componentFields[i];
// //             let fieldName = item.name.toLowerCase();
// //             if (fieldName.indexOf("pin") > -1) {
// //               this.branchService.getABranchForPin(this.componentDataEntryForm.get(item.name)!.value).subscribe(
// //                 responseFromBranch => {
// //                   inputqcData.branch = responseFromBranch._id;
// //                   this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
// //                     response => {
// //                       inputqcData.status = "ALLOCATE-TO-VENDOR";
// //                       this.componentDataService.putItToVendorBucket(this.componentName, inputqcmainData).subscribe(
// //                         vendorResponse => {
// //                           console.log("Allocated to Vendor");
// //                         },
// //                         error => {
// //                           console.log("ErrorAllocating to Vendor");
// //                         }
// //                       )
// //                       this.location.back(); 
// //                     },
// //                     error => {
// //                       console.log(error.error.message)
// //                     }
// //                   )

// //                 },
// //                 error => {
// //                   console.log("Could not find a branch with the pin");
// //                 }
// //               )
// //               break;

// //             }
// //           }
// //         }
// //         else {
// //           this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
// //             response => {
// //               console.log("Component Status  Saved");
// //               this.showMessage("Data saved")
// //                             this.location.back();
// //             },
// //             error => {
// //               console.log("Error updating component status");
// //             }
// //           )
// //         }
// //       }
// //       else {
// //         this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
// //           response => {
// //             let insuffDetails = ({
// //               caseId: this.caseId,
// //               candidateName: this.candidateName,
// //               componentDisplayName: this.componentDisplayName,
// //               insufficiencyDetails: this.componentDataEntryForm.get('insufficiencyComments')!.value,
// //               subclient: this.subclient_id,
// //               status: "INSUF-1-REQ-ACCEPTED",
// //               insufficiencyComments: this.componentDataEntryForm.get('insufficiencyComments')!.value,
// //             })
// //             this.caseUploadService.updateInsuffRaisedDate(this.case_id, insuffDetails).subscribe(
// //               response => {
// //                 console.log("Status Saved")
// //                 this.showMessage("Data saved")
                
// //                 this.location.back()
// //               },
// //               error => {
// //                 console.log("Error updating Case Insuff Date")
// //               }
// //             )

// //           },
// //           error => {
// //             console.log("Error Saving Status")
// //           }
// //         )
// //       }
// //     } else {
// //       console.log("inputqcData",inputqcData);
      
// //       this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
// //         response => {
// //           if (this.inputqcForm.get('status')!.value === 'INPUTQC-REJECTED') {
// //             this.caseDetailsDataEntryService.setCaseInputqcStatus('INPUTQC-REJECTED');
// //           }
// //           this.showMessage("Data saved")

// //           this.location.back();
// //         },
// //         error => {
// //           console.log(error.error.message);
// //         }
// //       )
// //     }
// //   }
//   ///14July2025//

//   downloadProofOfWork(fileName: string) {
//     this.displayedProofOfWorkDocName = fileName;
//     const componentDetails = {
//         caseId: this.caseId,
//         _id: this._id
//     };

//     this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
//         (response: HttpResponse<Blob>) => {
//             if (response.body) {
//                 console.log("response", response.body.type);
//                 // if (response.body.type === "audio/mpeg") {
//                 //     FileSaver.saveAs(response.body, "audio.mp3");
//                 // } else if (response.body.type === "application/pdf") {
//                 //     this.proofOfWorkDocBlob = response.body;
//                 //     this.toggleProofOfWorkDialog();
//                 // } else {
//                     FileSaver.saveAs(response.body, fileName + "." +(response.body.type.includes("msword") ? "doc" : ""));
//                 // }
//             } else {
//                 // Handle the case when response.body is null
//                 console.error("Received null response body");
//             }
//         },
//         error => {
//             this.showError(error.error.message);
//         }
//     );
// }

// deleteProofOfWork(fileName:string){
//     let componentDetails = {
//       caseId:this.caseId,
//       _id:this._id
//     }
   

//     const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
//       width:'400px',data:{message:`Are you sure that you want to delete candidate docs?`}
//     });
//     deleteDialog.afterClosed().subscribe(result=>{
//         if(result.event=='confirmed'){
//           this.componentDataService.deleteCandidateDoc(this.componentName,componentDetails,fileName).subscribe(
//             response=>{
//               this.showMessage("File Deleted");
//               this.readCdf()
//             },
//             error=>{
//               this.showError("Error deleting the file")
//             }
//           )
//         }
//       })
//   }

//   deletecdfFile(fileName:string){
//     console.log('file === ', fileName);
//     const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
//       width:'400px',data:{message:`Are you sure that you want to delete candidate docs?`}
//     });
//     deleteDialog.afterClosed().subscribe(result=>{
//         if(result.event=='confirmed'){
//           this.componentDataService.deleteCDF(this.caseId,fileName).subscribe(
//             response=>{
//               this.showMessage("File Deleted");
//               this.readProofOfWork()
//             },
//             error=>{
//               this.showError("Error deleting the file")
//             }
//           )
//         }
//       })
//   }


//   // downloadFile(fileName: any) {
//   //   this.displayedDocumentName = fileName;
//   //   const componentDetails = {
//   //       caseId: this.caseId, 
//   //       _id: this._id
//   //   };
//   //   this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
//   //     (response: HttpResponse<Blob>) => {
//   //         if (response.body) {
//   //             console.log("response", response.body.type);
//   //             // if (response.body.type === "audio/mpeg") {
//   //             //     FileSaver.saveAs(response.body, "audio.mp3");
//   //             // } else if (response.body.type === "application/pdf") {
//   //             //     this.proofOfWorkDocBlob = response.body;
//   //             //     this.toggleProofOfWorkDialog();
//   //             // } else {
//   //                 FileSaver.saveAs(response.body, "test." + (response.body.type.includes("msword") ? "doc" : ""));
//   //             // }
//   //         } else {
//   //             // Handle the case when response.body is null
//   //             console.error("Received null response body");
//   //         }
//   //     },
//   //     error => {
//   //         this.showError(error.error.message);
//   //     }
//   // );
//   //   // this.displayedDocumentName = fileName;
//   //   // let componentDetails: any = {}
//   //   // componentDetails["caseId"] = this.caseId;
//   //   // componentDetails["_id"] = this._id;
//   //   // this.componentDataService.downloadFile(this.componentName, componentDetails, fileName).subscribe(
//   //   //   (response: HttpResponse<Blob>) => {
//   //   //     this.documentBlob = response.body;
//   //   //     //console.log("blob is ",this.documentBlob);
//   //   //     this.showDocumentDialog = true;
//   //   //     //console.log("showing the document now");
//   //   //   },
//   //   //   error => {
//   //   //     console.log(error);
//   //   //   }
//   //   // )
//   // }
//   downloadCDF(fileName: string) {
    
    
//     // this.displayedProofOfWorkDocName = fileName;
//     const componentDetails = {
//         caseId: this.selectedRow.caseId,
//         componentId: this.selectedRow._id,
//         componentName:this.selectedRow.componentName
//     };
//     // console.log("ANy thing",componentDetails);
//     this.caseUploadService.downloadCaseForCDFiii( this.selectedRow.componentName ,componentDetails, fileName).subscribe(
//         (response: HttpResponse<Blob>) => {
//             if (response.body) {
//                 console.log("response", response.body.type);

//                     FileSaver.saveAs(response.body, fileName + "." + (response.body.type.includes("msword") ? "doc" : ""));
              
//             } else {
//                 // Handle the case when response.body is null
//                 console.error("Received null response body");
//             }
//         },
//         error => {
//             this.showError(error.error.message);
//         }
//     );
// }
//   // downloadCDF() { 
//   //   this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
//   //     (response: HttpResponse<Blob>) => {
//   //       // FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
//   //     },
//   //     error => {
//   //       console.log(error);
//   //     }
//   //   );
//   // }
//   cancelButtonClicked(event:any) {
//     // this.router.navigate(['masters/employmentmaster']);
//     event.preventDefault();
//     this.goBack()
//   }

//   goBack() {
//     this.location.back();
//   }
//   QuickNote(){
//     console.log(this.case_id);
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = true;
//     dialogConfig.height = '800px'
//     dialogConfig.width = '800px'


//     dialogConfig.data = {
//       case_id :this.case_id,
//       _id:this._id,
//       componentName:this.componentName
 
//     }
//     console.log("case id",this.case_id)
//     // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
//     const dialogRef = this.dialog.open(QuicknoteComponent,dialogConfig);


 
//   }
//   // QuickNote(){
//   //   console.log(this.case_id);
//   //   const dialogConfig = new MatDialogConfig();
//   //   dialogConfig.disableClose = true;
//   //   dialogConfig.autoFocus = true;
//   //   dialogConfig.height = '400px'
//   //   dialogConfig.width = '400px'


//   //   dialogConfig.data = {
//   //     case_id :this.case_id,
//   //     _id:this._id,
//   //     componentName:this.componentName
 
//   //   }
//   //   console.log("case id",this.case_id)
//   //   // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
//   //   const dialogRef = this.dialog.open(QuicknoteComponent,dialogConfig);




//   // }

//   getClassToApply(){
//     let colorType = this.colorType? this.colorType : ""
//     // let colorType = this.colorType
//   if(colorType === "RED"){
//     return 'red'
//   }else if(colorType === "VIOLET"){
//     return 'Violet'
//   }else if(colorType === "INDIGO"){
//     return 'Indigo'
//   }else if(colorType === "BLUE"){
//     return 'Blue'
//   }else if(colorType === "GREEN"){
//     return 'Green'
//   }else if(colorType === "YELLOW"){
//     return 'Yellow'
//   }else if(colorType === "ORANGE"){
//     return 'Orange'
//   }else if(colorType === "PINK"){
//     return 'Pink'
//   }else if(colorType === "GREY"){
//     return 'Grey'
//   }else if(colorType === "PURPLE"){
//     return 'Purple'
//   }else{
//       return '#ED7014'
//     }
//   }
//   //Quick Note
//   downloadcdfFile(fileName: string){
//     this.displayedProofOfWorkDocName = fileName;
//     const componentDetails = {
//         caseId: this.caseId,
//         _id: this._id
//     };

//     this.componentDataService.downloadcdf( componentDetails, fileName).subscribe(
//         (response: HttpResponse<Blob>) => {
//             if (response.body) {
//                 console.log("response", response.body.type);

//                     FileSaver.saveAs(response.body, fileName + (response.body.type.includes("msword") ? "doc" : ""));
              
//             } else {
//                 // Handle the case when response.body is null
//                 console.error("Received null response body");
//             }
//         },
//         error => {
//             this.showError(error.error.message);
//         }
//     );
//   }
//   showMessage(msg: string){
//     this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }
//   showError(msg: string){
//     this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }
// }
//////new 20July2025/////////////////

import { Component, Input, SimpleChange } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { CaseDetailsForDataEntryService } from '../../service/case-details-for-data-entry.service';
import { ComponentDataService } from '../../service/component-data.service';
import { BranchService } from 'src/app/masters/service/branch.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChatboxComponent } from 'src/app/chatbox/chatbox.component';
import { QuicknoteComponent } from 'src/app/quicknote/quicknote.component';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailTemplateService } from 'src/app/masters/service/email-template.service';
import { EmailCandidateDataService } from 'src/app/verification/service/email-candidate-data.service';
import {componentKeys} from "src/app/componentKeys";
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';
// import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-component-inputqc',
  templateUrl: './component-inputqc.component.html', 
  styleUrls: ['./component-inputqc.component.scss']
})
export class ComponentInputqcComponent {
    previewFile: any = null;//added line oct -16
  showSaveButton = false;

  @Input() selectedRow: any;
  datePipe!: DatePipe;
  _id: string = '';
  displayedDocumentName!: string;
  showDocumentDialog: boolean = false;
  documentBlob!: Blob | any;
  errorMsg!: string;
  isLoading!: boolean;
  filteredUniversities!: any[];
  filteredCompanies!: any[];
  currentComponent_id = '';
  case_id!: string;
  caseId!: string;
  candidateName!: string;
  clientId!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string;
  clientContractId!: string;
  packageName!: string;
  packageComponents!: any[];
  profileName!: string;
  profileComponents!: any[];
  componentsToCheck!: any[];
  component!: string;
  componentName!: string;
  componentFields!: any[];
  componentDisplayName!: string;
  component_id!: string;
  componentType!: string;
  currentComponentFileUploadRequired: boolean = false;
  componentDataEntryForm!: FormGroup
  inputqcForm!: FormGroup
  // Add Comments 
  ShowComments:boolean=false;
  colorType!: string; 
  comment!:string
  // Add Comments 
  files!: any[];
  displayedProofOfWorkDocName!: string;
  candidateDocuments!: string[]; 
  proofsUploaded!: string[];
  //Added 30Sep2024 start
  componentFieldsLhs:any[]=[];
  componentFieldsValues:any[]=[];
  verificationMailSent:boolean=false;
  componentData :boolean = false
  
  //Added by anil on 4/5/2024 end
  
  constructor(
    private caseDetailsDataEntryService: CaseDetailsForDataEntryService,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private componentFieldService: ComponentFieldService,
    private componentDataService: ComponentDataService,
    private caseUploadService: CaseUploadService,
    private activatedRoute: ActivatedRoute,
    private branchService: BranchService,
    private location: Location,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar:MatSnackBar,
    private emailTemplateService:EmailTemplateService,
    private _EmailCandidateDataService:EmailCandidateDataService,
    private router: Router,


  ) { 
    this.componentDataEntryForm = this.fb.group({
      dataEntryStatus: [''],
      insufficiencyComments: [''],
    });
    this.inputqcForm =  this.fb.group({
      status: [''],
      inputqcComments: ['']
    })
  }

  ngOnChanges(changes: SimpleChange): void {
    this.componentOnInit()
  }

  ngOnInit(){


    this.componentOnInit()
  }

  componentOnInit() {
    // this.files = new Array();
    let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
      console.log('verification == ', verification);
    
      //code added refersh  
      if(!verification){
      this.router.navigate([`/home/inputqc/inputqccaselist`]);
    }
  
    this.case_id = verification.case_id;
    this.caseId = verification.caseId;
    this.candidateName = verification.candidateName;
    this.clientId = verification.clientId;
    this.clientName = verification.clientName;
    this.subclient_id = verification.subclient_id;
    this.subclientName = verification.subclientName;
    this.clientContractId = verification.clientContract;
    this.componentFields = verification.componentFields;
    this.component_id = verification.component_id;
    this.componentName = verification.componentName;
    this.componentDisplayName = verification.componentDisplayName;
    this.componentType = verification.componentType;
    this._id = verification._id;
    console.log("Color Type",this._id);
    console.log("Color Type",verification.comment);
    ///check wise comments
    this.colorType = this.componentDetailsForVerificationService.getVerificationItem().colorType;
    this.comment = this.componentDetailsForVerificationService.getVerificationItem().comment;
    if (!this.comment  ) {
      this.ShowComments = false;
    } else {
      this.ShowComments = true;
    }
///check wise comments
    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response => {
        this.componentFields = response;
        this.addFormFields();
        this.getComponentDetails();
      },
      error => {
        console.log(error);
      }
    );

this.readCdf()
    this.readProofOfWork()

  }
readCdf(){
  this.files=[]
  this.componentDataService.readFileNames(this.componentName, this.caseId, this._id).subscribe(
    response => {
      console.log("files:",response);
      
      this.files = response;
    },
    error => {
      console.log(error);
    }
  )

}

  readProofOfWork(){
    this.proofsUploaded=[]
    this.componentDataService.readcdf(this.caseId).subscribe(
      response=>{
        console.log('response from read proof of works ',response);
        this.proofsUploaded = response;
      },
      error=>{
        //console.log(error);
      }
    )
  }
  addFormFields() {
    // this.componentFields.forEach(item => {
    //   if (item.lhsRhs == "LHS" || item.lhsRhs == "BOTH") {
    //     this.componentDataEntryForm.addControl(item.name, new FormControl(''));
    //   }
    // })
    for(let i=0; i<this.componentFields.length; i++){
      const item = this.componentFields[i]
      if(item != null){
        this.componentData = true
        console.log("this.componentData",this.componentData)
      }
      console.log("componentFields ",item);
      if(item.lhsRhs =="LHS" || item.lhsRhs =="BOTH"){
        this.componentDataEntryForm.addControl(item.name,new FormControl(''));   
        this.componentFieldsLhs.push(item)
      }
      
    }
  }

  getComponentDetails() {
    this.componentDataService.findOne(this.componentName, this.case_id, this._id).subscribe(
      response => {
        this.componentFieldsValues = response
        this.componentFields.forEach(item => {
          if (item.type !== 'DATE') {
            this.componentDataEntryForm.get(item.name)?.setValue(response[item.name]);
          } else {
            const dateValue = new Date(response[item.name]);
            const dd = dateValue.getDate().toString().padStart(2, '0');
            const mm = (dateValue.getMonth() + 1).toString().padStart(2, '0');
            const yyyy = dateValue.getFullYear();

            this.componentDataEntryForm.get(item.name)?.setValue(`${yyyy}-${mm}-${dd}`);
          }
          this.componentDataEntryForm.get('dataEntryStatus')!.setValue(response.status);
          if (response.status == "INSUF-1-REQ") {
            this.componentDataEntryForm.get('dataEntryStatus')!.setValue(response.status);
            this.componentDataEntryForm.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
          }
        })
      },
      error => {
        console.log(error);
      }
    )

  }

  getValues(name: any) {
    for (let field of this.componentFields) {
      if (field.name == name) {
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }

  // saveButtonClicked() {
  //   console.log('update');
  //   if(["education","employment"].includes(this.componentName)){
  //     console.log("test1111:",this.componentName);

  //     this.generateMailBody();
  //     this.updateComponentStatus()
  //     this.showMessage("Component Status  Saved"); 
  //   }else{
  //     console.log("test:",this.componentName);
      
  //     this.updateComponentStatus()    
      
  //   }
  //   this.generateMailBody();
  //   // this.updateComponentStatus()

  // }

  ////added code;

  saveButtonClicked() {
  if(this.isLoading) return; // prevent double clicks
  this.isLoading = true;

  console.log('update',this.componentName);
  // try {
  //   if(["education","employment"].includes(this.componentName)){
  //   this.generateMailBody().then(() => {
  //     this.updateComponentStatus();
  //   }).catch(err => {
  //     this.showError("Failed to generate email body");
  //     this.isLoading = false;
  //   });
  // } else {
    
    this.updateComponentStatus();
  // }
  // } catch (error) {
  //   console.log("Error in saving",error)
  // }
  
}

//added new code

// showSaveButton = false;

updateStatus(status: string) {
  this.inputqcForm.get('status')!.setValue(status);

  if (status === 'INPUTQC-ACCEPTED') {
    this.showSaveButton = false; 
    this.saveButtonClicked();    
  }
}

updateReject() {
  this.inputqcForm.get('status')!.setValue('INPUTQC-REJECTED');
  this.showSaveButton = true;
}

finalReject() {
  const comments = this.inputqcForm.get('inputqcComments')!.value;
  if (!comments || comments.trim() === "") {
    this.showError("Please enter rejection comments.");
    return;
  }

  this.saveButtonClicked();     
  this.showSaveButton = false;  
}


  // generateMailBody(){
  //   console.log("inside generateMailBody",this.componentFieldsLhs);
    
  //   this.emailTemplateService.findOne('60f53b32ff55047d921e90aa').subscribe((response)=>{
  //    const data={caseId:this.caseId,emailTemplate: response,componentFieldsLhs: this.componentFieldsLhs,componentFiledsValues:this.componentFieldsValues,candidateDocs:this.files,componentName:this.componentName,componentDocId:this._id}
  

    

    
    
  //    this.componentFieldsLhs.forEach(item1 => {

  //     item1[item1.name]=data.componentFiledsValues[item1.name]
  //     // item1[item1.name +"Rhs"]=data.componentFiledsValues[item1.name+"Rhs"]

  //   })
  //     console.log("inside generateMailBody",this.componentFieldsLhs);
     
  //   //  const modifiedSubject = String(data.emailTemplate.subject).replace(/<<CASE-ID>>/,data.caseId)
  //   // const modifiedSubject = `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${componentKeys[data.componentName]}:${this._id}`
  //   const modifiedSubject = `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${componentKeys[data.componentName as keyof typeof componentKeys]}:${this._id}`;



  //    let htmlTable = `<style>
  //    #customers {
  //      font-family: Arial, Helvetica, sans-serif;
  //      border-collapse: collapse;
  //      width: 100%;
  //    }
     
  //    #customers td, #customers th {
  //      border: 1px solid #ddd;
  //      padding: 8px;
  //    }
     
  //    #customers tr:nth-child(even){background-color: #E2E2E2;}
     
  //    #customers tr:hover {background-color: #ddd;}
     
  //    #customers th {
  //      padding-top: 12px;
  //      padding-bottom: 12px;
  //      text-align: left;
  //      background-color: #003c5c;
  //      color: white;
  //    }
  //    </style>
     
  //        <table id="customers">
  //        <thead>
  //          <tr>
  //            <th>Label</th>
  //            <th>Details Provided</th>
  //            <th>Details Verified</th>
  //          </tr>
  //        </thead>
  //        <tbody>
  //        `
         
  //        for(let item of data.componentFieldsLhs){
  //          htmlTable+=`<tr> <td>${item.label}</td>
  //          <td>${item[item.name] || ""}</td>
  //          <td>${item[item.fieldname+"Rhs"] || ""}</td>
  //          </tr>`
  //        }
  //        htmlTable+="</tbody></table>"
     
     
  //        const pattern = /&lt;&lt;[^&lt;]*-TABLE&gt;&gt;/g;
  //        const htmlContent =String(data.emailTemplate.content).replace(pattern,htmlTable)
  //        console.log("dataToSend",data);
  //        this.componentDataService.getToAndCCMailAddresses(data.componentName,data.componentDocId).subscribe((next)=>{
  //         console.log("Send Data Get:",next.to);
          
  //         if(next.to){
  //           const payload={
  //             toEmail:next.to,
  //             subject:modifiedSubject,
  //             cc:localStorage.getItem('userId'),
  //             body:htmlContent,
  //             filenames: data.candidateDocs || [],
  //             caseId:data.caseId,
  //             componentDocId:data.componentDocId,
  //             componentName:data.componentName,
  //             folderName:"candidatedocs"
        
  //           }

  //            console.log("Payload",payload);
             
  //    this._EmailCandidateDataService.sendEmail(payload).subscribe(res => {
  //      console.log(res);
       
  //      this.verificationMailSent=true;
  //     //  this.updateComponentStatus()
  //     // this.showMessage(res.message);    
  //    },err =>{

  //     this.showMessage(err.message);
  //    })
  //           console.log(payload);

  //         }
    
  //       },
  //       (error)=>{
  //          this.showMessage(error?.message || "Unexpected error occur. please, try again.")
  //       }
  //       )
      
        
  //   },(error)=>{
  //       console.log(error);
        
  //   })
  // }

  //coded added;

  //added code
generateMailBody(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.emailTemplateService.findOne('60f53b32ff55047d921e90aa').subscribe((response) => {
      const data = {
        caseId: this.caseId,
        emailTemplate: response,
        componentFieldsLhs: this.componentFieldsLhs,
        componentFiledsValues: this.componentFieldsValues,
        candidateDocs: this.files,
        componentName: this.componentName,
        componentDocId: this._id
      };

      this.componentDataService.getToAndCCMailAddresses(data.componentName, data.componentDocId).subscribe((next) => {
        if(next.to){
          const payload = { 
            toEmail: next.to,
            subject: `CASEID : ${data.caseId}-Verification of ${this.candidateName}-${data.componentName}:${data.componentDocId}`,
            cc: localStorage.getItem('userId'),
            body: 'Your HTML content here',
            filenames: data.candidateDocs || [],
            caseId: data.caseId,
            componentDocId: data.componentDocId,
            componentName: data.componentName,
            folderName: "candidatedocs"
          };

          this._EmailCandidateDataService.sendEmail(payload).subscribe(res => {
            this.verificationMailSent = true;
            resolve();
          }, err => {
            this.showError(err.message || "Email sending failed");
            reject(err);
          });
        } else {
          reject("No 'to' email address found");
        }
      }, (error) => {
        this.showError(error?.message || "Unexpected error while fetching email addresses");
        reject(error);
      });
    }, (error) => {
      this.showError("Failed to fetch email template");
      reject(error);
    });
  });
}


  acceptRejectChanged(event: any) {
    if (this.inputqcForm.get('status')!.value == 'INPUTQC-REJECTED') {
      this.inputqcForm.get('inputqcComments')!.setValidators(Validators.required);
      this.inputqcForm.get('inputqcComments')!.updateValueAndValidity({ emitEvent: true })
    } else {
      this.inputqcForm.get('inputqcComments')!.clearValidators();
      this.inputqcForm.get('inputqcComments')!.updateValueAndValidity({ emitEvent: true })
    }
  }

  //////////new////////
//     updateComponentStatus() {
//     let inputqcData: any = this.inputqcForm.getRawValue() ;
//     let inputqcComponentData: any =this.componentDataEntryForm.getRawValue()
//     let inputqcmainData: any = {
//       ...inputqcData,
//       ...inputqcComponentData
//   };
//     console.log("inputqcData:",inputqcData);
    
//     inputqcmainData.case_id = this.case_id;
//     inputqcmainData._id = this._id;
// console.log("status",this.inputqcForm.get('status')!.value, this.inputqcForm.get('status')?.value   );
// // console.log("00Component Status  Saved", inputqcData.status);

//     if (inputqcData.status === 'INPUTQC-ACCEPTED') {
//       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === 'INSUF-1-REQ') {
//         inputqcData.status = 'INSUF-1-REQ-ACCEPTED';
//       }
//       // console.log("0Component Status  Saved");

//       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === "DE-COMPLETED") {

      
//           this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//             response => {
//               console.log("2Component Status  Saved");
//               this.showMessage("Data saved")
//                             this.location.back();
//             },
//             error => {
//               console.log("Error updating component status");
//             }
//           )
        
//       }
//       else {
//         this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//           response => {
//             let insuffDetails = ({
//               caseId: this.caseId,
//               candidateName: this.candidateName,
//               componentDisplayName: this.componentDisplayName,
//               insufficiencyDetails: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//               subclient: this.subclient_id,
//               status: "INSUF-1-REQ-ACCEPTED",
//               insufficiencyComments: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//             })
//                           console.log("2Component Status  Saved");
//               this.showMessage("Data saved")
//                             this.location.back();
//             this.caseUploadService.updateInsuffRaisedDate(this.case_id, insuffDetails).subscribe(
//               response => {
//                 console.log("Status Saved")
//                 this.showMessage("Data saved")
                
//                 this.location.back()
//               },
//               error => {
//                 console.log("Error updating Case Insuff Date")
//               }
//             )

//           },
//           error => {
//             console.log("Error Saving Status")
//           }
//         )
//       }
//     } else {
//       console.log("inputqcData",inputqcData);
      
//       this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//         response => {
//           if (this.inputqcForm.get('status')!.value === 'INPUTQC-REJECTED') {
//             this.caseDetailsDataEntryService.setCaseInputqcStatus('INPUTQC-REJECTED');
//           }
//           this.showMessage("Data saved")

//           this.location.back();
//         },
//         error => {
//           console.log(error.error.message);
//         }
//       )
//     }
//   }

///added new code...

updateComponentStatus() {
  let inputqcData = this.inputqcForm.getRawValue();
  console.log("inputqcData--",inputqcData)
  let inputqcComponentData = this.componentDataEntryForm.getRawValue();
  let inputqcmainData = { ...inputqcData, ...inputqcComponentData, case_id: this.case_id, _id: this._id };
  console.log(inputqcmainData,"inputqcmainData...............")

  this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(

    response => {
      console.log("response from updateComponentStatus",response)
      this.showMessage("Data saved");
      setTimeout(()=>{
        this.location.back();
        this.isLoading = false;
      },2000)
    },
    error => {
      console.log("error from updateComponentStatus",error)
      this.showError(error.error?.message || "Failed to update status");
      this.isLoading = false;
    }
  );
}





  //////////////////////
//   updateComponentStatus() {
//     let inputqcData: any = this.inputqcForm.getRawValue() ;
//     let inputqcComponentData: any =this.componentDataEntryForm.getRawValue()
//     let inputqcmainData: any = {
//       ...inputqcData,
//       ...inputqcComponentData
//   };
//     console.log("inputqcData:",inputqcData);
    
//     inputqcmainData.case_id = this.case_id;
//     inputqcmainData._id = this._id;
// console.log("status",this.inputqcForm.get('status')!.value, this.inputqcForm.get('status')?.value   );
// // console.log("00Component Status  Saved", inputqcData.status);

//     if (inputqcData.status === 'INPUTQC-ACCEPTED') {
//       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === 'INSUF-1-REQ') {
//         inputqcData.status = 'INSUF-1-REQ-ACCEPTED';
//       }
//       // console.log("0Component Status  Saved");

//       if (this.componentDataEntryForm.get('dataEntryStatus')!.value === "DE-COMPLETED") {
//         if (this.componentType == 'address') {
//           // console.log("1Component Status  Saved");

//           for (let i = 0; i < this.componentFields.length; i++) {
//             let item = this.componentFields[i];
//             let fieldName = item.name.toLowerCase();
//             if (fieldName.indexOf("pin") > -1) {
//               this.branchService.getABranchForPin(this.componentDataEntryForm.get(item.name)!.value).subscribe(
//                 responseFromBranch => {
//                   inputqcData.branch = responseFromBranch._id;
//                   this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//                     response => {
//                       inputqcData.status = "ALLOCATE-TO-VENDOR";
//                       this.componentDataService.putItToVendorBucket(this.componentName, inputqcmainData).subscribe(
//                         vendorResponse => {
//                           console.log("Allocated to Vendor");
//                                         console.log("2Component Status  Saved");
//                             this.showMessage("Data saved")
//                             this.location.back();
//                         },
//                         error => {
//                           console.log("ErrorAllocating to Vendor");
//                         }
//                       )
//                       this.location.back(); 
//                     },
//                     error => {
//                       console.log(error.error.message)
//                     }
//                   )

//                 },
//                 error => {
//                   console.log("Could not find a branch with the pin");
//                 }
//               )
//               break;

//             }
//           }
//         }
//         else {
//           this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//             response => {
//               console.log("2Component Status  Saved");
//               this.showMessage("Data saved")
//                             this.location.back();
//             },
//             error => {
//               console.log("Error updating component status");
//             }
//           )
//         }
//       }
//       else {
//         this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//           response => {
//             let insuffDetails = ({
//               caseId: this.caseId,
//               candidateName: this.candidateName,
//               componentDisplayName: this.componentDisplayName,
//               insufficiencyDetails: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//               subclient: this.subclient_id,
//               status: "INSUF-1-REQ-ACCEPTED",
//               insufficiencyComments: this.componentDataEntryForm.get('insufficiencyComments')!.value,
//             })
//                           console.log("2Component Status  Saved");
//               this.showMessage("Data saved")
//                             this.location.back();
//             this.caseUploadService.updateInsuffRaisedDate(this.case_id, insuffDetails).subscribe(
//               response => {
//                 console.log("Status Saved")
//                 this.showMessage("Data saved")
                
//                 this.location.back()
//               },
//               error => {
//                 console.log("Error updating Case Insuff Date")
//               }
//             )

//           },
//           error => {
//             console.log("Error Saving Status")
//           }
//         )
//       }
//     } else {
//       console.log("inputqcData",inputqcData);
      
//       this.componentDataService.updateInputqcStatus(this.componentName, inputqcmainData).subscribe(
//         response => {
//           if (this.inputqcForm.get('status')!.value === 'INPUTQC-REJECTED') {
//             this.caseDetailsDataEntryService.setCaseInputqcStatus('INPUTQC-REJECTED');
//           }
//           this.showMessage("Data saved")

//           this.location.back();
//         },
//         error => {
//           console.log(error.error.message);
//         }
//       )
//     }
//   }

 ///previw add this function in the file

//   previewCaseDoc(fileName: string) {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadcdf( componentDetails, fileName).subscribe(
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
//             this.deletecdfFile(fileName); // Delete for Case Docs
//           }
//         });
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }

//   previewProofOfWork(fileName: string) {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
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
//             this.deleteProofOfWork(fileName);
//           }
//         });
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }

//  Preview for Case Doc's
previewCaseDoc(fileName: string) {
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
          fileCategory: 'case' 
        };
      }
    },
    error => this.showError(error.error.message)
  );
}

//  Preview for Proof of Work
previewProofOfWork(fileName: string) {
  const componentDetails = {
    caseId: this.caseId,
    _id: this._id
  };

  this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
    (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
          fileCategory: 'proof' 
        };
      }
    },
    error => this.showError(error.error.message)
  );
}

//  Close Preview
closePreview(): void {
  this.previewFile = null;
}
handlePreviewClose(event?: { delete?: boolean }) {
  if (event?.delete && this.previewFile?.fileName) {
    if (this.previewFile.fileCategory === 'case') {
      this.deletecdfFile(this.previewFile.fileName);
    } else if (this.previewFile.fileCategory === 'proof') {
      this.deleteProofOfWork(this.previewFile.fileName);
    }
  }

  // Always close preview panel
  this.previewFile = null;
}


//////////////////////

  downloadProofOfWork(fileName: string) {
    this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        caseId: this.caseId,
        _id: this._id
    };

    this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
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

deleteProofOfWork(fileName:string){
    let componentDetails = {
      caseId:this.caseId,
      _id:this._id
    }
   

    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete candidate docs?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
        if(result.event=='confirmed'){
          this.componentDataService.deleteCandidateDoc(this.componentName,componentDetails,fileName).subscribe(
            response=>{
              this.showMessage("File Deleted");
              this.readCdf()
            },
            error=>{
              this.showError("Error deleting the file")
            }
          )
        }
      })
  }

  deletecdfFile(fileName:string){
    console.log('file === ', fileName);
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete candidate docs?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
        if(result.event=='confirmed'){
          this.componentDataService.deleteCDF(this.caseId,fileName).subscribe(
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


  // downloadFile(fileName: any) {
  //   this.displayedDocumentName = fileName;
  //   const componentDetails = {
  //       caseId: this.caseId, 
  //       _id: this._id
  //   };
  //   this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
  //     (response: HttpResponse<Blob>) => {
  //         if (response.body) {
  //             console.log("response", response.body.type);
  //             // if (response.body.type === "audio/mpeg") {
  //             //     FileSaver.saveAs(response.body, "audio.mp3");
  //             // } else if (response.body.type === "application/pdf") {
  //             //     this.proofOfWorkDocBlob = response.body;
  //             //     this.toggleProofOfWorkDialog();
  //             // } else {
  //                 FileSaver.saveAs(response.body, "test." + (response.body.type.includes("msword") ? "doc" : ""));
  //             // }
  //         } else {
  //             // Handle the case when response.body is null
  //             console.error("Received null response body");
  //         }
  //     },
  //     error => {
  //         this.showError(error.error.message);
  //     }
  // );
  //   // this.displayedDocumentName = fileName;
  //   // let componentDetails: any = {}
  //   // componentDetails["caseId"] = this.caseId;
  //   // componentDetails["_id"] = this._id;
  //   // this.componentDataService.downloadFile(this.componentName, componentDetails, fileName).subscribe(
  //   //   (response: HttpResponse<Blob>) => {
  //   //     this.documentBlob = response.body;
  //   //     //console.log("blob is ",this.documentBlob);
  //   //     this.showDocumentDialog = true;
  //   //     //console.log("showing the document now");
  //   //   },
  //   //   error => {
  //   //     console.log(error);
  //   //   }
  //   // )
  // }
  downloadCDF(fileName: string) {
    
    
    // this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        caseId: this.selectedRow.caseId,
        componentId: this.selectedRow._id,
        componentName:this.selectedRow.componentName
    };
    // console.log("ANy thing",componentDetails);
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
}
  // downloadCDF() { 
  //   this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       // FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  cancelButtonClicked(event:any) {
    // this.router.navigate(['masters/employmentmaster']);
    event.preventDefault();
    this.goBack()
  }

  goBack() {
    this.location.back();
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
    let colorType = this.colorType? this.colorType : ""
    // let colorType = this.colorType
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
  //Quick Note
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