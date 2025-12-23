// import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
// // import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { EmailCandidateDataService } from "../service/email-candidate-data.service";
// import { MatSnackBar } from '@angular/material/snack-bar';
// // import { ComponentDataService } from 'src/app/data-entry/service/component-data.service';
// import { HttpResponse } from '@angular/common/http';
// import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';


// interface ComponentDetails {
//   caseId: string;
//   _id: string;
// }
// @Component({
//   selector: 'app-email',
//   templateUrl: './email.component.html',
//   styleUrls: ['./email.component.scss']
// })
// export class EmailComponent {
//   labelsAndFields:any[]=[];
//   displayedCandidateDocName!:string;
//   candidateDocBlob:Blob | undefined;
//   showCandidateDocsDialog:boolean=false;
//   candidateDocuments!:string[];
//   proofsUploaded!:string[];
//   emailAttachmentsUploaded!:string[];


//   fileUploadForm = new FormGroup({
//     proofOfWorkFile : new FormControl(''),
//     fileTitle: new FormControl('')
//   })



//   // Table data
//   tableData: any[] = []; // Initialize with an empty array

//   emailTemplateForm = new FormGroup({
//     emailFormControl : new FormControl('', [Validators.required, this.emailValidator()]),
//     cc:new FormControl('',[this.emailListValidator()]),
//     subject : new FormControl('',[Validators.required]),
//     content : new FormControl('',[Validators.required]),
//     proofOfWorkFile : new FormControl(''),
//     fileTitle: new FormControl('')

//   })

//   editorConfig: AngularEditorConfig = {
//     editable: true,
//       spellcheck: true,
//       height: 'auto',
//       minHeight: '0',
//       maxHeight: 'auto',
//       width: 'auto',
//       minWidth: '0',
//       translate: 'yes',
//       enableToolbar: true,
//       showToolbar: true,
//       placeholder: 'Enter text here...',
//       defaultParagraphSeparator: '',
//       defaultFontName: '',
//       defaultFontSize: '',
//       fonts: [
//         {class: 'arial', name: 'Arial'},
//         {class: 'times-new-roman', name: 'Times New Roman'},
//         {class: 'calibri', name: 'Calibri'},
//         {class: 'comic-sans-ms', name: 'Comic Sans MS'}
//       ],
//       customClasses: [
//       {
//         name: 'quote',
//         class: 'quote',
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: 'titleText',
//         class: 'titleText',
//         tag: 'h1',
//       },
//     ],
//     uploadWithCredentials: false,
//     sanitize: true,
//     toolbarPosition: 'top',
//     toolbarHiddenButtons: [
//       ['bold', 'italic'],
//       ['fontSize']
//     ]
// };

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _EmailCandidateDataService:EmailCandidateDataService,private snackBar:MatSnackBar,
//   private componentDataService:ComponentDataService,

//   ) {
//     // Access data here, e.g., this.data.key1

//     let labelsAndFieldNames: {
//       name: any; label: any; fieldname: any; 
// }[]=[];

//     this.data.componentFieldsLhs.forEach((item: { label: any; name: any; })=>{
//       return labelsAndFieldNames.push({
//         label: item.label, fieldname: item.name,
//         name: undefined
//       });
//     })
//     this.data.componentFieldsRhs.forEach((item: { label: any; name: any; })=>{
//       return labelsAndFieldNames.push({
//         label: item.label, fieldname: item.name,
//         name: undefined
//       });
//     })

//     const uniqueData: any[] = [];

// const seen = new Set();

// labelsAndFieldNames.forEach(item => {
//   const key = `${item.label}_${item.name}`;
//   if (!seen.has(key)) {
//     seen.add(key);
//     uniqueData.push(item);
//   }
// });


//     this.labelsAndFields=uniqueData;
    
//     this.labelsAndFields.forEach(item1 => {

//       item1[item1.fieldname]=this.data.componentFiledsValues[item1.fieldname]
//       item1[item1.fieldname+"Rhs"] =this.data.componentFiledsValues[item1.fieldname+"Rhs"]
//     })
   

//     const modifiedSubject = String(this.data.emailTemplate.subject).replace(/<<CASE-ID>>/,this.data.caseId)

//     this.emailTemplateForm.get('subject')?.setValue(modifiedSubject)

//     let htmlTable = `<style>
// #customers {
//   font-family: Arial, Helvetica, sans-serif;
//   border-collapse: collapse;
//   width: 100%;
// }

// #customers td, #customers th {
//   border: 1px solid #ddd;
//   padding: 8px;
// }

// #customers tr:nth-child(even){background-color: #E2E2E2;}

// #customers tr:hover {background-color: #ddd;}

// #customers th {
//   padding-top: 12px;
//   padding-bottom: 12px;
//   text-align: left;
//   background-color: #04AA6D;
//   color: white;
// }
// </style>

//     <table id="customers">
//     <thead>
//       <tr>
//         <th>Label</th>
//         <th>Details Provided</th>
//         <th>Details Verified</th>
//       </tr>
//     </thead>
//     <tbody>
//     `
//     for(let item of this.labelsAndFields){
//       htmlTable+=`<tr> <td>${item.label}</td>
//       <td>${item[item.fieldname]}</td>
//       <td>${item[item.fieldname+"Rhs"]}</td>
//       </tr>`
//     }
//     htmlTable+="</tbody></table>"


//     const pattern = /&lt;&lt;[^&lt;]*-TABLE&gt;&gt;/g;


//     const htmlContent = String(this.data.emailTemplate.content).replace(pattern,htmlTable)

//     this.emailTemplateForm.get('content')?.setValue(htmlContent) 

      
//   }
 
  
//   ngOnInit(): void {
//     console.log("data.candidateDocs",this.data.candidateDocs);
//     this.readEmailAttachments();

//   }

//   sendEmail() {
//     this._EmailCandidateDataService.setEmailBeingSent(true);
  
//     // Use optional chaining to safely access form controls
//     const filteredCC = this.emailTemplateForm.get('cc')?.value?.split(',')
//       .map((email: string) => email.trim())
//       .filter((item: string) => item !== '') || [];
  
//     const payload = {
//       toEmail: this.emailTemplateForm.get('emailFormControl')?.value || '',
//       subject: this.emailTemplateForm.get('subject')?.value || '',
//       cc: filteredCC,
//       body: this.emailTemplateForm.get('content')?.value || '',
//       filenames: this.emailAttachmentsUploaded || [],
//       caseId: this.data?.caseId || '',
//       componentDocId: this.data?.componentDocId || '',
//       componentName: this.data?.componentName || ''
//     };
  
//     // Further implementation to handle sending the email

  
    
//      this._EmailCandidateDataService.sendEmail(payload).subscribe(res => {

//       this.showMessage(res.message);    
//      },err =>{

//       this.showMessage(err.message);
//      })

//   }

//   showError(msg: string){
//     this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//     this._EmailCandidateDataService.setEmailBeingSent(false);

//   }    
//   showMessage(msg: string){
//     this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//     this._EmailCandidateDataService.setEmailBeingSent(false);


//   }
  

//    // Custom email validator using a regular expression
//    emailValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       const valid = emailRegex.test(control.value);
//       return valid ? null : { invalidEmail: true };
//     };
//   }

//   emailListValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       const emails = control.value.split(',').map((email: string) => email.trim()).filter((item: string) => item !== '');

//       for (const email of emails) {
//         if (email && !emailRegex.test(email)) {
//           return { invalidEmailList: true };
//         }
//       }

//       return null;
//     };
//   }

//   downloadCandidateDoc(fileName: string) {
//     this.displayedCandidateDocName = fileName;
  
//     // Define componentDetails with the correct interface
//     let componentDetails: ComponentDetails = {
//       caseId: this.data.caseId,
//       _id: this.data.componentDocId
//     };
  
//     this.componentDataService.downloadEmailAttachment(this.data.componentName, componentDetails, fileName).subscribe(
//       (response: HttpResponse<Blob>) => {
//         // Check if response.body is not null
//         if (response.body) {
//           this.candidateDocBlob = response.body;
//           this.showCandidateDocsDialog = true;
//         } else {
//           this.showError("Document download failed. No data received.");
//         }
//       },
//       error => {
//         this.showError(error.error.message);
//       }
//     );
//   }
  
//   closeCandidateDocsDialog(){
//     this.showCandidateDocsDialog = false;
//   }

//   // uploadFile(){
//   //   this.emailTemplateForm.get('fileTitle')?.setValue(this.emailTemplateForm.get('fileTitle')?.value.replace("'"," "))
//   //   this.emailTemplateForm.get('fileTitle')?.setValue(this.emailTemplateForm.get('fileTitle')?.value.trim())
//   //   this.emailTemplateForm.get('fileTitle')?.setValue(this.emailTemplateForm.get('fileTitle')?.value.replace(" ","_"))
//   //   let componentData = ({

//   //   })
//   //   componentData['_id'] = this.data.componentDocId;
//   //   componentData['case_id']= this.data.case_id;
//   //   componentData['caseId'] = this.data.caseId;
//   //   componentData['fileName'] = this.emailTemplateForm.get('fileTitle').value;
//   //   this.componentDataService.uploadEmailAttachments(this.data.componentName,componentData,this.emailTemplateForm.get('proofOfWorkFile').value.files[0]).subscribe(
//   //     response=>{
//   //       this.showMessage("File Uploaded");
//   //       this.proofsUploaded.push(this.emailTemplateForm.get('fileTitle').value);
//   //       this.readEmailAttachments();
//   //     },
//   //     error=>{
//   //       this.showError("Error uploading the file");
//   //     }
//   //   )
//   // }

//   readEmailAttachments(){
//     this.proofsUploaded=[]
//     this.componentDataService.readEmailAttachments(this.data.componentName,this.data.caseId,this.data.componentDocId).subscribe(
//       response=>{
//         console.log('response from read proof of works ',response);
//         this.emailAttachmentsUploaded = response;
//       },
//       error=>{
//         //console.log(error);
//       }
//     )
//   }
//   ngOnDestroy(): void {
//     this._EmailCandidateDataService.setEmailBeingSent(false);
//   }
// }
////New///
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmailCandidateDataService } from "../service/email-candidate-data.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { HttpResponse } from '@angular/common/http';

interface ComponentDetails {
  caseId: string;
  _id: string;
}

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  labelsAndFields: any[] = [];
  displayedCandidateDocName!: string;
  candidateDocBlob: Blob | undefined;
  showCandidateDocsDialog: boolean = false;
  candidateDocuments: string[] = [];
  proofsUploaded: string[] = [];
  emailAttachmentsUploaded: string[] = [];

  fileUploadForm = new FormGroup({
    proofOfWorkFile: new FormControl(''),
    fileTitle: new FormControl('')
  });

  emailTemplateForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, this.emailValidator()]),
    cc: new FormControl('', [this.emailListValidator()]),
    subject: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    proofOfWorkFile: new FormControl(''),
    fileTitle: new FormControl('')
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _EmailCandidateDataService: EmailCandidateDataService,
    private snackBar: MatSnackBar,
    private componentDataService: ComponentDataService,
    private dialogRef: MatDialogRef<EmailComponent>
  ) {
    // Initialize candidate documents from passed data
    this.candidateDocuments = this.data.candidateDocs || [];
    console.log("📄 Candidate Docs in Email Dialog:", this.candidateDocuments);

    // Rest of your existing constructor code for template generation
    let labelsAndFieldNames: any[] = [];

    this.data.componentFieldsLhs.forEach((item: any) => {
      labelsAndFieldNames.push({
        label: item.label,
        fieldname: item.name,
      });
    });

    this.data.componentFieldsRhs.forEach((item: any) => {
      labelsAndFieldNames.push({
        label: item.label,
        fieldname: item.name,
      });
    });

    const uniqueData: any[] = [];
    const seen = new Set();

    labelsAndFieldNames.forEach(item => {
      const key = `${item.label}_${item.fieldname}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueData.push(item);
      }
    });

    this.labelsAndFields = uniqueData;

    // Modified this section to show "null" for missing data like the old code
    this.labelsAndFields.forEach(item1 => {
      const fieldValue = this.data.componentFiledsValues[item1.fieldname];
      const rhsFieldValue = this.data.componentFiledsValues[item1.fieldname + "Rhs"];
      
      // Set values, showing "null" if data is missing (matching old code behavior)
      item1[item1.fieldname] = fieldValue !== undefined && fieldValue !== null && fieldValue !== '' ? fieldValue : 'null';
      item1[item1.fieldname + "Rhs"] = rhsFieldValue !== undefined && rhsFieldValue !== null && rhsFieldValue !== '' ? rhsFieldValue : 'null';
    });

    const modifiedSubject = String(this.data.emailTemplate.subject).replace(/<<CASE-ID>>/, this.data.caseId);
    this.emailTemplateForm.get('subject')?.setValue(modifiedSubject);

    // Generate HTML table with the same structure as old code
    let htmlTable = `<style>
      #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      #customers td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      #customers tr:nth-child(even){background-color: #E2E2E2;}
      #customers tr:hover {background-color: #ddd;}
      #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
      }
    </style>
    <table id="customers">
      <thead>
        <tr>
          <th>Label</th>
          <th>Details Provided</th>
          <th>Details Verified</th>
        </tr>
      </thead>
      <tbody>`;

    // Build table rows - showing "null" for empty values like the old code
    for (let item of this.labelsAndFields) {
      const detailsProvided = item[item.fieldname] || 'null';
      const detailsVerified = item[item.fieldname + "Rhs"] || 'null';
      
      htmlTable += `<tr>
        <td>${item.label}</td>
        <td>${detailsProvided}</td>
        <td>${detailsVerified}</td>
      </tr>`;
    }
    htmlTable += "</tbody></table>";

    // Replace the table placeholder in email template content
    const pattern = /&lt;&lt;[^&lt;]*-TABLE&gt;&gt;/g;
    const htmlContent = String(this.data.emailTemplate.content).replace(pattern, htmlTable);
    this.emailTemplateForm.get('content')?.setValue(htmlContent);
  }

  ngOnInit(): void {
    console.log("✅ Candidate Docs loaded:", this.candidateDocuments);
    this.readEmailAttachments();
  }

  sendEmail() {
    this._EmailCandidateDataService.setEmailBeingSent(true);

    const filteredCC = this.emailTemplateForm.get('cc')?.value?.split(',')
      .map((email: string) => email.trim())
      .filter((item: string) => item !== '') || [];

    const payload = {
      toEmail: this.emailTemplateForm.get('emailFormControl')?.value || '',
      subject: this.emailTemplateForm.get('subject')?.value || '',
      cc: filteredCC,
      body: this.emailTemplateForm.get('content')?.value || '',
      
      // Send ALL candidate documents as attachments
      filenames: this.candidateDocuments || [],

      caseId: this.data?.caseId || '',
      componentDocId: this.data?.componentDocId || '',
      componentName: this.data?.componentName || ''
    };

    console.log("📧 Sending email with attachments:", payload.filenames);

    this._EmailCandidateDataService.sendEmail(payload).subscribe(
      (res: any) => {
        const message = res.attachmentsSent !== undefined 
          ? `Email sent successfully with ${res.attachmentsSent} attachments`
          : res.message || 'Email sent successfully!';
        
        this.showMessage(message);
        this._EmailCandidateDataService.setEmailBeingSent(false);
        this.dialogRef.close(true);
      },
      (err: any) => {
        this.showError(err.error?.message || 'Error sending email');
        this._EmailCandidateDataService.setEmailBeingSent(false);
      }
    );
  }

  // Preview candidate document
  previewCandidateDoc(fileName: string) {
    this.displayedCandidateDocName = fileName;

    let componentDetails: ComponentDetails = {
      caseId: this.data.caseId,
      _id: this.data.componentDocId
    };

    this.componentDataService.downloadEmailAttachment(this.data.componentName, componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
        if (response.body) {
          this.candidateDocBlob = response.body;
          this.showCandidateDocsDialog = true;
        } else {
          this.showError("Document download failed. No data received.");
        }
      },
      (error: any) => {
        this.showError(error.error.message);
      }
    );
  }

  closeCandidateDocsDialog() {
    this.showCandidateDocsDialog = false;
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Error', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
    this._EmailCandidateDataService.setEmailBeingSent(false);
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
    this._EmailCandidateDataService.setEmailBeingSent(false);
  }

  // Custom email validator using a regular expression
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  emailListValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const emails = control.value.split(',').map((email: string) => email.trim()).filter((item: string) => item !== '');

      for (const email of emails) {
        if (email && !emailRegex.test(email)) {
          return { invalidEmailList: true };
        }
      }

      return null;
    };
  }

  readEmailAttachments() {
    this.proofsUploaded = [];
    this.componentDataService.readEmailAttachments(this.data.componentName, this.data.caseId, this.data.componentDocId).subscribe(
      (response: any) => {
        console.log('response from read proof of works ', response);
        this.emailAttachmentsUploaded = response;
      },
      (error: any) => {
        // Handle error
      }
    );
  }

  ngOnDestroy(): void {
    this._EmailCandidateDataService.setEmailBeingSent(false);
  }
}