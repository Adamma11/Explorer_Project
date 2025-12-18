import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonalDetails } from 'src/app/model/personal-details';
import { PersonalDetailsField } from 'src/app/model/personal-details-field';
import { PersonalDetailsService } from 'src/app/service/personal-details.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personal-details-config',
  templateUrl: './personal-details-config.component.html',
  styleUrls: ['./personal-details-config.component.scss']
})
export class PersonalDetailsConfigComponent {
  _id :string ='';
  personalDetailsForm = new FormGroup({
    displayName: new  FormControl('')
  });

  personalDetailsFields !:PersonalDetailsField[];
  constructor(
    private location:Location,
    private personalDetailsService:PersonalDetailsService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.personalDetailsService.find().subscribe({
      next:(response)=>{
        this.personalDetailsForm.get('displayName')?.setValue(response[0].displayName);
        this.personalDetailsFields = response[0].personalDetailsFields;
        this._id = response[0]._id??'';
      },
      error:error=>{
        console.log(error);
        this.showError("Error in getting personal details");
      }
    })
  }
  backButtonClicked(){
    this.location.back();
  }
  saveButtonClicked(){
    if(this.validatePersonalDetailsFields()){
      let personalDetails = new PersonalDetails();
      personalDetails.displayName = this.personalDetailsForm.get('displayName')?.value??'';
      personalDetails.personalDetailsFields = this.personalDetailsFields;
      if(this._id===''){
        this.create(personalDetails);
      }else{
        this.update(personalDetails)
      }
    }
  }
  create(personalDetails:PersonalDetails){
    this.personalDetailsService.create(personalDetails).subscribe({
      next:(response)=>{
        this.personalDetailsForm.get('displayName')?.setValue(response.displayName);
        this._id = response._id??'';
        this.showMessage('Personal Details Saved');
        this.location.back();
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error while saving personal details");
      }
    })
      
  }  
  update(personalDetails:PersonalDetails){
    this.personalDetailsService.update(this._id,personalDetails).subscribe({
      next:(response)=> {
        this.personalDetailsForm.get('displayName')?.setValue(response.displayName);
        this._id = response._id??'';
        this.showMessage('Personal Details Saved');
        this.location.back();
      },
      error:(error)=>{
        this.showError("Error Saving the Component");
      }
    })
  }  
  validatePersonalDetailsFields(){
    for(const element of this.personalDetailsFields){
      let personalDetailsField = element;
      if(personalDetailsField.name == ''){
        this.showError("Field name is mandatory");
        return false;
      }
      if(personalDetailsField.type == 'TEXT' ||
       personalDetailsField.type == 'NUMBER' ||
       personalDetailsField.type == 'TEXTAREA' ||
       personalDetailsField.type == 'EMAIL' ||
       personalDetailsField.type == 'TELEPHONE' ||
       personalDetailsField.type == 'URL'){
         if(personalDetailsField.size==null){
          this.showError("Size is required");
          return false;
         }
       }
       if(personalDetailsField.type == 'SELECT'){
         if(personalDetailsField.values ==null){
           this.showError("Value is required when the field type is select");
           return false;
         }
       }
    }    
    return true;    
  }
  addButtonClicked(){
    let personalDetailsField = new PersonalDetailsField();
    if(this.personalDetailsFields == null){
      this.personalDetailsFields = new Array<PersonalDetailsField>();
    }
    personalDetailsField.fieldNumber = this.personalDetailsFields.length + 1;
    this.personalDetailsFields.push(personalDetailsField);
  }
  deleteButtonClicked(personalDetailsField:PersonalDetailsField){
    this.personalDetailsFields.splice(this.personalDetailsFields.indexOf(personalDetailsField),1);
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }  
  drop(event: CdkDragDrop<PersonalDetailsField[]>) {
    moveItemInArray(this.personalDetailsFields, event.previousIndex, event.currentIndex);
    this.personalDetailsFields[event.currentIndex].fieldNumber = event.currentIndex + 1;
    this.personalDetailsFields[event.previousIndex].fieldNumber = event.previousIndex + 1;
  }
  
}
