// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';

// @Component({
//   selector: 'app-file-preview-dialog',
//   templateUrl: './file-preview-dialog.component.html',
//   styleUrls: ['./file-preview-dialog.component.scss']
// })
// export class FilePreviewDialogComponent {
//   constructor(
//         private componentDataService: ComponentDataService,
//             private snackBar: MatSnackBar,
        
    
//     public dialogRef: MatDialogRef<FilePreviewDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   onDownload(): void {
    
    
//     const blob = new Blob([this.data.fileBlob], { type: this.data.fileType });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = this.data.fileName;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }

//   onDelete() {
//     console.log("this.data",this.data.componentDetails);   
//     this.dialogRef.close({ delete: true });
// // const detail = this.data.componentDetails; // or whichever index
// // this.componentDataService.deleteCdf(detail.caseId, detail.fileName).subscribe(
// //   response => {
// //     this.showMessage("File Deleted");
// //     this.dialogRef.close({ delete: true });
// //   },
// //   error => {
// //     this.showError("Error deleting the file");
// //   }
// // );

//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }
//     showError(msg:any) {
//     this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
//   }
//   showMessage(msg:any) {
//     this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
//   }
// }


// // import { Component, Inject } from '@angular/core';
// // import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// // @Component({
// //   selector: 'app-file-preview-dialog',
// //   templateUrl: './file-preview-dialog.component.html',
// //   styleUrls: ['./file-preview-dialog.component.scss']
// // })
// // export class FilePreviewDialogComponent {
// //   fileName: string;
// //   fileType: string;
// //   componentName: string;
// //   fileBlob: Blob;

// //   constructor(
// //     public dialogRef: MatDialogRef<FilePreviewDialogComponent>,
// //     @Inject(MAT_DIALOG_DATA) public data: any
// //   ) {
// //     this.fileName = data.fileName;
// //     this.fileType = data.fileType;
// //     this.fileBlob = data.fileBlob;
// //     this.componentName = data.componentName;
// //   }

// //   onDownload(): void {
// //     const blob = new Blob([this.fileBlob], { type: this.fileType });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = this.fileName;
// //     a.click();
// //     window.URL.revokeObjectURL(url);
// //   }

// //   onDelete(): void {
// //     this.dialogRef.close({ delete: true });
// //   }

// //   onClose(): void {
// //     this.dialogRef.close();
// //   }
// // }



// added code oct-16


import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-preview-dialog',
  templateUrl: './file-preview-dialog.component.html',
  styleUrls: ['./file-preview-dialog.component.scss']
})
export class FilePreviewDialogComponent {
  @Input() data: any;
  @Output() closePreview = new EventEmitter<{ delete?: boolean }>();

  onDownload(): void {
    const blob = new Blob([this.data.fileBlob], { type: this.data.fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.data.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onDelete(): void {

    this.closePreview.emit({ delete: true });
  }

  onClose(): void {
    this.closePreview.emit();
  }
}