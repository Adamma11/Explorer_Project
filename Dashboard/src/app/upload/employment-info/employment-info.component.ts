import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExcelUploadService } from '../service/excel-upload.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-employment-info',
  templateUrl: './employment-info.component.html',
  styleUrls: ['./employment-info.component.scss']
})
export class EmploymentInfoComponent {
  dataFromParent:any
  response: any; // Adjust this type according to your needs
  displayedColumns: string[] = ['serialNumber','nameOfEmployer', 'nameofrespondRhs','contactofrespondRhs', 'dateOfVerification' ];
  dataSource = new MatTableDataSource<any>([]); 
  constructor(    
    private dialogRef: MatDialogRef<EmploymentInfoComponent>,
    // private snackBar:MatSnackBar,
    private excelUploadService : ExcelUploadService,
    @Inject(MAT_DIALOG_DATA) public data : any) {  this.dataFromParent = data}

    @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
  ngOnInit(): void {
    // const employername = this.dataFromParent.employername;
    const employername = encodeURIComponent(this.dataFromParent.employername); 
    const compName =  encodeURIComponent(this.dataFromParent.compName);
    const institutename  =  encodeURIComponent(this.dataFromParent.institutename);   
      const data = {
    employername,
    compName,
    institutename
  };
    console.log("datafrompa",data)
    this.excelUploadService.getEmploymentInfo(data).subscribe(
      (response:any) => {
        console.log('Response:', response);
        this.dataSource.data =response.employees

       this.response = response
       this.dataSource.sort = this.sort;
      },
      (error:any) => {
        console.error('Error fetching employment info:', error);
        // Handle error as needed
      }
    );
  }
  cancelButtonClicked(): void {
    this.dialogRef.close(); 
  }
}

