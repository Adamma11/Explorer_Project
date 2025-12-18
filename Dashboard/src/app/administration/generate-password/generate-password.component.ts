import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserPasswordService } from 'src/app/service/user-password.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss']
})
export class GeneratePasswordComponent {
  dataSource=new MatTableDataSource<any>();
  displayedColumns=['serialNumber','userId','name','selected'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private location:Location,
    private userService:UserService,
    private userPasswordService:UserPasswordService,
    private snackBar:MatSnackBar
  ) { 
  }

  ngOnInit(): void {
    this.readAllusers();
  }
  readAllusers():void{
    this.userService.findAllUsers().subscribe({
      next: (response) => {
        const users = response.map((item) => ({
          _id: item._id,
          userId: item.userId,
          name: item.name,
          selected: false,
        }));
    
        this.dataSource.data.push(...users);
        this.dataSource._updateChangeSubscription();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error(error);
        this.showError("Error reading users");
      }
    });
  }
  backButtonClicked(){
    this.location.back();
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
  generatePasswordButtonClicked(){
    this.dataSource.data.forEach(item=>{
      if(item.selected){
        let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');        
        let  passwordData = ({
          user:item._id,
          password:randPassword,
          userId:item.userId,
          name:item.name
        })

        this.userPasswordService.createPassword(passwordData).subscribe({
          next:(response) => {
            this.showMessage("Password generated successfully for user " + item.name)
          },
          error:(error) => {
            this.showError("Error generating password");
          }
        })
      }
    })    
  }
  showMessage(msg:string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  

}
