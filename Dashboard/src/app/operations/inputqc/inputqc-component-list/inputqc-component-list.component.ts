// import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { Location } from '@angular/common';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { Route, Router } from '@angular/router';
// import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
// import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
// import { ComponentService } from 'src/app/administration/service/component.service';
// import { ComponentDataService } from '../../service/component-data.service';
// import { PersonalDetailsDataService } from '../../service/personal-details-data.service';
// import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { catchError, firstValueFrom, forkJoin, map, of, switchMap } from 'rxjs';

// export interface UserData {
//   _id:any,
//   component:any,
//   status:any
// }

// @Component({
//   selector: 'app-inputqc-component-list',
//   templateUrl: './inputqc-component-list.component.html',
//   styleUrls: ['./inputqc-component-list.component.scss']
// })
// export class InputqcComponentListComponent { 
//   _id :any;
//   caseId!:string;
//   case_id!:string;
//   candidateName!:string;
//   client_id! :string;
//   clientName!:string;
//   subclient_id! :string;
//   subclientName!:string; 
//   tatstart!:string;
//   tatend!:string;
//   maxChecks:number=0
//   colorTypes!:string;
//   comments!:string;
//   showDetailsFlag: boolean = false;
//   selectedRow: any;
//   displayedColumns = ['serialNumber','component','checkId','status'];
//   dataSource: MatTableDataSource<UserData>;
//   caseStatus!:string;
// ////Case Level comments////
// casecolorType!:string;
// casecomment!:string;
// ShowComments:boolean=false;
// ////Case Level comments////
//   // @ViewChild(MatPaginator)
//   // paginator!: MatPaginator;
//   @ViewChild(MatSort)
//   sort!: MatSort;
//   window: any;

//   constructor(    
//     private componentDetailsForVerificationService :ComponentDetailsForVerificationService,
//     private caseUpoadService:CaseUploadService,
//     private clientContractPackageService:ClientContractPackageService,
//     private clientContractprofileService:ClientContractProfileService,
//     private personalDetailsDataService:PersonalDetailsDataService,
//     private componentService:ComponentService,
//     private componentDataService:ComponentDataService,
//     private location:Location,
//     private snackBar:MatSnackBar,
//     private router:Router){
//     this.dataSource = new MatTableDataSource();
   
//   }

//   ngOnInit(): void {
//     // this.findCases();
// /////Sharath/////
//     let verifications: any = this.componentDetailsForVerificationService.getVerificationItem();

//     /// added code refresh///
//      if (!verifications) {
//         this.router.navigate(['/home/inputqc/inputqccaselist']);
//         return;
//       }
//   /////Sharath/////

//     let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
//     const {case_id,caseId,candidateName,client_id, clientName, subclient_id, subclientName, tatstart, tatend, colorTypes, comments } = verification;
//     this._id = case_id;
//     this.caseId = caseId;
//     this.candidateName = candidateName;
//     this.client_id = client_id;
//     this.clientName = clientName;
//     this.subclient_id = subclient_id;
//     this.subclientName = subclientName;
//     this.tatstart = tatstart;
//     this.tatend = tatend;
//       ///case Level Comments/////
//       // this.casecolorType = colorTypes;
//       // this.casecomment = comments;   
//   this.casecolorType = this.componentDetailsForVerificationService.getVerificationItem().colorTypes;
//   this.casecomment = this.componentDetailsForVerificationService.getVerificationItem().comments;   
//   console.log("casecomment:",comments);
  
//   if (this.casecomment != null && this.casecomment !== "") {
//     this.ShowComments = true;
//   } else {
//     this.ShowComments = false;
//   }
//   ///case Level Comments/////
//     this.getCaseDetails();
//     this.addComponents();
//   }

//   ngAfterViewInit(): void {
//     // this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   getCaseDetails(){
//     this.caseUpoadService.findACase(this._id).subscribe(
//       response=>{
        
//         this.casecolorType =response.comments && response.comments.length > 0  ? response.comments[response.comments.length - 1].colorType  : "";
//         this.casecomment = response.comments && response.comments.length > 0  ? response.comments[response.comments.length - 1].comment  : "";
//         if (this.casecomment != null && this.casecomment !== "") {
//           this.ShowComments = true;
//         } else {
//           this.ShowComments = false;
//         }
//         console.log("cooolooor Type",response);
        
        
//         if(response.package !== null){
//           this.clientContractPackageService.findOne(response.package).subscribe(
//             response2=>{
//               response2.clientContractPackageComponents.forEach((item : any)=>{
//                 this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
//               })
//             },
//             error=>{
//              console.log("Error getting profile check count")
//             }
//           )
//         }else if(response.profile != null){
//           this.clientContractprofileService.getClientContractProfileDetails(response.profile).subscribe(
//             response2=>{
//               response2.clientContractProfileComponents.forEach((item:any)=>{
//                 this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
//               })
//             },
//             error=>{
//               console.log("Error getting profile check count")
//             }
//           )
//         }else{
//           response.componentsToCheck.forEach((item:any)=>{
//             this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
//           })
//         }
//       },
//       error=>{
//         console.log("Error getting profile check count")
//       }
//     )
//   }

//   async addComponents(){
//     await this.addPersonalDetails();
//     await this.addIndividualComponents();
//   }

//   statusDisplayMap: Record<string, string> = {
//     'DE-COMPLETED': 'Data Entry Completed',
//     'INPUTQC-ACCEPTED': 'Inputqc Accepted',
//     'INPUTQC-REJECTED': 'Inputqc Rejected',
//     'INSUF-1-REQ': 'Insufficiency Requested',
//     'INSUF-1-REQ-ACCEPTED': 'Insufficiency Request Accepted',
//   }

//   addPersonalDetails(){
//     let promise = new Promise((resolve,reject)=>{
//       this.personalDetailsDataService.read(this._id).subscribe(
//         response => {
//           const componentDetails: any = {
//             caseId: this.caseId,
//             case_id: this._id,
//             candidateName: this.candidateName,
//             clientName: this.clientName,
//             subclientName: this.subclientName,
//             tatstart : this.tatstart,
//             tatend : this.tatend,
//             componentDisplayName: 'Personal Details',
//             componentName: 'personalDetails',
//             status: response.status || 'DE-COMPLETED',
//             displayStatus: this.statusDisplayMap[response.status] ||  'Data Entry Completed',
//             casecolorType : this.casecolorType,
//             casecomment : this.casecomment,
//           };
//             this.dataSource.data = [...this.dataSource.data, componentDetails];
//           resolve(true); 
//          },
//         error => {
//           console.log(error.error.message)
//           reject(false)
//         }      
//       )
//     })
//     return promise;
//   }
//   ///new 20Jun2025///
//     async addIndividualComponents(): Promise<boolean> {
//   try {
//     const caseResponse = await firstValueFrom(this.caseUpoadService.findACase(this._id));

//     for (let compData of caseResponse.componentsToCheck) {
//       const componentResponse = await firstValueFrom(this.componentService.findAComponent(compData?.component));
//       // console.log("componentRe",componentResponse)
//       const dataResponse = await firstValueFrom(
//         this.componentDataService.findAllForACase(componentResponse.name, this._id)
//       );

//       dataResponse.forEach(item => {
//         const componentDetails: any = {
//           _id: item._id,
//           caseId: this.caseId,
//           case_id: this._id,
//           candidateName: this.candidateName,
//           clientName: this.clientName,
//           subclientName: this.subclientName,
//           subclientId: this.subclient_id,
//           subclient_id: this.subclient_id,
//           tatstart: this.tatstart,
//           tatend: this.tatend,
//           componentDisplayName: componentResponse.displayName,
//           checkId: item.checkId ? item.checkId : '',
//           componentName: componentResponse.name,
//           component_id: componentResponse._id,
//           componentType: componentResponse.type,
//           status: item.status,
//           displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
//           casecolorType: this.casecolorType,
//           casecomment: this.casecomment,
//         };

//         this.dataSource.data = [...this.dataSource.data, componentDetails];
//       });
//     }

//     return true;
//   } catch (error) {
//     // console.error("Error " || error);
//     console.log("Error in addIndividualComponents",error)
//     return false;
//   }
// }
// // addIndividualComponents() {
// //   return new Promise((resolve, reject) => {
// //     this.componentService.findAllComponents().pipe(
// //       switchMap((components: any[]) => {
// //         const requests = components.map((component: any) =>
// //           this.componentDataService.findAllForACase(component.name, this._id).pipe(
// //             catchError(() => of([])), // continue even if one fails
// //             map((items: any[]) =>
// //               items.map((item) => ({
// //                 _id: item._id,
// //                 caseId: this.caseId,
// //                 case_id: this._id,
// //                 candidateName: this.candidateName,
// //                 clientName: this.clientName,
// //                 subclientName: this.subclientName,
// //                 subclientId: this.subclient_id,
// //                 subclient_id: this.subclient_id,
// //                 tatstart: this.tatstart,
// //                 tatend: this.tatend,
// //                 componentDisplayName: component.displayName,
// //                 checkId: item.checkId || '',
// //                 componentName: component.name,
// //                 component_id: component._id,
// //                 componentType: component.type,
// //                 status: item.status,
// //                 displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
// //                 casecolorType: this.casecolorType,
// //                 casecomment: this.casecomment,
// //               }))
// //             )
// //           )
// //         );
// //         return forkJoin(requests);
// //       })
// //     ).subscribe({
// //       next: (allComponentGroups: any[][]) => {
// //         const flattened = allComponentGroups.flat();
// //         this.dataSource.data = [...this.dataSource.data, ...flattened]; // update once
// //         resolve(true);
// //       },
// //       error: (err) => {
// //         console.error('Error loading components', err);
// //         reject(false);
// //       }
// //     });
// //   });
// // }
//   ///new 20Jun2025///

//   // addIndividualComponents(){
//   //   let promise = new Promise((resolve,reject)=>{
//   //     this.componentService.findAllComponents().subscribe(
//   //       response => {
//   //         response.forEach(component=>{
//   //           this.componentDataService.findAllForACase(component.name,this._id).subscribe(
//   //             response2 => {
//   //               response2.forEach(item => {
//   //                 console.log("item",item);
                  
//   //                 const componentDetails: any = {
//   //                   _id: item._id,
//   //                   caseId: this.caseId,
//   //                   case_id: this._id,
//   //                   candidateName: this.candidateName,
//   //                   clientName: this.clientName,
//   //                   subclientName: this.subclientName,
//   //                   subclientId: this.subclient_id,
//   //                   subclient_id: this.subclient_id,
//   //                   tatstart : this.tatstart,
//   //                   tatend : this.tatend,
//   //                   componentDisplayName: component.displayName,
//   //                   checkId: item.checkId ? item.checkId :'',
//   //                   // componentDetails['checkId'] = item.checkId ? item.checkId : '';
//   //                   componentName: component.name,
//   //                   component_id: component._id,
//   //                   componentType: component.type,
//   //                   status: item.status,
//   //                   displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
//   //                   casecolorType : this.casecolorType,
//   //                   casecomment : this.casecomment,
//   //                   // colorType : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
//   //                   // comment : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
//   //                 };
//   //                 this.dataSource.data = [...this.dataSource.data, componentDetails];
//   //               })
//   //             },
//   //             error => {
//   //              console.log(error.error.message);
//   //             }
//   //           )
//   //         })
//   //         resolve(true);
//   //       },
//   //       error=>{
//   //        console.log(error.error.message);
//   //         reject(false);
//   //       }
//   //     )
      
//   //   })
//   //   return promise;
//   // }
//   async confirmButtonClicked() {
//     try {
//       await this.getOverallStatus().then(data=>{
//         //console.log("Overall status is",data)
//         this.caseUpoadService.updateStatus(this._id,{status:this.caseStatus}).subscribe(
//           response=>{
//             this.showMessage("Case Status Saved");
//             this.router.navigate(['/home/inputqc/inputqccaselist']).then(() => {
//               // After navigation is complete, reload the page
//               this.window.location.reload();
//             });
//                   },
//           error=>{
//             this.showError("Error changing case status")
//           }
//         )
//       });
//       // console.log("caseStatus",this.caseStatus);
//       // const updatedStatus = await this.caseUpoadService.updateStatus(this._id, { status: this.caseStatus }).toPromise();
//       // console.log("Case Status Saved", updatedStatus);
//       this.showMessage("Data saved");
//       // this.location.back();
//       // this.window.reload();
//       this.router.navigate([`/home/inputqc/inputqccaselist`]);
//     } catch (error) {
//       // this.showError("Error");
//       console.error("Error changing case status", error);
//     }
//   }
//   // async confirmButtonClicked(){
//   //   await this.getOverallStatus().then(data=>{
//   //     //console.log("Overall status is",data)
//   //     this.caseUpoadService.updateStatus(this._id,{status:this.caseStatus}).subscribe(
//   //       response=>{
//   //        console.log("Case Status Saved");
//   //        this.showMessage("Data saved")
//   //        this.router.navigate([`home/inputqc/inputqccaselist`])
//   //         // this.location.back();
//   //       },
//   //       error=>{
//   //         this.showError(error.error.message);

//   //         console.log("Error changing case status")
//   //       }
//   //     )
//   //   });

//   // }

//   getOverallStatus(){
//     let promise =new Promise((resolve,reject)=>{
//       this.caseStatus = 'INPUTQC-ACCEPTED'
//       for(let i=0;i < this.dataSource.data.length;i++){
//         let item = this.dataSource.data[i];
//         if(item.status=='DE-COMPLETED'){
//           this.caseStatus='DE-COMPLETED';
//           break;
//         }else if(item.status=='INPUTQC-REJECTED'){
//           this.caseStatus="INPUTQC-REJECTED";
//           break;
//         }else if(item.status=='INSUF-1-REQ'){
//           this.caseStatus="DE-COMPLETED";
//           break;
//         }
        
//       }
//       resolve(true);
//     })
//     return promise;
//   }

//   showDetails(row:any){  
//       // console.log('hello', row.status);
//       this.selectedRow = row 
      
//       this.componentDetailsForVerificationService.setVerificationItem(row);
//       this.showDetailsFlag = true;
//       console.log('selected value === ',this.selectedRow);
    
//     let { componentName } = row;
//     (componentName === 'personalDetails') ? 
//     (this.router.navigate([`/home/inputqc/personaldetailsinputqc`])) : 
//     (this.router.navigate([`/home/inputqc/componentinputqc`]));
//   }

// ////Case Level comments////
// getClassToApply(){
//     // let colorType = this.comments? this.comments.colorType : ""
//     let colorType = this.casecolorType
//   if(colorType === "RED"){
//     return 'red'
//   }else if(colorType === "VIOLET"){
//     return 'Violet'
//   }else if(colorType === "INDIGO"){
//     return 'Indigo'
//   }else if(colorType === "BLUE"){
//     return 'Blue'
//   }else if(colorType === "GREEN"){
//     return 'Green'
//   }else if(colorType === "YELLOW"){
//     return 'Yellow'
//   }else if(colorType === "ORANGE"){
//     return 'Orange'
//   }else if(colorType === "PINK"){
//     return 'Pink'
//   }else if(colorType === "GREY"){
//     return 'Grey'
//   }else if(colorType === "PURPLE"){
//     return 'Purple'
//   }else{
//       return '#ED7014'
//     }
//   }


//   ////Case Level comments////

//   cdelink(){
//     this.caseUpoadService.cdelink(this._id).subscribe(
//       response=>{
//         this.showMessage("Sent email successfully");

//               },
//       error=>{
//         this.showError("Error sending Email ")
//       }
//     )

//   }
//   showMessage(msg: string){
//     this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }
//   showError(msg: string){
//     this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }
// }
//////////////////////////////////Given by shararth///////////////////
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from '../../service/component-data.service';
import { PersonalDetailsDataService } from '../../service/personal-details-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { log } from 'console';

export interface UserData {
  _id:any,
  component:any,
  status:any
}

@Component({
  selector: 'app-inputqc-component-list',
  templateUrl: './inputqc-component-list.component.html',
  styleUrls: ['./inputqc-component-list.component.scss']
})
export class InputqcComponentListComponent { 
  _id :any;
  caseId!:string;
  case_id!:string;
  candidateName!:string;
  client_id! :string;
  clientName!:string;
  subclient_id! :string;
  subclientName!:string; 
  tatstart!:string;
  tatend!:string;
  maxChecks:number=0
  colorTypes!:string;
  comments!:string;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns = ['serialNumber','component','checkId','status'];
  dataSource: MatTableDataSource<UserData>;
  caseStatus!:string;
////Case Level comments////
casecolorType!:string;
casecomment!:string;
ShowComments:boolean=false;
////Case Level comments////
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  window: any;

  constructor(    
    private componentDetailsForVerificationService :ComponentDetailsForVerificationService,
    private caseUpoadService:CaseUploadService,
    private clientContractPackageService:ClientContractPackageService,
    private clientContractprofileService:ClientContractProfileService,
    private personalDetailsDataService:PersonalDetailsDataService,
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private location:Location,
    private snackBar:MatSnackBar,
    private router:Router){
    this.dataSource = new MatTableDataSource();

   
  }

  isLoading: boolean = true;/// added the line

  ngOnInit(): void {
    // this.findCases();
    let verification: any = this.componentDetailsForVerificationService.getVerificationItem();
    /// added code refresh///
     if (!verification) {
    this.router.navigate(['/home/inputqc/inputqccaselist']);
    return;
  }
  ////////
    const {case_id,caseId,candidateName,client_id, clientName, subclient_id, subclientName, tatstart, tatend, colorTypes, comments } = verification;
    this._id = case_id;
    this.caseId = caseId;
    this.candidateName = candidateName;
    this.client_id = client_id;
    this.clientName = clientName;
    this.subclient_id = subclient_id;
    this.subclientName = subclientName;
    this.tatstart = tatstart;
    this.tatend = tatend;
      ///case Level Comments/////
      // this.casecolorType = colorTypes;
      // this.casecomment = comments;   
  this.casecolorType = this.componentDetailsForVerificationService.getVerificationItem().colorTypes;
  this.casecomment = this.componentDetailsForVerificationService.getVerificationItem().comments;   
  console.log("casecomment:",this.casecomment);
  
  if (this.casecomment != null && this.casecomment !== "") {
    this.ShowComments = true;
  } else {
    this.ShowComments = false;
  }
  ///case Level Comments/////
    this.getCaseDetails();
    this.addComponents();
    //  this.isLoading = false;
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCaseDetails(){
    this.caseUpoadService.findACase(this._id).subscribe(
      response=>{
        console.log("response form caseupload",response)
        this.casecolorType =response.comments && response.comments.length > 0  ? response.comments[response.comments.length - 1].colorType  : "";
        this.casecomment = response.comments && response.comments.length > 0  ? response.comments[response.comments.length - 1].comment  : "";
        if (this.casecomment != null && this.casecomment !== "") {
          this.ShowComments = true;
        } else {
          this.ShowComments = false;

        }
        console.log("cooolooor Type",response);
        
        
        if(response?.package != null){
          console.log("package from input-qc-list---",response?.package)
          this.clientContractPackageService.findOne(response?.package).subscribe(
            response2=>{
              response2.clientContractPackageComponents.forEach((item : any)=>{
                this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
              })
            },
            error=>{
             console.log("Error getting profile check count in if condition",error)
            }
          )
        }else if(response?.profile != null){
          this.clientContractprofileService.getClientContractProfileDetails(response.profile).subscribe(
            response2=>{
              response2.clientContractProfileComponents.forEach((item:any)=>{
                this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
              })
            },
            error=>{
              console.log("Error getting profile check count in else if condition",error)
            }
          )
        }else if(response?.componentsToCheck != null){
          console.log("componentsToCheck from input-qc-list---",response?.componentsToCheck)
          response.componentsToCheck.forEach((item:any)=>{
            this.maxChecks = this.maxChecks + (item.maxChecks != null ? parseInt(item.maxChecks):0)
          })
        }else{
          console.log("error no components to check")
        }
      },
      error=>{
        console.log("Error getting profile check count",error)
      }
    )
  }

  async addComponents(){
    await this.addPersonalDetails();
    await this.addIndividualComponents();
  }

  statusDisplayMap: Record<string, string> = {
    'DE-COMPLETED': 'Data Entry Completed',
    'INPUTQC-ACCEPTED': 'Inputqc Accepted',
    'INPUTQC-REJECTED': 'Inputqc Rejected',
    'INSUF-1-REQ': 'Insufficiency Requested',
    'DELETED-CHECK': 'DELETED-CHECK',
    'INSUF-1-REQ-ACCEPTED': 'Insufficiency Request Accepted',
    
  }

  addPersonalDetails(){
    let promise = new Promise((resolve,reject)=>{
      this.personalDetailsDataService.read(this._id).subscribe(
        response => {
          const componentDetails: any = {
            caseId: this.caseId,
            case_id: this._id,
            candidateName: this.candidateName,
            clientName: this.clientName,
            subclientName: this.subclientName,
            tatstart : this.tatstart,
            tatend : this.tatend,
            componentDisplayName: 'Personal Details',
            componentName: 'personalDetails',
            status: response.status || 'DE-COMPLETED',
            displayStatus: this.statusDisplayMap[response.status] ||  'Data Entry Completed',
            casecolorType : this.casecolorType,
            casecomment : this.casecomment,
          };
            this.dataSource.data = [...this.dataSource.data, componentDetails];
          resolve(true); 
         },
        error => {
          console.log(error.error.message)
          reject(false)
        }      
      )
    })
    return promise;
  }

  // addIndividualComponents(){
  //   let promise = new Promise((resolve,reject)=>{

      
  //     this.componentService.findAllComponents().subscribe(
  //       response => {
  //         response.forEach(component=>{
  //           this.componentDataService.findAllForACase(component.name,this._id).subscribe(
  //             response2 => {
  //               response2.forEach(item => {
  //                 console.log("item",item);
                  
  //                 const componentDetails: any = {
  //                   _id: item._id,
  //                   caseId: this.caseId,
  //                   case_id: this._id,
  //                   candidateName: this.candidateName,
  //                   clientName: this.clientName,
  //                   subclientName: this.subclientName,
  //                   subclientId: this.subclient_id,
  //                   subclient_id: this.subclient_id,
  //                   tatstart : this.tatstart,
  //                   tatend : this.tatend,
  //                   componentDisplayName: component.displayName,
  //                   checkId: item.checkId ? item.checkId :'',
  //                   // componentDetails['checkId'] = item.checkId ? item.checkId : '';
  //                   componentName: component.name,
  //                   component_id: component._id,
  //                   componentType: component.type,
  //                   status: item.status,
  //                   displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
  //                   casecolorType : this.casecolorType,
  //                   casecomment : this.casecomment,
  //                   // colorType : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
  //                   // comment : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
  //                 };
  //                 this.dataSource.data = [...this.dataSource.data, componentDetails];
  //               })
  //             },
  //             error => {
  //              console.log(error.error.message);
  //             }
  //           )
  //         })
  //         resolve(true);
  //       },
  //       error=>{
  //        console.log(error.error.message);
  //         reject(false);
  //       }
  //     )
      
  //   })
  //   return promise;
  // }

  //added the new api implimentation..

//   async addIndividualComponents(): Promise<boolean> {
//   try {
//     const caseResponse = await firstValueFrom(this.caseUpoadService.findACase(this._id));

//     for (let compData of caseResponse.componentsToCheck) {
//       const componentResponse = await firstValueFrom(this.componentService.findAComponent(compData?.component));
//       // console.log("componentRe",componentResponse)
      
//       const dataResponse = await firstValueFrom(
//         this.componentDataService.findAllForACase(componentResponse.name, this._id)
//       );

//       dataResponse.forEach(item => {
//         const componentDetails: any = {
//           _id: item._id,
//           caseId: this.caseId,
//           case_id: this._id,
//           candidateName: this.candidateName,
//           clientName: this.clientName,
//           subclientName: this.subclientName,
//           subclientId: this.subclient_id,
//           subclient_id: this.subclient_id,
//           tatstart: this.tatstart,
//           tatend: this.tatend,
//           componentDisplayName: componentResponse.displayName,
//           checkId: item.checkId ? item.checkId : '',
//           componentName: componentResponse.name,
//           component_id: componentResponse._id,
//           componentType: componentResponse.type,
//           status: item.status,
//           displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
//           casecolorType: this.casecolorType,
//           casecomment: this.casecomment,
//         };

//         this.dataSource.data = [...this.dataSource.data, componentDetails];
//       });
//     }

//     return true;
//   } catch (error) {
//     // console.error("Error " || error);
//     console.log("Error in addIndividualComponents",error)
//     return false;
//   }
// }

// updated -code-18sep25
async addIndividualComponents(): Promise<boolean> {
  try {

    const components = await firstValueFrom(this.componentService.findAllComponents());


    for (const component of components) {
      const items = await firstValueFrom(
        this.componentDataService.findAllForACase(component.name, this._id)
      );

      for (const item of items) {
        const componentDetails: any = {
          _id: item._id,
          caseId: this.caseId,
          case_id: this._id,
          candidateName: this.candidateName,
          clientName: this.clientName,
          subclientName: this.subclientName,
          subclientId: this.subclient_id,
          subclient_id: this.subclient_id,
          tatstart: this.tatstart,
          tatend: this.tatend,
          componentDisplayName: component.displayName,
          checkId: item.checkId ? item.checkId : '',
          componentName: component.name,
          component_id: component._id,
          componentType: component.type,
          status: item.status,
          displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
          casecolorType: this.casecolorType,
          casecomment: this.casecomment,
        };

        this.dataSource.data = [...this.dataSource.data, componentDetails];
      }
    }

    return true;
  } catch (error) {
    console.log("Error in addIndividualComponents", error);
    return false;
  }
}
// end-18sep25
///add old api call

  // addIndividualComponents(){
  //   let promise = new Promise((resolve,reject)=>{
  //     this.componentService.findAllComponents().subscribe(
  //       response => {
  //         response.forEach(component=>{
  //           this.componentDataService.findAllForACase(component.name,this._id).subscribe(
  //             response2 => {
  //               response2.forEach(item => {
  //                 console.log("item",item);
                  
  //                 const componentDetails: any = {
  //                   _id: item._id,
  //                   caseId: this.caseId,
  //                   case_id: this._id,
  //                   candidateName: this.candidateName,
  //                   clientName: this.clientName,
  //                   subclientName: this.subclientName,
  //                   subclientId: this.subclient_id,
  //                   subclient_id: this.subclient_id,
  //                   tatstart : this.tatstart,
  //                   tatend : this.tatend,
  //                   componentDisplayName: component.displayName,
  //                   checkId: item.checkId ? item.checkId :'',
  //                   // componentDetails['checkId'] = item.checkId ? item.checkId : '';
  //                   componentName: component.name,
  //                   component_id: component._id,
  //                   componentType: component.type,
  //                   status: item.status,
  //                   displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
  //                   casecolorType : this.casecolorType,
  //                   casecomment : this.casecomment,
  //                   // colorType : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
  //                   // comment : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
  //                 };
  //                 this.dataSource.data = [...this.dataSource.data, componentDetails];
  //               })
  //             },
  //             error => {
  //              console.log(error.error.message);
  //             }
  //           )
  //         })
  //         resolve(true);
  //       },
  //       error=>{
  //        console.log(error.error.message);
  //         reject(false);
  //       }
  //     )
      
  //   })
  //   return promise;
  // }

  async confirmButtonClicked() {
    try {
      await this.getOverallStatus().then(data=>{
        //console.log("Overall status is",data)
        this.caseUpoadService.updateStatus(this._id,{status:this.caseStatus}).subscribe(
          response=>{
            this.showMessage("Case Status Saved");
            this.router.navigate(['/home/inputqc/inputqccaselist']).then(() => {
              // After navigation is complete, reload the page
              this.window.location.reload();
            });
                  },
          error=>{
            this.showError("Error changing case status")
          }
        )
      });
      // console.log("caseStatus",this.caseStatus);
      // const updatedStatus = await this.caseUpoadService.updateStatus(this._id, { status: this.caseStatus }).toPromise();
      // console.log("Case Status Saved", updatedStatus);
      this.showMessage("Data saved");
      // this.location.back();
      // this.window.reload();
      this.router.navigate([`/home/inputqc/inputqccaselist`]);
    } catch (error) {
      // this.showError("Error");
      console.error("Error changing case status", error);
    }
  }
  // async confirmButtonClicked(){
  //   await this.getOverallStatus().then(data=>{
  //     //console.log("Overall status is",data)
  //     this.caseUpoadService.updateStatus(this._id,{status:this.caseStatus}).subscribe(
  //       response=>{
  //        console.log("Case Status Saved");
  //        this.showMessage("Data saved")
  //        this.router.navigate([`home/inputqc/inputqccaselist`])
  //         // this.location.back();
  //       },
  //       error=>{
  //         this.showError(error.error.message);

  //         console.log("Error changing case status")
  //       }
  //     )
  //   });

  // }

  getOverallStatus(){
    let promise =new Promise((resolve,reject)=>{
      this.caseStatus = 'INPUTQC-ACCEPTED'
      for(let i=0;i < this.dataSource.data.length;i++){
        let item = this.dataSource.data[i];
        if(item.status=='DE-COMPLETED'){
          this.caseStatus='DE-COMPLETED';
          break;
        }else if(item.status=='INPUTQC-REJECTED'){
          this.caseStatus="INPUTQC-REJECTED";
          break;
        }else if(item.status=='INSUF-1-REQ'){
          this.caseStatus="DE-COMPLETED";
          break;
        }
        
      }
      resolve(true);
    })
    return promise;
  }

  showDetails(row:any){  
      // console.log('hello', row.status);
      this.selectedRow = row 
      
      this.componentDetailsForVerificationService.setVerificationItem(row);
      this.showDetailsFlag = true;
      // console.log('selected value === ',this.selectedRow);
    
    let { componentName } = row;
    (componentName === 'personalDetails') ? 
    (this.router.navigate([`/home/inputqc/personaldetailsinputqc`])) : 
    (this.router.navigate([`/home/inputqc/componentinputqc`]));
  }

////Case Level comments////
getClassToApply(){
    // let colorType = this.comments? this.comments.colorType : ""
    let colorType = this.casecolorType
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


  ////Case Level comments////

  cdelink(){
    this.caseUpoadService.cdelink(this._id).subscribe(
      response=>{
        this.showMessage("Sent email successfully");

              },
      error=>{
        this.showError("Error sending Email ")
      }
    )

  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}

