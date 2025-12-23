import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { CaseDetailsForDataEntryService } from 'src/app/operations/data-entry/service/case-details-for-data-entry.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { PersonalDetailsDataService } from 'src/app/operations/data-entry/service/personal-details-data.service';
import { HistoryDialogComponent } from 'src/app/shared/history-dialog/history-dialog.component';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { ClientService } from 'src/app/administration/service/client.service';
import { ColorMasterService } from 'src/app/administration/service/color-master.service';
import { CompOutputqcComponent } from '../comp-outputqc/comp-outputqc.component';

@Component({
  selector: 'app-outputqc-component-list',
  templateUrl: './outputqc-component-list.component.html',
  styleUrls: ['./outputqc-component-list.component.scss']
})
export class OutputqcComponentListComponent { 
  showCaseGradeSection = true;
  _id!: string;
  caseId!: string;
  case_id!: string;
  candidateName!: string;
  client_id!: string;
  clientName!: string;
  subclient_id!: string;
  subclientName!: string; 
  fathername!: string;
  dob!: string;
  contact!:number;
  emailid!:string; 
  doj!:string;
  process!:string;
  number!:string;
  place!:string;
        ///tat//
        tatStartDate!:string;
        tatEndDate!:string;
         /////
  colorCodes!: any[];
  colorCodesFromMaster!: any[];
  showDetailsFlag: boolean = false;
  selectedRow: any;
  
  displayedColumns = [
    'serialNumber',
    'component',
    'checkId',
    'status',
    'grade',
    
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatTable)
  table!: MatTable<any>;
  caseGradeForm = new FormGroup({
    grade: new FormControl('', [Validators.required]),
    gradingComments: new FormControl(''),
    reportType: new FormControl(''),
  });
  reportTypes: any[] = [];
  constructor(
    private clientService: ClientService,
    private componentService: ComponentService,
    private componentDataService: ComponentDataService,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private personalDetailsDataService: PersonalDetailsDataService,
    private caseUploadService: CaseUploadService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private colorMasterService: ColorMasterService,
    private snackBar: MatSnackBar,
    private location: Location
    ) {}
    
    
    ngOnChanges(){
      this.ngOnInit();
    }
    ngOnInit(): void {
      ///sharath///
      let FinalQC_CompoList=this.componentDetailsForVerificationService.getVerificationItem();

      if(!FinalQC_CompoList){
        this.router.navigate(['/home/outputqc/outputqclist']);
        return;
      }
      ///sharath///

      this._id =
      this.componentDetailsForVerificationService.getVerificationItem().case_id; 
      this.caseId =
      this.componentDetailsForVerificationService.getVerificationItem().caseId;
      this.candidateName =
      this.componentDetailsForVerificationService.getVerificationItem().candidateName;
      this.client_id =
      this.componentDetailsForVerificationService.getVerificationItem().clientId;
      this.clientName =
      this.componentDetailsForVerificationService.getVerificationItem().clientName;
      this.subclient_id =
      this.componentDetailsForVerificationService.getVerificationItem().subclient_id;
      this.subclientName =
      this.componentDetailsForVerificationService.getVerificationItem().subclientName;
      this.colorCodes =
      this.componentDetailsForVerificationService.getVerificationItem().colorCodes;
      this.tatStartDate =
      this.componentDetailsForVerificationService.getVerificationItem().tatStartDate;
      this.tatEndDate =
      this.componentDetailsForVerificationService.getVerificationItem().tatEndDate;

      console.log('color codes in component list ', this.clientName);
      console.log('color codes  ', this.colorCodes);
      console.log('Personal details to read for the case ', this.subclientName);
      this.getColorCodesFromMaster();
      this.personalDetailsDataService.read(this._id).subscribe(
        (response) => {
          //console.log("Response from personal details data is ",response);
          let componentDetails:any = {};
                   console.log("@@@@@@@@@@@@@@@",response);
          //          componentDetails["_id"] = item._id;
          componentDetails['caseId'] = this.caseId;
          componentDetails['case_id'] = this.case_id;
          componentDetails['candidateName'] = this.candidateName;
          componentDetails['clientName'] = this.clientName;
          componentDetails['subclientName'] = this.subclientName;
  
          componentDetails['fathername'] = response.fathername ;
          this.fathername =response.fathername
          componentDetails['emailid'] = response.emailid;
          this.emailid =response.emailid
          componentDetails['doj'] = response.doj;
          this.doj =response.doj
          componentDetails['dob'] = response.dateofbirth ;
          this.dob =response.dateofbirth ;
          componentDetails['place'] = response.location;
          this.place =response.location
          componentDetails['process'] = response.process;
          this.process =response.process
          componentDetails['number'] = response.number;
          this.number =response.number
  
  
          componentDetails['componentDisplayName'] = 'Personal Details';
          componentDetails['componentName'] = 'personalDetails';
          componentDetails['colorCodes'] = this.colorCodes;
          if (response.status != null) {
            componentDetails['status'] = response.status;
            componentDetails['displayStatus'] = response.status;
          } else {
            componentDetails['status'] = response.status;
            componentDetails['displayStatus'] = response.status;
          }
          
          this.dataSource.data.push(componentDetails);
          this.dataSource._updateChangeSubscription();
        },
        (error) => {
          this.showError(error.error.message);
        }
        );
        this.componentService.findAllComponents().subscribe(
          (response) => {
            response.forEach( (component) => {
              this.componentDataService
              .findAllForACase(component.name, this._id)
              .subscribe(
                async(response2) => {
                  console.log("Getting Details for component:", component.name)
                  for(let i=0; i< response2.length; i++){
                    const item = response2[i]
                    let componentDetails:any = {};
                    console.log('ececece', item);
                    console.log('################', response2);
                    
                    componentDetails['_id'] = item._id;
                    componentDetails['caseId'] = this.caseId;
                    componentDetails['case_id'] = this._id;
                    componentDetails['candidateName'] = this.candidateName;
                    componentDetails['clientName'] = this.clientName;
                    componentDetails['subclientName'] = this.subclientName;
                    componentDetails['componentDisplayName'] = component.displayName;
                    componentDetails['componentName'] = component.name;
                    componentDetails['checkId'] = item.checkId ? item.checkId : '';

                    componentDetails['fathername'] = this.fathername;
                    componentDetails['emailid'] = this.emailid;
                    componentDetails['doj'] = this.doj;
                    componentDetails['place'] = this.place;
                    componentDetails['dob'] = this.dob;
                    componentDetails['process'] = this.process;
                    componentDetails['number'] = this.number;
                    componentDetails['tatStartDate'] = this.tatStartDate;
                    componentDetails['tatEndDate'] = this.tatEndDate;

                    // console.log("");
                    
                    // Quick note 
                    
                    if (item && item.comments && item.comments.length > 0) {
                      componentDetails["colorType"] = item.comments[item.comments.length - 1].colorType || "";
                    } else {
                      componentDetails["colorType"] = "";
                    }
                    
                    if (item && item.comments && item.comments.length > 0) {
                      componentDetails["comments"] = item.comments[item.comments.length - 1].comment || "";
                    } else {
                      componentDetails["comments"] = "";
                    }
                    componentDetails['field1'] = this.fillFieldDetails(
                      component.name,
                      'field1',
                      item
                      );
                      componentDetails['field2'] = this.fillFieldDetails(
                        component.name,
                        'field2',
                        item
                        );
                        componentDetails['field3'] = this.fillFieldDetails(
                          component.name,
                          'field3',
                          item
                          );
                          componentDetails['component_id'] = component._id;
                          componentDetails['colorCodes'] = this.colorCodes;
                          componentDetails['grade'] =
                          item.grade != null
                          ? await this.getColorFromColorCodes(item.grade)
                          : '';
                          if (item.status != null) {
                            componentDetails['status'] = item.status;
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED') {
                              componentDetails['displayStatus'] =
                              'Interim QC Accepted';
                            }
                            if (item.status == 'OUTPUTQC-ACCEPTED') {
                              componentDetails['displayStatus'] = 'Final QC Accepted';
                            }
                            if (item.status == 'OUTPUTQC-REJECTED') {
                              componentDetails['displayStatus'] = 'Final QC Rejected';
                            }
                            if(item.status != 'OUTPUTQC-REJECTED'|| item.status != 'OUTPUTQC-REJECTED'){
                              componentDetails['displayStatus'] = item.status;
                            }

                          }
                          if (item.status != 'OUTPUTQC-ACCEPTED') {
                            this.showCaseGradeSection = false;
                          }
                          // console.log('@@@@@@@@@@@@@@@@@', componentDetails);
                          this.dataSource.data.push(componentDetails);
                        }
                        this.dataSource._updateChangeSubscription();
                      },
                      (error) => {
                        this.showError(error.error.message);
                      }
                      );
                    });
                  },
                  (error) => {
                    this.showError(error.error.message);
                  }
                  );
                  /*    this.clientService.findAClient(this.componentDetailsForVerificationService.getVerificationItem().clientId).subscribe(
                    response=>{
                      this.reportTypes = response.reportTypes
                      //console.log("Report types are",this.reportTypes);        
                    },
                    error=>{
                      //console.log(error)
                      this.showError("Error reading report types")
                    }
                    )*/
                  }
                  fillFieldDetails(componentName:any, field:any, item:any) {
                    console.log("IN FILLING DETAILS:", componentName, item, field)
                    
                    if (componentName == 'address') {
                      if (field == 'field1') {
                        return item.typeofaddress;
                      } else if (field == 'field2') {
                        return item.address;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'addresscomprehensive') {
                      if (field == 'field1') {
                        return item.typeofstay;
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'addressonline') {
                      if (field == 'field1') {
                        return item.typeofaddress;
                      } else if (field == 'field2') {
                        return item.fulladdwithpin;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'addresstelephone') {
                      if (field == 'field1') {
                        return item.typeofstay;
                      } else if (field == 'field2') {
                        return item.address;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'bankstmt') {
                      if (field == 'field1') {
                        return item.nameofbank;
                      } else if (field == 'field2') {
                        return '-';
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'courtrecord') {
                      if (field == 'field1') {
                        return item.typeofaddress;
                      } else if (field == 'field2') {
                        return item.addresswithpin;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'creditcheck') {
                      if (field == 'field1') {
                        return item.nameasperpan;
                      } else if (field == 'field2') {
                        return item.taxid;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'creditequifax') {
                      if (field == 'field1') {
                        return item.panname;
                      } else if (field == 'field2') {
                        return item.pannumber;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'credittrans') {
                      if (field == 'field1') {
                        return item.nameasperpan;
                      } else if (field == 'field2') {
                        return item.pannumber;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'criminalrecord') {
                      if (field == 'field1') {
                        return item.typeofaddress;
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'directorshipcheck') {
                      if (field == 'field1') {
                        return item.directorname;
                      } else if (field == 'field2') {
                        return item.dinnumber;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'dlcheck') {
                      if (field == 'field1') {
                        return item.nameasperdl;
                      } else if (field == 'field2') {
                        return item.dlnumber;
                      } else {
                        return item.issuedate;
                      }
                    } else if (componentName == 'drugtestfive') {
                      if (field == 'field1') {
                        return item.nameofemployee;
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'drugtestsix') {
                      if (field == 'field1') {
                        return '-';
                      } else if (field == 'field2') {
                        return '-';
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'drugtestseven') {
                      if (field == 'field1') {
                        return item.nameofemploybee;
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'drugtesteight') {
                      if (field == 'field1') {
                        return item.nameofemployee;
                      } else if (field == 'field2') {
                        return item.address;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'drugtestnine') {
                      if (field == 'field1') {
                        return '-';
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'drugtestten') {
                      if (field == 'field1') {
                        return item.nameofemployee;
                      } else if (field == 'field2') {
                        return item.address;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'education') {
                      if (field == 'field1') {
                        item.typeofqualification;
                      } else if (field == 'field2') {
                        item.qualification;
                      } else {
                        return item.nameofuniversity != null
                        ? item.nameofuniversity
                        : item.nameofschool !== null
                        ? item.nameofschool
                        : '';
                      }
                    } else if (componentName == 'educationadvanced') {
                      if (field == 'field1') {
                        return item.typeofqualifiction;
                      } else if (field == 'field2') {
                        return item.qualification;
                      } else {
                        return item.nameofuniverskty != null
                        ? item.nameofuniverskty
                        : item.nameofschool !== null
                        ? item.nameofschool
                        : '';
                      }
                    } else if (componentName == 'educationcomprehensive') {
                      if (field == 'field1') {
                        return item.typeofqualification;
                      } else if (field == 'field2') {
                        return item.qualification;
                      } else {
                        return item.nameofuniversity != null
                        ? item.nameofuniversity
                        : item.nameofschool !== null
                        ? item.nameofschool
                        : '';
                      }
                    } else if (componentName == 'empbasic') {
                      if (field == 'field1') {
                        return item.empstatus;
                      } else if (field == 'field2') {
                        return item.nameofemployer;
                      } else {
                        return item.designation;
                      }
                    } else if (componentName == 'empadvance') {
                      if (field == 'field1') {
                        return item.empstatus;
                      } else if (field == 'field2') {
                        return item.nameofemployer;
                      } else {
                        return item.designation;
                      }
                    } else if (componentName == 'employment') {
                      if (field == 'field1') {
                        return item.empstatus;
                      } else if (field == 'field2') {
                        return item.nameofemployer;
                      } else {
                        return item.designation;
                      }
                    } else if (componentName == 'facisl3') {
                      if (field == 'field1') {
                        return item.applicantname;
                      } else if (field == 'field2') {
                        return item.stcode;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'gapvnf') {
                      if (field == 'field1') {
                        return item.tenureofgap;
                      } else if (field == 'field2') {
                        return item.address;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'globaldatabase') {
                      if (field == 'field1') {
                        return '-';
                      } else if (field == 'field2') {
                        return '-';
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'identity') {
                      if (field == 'field1') {
                        return item.typeofid;
                      } else if (field == 'field2') {
                        return item.nameasperid;
                      } else {
                        return item.idnumber;
                      }
                    } else if (componentName == 'ofac') {
                      if (field == 'field1') {
                        return item.candname;
                      } else if (field == 'field2') {
                        return item.ofac;
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'passport') {
                      if (field == 'field1') {
                        return item.passportnumber;
                      } else if (field == 'field2') {
                        return item.nationality;
                      } else {
                        return item.expirydate;
                      }
                    } else if (componentName == 'physostan') {
                      if (field == 'field1') {
                        return '-';
                      } else if (field == 'field2') {
                        return '-';
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'refbasic') {
                      if (field == 'field1') {
                        return item.name;
                      } else if (field == 'field2') {
                        return item.designation;
                      } else {
                        return item.contact;
                      }
                    } else if ((componentName = 'reference')) {
                      if (field == 'field1') {
                        return item.nameofreference;
                      } else if (field == 'field2') {
                        return item.designation;
                      } else {
                        return item.contactdetails;
                      }
                    } else if (componentName == 'sitecheck') {
                      if (field == 'field1') {
                        return item.name;
                      } else if (field == 'field2') {
                        return item.fulladdress;
                      } else {
                        return item.city;
                      }
                    } else if (componentName == 'socialmedia') {
                      if (field == 'field1') {
                        return item.searchname;
                      } else if (field == 'field2') {
                        return '-';
                      } else {
                        return '-';
                      }
                    } else if (componentName == 'vddadvance') {
                      if (field == 'field1') {
                        return item.companyname;
                      } else if (field == 'field2') {
                        return item.regdadd;
                      } else {
                        return item.cin;
                      }
                    } else if (componentName.includes("uananalysis")) {
                      console.log("Field Pop Hit!!")
                      if (field == 'field1') {
                        return item.candidatename;
                      } else if (field == 'field2') {
                        return item.uanRhs;
                      } else {
                        return 'TEST Field';
                      }
                    } else {
                      if (field == 'field1') {
                        return 'TEST Field 1';
                      } else if (field == 'field2') {
                        return 'TEST Field 2';
                      } else {
                        return 'TEST Field 3';
                      }
                    }
                  }
                  getColorCodesFromMaster() {
                    this.colorMasterService.readAll().subscribe((response) => {
                      console.log("Colors:",response);
                      
                      this.colorCodesFromMaster = response;
                    });
                  }
                  getColorFromColorCodes(colorCode:any) {
                    return new Promise((resolve, reject) => {
                      this.colorCodesFromMaster.forEach((item) => {
                        // console.log("grade",item.grade)
                        // console.log("_id",item._id)
                        if (item._id == colorCode) {
                          resolve(item.name);
                        }
                      });
                      resolve('');
                    });
                  }
                  detailsButtonClicked(outputqcItem:any) {
                    this.componentDetailsForVerificationService.setVerificationItem(
                      outputqcItem
                      );
                      this.router.navigate(['outputqc/outputqcofcomp']);
                    }
                    backButtonClicked() {
                      this.location.back();
                    }
                    submitButtonClicked() {
                      let caseDetails = this.caseGradeForm.getRawValue();
                      this.caseUploadService.setOutputqcGrade(this._id, caseDetails).subscribe(
                        (response) => {
                          this.showMessage('Case Status Updated');
                          this.location.back();
                        },
                        (error) => {
                          this.showError('Error updating case status');
                        }
                        );
                      }
                      historyClicked() {
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.disableClose = true;
                        dialogConfig.autoFocus = true;
                        dialogConfig.height = '600px';
                        dialogConfig.width = '1024px';
                        //console.log("Dialog Ref Contains  ",dialogConfig)
                        dialogConfig.data = {
                          case_id: this.case_id,
                          //      component_id:this.component_id,
                          //      _id:this._id
                        };
                        const dialogRef = this.dialog.open(HistoryDialogComponent, dialogConfig);
                      }
                      showMessage(msg:any) {
                        this.snackBar.open(msg, 'Info', {
                          duration: 4000,
                          horizontalPosition: 'end',
                          verticalPosition: 'top',
                        });
                      }
                      showError(msg:any) {
                        this.snackBar.open(msg, 'Error', {
                          duration: 4000,
                          horizontalPosition: 'end',
                          verticalPosition: 'top',
                        });
                      }
                      
                      confirmButtonClicked(){
                        
                      }
                      //   showDetails(row:any){  
                      //     console.log('hello', row.status);
                      //     this.selectedRow = row 
                      
                      //     this.componentDetailsForVerificationService.setVerificationItem(row);
                      //     this.showDetailsFlag = true;
                      //     console.log('selected value === ',this.selectedRow);
                      
                      //   // let { componentName } = row;
                      //   // (componentName === 'personalDetails') ? 
                      //   // (this.router.navigate([`/home/inputqc/personaldetailsinputqc`])) : 
                      //   // (this.router.navigate([`/home/inputqc/componentinputqc`]));
                      // }
                      showDetails(row:any){  
                        console.log('hello', row);
                        this.selectedRow = row 
                        
                        this.componentDetailsForVerificationService.setVerificationItem(row);
                        this.showDetailsFlag = true;
                        
                        const columnToToggle = ['field1', 'field2','field3'];
                        columnToToggle.forEach(column => {
                          const columnIdx = this.displayedColumns.indexOf(column);
                          if (columnIdx !== -1) {
                            this.displayedColumns.splice(columnIdx, 1);
                          }
                        });
                        this.table.renderRows();
                        this.router.navigate(['/home/outputqc/outputqcofcomp']);
                        // console.log('selected value === ',this.selectedRow);
                        
                        // let { componentName } = row;
                        // (componentName === 'personalDetails') ? 
                        // (this.router.navigate([`/home/inputqc/personaldetailsinputqc`])) : 
                        // (this.router.navigate([`/home/inputqc/componentinputqc`]));
                      }
                    }
                    