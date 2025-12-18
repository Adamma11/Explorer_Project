import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserPasswordService } from 'src/app/service/user-password.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  displayedColumns = ['serialNumber','userId','name','status','password','edit','delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;    
constructor(
  private location:Location,
  private router:Router,
  private userService:UserService,
  private snackBar:MatSnackBar,
  private dialog:MatDialog,
  private userPasswordService:UserPasswordService,

) { }

ngOnInit(): void {
}
ngAfterViewInit(){
  this.userService.findAllUsers().subscribe({
    next:response=>{
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    },
    error:error=>{
      console.log(error);
      this.showError("Error in reading users");
    }
  })
}
addButtonClicked(){
  this.router.navigate(['home/userdetails']);
}
editButtonClicked(user:User){
  this.router.navigate([`home/userdetails/${user._id}`]);
}
backButtonClicked(){
  this.location.back();
}
deleteButtonClicked(user:User){
  const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
    width:'400px',data:{message:`Are you sure that you want to delete the User ${user.name} ?`}
  });
  deleteDialog.afterClosed().subscribe(result=>{
    if(result.event=='confirmed'){
      this.deleteUser(user);
    }
  })    
}
deleteUser(user:User){
  if(user?._id){
    this.userService.deleteUser(user._id).subscribe({
      next:(response)=>{
        this.snackBar.open(`User ${user.name} deleted`,"Info",{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
        this.dataSource.data.splice(this.dataSource.data.indexOf(user),1);
        this.dataSource._updateChangeSubscription();
      },
      error:(err)=>{
        this.snackBar.open(`Error on server`,"Error",{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
      }
    })  
  }
  

}
applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
} 

generatePasswordButtonClicked(user:User){
  // this.dataSource.data.forEach(item=>{
  //   if(item.selected){
      let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');        
      let  passwordData = ({
        user:user._id,
        password:randPassword,
        userId:user.userId,
        name:user.name
      })

      this.userPasswordService.createPassword(passwordData).subscribe({
        next:(response) => {
          this.showMessage("Password generated successfully for user " + user.name)
        },
        error:(error) => {
          this.showError("Error generating password");
        }
      })
  //   }
  // })    
}
showMessage(msg:string){
  this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
showError(msg:string){
  this.snackBar.open(msg,'Error',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
}  


}
