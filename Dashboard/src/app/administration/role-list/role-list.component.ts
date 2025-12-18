import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/model/role';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  dataSource = new MatTableDataSource();
  displayedColumns = ['serialNumber','name','edit','delete'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;    
  constructor(
    private location:Location,
    private router:Router,
    private roleService:RoleService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles():void{
    this.roleService.findAllRoles().subscribe({
      next:(response)=>{
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(error)=>{
        console.log(error);
        this.showError('Error in fetching roles list');
        
      }
    })
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  addButtonClicked(){
    this.router.navigate(['home/roledetails']);
  }
  backButtonClicked(){
    this.location.back();
  }
  editButtonClicked(role:Role){
    this.router.navigate([`home/roledetails/${role._id}`]);
  }
  deleteButtonClicked(role:Role){
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete the Role ${role.name} ?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
      if(result.event=='confirmed'){
        this.deleteRole(role);
      }
    })     
  }
  deleteRole(role:Role){
    this.roleService.deleteRole(role._id).subscribe({
      next:(response)=>{
        this.showMessage("Role deleted");
      },
      error:(error)=>{
        this.showError(error.error.message);
      }
    })
  }
  showError(msg:string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  
}
