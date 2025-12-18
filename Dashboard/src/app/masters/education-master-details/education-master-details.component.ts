import { Component, Input,OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EductionMasterService } from '../service/education-master.service';


@Component({
  selector: 'app-education-master-details',
  templateUrl: './education-master-details.component.html',
  styleUrls: ['./education-master-details.component.scss']
})
export class EducationMasterDetailsComponent {
  @Input() selectedRow: any;
  branches:any[]=[];
  _id: any;
  educationForm!: FormGroup;

  constructor(private location: Location, 
    private fb: FormBuilder,
     private router: Router, 
     private activatedRoute:ActivatedRoute, 
     private eductionMasterService: EductionMasterService) {
    this.educationForm = this.fb.group({
      name: ['', Validators.required],
      mandatory: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      source: ['', Validators.required],
      url: ['', Validators.required],
      verificationFee: ['', Validators.required],
      branch: ['', Validators.required],
      modeofverification: ['', Validators.required],
      designation: ['', Validators.required],
      concernperson: ['', Validators.required],
      daysforverification: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    console.log('selected row changes', this._id);
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    console.log('selected row oninit', this._id);
    
    // this.activatedRoute.params.subscribe(params => {
    //   this._id = params['_id'];
    //   // console.log('Current _id:', this._id);
    // });
    // console.log('Current _id',this._id);
    
    let selectedEducationmaster = {
      name: this.selectedRow?.name || '',
      mandatory: this.selectedRow?.mandatory || '',
      address: this.selectedRow?.address || '',
      city: this.selectedRow?.city || '',
      source: this.selectedRow?.source || '',
      url: this.selectedRow?.url || '',
      verificationFee: this.selectedRow?.verificationFee || '',
      branch: this.selectedRow?.branch || '',
      modeofverification: this.selectedRow?.modeofverification || '',
      designation: this.selectedRow?.daysforverification || '',
      concernperson: this.selectedRow?.concernperson || '',
      daysforverification: this.selectedRow?.daysforverification || '',
      phone: this.selectedRow?.phone || '',
      email: this.selectedRow?.email || '',
    }
    this.educationForm.patchValue(selectedEducationmaster)

    this.eductionMasterService.findAllBranches().subscribe(
      response => {
        this.branches = response
      }, error => {
        console.log('error ', error);
        
      }
    )
  }

  saveEducationData(){
    console.log('saved',this._id);
    if (this._id !== null) {
      console.log('edit === ', this.educationForm.value);
      this.eductionMasterService.update(this._id, this.educationForm.value).subscribe(
        response => {
          console.log('data updated', response);
        }, error => {
          console.log('error === ', error);
        }
      )
    } else {
      // console.log('create === ', this.educationForm.value);
      this.eductionMasterService.create(this.educationForm.value).subscribe(
        response => {
          console.log('company data created', response);
          this.educationForm.reset();
          this.goBack()
        }, error => {
          console.log('error === ', error);
        }
      )
    }
  }

  cancelButtonClicked(e:any) {
    e.preventDefault();
    this.router.navigate(['masters/educationmaster']);
    // this.goBack()
  }

  goBack() {
    this.location.back();
  }
}
