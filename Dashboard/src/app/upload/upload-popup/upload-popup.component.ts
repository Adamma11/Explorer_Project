import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-upload-popup',
  templateUrl: './upload-popup.component.html',
  styleUrls: ['./upload-popup.component.scss']
})
export class UploadPopupComponent {

excelFile: File | null = null;
  zipFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onExcelFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      this.excelFile = file;
    } else {
      this.excelFile = null;
    }
  }

  onZipFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      this.zipFile = file;
    } else if (file) {
      this.zipFile = null;
    } else {
      this.zipFile = null;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpload(): void {
    if (this.excelFile) {
      this.dialogRef.close({
        excelFile: this.excelFile,
        zipFile: this.zipFile
      });
    }
  }


}


