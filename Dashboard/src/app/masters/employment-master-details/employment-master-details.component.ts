import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmploymentMasterService } from '../service/employment-master.service';


@Component({
  selector: 'app-employment-master-details',
  templateUrl: './employment-master-details.component.html',
  styleUrls: ['./employment-master-details.component.scss']
})
export class EmploymentMasterDetailsComponent {
  @Input() selectedRow: any;
  _id: any;
  branches:any[]=[];
  employmentForm!: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private employmentMasterService: EmploymentMasterService) {
    this.employmentForm = this.fb.group({
      name: ['', Validators.required],
      mandatory: ['', Validators.required],
      address: ['', Validators.required],
      tier: ['', Validators.required],
      city: ['', Validators.required],
      source: ['', Validators.required],
      url: ['', Validators.required],
      verificationFee: ['', Validators.required],
      branch: ['', Validators.required],
      modeofverification: ['', Validators.required],
      fakeorgenuine: ['', Validators.required],
      designation: ['', Validators.required],
      concernperson: ['', Validators.required],
      daysforverification: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');    
    let selectedEmploymentMaster = {
      name: this.selectedRow?.name || '',
      mandatory: this.selectedRow?.mandatory || '',
      address: this.selectedRow?.address || '',
      tier: this.selectedRow?.tier || '',
      city: this.selectedRow?.city || '',
      source: this.selectedRow?.source || '',
      url: this.selectedRow?.url || '',
      verificationFee: this.selectedRow?.verificationFee || '',
      branch: this.selectedRow?.branch || '',
      modeofverification: this.selectedRow?.modeofverification || '',
      fakeorgenuine: this.selectedRow?.fakeorgenuine || '',
      designation: this.selectedRow?.daysforverification || '',
      concernperson: this.selectedRow?.concernperson || '',
      daysforverification: this.selectedRow?.daysforverification || '',
      phone: this.selectedRow?.phone || '',
      email: this.selectedRow?.email || '',
    }
    this.employmentForm.patchValue(selectedEmploymentMaster)

    this.employmentMasterService.findAllBranches().subscribe(
      response => {
        this.branches = response
      }, error => {
        console.log('error ', error);
      }
    )
  }

  saveEmploymentData(){
    console.log('saved');
    // console.log('id === ',this._id);
    
    if (this._id !== null) {
      // console.log('edit === ', this.employmentForm.value);
      this.employmentMasterService.update(this._id, this.employmentForm.value).subscribe(
        response => {
          console.log('data updated', response);
        }, error => {
          console.log('error === ', error);
        }
      )
    } else {
      // console.log('create === ', this.employmentForm.value);
      this.employmentMasterService.create(this.employmentForm.value).subscribe(
        response => {
          console.log('company data created', response);
          this.employmentForm.reset();
          this.goBack()
        }, error => {
          console.log('error === ', error);
        }
      )
    }
  }

  cancelButtonClicked(e:any) {
    e.preventDefault();
    this.router.navigate(['masters/employmentmaster']);
    // this.goBack()
  }

  goBack() {
    this.location.back();
  }
}
