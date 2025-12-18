import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalysisTypeService } from '../service/analysis-type.service';


@Component({
  selector: 'app-analysis-code-details',
  templateUrl: './analysis-code-details.component.html',
  styleUrls: ['./analysis-code-details.component.scss']
})
export class AnalysisCodeDetailsComponent {

  @Input() selectedRow:any;
  _id:string='';


  constructor(private builder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private analysisTypeService:AnalysisTypeService,
    private snackBar:MatSnackBar
    ){}


    ngOnInit():void {
      const routeId = this.activatedRoute.snapshot.paramMap.get('_id');
      if(routeId){
        this._id = routeId;

        this.analysisTypeService.read(this._id).subscribe(
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

  analysisTypeDetailsForm = this.builder.group({
    name:this.builder.control('',Validators.required),
   
   
  })

  

  saveButtonClicked(){
    if(this._id !=''){
      const formData = this.analysisTypeDetailsForm.value;
      this.analysisTypeService.update(this._id,formData).subscribe(
        response =>{
              console.log('Data Updated successfully:', response);
        },
        error =>{
          console.log('Error Updating data:',error);
        }
      );
    }
    else{

      console.log(this.analysisTypeDetailsForm.value);
      if(this.analysisTypeDetailsForm.valid){
        const formData = this.analysisTypeDetailsForm.value;
        this.analysisTypeService.create(formData).subscribe(
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

cancelButtonClicked(event:any) {
  event.preventDefault();
  this.router.navigate(['/home/masters/analysistypes']);
  }

  private populateForm(data:any){
    this.analysisTypeDetailsForm.patchValue(data);
  }

}
