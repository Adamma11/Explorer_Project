// import { Component, ViewChild } from '@angular/core';
// import { MatCheckboxChange } from '@angular/material/checkbox';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { ComponentService } from 'src/app/administration/service/component.service';
// import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
// import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
// import { VibeReportService } from '../service/vibe-report.service';
// import { HttpResponse } from '@angular/common/http';
// import * as FileSaver from 'file-saver';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ColorMasterService } from 'src/app/administration/service/color-master.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// export interface UserData {
//   _id:any,
//   component:any,
//   status:any,
//   selected?:any
// }
// @Component({
//   selector: 'app-download-pdf-component-list',
//   templateUrl: './download-pdf-component-list.component.html',
//   styleUrls: ['./download-pdf-component-list.component.scss']
// })
// export class DownloadPdfComponentListComponent {
//   _id :any;
//   caseId!:string;
//   case_id!:string;
//   candidateName!:string;
//   client_id! :string;
//   clientName!:string;
//   subclient_id! :string;
//   subclientName!:string;
//   proofsUploaded!: string[]; 
//   colorCodesFromMaster!: any[];

//   trustedPdfUrl: SafeResourceUrl | null = null;
//   isLoadingPdf: boolean = false;
//   pdfBlob: Blob | null = null;
//   showPdfPreview: boolean = false;
//   showDateModal = false;
//   userSelectedDate: string = '';

//   displayedColumns = ['serialNumber','component','grade','status', 'checkbox'];
//   dataSource: MatTableDataSource<UserData>;
//   caseStatus!:string;
// ////Case Level comments////
// casecolorType!:string;
// casecomment!:string;
// ShowComments:boolean=false;
//   @ViewChild(MatSort)
//   sort!: MatSort;

//   constructor(
//     private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
//     private componentService: ComponentService,
//     private componentDataService: ComponentDataService,
//     private vibeReportSerice : VibeReportService,
//     private colorMasterService: ColorMasterService,
//     private sanitizer: DomSanitizer,
//     private snackBar:MatSnackBar, 
//     ) {
//     this.dataSource = new MatTableDataSource();
//   }

//   ngOnInit(): void {
//     console.log('on inint == ',this.componentDetailsForVerificationService.getVerificationItem())
//     this._id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
//     this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId
//     this.addComponents();
//     this.proofofIndividualComponents()
//     this.getColorCodesFromMaster()
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


//   async addComponents(){
//     // await this.addPersonalDetails();
//     await this.addIndividualComponents();
//   }


//   masterToggleBranchSelection(event:MatCheckboxChange){
//     for(let data of this.dataSource.data){
//       if(event.checked){
//         data.selected = true;        
//       }else{
//         data.selected = false;        
//       }
//     }
//     this.dataSource._updateChangeSubscription();    
//   }

//   onCheckboxChange(e:any,row:any){
//     console.log("Eveny",e.checked);
//     console.log("Checkbox Changed",row);
    

//   }

//   addIndividualComponents(){
//     let promise = new Promise((resolve,reject)=>{
//       this.componentService.findAllComponents().subscribe(
//         response => {
//           response.forEach(component=>{
//             this.componentDataService.findAllForACase(component.name,this._id).subscribe(
//               response2 => {
//                 response2.forEach(async item => {
//                   console.log("item",item.grade);
                  
//                   const componentDetails: any = {
//                     _id: item._id,
//                     caseId: this.caseId,
//                     case_id: this._id,
//                     candidateName: this.candidateName,
//                     clientName: this.clientName,
//                     subclientName: this.subclientName,
//                     subclientId: this.subclient_id,
//                     subclient_id: this.subclient_id,
//                     componentDisplayName: component.displayName,
//                     // grade:grade,
                    
//                     grade : item.grade != null
//                     ? await this.getColorFromColorCodes(item.grade)
//                     : '',
//                     componentName: component.name,
//                     component_id: component._id,
//                     componentType: component.type,
//                     status: item.status,
//                     // displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
//                     colorType : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
//                     comment : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
//                   };
//                   this.dataSource.data = [...this.dataSource.data, componentDetails];
//                 })
//               },
//               error => {
//                console.log(error.error.message);
//               }
//             )
//           })
//           resolve(true);
//         },
//         error=>{
//          console.log(error.error.message);
//           reject(false);
//         }
//       )
      
//     })
//     return promise;
//   }

//   getColorCodesFromMaster() {
//     this.colorMasterService.readAll().subscribe((response) => {
//       console.log("Colors:",response);
      
//       this.colorCodesFromMaster = response;
//     });
//   }
//   getColorFromColorCodes(colorCode:any) {
//     return new Promise((resolve, reject) => {
//       this.colorCodesFromMaster.forEach((item) => {
//         // console.log("grade",item.grade)
//         // console.log("_id",item._id)
//         if (item._id == colorCode) {
//           resolve(item.name);
//         }
//       });
//       resolve('');
//     });
//   }

//   proofofIndividualComponents(){
//     this.proofsUploaded=[]

//     let promise = new Promise((resolve,reject)=>{
//       this.componentService.findAllComponents().subscribe(
//         response => {
//           response.forEach(component=>{
//             this.componentDataService.readProofOfWorks(component.name,this.caseId,this._id).subscribe(
//               response2 => {
//                 response2.forEach(item => {
//                   console.log("item:::::",item);
                  
//                   const componentDetails: any = {
//                     // _id: item._id,
//                     proofsUploaded : item
                    

//                   };
//                   this.dataSource.data = [...this.dataSource.data, componentDetails];
//                 })
//               },
//               error => {
//                console.log(error.error.message);
//               }
//             )
//           })
//           resolve(true);
//         },
//         error=>{
//          console.log(error.error.message);
//           reject(false);
//         }
//       )
      
//     })
//     return promise;
//   }

//   // downloadReportButtonClicked(){
//   //   if(this.selectedItem.client_id=='606492f37e2f346e622d5aff' || this.selectedItem.client_id=='60649e9323e15c6f745360b5' || this.selectedItem.client_id == "6065c2bda343b0a5461bff33" || this.selectedItem.client_id == "6375cf1bdaf93147973c59ca" ){
//   //     this.vibeReportSerice.generateTCSWordReport(this.selectedItem.caseId).subscribe(
//   //       (response:HttpResponse<Blob> | any)=>{
//   //         //console.log(response);
//   //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
//   //         this.showDownloadDiv =false
//   //         this.showDeleteDiv=true
//   //       },
//   //       error=>{
//   //         //console.log("Error from jasper server ",error);
//   //       })
//   //   }
//   //   // Tech Meh 
//   //   else if(this.selectedItem.client_id == '6065850a539cbc9b9754a1f8'){
//   //     this.vibeReportSerice.generateStandardWordTechMehReport(this.selectedItem.caseId).subscribe(
//   //       (response:HttpResponse<Blob> | any)=>{
//   //         //console.log(response);
//   //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
//   //         this.showDownloadDiv =false
//   //         this.showDeleteDiv=true
//   //       },
//   //       error=>{
//   //         //console.log("Error from jasper server ",error);
//   //       })
//   //   }
//   //   // Tech Meh 
//   //   else{
//   //     this.vibeReportSerice.generateStandardWordReport(this.selectedItem.caseId).subscribe(
//   //       (response:HttpResponse<Blob> | any)=>{
//   //         //console.log(response);
//   //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
//   //         this.showDownloadDiv =false
//   //         this.showDeleteDiv=true
//   //       },
//   //       error=>{
//   //         //console.log("Error from jasper server ",error);
//   //       })
//   //   }
//   // }

//   // downloadlButtonClicked() {
//   //   const resultArr: string[] = [];
//   //     console.log("about to download report of type",this.client_id)
//   //   this.dataSource.filteredData.forEach((item:any) => {
//   //     if (item.selected) {
//   //       console.log(item);
//   //       resultArr.push(item.component_id);
//   //     }
//   //   });
//   //   console.log("selected comp",resultArr.toString())
//   //       //ABC AS pwcReport
//   //       if(this.client_id=='640087669d15c82f8baac82e'  ){
//   //         this.vibeReportSerice.generatePWCWordReport(this._id,resultArr).subscribe(
//   //           (response:HttpResponse<Blob> | any)=>{
//   //             //console.log(response);
//   //             FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
//   //             // this.showDownloadDiv =false
//   //             // this.showDeleteDiv=true
//   //           },
//   //           error => {
//   //             // this.showError("Error Downloading Report.");
//   //           }
//   //         );
//   //       }else if(this.client_id == '6479dff3962628e3cc96ef64'){
//   //         // Tech machine Limited AS techMReport
//   //         this.vibeReportSerice.generatetechMReportReport(this._id,resultArr).subscribe(
//   //           (response:HttpResponse<Blob> | any)=>{
//   //             //console.log(response);
//   //             FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
//   //             // this.showDownloadDiv =false
//   //             // this.showDeleteDiv=true
//   //           },
//   //           error => {
//   //             this.showError("Error Downloading Report.");
//   //           }
//   //         );
//   //       }else if(this.client_id == '645cecb233c500ad7c724989'){
//   //         // yyyy AS indercommreport
//   //         this.vibeReportSerice.generateindercommreportReport(this._id,resultArr).subscribe(
//   //           (response:HttpResponse<Blob> | any)=>{
//   //             //console.log(response);
//   //             FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
//   //             // this.showDownloadDiv =false
//   //             // this.showDeleteDiv=true
//   //           },
//   //           error => {
//   //             this.showError("Error Downloading Report.");
//   //           }
//   //         );
//   //       }else{
    
//   //   this.vibeReportSerice.downloadfinalreport(this._id,resultArr).subscribe(
//   //     (response:HttpResponse<Blob> | any )=>{
//   //       //console.log(response);
//   //       FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
//   //       // this.showDownloadDiv =false
//   //       // this.showDeleteDiv=true
//   //     },
//   //     error => {
//   //       this.showError("Error Downloading Report.");
//   //     }
//   //   );
//   //       }
//   // }
// generateReport(dateReq: any) {
 
//     let reportRequest$;
//     const resultArr: string[] = [];
//     this.dataSource.filteredData.forEach((item: any) => {
//       if (item.selected) {
//         resultArr.push(item.component_id);
//       }
//     });
 
//     if (this.client_id === '640087669d15c82f8baac82e') {
//       reportRequest$ = this.vibeReportSerice.generatePWCWordReport(this._id, resultArr, dateReq);
//     } else if (this.client_id === '6479dff3962628e3cc96ef64') {
//       reportRequest$ = this.vibeReportSerice.generatetechMReportReport(this._id, resultArr, dateReq);
//     } else if (this.client_id === '645cecb233c500ad7c724989') {
//       reportRequest$ = this.vibeReportSerice.generateindercommreportReport(this._id, resultArr, dateReq);
//     } else {
//       reportRequest$ = this.vibeReportSerice.downloadfinalreport(this._id, resultArr, dateReq);
//     }
 
//     this.isLoadingPdf = true;
 
//     reportRequest$.subscribe(
//       (response: HttpResponse<Blob> | any) => {
//         this.pdfBlob = response.body;
//                   console.log("Test response", response.body);

//         if (this.pdfBlob) {
//           console.log("Test blob",this.pdfBlob);
          
//           const blobUrl = URL.createObjectURL(this.pdfBlob);
//           this.trustedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

//           this.showPdfPreview = true;
//           this.isLoadingPdf = false;
//         }
//       },
//       error => {
//         this.isLoadingPdf = false;
//         this.showError("Error fetching report.");
//       }
//     );
//   }
//  downloadPdf() {
//     if (this.pdfBlob) {
//       const blobUrl = URL.createObjectURL(this.pdfBlob);
//       FileSaver.saveAs(this.pdfBlob, `${this.caseId}.pdf`);
//       this.closePdfPreview();
//       URL.revokeObjectURL(blobUrl);  
//     }
//   }
 
//  downloadlButtonClicked() {
//     this.showDateModal = true;
//   }
 
//   closeDateModal() {
//     this.showDateModal = false;
//   }
 
//   submitDate() {
//     if (!this.userSelectedDate) {
//       alert('Please enter a valid date');
//       return;
//     }
 
//     const dateReq = new Date(this.userSelectedDate).toISOString(); 
   
//     this.generateReport(dateReq);
//     this.showDateModal = false;
//   }
 
//   closePdfPreview() {
//     this.showPdfPreview = false;
//     this.pdfBlob = null;
//     this.trustedPdfUrl = null;
//   }
 
//   showMessage(msg:any){
//     this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }
//   showError(msg:any){
//     this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
//   }    
// }
import { Component, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
import { VibeReportService } from '../service/vibe-report.service';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorMasterService } from 'src/app/administration/service/color-master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface UserData {
  _id:any,
  component:any,
  status:any,
  selected?:any
}
@Component({
  selector: 'app-download-pdf-component-list',
  templateUrl: './download-pdf-component-list.component.html',
  styleUrls: ['./download-pdf-component-list.component.scss']
})
export class DownloadPdfComponentListComponent {
  _id :any;
  caseId!:string;
  case_id!:string;
  candidateName!:string;
  client_id! :string;
  clientName!:string;
  subclient_id! :string;
  subclientName!:string;
  proofsUploaded!: string[];
  colorCodesFromMaster!: any[];
 
  displayedColumns = ['serialNumber','component','grade','status', 'checkbox'];
  dataSource: MatTableDataSource<UserData>;
  caseStatus!:string;
////Case Level comments////
casecolorType!:string;
casecomment!:string;
ShowComments:boolean=false;
  @ViewChild(MatSort)
  sort!: MatSort;
  trustedPdfUrl: SafeResourceUrl | null = null;
  isLoadingPdf: boolean = false;
  pdfBlob: Blob | null = null;
  showPdfPreview: boolean = false;
  showDateModal = false;
  userSelectedDate: string = '';
  constructor(
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private componentService: ComponentService,
    private componentDataService: ComponentDataService,
    private vibeReportSerice : VibeReportService,
    private colorMasterService: ColorMasterService,
 
    private snackBar:MatSnackBar,
    private sanitizer: DomSanitizer
    ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit(): void {
    console.log('on inint == ',this.componentDetailsForVerificationService.getVerificationItem())
    this._id = this.componentDetailsForVerificationService.getVerificationItem().case_id;
    this.caseId = this.componentDetailsForVerificationService.getVerificationItem().caseId
    this.client_id = this.componentDetailsForVerificationService.getVerificationItem().client_id
    this.addComponents();
    this.proofofIndividualComponents()
    this.getColorCodesFromMaster()
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
 
 
  async addComponents(){
    // await this.addPersonalDetails();
    await this.addIndividualComponents();
  }
 
 
  masterToggleBranchSelection(event:MatCheckboxChange){
    for(let data of this.dataSource.data){
      if(event.checked){
        data.selected = true;        
      }else{
        data.selected = false;        
      }
    }
    this.dataSource._updateChangeSubscription();    
  }
 
  onCheckboxChange(e:any,row:any){
    console.log("Eveny",e.checked);
    console.log("Checkbox Changed",row);
   
 
  }
 
  addIndividualComponents(){
    let promise = new Promise((resolve,reject)=>{
      this.componentService.findAllComponents().subscribe(
        response => {
          response.forEach(component=>{
            this.componentDataService.findAllForACase(component.name,this._id).subscribe(
              response2 => {
                response2.forEach(async item => {
                  console.log("item",item.grade);
                 
                  const componentDetails: any = {
                    _id: item._id,
                    caseId: this.caseId,
                    case_id: this._id,
                    candidateName: this.candidateName,
                    clientName: this.clientName,
                    subclientName: this.subclientName,
                    subclientId: this.subclient_id,
                    subclient_id: this.subclient_id,
                    componentDisplayName: component.displayName,
                    // grade:grade,
                   
                    grade : item.grade != null
                    ? await this.getColorFromColorCodes(item.grade)
                    : '',
                    componentName: component.name,
                    component_id: component._id,
                    componentType: component.type,
                    status: item.status,
                    // displayStatus: this.statusDisplayMap[item.status] || 'Data Entry Allocated',
                    colorType : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
                    comment : item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
                  };
                  this.dataSource.data = [...this.dataSource.data, componentDetails];
                })
              },
              error => {
               console.log(error.error.message);
              }
            )
          })
          resolve(true);
        },
        error=>{
         console.log(error.error.message);
          reject(false);
        }
      )
     
    })
    return promise;
  }
 
  getColorCodesFromMaster() {
    this.colorMasterService.readAll().subscribe((response) => {
      console.log("Colors:",response);
     
      this.colorCodesFromMaster = response;
      console.log();
      
    });
  }
  getColorFromColorCodes(colorCode:any) {
    return new Promise((resolve, reject) => {
      this.colorCodesFromMaster.forEach((item) => {
        console.log("grade",item.grade)
        console.log("_id",item._id)
        if (item._id == colorCode) {
          resolve(item.name);
                  console.log("_id",item.name)

        }
      });
      resolve('');
    });
  }
 
  proofofIndividualComponents(){
    this.proofsUploaded=[]
 
    let promise = new Promise((resolve,reject)=>{
      this.componentService.findAllComponents().subscribe(
        response => {
          response.forEach(component=>{
            this.componentDataService.readProofOfWorks(component.name,this.caseId,this._id).subscribe(
              response2 => {
                response2.forEach(item => {
                  console.log("item:::::",item);
                 
                  const componentDetails: any = {
                    // _id: item._id,
                    proofsUploaded : item
                   
 
                  };
                  this.dataSource.data = [...this.dataSource.data, componentDetails];
                })
              },
              error => {
               console.log("error inproof ofIndividualComponents",error);
              }
            )
          })
          resolve(true);
        },
        error=>{
         console.log(error.error.message);
          reject(false);
        }
      )
     
    })
    return promise;
  }
 
  // downloadReportButtonClicked(){
  //   if(this.selectedItem.client_id=='606492f37e2f346e622d5aff' || this.selectedItem.client_id=='60649e9323e15c6f745360b5' || this.selectedItem.client_id == "6065c2bda343b0a5461bff33" || this.selectedItem.client_id == "6375cf1bdaf93147973c59ca" ){
  //     this.vibeReportSerice.generateTCSWordReport(this.selectedItem.caseId).subscribe(
  //       (response:HttpResponse<Blob> | any)=>{
  //         //console.log(response);
  //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
  //         this.showDownloadDiv =false
  //         this.showDeleteDiv=true
  //       },
  //       error=>{
  //         //console.log("Error from jasper server ",error);
  //       })
  //   }
  //   // Tech Meh
  //   else if(this.selectedItem.client_id == '6065850a539cbc9b9754a1f8'){
  //     this.vibeReportSerice.generateStandardWordTechMehReport(this.selectedItem.caseId).subscribe(
  //       (response:HttpResponse<Blob> | any)=>{
  //         //console.log(response);
  //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
  //         this.showDownloadDiv =false
  //         this.showDeleteDiv=true
  //       },
  //       error=>{
  //         //console.log("Error from jasper server ",error);
  //       })
  //   }
  //   // Tech Meh
  //   else{
  //     this.vibeReportSerice.generateStandardWordReport(this.selectedItem.caseId).subscribe(
  //       (response:HttpResponse<Blob> | any)=>{
  //         //console.log(response);
  //         FileSaver.saveAs(response.body,`${this.selectedItem.caseId}.docx`);
  //         this.showDownloadDiv =false
  //         this.showDeleteDiv=true
  //       },
  //       error=>{
  //         //console.log("Error from jasper server ",error);
  //       })
  //   }
  // }
 
/*   downloadlButtonClicked1() {
    try {
    const resultArr: string[] = [];
      console.log("about to download report of type",this.client_id)
    this.dataSource.filteredData.forEach((item:any) => {
      if (item.selected) {
        console.log(item);
        resultArr.push(item.component_id);
      }
    });
    console.log("selected comp",resultArr.toString())
        //ABC AS pwcReport
        if(this.client_id=='640087669d15c82f8baac82e'  ){
          this.vibeReportSerice.generatePWCWordReport(this._id,resultArr).subscribe(
            (response:HttpResponse<Blob> | any)=>{
              //console.log(response);
              FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
              // this.showDownloadDiv =false
              // this.showDeleteDiv=true
            },
            error => {
              // this.showError("Error Downloading Report.");
            }
          );
        }else if(this.client_id == '6479dff3962628e3cc96ef64'){
          // Tech machine Limited AS techMReport
          this.vibeReportSerice.generatetechMReportReport(this._id,resultArr).subscribe(
            (response:HttpResponse<Blob> | any)=>{
              //console.log(response);
              FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
              // this.showDownloadDiv =false
              // this.showDeleteDiv=true
            },
            error => {
              this.showError("Error Downloading Report.");
            }
          );
        }else if(this.client_id == '645cecb233c500ad7c724989'){
          // yyyy AS indercommreport
          this.vibeReportSerice.generateindercommreportReport(this._id,resultArr).subscribe(
            (response:HttpResponse<Blob> | any)=>{
              //console.log(response);
              FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
              // this.showDownloadDiv =false
              // this.showDeleteDiv=true
            },
            error => {
              this.showError("Error Downloading Report.");
            }
          );
        }else{
   
    this.vibeReportSerice.downloadfinalreport(this._id,resultArr).subscribe(
      (response:HttpResponse<Blob> | any )=>{
        console.log("Response-->",response.body);
       
        FileSaver.saveAs(response.body,`${this.caseId}.pdf`);
        // this.showDownloadDiv =false
        // this.showDeleteDiv=true
      },
      error => {
        this.showError("Error Downloading Report.");
      }
    );
        }
    } catch (error) {
      console.log('error in downloadlButtonClicked',error)
    }
   
  } */
downloadlButtonClicked1() {
  try {
   
//     const resultArr: string[] = [];
//     console.log("about to download report of type", this.client_id);
//     this.dataSource.filteredData.forEach((item: any) => {
//       if (item.selected) {
//         resultArr.push(item.component_id);
//       }
//     });
 
//     let reportRequest$;
 
//     if (this.client_id == '640087669d15c82f8baac82e') {
//       reportRequest$ = this.vibeReportSerice.generatePWCWordReport(this._id, resultArr);
//     } else if (this.client_id == '6479dff3962628e3cc96ef64') {
//       reportRequest$ = this.vibeReportSerice.generatetechMReportReport(this._id, resultArr);
//     } else if (this.client_id == '645cecb233c500ad7c724989') {
//       reportRequest$ = this.vibeReportSerice.generateindercommreportReport(this._id, resultArr);
//     } else {
//       reportRequest$ = this.vibeReportSerice.downloadfinalreport(this._id, resultArr);
//     }
//  this.isLoadingPdf = true;
//     reportRequest$.subscribe(
//       (response: HttpResponse<Blob> | any) => {
//         this.pdfBlob = response.body;
//         if (this.pdfBlob) {
//           console.log("showing",this.pdfBlob)
//   const blobUrl = URL.createObjectURL(this.pdfBlob);
//   this.trustedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
//   this.showPdfPreview = true;
//   this.isLoadingPdf = false;
// }
//       },
//       error => {
//         this.isLoadingPdf = false;
//         this.showError("Error fetching report.");
//       }
//     );
  } catch (error) {
    this.isLoadingPdf = false;
    console.log('error in downloadButtonClicked', error);
  }
}
 
 
generateReport(dateReq: any) {
 
    let reportRequest$;
    const resultArr: string[] = [];
    this.dataSource.filteredData.forEach((item: any) => {
      if (item.selected) {
        resultArr.push(item.component_id);
      }
    });
 
    // Pass the date to the backend in the report request
    if (this.client_id === '640087669d15c82f8baac82e') {
      reportRequest$ = this.vibeReportSerice.generatePWCWordReport(this._id, resultArr, dateReq);
    } else if (this.client_id === '6479dff3962628e3cc96ef64') {
      reportRequest$ = this.vibeReportSerice.generatetechMReportReport(this._id, resultArr, dateReq);
    } else if (this.client_id === '645cecb233c500ad7c724989') {
      reportRequest$ = this.vibeReportSerice.generateindercommreportReport(this._id, resultArr, dateReq);
    } else {
      reportRequest$ = this.vibeReportSerice.downloadfinalreport(this._id, resultArr, dateReq);
    }
 
    this.isLoadingPdf = true;
 
    reportRequest$.subscribe(
      (response: HttpResponse<Blob> | any) => {
        this.pdfBlob = response.body;
        if (this.pdfBlob) {
          const blobUrl = URL.createObjectURL(this.pdfBlob);
          this.trustedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
          this.showPdfPreview = true;
          this.isLoadingPdf = false;
        }
      },
      error => {
        this.isLoadingPdf = false;
        this.showError("Error fetching report.");
      }
    );
  }
 downloadPdf() {
    if (this.pdfBlob) {
      const blobUrl = URL.createObjectURL(this.pdfBlob);
      FileSaver.saveAs(this.pdfBlob, `${this.caseId}.pdf`);
      this.closePdfPreview();
      URL.revokeObjectURL(blobUrl);  
    }
  }
 
 downloadlButtonClicked() {
    this.showDateModal = true;
  }
 
  closeDateModal() {
    this.showDateModal = false;
  }
 
  submitDate() {
    if (!this.userSelectedDate) {
      alert('Please enter a valid date');
      return;
    }
 
    const dateReq = new Date(this.userSelectedDate).toISOString();  // Ensure date is in the correct format
   
    this.generateReport(dateReq);
    this.showDateModal = false;
  }
 
  closePdfPreview() {
    this.showPdfPreview = false;
    this.pdfBlob = null;
    this.trustedPdfUrl = null;
  }
 
 
 
// pdfBlobUrl(): string | null {
//   return this.pdfBlob ? URL.createObjectURL(this.pdfBlob) : null;
// }
 
// downloadPdf() {
//   if (this.pdfBlob) {
//     const blobUrl = URL.createObjectURL(this.pdfBlob);
//     FileSaver.saveAs(this.pdfBlob, `${this.caseId}.pdf`);
//     this.closePdfPreview();
//     URL.revokeObjectURL(blobUrl);
//   }
// }
// closePdfPreview() {
//   this.showPdfPreview = false;
//   this.pdfBlob = null;
//   this.trustedPdfUrl = null;
// }
 
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }    
}
 