import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from '../service/email-template.service';

@Component({
  selector: 'app-email-template-details',
  templateUrl: './email-template-details.component.html',
  styleUrls: ['./email-template-details.component.scss']
})
export class EmailTemplateDetailsComponent {
  @Input() selectedRow: any;
  _id: any;
  emailTemplate!: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private emailTemplateService: EmailTemplateService) {
    this.emailTemplate = this.fb.group({
      name: ['', Validators.required],
      subject: ['',Validators.required],
      content: ['', Validators.required]
    })
  }
  ngOnChanges(changes: SimpleChanges){
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    // console.log('changes == ', this._id);
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    // console.log('selected row',this._id);
    
    let selectedEducationmaster = {
      name: this.selectedRow?.name || '',
      subject: this.selectedRow?.subject || '',
      content: this.selectedRow?.content || ''
    }
    this.emailTemplate.patchValue(selectedEducationmaster)
 }

 saveEmailTemplateData(){
  console.log('saved');
  if (this._id !== null) {
    console.log('edit === ', this.emailTemplate.value);
    this.emailTemplateService.findOneAndUpdate(this._id, this.emailTemplate.value).subscribe(
      response => {
        console.log('data updated', response);
      }, error => {
        console.log('error === ', error);
      }
    )
  } else {
    console.log('create === ', this.emailTemplate.value);
    this.emailTemplateService.create(this.emailTemplate.value).subscribe(
      response => {
        console.log('company data created', response);
        this.emailTemplate.reset();
        this.goBack()
      }, error => {
        console.log('error === ', error);
      }
    )
  }
}

cancelButtonClicked(e:any) {
  e.preventDefault();
  this.router.navigate(['masters/emailtemplates']);
  // this.goBack()
}

goBack() {
  this.location.back();
}
}
