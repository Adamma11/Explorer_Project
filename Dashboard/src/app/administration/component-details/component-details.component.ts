import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComponentService } from 'src/app/service/component.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentFieldService } from 'src/app/service/component-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationComponent } from 'src/app/model/component';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent {
  @Input() componentId!: string;
  @Output() componentIdReseted: EventEmitter<string> =   new EventEmitter();

  components!:any[];
  _id:string='';
  @ViewChild('inputRef') inputRef: any;
  formValid = false;
  componentDetailsForm = new FormGroup({
    displayName: new  FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    fileUploadRequired : new FormControl(false),
    allowCopyingFrom : new FormControl(''),
    // type : new FormControl('',[Validators.required])
  });

  currentCompFields!:any[];

  displayedColumns:string[] =['name','type','value','size','label','lhsRhs','mandatory','conditionField','condition','conditionValue','displayField','delete']
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    public dialog :MatDialog,
    private location:Location,
    private componentService:ComponentService,
    private activatedRoute:ActivatedRoute,
    private componentFieldService:ComponentFieldService,
    private snackBar:MatSnackBar) { }
  ngOnChanges(changes: SimpleChanges): void {

    for(const propName in changes){
      if(propName==='componentId'){
        const change=changes[propName];
        if(change.currentValue && typeof change.currentValue ==='string'){
          this._id = change.currentValue;
          this.getComponentDetails();
        }
      }     
    }
    
  }

  ngOnInit(): void {
    this.currentCompFields = new Array();
    this._id = this.componentId??'';
    this.getComponentDetails();

    this.componentService.findAllComponents().subscribe(
      response=>{
        this.components = response;
      }
    )
  }
  getComponentDetails(){
    this.componentService.findAComponent(this._id).subscribe({
      next:(response) => {
        this.componentDetailsForm.get('displayName')?.setValue(response.displayName)
        this.componentDetailsForm.get('name')?.setValue(response.name);
        this.componentDetailsForm.get('fileUploadRequired')?.setValue(response.fileUploadRequired);
        this.componentDetailsForm.get('allowCopyingFrom')?.setValue(response.allowCopyingFrom);
        // this.componentDetailsForm.get('type')?.setValue(response.type);

        this.currentCompFields = response.componentFields;
        this.dataSource.data = response.componentFields;
      },
      error:(error) => {
        console.log(error);
      }
    })
  }

  addButtonClicked(){
    let componentField = ({
      _id:null,
      component:'',    
      name:'',
      type:'',
      values:'',
      size:0,
      mandatory:'',
      label:'',
      fieldNumber:0,
      conditionField:'',
      condition:'',
      conditionValue:'',    
      displayField:false
    })
    this.dataSource.data.push(componentField);
    this.dataSource._updateChangeSubscription();
  }
  deleteButtonClicked(componentField:any){
    this.currentCompFields.splice(this.currentCompFields.indexOf(componentField),1);
    this.dataSource.data.splice(this.dataSource.data.indexOf(componentField),1);
    this.dataSource._updateChangeSubscription();
  }
  saveButtonClicked(){
    if(this.validateComponentFields()){
      let component:ApplicationComponent = {} as ApplicationComponent;
      component.displayName = this.componentDetailsForm.get('displayName')?.value??'';
      component.name=this.componentDetailsForm.get('name')?.value??'';
      component.fileUploadRequired = this.componentDetailsForm.get('fileUploadRequired')?.value??false;
      // component.allowCopyingFrom = this.componentDetailsForm.get('allowCopyingFrom')?.value??'';
      component.type = this.componentDetailsForm.get('type')?.value??'';
      component.componentFields = this.dataSource.data;
      if(this._id===''){
        this.createComponent(component);
      }else{
        this.updateComponent(component)
      }
    }

  }
  createComponent(component:ApplicationComponent){
    this.componentService.createComponent(component).subscribe({
      next:(response)=>{
        this.componentDetailsForm.get('name')?.setValue(response.name);
        this.componentDetailsForm.get('fileUploadRequired')?.setValue(response.fileUploadRequired);
        this._id = response._id;
        this.showMessage("Component Saved");
        this.saveComponentFields();
      },
      error: error=>{
        this.showError("Error Saving the Component");
      }
    })
  }

  validateComponentFields(){
    for(const element of this.dataSource.data){
      let componentField = element;
      if(componentField.name == ''){
        this.showError("Field name is mandatory");
        return false;
      }
      if(componentField.type == 'TEXT' ||
       componentField.type == 'NUMBER' ||
       componentField.type == 'TEXTAREA' ||
       componentField.type == 'EMAIL' ||
       componentField.type == 'TELEPHONE' ||
       componentField.type == 'URL'){
         if(componentField.size==null){
          this.showError("Size is required");
          return false;
         }
       }
       if(componentField.type == 'SELECT'){
         if(componentField.values ==null){
           this.showError("Value is required when the field type is select");
           return false;
         }
       }
    }    
    return true;
  }
  updateComponent(component:ApplicationComponent){
    this.componentService.updateComponent(this._id,component).subscribe({
      next:(response)=>{
        this.componentDetailsForm.get('name')?.setValue(response.name);
        this.componentDetailsForm.get('fileUploadRequired')?.setValue(response.fileUploadRequired);
        this._id = response._id;
        this.showMessage("Component Saved");
        this.deleteComponentFields();
        this.location.back();        
      },
      error:(error) => {
        console.log(error);   
        this.showError("Error Saving the Component");
      }
    })
  }
  deleteComponentFields(){
    this.componentFieldService.deleteAllFieldsForAComponent(this._id).subscribe({
      next:(response) => {
        this.saveComponentFields();        
      },
      error:error=>{
        console.log(error);
        this.showError("Error Deleting existing fields");
      }
    })
  }
  saveComponentFields(){
    for(const element of this.dataSource.data){
      let componentField = element;
      componentField.component = this._id;
    }
    let postData = {
      "componentFields" :this.dataSource.data
    }
    this.componentFieldService.createAllFieldsForAComponent(this._id,postData).subscribe({
      next:(response) => {
        this.dataSource.data = response;
        this.showMessage("Component Saved");
      },
      error:(error) => {
        console.log(error);
        this.showError("Error Saving the Component");
      }
    })
  }
  backButtonClicked(){
    if(!this.componentId){
      console.log("inside if");
      
      this.location.back();
    }else{
      console.log("inside else");
      
      this.componentId='';
      this.componentIdReseted.emit(this.componentId);

    }
  }
  showError(msg:string){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  omitSpecialChar(event:KeyboardEvent){   
    const k = event.key.charCodeAt(0);
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8  || (k >= 48 && k <= 57)); 
  }

  dropTable(event:CdkDragDrop<any>){
    moveItemInArray(this.dataSource.data,event.previousIndex,event.currentIndex);
    this.dataSource.data[event.currentIndex]["fieldNumber"] = event.currentIndex + 1
    this.dataSource.data[event.previousIndex]["fieldNumber"] = event.previousIndex + 1
    this.dataSource._updateChangeSubscription();
  
  }

  setName(event:any){
    this.componentDetailsForm.get('name')?.setValue((event.target as HTMLInputElement).value.toLowerCase())
  }
}
