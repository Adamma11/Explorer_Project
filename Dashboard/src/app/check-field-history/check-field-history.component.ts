import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentDataService } from '../operations/service/component-data.service';
import { HistoryService } from '../shared/service/history.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-check-field-history',
  templateUrl: './check-field-history.component.html',
  styleUrls: ['./check-field-history.component.scss']
})
export class CheckFieldHistoryComponent {

  dataFromParent: any;
  checkHistoryList: any[] = [];
  constructor(
    private componentDataService: ComponentDataService,
    public dialogRef: MatDialogRef<CheckFieldHistoryComponent>,
    private snackBar: MatSnackBar,
    private historyService: HistoryService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataFromParent = data;
  }

   ngOnInit(): void {
     const { case_id, _id } = this.dataFromParent;
    this.historyService.getCheckFieldsHistory(case_id, _id).subscribe(
      response => this.checkHistoryList = response,
      error => console.error('Error fetching field history', error)
    );
  }
}
