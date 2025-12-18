import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StandardVerbiageService } from '../service/standard-verbiage.service';



@Component({
  selector: 'app-standrad-verbiage-details',
  templateUrl: './standrad-verbiage-details.component.html',
  styleUrls: ['./standrad-verbiage-details.component.scss']
})
export class StandradVerbiageDetailsComponent {
  @Input() selectedRow:any;
  _id:string='';



  constructor(private builder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private standardVerbiageService:StandardVerbiageService,
    private snackBar:MatSnackBar
    ){}


    ngOnInit():void {
      const routeId = this.activatedRoute.snapshot.paramMap.get('_id');
      if(routeId){
        this._id = routeId;

        this.standardVerbiageService.findOne(this._id).subscribe(
          response =>{
            console.log('findOne response:', response);
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

  standradVerbiageDetailsForm = this.builder.group({
    comment:this.builder.control('',Validators.required),
     
  })

  

  saveButtonClicked(){
    if(this._id !=''){
      const formData = this.standradVerbiageDetailsForm.value;
      this.standardVerbiageService.findOneAndUpdate(this._id,formData).subscribe(
        response =>{
              console.log('Data Updated successfully:', response);
        },
        error =>{
          console.log('Error Updating data:',error);
        }
      );
    }
    else{

      console.log(this.standradVerbiageDetailsForm.value);
      if(this.standradVerbiageDetailsForm.valid){
        const formData = this.standradVerbiageDetailsForm.value;
        this.standardVerbiageService.create(formData).subscribe(
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

cancelButtonClicked() {

  this.router.navigate(['/home/masters/standardverbiagelist']);
  }

  private populateForm(data:any){
    this.standradVerbiageDetailsForm.patchValue(data);
  }

}
