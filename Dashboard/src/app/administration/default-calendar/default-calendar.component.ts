import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { HolidayDialogComponent } from '../holiday-dialog/holiday-dialog.component';
import { DefaultCalendarService } from '../service/default-calendar.service';

@Component({
  selector: 'app-default-calendar',
  templateUrl: './default-calendar.component.html',
  styleUrls: ['./default-calendar.component.scss']
})
export class DefaultCalendarComponent {
  selectedYear!:number
  displayedColumns:string[] = ['date','description','edit','delete'];
  dataSource = new  MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;      
  
  constructor(
    private dialog:MatDialog,
    private deleteDialog:MatDialog,
    private defaultCalendarService:DefaultCalendarService,
    private location:Location,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
  addButtonClicked(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    const dialogRef = this.dialog.open(HolidayDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data != null){
          this.defaultCalendarService.create(data).subscribe({
            next:(response) => {
              this.dataSource.data.push(response);
              this.dataSource._updateChangeSubscription();
              this.showMessage("Holiday Saved")
            },
            error:(error) => {
              this.showError("Error saving holiday");
            }
          }
            
          )
        }
        
      }) 
  }
  deleteButtonClicked(item:any){
    let deleteDialogRef = this.deleteDialog.open(DeleteConfirmationDialogComponent,{data:{message:'Are you Sure?'}});
    deleteDialogRef.afterClosed() .subscribe(
      data=>{
        if(data.event == 'confirmed'){
          this.defaultCalendarService.delete(item._id).subscribe({
            next:(response) => {
              this.showMessage("Holiday Deleted");
              this.dataSource.data.splice(this.dataSource.data.indexOf(item),1);
              this.dataSource._updateChangeSubscription();
            },
            error:(error) => {
              this.showError("Error deleting holiday");
            }
          }
            
          )
        }
      }
    )
  }
  editButtonClicked(item:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.data = {
      date:item.date,
      description:item.description
    }
    const dialogRef = this.dialog.open(HolidayDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data != null){
          this.defaultCalendarService.update(item._id,data).subscribe({
            next: (updatedIteResponse) => {
              this.defaultCalendarService.readAllForAnYear(this.selectedYear).subscribe({
                next: (response) => {
                  this.dataSource.data = response;
                  this.dataSource._updateChangeSubscription();
                  this.showMessage("Holiday Saved")
                },
                error: (error) => {
                  this.showError("Error updating holiday");
                }
              })
            },
            error: (error) => {
              this.showError("Error saving holiday");
            }
          })
        }   
      }) 
  }
  backButtonClicked(){
    this.location.back();
  }
  saveButtonClicked(){

  }
  yearChanged(event:any){
    this.defaultCalendarService.readAllForAnYear(this.selectedYear).subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:(error) => {
        this.showError("Error reading holidays for the selected year");
      }
    })
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }  
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }    
}
