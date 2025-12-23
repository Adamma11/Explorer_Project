import { Component, ElementRef, Inject, ViewChild,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AuthService } from '../auth.service';
import { AuthNewService } from '../auth-new.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-otp-validation-dialog',
  templateUrl: './otp-validation-dialog.component.html',
  styleUrls: ['./otp-validation-dialog.component.scss']
})
export class OtpValidationDialogComponent {

  userId: any;
  @ViewChild('inputs') inputs!: ElementRef;
  @ViewChild('button') button!: any;
  otpValidationForm!:FormGroup
  dataFromParent:any
  constructor(
    public dialogRef:MatDialogRef<OtpValidationDialogComponent>,
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private authService:LoginService,
    private router:Router,
    private dialog:MatDialog,
    private loginService: AuthService,
    private loginNewService: AuthNewService,
    private snackBar:MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { 
    this.dataFromParent = data
    this.otpValidationForm = this.fb.group({
      otp: new FormControl('',Validators.required)
      // otp: new FormControl('',Validators.required)
      // digit1 : [''],
      // digit2: [''],
      // digit3: [''],
      // digit4:[''],
      // digit5:[''],
      // digit6:['']
    })
  }

  ngOnInit(): void {
    this.userId = this.dataFromParent.userId
    console.log("user Id",this.userId );
    
  }

  getOtpErrorMessage() {
    const otpControl = this.otpValidationForm.get('otp');

    if (otpControl?.hasError('required')) {
      return 'OTP is required';
    }

    return '';
  }

  submit(){
    // console.log('otp === ', this.otpValidationForm.get('otp')?.value);
    const otpValue = this.otpValidationForm.get('otp')?.value
    // this.otpValidationForm.get('digit1')?.value +
    // this.otpValidationForm.get('digit2')?.value +
    // this.otpValidationForm.get('digit3')?.value +
    // this.otpValidationForm.get('digit4')?.value +
    // this.otpValidationForm.get('digit5')?.value +
    // this.otpValidationForm.get('digit6')?.value;
  
    console.log('OTP Value:', otpValue);


    this.authService.validateOtp({ userId: this.userId, otp: otpValue })
    .subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userId', this.userId);
          localStorage.setItem('screens', response.screens);
          this.loginService.loggedInBehaviorSubject.next(true);
          this.loginNewService.logIn();
          this.loginService.changeToLoggedIn();
          this.loginService.getLoggedInValue().subscribe((loggedIn: boolean) => {
            if (loggedIn) {
              this.router.navigate(['home/dashboard']).then(() => {
                window.location.reload();
                this.dialogRef.close();

              });
            }
          });
        }
        else {
          console.log('otp is wrong');
          this.showError('Invalid OTP ');
        }
      },
      (error) => {
        console.log(error.error.message);
        this.showError(error.error.message);
      }
    )


    
    // let otpValue = this.otpValidationForm.get('otp')?.value
    // this.dialogRef.close({otp: otpValue});
  }


  // onKeyUp(event: any, currentIndex: number) {
  //   const inputs = this.inputs.nativeElement.children;
  //   const currentInput = inputs[currentIndex];
  //   const nextInput = inputs[currentIndex + 1];
  //   const prevInput = inputs[currentIndex - 1];
  //   const button = this.button.nativeElement;

  //   if (currentInput.value.length > 1) {
  //     currentInput.value = '';
  //     return;
  //   }

  //   if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== '') {
  //     nextInput.removeAttribute('disabled');
  //     nextInput.focus();
  //   }

  //   if (event.key === 'Backspace') {
  //     inputs.forEach((input:any, index:any) => {
  //       if (currentIndex <= index && prevInput) {
  //         input.setAttribute('disabled', 'true');
  //         input.value = '';
  //         prevInput.focus();
  //       }
  //     });
  //   }

  //   if (!inputs[3].hasAttribute('disabled') && inputs[3].value !== '') {
  //     button.classList.add('active');
  //     return;
  //   }

  //   button.classList.remove('active');
  // }

  onKeyUp(event: any, currentIndex: number) {
    const inputs = this.inputs.nativeElement.children;
    const currentInput = inputs[currentIndex];
    const nextInput = inputs[currentIndex + 1];
    const prevInput = inputs[currentIndex - 1];
  
    if (currentInput.value.length > 1) {
      currentInput.value = currentInput.value.charAt(0);
      return;
    }
  
    if (event.key === 'Backspace' && currentIndex > 0) {
      prevInput.focus();
    } else if (event.key !== 'Backspace' && nextInput && currentInput.value !== '') {
      nextInput.focus();
    }
  
    this.updateButtonState(inputs);
  }
  
  private updateButtonState(inputs: any[]) {
    const filledInputs = inputs.filter(input => input.value !== '');
    this.button.classList.toggle('active', filledInputs.length === inputs.length);
  }

  showError(msg: string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}
