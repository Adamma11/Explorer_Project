import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDetailsService } from 'src/app/administration/service/personal-details.service';
import { CaseDetailsForDataEntryService } from '../../service/case-details-for-data-entry.service';
import { PersonalDetailsDataService } from '../../service/personal-details-data.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-details-inputqc',
  templateUrl: './personal-details-inputqc.component.html',
  styleUrls: ['./personal-details-inputqc.component.scss']
})
export class PersonalDetailsInputqcComponent {
  datePipe!: DatePipe;
  _id: string = '';
  case_id!: string;
  displayName!: string;
  caseId!: string;
  clientId!: string;
  candidateName!: string;
  clientName!: string;
  subclientId!: string;
  subclientName!: string;
  personalDetailsFields!: any[];
  clientContractId!: string;
  clientContractPackageId!: string;
  packageName!: string;
  packageComponents!: any[];
  clientContractProfileId!: string;
  profileName!: string;
  profileComponents!: any[];
  personalDetailsDataEntryform!: FormGroup;
  inputqcForm!: FormGroup

  constructor(
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private personalDetailsService: PersonalDetailsService,
    private personalDetailsDataService: PersonalDetailsDataService,
    private caseDetailsDataEntryService: CaseDetailsForDataEntryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,

  ) {
    this.personalDetailsDataEntryform! = this.fb.group({
      dataEntryStatus:[''],
      insufficiencyComments:['']
    })
    
    this.inputqcForm = this.fb.group({
      status: ['', Validators.required],
      inputqcComments: ['']
    })
  }

  ngOnInit(): void {



    let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
        //// added code refresh///
    if (!verification) {
    this.router.navigate(['/home/inputqc/inputqccaselist']);
    return;
  }
    this.case_id = verification.case_id;
    this.caseId = verification.caseId;
    this.candidateName = verification.candidateName;
    this.clientId = verification.clientId;
    this.clientName = verification.clientName;
    this.subclientId = verification.subclientId;
    this.subclientName = verification.subclientName;
    this.clientContractId = verification.clientContractId;

    this.personalDetailsService.find().subscribe(
      response => {
        this.displayName = response[0].displayName;
        this.personalDetailsFields = response[0].personalDetailsFields;
        this.addFormControls();
        this.readPersonalDetails();
      },
      error => {
        console.log(error.error.message);
      }
    )

  }

  readPersonalDetails() {
    this.personalDetailsDataService.read(this.case_id).subscribe(
      response => {
        if (response) {
          this.personalDetailsFields.forEach(item => {
            if (item.type !== 'DATE') {
              this.personalDetailsDataEntryform.get(item.name)!.setValue(response[item.name]);
            } else {
              const dateValue = new Date(response[item.name]);
              const dd = dateValue.getDate().toString().padStart(2, '0');
              const mm = (dateValue.getMonth() + 1).toString().padStart(2, '0');
              const yyyy = dateValue.getFullYear();
  
              this.personalDetailsDataEntryform.get(item.name)!.setValue(`${yyyy}-${mm}-${dd}`);
            }
          });
  
          this.personalDetailsDataEntryform.get('dataEntryStatus')!.setValue(response.dataEntryStatus);
          this.personalDetailsDataEntryform.get('insufficiencyComments')!.setValue(response.insufficiencyComments);
        }
      },
      error => {
        console.log(error.error.message);
      }
    );
  }
  addFormControls() {
    this.personalDetailsFields.forEach(item => {
      this.personalDetailsDataEntryform.addControl(item.name, new FormControl(''));
      if (item.mandatory) {
        this.personalDetailsDataEntryform.get(item.name)!.setValidators(Validators.required);
      }
    })

  }

  async saveData() {
    const personalDetailsData = this.personalDetailsDataEntryform.getRawValue();
    const status = this.inputqcForm.get('status')!.value;
    const inputqcComments = this.inputqcForm.get('inputqcComments')!.value;
    try {
       this.personalDetailsDataService.updateInputqcStatus(this.case_id, {
        ...personalDetailsData,
        status,
        inputqcComments
      }).subscribe(response => {
        if (status === 'INPUTQC-REJECTED') {
          this.caseDetailsDataEntryService.setCaseInputqcStatus('INPUTQC-REJECTED');
        }
    
        console.log("Personal Details Data Saved",personalDetailsData);
    
        const currentComponent: any = {
          componentSerialNumber: 0,
          component: this.packageName
            ? this.packageComponents[0]?.component
            : this.profileName
              ? this.profileComponents[0]?.component
              : "",
        };
        this.showMessage("Data saved");
        console.log('Personal Details Saved',currentComponent);
        this.caseDetailsDataEntryService.setCurrentComponent(currentComponent);
        this.location.back();
      })
    } catch (error:any) {
      console.error(error.error.message);
    }
  }

  inputqcStatusChanged(event: any) {
    if (this.inputqcForm.get('inputqcStatus')!.value == 'INPUTQC-REJECTED') {
      this.inputqcForm.get('inputqcComments')!.setValidators(Validators.required);
    } else {
      this.inputqcForm.get('inputqcComments')!.clearValidators();
    }

  }


  cancelButtonClicked(event:any) {
    // this.router.navigate(['masters/employmentmaster']);
    event.preventDefault();
    this.goBack()
  }

  goBack() {
    this.location.back();
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}
