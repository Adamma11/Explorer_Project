import {Component, Input} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BranchService } from '../service/branch.service';
import { PinService } from '../service/pin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

export interface PeriodicElement {
  from: string;
  position: number;
  to: number;
  // symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})


export class BranchDetailsComponent {
  @Input() selectedRow:any;
  _id:string='';
  countrylist=['India','USA','Singapore']
  includePinDisplayedColumns: string[] = ['position', 'from', 'to'];
  excludePinDisplayedColumns = ['position', 'from', 'to'];
  includedPinDataSource= new MatTableDataSource<PeriodicElement>();
  excludedPinDataSource= new MatTableDataSource<PeriodicElement>()
  i: number = 0;
  nameDisabled!: boolean;

  branchNameForm = new FormGroup({

    name :new FormControl('',[Validators.required])
  })

  branchDetailsForm = new FormGroup({
    address: new FormControl('',[Validators.required]),
    pinCode:new FormControl('',[Validators.required]),
    district: new  FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required])
  })
  
  constructor(
    private router:Router,
    private branchService:BranchService,
    private pinService:PinService,
    private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar,
    private location:Location
  ){
   
  }

  ngOnInit(){
    if(this.activatedRoute.snapshot.paramMap.get('_id')) {
      this._id = this.activatedRoute.snapshot.paramMap.get('_id')!;
      this.branchService.findOneBranch(this._id).subscribe(
        (response) =>{
          this.branchNameForm.get('name')?.setValue(response.name);
          this.branchDetailsForm.get('address')?.setValue(response.address);
          this.branchDetailsForm.get('pinCode')?.setValue(response.pinCode);
          this.branchDetailsForm.get('district')?.setValue(response.district);
          this.branchDetailsForm.get('state')?.setValue(response.state);
          this.branchDetailsForm.get('country')?.setValue(response.country);
          this.includedPinDataSource.data = response.includedPinRanges;
          this.excludedPinDataSource.data = response.excludedPinRanges;
        },
        (error) =>{

        }
      )
    }
    else{
      this.nameDisabled = false;
    }

  }

  includeAddClicked() {
    const newData: PeriodicElement = {
      from: 'defaultFrom',
      position: this.i++,
      to: 0,
    };
  
    this.includedPinDataSource.data.push(newData);
    this.includedPinDataSource._updateChangeSubscription();
  }


  excludeAddClicked() {
    const newData: PeriodicElement = {
      from: 'defaultFrom', 
      position: this.i++,
      to: 0,
    };
  
    this.excludedPinDataSource.data.push(newData);
    this.excludedPinDataSource._updateChangeSubscription();
  }
  
  deleteIncludePinRange(index: number) {
    this.includedPinDataSource.data.splice(index, 1);
    this.includedPinDataSource._updateChangeSubscription();
  }
  
  deleteExcludePinRange(index: number) {
    this.excludedPinDataSource.data.splice(index, 1);
    this.excludedPinDataSource._updateChangeSubscription();
  }
  


  cancelButtonClicked() {

    this.router.navigate(['/home/masters/branchlist']);
    }

  saveButtonClicked() {
      const branchNameFormData = this.branchNameForm.value;
  const branchDetailsFormData = this.branchDetailsForm.value;
  console.log('Included Pin Ranges:', this.includedPinDataSource.data);
  console.log('Excluded Pin Ranges:', this.excludedPinDataSource.data);

      if (this._id !== '') {
        this.branchService.updateBranch(this._id,{
          ...branchNameFormData,
          ...branchDetailsFormData,
          includedPinRanges: this.includedPinDataSource.data,
          excludedPinRanges: this.excludedPinDataSource.data,
        }).subscribe(
          (response) => {
            this.branchNameForm.get('name')?.setValue(response.name);
            this.branchDetailsForm.get('address')?.setValue(response.address);
            this.branchDetailsForm.get('pinCode')?.setValue(response.pinCode);
            this.branchDetailsForm.get('district')?.setValue(response.district);
            this.branchDetailsForm.get('state')?.setValue(response.state);
            this.branchDetailsForm.get('country')?.setValue(response.country);
            this.includedPinDataSource.data = response.includedPinRanges;
            this.excludedPinDataSource.data = response.excludedPinRanges;
            console.log('Included Pin Ranges:',response.includedPinRanges);
            console.log('Excluded Pin Ranges:',response.excludedPinRanges);

            this.openSnackBar('Branch Saved', 'Info');
            this.location.back();
          },
          (error) => {
            this.openSnackBar(error.error.message, 'Error');
          }
        );
      } else {
        this.branchService.createBranch({
          ...branchNameFormData,
          ...branchDetailsFormData,
          includedPinRanges: this.includedPinDataSource.data,
          excludedPinRanges: this.excludedPinDataSource.data,
        }).subscribe(
          (response) => {
            this.branchNameForm.get('name')?.setValue(response.name);
            this.branchDetailsForm.get('address')?.setValue(response.address);
            this.branchDetailsForm.get('pinCode')?.setValue(response.pinCode);
            this.branchDetailsForm.get('district')?.setValue(response.district);
            this.branchDetailsForm.get('state')?.setValue(response.state);
            this.branchDetailsForm.get('country')?.setValue(response.country);
            this.includedPinDataSource.data = response.includedPinRanges;
            this.excludedPinDataSource.data = response.excludedPinRanges;
            this.openSnackBar('Branch Saved', 'Info');
             this.location.back();
          },
          (error) => {
            this.openSnackBar(`Error Saving Branch ${error}`, 'Error');
          }
        );
      }
    }


    validatePin() {
      const pinCodeValue = this.branchDetailsForm.get('pinCode')!.value;
    
      if (pinCodeValue !== null) {
        this.pinService.findOnePin(pinCodeValue).subscribe(
          response => {
            if (response) {
              this.branchDetailsForm.get('district')?.setValue(response.district);
              this.branchDetailsForm.get('state')?.setValue(response.state);
              this.branchDetailsForm.get('country')?.setValue(response.country);
            } else {
              this.branchDetailsForm.get('district')?.setValue('');
              this.branchDetailsForm.get('state')?.setValue('');
              this.branchDetailsForm.get('country')?.setValue('');
            }
          },
          error => {
            this.branchDetailsForm.get('district')?.setValue('');
            this.branchDetailsForm.get('state')?.setValue('');
            this.branchDetailsForm.get('country')?.setValue('');
          }
        );
      } else {
        // Handle the case when pinCodeValue is null, if needed.
      }
    }
    
   



    openSnackBar(msg: string, msgType: string) {
      this.snackBar.open(msg, msgType, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }


  
}


