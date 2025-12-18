import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationComponent } from 'src/app/model/component';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/service/component.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentFieldService } from 'src/app/service/component-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent {
  componentId!:string;
    dataSource = new MatTableDataSource<ApplicationComponent>();
    displayedColumns = ['serialNumber','name','internalTat','details','delete'];
    @ViewChild(MatSort, {static: true}) sort!: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;    
  constructor(
    private location:Location,
    private router:Router,
    private componentService:ComponentService,
    private dialog:MatDialog,
    private componentFieldService:ComponentFieldService,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.componentService.findAllComponents().subscribe({
      next:(response) => {
        this.dataSource.data = response;
        console.log("response", response)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        console.log(error);
        this.showError("Error in reading components");
      }
    })
  }
  addButtonClicked(){
    this.router.navigate(['home/componentdetails']);
  }
  backButtonClicked(){
    this.location.back();
  }
  detailsButtonClicked(component:ApplicationComponent){
    console.log(component._id);
    
    // this.router.navigate([`home/componentdetails/${component._id}`])
    this.componentId = component._id;

  }
  deleteButtonClicked(component:ApplicationComponent){
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete the Component ${component.name} ?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
      if(result.event=='confirmed'){
        this.deleteComponent(component);
      }
    })    
  }
  deleteComponent(component:any){
    this.componentService.deleteComponent(component._id).subscribe({
      next:(response) => {
        this.deleteComponentFields(component);
      },
      error:(error)=>{
        this.showError("Error deleting Component");
      }
    })
  }
  deleteComponentFields(component:any){
    this.componentFieldService.deleteAllFieldsForAComponent(component._id).subscribe({
      next:(response) => {
        this.showMessage("Component Deleted");
        this.dataSource.data.splice(this.dataSource.data.indexOf(component),1);
        this.dataSource._updateChangeSubscription();
      },
      error:(error) => {
        console.log(error);
        this.showMessage("Error deleting Component Fields");
      }
    })
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  countChangedHandler(componentIdChanged: string) {

    this.componentId = componentIdChanged;
  }
}
