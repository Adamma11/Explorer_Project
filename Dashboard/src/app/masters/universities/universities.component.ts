import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../service/university.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent {
  @Input() selectedRow:any;
  _id:string='';
  countrylist=['India','USA','Singapore']
  termlist=['10 days','12 days','15 days']
  constructor(private builder:FormBuilder,
    private router:Router,
    private universityService:UniversityService,
    private activatedRoute:ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location, 

    ){}


    ngOnInit():void {
      const routeId = this.activatedRoute.snapshot.paramMap.get('_id');
      if(routeId){
        this._id = routeId;

        this.universityService.findOneUniversity(this._id).subscribe(
          response =>{
            console.log('findOneUniversity response:', response);
            this.populateForm(response);
          },
          error =>{
            console.log(error);
          }
        );
      } else{
        console.log('No route ID found');
        this._id = '';
        this.universityDetailsForm.get('onlineVerificationPossible')?.setValue(false);
        this.universityDetailsForm.get('fakeUniversity')?.setValue(false);

      }
    }

  universityDetailsForm = this.builder.group({
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',([Validators.required,Validators.email])),
    phone:this.builder.control('',Validators.required),
    pinCode:this.builder.control('',Validators.required),
    district:this.builder.control('',Validators.required),
    state:this.builder.control('',Validators.required),
    country:this.builder.control('',Validators.required),
    address:this.builder.control('',Validators.required),
    digitizedRecordDate:this.builder.control(''),
    verificationFee:this.builder.control('',Validators.required),
    daysforverification:this.builder.control('',Validators.required),
    concernperson:this.builder.control('',Validators.required),
    designation:this.builder.control('',Validators.required),
    onlineVerificationPossible: this.builder.control(false),
    fakeUniversity: this.builder.control(false),
    modeofverification:this.builder.control('',Validators.required),
    institutestatus:this.builder.control('',Validators.required),
  })

  

  saveButtonClicked(){
    if(this._id !=''){
      const formData = this.universityDetailsForm.value;
      console.log("data",formData);
      this.universityService.updateUniversity(this._id, formData).subscribe(
        response => {
          console.log('Data Updated successfully:', response);
          this.showMessage("Data Updated successfully");
        },
        error => {
          console.log('Error Updating data:', error);
      
          // Extract error message if it exists, otherwise use a default message
          let errorMessage = "An unexpected error occurred. Please try again.";
          
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.message) {
            errorMessage = error.message; // General error message
          }
      
          this.showError("Error Updating data", errorMessage);
        }
      );
      
      
      // this.universityService.updateUniversity(this._id,formData).subscribe(
      //   response =>{
      //         console.log('Data Updated successfully:', response);
      //         this.showMessage("Data Updated successfully");
      //   },
      //   error =>{
      //     console.log('Error Updating data:',error);
      //     this.showError("Error Updating data",error.message);
      //   }
      // );
    }
    else{

      console.log(this.universityDetailsForm.value);
      if(this.universityDetailsForm.valid){
        const formData = this.universityDetailsForm.value;
        this.universityService.createUniversity(formData).subscribe(
          response =>{
            console.log('Data saved successfully:',response);
            this.showMessage("Data Updated successfully");
          },
          error => {
            console.log('Error Updating data:', error);
        
            // Extract error message if it exists, otherwise use a default message
            let errorMessage = "An unexpected error occurred. Please try again.";
            
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.message) {
              errorMessage = error.message; // General error message
            }
        
            this.showError("Error Updating data", errorMessage);
          }
        );
      } else{
        console.log('Form is not valide');
        this.showError('Form is not valid', "Please check the form fields."); // Provide default error message
      }

    }
  }

cancelButtonClicked(e:any) {
  e.preventDefault();
  // this.router.navigate(['/masters/universities']);
  this.goBack()
  }
  goBack() {
    this.location.back();
  }
  private populateForm(data:any){
    this.universityDetailsForm.patchValue(data);
  }


  showError(msg: any, error: any) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showMessage(msg:any) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}
