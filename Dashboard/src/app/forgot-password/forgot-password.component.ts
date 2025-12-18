import { Component, ElementRef, ViewChild,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild('inputs') inputs!: ElementRef;
  @ViewChild('button') button!: any;
  forgotPasswordForm!:FormGroup
  
  constructor(
    public dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private fb:FormBuilder
  ) { 
    this.forgotPasswordForm = new FormGroup({
      emailId:new FormControl('',[Validators.required,Validators.email]),
      
    })
  }

  getOtpErrorMessage() {
    const passwordControl = this.forgotPasswordForm.get('emailId');

    if (passwordControl?.hasError('required')) {
      return 'Email is required';
    }

    return '';
  }

  submit(){
    const passwordValue = this.forgotPasswordForm.get('emailId')?.value
    console.log('Email Id Value:', passwordValue);
    this.dialogRef.close({emailId: passwordValue});
  }




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
}
