import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-de-confirm-dialog',
  templateUrl: './de-confirm-dialog.component.html',
  styleUrls: ['./de-confirm-dialog.component.scss']
})
export class DeConfirmDialogComponent {
  constructor(
    public dialogRef:MatDialogRef<DeConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('data = ', this.data)
  }

  closeDialog(){
    this.dialogRef.close({event:'cancel'});
  }
  confirmSubmit(){
    this.dialogRef.close({event:'confirmed'});
  }

}
