// import { Component } from '@angular/core';
// import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Location } from '@angular/common';
// import { MatTableDataSource } from '@angular/material/table';
// import { Client } from 'src/app/administration/model/client';
// import { ClientContractPackage } from 'src/app/administration/model/client-contract-package';
// import { ClientContractPackageComponent } from 'src/app/administration/model/client-contract-package-component';
// import { ClientContractProfile } from 'src/app/administration/model/client-contract-profile';
// import { ClientContractProfileComponent } from 'src/app/administration/model/client-contract-profile-component';
// import { Subclient } from 'src/app/administration/model/subclient';
// import { ClientContractComponentService } from 'src/app/administration/service/client-contract-component.service';
// import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
// import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
// import { ClientContractService } from 'src/app/administration/service/client-contract.service';
// import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';

// import { CaseComponent } from '../model/case-component';
// import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
// import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { Case } from '../model/case';
// import { PersonalDetailsDataService } from 'src/app/operations/service/personal-details-data.service';
// import { PersonalDetailsService } from 'src/app/administration/service/personal-details.service';
// import { ComponentDataService } from 'src/app/operations/service/component-data.service';
// import { ExcelUploadService } from 'src/app/upload/service/excel-upload.service';
// import * as  XLSX from 'xlsx';
// import { saveAs } from 'file-saver'


// interface ExcelUpload {
//   _id?:string;
//   referenceNumber?:number;
//   client?:string;
//   subclient?:string;
//   package?:string;
//   profile?:string;
//   componentsToCheck?:any[];
//   status?:string;
//   uploadDate?:string;
//   modifiedBy?:string;
// }

// @Component({
//   selector: 'app-download-excel-template',
//   templateUrl: './download-excel-template.component.html',
//   styleUrls: ['./download-excel-template.component.scss'],
// })
// export class DownloadExcelTemplateComponent {
//   action!: string;
//   clientSubclientIds = new Array();
//   selectedExcelUploadReferenceNumber!: number;
//   excelFileToUpload: any;
//   arrayBuffer: any;
//   jsonData!: any;
//   excelUploads = new Array<any>();
//   relevantContractId!: string;
//   clients = new Array<Client>();
//   subclients = new Array<Subclient>();
//   profiles = new Array<ClientContractProfile>();
//   packages = new Array<ClientContractPackage>();
//   downloadExcelTemplateForm!: FormGroup;

//   packageComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
//   packageComponentsDataSource =
//     new MatTableDataSource<ClientContractPackageComponent>();

//   profileComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
//   profileComponentsDataSource =
//     new MatTableDataSource<ClientContractProfileComponent>();

//   componentsDisplayedColumns = [
//     'serialNumber',
//     'component',
//     'tat',
//     'rate',
//     'details',
//     'maxChecks',
//     'select',
//   ];
//   componentsDataSource = new MatTableDataSource<CaseComponent>();

//   constructor(
//     private fb: FormBuilder,
//     private userSubclientAccessService: UserSubclientAccessService,
//     private clientContractService: ClientContractService,
//     private clientContractComponentService: ClientContractComponentService,
//     private clientContractPackageService: ClientContractPackageService,
//     private clientContractProfileService: ClientContractProfileService,
//     private componentFieldService: ComponentFieldService,
//     private caseUploadService: CaseUploadService,
//     private personalDetailsService: PersonalDetailsService,
//     private PersonalDetailsDataService: PersonalDetailsDataService,
//     private componentDataService: ComponentDataService,
//     private excelUploadService: ExcelUploadService,
//     private location: Location
//   ) {}

//   ngOnInit() {
//     this.downloadExcelTemplateForm = this.fb.group({
//       clientId: ['', [Validators.required]],
//       subclientId: ['', [Validators.required]],
//       packageProfileAlacarte: ['', [Validators.required]],
//       package: [''],
//       profile: [''],
//       tat: [''],
//       price: [''],
//     });
//     this.getAllClients();
//   }

//   getAllClients() {
//     this.userSubclientAccessService
//       .findAllSubclientsForAUserUsingEmailId(localStorage.getItem('userId'))
//       .subscribe(
//         (response) => {
//           this.clientSubclientIds = new Array();
//           for (let subclientOfResponse of response) {
//             if (!this.foundInClients(subclientOfResponse.client._id)) {
//               let client = new Client();
//               client._id = subclientOfResponse.client._id;
//               client.name = subclientOfResponse.client.name;
//               this.clients.push(client);
//               let clientSubclient = {
//                 client: subclientOfResponse.client._id,
//                 subclient: subclientOfResponse.subclient._id,
//               };
//               this.clientSubclientIds.push(clientSubclient);
//             }
//             this.addToClient(
//               subclientOfResponse.client._id,
//               subclientOfResponse.subclient._id,
//               subclientOfResponse.subclient.name
//             );
//           }
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }

//   uploadDownloadChanged(event: any) {
//     if (this.action == 'UPLOAD-DATA') {
//       this.excelUploadService.getAllReferenceNumbersWithStatusOpen().subscribe(
//         (response) => {
//           //console.log(response);
//           this.excelUploads = response;
//         },
//         (error) => {
//           console.log('Error getting reference numbers ', error);
//         }
//       );
//     } else {
//     }
//   }

//   getExcelUploadInfo(event: any) {
//     //console.log('selected excel upload reference number is ',this.selectedExcelUploadReferenceNumber);
//     this.excelUploadService
//       .getForOneReferenceNumber(this.selectedExcelUploadReferenceNumber)
//       .subscribe(
//         (response) => {
//           this.downloadExcelTemplateForm
//             .get('clientId')!
//             .setValue(response.client);
//           this.downloadExcelTemplateForm
//             .get('subclientId')!
//             .setValue(response.subclient);
//           this.showSubclientsForClient();
//           this.getRelevantClientContracts();
//           if (response.package) {
//             this.downloadExcelTemplateForm
//               .get('package')!
//               .setValue(response.package);
//             this.downloadExcelTemplateForm
//               .get('packageProfileAlacarte')!
//               .setValue('PACKAGE');
//             this.getPackages();
//             this.showPackageComponents();
//           }
//           if (response.profile) {
//             this.downloadExcelTemplateForm
//               .get('profile')!
//               .setValue(response.profile);
//             this.downloadExcelTemplateForm
//               .get('packageProfileAlacarte')!
//               .setValue('PROFILE');
//             this.getProfiles();
//             this.showProfileComponents();
//           }
//           if (response.componentsToCheck) {
//             this.componentsDataSource.data = response.componentsToCheck;
//             this.downloadExcelTemplateForm
//               .get('packageProfileAlacarte')!
//               .setValue('A-LA-CARTE');
//             this.readAllComponentsForThisContract();
//           }
//         },
//         (error) => {
//           console.log('error reading ref number ', error);
//         }
//       );
//   }

//   getRelevantClientContracts() {
//     this.clientContractService
//       .findAllForAClient(this.downloadExcelTemplateForm.get('clientId')!.value)
//       .subscribe(
//         (response) => {
//           let currentDate = new Date();
//           for (let item of response) {
//             if (
//               currentDate > new Date(item.effectiveDate) &&
//               currentDate < new Date(Date.parse(item.expiryDate))
//             ) {
//               this.relevantContractId = item._id;
//               break;
//             }
//           }
//           this.readAllComponentsForThisContract();
//           this.getPackages();
//           this.getProfiles();
//         },
//         (error) => {
//           console.log(
//             'Error reading contract details : ' + error.error.message
//           );
//         }
//       );
//   }

//   readAllComponentsForThisContract() {
//     if (this.relevantContractId) {
//       this.clientContractComponentService
//         .findAllWithoutFileUploadForAClientContract(this.relevantContractId)
//         .subscribe((response) => {
//           for (let responseItem of response) {
//             let caseComponent = new CaseComponent();
//             caseComponent.component = responseItem.component._id;
//             //console.log('response Item Component is ',responseItem.component._id);
//             caseComponent.componentName = responseItem.component.name;
//             caseComponent.price = responseItem.price;
//             caseComponent.tat = responseItem.tat;
//             this.componentsDataSource.data.push(caseComponent);
//           }
//           this.componentsDataSource._updateChangeSubscription();
//         });
//     }
//   }

//   clientSelectionChanged(event: any) {
//     this.getRelevantClientContracts();
//     this.showSubclientsForClient();
//   }
//   showSubclientsForClient() {
//     for (let client of this.clients) {
//       if (client._id == this.downloadExcelTemplateForm.get('clientId')!.value) {
//         this.subclients = client.subclients;
//         break;
//       }
//     }
//   }

//   getProfiles() {
//     this.clientContractProfileService
//       .findAllWithoutFileUploadForAClientContract(this.relevantContractId)
//       .subscribe(
//         (response) => {
//           // console.log("response for profiles are ",response)
//           this.profiles = response;
//         },
//         (error) => {
//           console.log('Error Reading Packages ' + error.error.message);
//         }
//       );
//   }
//   getPackages() {
//     this.clientContractPackageService
//       .findAllWithoutFileUpoadForAClientContract(this.relevantContractId)
//       .subscribe(
//         (response) => {
//           this.packages = response;
//         },
//         (error) => {
//           console.log('Error Reading Packages ' + error.error.message);
//         }
//       );
//   }

//   showProfileComponents() {
//     for (let profile of this.profiles) {
//       if (
//         this.downloadExcelTemplateForm.get('profile')!.value === profile._id
//       ) {
//         this.profileComponentsDataSource.data =
//           profile.clientContractProfileComponents;
//         this.downloadExcelTemplateForm.get('tat')!.setValue(profile.tat);
//         break;
//       }
//     }
//     this.profileComponentsDataSource._updateChangeSubscription();
//   }

//   showPackageComponents() {
//     for (let apackage of this.packages) {
//       if (
//         this.downloadExcelTemplateForm.get('package')!.value === apackage._id
//       ) {
//         this.packageComponentsDataSource.data =
//           apackage.clientContractPackageComponents;
//         this.downloadExcelTemplateForm.get('tat')!.setValue(apackage.tat);
//         this.downloadExcelTemplateForm.get('price')!.setValue(apackage.price);
//         break;
//       }
//     }
//     this.packageComponentsDataSource._updateChangeSubscription();
//   }

//   packageProfileAlacarteChanged(event: any) {
//     if (
//       this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
//       'A-LA-CARTE'
//     ) {
//       this.downloadExcelTemplateForm.get('profile')!.clearValidators();
//       this.downloadExcelTemplateForm.get('package')!.clearValidators();
//       this.downloadExcelTemplateForm.get('package')!.updateValueAndValidity();
//       this.downloadExcelTemplateForm.get('profile')!.updateValueAndValidity();
//     } else if (
//       this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
//       'PACKAGE'
//     ) {
//       this.downloadExcelTemplateForm
//         .get('package')!
//         .setValidators([Validators.required]);
//       this.downloadExcelTemplateForm.get('profile')!.clearValidators();
//       this.downloadExcelTemplateForm.get('profile')!.updateValueAndValidity();
//     } else if (
//       this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
//       'PROFILE'
//     ) {
//       this.downloadExcelTemplateForm
//         .get('profile')!
//         .setValidators([Validators.required]);
//       this.downloadExcelTemplateForm.get('package')!.clearValidators();
//       this.downloadExcelTemplateForm.get('package')!.updateValueAndValidity();
//     }
//   }

//   packageChanged(event: any) {
//     this.showPackageComponents();
//   }

//   profileChanged(event: any) {
//     this.showProfileComponents();
//   }

//   addToClient(clientId: string, subclientId: string, subclientName: string) {
//     for (let client of this.clients) {
//       if (client._id === clientId) {
//         if (client.subclients == null) {
//           client.subclients = new Array<Subclient>();
//         }
//         let subclient = new Subclient();
//         subclient._id = subclientId;
//         subclient.name = subclientName;
//         client.subclients.push(subclient);
//       }
//     }
//   }

//   foundInClients(clientId: string) {
//     for (let client of this.clients) {
//       if (client._id === clientId) {
//         return true;
//       }
//     }
//     return false;
//   }

//   showDetails(row: any) {
//     console.log('row === ', row);
//   }

//   // downloadExcelTemplate(){
//   //   let excelUpoad = new ExcelUpload();
//   //   excelUpoad.client = this.downloadExcelTemplateForm.get('clientId')!.value;
//   //   excelUpoad.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
//   //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='PACKAGE'){
//   //     excelUpoad.package = this.downloadExcelTemplateForm.get('package')!.value;
//   //   }
//   //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='PROFILE'){
//   //     excelUpoad.profile = this.downloadExcelTemplateForm.get('profile')!.value;
//   //   }
//   //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='A-LA-CARTE'){
//   //     excelUpoad.componentsToCheck = this.componentsDataSource.data;
//   //   }
//   //   excelUpoad.status='OPEN'
//   //   this.excelUploadService.create(excelUpoad).subscribe(
//   //     response=>{
//   //       //console.log(response);
//   //       this.writeExcelFile(response.referenceNumber);
//   //     },
//   //     error=>{
//   //       //console.log(error);
//   //     }
//   //   )
//   // }

//   async downloadExcelTemplate() {
//     let excelUpoad: ExcelUpload = {};
//     excelUpoad.client = this.downloadExcelTemplateForm.get('clientId')!.value;
//     excelUpoad.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
//     if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'PACKAGE') {
//       excelUpoad.package = this.downloadExcelTemplateForm.get('package')!.value;
//     }
//     if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'PROFILE') {
//       excelUpoad.profile = this.downloadExcelTemplateForm.get('profile')!.value;
//     }
//     if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value === 'A-LA-CARTE') {
//       excelUpoad.componentsToCheck = this.componentsDataSource.data;
//     }
//     excelUpoad.status = 'OPEN';
//     //    this.writeExcelFile();
// console.log('this.downloadExcelTemplateForm === ', this.downloadExcelTemplateForm.get('packageProfileAlacarte')?.value);
// console.log('excelUpoad == ', excelUpoad);

// // for (let profileComponent of this.profileComponentsDataSource.data) {
// //   console.log('profileComponent: ', profileComponent);

// //   let dataArray:any = []
// //   let fields = await this.componentFieldService
// //     .findAllFieldsForAComponentForExcelUpload(profileComponent.component)
// //     .toPromise();
// //     console.log(`${ profileComponent?.componentName } fields == `, fields);
// //   if (fields) {
// //     for (let i = 0; i < profileComponent.maxChecks; i++) {
// //       fields.forEach((field) => {
// //         console.log(`${ profileComponent?.componentName } field == `, field);
        
// //         if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
// //           dataArray.push(
// //             profileComponent.componentName + '_' + field.name
// //           );
// //         }
// //       });
// //     }
// //   }
// //   console.log('data array === ', dataArray);
  
// // }

//     this.excelUploadService.create(excelUpoad).subscribe(
//       (response) => {
//         //console.log(response);
//         this.writeExcelFile(response.referenceNumber);
//       },
//       (error) => {
//         //console.log(error);
//       }
//     );
//   }

//   async writeExcelFile(referenceNumber: number) {
//     let wb = XLSX.utils.book_new();
//     wb.SheetNames.push('Data');
//     let dataArray = new Array<string>();
//     await this.writePersonalDetailsFields(dataArray);

//     /*    dataArray.push("Name");
//     dataArray.push("Date of Birth(dd-MMM-yyyy)");
//     dataArray.push("Father's Name");
//     dataArray.push("Mobile Number");
//     dataArray.push("Employee Id");
//     dataArray.push("PAN");*/
//     await this.writeComponentFields(dataArray);

//     let ws_data = [dataArray];
//     let ws = XLSX.utils.aoa_to_sheet(ws_data);
//     wb.Sheets['Data'] = ws;
//     let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
//     saveAs(
//       new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
//       referenceNumber + '.xlsx'
//     );
//   }

//   writePersonalDetailsFields(dataArray: any) {
//     let promise = new Promise((resolve, reject) => {
//       this.personalDetailsService.find().subscribe(
//         (response) => {
//           //console.log("Personal Details Response ",response)
//           let personalDetails = response[0];
//           let personalDetailsFields = personalDetails.personalDetailsFields;
//           personalDetailsFields.forEach((item: any) => {
//             if (item.mandatory) {
//               if (item.name === 'dateofbirth') {
//                 dataArray.push('personalDetails_' + item.name + '(MM/DD/YYYY)');
//               } else {
//                 dataArray.push('personalDetails_' + item.name);
//               }
//             }
//           });
//           resolve(true);
//         },
//         (error) => {
//           //console.log("Error in reading personal details ",error);
//           reject(false);
//         }
//       );
//     });
//     return promise;
//   }

//   async writeComponentFields(dataArray: Array<string>) {
//     console.log('prfl:', this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value);

//     if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value == 'PACKAGE' ) {
//       for (let packageComponent of this.packageComponentsDataSource.data) {
//         //console.log(packageComponent.component);
//         let fields = await this.componentFieldService
//           .findAllFieldsForAComponentForExcelUpload(packageComponent.component)
//           .toPromise();
//         if (fields) {
//           for (let i = 0; i < packageComponent.maxChecks; i++) {
//             fields.forEach((field) => {
//               if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
//                 dataArray.push(
//                   packageComponent.componentName + '_' + field.name
//                 );
//               }
//             });
//           }
//         }
//         //console.log("got fields ",fields);
//         //console.log("going to next component");
//       }
//     } else if ( this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value == 'PROFILE' ) {
//       for (let profileComponent of this.profileComponentsDataSource.data) {
//         console.log('profileComponent: ', profileComponent);

//         let fields = await this.componentFieldService
//           .findAllFieldsForAComponentForExcelUpload(profileComponent.component)
//           .toPromise();
//         if (fields) {
//           for (let i = 0; i < profileComponent.maxChecks; i++) {
//             fields.forEach((field) => {
//               if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
//                 dataArray.push(
//                   profileComponent.componentName + '_' + field.name
//                 );
//               }
//             });
//           }
//         }
//       }
//     } else {
//       for (let comp of this.componentsDataSource.data) {
//         //console.log('getting component for the ala carte component ',comp.component)
//         if (comp.selected) {
//           let fields = await this.componentFieldService
//             .findAllFieldsForAComponentForExcelUpload(comp.component)
//             .toPromise();
//           //console.log('fileds value is ',fields);
//           if (fields) {
//             for (let i = 0; i < comp.maxChecks; i++) {
//               fields.forEach((field) => {
//                 if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
//                   dataArray.push(comp.componentName + '_' + field.name);
//                 }
//               });
//             }
//           }
//         }
//       }
//     }
//   }

//   getComponentFields(component: string) {
//     return new Promise((resolve, reject) => {
//       this.componentFieldService
//         .findAllFieldsForAComponent(component)
//         .subscribe(
//           (response: any) => {
//             //console.log("got response");
//             resolve(true);
//           },
//           (error: any) => {
//             //console.log("got error");
//             reject();
//           }
//         );
//     });
//   }

//   s2ab(s: any) {
//     let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
//     let view = new Uint8Array(buf); //create uint8array as viewer
//     for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
//     return buf;
//   }

//   //   async uploadButtonClicked(){
//   //     for(let i=0; i < this.jsonData.length;i++){
//   //       let data = this.jsonData[i];
//   //       //console.log("Name is  ",data);
//   //       let aCase = new Case();
//   //       aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
//   //       aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
//   //       aCase.candidateName = data.personalDetails_candidatename;
//   //       aCase.status = "INPUTQC-ACCEPTED";
//   //       if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value=='PACKAGE'){
//   //         aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
//   //         aCase.tat= this.downloadExcelTemplateForm.get('tat')!.value;
//   //       }else if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value=='PROFILE'){
//   //         aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
//   //         aCase.tat= this.downloadExcelTemplateForm.get('tat')!.value;
//   //       }else{
//   //         let alacarteComponents = new Array();
//   //         aCase.tat=0;
//   //         this.componentsDataSource.data.forEach(item=>{
//   //           if(item.selected){
//   //             //console.log("Item tat is ",item.tat);
//   //             if(item.tat > aCase.tat){
//   //               aCase.tat = item.tat;
//   //               //console.log("Case Tat is ",aCase.tat);
//   //             }
//   //             alacarteComponents.push(item)
//   //           }
//   //         })
//   //         aCase.componentsToCheck = alacarteComponents;
//   //       }
//   //       await this.caseUploadService.uploadExcelCase(aCase).toPromise().then(response=>{
//   //         //console.log("Response from server for upload excel case ",response)
//   //         //console.log("Length of the object key is ",Object.keys(data).length);
//   //         let previousObject = '';
//   //         let obj!:any;
//   //         for(let i=0; i < Object.keys(data).length;i++){
//   //          let objectkey =  Object.keys(data)[i];
//   //          let objectvalue = Object.values(data)[i];
//   //          //console.log("Want to create ",objectkey.substring(0,objectkey.indexOf("_")));

//   //          if(i==0){
//   //           obj = {}
//   //           obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
//   //           previousObject = objectkey.substring(0,objectkey.indexOf("_"))
//   //          }else if(previousObject != objectkey.substring(0,objectkey.indexOf("_"))){
//   //             obj["case"]=response._id;
//   // //            obj["status"] ="DE-COMPLETED"
//   //             obj["status"] ="INPUTQC-ACCEPTED"
//   //             //console.log("Want to create data ",obj);
//   //             if(previousObject == 'personalDetails'){
//   //               //console.log('Will be creating personal details')
//   //               this.PersonalDetailsDataService.create(obj).toPromise().then(perResponse=>{
//   //                 //console.log("Personal Details created")
//   //               })
//   //               .catch(perDetErr=>{
//   //                 //console.log("Error in creating personal details");
//   //               })
//   //             }else{
//   //               this.componentDataService.create(previousObject,obj).toPromise().then(compResponse=>{
//   //                 //console.log("Component created");
//   //               })
//   //               .catch(compErr=>{
//   //                 //console.log("Error in creating component");
//   //               })
//   //             }

//   //             obj = ({

//   //             })
//   //             obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
//   //             previousObject = objectkey.substring(0,objectkey.indexOf("_"))
//   //          }else{
//   //            //console.log("Setting the object value ",objectvalue)
//   //           obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
//   //          }
//   //         }
//   //         if(previousObject == 'personalDetails'){
//   //           obj["case"]=response._id;
//   //           obj["status"] ="INPUTQC-ACCEPTED"
//   //           this.PersonalDetailsDataService.create(obj).toPromise().then(perResponse=>{
//   //             //console.log("Personal Details created")
//   //           })
//   //           .catch(perDetErr=>{
//   //             //console.log("Error in creating personal details");
//   //           })
//   //         }else{
//   //           obj["case"]=response._id;
//   //           obj["status"] ="INPUTQC-ACCEPTED"
//   //           this.componentDataService.create(previousObject,obj).toPromise().then(compResponse=>{
//   //             //console.log("Component created");
//   //           })
//   //           .catch(compErr=>{
//   //             //console.log("Error in creating component");
//   //           })
//   //         }

//   //       })
//   //       .catch(error=>{
//   //         //console.log(error);
//   //       })
//   //     }
//   //   }

//   async uploadButtonClicked() {
//     let aCase = new Case();
//     aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
//     aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
//     aCase.batchId = this.selectedExcelUploadReferenceNumber;
//     if (
//       this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
//       'PACKAGE'
//     ) {
//       aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
//       aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
//     } else if (
//       this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
//       'PROFILE'
//     ) {
//       aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
//       aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
//     } else {
//       let alacarteComponents = new Array();
//       aCase.tat = 0;
//       this.componentsDataSource.data.forEach((item) => {
//         if (item.selected) {
//           //console.log("Item tat is ",item.tat);
//           if (item.tat > aCase.tat) {
//             aCase.tat = item.tat;
//             //console.log("Case Tat is ",aCase.tat);
//           }
//           alacarteComponents.push(item);
//         }
//       });
//       aCase.componentsToCheck = alacarteComponents;
//     }
//     console.log('Test CAses', aCase, this.jsonData, );

//     let file = this.excelFileToUpload;
//     console.log('file === ', file);
    
//     if (file) {
//       const formData = new FormData();
//       formData.append('aCase', JSON.stringify(aCase)); 
//       formData.append('data', JSON.stringify(this.jsonData)); 
//       formData.append('excelFile', file, file.name);
  
//       console.log('Uploading file and data...');
//       this.componentDataService.createExcel(aCase, this.jsonData, formData).subscribe(
//         (response) => {
//           console.log('Data Saved');
  
//           // this.showMessage("Data Saved");
//           // this.location.back();
//         },
//         (error) => {
//           console.log('error == ', error);
//           // this.showError(error.error.error);
//         }
//       );

//     }

//   }

//   uploadExcel() {
//     let promise = new Promise((resolve, reject) => {
//       let fileReader = new FileReader();
//       fileReader.onload = (e) => {
//         //console.log("inside on load");
//         const data = fileReader.result;
//         let workBook = XLSX.read(data, { type: 'binary' });
//         const wsname: string = workBook.SheetNames[0];
//         const ws: XLSX.WorkSheet = workBook.Sheets[wsname];
//         this.jsonData = XLSX.utils.sheet_to_json(ws);
//         //console.log("inside on load ....json data is ",this.jsonData)
//       };
//       fileReader.readAsBinaryString(this.excelFileToUpload);
//       resolve('COMPLETED');
//     });
//     return promise;
//   }

//   async fileChanged(event: any) {
//     console.log('In file change event');
//     this.excelFileToUpload = event.target.files[0];
//     let abc = await this.uploadExcel().then(
//       (val) => {
//         //console.log(val);
//         //console.log("Result from upload ",this.jsonData)
//       },
//       (err) => {
//         //console.log("Error  during upload ",err);
//       }
//     );
//   }
// }
////////////////new ///

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
// update-15sep25
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPopupComponent } from '../upload-popup/upload-popup.component';

// end


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
  selector: 'app-download-excel-template',
  templateUrl: './download-excel-template.component.html',
  styleUrls: ['./download-excel-template.component.scss'],
})
export class DownloadExcelTemplateComponent {
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
    // updated-15sep25
    private snackBar:MatSnackBar,
    private dialog: MatDialog
    // end
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

  // downloadExcelTemplate(){
  //   let excelUpoad = new ExcelUpload();
  //   excelUpoad.client = this.downloadExcelTemplateForm.get('clientId')!.value;
  //   excelUpoad.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
  //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='PACKAGE'){
  //     excelUpoad.package = this.downloadExcelTemplateForm.get('package')!.value;
  //   }
  //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='PROFILE'){
  //     excelUpoad.profile = this.downloadExcelTemplateForm.get('profile')!.value;
  //   }
  //   if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value==='A-LA-CARTE'){
  //     excelUpoad.componentsToCheck = this.componentsDataSource.data;
  //   }
  //   excelUpoad.status='OPEN'
  //   this.excelUploadService.create(excelUpoad).subscribe(
  //     response=>{
  //       //console.log(response);
  //       this.writeExcelFile(response.referenceNumber);
  //     },
  //     error=>{
  //       //console.log(error);
  //     }
  //   )
  // }

   downloadExcelTemplate() {
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
    //    this.writeExcelFile();
// console.log('this.downloadExcelTemplateForm === ', this.downloadExcelTemplateForm.get('packageProfileAlacarte')?.value);
// console.log('excelUpoad == ', excelUpoad);

// for (let profileComponent of this.profileComponentsDataSource.data) {
//   console.log('profileComponent: ', profileComponent);

//   let dataArray:any = []
//   let fields = await this.componentFieldService
//     .findAllFieldsForAComponentForExcelUpload(profileComponent.component)
//     .toPromise();
//     console.log(`${ profileComponent?.componentName } fields == `, fields);
//   if (fields) {
//     for (let i = 0; i < profileComponent.maxChecks; i++) {
//       fields.forEach((field) => {
//         console.log(`${ profileComponent?.componentName } field == `, field);
        
//         if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
//           dataArray.push(
//             profileComponent.componentName + '_' + field.name
//           );
//         }
//       });
//     }
//   }
//   console.log('data array === ', dataArray);
  
// }

    this.excelUploadService.create(excelUpoad).subscribe(
      (response) => {
        console.log("Ref no---",response);
        this.writeExcelFile(response?.referenceNumber);
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
    console.log("dataArray--",dataArray)
    await this.writePersonalDetailsFields(dataArray);

    /*    dataArray.push("Name");
    dataArray.push("Date of Birth(dd-MMM-yyyy)");
    dataArray.push("Father's Name");
    dataArray.push("Mobile Number");
    dataArray.push("Employee Id");
    dataArray.push("PAN");*/
    // updated-15sep25
    // await this.writeComponentFields(dataArray);
    // end-15sep25
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
          console.log("Personal Details Response ",response)
          let personalDetails = response[0];
          let personalDetailsFields = personalDetails.personalDetailsFields;
          personalDetailsFields.forEach((item: any) => {
            console.log("item pd",item)
            if (item.mandatory) {
              if (item.name === 'dateofbirth') {
                dataArray.push('personalDetails_' + item.name + '(MM/DD/YYYY)');
              } else {
                dataArray.push('personalDetails_' + item.name);
              }
            }
          });
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

  async writeComponentFields(dataArray: Array<string>) {
    console.log('prfl:', this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value);

    if (this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value == 'PACKAGE' ) {
      for (let packageComponent of this.packageComponentsDataSource.data) {
        //console.log(packageComponent.component);
        let fields = await this.componentFieldService
          .findAllFieldsForAComponentForExcelUpload(packageComponent.component)
          .toPromise();
        if (fields) {
          for (let i = 0; i < packageComponent.maxChecks; i++) {
            fields.forEach((field) => {
              if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
                dataArray.push(
                  packageComponent.componentName + '_' + field.name
                );
              }
            });
          }
        }
        //console.log("got fields ",fields);
        //console.log("going to next component");
      }
    } else if ( this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value == 'PROFILE' ) {
      for (let profileComponent of this.profileComponentsDataSource.data) {
        console.log('profileComponent: ', profileComponent);

        let fields = await this.componentFieldService
          .findAllFieldsForAComponentForExcelUpload(profileComponent.component)
          .toPromise();
        if (fields) {
          for (let i = 0; i < profileComponent.maxChecks; i++) {
            fields.forEach((field) => {
              if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
                dataArray.push(
                  profileComponent.componentName + '_' + field.name
                );
              }
            });
          }
        }
      }
    } else {
      for (let comp of this.componentsDataSource.data) {
        //console.log('getting component for the ala carte component ',comp.component)
        if (comp.selected) {
          let fields = await this.componentFieldService
            .findAllFieldsForAComponentForExcelUpload(comp.component)
            .toPromise();
          //console.log('fileds value is ',fields);
          if (fields) {
            for (let i = 0; i < comp.maxChecks; i++) {
              fields.forEach((field) => {
                if (field.lhsRhs == 'LHS' || field.lhsRhs == 'BOTH') {
                  dataArray.push(comp.componentName + '_' + field.name);
                }
              });
            }
          }
        }
      }
    }
  }

  // updated-15sep25-add
openUploadDialog(): void {
  const dialogRef = this.dialog.open(UploadPopupComponent, {
    width: '500px',
    data: { 
      clientId: this.downloadExcelTemplateForm.get('clientId')!.value,
      subclientId: this.downloadExcelTemplateForm.get('subclientId')!.value,
      packageProfileAlacarte: this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value,
      package: this.downloadExcelTemplateForm.get('package')!.value,
      profile: this.downloadExcelTemplateForm.get('profile')!.value,
      tat: this.downloadExcelTemplateForm.get('tat')!.value,
      components: this.componentsDataSource.data
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.processUpload(result.excelFile, result.zipFile);
    }
  });
}

async processUpload(excelFile: File, zipFile: File | null) {
  console.log("Processing upload");

  const formData = new FormData();
  formData.append('excel', excelFile);
  if (zipFile) {
    formData.append('zip', zipFile);
  }

  const aCase = this.prepareCaseData();
  formData.append('aCase', JSON.stringify(aCase));

  this.componentDataService.uploadCaseFiles(formData).subscribe(
    response => {
      this.showMessage("Files uploaded successfully");
        const uploadedFilePaths = {
        excelFilePath: response.excelFilePath,
        zipFilePath: response.zipFilePath
      };
      this.processExcelData(aCase, excelFile, uploadedFilePaths);
    },
    error => {
      console.error("Upload error:", error);
      this.showError(error.error.error);
    }
  );
}

prepareCaseData(): any {
  let aCase = new Case();
  aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
  aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
  aCase.batchId = this.selectedExcelUploadReferenceNumber;

  const mode = this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value;

  if (mode === 'PACKAGE') {
    aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
    aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
  } else if (mode === 'PROFILE') {
    aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
    aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
  } else if (mode === 'A-LA-CARTE') {
    let alacarteComponents: any[] = [];
    aCase.tat = 0;

    this.componentsDataSource.data.forEach((item) => {
      if (item.selected) {
        if (item.tat > aCase.tat) {
          aCase.tat = item.tat;
        }
        alacarteComponents.push(item);
      }
    });

    aCase.componentsToCheck = alacarteComponents;
  }

  return aCase;
}

processExcelData(aCase: any, excelFile: File,filePaths: any) {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet);

      // this.componentDataService.createExcel(aCase, this.jsonData).subscribe(
              // update-expo-20Sep25
        this.componentDataService.createExcel(aCase, this.jsonData,filePaths ).subscribe(
          // end-20Sep25
        response => {
          this.showMessage("Data processed successfully");
        },
        error => {
          console.error("Excel processing error:", error);
          this.showError(error.error.error);
        }
      );
    } catch (error) {
      console.error('Error reading Excel file:', error);
      this.showError('Failed to process Excel file');
    }
  };
  reader.readAsArrayBuffer(excelFile);
}
showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  // end-15sep25
  getComponentFields(component: string) {
    return new Promise((resolve, reject) => {
      this.componentFieldService
        .findAllFieldsForAComponent(component)
        .subscribe(
          (response: any) => {
            //console.log("got response");
            resolve(true);
          },
          (error: any) => {
            //console.log("got error");
            reject();
          }
        );
    });
  }

  s2ab(s: any) {
    let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    let view = new Uint8Array(buf); //create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }

  //   async uploadButtonClicked(){
  //     for(let i=0; i < this.jsonData.length;i++){
  //       let data = this.jsonData[i];
  //       //console.log("Name is  ",data);
  //       let aCase = new Case();
  //       aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
  //       aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
  //       aCase.candidateName = data.personalDetails_candidatename;
  //       aCase.status = "INPUTQC-ACCEPTED";
  //       if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value=='PACKAGE'){
  //         aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
  //         aCase.tat= this.downloadExcelTemplateForm.get('tat')!.value;
  //       }else if(this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value=='PROFILE'){
  //         aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
  //         aCase.tat= this.downloadExcelTemplateForm.get('tat')!.value;
  //       }else{
  //         let alacarteComponents = new Array();
  //         aCase.tat=0;
  //         this.componentsDataSource.data.forEach(item=>{
  //           if(item.selected){
  //             //console.log("Item tat is ",item.tat);
  //             if(item.tat > aCase.tat){
  //               aCase.tat = item.tat;
  //               //console.log("Case Tat is ",aCase.tat);
  //             }
  //             alacarteComponents.push(item)
  //           }
  //         })
  //         aCase.componentsToCheck = alacarteComponents;
  //       }
  //       await this.caseUploadService.uploadExcelCase(aCase).toPromise().then(response=>{
  //         //console.log("Response from server for upload excel case ",response)
  //         //console.log("Length of the object key is ",Object.keys(data).length);
  //         let previousObject = '';
  //         let obj!:any;
  //         for(let i=0; i < Object.keys(data).length;i++){
  //          let objectkey =  Object.keys(data)[i];
  //          let objectvalue = Object.values(data)[i];
  //          //console.log("Want to create ",objectkey.substring(0,objectkey.indexOf("_")));

  //          if(i==0){
  //           obj = {}
  //           obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
  //           previousObject = objectkey.substring(0,objectkey.indexOf("_"))
  //          }else if(previousObject != objectkey.substring(0,objectkey.indexOf("_"))){
  //             obj["case"]=response._id;
  // //            obj["status"] ="DE-COMPLETED"
  //             obj["status"] ="INPUTQC-ACCEPTED"
  //             //console.log("Want to create data ",obj);
  //             if(previousObject == 'personalDetails'){
  //               //console.log('Will be creating personal details')
  //               this.PersonalDetailsDataService.create(obj).toPromise().then(perResponse=>{
  //                 //console.log("Personal Details created")
  //               })
  //               .catch(perDetErr=>{
  //                 //console.log("Error in creating personal details");
  //               })
  //             }else{
  //               this.componentDataService.create(previousObject,obj).toPromise().then(compResponse=>{
  //                 //console.log("Component created");
  //               })
  //               .catch(compErr=>{
  //                 //console.log("Error in creating component");
  //               })
  //             }

  //             obj = ({

  //             })
  //             obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
  //             previousObject = objectkey.substring(0,objectkey.indexOf("_"))
  //          }else{
  //            //console.log("Setting the object value ",objectvalue)
  //           obj[objectkey.substring(objectkey.indexOf("_")+1,objectkey.length)] = objectvalue
  //          }
  //         }
  //         if(previousObject == 'personalDetails'){
  //           obj["case"]=response._id;
  //           obj["status"] ="INPUTQC-ACCEPTED"
  //           this.PersonalDetailsDataService.create(obj).toPromise().then(perResponse=>{
  //             //console.log("Personal Details created")
  //           })
  //           .catch(perDetErr=>{
  //             //console.log("Error in creating personal details");
  //           })
  //         }else{
  //           obj["case"]=response._id;
  //           obj["status"] ="INPUTQC-ACCEPTED"
  //           this.componentDataService.create(previousObject,obj).toPromise().then(compResponse=>{
  //             //console.log("Component created");
  //           })
  //           .catch(compErr=>{
  //             //console.log("Error in creating component");
  //           })
  //         }

  //       })
  //       .catch(error=>{
  //         //console.log(error);
  //       })
  //     }
  //   }
///20Sep2025//
  // async uploadButtonClicked() {
  //   let aCase = new Case();
  //   aCase.client = this.downloadExcelTemplateForm.get('clientId')!.value;
  //   aCase.subclient = this.downloadExcelTemplateForm.get('subclientId')!.value;
  //   aCase.batchId = this.selectedExcelUploadReferenceNumber;
  //   if (
  //     this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
  //     'PACKAGE'
  //   ) {
  //     aCase.package = this.downloadExcelTemplateForm.get('package')!.value;
  //     aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
  //   } else if (
  //     this.downloadExcelTemplateForm.get('packageProfileAlacarte')!.value ==
  //     'PROFILE'
  //   ) {
  //     aCase.profile = this.downloadExcelTemplateForm.get('profile')!.value;
  //     aCase.tat = this.downloadExcelTemplateForm.get('tat')!.value;
  //   } else {
  //     let alacarteComponents = new Array();
  //     aCase.tat = 0;
  //     this.componentsDataSource.data.forEach((item) => {
  //       if (item.selected) {
  //         //console.log("Item tat is ",item.tat);
  //         if (item.tat > aCase.tat) {
  //           aCase.tat = item.tat;
  //           //console.log("Case Tat is ",aCase.tat);
  //         }
  //         alacarteComponents.push(item);
  //       }
  //     });
  //     aCase.componentsToCheck = alacarteComponents;
  //   }
  //   console.log('Test CAses', aCase, this.jsonData, );

  //   let file = this.excelFileToUpload;
  //   console.log('file === ', file);
    
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('aCase', JSON.stringify(aCase)); 
  //     formData.append('data', JSON.stringify(this.jsonData)); 
  //     formData.append('excelFile', file, file.name);
  
  //     console.log('Uploading file and data...');
  //     this.componentDataService.createExcel(aCase, this.jsonData).subscribe(
  //       (response) => {
  //         console.log('Data Saved');
  
  //         // this.showMessage("Data Saved");
  //         // this.location.back();
  //       },
  //       (error) => {
  //         console.log('error == ', error);
  //         // this.showError(error.error.error);
  //       }
  //     );

  //   }

  // }
///20Sep2025//
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
}