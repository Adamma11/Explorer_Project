import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../service/university.service';
import { PinService } from '../service/pin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pin-details',
  templateUrl: './pin-details.component.html',
  styleUrls: ['./pin-details.component.scss']
})
export class PinDetailsComponent {
  @Input() selectedRow:any;
  _id:string='';
  countrylist=['India','USA','Singapore']
  pinCodeDisabled: boolean =false;

  constructor(private builder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private pinService:PinService,
    private snackBar:MatSnackBar,
    private location: Location, 

    ){}


    ngOnInit():void {
      const routeId = this.activatedRoute.snapshot.paramMap.get('_id');
   

      // console.log("routeId",this.activatedRoute.snapshot.paramMap.get('_id'));
      
      if(routeId){
        this._id = routeId;

        this.pinService.findOnePin(this._id).subscribe(
          response =>{
            console.log('findOnePin response:', response);
            this.populateForm(response);
          },
          error =>{
            console.log(error);
          }
        );
      } else{
        console.log('No route ID found');
        this._id = '';
      

      }
    }

  pinDetailsForm = this.builder.group({
    areasCovered:this.builder.control('',Validators.required),
    pinCode:this.builder.control('',Validators.required),
    district:this.builder.control('',Validators.required),
    state:this.builder.control('',Validators.required),
    country:this.builder.control('',Validators.required),
   
  })

  

  saveButtonClicked(){
    if(this._id !=''){
      const formData = this.pinDetailsForm.value;
      this.pinService.updatePin(this._id,formData).subscribe(
        response =>{
          this.showMessage("Data Updated successfully");

              console.log('Data Updated successfully:', response);
        },
        error =>{
          this.showError("Error Updating data");

          console.log('Error Updating data:',error);
        }
      );
    }
    else{

      console.log(this.pinDetailsForm.value);
      if(this.pinDetailsForm.valid){
        const formData = this.pinDetailsForm.value;
        this.pinService.createPin(formData).subscribe(
          response =>{
            console.log('Data saved successfully:',response);
          },
          error =>{
            console.log('Error saving data:', error);
          }
        );
      } else{
        console.log('Form is not valide');
      }

    }
  }

  showError(msg:any) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showMessage(msg:any) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
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
    this.pinDetailsForm.patchValue(data);
  }


}
