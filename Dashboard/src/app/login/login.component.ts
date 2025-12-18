import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OtpValidationDialogComponent } from '../otp-validation-dialog/otp-validation-dialog.component';
import { AuthService } from '../auth.service';
import { AuthNewService } from '../auth-new.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  message! :string
  constructor(
    private authService:LoginService,
    private router:Router,
    private dialog:MatDialog,
    private loginService: AuthService,
    private loginNewService: AuthNewService,
    private snackBar:MatSnackBar


  ){}


  loginForm = new FormGroup({
    userId:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  password: string = '';
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // loginProcess(){
  //   if(this.loginForm.valid){
  //     this.authService.validateUser(this.loginForm.value).subscribe(
  //       response => {
  //         if (response.success) {
  //           console.log(response);
  //           this.router.navigate([`otpvalidation/${this.loginForm.get('userId')?.value}`]);
  //         } else {
  //           alert("User Id not found");
  //         }
  //       },
  //       error => {
  //         console.error('Error during login:', error);
  //       }
  //     );
  //   }
  // }

  loginProcess() {
    if (this.loginForm.valid) {
      this.authService.validateUser(this.loginForm.value).subscribe(
        response => {
          if (response.success) {
            const userId: any = this.loginForm.get('userId')?.value
            const OTPValidationDialog = new MatDialogConfig();
            OTPValidationDialog.disableClose = true;
            OTPValidationDialog.autoFocus = true;
            OTPValidationDialog.data = {
              userId :userId,
            }
            // OTPValidationDialog.height = '200px'
            // OTPValidationDialog.width = '330px'

            const dialogRef = this.dialog.open(OtpValidationDialogComponent, OTPValidationDialog);
            // dialogRef.afterClosed().subscribe(
            //   result => {
            //     this.authService.validateOtp({ userId: userId, otp: result.otp })
            //       .subscribe(
            //         (response) => {
            //           if (response) {
            //             localStorage.setItem('accessToken', response.accessToken);
            //             localStorage.setItem('userId', userId);
            //             localStorage.setItem('screens', response.screens);
            //             this.loginService.loggedInBehaviorSubject.next(true);
            //             this.loginNewService.logIn();
            //             this.loginService.changeToLoggedIn();
            //             this.loginService.getLoggedInValue().subscribe((loggedIn: boolean) => {
            //               if (loggedIn) {
            //                 this.router.navigate(['home/dashboard']).then(() => {
            //                   window.location.reload();
            //                 });
            //               }
            //             });
            //           }
            //           else {
            //             console.log('otp is wrong');
            //             // this.showError('User Id not found');
            //           }
            //         },
            //         (error) => {
            //           console.log(error.error.message);
            //           // this.showError(error.error.message);
            //         }
            //       )
            //   }
            // )
          } else {
            alert("User Id not found");
            // this.showError(error.error.message);
          }
        },
        error => {
          this.showError(error.error.message);
        }
      );
    }

  }



  forgotPasswordButtonClicked(){
    const forgotPasswordDialog = new MatDialogConfig();
    forgotPasswordDialog.disableClose = true;
    forgotPasswordDialog.autoFocus = true;
    const dialogRef = this.dialog.open(ForgotPasswordComponent ,forgotPasswordDialog );
    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("Result ===",result);
        
        if(result){
          this.loginNewService.forgotPassword(result.emailId).subscribe(
           ( response) =>{
            this.message = response.message;
            this.showMessage(response.message);
            this.router.navigate([`login`]);
           },
           (error) => {
            this.message = 'An error occurred: ' + error.message;
            this.showError(error.error.message);
          }
          )
        }
      }
    )
  }


  showMessage(msg:any){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  

}
