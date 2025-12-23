import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { ApiServicesDownloadsComponent } from '../api-services-downloads/api-services-downloads.component';
import { FormControl } from '@angular/forms';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import * as FileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instant-verify',
  templateUrl: './instant-verify.component.html',
  styleUrls: ['./instant-verify.component.scss']
})
export class InstantVerifyComponent {
  [x: string]: any;
  private map = new Map<string, string[]>([
    //updated 03jan24
    ['Aadhaar Verification', ['Aadhaar With OTP','Aadhaar Validation']],
    //end
    ['Voter ID verification', ['Voter Id']],
    ['Passport Verification', ['Passport Details']],
    ['PAN verification', ['PAN Lite', 'PAN Comprehensive', 'PAN Advanced']],
    ['Driving License verification', ['Driving License']],
    //update 29dec23
    ['Bank Verification', ['Bank Verification','UPI Verification']],
    //end    
    ['OCR/Image Data Extraction', ['Aadhaar', 'PAN', 'Voter ID', 'DL']],
    ['Face Match Verification', ['Face Verification']],
    [
      'Employment',
      ['Aadhaar To UAN', 'Mobile to UAN', 'Employment History', 'Pan To UAN'],
    ],
    ['Telecom Verification', ['Telecom Verification']],
    ['Email Check', ['Email Check']],
    ['Cibil Credit Check', ['Credit Score']],
    ['Equifax Credit Check', []],
  ]);
  
  requiredCases: string = '-1';
  checkvalue!: string;
  subcheckvalue!: string;
  caseIdFormControl = new FormControl();
  inputValue!: string;
  caseIdValue!: string;
  caseId!: string;
  selectedMainCheck: string = '-1';
  selectedSubCheck: string = '-1';
  selectedRadioValue: string = '';
  isDataLoading: boolean = false;
  aadhaarVerificationSelected: boolean = false;
  voterVerificationSelected: boolean = false;
  panVerificationSelected: boolean = false;
  drivingLicenseVerificationSelected: boolean = false;
  passportVerificationSelected: boolean = false;
  employmentVerificationSelected: boolean = false;
  emailVerificationSelected: boolean = false;
  telecomVerificationSelected: boolean = false;
  faceVerificationSelected: boolean = false;
  creditVerificationSelected: boolean = false;
  OCRVerificationSelected: boolean = false;
  bankVerificationSelected: boolean = false;
  
  otpValue: string = '';
  aadhaarValidateValue: string = '';
  aadharotpValue: string = '';
  aadharValue: string = '';
  telecomValue: string = '';
  voteridValue: string = '';
  panValue: string = '';
  drivingLicenseValue: string = '';
  dobValue: string = '';
  aadharuanValue: string = '';
  mobileuanValue: string = '';
  historyValue: string = '';
  panUanValue: string = '';
  emailidValue: string = '';
  passportValue: string = '';
  dobPassportValue: string = '';
  creditValue: string = '';
  selfieValue!:File;
  idvalue!:File;
  client_id!:string;
  ifscValue:string='';
  upiValue:string='';
  
  isDownloadEnabled: boolean = false;
  otpGenerated: boolean = false;
  
  responseData:any;
  responseDataArray:any;
  
  constructor(private dialog: MatDialog, private caseUpoadService: CaseUploadService,private snackBar:MatSnackBar) {}
  
  ngOnInit(): void {}
  

  getAllchecks(): string[] | undefined {
    return Array.from(this.map.keys());
  }
  onMainCheckSelected() {
    this.telecomVerificationSelected =
      this.selectedSubCheck === 'Telecom Verification';
      //updated 03jan24
      this.aadhaarVerificationSelected =
      this.selectedSubCheck === 'Aadhaar With OTP'||
      this.selectedSubCheck === 'Aadhaar Validation' ;
      //end
    this.voterVerificationSelected = this.selectedSubCheck === 'Voter Id';
    this.faceVerificationSelected =
      this.selectedSubCheck === 'Face Verification';
    this.creditVerificationSelected = this.selectedSubCheck === 'Credit Score';
    this.panVerificationSelected =
      this.selectedSubCheck === 'PAN Lite' ||
      this.selectedSubCheck === 'PAN Comprehensive' ||
      this.selectedSubCheck === 'PAN Advanced';
          //update 29dec23
    this.bankVerificationSelected =
      this.selectedSubCheck === 'Bank Verification' ||
      this.selectedSubCheck === 'UPI Verification';
      //end  
    this.drivingLicenseVerificationSelected =
      this.selectedSubCheck === 'Driving License';
    this.passportVerificationSelected =
      this.selectedSubCheck === 'Passport Details';
    this.employmentVerificationSelected =
      this.selectedSubCheck === 'Aadhaar To UAN' ||
      this.selectedSubCheck === 'Mobile to UAN' ||
      this.selectedSubCheck === 'Employment History' ||
      this.selectedSubCheck === 'Pan To UAN';
    this.emailVerificationSelected = this.selectedSubCheck === 'Email Check';
    this.OCRVerificationSelected =
      this.selectedSubCheck === 'Aadhaar' ||
      this.selectedSubCheck === 'PAN' ||
      this.selectedSubCheck === 'Voter ID' ||
      this.selectedSubCheck === 'DL';
    this.emailVerificationSelected = this.selectedSubCheck === 'Email Check';
  }

  getSubChecks(mainCheck: string): string[] | undefined {
    return this.map.get(mainCheck);
  }

  

  generateOtp() {
    if( this.selectedSubCheck === 'Telecom Verification'){
      this.caseUpoadService.generateOtp({ id_number: this.telecomValue }).subscribe(
        (response) => {
          console.log('response == ', response);
          
          this.client_id = response.data.client_id
                     //update 16jan2
                     this.showMessage("OTP Generated Successfully...")
                     //end
                     console.log('OTP generated successfully:', response.data.client_id);
        },
        (error) => {
                     //update 16jan24
                     this.showError("Error generating OTP")
                     console.error('Error generating OTP:', error);
        }
      );
    }else if(this.selectedSubCheck === 'Aadhaar With OTP'){
       //update 16jan24
       this.caseUpoadService.generateAadharOtp({ aadhaarValidate: this.aadharValue ,verificationType :"Aadhaar OTP" }).subscribe(
        (response) => {
          console.log('response == ', response);
          
          this.client_id = response.data.client_id
                     //update 16jan2
                     this.showMessage("OTP Generated Successfully...")
                     //end
                     console.log('OTP generated successfully:', response.data.client_id);
        },
        (error) => {
                     //update 16jan24
                     this.showError("Error generating OTP")
                     console.error('Error generating OTP:', error);
        }
      );
       this.showMessage("Generating OTP...")
      }
      this.showMessage("Generating OTP...")
      console.log('Generating OTP...', this.telecomValue);
      //end
  }

  fetchData(data:any){
    //update 16jan24
    this.isDataLoading = true;
    //end
let obj = {}
if(this.selectedSubCheck === 'Telecom Verification'){
 obj = {...data.value,verificationType: this.selectedSubCheck, client_id:this.client_id  }
}else if(this.selectedSubCheck === 'Aadhaar With OTP'){
 obj = {...data.value,verificationType: "Aadhaar With OTP", client_id:this.client_id  }
} else {
 obj = { ...data.value, verificationType: this.selectedSubCheck };
}  
console.log('fetchobj', obj);

this.caseUpoadService.externalApiFile(obj).subscribe(
 response => {
   console.log("response----------:", response);
   this.responseData = response.data;
 },
 error => {
            this.showError(`Error: ${error.error.message}`);
            console.error('Error:', error);
            this.isDataLoading = false;
   
 }
);
}
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}

  downloadData() {

    console.log("Download triggered:@@@@@@@@@",this.selectedSubCheck );
    console.log("Download triggered:###########",this.caseIdValue );
    const data = this.caseIdValue + "_" + this.selectedSubCheck
    this.caseUpoadService.downloadApiFile(data).subscribe(
      (response:HttpResponse<Blob>)=>{
      if (response.body) {
        FileSaver.saveAs(response.body, `${data}.pdf`);
        console.log('File downloaded successfully', response);
        this.showMessage("File downloaded successfully")
      } else {
        console.error('Error downloading file: Response body is null');
        this.showError("Error downloading file");
        // Handle the case where the response body is null
      }
    },
      // (response:HttpResponse<Blob>)=>{
      //   // Ensure that the response type is set to 'blob'
      //   console.log("Download triggered:@@@@@@@@@",response.body );
      //   FileSaver.saveAs(response.body, `${data}.pdf`);
      //   console.log('File downloaded successfully',response);
      // },
      error => {
         //update 16jan24
         this.showError("Error downloading file");
         console.error('Error downloading file:', error);
         // Handle error as needed
      }
    );
  }

  // Face VErify 
  
  onSelfieFileChange(event:any){
    const selectedFile = event.target.files[0];
    this.selfieValue = selectedFile;
  }

  onIdFileChange(event:any){
    const selectedFile = event.target.files[0];
    this.idvalue = selectedFile;
  }
  formData = new FormData()
  onSubmitFile(data:any){
        //update 16jan24
        this.isDataLoading = true;
        //end
    let caseId = {...data.value}
    this.formData = new FormData()
    this.formData.append('selfie', this.selfieValue)
    this.formData.append('id_card', this.idvalue)
    this.formData.append('caseIdValue',caseId.caseIdValue);
    this.formData.append('verificationType', this.selectedSubCheck);
    console.log(JSON.stringify(this.formData))
   
    this.formData.forEach((value,key) => {
      console.log("submifle----"+ key+" "+value)
    });
    this.responseDataArray = [];

    this.caseUpoadService.externalApiFile( this.formData).subscribe(
      response => {
        console.log("response----------:", response);
       
        if (response && response.data) {
          this.responseData = response.data;

          for (const key in this.responseData) {
            console.log("forkey", key)
            if (this.responseData.hasOwnProperty(key)) {
              const value = this.responseData[key];
              if (typeof value === 'object') {
                for (const nestedKey in value) {
                  if (value.hasOwnProperty(nestedKey)) {
                    const nestedValue = value[nestedKey];
                    // this.responseDataArray.push(`${nestedKey} : ${nestedValue}`);
                                        //update 16jan24
                                        setTimeout(() => {
                                          this.responseDataArray.push(
                                            `${nestedKey} : ${nestedValue}`
                                          );
                                          this.isDownloadEnabled = true;
                                          this.isDataLoading = false;
                                        }, 2000);
                                        //end
                  }
                }
              } else {
                                //update 16jan24
                                setTimeout(() => {
                                  this.responseDataArray.push(`${key} : ${value}`);
                                  this.isDataLoading = false;
                                }, 2000);
                                //end
                              
              }
            }
          }
          this.isDownloadEnabled = true;

        } else {
                     //update 16jan24
                     this.showError('Error Invalid response format');
                     console.error('Invalid response format:', response);
                     this.isDataLoading = false;
                     //end
       
        }
      },
      error => {
                 //update 16jan24
                 this.showError(`Error: ${error.error.message}`);
                 console.error('Error:', error);
                 this.isDataLoading = false;
       
      }
    );
  }
  // Face Verify
  onRadioChange() {
    this.selectedRadioValue;
    console.log("selectedRadioValue",this.selectedRadioValue);
    
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}
