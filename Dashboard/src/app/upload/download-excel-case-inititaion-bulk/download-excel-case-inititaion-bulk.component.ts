import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/administration/model/client';
import { ClientContractPackage } from 'src/app/administration/model/client-contract-package';
import { ClientContractPackageComponent } from 'src/app/administration/model/client-contract-package-component';
import { ClientContractProfile } from 'src/app/administration/model/client-contract-profile';
import { ClientContractProfileComponent } from 'src/app/administration/model/client-contract-profile-component';
import { Subclient } from 'src/app/administration/model/subclient';
import { ClientContractComponentService } from 'src/app/administration/service/client-contract-component.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';

import { CaseComponent } from '../model/case-component';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { Case } from '../model/case';
import { PersonalDetailsDataService } from 'src/app/operations/service/personal-details-data.service';
import { PersonalDetailsService } from 'src/app/administration/service/personal-details.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { ExcelUploadService } from 'src/app/upload/service/excel-upload.service';
import * as  XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { MatSnackBar } from '@angular/material/snack-bar';

interface ExcelUpload {
  _id?:string;
  referenceNumber?:number;
  client?:string;
  subclient?:string;
  package?:string;
  profile?:string;
  componentsToCheck?:any[];
  status?:string;
  uploadDate?:string;
  modifiedBy?:string;
}

@Component({
  selector: 'app-download-excel-case-inititaion-bulk',
  templateUrl: './download-excel-case-inititaion-bulk.component.html',
  styleUrls: ['./download-excel-case-inititaion-bulk.component.scss']
})
export class DownloadExcelCaseInititaionBulkComponent {
   action!: string;
    clientSubclientIds = new Array();
    selectedExcelUploadReferenceNumber!: number;
    excelFileToUpload: any;
    arrayBuffer: any;
    jsonData!: any;
    excelUploads = new Array<any>();
    relevantContractId!: string;
    clients = new Array<Client>();
    subclients = new Array<Subclient>();
    profiles = new Array<ClientContractProfile>();
    packages = new Array<ClientContractPackage>();
    downloadExcelTemplateForm!: FormGroup;
  
    packageComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
    packageComponentsDataSource =
      new MatTableDataSource<ClientContractPackageComponent>();
  
    profileComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
    profileComponentsDataSource =
      new MatTableDataSource<ClientContractProfileComponent>();
  
    componentsDisplayedColumns = [
      'serialNumber',
      'component',
      'tat',
      'rate',
      'details',
      'maxChecks',
      'select',
    ];
    componentsDataSource = new MatTableDataSource<CaseComponent>();
  
    constructor(
      private fb: FormBuilder,
      private userSubclientAccessService: UserSubclientAccessService,
      private clientContractService: ClientContractService,
      private clientContractComponentService: ClientContractComponentService,
      private clientContractPackageService: ClientContractPackageService,
      private clientContractProfileService: ClientContractProfileService,
      private componentFieldService: ComponentFieldService,
      private caseUploadService: CaseUploadService,
      private personalDetailsService: PersonalDetailsService,
      private PersonalDetailsDataService: PersonalDetailsDataService,
      private componentDataService: ComponentDataService,
      private excelUploadService: ExcelUploadService,
      private location: Location,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit() {
      this.downloadExcelTemplateForm = this.fb.group({
        clientId: ['', [Validators.required]],
        subclientId: ['', [Validators.required]],
        packageProfileAlacarte: ['', [Validators.required]],
        package: [''],
        profile: [''],
        tat: [''],
        price: [''],
      });
      this.getAllClients();
    }
  
    getAllClients() {
      this.userSubclientAccessService
        .findAllSubclientsForAUserUsingEmailId(localStorage.getItem('userId'))
        .subscribe(
          (response) => {
            this.clientSubclientIds = new Array();
            for (let subclientOfResponse of response) {
              if (!this.foundInClients(subclientOfResponse.client._id)) {
                let client = new Client();
                client._id = subclientOfResponse.client._id;
                client.name = subclientOfResponse.client.name;
                this.clients.push(client);
                let clientSubclient = {
                  client: subclientOfResponse.client._id,
                  subclient: subclientOfResponse.subclient._id,
                };
                this.clientSubclientIds.push(clientSubclient);
              }
              this.addToClient(
                subclientOfResponse.client._id,
                subclientOfResponse.subclient._id,
                subclientOfResponse.subclient.name
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  
    uploadDownloadChanged(event: any) {
      if (this.action == 'UPLOAD-DATA') {
        this.excelUploadService.getAllReferenceNumbersWithStatusOpen().subscribe(
          (response) => {
            //console.log(response);
            this.excelUploads = response;
          },
          (error) => {
            console.log('Error getting reference numbers ', error);
          }
        );
      } else {
      }
    }
  
    getExcelUploadInfo(event: any) {
      //console.log('selected excel upload reference number is ',this.selectedExcelUploadReferenceNumber);
      this.excelUploadService
        .getForOneReferenceNumber(this.selectedExcelUploadReferenceNumber)
        .subscribe(
          (response) => {
            this.downloadExcelTemplateForm
              .get('clientId')!
              .setValue(response.client);
            this.downloadExcelTemplateForm
              .get('subclientId')!
              .setValue(response.subclient);
            this.showSubclientsForClient();
            this.getRelevantClientContracts();
            if (response.package) {
              this.downloadExcelTemplateForm
                .get('package')!
                .setValue(response.package);
              this.downloadExcelTemplateForm
                .get('packageProfileAlacarte')!
                .setValue('PACKAGE');
              this.getPackages();
              this.showPackageComponents();
            }
            if (response.profile) {
              this.downloadExcelTemplateForm
                .get('profile')!
                .setValue(response.profile);
              this.downloadExcelTemplateForm
                .get('packageProfileAlacarte')!
                .setValue('PROFILE');
              this.getProfiles();
              this.showProfileComponents();
            }
            if (response.componentsToCheck) {
              this.componentsDataSource.data = response.componentsToCheck;
              this.downloadExcelTemplateForm
                .get('packageProfileAlacarte')!
                .setValue('A-LA-CARTE');
              this.readAllComponentsForThisContract();
            }
          },
          (error) => {
            console.log('error reading ref number ', error);
          }
        );
    }
  
    getRelevantClientContracts() {
      this.clientContractService
        .findAllForAClient(this.downloadExcelTemplateForm.get('clientId')!.value)
        .subscribe(
          (response) => {
            let currentDate = new Date();
            for (let item of response) {
              if (
                currentDate > new Date(item.effectiveDate) &&
                currentDate < new Date(Date.parse(item.expiryDate))
              ) {
                this.relevantContractId = item._id;
                break;
              }
            }
            this.readAllComponentsForThisContract();
            this.getPackages();
            this.getProfiles();
          },
          (error) => {
            console.log(
              'Error reading contract details : ' + error.error.message
            );
          }
        );
    }
  
    readAllComponentsForThisContract() {
      if (this.relevantContractId) {
        this.clientContractComponentService
          .findAllWithoutFileUploadForAClientContract(this.relevantContractId)
          .subscribe((response) => {
            for (let responseItem of response) {
              let caseComponent = new CaseComponent();
              caseComponent.component = responseItem.component._id;
              //console.log('response Item Component is ',responseItem.component._id);
              caseComponent.componentName = responseItem.component.name;
              caseComponent.price = responseItem.price;
              caseComponent.tat = responseItem.tat;
              this.componentsDataSource.data.push(caseComponent);
            }
            this.componentsDataSource._updateChangeSubscription();
          });
      }
    }
  
    clientSelectionChanged(event: any) {
      this.getRelevantClientContracts();
      this.showSubclientsForClient();
    }
    showSubclientsForClient() {
      for (let client of this.clients) {
        if (client._id == this.downloadExcelTemplateForm.get('clientId')!.value) {
          this.subclients = client.subclients;
          break;
        }
      }
    }
  
    getProfiles() {
      this.clientContractProfileService
        .findAllWithoutFileUploadForAClientContract(this.relevantContractId)
        .subscribe(
          (response) => {
            // console.log("response for profiles are ",response)
            this.profiles = response;
          },
          (error) => {
            console.log('Error Reading Packages ' + error.error.message);
          }
        );
    }
    getPackages() {
      this.clientContractPackageService
        .findAllWithoutFileUpoadForAClientContract(this.relevantContractId)
        .subscribe(
          (response) => {
            this.packages = response;
          },
          (error) => {
            console.log('Error Reading Packages ' + error.error.message);
          }
        );
    }
  
    showProfileComponents() {
      for (let profile of this.profiles) {
        if (
          this.downloadExcelTemplateForm.get('profile')!.value === profile._id
        ) {
          this.profileComponentsDataSource.data =
            profile.clientContractProfileComponents;
          this.downloadExcelTemplateForm.get('tat')!.setValue(profile.tat);
          break;
        }
      }
      this.profileComponentsDataSource._updateChangeSubscription();
    }
  
    showPackageComponents() {
      for (let apackage of this.packages) {
        if (
          this.downloadExcelTemplateForm.get('package')!.value === apackage._id
        ) {
          this.packageComponentsDataSource.data =
            apackage.clientContractPackageComponents;
          this.downloadExcelTemplateForm.get('tat')!.setValue(apackage.tat);
          this.downloadExcelTemplateForm.get('price')!.setValue(apackage.price);
          break;
        }
      }
      this.packageComponentsDataSource._updateChangeSubscription();
    }
  
    packageProfileAlacarteChanged(event: any) {
      if (
        this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
        'A-LA-CARTE'
      ) {
        this.downloadExcelTemplateForm.get('profile')!.clearValidators();
        this.downloadExcelTemplateForm.get('package')!.clearValidators();
        this.downloadExcelTemplateForm.get('package')!.updateValueAndValidity();
        this.downloadExcelTemplateForm.get('profile')!.updateValueAndValidity();
      } else if (
        this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
        'PACKAGE'
      ) {
        this.downloadExcelTemplateForm
          .get('package')!
          .setValidators([Validators.required]);
        this.downloadExcelTemplateForm.get('profile')!.clearValidators();
        this.downloadExcelTemplateForm.get('profile')!.updateValueAndValidity();
      } else if (
        this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
        'PROFILE'
      ) {
        this.downloadExcelTemplateForm
          .get('profile')!
          .setValidators([Validators.required]);
        this.downloadExcelTemplateForm.get('package')!.clearValidators();
        this.downloadExcelTemplateForm.get('package')!.updateValueAndValidity();
      }
    }
  
    packageChanged(event: any) {
      this.showPackageComponents();
    }
  
    profileChanged(event: any) {
      this.showProfileComponents();
    }
  
    addToClient(clientId: string, subclientId: string, subclientName: string) {
      for (let client of this.clients) {
        if (client._id === clientId) {
          if (client.subclients == null) {
            client.subclients = new Array<Subclient>();
          }
          let subclient = new Subclient();
          subclient._id = subclientId;
          subclient.name = subclientName;
          client.subclients.push(subclient);
        }
      }
    }
  
    foundInClients(clientId: string) {
      for (let client of this.clients) {
        if (client._id === clientId) {
          return true;
        }
      }
      return false;
    }
  
    showDetails(row: any) {
      console.log('row === ', row);
    }
  
    async downloadExcelTemplate() {
      let excelUpoad: ExcelUpload = {};
      excelUpoad.client = this.downloadExcelTemplateForm.get('clientId')!.value;
      excelUpoad.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
      if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'PACKAGE') {
        excelUpoad.package = this.downloadExcelTemplateForm.get('package')!.value;
      }
      if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'PROFILE') {
        excelUpoad.profile = this.downloadExcelTemplateForm.get('profile')!.value;
      }
      if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'A-LA-CARTE') {
        excelUpoad.componentsToCheck = this.componentsDataSource.data;
      }
      excelUpoad.status = 'OPEN';
  
      this.excelUploadService.create(excelUpoad).subscribe(
        (response) => {
          //console.log(response);
          this.writeExcelFile(response.referenceNumber);
        },
        (error) => {
          //console.log(error);
        }
      );
    }
  
    async writeExcelFile(referenceNumber: number) {
      let wb = XLSX.utils.book_new();
      wb.SheetNames.push('Data');
      let dataArray = new Array<string>();
      await this.writePersonalDetailsFields(dataArray);
      let ws_data = [dataArray];
      let ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets['Data'] = ws;
      let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      saveAs(
        new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
        referenceNumber + '.xlsx'
      );
    }
  
    writePersonalDetailsFields(dataArray: any) {
      let promise = new Promise((resolve, reject) => {
        this.personalDetailsService.find().subscribe(
          (response) => {
            // console.log("Personal Details Response ",response)
            let personalDetails = response[0];
            let personalDetailsFields = personalDetails.personalDetailsFields;
            personalDetailsFields.forEach((item: any) => {
              if (item.mandatory) {
                if (item.name === 'dateofbirth') {
                  dataArray.push('personalDetails_' + item.name + '(MM/DD/YYYY)');
                } else {
                  dataArray.push('personalDetails_' + item.name);
                }
              }
            });
            // let packageProfileAlacarte = this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value
            // dataArray.push(packageProfileAlacarte)
            resolve(true);
          },
          (error) => {
            //console.log("Error in reading personal details ",error);
            reject(false);
          }
        );
      });
      return promise;
    }

  
    s2ab(s: any) {
      let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      let view = new Uint8Array(buf); //create uint8array as viewer
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    }
  
    async uploadButtonClicked() {
      let aCase = new Case();
      aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
      aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
      aCase.batchId = this.selectedExcelUploadReferenceNumber;
      if (
        this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
        'PACKAGE'
      ) {
        aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
        aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
      } else if (
        this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
        'PROFILE'
      ) {
        aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
        aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
      } else {
        let alacarteComponents = new Array();
        aCase.tat = 0;
        this.componentsDataSource.data.forEach((item) => {
          if (item.selected) {
            //console.log("Item tat is ",item.tat);
            if (item.tat > aCase.tat) {
              aCase.tat = item.tat;
              //console.log("Case Tat is ",aCase.tat);
            }
            alacarteComponents.push(item);
          }
        });
        aCase.componentsToCheck = alacarteComponents;
      }
      console.log('Test CAses', aCase, this.jsonData);
      let file = this.excelFileToUpload;
      console.log('file === ', file);

      if (file) {
        const formData = new FormData();
        formData.append('aCase', JSON.stringify(aCase)); 
        formData.append('data', JSON.stringify(this.jsonData)); 
        formData.append('excelFile', file, file.name);
    
        console.log('Uploading file and data...');
        this.componentDataService.createExcelCaseInitiation(aCase, this.jsonData, formData).subscribe(
          (response) => {
            console.log('Data Saved');
            this.showMessage("Data Saved");
            this.location.back();
          },
          (error) => {
            console.log('error == ', error);
            this.showError(error?.error?.error || 'Some Error Occured');
          }
        );
  
      }

    }
  
    uploadExcel() {
      let promise = new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          //console.log("inside on load");
          const data = fileReader.result;
          let workBook = XLSX.read(data, { type: 'binary' });
          const wsname: string = workBook.SheetNames[0];
          const ws: XLSX.WorkSheet = workBook.Sheets[wsname];
          this.jsonData = XLSX.utils.sheet_to_json(ws);
          //console.log("inside on load ....json data is ",this.jsonData)
        };
        fileReader.readAsBinaryString(this.excelFileToUpload);
        resolve('COMPLETED');
      });
      return promise;
    }
  
    async fileChanged(event: any) {
      console.log('In file change event');
      this.excelFileToUpload = event.target.files[0];
      let abc = await this.uploadExcel().then(
        (val) => {
          //console.log(val);
          //console.log("Result from upload ",this.jsonData)
        },
        (err) => {
          //console.log("Error  during upload ",err);
        }
      );
    }

    showError(msg:any) {
      this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
    }
    showMessage(msg:any) {
      this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
    }
}
