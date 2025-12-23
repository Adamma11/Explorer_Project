import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthNewService } from '../auth-new.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss']
})
export class OtpValidationComponent {
  userId: string = '';
  
  loginForm = new FormGroup({
    otp: new FormControl('',Validators.required)
  });
 
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private authService:LoginService,
    private router:Router,
    private loginService: AuthService,
    private loginNewService: AuthNewService,
    private snackBar:MatSnackBar


  ){ }

  ngOnInit() : void{
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId')!;

  }

  submit(){
    this.authService.validateOtp({ userId: this.userId, otp: this.loginForm.get('otp')?.value})
    .subscribe(
      (response) =>{
        if(response){
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userId',this.userId);
          localStorage.setItem('screens',response.screens);
          this.loginService.loggedInBehaviorSubject.next(true);
          this.loginNewService.logIn();
          this.router.navigate(['home']);
        }
        else{
          this.showError('User Id not found');
        }
      },
      (error) =>{
        this.showError(error.error.message);
      }
    )
  }

  showError(msg:any) {
    this.snackBar.open(msg, 'Error', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  getOtpErrorMessage() {
    const otpControl = this.loginForm.get('otp');

    if (otpControl?.hasError('required')) {
      return 'OTP is required';
    }

    return '';
  }



  

}
