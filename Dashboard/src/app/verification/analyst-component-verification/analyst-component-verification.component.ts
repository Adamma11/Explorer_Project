import { Component, EventEmitter, Input, Output, Renderer2  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ClientContractComponentService } from 'src/app/administration/service/client-contract-component.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service'; 
import { EducationCourierDetailsService } from 'src/app/operations/data-entry/service/education-courier-details.service';
import { EducationPvService } from 'src/app/operations/data-entry/service/education-pv.service';
import { EducationRequestForPaymentService } from 'src/app/operations/data-entry/service/education-request-for-payment.service';
import { EmploymentCourierDetailsService } from 'src/app/operations/data-entry/service/employment-courier-details.service';
import { EmploymentPvService } from 'src/app/operations/data-entry/service/employment-pv.service';
import { EmploymentRequestForPaymentService } from 'src/app/operations/data-entry/service/employment-request-for-payment.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import * as FileSaver from 'file-saver';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { HistoryService } from 'src/app/shared/service/history.service';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { on } from 'process';
import { ServetelCallsComponent } from '../servetel-calls/servetel-calls.component';
import { EmailComponent } from '../email/email.component';
import { EmailTemplateService } from 'src/app/masters/service/email-template.service';
import { EmailCandidateDataService } from '../service/email-candidate-data.service';
import { QuicknoteComponent } from 'src/app/quicknote/quicknote.component';
import { Router } from '@angular/router';
import { EmploymentInfoComponent } from 'src/app/upload/employment-info/employment-info.component';
import { LhsPopupComponent } from '../lhs-popup/lhs-popup.component';
import { CheckFieldHistoryComponent } from 'src/app/check-field-history/check-field-history.component';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';
import { CaseStatusPopupComponent } from '../case-status-popup/case-status-popup.component';




interface EducationPvItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  universityOrInstitutionName:string;
  address:string;
  pin:string;
  city:string;
  state:string;
  country:string;
  requestDate:string;
  fullAddress:string;
  contactNumber:string;
  status:string;


}

interface EducationRequestForPaymentItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  inFavourOf:string;
  modeOfPayment:string;
  amount:string;
  requestDate:string;
  status:string
}

interface EducationCourierDetailsItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  courierName:string;
  awbNumber:string;
  courierDate:string;
  status:string
}


interface EmploymentPvItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  organisationName:string;
  address:string;
  pin:string;
  city:string;
  state:string;
  country:string;
  requestDate:string;
  fullAddress:string;
  contactNumber:string;
  status:string;
}

interface EmploymentRequestForPaymentItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  inFavourOf:string;
  modeOfPayment:string;
  amount:string;
  requestDate:string;
  status:string;
}

interface EmploymentCourierDetailsItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  courierName:string;
  awbNumber:string;
  courierDate:string;
  status:string;
}

interface ComponentDetails{
  caseId:any;
  _id:any;
}

interface ComponentDetails {
  caseId:any;
  _id:any;
}

interface ComponentDetails {
  caseId:any;
  _id:any;
}

interface EducationPvItem {
  case:string;
  componentName:string;
  componentId:string;
  _id:string;
  universityOrInstitutionName:string;
  address:string;
  pin:string;
  city:string;
  state:string;
  country:string;
  requestDate:string;
  fullAddress:string;
  contactNumber:string;
  status:string;
}

interface VerifiedDetailsFormValue {
  [key: string]: FormControl;
}


@Component({
  selector: 'app-analyst-component-verification',
  templateUrl: './analyst-component-verification.component.html',
  styleUrls: ['./analyst-component-verification.component.scss']
})



export class AnalystComponentVerificationComponent {
    previewFile: any = null; //added line oct-16//
  componentFieldsValues:any[]=[];
  myControl = new FormControl();
  @Input() selectedRow:any;
  showSlider: boolean = false;
  filteredOptions!: Observable<any[]>;
  filteredOptions1!: Observable<any[]>;
  options: any[] = [   
     { name: "Information to proceed not received"},
     { name: "Not verified – The Institute/ University declined to comment on subject’s education"},
     { name: "Work In Progress" },
     { name: "Not verified – qualification not attained" },
     { name: "Not Initiated / Fulfilled Insuff / Rejected Insuff" },
     { name: "Work In Progress" }
    ];

     options1: any[] = [   
      { name: "Verified Clear"},
      { name: "Verified with Discrepancy"}, 
      { name: "Verified with Discrepancy Verbal" },
      { name: "Clear" },
      { name: "Verification not required" },];  

  mentorReviewStatus!:string;
  mentorReviewComments!:string;
  noteComments!:string;
  outputqcStatus!: string;
  outputqcComments!: string;
  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  contract_id!: string;
  fathername!: string;
  dob!: string;
  package!: string;
  profile!: string;
  client_id!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string;
  component_id!: string;
  componentName!: string;
  componentDisplayName!: string;
  componentType!: string;
  componentFields!: any[];
  componentFieldsLhs:any[]=[];
  componentFieldsRhs:any[]=[];
  colorCodes!: any[];
  candidateDocuments!: string[];
  proofsUploaded!: string[]; 
  casedox!: string[]; 
  educationmasters: any[]=[];
  responseForEducationMaster: any
  displayedCandidateDocName!: string;
  showCandidateDocsDialog:boolean=false;
  candidateDocBlob!: Blob;
  emailIsBeingSent: boolean = false;
  displayedProofOfWorkDocName!: string;
  showProofOfWorkDialog:boolean=false;
  proofOfWorkDocBlob!: Blob;
  effortType:string=""
checkId: any;
  /////
  contact!:number;
  emailid!:string;
  doj!:string;
  process!:string;
  place!:string;
  /////
  ///tat//
  tatStartDate!:string;
 tatEndDate!:string;
 casestatus!:string;
 checkstatus!:string;
  /////
  
  note:string=""
    ///check wise comments
    colorType!:string;
    comment!:string 
    ShowComments:boolean=false;
     ///check wise comments

  displayedColumns=['serialNumber','universityOrInstitutionName','fullAddress','requestDate','status','download'];
  dataSource = new MatTableDataSource();
  showEducationPvDialog:boolean=false;

  employmentPvDisplayedColumns=['serialNumber','organisationName','fullAddress','requestDate','status','download'];
  dataSourceEmploymentPv = new MatTableDataSource();
  showEmploymentPvDialog:boolean=false;

  eduRequestForPaymentDisplayedColumns = ['serialNumber','inFavourOf','modeOfPayment','amount','requestDate','status','download'];
  dataSourceEducationRequestForPayment = new MatTableDataSource();
  showRequestForPaymentEducationDialog:boolean=false;

  empRequestForPaymentDisplayedColumns = ['serialNumber','inFavourOf','modeOfPayment','amount','requestDate','status','download'];
  dataSourceEmploymentRequestForPayment = new MatTableDataSource();
  showRequestForPaymentEmploymentDialog:boolean=false;

  educationCourierDisplayedColumns = ['serialNumber','courierName','awbNumber','courierDate','status']
  dataSourceEducationCourierDetails = new MatTableDataSource();
  showEducationCourierDetailsDialog:boolean=false;

  employmentCourierDisplayedColumns = ['serialNumber','courierName','awbNumber','courierDate','status']
  dataSourceEmploymentCourierDetails = new MatTableDataSource();
  showEmploymentCourierDetailsDialog:boolean=false;

  showeducationMasters:boolean=false;

  historyDisplayedColumns = ['date','user','operation','status','remarks','nextfollowupdate','expectedclosuredate','allocatedToVendor','allocatedToFe','allocatedToVerifier','verificationcost'];
  dataSourceHistory = new MatTableDataSource();

  insufficiencyClearedComments :any
  insufficiencyRejectionComments:any
  updateLhsClearedComments:any

  initiationDate:any
  verificationAllocatedTo!: string;
  showFeVendorAllocation:boolean=false;
  showActionDiv:boolean=false;

  relevantClientContract!: string;
  scopeOfWork:any;

  providedDetailsForm = new FormGroup({

  })
  // new 
  educationDetailsForm= new FormGroup({

  })
// new
verifiedDetailsForm!:FormGroup
addNoteForm!:FormGroup;

  educationPvForm = new FormGroup({
    universityOrInstitutionName:new FormControl('',[Validators.required]),
    address:new  FormControl('',[Validators.required]),
    pin:new FormControl('',Validators.required),
    city:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    contactNumber:new FormControl('')
  })

  employmentPvForm = new FormGroup({
    organisationName:new FormControl('',[Validators.required]),
    address:new  FormControl('',[Validators.required]),
    pin:new FormControl('',Validators.required),
    city:new FormControl(''),
    state:new FormControl(''),
    country:new FormControl(''),
    contactNumber:new FormControl('')
  })

  requestForPaymentEducationForm = new FormGroup({
    inFavourOf:new FormControl('',[Validators.required]),
    modeOfPayment:new  FormControl('',[Validators.required]),
    amount:new FormControl('',Validators.required),
  })

  requestForPaymentEmploymentForm = new FormGroup({
    inFavourOf:new FormControl('',[Validators.required]),
    modeOfPayment:new  FormControl('',[Validators.required]),
    amount:new FormControl('',Validators.required),
  })


  educationCourierDetailsForm = new FormGroup({
    courierName: new FormControl('',[Validators.required]),
    awbNumber: new FormControl('',[Validators.required]),
    courierDate: new FormControl('',[Validators.required])
  })

  employmentCourierDetailsForm = new FormGroup({
    courierName: new FormControl('',[Validators.required]),
    awbNumber: new FormControl('',[Validators.required]),
    courierDate: new FormControl('',[Validators.required])
  })

  fileUploadForm!:FormGroup
  // venky 10/10
  employername!:string
institutename!:string

  allocateTo!: string;
  constructor(
  private renderer: Renderer2,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private componentFieldService:ComponentFieldService,
    private componentDataService:ComponentDataService,
    private educationPvService:EducationPvService,
    private educationRequestForPaymentService:EducationRequestForPaymentService,
    private educationCourierDetailsService:EducationCourierDetailsService,
    private employmentPvService:EmploymentPvService,
    private employmentRequestForPaymentService:EmploymentRequestForPaymentService,
    private employmentCourierDetailsService:EmploymentCourierDetailsService,
    private clientContractService:ClientContractService,
    private clientContractComponentService:ClientContractComponentService,
    private caseUploadService:CaseUploadService,
    private historyService:HistoryService,
    private dialog:MatDialog,
    private location:Location,
    private snackBar:MatSnackBar,
    private router :Router,
   //<!--Anil 9/30/2023 start-->
    private emailTemplateService:EmailTemplateService,
    private _EmailCandidateDataService:EmailCandidateDataService
   // <!--Anil 9/30/2023 end-->
  ) { }

  ngOnChanges(): void {
    // Grammarly.init("client_4dt6PwTScrQ3bX8cZvGePj")
    //   .then(grammarly => {

    //     grammarly.addPlugin(
    //       document.querySelector(".grammarly"),
    //       {
    //         autocomplete: "on", suggestionCards: "on", documentDialect: "indian", activation: "focus",
    //         documentDomain: 'business', introText: "Welcome to Grammarly for Vibe, This platform will help you write your comments better so please make sure to use it frequently.",
    //         underlines: 'on', userFeedback: 'off', toneDetector: 'on'
    //       },

    //     );
    //   })
    this.ngOnInit()

  }
 
  ngOnInit(): void {
    //sharath////
   const verificationItem = this.componentDetailsForVerificationService.getVerificationItem();
   console.log("iteams",verificationItem);
   
    if (!verificationItem) {
      this.router.navigate(['/home/verification/analystlistofchecks/']);
      return;
    }
///sharath////
     this._EmailCandidateDataService.emailStatus$.subscribe((status) => {
      this.emailIsBeingSent = status;

      this.fileUploadForm = new FormGroup({
        proofOfWorkFile : new FormControl(''),
        fileTitle: new FormControl(''),
        fileType: new FormControl('')
      })

      this.verifiedDetailsForm = new FormGroup({
        action:new FormControl(''),
        status:new FormControl('',[Validators.required]),
        insufficiencyComments:new FormControl(''),
        onHoldComments :new FormControl(''),
        updateLhsComments:new FormControl(''),
        // shortdescription :new FormControl(''),
        verificationcost:new FormControl(''),
        // insuffType:new FormControl(''),
        // category:new FormControl(''),
    
        
        grade: new FormControl(''),
        gradingComments:new FormControl(''),
        personContacted: new FormControl(''),
        contactNumberOfPersonContacted: new FormControl(''),
        interimOrFinal:new  FormControl(''),
        mode:new FormControl('')
      })
     
      this.addNoteForm = new FormGroup({
        effortType:new FormControl(''),

        noteComments:new FormControl(''),
        // followupdate:new FormControl('',[Validators.required]),
        // accepteddate: new FormControl('',[Validators.required]),
      })
    });

    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId;
    this.case_id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.candidateName = this.componentDetailsForVerificationService.getVerificationItem().candidateName;
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().client_id;
    this.clientName = this.componentDetailsForVerificationService.getVerificationItem().clientName;
    this.subclient_id = this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
    this.subclientName = this.componentDetailsForVerificationService.getVerificationItem().subclientName;
    this.colorCodes = this.componentDetailsForVerificationService.getVerificationItem().colorCodes;
    console.log("colorCodes",this.colorCodes);
    
    this.contract_id = this.componentDetailsForVerificationService.getVerificationItem().contract_id;
    this.fathername = this.componentDetailsForVerificationService.getVerificationItem().fathername;
    this.dob = this.componentDetailsForVerificationService.getVerificationItem().dateofbirth;
    this.profile = this.componentDetailsForVerificationService.getVerificationItem().profile;
    this.package = this.componentDetailsForVerificationService.getVerificationItem().package;
    this.colorType = this.componentDetailsForVerificationService.getVerificationItem().colorType;
    this.comment = this.componentDetailsForVerificationService.getVerificationItem().comments;
    this.contact = this.componentDetailsForVerificationService.getVerificationItem().number;
    this.emailid = this.componentDetailsForVerificationService.getVerificationItem().emailid;
    this.doj = this.componentDetailsForVerificationService.getVerificationItem().doj;
    this.process  = this.componentDetailsForVerificationService.getVerificationItem().process;
    this.place = this.componentDetailsForVerificationService.getVerificationItem().location;
    this.tatStartDate = this.componentDetailsForVerificationService.getVerificationItem().tatStartDate;
    this.tatEndDate  = this.componentDetailsForVerificationService.getVerificationItem().tatEndDate;
    this.casestatus = this.componentDetailsForVerificationService.getVerificationItem().casestatus
    this.checkstatus = this.componentDetailsForVerificationService.getVerificationItem().checkstatus
    this.employername = this.componentDetailsForVerificationService.getVerificationItem().employername
    this.institutename = this.componentDetailsForVerificationService.getVerificationItem().institutename
this.checkId=this.componentDetailsForVerificationService.getVerificationItem().checkId
    console.log("Looking for scope of work",this.colorType,this.comment);
    if (!this.comment  ) {
      this.ShowComments = false;
    } else {
      this.ShowComments = true;
    }
    // console.log("Shoaib", this.package, this.componentDetailsForVerificationService.getVerificationItem())
//    this.componentFields= this.componentDetailsForVerificationService.getVerificationItem().componentFields;
    this.component_id = this.componentDetailsForVerificationService.getVerificationItem().component_id;
    this.componentName = this.componentDetailsForVerificationService.getVerificationItem().componentName;
    this.componentDisplayName = this.componentDetailsForVerificationService.getVerificationItem().componentDisplayName;
    this.componentType = this.componentDetailsForVerificationService.getVerificationItem().componentType;
    this.insufficiencyClearedComments = this.componentDetailsForVerificationService.getVerificationItem().insufficiencyClearedComments;
    this.insufficiencyRejectionComments =this.componentDetailsForVerificationService.getVerificationItem().insufficiencyRejectionComments;
    this.updateLhsClearedComments =this.componentDetailsForVerificationService.getVerificationItem().updateLhsComments;
    console.log("!!!!!!!!!!!!!!!!!!",this.componentDetailsForVerificationService.getVerificationItem());
    
    this.initiationDate = this.componentDetailsForVerificationService.getVerificationItem().initiationDate;
    this.verificationAllocatedTo = this.componentDetailsForVerificationService.getVerificationItem().allocatedUser
    this.verifiedDetailsForm.get('personContacted')!.setValue(this.verificationAllocatedTo);
    // this.verifiedDetailsForm.get('insufficiencyComments').valueChanges
    this.filteredOptions = this.verifiedDetailsForm.get('insufficiencyComments')!.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
    this.filteredOptions1 = this.verifiedDetailsForm.get('gradingComments')!.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filter1(name) : this.options1.slice()))
    );
    // console.log("cvsadjvsjdc", this.client_id)
    console.log("cvsadjvsjdc", this.componentDetailsForVerificationService.getVerificationItem().client_id)
    this.clientContractService.getScopeofworkRelevantCrientContract(this.componentDetailsForVerificationService.getVerificationItem().client_id).subscribe(
      
      response=>{
        if(response != null){
          console.log("############# 2", response)
          this.relevantClientContract = response._id;
          // console.log("#############", response)
          this.clientContractComponentService.findDetailsForAComponent(this.relevantClientContract,this.component_id).subscribe(
            response=>{
              console.log("Looking for scope of work 1",response);
              // this.scopeOfWork = response.scopeOfWork;
              this.scopeOfWork = response.map((item: { scopeOfWork: any; })=>{
                return [item.scopeOfWork]
              })
              console.log("Looking for scope of work", this.scopeOfWork);
            },
            error=>{
              this.showError("Error while fetching scope of work");
            }
          )
        }
      },
      error=>{

      }
    )
    if(this.componentType == 'address'){
      this.showFeVendorAllocation=true;
    }
    if(this.componentType=='education' || this.componentType=='employment'){
      this.showActionDiv=true;
    }

    this._id = this.componentDetailsForVerificationService.getVerificationItem()._id;
    console.log("response : ",this.component_id)
    this.componentFieldService.findAllFieldsForAComponent(this.component_id).subscribe(
      response=>{
        console.log(this.component_id)
        this.componentFields = response;
        console.log("componentField",this.componentFields)
        this.addFormFields();
        this.getLhsAndRhsDetails();

      },
      error=>{
        //console.log(error);
      }
    )
    //console.log("Component Name is ",this.componentName)
    //console.log("Case Id is ",this.caseId)
    //console.log("this._id is ",this._id)
    this.componentDataService.readFileNames(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        this.candidateDocuments = response;
        console.log("docx",response);
        
      },
      error=>{
        //console.log(error);
      }
    )
    this.readProofOfWork();
    this.readCaseDox()
    if(this.componentType=='education'){
      this.educationPvService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let educationPvItem : EducationPvItem = {
              case:item.case,
              componentName: item.componentName,
              componentId: item.componentId,
              _id: item._id,
              universityOrInstitutionName: item.universityOrInstitutionName,
              address: item.address,
              pin: item.pin,
              city: item.city,
              state: item.state,
              country: item.state,  
              requestDate: item.requestDate,
              fullAddress: item.address + "\n" + item.city + "\n" + item.state + "\n" + item.country + "\n" + item.pin,
              contactNumber: item.state,  
              status: item.status,
            
            
            }
            this.dataSource.data.push(educationPvItem);
          })
          this.dataSource._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading education pvs");
        }
      )

      this.educationRequestForPaymentService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let educationRequestForPaymentItem :EducationRequestForPaymentItem = {
              case:item.case,
              componentName: item.componentName,
              componentId: item.componentId,
              _id: item._id,
              inFavourOf:item.inFavourOf,
              modeOfPayment:item.modeOfPayment,
              amount:item.amount,
              requestDate:item.requestDate,
              status:item.status

            }
            
            this.dataSourceEducationRequestForPayment.data.push(educationRequestForPaymentItem);
          })
          this.dataSourceEducationRequestForPayment._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading education payment requests");
        }
      )
      this.educationCourierDetailsService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let educationCourierDetailsItem : EducationCourierDetailsItem = {
              case:item.case,
              componentName: item.componentName,
              componentId: item.componentId,
              _id: item._id,
              courierName:item.courierName,
              awbNumber:item.awbNumber,
              courierDate:item.courierDate,
              status:item.status
            }

            this.dataSourceEducationCourierDetails.data.push(educationCourierDetailsItem);
          })
          this.dataSourceEducationCourierDetails._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading education Courier Details");
        }
      )
    }else if(this.componentType=='employment'){
      this.employmentPvService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let employmentPvItem : EmploymentPvItem = {
              case:item.case,
              componentName: item.componentName,
              componentId: item.componentId,
              _id: item._id,
              organisationName:item.organisationName,
              address:item.address,
              pin:item.pin,
              city:item.city,
              state:item.state,
              country:item.country,
              requestDate:item.requestDate,
              fullAddress:item.fullAddress,
              contactNumber:item.contactNumber,
              status:item.status
            }
          
            this.dataSourceEmploymentPv.data.push(employmentPvItem);
          })
          this.dataSourceEmploymentPv._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading employment pvs");
        }
      )


      this.employmentRequestForPaymentService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let employmentRequestForPaymentItem :EmploymentRequestForPaymentItem = {
              case:item.case,
              componentName:item.componentName,
              componentId:item.componentId,
              _id:item._id,
              inFavourOf:item.inFavourOf,
              modeOfPayment:item.modeOfPayment,
              amount:item.amount,
              requestDate:item.requestDate,
              status:item.status
            }
            this.dataSourceEmploymentRequestForPayment.data.push(employmentRequestForPaymentItem);
          })
          this.dataSourceEmploymentRequestForPayment._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading employment payment requests");
        }
      )


      this.employmentCourierDetailsService.readAllForAComponent(this.case_id,this.componentName,this._id).subscribe(
        response=>{
          response.forEach(item=>{
            let employmentCourierDetailsItem : EmploymentCourierDetailsItem = {
              case:item.case,
              componentName:item.componentName,
              componentId:item.componentId,
              _id:item._id,
              courierName:item.courierName,
              awbNumber:item.awbNumber,
              courierDate:item.courierDate,
              status:item.status
            }
            
            this.dataSourceEmploymentCourierDetails.data.push(employmentCourierDetailsItem);
          })
          this.dataSourceEmploymentCourierDetails._updateChangeSubscription();
        },
        error=>{
          this.showError("Error reading Employment Courier Details");
        }
      )
    }
    this.getHistoryDetails()



    
  }


  getLhsAndRhsDetails(){
    this.componentDataService.findOne(this.componentName,this.case_id,this._id).subscribe(
      response=>{
        this.componentFieldsValues=response;
        // if (this.componentName.includes("education") ||  this.componentName.includes("educationcomprehensive") ||  this.componentName.includes("educationadvanced")) {
       
        //   const nameofuniversity = response.nameofuniversity || response.nameofuniverskty
        //   console.log("name of university", nameofuniversity)
        //   this.getEducationInstitutions(nameofuniversity)
        // }
        this.componentFields.forEach(item=>{ 
          if(item.type != 'DATE'){
            if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
              this.providedDetailsForm.get(item.name)?.setValue(response[item.name]);
            }
            if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
              this.verifiedDetailsForm.get(item.name+'Rhs')?.setValue(response[item.name+'Rhs']);
            }}else{
              if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
                let dateValue = new Date(response[item.name]);
                let dd = dateValue.getDate();
                let mm = dateValue.getMonth()+1;
                let yyyy = dateValue.getFullYear().toString();
                let stringdd = '';
                let stringmm = ''
  
                if(dd < 10){
                  stringdd = '0'+dd;
                }else{
                  stringdd = dd.toString();
                }
                if(mm < 10){
                  stringmm = '0'+mm;
                }else{
                  stringmm= mm.toString();
                }
                this.providedDetailsForm.get(item.name)?.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
              }
              if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
                let dateValue = new Date(response[item.name+'Rhs']);
                let dd = dateValue.getDate();
                let mm = dateValue.getMonth()+1;
                let yyyy = dateValue.getFullYear().toString();
                let stringdd = '';
                let stringmm = ''
  
                if(dd < 10){
                  stringdd = '0'+dd;
                }else{
                  stringdd = dd.toString();
                }
                if(mm < 10){
                  stringmm = '0'+mm;
                }else{
                  stringmm= mm.toString();
                }
                this.verifiedDetailsForm.get(item.name+'Rhs')?.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
              }
            }
          // }else{
          //   if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
          //     let dateValue = new Date(response[item.name]);
          //     let dd = dateValue.getDate();
          //     let mm = dateValue.getMonth()+1;
          //     let yyyy = dateValue.getFullYear().toString();
          //     //new 21Nov2023
          //     let stringdd = dd < 10 ? '0' + dd : dd.toString();
          //   let stringmm = mm < 10 ? '0' + mm : mm.toString();

          //   const monthNames = [
          //       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          //       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          //   ];
          //   const monthAbbreviation = monthNames[mm - 1];

          //   const formattedDate = `${stringdd}-${monthAbbreviation}-${yyyy}`;
          //     // console.log('converted value is ', formattedDate);  
           
          //   this.providedDetailsForm.get(item.name)!.setValue(formattedDate);
          //     ///////////////
          //     // let stringdd = '';
          //     // let stringmm = ''

          //     // if(dd < 10){
          //     //   stringdd = '0'+dd;
          //     // }else{
          //     //   stringdd = dd.toString();
          //     // }
          //     // if(mm < 10){
          //     //   stringmm = '0'+mm;
          //     // }else{
          //     //   stringmm= mm.toString();
          //     // }
          //     // this.providedDetailsForm.get(item.name).setValue(yyyy+ '-' + stringmm + '-' +stringdd);
          //   }
          //   if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
          //     let dateValue = new Date(response[item.name+'Rhs']);
          //     let dd = dateValue.getDate();
          //     let mm = dateValue.getMonth()+1;
          //     let yyyy = dateValue.getFullYear().toString();
          //     let stringdd = '';
          //     let stringmm = ''

          //     if(dd < 10){
          //       stringdd = '0'+dd;
          //     }else{
          //       stringdd = dd.toString();
          //     }
          //     if(mm < 10){
          //       stringmm = '0'+mm;
          //     }else{
          //       stringmm= mm.toString();
          //     }
          //     this.verifiedDetailsForm.get(item.name+'Rhs')!.setValue(yyyy+ '-' + stringmm + '-' +stringdd);
          //   }
          // }
          //console.log("response...................................status ",response.status);
          if(response.status == 'MENTOR-REVIEW-REJECTED'){
            this.mentorReviewStatus = response.status;
            this.mentorReviewComments = response.mentorReviewComments;
          }
          if(response.status == 'OUTPUTQC-REJECTED'){
            this.outputqcStatus = response.status;
            this.outputqcComments = response.outputqcComments;
          }

        })
      },
      error=>{
        //console.log(error);
      }
    )
  }
  readProofOfWork(){
    this.proofsUploaded=[]
    this.componentDataService.readProofOfWorks(this.componentName,this.caseId,this._id).subscribe(
      response=>{
        //console.log('response from read proof of works ',response);
        this.proofsUploaded = response;
      },
      error=>{
        //console.log(error);
      }
    )
  }
  readCaseDox(){
    this.casedox=[]
    this.componentDataService.readcdf(this.caseId).subscribe(
      response=>{
        console.log('response from read proof of works ',response);
        this.casedox = response;
      },
      error=>{
        //console.log(error);
      }
    )
  }
  getValues(name: any){
    for(let field of this.componentFields){
      if(field.name == name){
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }
  addFormFields(){
    this.componentFields.forEach(item=>{
      if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
        this.providedDetailsForm.addControl(item.name,new FormControl(''));
        this.componentFieldsLhs.push(item);
      }
      if(item.lhsRhs=='RHS' || item.lhsRhs=='BOTH'){
        this.componentFieldsRhs.push(item);
        if(item.mandatory ==='MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl('',[Validators.required]));
        }else if(item.mandatory=='NOT-MANDATORY'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
        }else if(item.mandatory=='FIELD-VALUE'){
          this.verifiedDetailsForm.addControl(item.name +'Rhs',new FormControl(''));
          //console.log("item name for which value change listener is being added is  ",item.name);
          this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.valueChanges.subscribe(
            response=>{
              if(item.condition == '=='){
                if(this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.value == item.conditionValue){
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.setValidators([Validators.required]);
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true})
                }else{
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.clearValidators();
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }
              }else if(item.condition == '!='){
                if(this.verifiedDetailsForm.get(item.conditionField+'Rhs')!.value != item.conditionValue){
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.setValidators([Validators.required]);
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }else{
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.clearValidators();
                  this.verifiedDetailsForm.get(item.name+'Rhs')!.updateValueAndValidity({emitEvent:true});
                }
              }
            },
            error=>{
              //console.log("Error during value change response",error)
            }
          )
        }

      }

    })
  }

  downloadCandidateDoc(fileName: string){
    this.displayedCandidateDocName = fileName;
    let componentDetails : ComponentDetails = {
      caseId:this.caseId,
      _id:this._id
    }
    this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
          if (response.body) {
              console.log("response", response.body.type);
              // if (response.body.type === "audio/mpeg") {
              //     FileSaver.saveAs(response.body, "audio.mp3");
              // } else if (response.body.type === "application/pdf") {
              //     this.proofOfWorkDocBlob = response.body;
              //     this.toggleProofOfWorkDialog();
              // } else {
                  FileSaver.saveAs(response.body, fileName + "." +(response.body.type.includes("msword") ? "doc" : ""));
              // }
          } else {
              // Handle the case when response.body is null
              console.error("Received null response body");
          }
      },
      error => {
          this.showError(error.error.message);
      }
  );
    // this.componentDataService.downloadFile(this.componentName,componentDetails,fileName).subscribe(
    //   (response:HttpResponse<Blob>)=>{
    //     this.candidateDocBlob = response.body !== null ? response.body : new Blob();
    //     this.showCandidateDocsDialog = true;
    //   },
    //   error=>{
    //     this.showError(error.error.message);
    //   }
    // )

  }

  ///preview for All Doc's

// previewCaseDocFile(fileName: string): void {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
//     (response: HttpResponse<Blob>) => {
//       if (response.body) {
//         const fileBlob = response.body;
//         const fileType = response.body.type;

//         this.dialog.open(FilePreviewDialogComponent, {
//           width: '900px',
//           data: {
//             fileName,
//             fileBlob,
//             fileType
//           }
//         });
//       } else {
//         console.error("Received null response body");
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }

////preview for Check Doc's

// previewCandidateDoc(fileName: string): void {
//   this.displayedCandidateDocName = fileName;
//   const componentDetails: ComponentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
//     (response: HttpResponse<Blob>) => {
//       if (response.body) {
//         const fileBlob = response.body;
//         const fileType = response.body.type;

//         const dialogRef = this.dialog.open(FilePreviewDialogComponent, {
//           width: '900px',
//           data: {
//             fileName,
//             fileBlob,
//             fileType,
//             componentName: this.componentName
//           }
//         });

//         dialogRef.afterClosed().subscribe(result => {
//           if (result?.delete) {
//             this.deleteCandidateDoc(fileName); // Add this method to delete candidate file
//           }
//         });
//       } else {
//         console.error("Received null response body");
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }

/// preview for Prove Doc's

// previewProofOfWork(fileName: string): void {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id
//   };

//   this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
//     (response: HttpResponse<Blob>) => {
//       if (response.body) {
//         const fileBlob = response.body;
//         const fileType = response.body.type;

//         const dialogRef = this.dialog.open(FilePreviewDialogComponent, {
//           width: '900px',
//           data: {
//             fileName,
//             fileBlob,
//             fileType,
//             componentName: this.componentName
//           }
//         });

//         dialogRef.afterClosed().subscribe(result => {
//           if (result?.delete) {
//             this.deleteProofOfWork(fileName); // Optional delete after preview
//           }
//         });
//       } else {
//         console.error("Received null response body");
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }



//added code on oct-16//

// For All Docs
previewCaseDocFile(fileName: string): void {
  const componentDetails = { caseId: this.caseId, _id: this._id };
  this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
    (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
          fileCategory: 'casedoc'
        };
      }
    },
    error => this.showError(error.error.message)
  );
}

// For Check Docs
previewCandidateDoc(fileName: string): void {
  const componentDetails = { caseId: this.caseId, _id: this._id };
  this.componentDataService.downloadCanDox(this.componentName, componentDetails, fileName).subscribe(
    (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
          fileCategory: 'candidatedoc' 
        };
      }
    },
    error => this.showError(error.error.message)
  );
}

// For Proof Docs
previewProofOfWork(fileName: string): void {
  const componentDetails = { caseId: this.caseId, _id: this._id };
  this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
    (response: HttpResponse<Blob>) => {
      if (response.body) {
        this.previewFile = {
          fileName,
          fileBlob: response.body,
          fileType: response.body.type,
           fileCategory: 'proofdoc', 

        };
      }
    },
    error => this.showError(error.error.message)
  );
}

// Close preview
closePreview(): void {
  this.previewFile = null;
}

handlePreviewClose(event?: { delete?: boolean }) {
  if (event?.delete && this.previewFile?.fileName) {
    if (this.previewFile.fileCategory === 'candidatedoc') {
      this.deleteCandidateDoc(this.previewFile.fileName);
    } else if (this.previewFile.fileCategory === 'proofdoc') {
      this.deleteProofOfWork(this.previewFile.fileName);
    }
  }
 
  this.previewFile = null;
}


/////end///////////////

//added code oct -22///

  downloadProofOfWork(fileName: string) {
    this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        caseId: this.caseId,
        _id: this._id
    };

    this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
        (response: HttpResponse<Blob>) => {
            if (response.body) {
                console.log("response", response.body.type);
                // if (response.body.type === "audio/mpeg") {
                //     FileSaver.saveAs(response.body, "audio.mp3");
                // } else if (response.body.type === "application/pdf") {
                //     this.proofOfWorkDocBlob = response.body;
                //     this.toggleProofOfWorkDialog();
                // } else {
                    FileSaver.saveAs(response.body, fileName + "." +(response.body.type.includes("msword") ? "doc" : ""));
                // }
            } else {
                // Handle the case when response.body is null
                console.error("Received null response body");
            }
        },
        error => {
            this.showError(error.error.message);
        }
    );
}

  // downloadProofOfWork(fileName: string){
  //   this.displayedProofOfWorkDocName = fileName; 
  //   let componentDetails : ComponentDetails = {
  //     caseId:this.caseId,
  //     _id:this._id
  //   }
  //   this.componentDataService.downloadProofOfWorkAsJson(this.componentName, componentDetails, fileName).subscribe(
  //     (response: any) => {
        
  //       if (response.type === 'base64') {
  //         if (response.data !== null) {
  //           let base64String = "data:image/jpeg;base64," + response.data; // Fixed the data URI format
  //           let myBlob = this.dataURItoBlob(base64String);
  //           FileSaver.saveAs(myBlob, "image.jpg");
  //         }
  //       }else if (response.type === 'jpgg') {
  //         if (response.data !== null) {
  //           console.log("sdcece",response.data);
  //           let base64String = "data:image/jpgg;base64," + response.data; 
  //           let myBlob = this.dataURItoBlob(base64String);
  //           console.log("sdcece",myBlob);
  //           FileSaver.saveAs(myBlob, "image.jpg");
  //         }
  //       } else {
  //         this.componentDataService.downloadProofOfWork(this.componentName, componentDetails, fileName).subscribe(
  //           (response: HttpResponse<Blob>) => {
  //             this.proofOfWorkDocBlob = response.body !== null ? response.body : new Blob();
  //             this.showProofOfWorkDialog = true;
  //           },
  //           error => {
  //             this.showError(error.error.message);
  //           }
  //         );
  //       }
  //     },
  //     error => {
  //       this.showError("Error in downloading image");
  //     }
  //   );

  // } 
  // dataURItoBlob(dataURI:any) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(',')[1]);
  
  //   // separate out the mime component
  //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);
  
  //   // create a view into the buffer
  //   var ia = new Uint8Array(ab);
  
  //   // set the bytes of the buffer to the correct values
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }
  
  //   // write the ArrayBuffer to a blob, and you're done
  //   var blob = new Blob([ab], {type: mimeString});
  //   return blob;
  
  // }  

    ///08Sep2023
  deleteProofOfWork(fileName:any){

    let componentDetails : ComponentDetails = ({
      caseId:this.caseId,
      _id:this._id
    })
   

    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete the Annexure ?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
        if(result.event=='confirmed'){
          this.componentDataService.deleteProofOfWork(this.componentName,componentDetails,fileName).subscribe(
            response=>{
              this.showMessage("File Deleted");
              this.readProofOfWork()
            },
            error=>{
              this.showError("Error deleting the file")
            }
          )
        }
      })
  }

  deleteCandidateDoc(fileName:any){
    let componentDetails : ComponentDetails = ({
      caseId:this.caseId,
      _id:this._id
    })
   

    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete candidate docs?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
        if(result.event=='confirmed'){
          this.componentDataService.deleteCandidateDoc(this.componentName,componentDetails,fileName).subscribe(
            response=>{
              this.showMessage("File Deleted");
              this.candidateDocuments = this.candidateDocuments.filter(file => file !== fileName)
            },
            error=>{
              this.showError("Error deleting the file")
            }
          )
        }
      })
  }

  takeAction(){
    if(this.verifiedDetailsForm.get('action')!.value=='PHYSICAL-VISIT'){
      if(this.componentName=='education'){
        this.showEducationPvDialog=true;
      }else if(this.componentType=='employment'){
        this.showEmploymentPvDialog=true;
      }
    }else if(this.verifiedDetailsForm.get('action')!.value=='REQ-PAYMENT'){
      if(this.componentName=='education'){
        this.showRequestForPaymentEducationDialog = true;
      }
    }else if(this.verifiedDetailsForm.get('action')!.value=='SEND-COURIER'){
      if(this.componentName=='education'){
        this.showEducationCourierDetailsDialog = true;
      }
    }
  }
  educationPvDialogCloseButtonClicked(){
    this.showEducationPvDialog=false;
  }
  educationRequestForPaymentDialogCloseButtonClicked(){
    this.showRequestForPaymentEducationDialog = false;
  }
  educationCourierDetailsDialogCloseButtonClicked(){
    this.showEducationCourierDetailsDialog = false;
  }
  employmentPvDialogCloseButtonClicked(){
    this.showEmploymentPvDialog=false;
  }
  employmentRequestForPaymentDialogCloseButtonClicked(){
    this.showRequestForPaymentEmploymentDialog = false;
  }
  employmentCourierDetailsDialogCloseButtonClicked(){
    this.showEmploymentCourierDetailsDialog = false;
  }
  educationPvRequestButtonClicked(){
    const educationPvData:any = this.educationPvForm.getRawValue();
    educationPvData.case = this.case_id;
    educationPvData.componentName = this.componentName;
    educationPvData.componentId = this._id;
    educationPvData.componentType = this.componentType;
    educationPvData.componentDisplayName = this.componentDisplayName;
    this.educationPvService.create(educationPvData).subscribe(
      response=>{
        this.showMessage("Physical Verification Request for Education Saved");
        let educationPvItem : EducationPvItem= {
          case:response.case,
          componentName:response.componentName,
          componentId:response.componentId,
          _id:response._id,
          universityOrInstitutionName:response.universityOrInstitutionName,
          address: response.address,
          pin:response.pin,
          city:response.city,
          state:response.state,
          country:response.country,
          requestDate:response.requestDate,
          fullAddress:response.address + "\n" + response.city + "\n" + response.state + "\n" + response.country + "\n" + response.pin,
          contactNumber:response.state,
          status:response.status

        }

    
        this.dataSource.data.push(educationPvItem);
        this.dataSource._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  employmentPvRequestButtonClicked(){
    const employmentPvData:any = this.employmentPvForm.getRawValue();
    employmentPvData.case = this.case_id;
    employmentPvData.componentName = this.componentName;
    employmentPvData.componentId = this._id;
    employmentPvData.componentType = this.componentType;
    employmentPvData.componentDisplayName = this.componentDisplayName;
    this.employmentPvService.create(employmentPvData).subscribe(
      response=>{
        this.showMessage("Physical Verification Request for Employment Saved");
        let employmentPvItem:any = ({

        })

        employmentPvItem["case"]=response.case;
        employmentPvItem["componentName"]=response.componentName;
        employmentPvItem["componentId"]=response.componentId;
        employmentPvItem["_id"]=response._id;
        employmentPvItem["organisationName"] = response.organisationName;
        employmentPvItem["address"] = response.address;
        employmentPvItem["pin"] = response.pin;
        employmentPvItem["city"] = response.city;
        employmentPvItem["state"]= response.state;
        employmentPvItem["country"]=response.state;
        employmentPvItem["requestDate"]=response.requestDate;
        employmentPvItem["fullAddress"] = response.address + "\n" + response.city + "\n" + response.state + "\n" + response.country + "\n" + response.pin;
        employmentPvItem["contactNumber"]=response.state;
        employmentPvItem["status"]=response.status;
        this.dataSourceEmploymentPv.data.push(employmentPvItem);
        this.dataSourceEmploymentPv._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }

  educationRequstForPaymentButtonClicked(){
    const educationRequestForPaymentData:any = this.requestForPaymentEducationForm.getRawValue();
    educationRequestForPaymentData.case = this.case_id;
    educationRequestForPaymentData.componentName = this.componentName;
    educationRequestForPaymentData.componentId = this._id;
    educationRequestForPaymentData.componentType = this.componentType;
    educationRequestForPaymentData.componentDisplayName = this.componentDisplayName;
    this.educationRequestForPaymentService.create(educationRequestForPaymentData).subscribe(
      response=>{
        this.showMessage("Request for Payment for Education Saved");
        let educationRequestForPamentItem:any = ({

        })

        educationRequestForPamentItem["case"]=response.case;
        educationRequestForPamentItem["componentName"]=response.componentName;
        educationRequestForPamentItem["componentId"]=response.componentId;
        educationRequestForPamentItem["_id"]=response._id;
        educationRequestForPamentItem["inFavourOf"] = response.inFavourOf;
        educationRequestForPamentItem["modeOfPayment"] = response.modeOfPayment;
        educationRequestForPamentItem["amount"] = response.amount;
        educationRequestForPamentItem["requestDate"]=response.requestDate;
        educationRequestForPamentItem["status"]=response.status;
        this.dataSourceEducationRequestForPayment.data.push(educationRequestForPamentItem);
        this.dataSourceEducationRequestForPayment._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  employmentRequstForPaymentButtonClicked(){
    const employmentRequestForPaymentData:any = this.requestForPaymentEmploymentForm.getRawValue();
    employmentRequestForPaymentData.case = this.case_id;
    employmentRequestForPaymentData.componentName = this.componentName;
    employmentRequestForPaymentData.componentId = this._id;
    this.employmentRequestForPaymentService.create(employmentRequestForPaymentData).subscribe(
      response=>{
        this.showMessage("Request for Payment for Employment Saved");
        let employmentRequestForPamentItem : any= ({

        })

        employmentRequestForPamentItem["case"]=response.case;
        employmentRequestForPamentItem["componentName"]=response.componentName;
        employmentRequestForPamentItem["componentId"]=response.componentId;
        employmentRequestForPamentItem["_id"]=response._id;
        employmentRequestForPamentItem["inFavourOf"] = response.inFavourOf;
        employmentRequestForPamentItem["modeOfPayment"] = response.modeOfPayment;
        employmentRequestForPamentItem["amount"] = response.amount;
        employmentRequestForPamentItem["requestDate"]=response.requestDate;
        employmentRequestForPamentItem["status"]=response.status;
        this.dataSourceEmploymentRequestForPayment.data.push(employmentRequestForPamentItem);
        this.dataSourceEmploymentRequestForPayment._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  educationCourierDetailsButtonClicked(){
    const educationCourierDetailsData:any = this.educationCourierDetailsForm.getRawValue();
    educationCourierDetailsData.case = this.case_id;
    educationCourierDetailsData.componentName = this.componentName;
    educationCourierDetailsData.componentId = this._id;
    this.educationCourierDetailsService.create(educationCourierDetailsData).subscribe(
      response=>{
        this.showMessage("Request for Payment for Education Saved");
        let educationCouriterDetailsItem : any= ({

        })

        educationCouriterDetailsItem["case"]=response.case;
        educationCouriterDetailsItem["componentName"]=response.componentName;
        educationCouriterDetailsItem["componentId"]=response.componentId;
        educationCouriterDetailsItem["_id"]=response._id;
        educationCouriterDetailsItem["courierName"] = response.courierName;
        educationCouriterDetailsItem["awbNumber"] = response.awbNumber;
        educationCouriterDetailsItem["courierDate"] = response.courierDate;
        educationCouriterDetailsItem["status"]=response.status;
        this.dataSourceEducationCourierDetails.data.push(educationCouriterDetailsItem);
        this.dataSourceEducationCourierDetails._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  employmentCourierDetailsButtonClicked(){
    const employmentCourierDetailsData : any = this.employmentCourierDetailsForm.getRawValue();
    employmentCourierDetailsData.case = this.case_id;
    employmentCourierDetailsData.componentName = this.componentName;
    employmentCourierDetailsData.componentId = this._id;
    this.employmentCourierDetailsService.create(employmentCourierDetailsData).subscribe(
      response=>{
        this.showMessage("Request for Payment for Education Saved");
        let employmentCouriterDetailsItem :any= ({

        })

        employmentCouriterDetailsItem["case"]=response.case;
        employmentCouriterDetailsItem["componentName"]=response.componentName;
        employmentCouriterDetailsItem["componentId"]=response.componentId;
        employmentCouriterDetailsItem["_id"]=response._id;
        employmentCouriterDetailsItem["courierName"] = response.courierName;
        employmentCouriterDetailsItem["awbNumber"] = response.awbNumber;
        employmentCouriterDetailsItem["courierDate"] = response.courierDate;
        employmentCouriterDetailsItem["status"]=response.status;
        this.dataSourceEmploymentCourierDetails.data.push(employmentCouriterDetailsItem);
        this.dataSourceEmploymentCourierDetails._updateChangeSubscription();

      },
      error=>{
        this.showError(error.error.message);
      }
    )
  }
  closeOffcanvas(){
    const offcanvasElement = document.getElementById('selectOffcanvas');
    this.verifiedDetailsForm.get('status')!.setValue('');
    this.renderer.removeClass(offcanvasElement, 'show');
  }
  statusSelectionChanged(event:any){
    // console.log(this.verifiedDetailsForm.get('status')!.value);
    const offcanvasElement = document.getElementById('selectOffcanvas');
    this.renderer.addClass(offcanvasElement, 'show');    
    if(this.verifiedDetailsForm.get('status')!.value=='VERIFICATION-COMPLETED'){
      //console.log("Selected Status is Verificcation Compolete")
      this.verifiedDetailsForm.get('grade')!.setValidators([Validators.required])
      this.verifiedDetailsForm.get('grade')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('gradingComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('gradingComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('interimOrFinal')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('interimOrFinal')!.updateValueAndValidity({emitEvent:true})
      // this.verifiedDetailsForm.get('mode')!.setValidators([Validators.required]);
      // this.verifiedDetailsForm.get('mode')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('insufficiencyComments')!.clearValidators();
      this.verifiedDetailsForm.get('insufficiencyComments')!.updateValueAndValidity({emitEvent:true})
    }else if(this.verifiedDetailsForm.get('status')!.value=='INSUF-2' || this.verifiedDetailsForm.get('status')!.value=='COST-APPROVAL' || this.verifiedDetailsForm.get('status')!.value=='CLARIFICATION'){
      this.verifiedDetailsForm.get('insufficiencyComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('insufficiencyComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('insufficiencyComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('grade')!.clearValidators();
      this.verifiedDetailsForm.get('grade')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('gradingComments')!.clearValidators();
      this.verifiedDetailsForm.get('gradingComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('interimOrFinal')!.clearValidators();
      this.verifiedDetailsForm.get('interimOrFinal')!.updateValueAndValidity({emitEvent:true})
      // this.verifiedDetailsForm.get('mode')!.clearValidators();
      // this.verifiedDetailsForm.get('mode')!.updateValueAndValidity({emitEvent:true})
    }else if(this.verifiedDetailsForm.get('status')!.value=='ON-HOLD' ){
      this.verifiedDetailsForm.get('onHoldComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('onHoldComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('onHoldComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('grade')!.clearValidators();
      this.verifiedDetailsForm.get('grade')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('gradingComments')!.clearValidators();
      this.verifiedDetailsForm.get('gradingComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('interimOrFinal')!.clearValidators();
      this.verifiedDetailsForm.get('interimOrFinal')!.updateValueAndValidity({emitEvent:true})
      // this.verifiedDetailsForm.get('mode')!.clearValidators();
      // this.verifiedDetailsForm.get('mode')!.updateValueAndValidity({emitEvent:true})
    }else if(this.verifiedDetailsForm.get('status')!.value=='UPDATE-LHS' ){
      this.verifiedDetailsForm.get('updateLhsComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('updateLhsComments')!.setValidators([Validators.required]);
      this.verifiedDetailsForm.get('updateLhsComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('grade')!.clearValidators();
      this.verifiedDetailsForm.get('grade')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('gradingComments')!.clearValidators();
      this.verifiedDetailsForm.get('gradingComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('interimOrFinal')!.clearValidators();
      this.verifiedDetailsForm.get('interimOrFinal')!.updateValueAndValidity({emitEvent:true})
      // this.verifiedDetailsForm.get('mode')!.clearValidators();
      // this.verifiedDetailsForm.get('mode')!.updateValueAndValidity({emitEvent:true})
    }else if(this.verifiedDetailsForm.get('status')!.value=='DRAFT' ){
      this.verifiedDetailsForm.get('updateLhsComments')!.clearValidators();
      this.verifiedDetailsForm.get('updateLhsComments')!.clearValidators();
      this.verifiedDetailsForm.get('updateLhsComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('grade')!.clearValidators();
      this.verifiedDetailsForm.get('grade')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('gradingComments')!.clearValidators();
      this.verifiedDetailsForm.get('gradingComments')!.updateValueAndValidity({emitEvent:true})
      this.verifiedDetailsForm.get('interimOrFinal')!.clearValidators();
      this.verifiedDetailsForm.get('interimOrFinal')!.updateValueAndValidity({emitEvent:true})
      // this.verifiedDetailsForm.get('mode')!.clearValidators();
      // this.verifiedDetailsForm.get('mode')!.updateValueAndValidity({emitEvent:true})
    }
  }
  
  insuffSelectionChanged(event: any): void {
    const selectedValue = event.value;
    // Perform any necessary actions based on the selected value
    // For example, you can update other form controls or trigger specific behavior
    console.log('Selected InsuffType:', selectedValue);
    // Add your custom logic here
  }
  ///18Aug2023
  // categorySelectionChanged(event: any): void {
  //   const categoryselectedValue = event.value;
  //   console.log('Selected category:', categoryselectedValue);
  // }
  ////

  saveStatusButtonClicked(){
    console.log("Info",);
    
    let verifiedData:any = this.verifiedDetailsForm.getRawValue();
    verifiedData.case_id = this.case_id;
    verifiedData.gradingComments = verifiedData.gradingComments.name? verifiedData.gradingComments.name: verifiedData.gradingComments
    verifiedData.insufficiencyComments =  verifiedData.insufficiencyComments.name?  verifiedData.insufficiencyComments.name: verifiedData.insufficiencyComments
    verifiedData.selectedValue
    verifiedData.verificationcost
    // verifiedData.shortdescription
    verifiedData._id = this._id;
    console.log("all Data",verifiedData)
    this.componentDataService.updateVerificationStatus(this.componentName,verifiedData).subscribe(
      response=>{
        // this.componentDataService.insuffRaisedEmailTrigger(verifiedData.case_id, {componentName:this.componentName, insufficiencyComments:verifiedData.insufficiencyComments}).subscribe(data => {
        //   this.showMessage("mail sent successfully");
        // });
        this.showMessage("Data Saved");
        this.router.navigate(["home/verification/analystlistofchecks"])
        this.location.back();
      },
      error=>{
        console.log(error)
        this.showError(error.error.error);
      }
    )

  }
  uploadFile(){
    this.fileUploadForm.get('fileTitle')!.setValue(this.fileUploadForm.get('fileTitle')!.value.replace("'"," "))
    this.fileUploadForm.get('fileTitle')!.setValue(this.fileUploadForm.get('fileTitle')!.value.trim())
    this.fileUploadForm.get('fileTitle')!.setValue(this.fileUploadForm.get('fileTitle')!.value.replace(" ","_"))
    let componentData:any = ({

    })
    componentData['_id'] = this._id;
    componentData['case_id']= this.case_id;
    componentData['caseId'] = this.caseId;
    componentData['fileName'] = this.fileUploadForm.get('fileTitle')!.value;
    if (this.fileUploadForm.get('fileType')!.value === "PROOFOFWORK") {
      this.componentDataService.uploadProofOfWork(this.componentName,componentData,this.fileUploadForm.get('proofOfWorkFile')!.value.files[0]).subscribe(
        (response: any)=>{
          this.showMessage("File Uploaded");
          this.proofsUploaded.push(this.fileUploadForm.get('fileTitle')!.value);
          this.fileUploadForm.reset();
        },
        (      error: any)=>{
          this.showError("Error uploading the file");
        }
      )
    }

    if (this.fileUploadForm.get('fileType')!.value === "CANDIDATEDOCS") {
      this.componentDataService.uploadCandidateDocs(this.componentName,componentData,this.fileUploadForm.get('proofOfWorkFile')!.value.files[0]).subscribe(
        (response: any)=>{
          this.showMessage("File Uploaded");
          this.candidateDocuments.push(this.fileUploadForm.get('fileTitle')!.value);
          this.fileUploadForm.reset();
        },
        (      error: any)=>{
          this.showError("Error uploading the file");
        }
      )
    }
  }

  ////new code added

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name.split('.')[0].replace(/'/g, " ").trim().replace(/ /g, "_");
    this.fileUploadForm.get('fileTitle')?.setValue(fileName);
    // this.fileUploadForm.get('proofOfWorkFile')?.setValue({ files: [file] });
  }
}

uploadCandidateDocFile() {
  const componentData: any = {
    _id: this._id,
    case_id: this.case_id,
    caseId: this.caseId,
    fileName: this.fileUploadForm.get('fileTitle')!.value
  };

  const file = this.fileUploadForm.get('proofOfWorkFile')!.value.files[0];
  this.componentDataService.uploadCandidateDocs(this.componentName, componentData, file).subscribe(
    (response: any) => {
      this.showMessage("File Uploaded");
      this.candidateDocuments.push(componentData.fileName);
      this.fileUploadForm.reset();
    },
    (error: any) => {
      this.showError("Error uploading the file");
    }
  );
}

uploadProofOfWorkFile() {
  const componentData: any = {
    _id: this._id,
    case_id: this.case_id,
    caseId: this.caseId,
    fileName: this.fileUploadForm.get('fileTitle')!.value
  };

  const file = this.fileUploadForm.get('proofOfWorkFile')!.value.files[0];
  this.componentDataService.uploadProofOfWork(this.componentName, componentData, file).subscribe(
    (response: any) => {
      this.showMessage("File Uploaded");
      this.proofsUploaded.push(componentData.fileName);
      this.fileUploadForm.reset();
    },
    (error: any) => {
      this.showError("Error uploading the file");
    }
  );
}

  closeCandidateDocsDialog(){
    this.showCandidateDocsDialog = false;
  }
  closeProofOfWorkDocsDialog(){
    this.showProofOfWorkDialog = false;
  }
  backButtonClicked(){
    this.location.back();
  }
  allocateButtonClicked(){
    if(this.allocateTo==null){
      this.showError("Select who do you want to allocate to");
    }else{
      if(this.allocateTo == 'FE'){
        let componentData = ({
          status:'ALLOCATE-TO-FE',
          case_id:this.case_id,
          _id:this._id
        })
        this.componentDataService.putItToFeBucket(this.componentName,componentData).subscribe(
          (          response: any)=>{
            this.showMessage("Allocated to FE");
            this.location.back();
          },
          (          error: any)=>{
            //console.log(error);
            this.showError("Error Allocating to FE");
          }
        )

      }else if(this.allocateTo == 'VENDOR'){
        let componentData = ({
          status:'ALLOCATE-TO-VENDOR',
          case_id:this.case_id,
          _id:this._id
        })
        this.componentDataService.putItToVendorBucket(this.componentName,componentData).subscribe(
          response=>{
            this.showMessage("Allocated to Vendor");
            this.location.back();
          },
          error=>{
            //console.log(error);
            this.showError("Error Allocating to Vendor");
          }
        )
      }

    }

  }
  historyClicked(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.height = '600px'
    dialogConfig.width = '1024px' 
    //console.log("Dialog Ref Contains  ",dialogConfig)
    dialogConfig.data = {
      case_id:this.case_id,
      component_id:this.component_id,
      _id:this._id
    }
    const dialogRef = this.dialog.open(HistoryDialogComponent,dialogConfig);
  }
  downloadCDF
  (fileName: string) {
    
    const componentData = {
      caseId: this.caseId,
      _id: this._id
    };
    console.log("ANy thing",componentData);
    this.componentDataService.downloadCanDox( this.componentName ,componentData, fileName).subscribe(
        (response: HttpResponse<Blob>) => {
            if (response.body) {
                console.log("response", response.body.type);

                    FileSaver.saveAs(response.body, fileName + "." + (response.body.type.includes("msword") ? "doc" : ""));
              
            } else {
                // Handle the case when response.body is null
                console.error("Received null response body");
            }
        },
        error => {
            this.showError(error.error.message);
        }
    );
    
  // this.caseUploadService.downloadCaseFileForCDF(this.caseId).subscribe(
  //   (response:any)=>{
  //     FileSaver.saveAs(response.body,`${this.caseId}_${this.candidateName}_candidate_docs.zip`);
  //   },
  //   error=>{
  //     //console.log(error);
  //   }
  // );
}
  //28-march23
  downloadFile(){
    this.clientContractService.downloadSowFile(this.client_id).subscribe(
      (response:any)=>{
        FileSaver.saveAs(response.body,`sow.pdf`)
      },
      error=>{
        console.log(error);
        this.showError("Error Downloading ");
      }
    )
  }
//28-march23

  // downloadlhsRhs(){
  //   console.log("Export to xls button clicked")
  //   this.caseUploadService.exportComponentData(this.case_id, this.componentName).subscribe(
  //     (response:HttpResponse<Blob>)=>{
  //       console.log(response);
  //       FileSaver.saveAs(response.body,`fields_report.xlsx`);
  //     },
  //     error=>{
  //       console.log("Error in downloading fields_report report",error)
  //       this.showError("Error downloading fields_report report")
  //     }
  //   );

  // }

  downloadlhsRhs() {
    console.log("Export to xls button clicked")
    this.caseUploadService.exportComponentData(this.case_id, this.componentName).subscribe(
      (response:any) => {
        console.log(response);
        const fields = response;
        
        let tableHtml = `
        <table style="border-collapse: collapse; width: 45%; font-family: Arial, sans-serif;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Field</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Details Provided</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Details Verified</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      fields.forEach((item: { [x: string]: any; field: any; }, index: number) => {
        // Alternate row colors
        const rowColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
      
        tableHtml += `
          <tr style="background-color: ${rowColor};">
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.field}</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item['details-provided']}</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item['details-verified']}</td>
          </tr>
        `;
      });
      
      tableHtml += `
          </tbody>
        </table>
      `;
        
        const div = document.createElement('div');
        div.innerHTML = tableHtml;
        
        // Append the div to the document body
        document.body.appendChild(div);
        
        const range = document.createRange();
        range.selectNode(div);
        window.getSelection()!.removeAllRanges();
        window.getSelection()!.addRange(range);
        
        try {
          document.execCommand('copy');
          console.log('Table copied to clipboard.');
        } catch (error) {
          console.error('Failed to copy table:', error);
        } finally {
          // Remove the appended div from the document body
          document.body.removeChild(div);
        }

      },
      error => {
        console.log("Error in downloading fields_report report", error)
        this.showError("Error downloading fields_report report")
      }
    );

  }



  addNote(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    //console.log("Dialog Ref Contains  ",dialogConfig)
    const dialogRef = this.dialog.open(AddNoteDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      response=>{
        if(response != null){
          //console.log("Note to add ",response);
          let componentData = ({
            case_id : this.case_id,
            _id : this._id,
            note:response.note,
            effortType:response.effortType,
            nextfollowupdate:response.nextfollowupdate,
            expectedclosuredate:response.expectedclosuredate
          })
          console.log("Comp Id",componentData)
           this.componentDataService.addNote(this.componentName,componentData).subscribe(
             (            response: any)=>{
              this.showMessage("Note Added")
            },
             (            error: { error: { message: any; }; })=>{
              console.log(error)
              this.showError(error.error.message);
            }
          )
        }
      }
    )
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));

  }

  displayFn1(option1: any): string {
    return option1 && option1.name ? option1.name : '';
  }
  private _filter1(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options1.filter(option1 => option1.name.toLowerCase().includes(filterValue));

  }
  // addGrammarly() {
  //   Grammarly.init("client_4dt6PwTScrQ3bX8cZvGePj")
  //     .then((grammarly: { addPlugin: (arg0: any, arg1: { autocomplete: string; suggestionCards: string; documentDialect: string; activation: string; documentDomain: string; introText: string; underlines: string; userFeedback: string; toneDetector: string; suggestionCategories: { conjunctionAtStartOfSentence: string; fluency: string; informalPronounsAcademic: string; missingSpaces: string; nounStrings: string; oxfordComma: string; sentenceVariety: string; vocabulary: string; variety: string; }; }) => void; }) => {

  //       grammarly.addPlugin(
  //         document.querySelector(".grammarly"),
  //         {
  //           autocomplete: "on", suggestionCards: "on", documentDialect: "indian", activation: "focus",
  //           documentDomain: 'business', introText: "Welcome to Grammarly for Vibe, This platform will help you write your comments better so please make sure to use it frequently.",
  //           underlines: 'on', userFeedback: 'off', toneDetector: 'on', suggestionCategories: {
  //             conjunctionAtStartOfSentence: 'on',
  //             fluency: 'on',
  //             informalPronounsAcademic: 'on',
  //             missingSpaces: 'on',
  //             nounStrings: "on",
  //             oxfordComma: "on",
  //             sentenceVariety: 'on',
  //             vocabulary: 'on',
  //             variety: 'on'
  //           }
  //         },

  //       );
  //     })
  // }

  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }


  ///////
    //education
    getEducationInstitutions(institution:string) {
      console.log("Education :",this.educationmasters)
      if (this.componentName === 'education' || 
    this.componentName === 'educationcomprehensive' || 
    this.componentName === 'educationadvanced') {
        this.showeducationMasters=true;
      }
      // console.log("componentFields Are",this.componentFields)
      this.componentDataService.searchInstitutionsFromMasters(this.componentName,institution).subscribe(
        (        response: any[]) => {
          this.educationmasters = response
          console.log("Education :",this.educationmasters)
        },
        (        error: { error: { error: any; }; }) => {
          this.showError(error.error.error)
        }
      )
    }
  //education
  //servetel Call
  clicktocall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    const dialogRef = this.dialog.open(ServetelCallsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      response=>{
        if(response != null){
          let callerData = ({
            caseId : this.caseId,
            componentId : this._id,
            componentName : this.componentName,
            agentnumber:response.agentnumber,
            destinationnumber:response.destinationnumber,
          })
          console.log("Caller DAta",callerData)
           this.componentDataService.clickToCall(callerData).subscribe(
             (            response: any)=>{
              this.showMessage("Servetel Started")
            },
             (            error: { error: { message: any; }; })=>{
              console.log(error)
              this.showError(error.error.message);
            }
          )
        }
      }
    )



  }

   // <!--Anil 9/30/2023 start-->

   onEmail(){

    this.emailTemplateService.findOne('60f53b32ff55047d921e90aa').subscribe(
      response=>{
        
     const dataToSend = {caseId:this.caseId,emailTemplate: response, componentFieldsLhs: this.componentFieldsLhs, componentFieldsRhs: this.componentFieldsRhs, componentFiledsValues:this.componentFieldsValues,candidateDocs:this.candidateDocuments,componentName:this.componentName,componentDocId:this._id }; // Replace with your data
     const dialogRef = this.dialog.open(EmailComponent, {
       data: dataToSend
     });
   
     dialogRef.afterClosed().subscribe(result => {
       // Handle any result from the dialog if needed
       console.log('Dialog result:', result);
       this._EmailCandidateDataService.emailStatus$.subscribe((status) => {
        this.emailIsBeingSent = status;
      });


     });
      },
      error=>{
        this.showError('Error reading Email Template')
      }
    )

  }

  getHistoryDetails(){
    if(this.component_id !== null && this._id !== null){
      this.historyService.getCheckHistory(this.case_id,this.component_id,this._id).subscribe(
        response=>{
          console.log("Got History ",response)
          this.dataSourceHistory = response
        },
        error=>{
          console.log("Error ",error)
        }
      )
    }else{
      this.historyService.getCaseHistory(this.case_id).subscribe(
        response=>{
          //console.log("trying to get for the case ",response)
          this.dataSourceHistory = response
        },
        error=>{
          console.log("Error ",error)
        }
      )
    }
  }

  addNoteSelectionChanged(event: any): void {
    console.log("Status selected is ",this.addNoteForm.get('effortType')?.value);
    this.effortType = event.value
    console.log("Effort type: ", event.value)
  }
  statusEffortSelectionChanged(event: any) {
    console.log("In status selection changed");
    console.log("Status selected is ", this.addNoteForm.get('effortType')?.value);
  
    this.effortType = event.target.value;
    console.log("Effort type: ", event.target.value);
  }
  

  isSaveButtonDisabled(): boolean {
    const selectedStatus = this.verifiedDetailsForm.get('status')!.value;
    const isFormInvalid = this.verifiedDetailsForm.invalid;
  
    // Disable the button if selectedStatus is null, an empty string, or if VERIFICATION-COMPLETED and form is invalid
    return selectedStatus === null || selectedStatus === '' || (selectedStatus === 'VERIFICATION-COMPLETED' && isFormInvalid);
    // Use the non-null assertion (!) to tell TypeScript that this.verifiedDetailsForm is not null
    // const verify = this.verifiedDetailsForm.getRawValue();
    // // console.log("alll",verify);
    // // console.log("status",verify.status);
    // const selectedStatus = verify.status
    // const isFormInvalid = this.verifiedDetailsForm!.invalid;
  
    // // Disable the button if selectedStatus is null, an empty string, or if VERIFICATION-COMPLETED and form is invalid
    // return selectedStatus === null || selectedStatus === '' || (selectedStatus === 'VERIFICATION-COMPLETED') ;

}

  QuickNote(){
    console.log(this.case_id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px'
    dialogConfig.width = '800px'


    dialogConfig.data = {
      case_id :this.case_id,
      _id:this._id,
      componentName:this.componentName,
      component_id: this.component_id
 
    }
    console.log("case id",this.case_id)
    // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
    const dialogRef = this.dialog.open(QuicknoteComponent,dialogConfig);


 
  }
 fieldHistory(){
    console.log(this.case_id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = '800px'
    // dialogConfig.width = '800px'


    dialogConfig.data = {
      case_id :this.case_id,
      _id:this._id,
      componentName:this.componentName
 
    }
    console.log("case id",this.case_id)
    // const dialogRef = this.dialog.open(ChatBoxComponent,dialogConfig);
    const dialogRef = this.dialog.open(CheckFieldHistoryComponent,dialogConfig);


 
  }
  getClassToApply(){
    // let colorType = this.comments? this.comments.colorType : ""
    let colorType = this.colorType
  if(colorType === "RED"){
    return 'red'
  }else if(colorType === "VIOLET"){
    return 'Violet'
  }else if(colorType === "INDIGO"){
    return 'Indigo'
  }else if(colorType === "BLUE"){
    return 'Blue'
  }else if(colorType === "GREEN"){
    return 'Green'
  }else if(colorType === "YELLOW"){
    return 'Yellow'
  }else if(colorType === "ORANGE"){
    return 'Orange'
  }else if(colorType === "PINK"){
    return 'Pink'
  }else if(colorType === "GREY"){
    return 'Grey'
  }else if(colorType === "PURPLE"){
    return 'Purple'
  }else{
      return '#ED7014'
    }
  }

  okButtonClicked(){
    // this.dialogRef.close({note:this.note, effortType:this.effortType})
    let componentData = ({
      case_id : this.case_id,
      _id : this._id,
      note:this.note,
      effortType:this.effortType
    })
    console.log("@@",componentData);
    
     this.componentDataService.addNote(this.componentName,componentData).subscribe(
      response=>{
        // this.historyClicked()
        this.showMessage("Note Added")
                        // Add the new row to the data source

      },
      error=>{
        console.log(error)
        this.showError(error.error.message);
      }

    )
  }

  // new auto populate 
  copyLHS_TO_RHS() {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    
    Object.keys(this.providedDetailsForm.controls).forEach(key => {
        const control = this.providedDetailsForm.get(key);
        if (control) { // Check if control is not null
            this.verifiedDetailsForm.get(key + 'Rhs')?.setValue(control.value);
        }
    });
}

cdelink(){
  this.caseUploadService.cdelink(this.case_id).subscribe(
    response=>{
      this.showMessage("Sent email successfully");

            },
    error=>{
      this.showError("Error sending Email ")
    }
  )

}

UpdateLhsClicked(){
  console.log("clicked");
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.height = '600px'
    dialogConfig.width = '1024px';
    dialogConfig.data = {
      value: 'Data from Verification'
    }
    const dialogRef = this.dialog.open(LhsPopupComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result=>{
      if(result.event=='confirmed'){
        console.log("result.event",result.event);
        
        this.ngOnInit() 
      }
    })  
  // this.componentDetailsForVerificationService.setVerificationItem();
  
}
// venky 10/10
employmentInfoClicked(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus= true;
  dialogConfig.height = '450px'
  dialogConfig.width = '1000px';
  //console.log("Dialog Ref Contains  ",dialogConfig)
  console.log('employer Name:', this.employername);
  dialogConfig.data = {
    compName:this.componentName,
    employername:this.employername,
    institutename: this.institutename,
  }
  console.log()
  const dialogRef = this.dialog.open(EmploymentInfoComponent,dialogConfig);
}


uploadMultipleFiles(fileType: string) {
  const files: FileList = this.fileUploadForm.get('proofOfWorkFile')!.value.files;

  if (!files || files.length === 0) {
    this.showError("Please select at least one file to upload");
    return;
  }

  Array.from(files).forEach((file: File) => {
    const componentData: any = {
      _id: this._id,
      case_id: this.case_id,
      caseId: this.caseId,
      fileName: file.name  // use the file's actual name
    };

    if (fileType === "PROOFOFWORK") {
      this.componentDataService.uploadProofOfWork(this.componentName, componentData, file).subscribe(
        (response: any) => {
          this.showMessage(`File "${file.name}" uploaded successfully`);
          this.proofsUploaded.push(file.name);
        },
        (error: any) => {
          this.showError(`Error uploading file: ${file.name}`);
        }
      );
    }

    if (fileType === "CANDIDATEDOCS") {
      this.componentDataService.uploadCandidateDocs(this.componentName, componentData, file).subscribe(
        (response: any) => {
          this.showMessage(`File "${file.name}" uploaded successfully`);
          this.candidateDocuments.push(file.name);
        },
        (error: any) => {
          this.showError(`Error uploading file: ${file.name}`);
        }
      );
    }
  });

  this.fileUploadForm.reset();
}

viewCaseStatus(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '90%';
  dialogConfig.height = '90%';
  dialogConfig.data = {
    case_id: this.case_id,
    caseId: this.caseId,
    candidateName: this.candidateName,
    clientName: this.clientName,
    subclientName: this.subclientName
  };

  const dialogRef = this.dialog.open(CaseStatusPopupComponent, dialogConfig);
}

downloadcdfFile(fileName: string){
  this.displayedProofOfWorkDocName = fileName;
  const componentDetails = {
      caseId: this.caseId,
      _id: this._id
  };

  this.componentDataService.downloadcdf( componentDetails, fileName).subscribe(
      (response: HttpResponse<Blob>) => {
          if (response.body) {
              console.log("response", response.body.type);

                  FileSaver.saveAs(response.body, fileName + (response.body.type.includes("msword") ? "doc" : ""));
            
          } else {
              // Handle the case when response.body is null
              console.error("Received null response body");
          }
      },
      error => {
          this.showError(error.error.message);
      }
  );
}
}
