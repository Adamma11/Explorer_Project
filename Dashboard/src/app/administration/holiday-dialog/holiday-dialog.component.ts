import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-holiday-dialog',
  templateUrl: './holiday-dialog.component.html',
  styleUrls: ['./holiday-dialog.component.scss']
})
export class HolidayDialogComponent {
  holidayForm = new FormGroup({
    date:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required])
  })
  dataFromParent:any;
  constructor(
    private dialogRef:MatDialogRef<HolidayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any

  ) {
    this.dataFromParent = data;
   }

  ngOnInit(): void {
    let dateValue = new Date(this.dataFromParent.date);
    let dd = dateValue.getDate();
    let mm = dateValue.getMonth()+1;
    let yyyy = dateValue.getFullYear().toString();
    let stringdd = '';
    let stringmm = ''

    if(dd < 10){
      stringdd = '0'+dd;
    }else{
      stringdd = dd.toString();
    }
    if(mm < 10){
      stringmm = '0'+mm;
    }else{
      stringmm= mm.toString();
    }
    this.holidayForm.get('date')?.setValue(yyyy + "-" + stringmm + "-" + stringdd)
    this.holidayForm.get('description')?.setValue(this.dataFromParent.description)
  }
  saveButtonClicked(){
    this.dialogRef.close(this.holidayForm.getRawValue())
  }
  closeButtonClicked(){
    this.dialogRef.close()
  }
}
