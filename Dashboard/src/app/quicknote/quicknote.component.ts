// import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ComponentDataService } from '../operations/service/component-data.service';
// import { HistoryService } from '../shared/service/history.service';
// import { DatePipe } from '@angular/common';

// interface Comment {
//   user: {
//     name: string;
//   };
//   date: Date;
//   comment: string;
//   colorType: string;
//   status: string;
//   remarks: string;
//   nextfollowupdate: string;
// }

// @Component({
//   selector: 'app-quicknote',
//   templateUrl: './quicknote.component.html',
//   styleUrls: ['./quicknote.component.scss'],
// })
// export class QuicknoteComponent implements OnInit {
//   effortType: string = '';
//   nextfollowupdate!: Date;
//   todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
//   name!: string;
//   comment!: string;
//   comments: Comment[] = [];
//   colorType: string = '';
//   dataFromParent: any;

//   // Define the form group
//   commentDetailsForm = new FormGroup({
//     noteComments: new FormControl('', [Validators.required]),
//     colorType: new FormControl(''),
//     effortType: new FormControl(''),
//     followupdate: new FormControl(''),
//   });

//   constructor(
//     private componentDataService: ComponentDataService,
//     public dialogRef: MatDialogRef<QuicknoteComponent>,
//     private snackBar: MatSnackBar,
//     private historyService: HistoryService,
//     private datePipe: DatePipe,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.dataFromParent = data;
//   }

//   ngOnInit(): void {
//     this.componentDataService.findAllQuicknote(this.dataFromParent.componentName, this.dataFromParent._id).subscribe(
//       (response: Comment[]) => {
//         this.comments = response;
//         this.getHistoryDetails();
//       }
//     );
//   }

//   @ViewChild('commentBox') commentBox!: ElementRef;

//   getHistoryDetails() {
//     if (this.dataFromParent.component_id !== null && this.dataFromParent._id !== null) {
//       this.historyService.getCheckHistory(this.dataFromParent.case_id, this.dataFromParent.component_id, this.dataFromParent._id).subscribe(
//         (response) => {
//           this.comments = this.comments.concat(response);
//           console.log("history comments:",this.comments);
          
//         },
//         (error) => {
//           console.log('Error ', error);
//         }
//       );
//     } else {
//       this.historyService.getCaseHistory(this.dataFromParent.case_id).subscribe(
//         (response) => {
//           this.comments = this.comments.concat(response);
//         },
//         (error) => {
//           console.log('Error ', error);
//         }
//       );
//     }
//   }

//   cancelButtonClicked() {
//     this.dialogRef.close();
//   }

//   showMessage(msg: string) {
//     this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
//   }

//   showError(msg: string) {
//     this.snackBar.open(msg, 'Error', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
//   }

//   statusSelectionChanged(event: { value: string }) {
//     this.colorType = event.value;
//   }


//   addComment() {
//     const effortType = this.commentDetailsForm.get('effortType')?.value;
//     const nextfollowupdate = this.commentDetailsForm.get('followupdate')?.value;
//     const note = this.commentDetailsForm.get('noteComments')?.value;
//   console.log("effortType:",effortType);
  
//     if(effortType === 'Followup1'){
//       let compData = {
//         case_id : this.dataFromParent.case_id,
//         _id : this.dataFromParent._id,
//         note: note,   // Get the note value from the form
//         effortType: effortType,
//         nextfollowupdate: nextfollowupdate,
//         componentName: this.dataFromParent.componentName
//           // Get the date from the form
//       };
  
//       console.log("CompData:", compData);
  
//       // Your service call to save the data can be uncommented here
//       this.componentDataService.addNote(this.dataFromParent.componentName, compData).subscribe(
//         response => {
//           this.showMessage("Note Added");
//           this.dialogRef.close();
//         },
//         error => {
//           this.showError(error.error.message);
//         }
//       );
  
//     } else {
//       // Handle other case when effortType is not 'Followup1'
//       console.log("Test colors,",this.comment, this.colorType);
      
//     this.componentDataService.addQuickNote(this.dataFromParent.componentName, this.dataFromParent._id, this.comment, this.colorType).subscribe(
//         (response) => {
//           this.showMessage('Note Added');
//           this.dialogRef.close();
//         },
//         (error) => {
//           this.showError(error.error.message);
//         }
//       );
//     }
//   }
  

//   followupSelectionChanged(event: { value: any }) {
//     this.effortType = event.value;
//   }

//   SendDatetoFunction(event: any) {
//     this.nextfollowupdate = event.target.value;
//   }
// }
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentDataService } from '../operations/service/component-data.service';
import { HistoryService } from '../shared/service/history.service';
import { DatePipe } from '@angular/common';

interface Comment {
  user: {
    name: string;
  };
  date: Date;
  comment: string;
  colorType: string;
  status: string;
  remarks: string;
  nextfollowupdate: string;
}

// File upload interface matching your case upload pattern
interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
  uploadProgress?: number;
  isUploading?: boolean;
}

@Component({
  selector: 'app-quicknote',
  templateUrl: './quicknote.component.html',
  styleUrls: ['./quicknote.component.scss'],
})
export class QuicknoteComponent implements OnInit {
  effortType: string = '';
  nextfollowupdate!: Date;
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  name!: string;
  comment!: string;
  comments: Comment[] = [];
  colorType: string = '';
  dataFromParent: any;

  // File upload properties - similar to your case upload
  uploadedFiles: UploadedFile[] = [];
  isDragging = false;
  maxFileSize = 10 * 1024 * 1024; 
  acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx';

  // Define the form group
  commentDetailsForm = new FormGroup({
    noteComments: new FormControl('', [Validators.required]),
    colorType: new FormControl(''),
    effortType: new FormControl(''),
    followupdate: new FormControl(''),
  });

  @ViewChild('commentBox') commentBox!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private componentDataService: ComponentDataService,
    private caseUploadService: CaseUploadService,
    public dialogRef: MatDialogRef<QuicknoteComponent>,
    private snackBar: MatSnackBar,
    private historyService: HistoryService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataFromParent = data;
  }

  ngOnInit(): void {
    this.componentDataService.findAllQuicknote(this.dataFromParent.componentName, this.dataFromParent._id).subscribe(
      (response: Comment[]) => {
        this.comments = response;
        this.getHistoryDetails();
      }
    );
  }

  getHistoryDetails() {
    if (this.dataFromParent.component_id !== null && this.dataFromParent._id !== null) {
      this.historyService.getCheckHistory(this.dataFromParent.case_id, this.dataFromParent.component_id, this.dataFromParent._id).subscribe(
        (response) => {
          this.comments = this.comments.concat(response);
          console.log("history comments:",this.comments);
        },
        (error) => {
          console.log('Error ', error);
        }
      );
    } else {
      this.historyService.getCaseHistory(this.dataFromParent.case_id).subscribe(
        (response) => {
          this.comments = this.comments.concat(response);
        },
        (error) => {
          console.log('Error ', error);
        }
      );
    }
  }

  // File upload methods - similar to your case upload pattern
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
  }

  processFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file size - same as your case upload
      if (file.size > this.maxFileSize) {
        this.showError(`File "${file.name}" is too large. Maximum size is 10MB.`);
        continue;
      }

      // Validate file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!this.acceptedFileTypes.includes(fileExtension)) {
        this.showError(`File type not supported for "${file.name}". Accepted types: ${this.acceptedFileTypes}`);
        continue;
      }

      // Check if file already exists
      if (this.uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
        this.showError(`File "${file.name}" is already added.`);
        continue;
      }

      // Add to uploaded files list - similar pattern to your case upload
      this.uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        uploadProgress: 0,
        isUploading: false
      });
    }

    // Reset file input
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileIcon(fileType: string): string {
    if (fileType.includes('pdf')) return 'picture_as_pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'description';
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'table_chart';
    return 'insert_drive_file';
  }

  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  // Updated uploadFiles method using similar pattern to your case upload
  async uploadFiles(): Promise<any[]> {
    const uploadPromises: Promise<any>[] = [];
    
    for (const fileObj of this.uploadedFiles) {
      if (!fileObj.isUploading) {
        fileObj.isUploading = true;
        fileObj.uploadProgress = 0;

        const uploadPromise = new Promise((resolve, reject) => {
          // Create form data similar to your case upload pattern
          const formData = new FormData();
          
          // Use consistent field naming like your case upload
          formData.append('quickNoteFile', fileObj.file, fileObj.name);
          formData.append('caseId', this.dataFromParent.case_id);
          formData.append('componentName', this.dataFromParent.componentName);
          formData.append('componentId', this.dataFromParent._id);

          console.log('Uploading quick note file:', fileObj.name);

          // Use a dedicated endpoint for quick note files
          this.caseUploadService.uploadQuickNoteFiles(formData).subscribe({
            next: (response: any) => {
              fileObj.isUploading = false;
              fileObj.uploadProgress = 100;
              console.log('Quick note file upload successful:', response);
              resolve({
                fileName: fileObj.name,
                fileSize: fileObj.size,
                uploadedAt: new Date(),
                serverResponse: response
              });
            },
            error: (error) => {
              fileObj.isUploading = false;
              fileObj.uploadProgress = 0;
              console.error('Quick note file upload failed:', error);
              this.showError(`Failed to upload ${fileObj.name}: ${error.error?.message || error.message}`);
              reject(error);
            }
          });
        });

        uploadPromises.push(uploadPromise);
      }
    }

    return Promise.all(uploadPromises);
  }

  cancelButtonClicked() {
    this.dialogRef.close();
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'Info', { 
      duration: 4000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Error', { 
      duration: 4000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  statusSelectionChanged(event: { value: string }) {
    this.colorType = event.value;
  }

  // Updated addComment method to handle file uploads like your case upload
  async addComment() {
    if (this.commentDetailsForm.invalid) {
      this.showError('Please fill all required fields');
      return;
    }

    const effortType = this.commentDetailsForm.get('effortType')?.value || '';
    const nextfollowupdate = this.commentDetailsForm.get('followupdate')?.value || '';
    const note = this.commentDetailsForm.get('noteComments')?.value || '';

    console.log("effortType:", effortType);

    try {
      // Upload files first if any - similar to your case upload pattern
      let uploadedFileResponses: any[] = [];
      if (this.uploadedFiles.length > 0) {
        this.showMessage('Uploading files...');
        uploadedFileResponses = await this.uploadFiles();
      }

      if (effortType && effortType.includes('Followup')) {
        let compData = {
          case_id: this.dataFromParent.case_id,
          _id: this.dataFromParent._id,
          note: note,
          effortType: effortType,
          nextfollowupdate: nextfollowupdate,
          componentName: this.dataFromParent.componentName,
          uploadedFiles: uploadedFileResponses // Include file info like your case upload
        };

        console.log("CompData for Followup:", compData);
          // Akshay-06Nov2025
      this.componentDataService.addNote(
      this.dataFromParent.componentName,
      compData
      )
//end
        this.componentDataService.addNote(this.dataFromParent.componentName, compData).subscribe(
          response => {
            const message = uploadedFileResponses.length > 0 
              ? `Note Added with ${uploadedFileResponses.length} file(s) and Submited` 
              : "Note Added";
            this.showMessage(message);
            this.dialogRef.close({ 
              success: true, 
              filesUploaded: uploadedFileResponses.length,
              movedToFollowUp: true  
            });
          },
          error => {
            this.showError(error.error?.message || 'Failed to add note');
          }
        );

      } else {
        // Regular note submission with files - similar to your case upload
        console.log("Adding quick note:", note, this.colorType);
        
        this.componentDataService.addQuickNote(
          this.dataFromParent.componentName, 
          this.dataFromParent._id, 
          note, 
          this.colorType,
          uploadedFileResponses.length > 0 ? uploadedFileResponses : undefined // Pass files like case upload
        ).subscribe(
          (response) => {
            const message = uploadedFileResponses.length > 0 
              ? `Quick note added with ${uploadedFileResponses.length} file(s)` 
              : "Quick note added";
            this.showMessage(message);
            this.dialogRef.close({ 
              success: true, 
              filesUploaded: uploadedFileResponses.length,
              movedToFollowUp: false
            });
          },
          (error) => {
            this.showError(error.error?.message || 'Failed to add quick note');
          }
        );
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      this.showError('Error uploading files. Please try again.');
    }
  }

  
  followupSelectionChanged(event: { value: any }) {
    this.effortType = event.value;
  }

  SendDatetoFunction(event: any) {
    this.nextfollowupdate = event.target.value;
  }

  // // Akshay-0=06Nov2025

submitFollowUp(){
  try {
    alert("hitting")
  } catch (error) {
    console.log("error in submitting followup",error)
  }
}

}
