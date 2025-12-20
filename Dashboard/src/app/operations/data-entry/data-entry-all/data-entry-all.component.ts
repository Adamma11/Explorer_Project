
//////////////////////////new 15Oct2024////////
import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { CaseDetailsForDataEntryNewService } from '../service/case-details-for-data-entry-new.service';
import * as FileSaver from 'file-saver';
import { PersonalDetailsDataService } from '../service/personal-details-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonalDetailsField } from 'src/app/administration/model/personal-details-field';
import { PersonalDetailsService } from 'src/app/administration/service/personal-details.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { CompanyService } from 'src/app/masters/service/company.service';
import { UniversityService } from 'src/app/masters/service/university.service';
import { ComponentDataService } from '../service/component-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { compilePipeFromMetadata, isNgTemplate } from '@angular/compiler';
import { resolve } from 'dns';
// import { promise } from 'protractor';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AllComponentsDataService } from '../service/all-components-data.service';
import { Observable } from 'rxjs';
import { DeConfirmDialogComponent } from '../de-confirm-dialog/de-confirm-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { EmpInfoComponent } from '../emp-info/emp-info.component';
import { ChatboxComponent } from 'src/app/chatbox/chatbox.component';
import { ChangeDetectorRef } from '@angular/core';
import { SharedFieldService } from '../../service/shared-field.service';
import { ComponentScopeComponent } from '../component-scope/component-scope.component';
import { FilePreviewDialogComponent } from 'src/app/shared/file-preview-dialog/file-preview-dialog.component';



@Component({
  selector: 'app-data-entry-all',
  templateUrl: './data-entry-all.component.html',
  styleUrls: ['./data-entry-all.component.scss']
})
export class DataEntryAllComponent {
     selectedCDFFile: File | null = null; ///line added oct-30
 previewFile: any = null; // line added oct -13
  panelOpenState = false;
  sharedFields: any = {};
  searchControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  displayName!: string;
  isEditing: boolean = false; 
  isemployeeIdEditing: boolean = false; 
  // personalDetailsFields!: PersonalDetailsField[];
  personalDetailsFields: any[] = [];
  personalDetails_id: string = ''
  selectedFileType! : string;
  case_id: string = ''
  caseId!: string;
  _id:string='';
  showDocumentDialog:boolean=false;
  documentBlob!: Blob;
  displayedDocumentName!: string;
  candidateName!: string;
  clientName!: string;
  subclientName!: string;
  mode!: any;
  client_id!: string;
  subclient_id!: string;
  employeeId!: string;
  initiationDate!:string;
  tatEndDate!:string;
  educationmasters: any
  empName: any = [];
  insuffcomment: any = [];
  @Input() selectedRow:any;
  personalDetailsInputqcStatus!: string;
  personalDetailsInputqcComments!: string;
  personalDetailsDataEntryForm!:FormGroup;
  tatDetailsForm!:FormGroup;

  displayedProofOfWorkDocName!: string;

  proofsUploaded!: string[];
  // loaForm = new FormGroup({
  //   loaFile: new FormControl(''),
  //   fileName: new FormControl('')
  // })
  loaForm: FormGroup;
  loaFiles: any[] = [];
  
  //  fgs:FormGroup[]=[];
  initialComponents: any[] = [];
  requiredComponents: any[] = [];

  inputqcStatus: any[] = [];
  isLoading!: boolean;
  filteredCompanies!: any[];
  filteredUniversities!: any[];

  errorMsg!: string;
  constructor(
    private caseUploadService: CaseUploadService,
    private personalDetailsDataService: PersonalDetailsDataService,
    private caseDetailsForDataEntryNewService: CaseDetailsForDataEntryNewService,
    private personalDetailsService: PersonalDetailsService,
    private componentService: ComponentService,
    private componentDataService: ComponentDataService,
    private companyService: CompanyService,
    private universityService: UniversityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private datePipe: DatePipe,
    private allComponentService: AllComponentsDataService,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private sharedFieldService: SharedFieldService


  ) { 
    this.loaForm = new FormGroup({
      loaFile: new FormControl(''),
      fileName: new FormControl('')
    })

    this.personalDetailsDataEntryForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      insufficiencyComments: new FormControl(''),
    })

    ////tat Dates //
    this.tatDetailsForm = new FormGroup({
      candidateName: new FormControl(this.candidateName || ''),  // Default to empty string if null
      employeeId: new FormControl(this.employeeId || ''),        // Default to empty string if null
      initiationDate: new FormControl(this.initiationDate || ''),
      tatEndDate: new FormControl(this.tatEndDate || '')

    })
  }
      ngOnChanges(){
      this.readCompChange();
    }


ngOnInit(): void{
  ////sharath///
    const caseDetails=this.caseDetailsForDataEntryNewService.getCaseDetails();
  if(!caseDetails||!caseDetails.case_id){
    this.router.navigate(['/home/operations/dataentry/decaselist']);
    return;
  }
    ////sharath///

  this.readComp();

    /// new line added
  this.HandleTatEndDateChanges();
  
}

///tat date auto save..

HandleTatEndDateChanges() {
  this.tatDetailsForm.get('tatEndDate')?.valueChanges.subscribe(value => {
    if (value) {
      console.log('tatEndDate changed:', value);
      this.saveTat();
    }
  });
}

  private readComp(){
    this.caseId = this.caseDetailsForDataEntryNewService.getCaseDetails().caseId;
    this.candidateName = this.caseDetailsForDataEntryNewService.getCaseDetails().candidateName;
    this.clientName = this.caseDetailsForDataEntryNewService.getCaseDetails().clientName;
    this.subclientName = this.caseDetailsForDataEntryNewService.getCaseDetails().subclientName;
    this.case_id = this.caseDetailsForDataEntryNewService.getCaseDetails().case_id;
    this.client_id = this.caseDetailsForDataEntryNewService.getCaseDetails().client_id;
    this.subclient_id = this.caseDetailsForDataEntryNewService.getCaseDetails().subclient_id;
    this.employeeId = this.caseDetailsForDataEntryNewService.getCaseDetails().employeeId;
    this.tatEndDate = this.caseDetailsForDataEntryNewService.getCaseDetails().tatEndDate;
    this.initiationDate = this.caseDetailsForDataEntryNewService.getCaseDetails().initiationDate;
    console.log("initiationDate:", this.initiationDate, this.tatEndDate)
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
// console.log("test",this.mode);

    this.initialComponents = this.caseDetailsForDataEntryNewService.getCaseDetails().requiredComponents;

    //    this.enteredComponents = this.caseDetailsForDataEntryNewService.getCaseDetails().requiredComponents;


    this.prepareFormForComponents();
    //    this.prepareFormForComponents();  
    if (this.case_id != null) {
      this.personalDetailsService.find().subscribe(
        response => {
          this.displayName = response[0].displayName;
          this.personalDetailsFields = response[0].personalDetailsFields;
          this.readPersonalDetails();
          this.addFormControlsForPersonalDetails();
          
        },
        error => {
          this.showError("Error reading personal Deails");
        }
      )
      //console.log("In modify");
      //      this.readComponentDetails();
    } else {
      this.personalDetailsService.find().subscribe(
        response => {
          this.displayName = response[0].displayName;
          this.personalDetailsFields = response[0].personalDetailsFields;
          this.addFormControlsForPersonalDetails();
        },
        error => {
          this.showError("Error Configuring Personal Details");
        }
      )
    }

    //    this.getRequiredComponentFields();
    this.readProofOfWork()

  }

  private readCompChange(){
    this.caseId = this.caseDetailsForDataEntryNewService.getCaseDetails().caseId;
    this.candidateName = this.caseDetailsForDataEntryNewService.getCaseDetails().candidateName;
    this.clientName = this.caseDetailsForDataEntryNewService.getCaseDetails().clientName;
    this.subclientName = this.caseDetailsForDataEntryNewService.getCaseDetails().subclientName;
    this.case_id = this.caseDetailsForDataEntryNewService.getCaseDetails().case_id;
    this.client_id = this.caseDetailsForDataEntryNewService.getCaseDetails().client_id;
    this.subclient_id = this.caseDetailsForDataEntryNewService.getCaseDetails().subclient_id;
    this.employeeId = this.caseDetailsForDataEntryNewService.getCaseDetails().employeeId;
    console.log("dagsdjgasdg", this.caseDetailsForDataEntryNewService.getCaseDetails().employeeId)
    this.tatEndDate = this.caseDetailsForDataEntryNewService.getCaseDetails().tatEndDate;
    this.initiationDate = this.caseDetailsForDataEntryNewService.getCaseDetails().initiationDate;
    console.log("initiationDate:", this.initiationDate, this.tatEndDate)
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
// console.log("test",this.mode);

    this.initialComponents = this.caseDetailsForDataEntryNewService.getCaseDetails().requiredComponents;

    //    this.enteredComponents = this.caseDetailsForDataEntryNewService.getCaseDetails().requiredComponents;


    // this.prepareFormForComponents();
    //    this.prepareFormForComponents();  
    if (this.case_id != null) {
      this.personalDetailsService.find().subscribe(
        response => { 
          this.displayName = response[0].displayName;
          this.personalDetailsFields = response[0].personalDetailsFields;
          this.readPersonalDetails();
          this.addFormControlsForPersonalDetails();
          
        },
        error => {
          this.showError("Error reading personal Deails");
        }
      )
      //console.log("In modify");
      //      this.readComponentDetails();
    } else {
      this.personalDetailsService.find().subscribe(
        response => {
          this.displayName = response[0].displayName;
          this.personalDetailsFields = response[0].personalDetailsFields;
          this.addFormControlsForPersonalDetails();
        },
        error => {
          this.showError("Error Configuring Personal Details");
        }
      )
    }

    //    this.getRequiredComponentFields();
    this.readProofOfWork()

  }
  readProofOfWork(){
    this.proofsUploaded=[]
    this.componentDataService.readcdf(this.caseId).subscribe(
      response=>{
        console.log('response from read proof of works ',response);
        this.proofsUploaded = response;
      },
      error=>{
        //console.log(error);
      }
    )
  }

  prepareFormForComponents() {
    this.fillRequiredComponents()
  }
  async fillRequiredComponents() {
    //console.log("in fillRequiredComponents");
    for (let i = 0; i < this.initialComponents.length; i++) {
      let item = this.initialComponents[i];
      //console.log("initial components item is ",item);
      this.requiredComponents.push(await this.callComponentService(item));
      //        //console.log('now  required components contains ',this.requiredComponents);
    }
    //console.log("size of required components ",this.requiredComponents.length);
    //console.log("required components array now  is ",this.requiredComponents);
    //console.log("Initial components array   is ",this.initialComponents);
  }
  async callComponentService(item: any) {
    try {
      let enteredChecks = new Array<any>();

      const response = await this.componentService.findAComponent(item.component).toPromise();
      const checkDataResponse = await this.componentDataService.findAllForACase(response.name, this.case_id).toPromise();

      if (checkDataResponse && checkDataResponse.length > 0) {
        for (let checkData of checkDataResponse) {
          let readFiles = await this.componentDataService.readFileNames(response.name, this.caseId, checkData._id).toPromise();

          item["componentFields"] = response.componentFields;
          item["displayName"] = response.displayName;
          item["fileUploadRequired"] = response.fileUploadRequired;
          item.componentName = response.name;

          let compForm: any = new FormGroup({
            status: new FormControl('', [Validators.required]),
            insufficiencyComments: new FormControl(''),
          });

          response.componentFields.forEach((componentField: any) => {
            const control = new FormControl('');
            compForm.addControl(componentField.name, control);

            // Auto-fill logic for shared fields
            const sharedValue = this.sharedFieldService.getFieldValue(componentField.name);
            if (sharedValue) {
              control.setValue(sharedValue);
            }

            // Subscribe to form control value changes to update shared fields
            control.valueChanges.subscribe((value: any) => {
              this.sharedFieldService.updateSharedField(componentField.name, value);
            });

            if (componentField.type === 'AC-UNI') {
              this.addUniversityChangeListener(control);
            } else if (componentField.type === 'AC-COM') {
              this.addCompanyChangeListener(control);
            }
          });

          if (item.fileUploadRequired) {
            compForm.addControl('fileName', new FormControl(''));
            compForm.addControl('componentFile', new FormControl(''));
          }

          response.componentFields.forEach((componentField: any) => {
            if (componentField.type !== "DATE") {
              compForm.get(componentField.name)?.setValue(checkData[componentField.name]);
            } else {
              let dateValue = new Date(checkData[componentField.name]);
              let formattedDate = `${dateValue.getFullYear()}-${('0' + (dateValue.getMonth() + 1)).slice(-2)}-${('0' + dateValue.getDate()).slice(-2)}`;
              compForm.get(componentField.name)?.setValue(formattedDate);
            }
          });

          let inputqcStatus = {
            status: checkData.status === 'INPUTQC-ACCEPTED' || checkData.status === 'INPUTQC-REJECTED' ? checkData.status : '',
            inputqcComments: checkData.inputqcComments || '',
          };

          let enteredCheck = {
            _id: checkData._id,
            compForm: compForm,
            files: readFiles || [],
            inputqcStatus: inputqcStatus
          };

          enteredChecks.push(enteredCheck);
        }

        item["enteredChecks"] = enteredChecks;

        let comp = {
          component: item.component,
          componentName: item.componentName,
          displayName: response.displayName,
          maxChecks: Number(item.maxChecks),
          dataEntryInstructions: item.dataEntryInstructions,
          componentFields: response.componentFields,
          enteredChecks: enteredChecks,
          fileUploadRequired: response.fileUploadRequired
        };

        return comp;
      } else {
        // Handle case where checkDataResponse is empty
        item["componentFields"] = response.componentFields;
        item["displayName"] = response.displayName;
        item["fileUploadRequired"] = response.fileUploadRequired;

        let compForm: any = new FormGroup({
          status: new FormControl('', [Validators.required]),
          insufficiencyComments: new FormControl(''),
        });

        response.componentFields.forEach((componentField: any) => {
          const control = new FormControl('');
          compForm.addControl(componentField.name, control);

          // Auto-fill logic for shared fields
          const sharedValue = this.sharedFieldService.getFieldValue(componentField.name);
          if (sharedValue) {
            control.setValue(sharedValue);
          }

          control.valueChanges.subscribe((value: any) => {
            this.sharedFieldService.updateSharedField(componentField.name, value);
          });

          if (componentField.mandatory === 'MANDATORY') {
            compForm.setValidators(Validators.required);
          }
        });

        if (item.fileUploadRequired) {
          compForm.addControl('fileName', new FormControl(''));
          compForm.addControl('componentFile', new FormControl(''));
        }

        let enteredChecks = [{
          _id: '',
          compForm: compForm,
          files: [],
          inputqcStatus: {
            status: '',
            inputqcComments: '',
          }
        }];

        item["enteredChecks"] = enteredChecks;

        let comp = {
          component: item.component,
          componentName: item.componentName,
          displayName: response.displayName,
          maxChecks: Number(item.maxChecks),
          dataEntryInstructions: item.dataEntryInstructions,
          componentFields: response.componentFields,
          enteredChecks: enteredChecks,
          fileUploadRequired: response.fileUploadRequired
        };

        return comp;
      }
    } catch (error) {
      console.error("Error in callComponentService:", error);
      throw error;
    }
  }

  readFilesForACheck(componentName:any, check_id:any) {
    let promise = new Promise((resolve, reject) => {
      this.componentDataService.readFileNames(componentName, this.caseId, check_id).subscribe(
        response => {
          resolve(response);
        },
        error => {
          reject(null);
        }

      )
    })
    return promise;
  }

    readPersonalDetails() {
      this.personalDetailsDataService.read(this.case_id).subscribe(
          response => {
              if (response) {
                  this.personalDetails_id = response._id;
                  this.personalDetailsFields.forEach(item => {
                      if (item.type != 'DATE') {
                          this.personalDetailsDataEntryForm.get(item.name)?.setValue(response[item.name]);
                      } else {
                          let dateValue = new Date(response[item.name]);
                          let dd = dateValue.getDate();
                          let mm = dateValue.getMonth() + 1;
                          let yyyy = dateValue.getFullYear().toString();
                          let stringdd = '';
                          let stringmm = ''
  
                          if (dd < 10) {
                              stringdd = '0' + dd;
                          } else {
                              stringdd = dd.toString();
                          }
                          if (mm < 10) {
                              stringmm = '0' + mm;
                          } else {
                              stringmm = mm.toString();
                          }
                          this.personalDetailsDataEntryForm.get(item.name)?.setValue(yyyy + '-' + stringmm + '-' + stringdd);
                      }
                  })
                  this.personalDetailsDataEntryForm.get('status')?.setValue(response.status);
                  this.personalDetailsDataEntryForm.get('insufficiencyComments')?.setValue(response.infsufficiencyComments);
                  this.personalDetailsInputqcStatus = response.status;
                  this.personalDetailsInputqcComments = response.inputqcComments;
              }
  
          },
          error => {
              this.showError(error.error.message);
          }
      )
  }
  
  addFormControlsForPersonalDetails() {
      // Check if personalDetailsFields is defined before proceeding
      if (this.personalDetailsFields) {
          this.personalDetailsFields.forEach(item => {
              this.personalDetailsDataEntryForm.addControl(item.name, new FormControl(''));
              if (item.mandatory) {
                  this.personalDetailsDataEntryForm.get(item.name)?.setValidators(Validators.required);
              }
          });
      } else {
          console.error("personalDetailsFields is undefined");
      }
  }
  
  /// added preview code

// previewcdfFile(fileName: string): void {
//   const componentDetails = {
//     caseId: this.caseId,
//     _id: this._id,
//     fileName
//   };

//   this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
//     (response: HttpResponse<Blob>) => {
//       if (response.body) {
//         const fileBlob = response.body;
//         const fileType = response.body.type;

//         const dialogRef = this.dialog.open(FilePreviewDialogComponent, {
//           width: '900px',
//           data: {
//                fileName,
//             fileBlob,
//             fileType,
//             componentDetails
//           }
//         });

//         dialogRef.afterClosed().subscribe(result => {
//           if (result?.delete) {
//             this.componentDataService.deleteCdf(componentDetails.caseId, componentDetails.fileName).subscribe(
//               response => {
//                 this.showMessage("File Deleted");
//               },
//               error => {
//                 this.showError("Error deleting the file");
//               }
//             );
//           }
//         });
        
//         // this.dialog.open(FilePreviewDialogComponent, {
//         //   width: '900px',
//         //   data: {
//         //     fileName,
//         //     fileBlob,
//         //     fileType,
//         //     componentDetails
//         //   }
//         // });
        
//       } else {
//         console.error("Received null response body");
//       }
//     },
//     error => {
//       this.showError(error.error.message);
//     }
//   );
// }


///new code/// added oct -15
previewcdfFile(fileName: string): void {
  const componentDetails = {
    caseId: this.caseId,
    _id: this._id
  };

  this.componentDataService.downloadcdf(componentDetails, fileName).subscribe(
    (response: HttpResponse<Blob>) => {
      if (response.body) {
        const fileBlob = response.body;
        const fileType = response.body.type;

        this.previewFile = {
          fileName,
          fileBlob,
          fileType
        };
      } else {
        console.error("Received null response body");
      }
    },
    error => {
      this.showError(error.error.message);
    }
  );
}

closePreview(): void {
  this.previewFile = null;
}


//////////////////

  downloadCandidateFile() {
    this.caseUploadService.downloadCandidateFile(this.caseId).subscribe(
      (response: HttpResponse<Blob>| any) => {
        FileSaver.saveAs(response.body, `${this.caseId}_${this.candidateName}_candidate_docs.zip`);
      },
      error => {
        //console.log(error);
      }
    );
  }


  saveData() {
    let personalDetailsData = this.personalDetailsDataEntryForm.getRawValue();
    personalDetailsData._id = this.personalDetails_id;
    personalDetailsData.case = this.case_id;
    if (this.personalDetails_id == '') {
      this.personalDetailsDataService.create(personalDetailsData).subscribe(
        response => {
          this.personalDetails_id = response._id
          this.showMessage("Personal Details Saved");
        },
        error => {
          this.showError(error.error.message);
        }
      ) 
    } else {
      this.personalDetailsDataService.update(this.personalDetails_id, personalDetailsData).subscribe(
        response => {
          this.showMessage("Personal Details Saved");
        },
        error => {
          this.showError(error.error.message);
        }
      )
    }
  }

  getFlexPercent(size: number) {
    if (size <= 30) {
      return "15%"
    } else {
      return "30%"
    }
  }

  getValues(name:any, componentIndex:any) {
    let currentComponent = this.requiredComponents[componentIndex];
    for (let field of currentComponent.componentFields) {
      if (field.name == name) {
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }
  addCompanyChangeListener(control: AbstractControl) {
    control.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredCompanies = [];
          this.isLoading = true;
        }),
        switchMap(
          value => this.companyService.searchCompanyStartingFrom(control.value == "" ? "A" : control.value)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe(data => {
        this.filteredCompanies = data;
      })
  }
  addUniversityChangeListener(control: AbstractControl) {
    control.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredUniversities = [];
          this.isLoading = true;
        }),
        switchMap(
          value => this.companyService.searchCompanyStartingFrom(control.value == "" ? "A" : control.value)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe(data => {
        this.filteredCompanies = data;
      })
  }

  async uploadFile(compIndex: any, formIndex: any) {
    try {
      if (!this.requiredComponents[compIndex]?.enteredChecks[formIndex]?._id) {
        await this.componentSaveButtonClicked(compIndex, formIndex);
      }
  
      const componentData = this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.getRawValue();
      componentData.case_id = this.case_id;
      componentData.caseId = this.caseId;
      componentData.case = this.case_id;
      componentData._id = this.requiredComponents[compIndex].enteredChecks[formIndex]._id;
  
      // Retrieve files array and assert the correct type
      const fileInput = this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.get('componentFile')?.value;
      const files = (fileInput?.files as FileList) || [];
      
      if (files.length === 0) {
        throw new Error("No files selected.");
      }
  
      // Convert FileList to File[] and handle type assertion
      const fileArray: File[] = Array.from(files);
      const fileNames = fileArray.map(file => file.name);
      componentData.fileName = fileNames.join(', '); // Handle multiple file names
      console.log("files", fileArray);
  
      // Pass the file array to the service
      this.componentDataService.uploadFile(this.requiredComponents[compIndex].componentName, componentData, fileArray).subscribe(
        response => {
          this.showMessage("File Uploaded");
  
          // Add the uploaded file names to the files array
          if (!this.requiredComponents[compIndex].enteredChecks[formIndex].files) {
            this.requiredComponents[compIndex].enteredChecks[formIndex].files = [];
          }
          this.requiredComponents[compIndex].enteredChecks[formIndex].files.push(...fileNames);
  
          // Reset the file input field
          this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.get('componentFile')?.reset();
  
          // Trigger change detection
          // this.cdr.detectChanges();
          // this.ngOnInit();
        },
        error => {
          this.showError("Error uploading the file");
        }
      );
    } catch (error) {
      console.error("Error in uploadFile function:", error);
      this.showError("An unexpected error occurred.");
    }
  }
  
  
  

  downloadCDF
  (fileName: string,compIndex:any, formIndex:any) {
    
    // console.log("@@@@@@@@",this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.getRawValue());
    console.log("Test",fileName);
    console.log("Test",this.requiredComponents[compIndex].enteredChecks);
    
    
    // this.displayedProofOfWorkDocName = fileName;
    const componentDetails = {
        caseId: this.caseId,
        componentId: this.requiredComponents[compIndex].enteredChecks[formIndex]._id,
        componentName:this.requiredComponents[compIndex].componentName
    };

    console.log("Test",componentDetails);
    // console.log("ANy thing",componentDetails);
    this.caseUploadService.downloadCaseForCDFiii( this.requiredComponents[compIndex].componentName ,componentDetails, fileName).subscribe(
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
    

}

  //18july2023
  deleteFile(fileName:any, formIndex:any) {
    /*    let componentToSave = this.fgs[formIndex].getRawValue();
    componentToSave._id = this.requiredComponents[formIndex]._id;
    componentToSave.caseId = this.caseId;       
    this.componentDataService.deleteFile(this.requiredComponents[formIndex].componentName,componentToSave,fileName).subscribe(
      response=>{
        this.showMessage(response.message);
        this.requiredComponents[formIndex].files = this.requiredComponents[formIndex].files.splice(this.requiredComponents[formIndex].files.indexOf(fileName),1);
      },
      error=>{
        this.showError(error.error.message);
      }
      )     */

  }
  deleteCDF(fileName: string,compIndex:any, formIndex:any){
    console.log(fileName,compIndex, formIndex);
    console.log(this.requiredComponents[compIndex]);
    console.log(this.requiredComponents[compIndex].componentName);
    console.log(this.requiredComponents[compIndex].enteredChecks[formIndex]._id);
    console.log(this.caseId);

    
    let componentDetails = ({
      caseId: this.caseId,
      _id: this.requiredComponents[compIndex].enteredChecks[formIndex]._id
    })
    
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete the Annexure ?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
        if(result.event=='confirmed'){
          this.componentDataService.deleteCandidatedocs(this.requiredComponents[compIndex].componentName,componentDetails,fileName).subscribe(
            response=>{
              this.showMessage("File Deleted");
              let update = this.requiredComponents[compIndex].enteredChecks[formIndex].files.filter((file:string) => file !== fileName)
              this.requiredComponents[compIndex].enteredChecks[formIndex].files = update
            },
            error=>{
              this.showError("Error deleting the file")
            }
          )
        }
      })

       
    
    }
  //New//
  componentSaveButtonClicked(compIndex: any, formIndex: any) {
    return new Promise((resolve, reject) => {
      let componentData = this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.getRawValue();
      componentData.case_id = this.case_id;
      componentData.case = this.case_id;
      componentData._id = this.requiredComponents[compIndex].enteredChecks[formIndex]._id;
      let componentName = this.requiredComponents[compIndex].componentName;
      componentData.component = this.requiredComponents[compIndex].component;
      componentData.clientId = this.client_id;
      componentData.subclientId = this.subclient_id;
      componentData.selectedValue;
      componentData.shortdescription;
  
      // If it's a new entry (create)
      if (this.requiredComponents[compIndex].enteredChecks[formIndex]._id == '') {
        if (this.personalDetails_id != null || this.personalDetails_id == '') {
          componentData.personalDetails = this.personalDetails_id;
  
          // Call create service
          this.componentDataService.create(componentName, componentData).subscribe(
            response => {
              if (componentData.status === "INSUF-1-REQ") {
                this.componentDataService.insuffRaisedEmailTrigger(componentData.case_id, { componentName, insufficiencyComments: componentData.insufficiencyComments }).subscribe(data => {
                  this.showMessage("Mail sent successfully");
                });
              }
  
              // Assign new _id to the component after save
              this.requiredComponents[compIndex].enteredChecks[formIndex]._id = response._id;
              this.showMessage("Component Saved");
  
              // Update shared fields after saving
              this.updateSharedFields(compIndex, formIndex);
  
              resolve(true);
            },
            error => {
              this.showError("Error saving component data");
              reject(false);
            }
          );
        } else {
          this.showError("Personal Details should be saved first");
        }
  
      } else {
        // Update existing component (update)
        componentData.personalDetails = this.personalDetails_id;
  
        // Call update service
        this.componentDataService.update(componentName, componentData).subscribe(
          response => {
            if (componentData.status === "INSUF-1-REQ") {
              this.componentDataService.insuffRaisedEmailTrigger(componentData.case_id, { componentName, insufficiencyComments: componentData.insufficiencyComments }).subscribe(data => {
                this.showMessage("Mail sent successfully");
              });
            }
  
            this.requiredComponents[compIndex].enteredChecks[formIndex]._id = response._id;
            this.showMessage("Component Saved");
  
            // Update shared fields after saving
            this.updateSharedFields(compIndex, formIndex);
  
            resolve(true);
          },
          error => {
            this.showError("Error saving component data");
            reject(false);
          }
        );
      }
    });
  }
  updateSharedFields(compIndex: any, formIndex: any) {
    const formData = this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.getRawValue();
  
    // Loop through each component and update shared fields
    this.requiredComponents.forEach((component, index) => {
      if (index !== compIndex) { // Skip the currently saved component
        component.componentFields.forEach((field: any) => {
          // Check if the field exists in the current form data
          if (formData[field.name]) {
            // Update shared field values using the SharedFieldService
            this.sharedFieldService.updateSharedField(field.name, formData[field.name]);
  
            // Check if the form control exists and update it
            const control = component.enteredChecks[0].compForm.get(field.name);
            if (control) {
              control.setValue(formData[field.name]);
            }
          }
        });
      }
    });
  }
    
 



    // 30Sep2024 
    //18July2023
    confirmButtonClicked(compIndex:any, formIndex:any){
      const ConfirmDialog = new MatDialogConfig();
      ConfirmDialog.disableClose = true;
      ConfirmDialog.autoFocus= true;
      ConfirmDialog.height = '200px'
      ConfirmDialog.width = '400px'
      const dialogRef = this.dialog.open(DeConfirmDialogComponent,ConfirmDialog);
      dialogRef.afterClosed().subscribe(
        result=>{
       if(result.event=='confirmed'){
         this.componentSaveButtonClicked(compIndex, formIndex);
       } 
     })
   }
   
    //18july2023
  addOneMoreComponent(compIndex:any) {
    //console.log("Entered Checks ",this.requiredComponents[compIndex].enteredChecks.length);
    //console.log("Max Checks ",this.requiredComponents[compIndex].maxChecks);
    if (this.requiredComponents[compIndex].enteredChecks.length < this.requiredComponents[compIndex].maxChecks) {
      let enteredChecks = new Array<any>();
      //console.log("Creating compForm");
      let compForm:any = new FormGroup({
        status: new FormControl('', [Validators.required]),
        insufficiencyComments: new FormControl(''),
        // shortdescription: new FormControl(''),
        // insuffType: new FormControl(''),
      })
      this.requiredComponents[compIndex].componentFields.forEach((componentField:any) => {
        compForm.addControl(componentField.name, new FormControl(''))
        if (componentField.mandatory == 'MANDATORY') {
          compForm.setValidators(Validators.required)
        }
        if (componentField.mandatory == 'FIELD-VALUE') {
          compForm.get(componentField.conditionField)?.valueChanges.subscribe(
            (response:any) => {
              if (componentField.condition == '==') {
                if (compForm.get(componentField.conditionField)?.value == componentField.conditionValue) {
                  compForm.get(componentField.name)?.setValidators([Validators.required]);
                  compForm.get(componentField.name)?.updateValueAndValidity({ emitEvent: true })
                } else {
                  compForm.get(componentField.name)?.clearValidators();
                  compForm.get(componentField.name)?.updateValueAndValidity({ emitEvent: true });
                }
              } else if (componentField.condition == '!=') {
                if (compForm.get(componentField.conditionField)?.value != componentField.conditionValue) {
                  compForm.get(componentField.name)?.setValidators([Validators.required]);
                  compForm.get(componentField.name)?.updateValueAndValidity({ emitEvent: true });
                } else {
                  compForm.get(componentField.name)?.clearValidators();
                  compForm.get(componentField.name)?.updateValueAndValidity({ emitEvent: true });
                }
              }
            },
            (error:any) => {
              //console.log("Error during value change response",error);
            }
          )
        }
        if (componentField.type == 'AC-UNI') {
          this.addUniversityChangeListener(compForm.get(componentField.name));
        } else if (componentField.type == 'AC-COM') {
          this.addCompanyChangeListener(compForm.get(componentField.name));
        }
      })

      if (this.requiredComponents[compIndex].fileUploadRequired) {
        compForm.addControl(`fileName`, new FormControl(''));
        compForm.addControl(`componentFile`, new FormControl(''));
      }
      let inputqcStatus = ({
        status: '',
        inputqcComments: '',
      })
      let enteredCheck = ({
        _id: '',
        compForm: compForm,
        files: new Array<any>(),
        inputqcStatus: inputqcStatus
      })
      this.requiredComponents[compIndex].enteredChecks.push(enteredCheck);

    } else {
      this.showError("Reached the maximum number of checks for this component");
    }
  }

  getFieldSize(personalDetailsField: PersonalDetailsField) {
    return personalDetailsField.size;
  }
  async caseSaveButtonClicked() {
    /*    let caseStatus = await this.getCaseStatus(this.fgs);
    this.caseUploadService.updateStatus(this.case_id,{status:caseStatus}).subscribe(
      response=>{
        this.showMessage("Case Status Updated");
        this.location.back();
      },
      error=>{
        this.showError(error.error);
        
      }
      )*/
  }
  getCaseStatus(formGroups: any[]) {
    let promise = new Promise(function (resolve, reject) {
      let caseStatus = 'DE-COMPLETED';
      for (let item of formGroups) {
        if (item.get('status').value != 'DE-COMPLETED') {
          caseStatus = item.get('status').value;
          break;
        }
      }
      resolve(caseStatus)
    })
    return promise;
  }
  downloadLoa(loaFile: string) {
    this.displayedDocumentName = loaFile;

    // let componentData = this.caseId;
    // componentData.case_id = this.case_id;
    // componentData.caseId = this.caseId;
    // componentData.case = this.case_id;
    // componentData._id = this.requiredComponents[compIndex].enteredChecks[formIndex]._id;
    this.caseUploadService.downloadloa(this.caseId, loaFile).subscribe(
      (response:HttpResponse<Blob> | any)=>{
        FileSaver.saveAs(response.body, loaFile + (response.body.type.includes("msword") ? "doc" : ""));

      },

      error => {
        //console.log(error);
      }
    )
  }
  deleteLoa() {

  }

  uploadLoa() {
    this.caseUploadService.uploadLoa(this.caseId, this.loaForm.get('loaFile')?.value?.files[0], this.loaForm.get('fileName')?.value).subscribe(

    // this.caseUploadService.uploadLoa(this.caseId, this.loaForm.get('loaFile')?.value?.files[0], this.loaForm.get('fileName')?.value).subscribe(
      response => {
        this.loaFiles.push(this.loaForm.get('fileName')?.value);
        this.showMessage(this.caseId + " LOA Uploaded")
        // this.loaFiles.push(response);
        // console.log("loaFiles",response);
        
        // this.showMessage("LOA Uploaded")
      },
      error => {
        this.showError("Error uploading LOA")
      }
    )

  }

  //venky 10/10

  //component scope popup
  // componentScopeModal(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus= true;
  //   dialogConfig.height = '350px'
  //   dialogConfig.width = '600px' 
  //   dialogConfig.data = {
  //     case_id: this.case_id,
  //     caseId: this.caseId
  //   }
  //   const dialogRef = this.dialog.open(ComponentScopeComponent,dialogConfig);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.event === 'submit') {
  //       this.caseUploadService.updateStatus(this.case_id, { status: 'DE-COMPLETED' }).subscribe(
  //         response => {
  //           this.showMessage("Case Submitted to Input QC");
  //           this.location.back();
  //         },
  //         error => {
  //           this.showMessage("Error Submitting case to Input QC");
  //         }
  //       )
  //     }
  //   })
  // }
componentScopeModal() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = '350px';
  dialogConfig.width = '600px';
  dialogConfig.data = {
    case_id: this.case_id,
    caseId: this.caseId
  };

  const dialogRef = this.dialog.open(ComponentScopeComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    if (result.event === 'submit') {
      this.caseUploadService.updateStatus(this.case_id, { status: 'DE-COMPLETED' }).subscribe(
        response => {
          this.showMessage("Case Submitted to Input QC");

          // Reset each component's form before clearing array
          if (Array.isArray(this.requiredComponents)) {
            this.requiredComponents.forEach((comp: any) => {
              if (Array.isArray(comp.enteredChecks)) {
                comp.enteredChecks.forEach((chk: any) => {
                  chk?.compForm?.reset();
                });
              }
            });
          }

          // Reset all main forms
          this.personalDetailsDataEntryForm.reset();
          this.tatDetailsForm.reset();
          this.loaForm.reset();

          // Clear displayed variables
          this.caseId = '';
          this.case_id = '';
          this.candidateName = '';
          this.clientName = '';
          this.subclientName = '';
          this.employeeId = '';
          this.proofsUploaded = [];
          this.loaFiles = [];

          // Clear the component list completely
          this.requiredComponents = [];

          // Go back to previous page
          this.location.back();
        },
        error => {
          this.showMessage("Error Submitting case to Input QC");
        }
      );
    }
  });
}


  submitCaseToInputqc() {
    this.componentScopeModal()
    // this.caseUploadService.updateStatus(this.case_id, { status: 'DE-COMPLETED' }).subscribe(
    //   response => {
    //     this.showMessage("Case Submitted to Input QC");
    //     this.location.back();
    //   },
    //   error => {
    //     this.showMessage("Error Submitting case to Input QC");
    //   }
    // )
  }

  // submitCaseToInputqc() {
  //   this.caseUploadService.updateStatus(this.case_id, { status: 'DE-COMPLETED' }).subscribe(
  //     response => {
  //       this.showMessage("Case Submitted to Input QC");
  //       this.location.back();
  //     },
  //     error => {
  //       this.showMessage("Error Submitting case to Input QC");
  //     }
  //   )
  // }


  moveToDraft(){
    this.caseUploadService.updateDraftStatus(this.case_id, { moveDraft: 'MOV-DRAFT' }).subscribe(
      response => {
        this.showMessage("Case Moved to Draft");
        this.location.back();
      },
      error => {
        this.showMessage("Error Moving Case  to Draft");
      }
    )

  }
  statusChanged(event:any, formIndex:any) {
    /*    if(this.fgs[formIndex].get('status').value  == 'INSUF-1'){
      this.fgs[formIndex].get('insufficiencyComments').setValidators(Validators.required);
      this.fgs[formIndex].get('insufficiencyComments').updateValueAndValidity({emitEvent:true});      
    }else{
      this.fgs[formIndex].get('insufficiencyComments').clearValidators()
      this.fgs[formIndex].get('insufficiencyComments').updateValueAndValidity({emitEvent:true});            
    }  */
  }
  deleteThisCheck(compIndex:any, formIndex:any) {
    let componentData = this.requiredComponents[compIndex].enteredChecks[formIndex].compForm.getRawValue();
    componentData.case_id = this.case_id;
    componentData.case = this.case_id;
    componentData._id = this.requiredComponents[compIndex].enteredChecks[formIndex]._id;
    let componentName = this.requiredComponents[compIndex].componentName;
    //console.log("Component to delete is ",componentName);
    //console.log("Check to delete ",componentData);
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',height: '200px', data: { message: `Are you sure that you want to delete the Check?` }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result.event == 'confirmed') {
        if (this.requiredComponents[compIndex].enteredChecks[formIndex]._id == '') {
          this.requiredComponents[compIndex].enteredChecks.splice(formIndex, 1);
          this.showMessage("Check Deleted");
        } else {
          this.componentDataService.delete(componentName, componentData).subscribe(
            response => {
              this.requiredComponents[compIndex].enteredChecks[formIndex]._id = response._id;
              this.requiredComponents[compIndex].enteredChecks.splice(formIndex, 1);
              this.showMessage("Check Deleted");
            },
            error => {
              this.showError("Error deleting check");
            }
          )
        }
      }
    })


  }
  //education
  getEducationInstitutions(e: any) {
    this.allComponentService.searchInstitutionsFromMasters(e.target.value).subscribe(
      response => {
        this.educationmasters = response
        console.log("this.educationmasters",this.educationmasters);
        
      },
      error => {
        this.showError(error.error.error)
      }
    )
  }
  //education
  // employment 
  getEmployer(e: any): void {
    // console.log("$$$$$$$$$$$$$$$",e.target.value);
    const query = e.target.value;
    this.allComponentService.readAllName(query).subscribe(
      response => {
        // console.log("@@@@@@@@@@@@@@@@@@@@",response);
        
        this.empName = response;
      },
      error => {
        this.showError("Error reading personal Deails");
      }
    );
  }
  ////insuff comments
  getInsuffComments(e:any) {
    this.allComponentService.readAllComments(e.target.value).subscribe(
      response => {
        this.insuffcomment = response;
      },
      error => {
        this.showError("Error reading personal Deails");
      }
    );
  }
  ////insuff comments

  insuffSelectionChanged(event: any): void {
    const selectedValue = event.value;
    // Perform any necessary actions based on the selected value
    // For example, you can update other form controls or trigger specific behavior
    console.log('Selected InsuffType:', selectedValue);
    // Add your custom logic here
  }
  // employment 

  //added on 12/09/2023
  onSelectionChange(event: MatSelectChange): void {
    const dialogConfig = new MatDialogConfig();
    const selectedValue = event.value;
    console.log('Selected Value:', selectedValue);
  
    if (selectedValue.trim() == "Current (Still Working)") {
      console.log('Condition met - Opening dialog');
      // this.openStatusDialog();
      this.dialog.open(EmpInfoComponent, dialogConfig);
    }
  }
  ///////////
  showError(msg:any) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showMessage(msg:any) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  closeDocumentDialog(){
    this.showDocumentDialog=false;
  }

  chatbox(){ 
    console.log(this.case_id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '450px'
    dialogConfig.width = '420px'

    console.log("Dialog Ref Contains  ", dialogConfig)
    dialogConfig.data = {
      case_id: this.case_id,

    }
    console.log("case id", this.case_id)
    const dialogRef = this.dialog.open(ChatboxComponent, dialogConfig);


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

  saveTat(){
      let tatData = this.tatDetailsForm.getRawValue();
        // Check if candidateName or employeeId is null, and assign the initial values if needed
  if (!tatData.candidateName) {
    tatData.candidateName = this.candidateName;
  }

  if (!tatData.employeeId) {
    tatData.employeeId = this.employeeId;
  }

  if (!tatData.initiationDate) {
    tatData.initiationDate = this.initiationDate;
  }

  if (!tatData.tatEndDate) {
    tatData.tatEndDate = this.tatEndDate;
  }

  console.log("tat data:", tatData);

  // Proceed with the update call
      this.caseUploadService.tatupdate(this.case_id,tatData).subscribe(
        response => {
          this.showMessage("Tat Details Saved");
          this.isEditing = false;
          this.isemployeeIdEditing = false
        },
        error => {
          this.showError(error.error.message);
        }
      )


  }


  getClassToApply(item: { status: string | number | Date; }) {
    console.log("status:",item.status);

    if (item.status == "INPUTQC-REJECTED") {
      return 'red'
    } 
    else {
      return 'black'
    }
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
  ////////
  ///added code oct-09//

  deletecdfFile(fileName: string): void {
  const componentDetails = {
    caseId: this.caseId,
    _id: this._id
  };

  if (confirm(`Are you sure you want to delete ${fileName}?`)) {
    this.componentDataService.deletecdf(componentDetails, fileName).subscribe(
      (response: any) => {
        this.proofsUploaded = this.proofsUploaded.filter(f => f !== fileName);
        this.showMessage("File deleted successfully");
      },
      (error) => {
        this.showError(error.error.message || "Failed to delete file");
      }
    );
  }
}

//end//

//added code oct-30//

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedCDFFile = file;
    console.log('Selected file:', file.name);
  }
}

uploadCDF() {
  if (!this.selectedCDFFile) {
    alert('Please select a file before uploading.');
    return;
  }

  const componentData: any = {
    caseId: this.caseId, // already defined in your component
    fileName: this.selectedCDFFile.name.split('.')[0]
  };

  this.componentDataService.uploadcdf('CDF', componentData, this.selectedCDFFile)
    .subscribe({
      next: (res: any) => {
        alert('CDF File Uploaded Successfully!');
        // Optional: refresh file list (like proofsUploaded)
        this.proofsUploaded.push(this.selectedCDFFile!.name);
        this.selectedCDFFile = null;
      },
      error: (err) => {
        console.error(err);
        alert('Error uploading file.');
      }
    });
}
  


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  toggleEditemployeeId() {
    this.isemployeeIdEditing =  true;;
  }
}
