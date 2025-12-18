import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent {
  @Input() selectedRow: any;
  _id: any;
  companyForm!: FormGroup
  countrylist = ['India', 'USA', 'Singapore']
  termlist = ['10 days', '12 days', '15 days']
  
  constructor(private location: Location, 
    private fb: FormBuilder,
     private router: Router, 
     private activatedRoute: ActivatedRoute, 
     private snackBar: MatSnackBar,

    private companyService: CompanyService)
     {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      status: ['', Validators.required],
      mandatoryDocuments: '',
      verificationFee: ['', Validators.required],
      concernperson: ['', Validators.required],
      modeofverification: ['', Validators.required],
      designation: ['', Validators.required],
      daysforverification: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      pin: ['', Validators.required],
      state: ['', Validators.required],

    })
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    let selectedCompany = {
      name: this.selectedRow?.name || '',
      address: this.selectedRow?.address || '',
      country: this.selectedRow?.country || '',
      status: this.selectedRow?.status || '',
      mandatoryDocuments: this.selectedRow?.mandatoryDocuments || '',
      verificationFee: this.selectedRow?.verificationFee || '',
      concernperson: this.selectedRow?.concernperson || '',
      modeofverification: this.selectedRow?.modeofverification || '',
      designation: this.selectedRow?.designation || '',
      daysforverification: this.selectedRow?.daysforverification || '',
      phone: this.selectedRow?.phone || '',
      email: this.selectedRow?.email || '',
      pin: this.selectedRow?.pin || '',
      state: this.selectedRow?.state || '',
    }
    this.companyForm.patchValue(selectedCompany)
  }

  saveCompanyData() {
    if (this._id !== null) {
      console.log('edit === ', this.companyForm.value);
      this.companyService.update(this._id, this.companyForm.value).subscribe(
         response => {
          this.showMessage("Data Updated successfully");

          console.log('data updated', response);

        }, error => {
          this.showError("Error Updating data");
          console.log('error === ', error);
 

        }
      )
    } else {
      console.log('create === ', this.companyForm.value);
      this.companyService.createCompany(this.companyForm.value).subscribe(
        response => {
          console.log('company data created', response);
          this.companyForm.reset();
          this.goBack()
        }, error => {
          console.log('error === ', error);
        }
      )
    }

  }


  cancelButtonClicked(e:any) {
    e.preventDefault();
    // this.router.navigate(['/masters/companies']);
    this.goBack()
  }

  goBack() {
    this.location.back();
  }
  showError(msg:any) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showMessage(msg:any) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}
