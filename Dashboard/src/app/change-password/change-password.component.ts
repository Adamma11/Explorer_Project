import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPasswordService } from '../service/user-password.service';
import { UserService } from '../administration/service/user.service';
import { ValidateUserService } from '../service/validate-user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm!:FormGroup

  constructor(
    private userService:UserService,
    private userPasswordService:UserPasswordService,
    private validateUserService:ValidateUserService,
    private location:Location,
    private snackBar:MatSnackBar
  ) { 
    this.changePasswordForm= new FormGroup({
      currentPassword:new FormControl('',[Validators.required]),
      newPassword: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  backButtonClicked(){
    this.location.back();
  }
  saveButtonClicked(){
//    this.userPasswordService.

    if(this.changePasswordForm.get('newPassword')!.value == this.changePasswordForm.get('confirmPassword')!.value){
      let userPassword = ({
        password:this.changePasswordForm.get('currentPassword')!.value
      });
  
      this.validateUserService.validateUserForChangePassword(userPassword).subscribe(
        response=>{
          userPassword.password = this.changePasswordForm.get('newPassword')!.value;
          if(response.message){
            this.userPasswordService.createPasswordForchange(userPassword).subscribe(
              response=>{
                this.showMessage("Password changed successfully");
              },
              error=>{
                this.showError(error.error.message);
              }
            )          
          }
        },
        error=>{
          this.showError("You are not authorized to change the password");
        }
      )
    }else{
      this.showError("New Password and Confirm Password does not match");
    }

  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}

