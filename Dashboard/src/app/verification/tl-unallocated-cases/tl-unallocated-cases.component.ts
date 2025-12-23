import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComponentAccessService } from 'src/app/administration/service/component-access.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { UserService } from 'src/app/administration/service/user.service';
import { VendorService } from 'src/app/administration/service/vendor.service';
import { ComponentDetailsForVerificationService } from '../service/component-details-for-verification.service';
import * as XLSX from 'xlsx';
import { ChangeDetectorRef } from '@angular/core';


export interface UserData {
  _id: any;
  name: any;
  address: any;
  pinCode: any;
  district: any;
  state: any;
  country: any;
}

export interface VerificationItem {
  verifier: string;
  _id: any;
  caseId: any;
  case_id: any;
  candidateName: any;
  component_id: string;
  componentName: string;
  componentDisplayName: any;
  componentType: string;
  tatEndDate: any;
  tatStartDate:any;
  clientName: any;
  subclientName: any;
  checkId: any;
  address?: string;
  pin?: string;
  city?: string;
  university?: string;
  employername?: string;
  dateOfBirth: any;
  mobileNumber: any;
  fatherName: any;
  allocatedUser: any;
  displayStatus: any;
  selected: boolean;
  location: any;
  vendor: any;
  status:any;
}

@Component({
  selector: 'app-tl-unallocated-cases',
  templateUrl: './tl-unallocated-cases.component.html',
  styleUrls: ['./tl-unallocated-cases.component.scss']
})
export class TlUnallocatedCasesComponent {
  loading: boolean = false; 

  unallocatedCheckboxSelected: boolean = false;
  allocatedCheckboxSelected: boolean = false;
  inactiveCheckboxSelected: boolean = false;
  selectAllmainCheckbox: boolean = false;
  selectAllCheckbox: boolean = false;
  selectedTab: string;
  selectedRow: any;
  showDetailsFlag: boolean = false;

  dataSource = new MatTableDataSource<VerificationItem>();
  displayedColumns = ['select', 'serialNumber', 'caseId','checkId', 'candidateName', 'fathersName', 'clientName', 'subclientName','tatStartDate', 'tatEndDate', 'componentDisplayName', 'displayStatus', 'location',];

  wipDataSource = new MatTableDataSource<VerificationItem>();
  wipDisplayedColumns = ['select', 'serialNumber', 'caseId','checkId', 'candidateName', 'clientName', 'subclientName','tatStartDate', 'tatEndDate', 'componentDisplayName', 'allocatedUser', 'displayStatus', 'location',];


  wipInactiveDataSource = new MatTableDataSource<VerificationItem>();
  wipInactiveDisplayedColumns = ['select', 'serialNumber', 'caseId','checkId', 'candidateName', 'clientName', 'subclientName','tatStartDate', 'tatEndDate', 'componentDisplayName', 'allocatedUser', 'displayStatus',];


  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;

  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;

  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort3') sort3!: MatSort;

  allocateToVendorOrUser!: string;
  reallocateToVendorOrUser!: string;
  users: any[] = [];
  vendors: any[] = [];
  usersForAllocated: any[] = [];
  vendorsForAllocated: any[] = [];
  selectedUser: any;
  selectedVendor: any;
  selectedUserForAllocated: any;
  selectedVendorForAllocated: any;
  components: any[] = [];
  componentsForAllocated: any[] = [];
  selectedComponent: any;
  selectedWipComponent: any;

  constructor(
    private componentAccessService: ComponentAccessService,
    private componentService: ComponentService,
    private componentDataService: ComponentDataService,
    private userService: UserService,
    private vendorService: VendorService,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef

  ) {
    this.selectedTab = 'UNALLOCATED-CHECKS';
    this.dataSource = new MatTableDataSource();
    this.wipDataSource = new MatTableDataSource();
    this.wipInactiveDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.readAllChecksForTheUser();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator1;
    this.dataSource.sort = this.sort1;

    this.wipDataSource.paginator = this.paginator2;
    this.wipDataSource.sort = this.sort2;

    this.wipInactiveDataSource.paginator = this.paginator3;
    this.wipInactiveDataSource.sort = this.sort3;
  }


  onSelectTab(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTab = target.value;

    this.dataSource.data = [];
    this.wipDataSource.data = [];
    this.wipInactiveDataSource.data = [];

    this.readAllChecksForTheUser();

    setTimeout(() => {
      if (this.selectedTab === 'UNALLOCATED-CHECKS') {
        this.paginator1._changePageSize(this.paginator1.pageSize);
        this.dataSource.sort = this.sort1;
      } else if (this.selectedTab === 'ALLOCATED-CHECKS') {
        this.paginator2._changePageSize(this.paginator2.pageSize);
        this.wipDataSource.sort = this.sort2;
      } else if (this.selectedTab === 'INACTIVE-USERS') {
        this.paginator3._changePageSize(this.paginator3.pageSize);
        this.wipInactiveDataSource.sort = this.sort3;
      }
    });
  }
formatDate(date: string): string {
  if (!date) return '-';
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return '-'; 
  
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(parsedDate);
}
// formatDate(date: string): string {
//   if (!date || date === "NAN") return "NAN";
 
//   const parsedDate = new Date(date);
//   if (isNaN(parsedDate.getTime())) return "NAN";
 
//   const formatter = new Intl.DateTimeFormat('en-GB', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });
 
//   return formatter.format(parsedDate);
// }
  /////09Aug2025//
  readAllChecksForTheUser() {
  this.loading = true;


  // Step 1: Get accessible components for the logged-in user
  this.componentAccessService.readAllForAUser().subscribe(
    (accessList: any[]) => {
      this.components = accessList;
      this.componentsForAllocated = accessList;

      // Step 2: Build list of component names
      const componentNames = accessList.map(c => c.component.name);

      if (!componentNames.length) {
        this.loading = false;
        return;
      }

      // Step 3: Fetch all unallocated components in ONE backend call
      this.componentDataService.findAllUnallocatedComponentsForUser(componentNames).subscribe(
        (groups: any[]) => {
          // groups = [{ component: 'employment', data: [...] }, ...]

          groups.forEach(group => {
            const compAccess = accessList.find(a => a.component.name === group.component);

            group.data.forEach((item3: { case: { subclient: { client: { name: any; }; name: any; }; caseId: any; _id: any; candidateName: any; tatEndDate: any;initiationDate:any; }; _id: any; checkId: any; status: string;stage:any; allocatedToVendor: any; personalDetailsData: { dateofbirth: any; mobileNumber: any; fathername: any; }; address: any; pin: any; city: any; nameofuniversity: any; nameofuniverskty: any; nameofemployer: any; verificationAllocatedTo: { name: any; status: string; }; location: any; allocatedToFE: any; }) => {
              if (!item3.case || !item3.case.subclient || !item3.case.subclient.client) return;
              // const formattedDate = this.formatDate(item3.personalDetailsData?.dateofbirth);
              // console.log("item3.personalDetailsData",item3.personalDetailsData);
              
              const verificationItem: VerificationItem = {
                _id: item3._id,
                caseId: item3.case.caseId,
                case_id: item3.case._id,
                candidateName: item3.case.candidateName,
                component_id: compAccess?.component._id || '',
                componentName: compAccess?.component.name || '',
                componentDisplayName: compAccess?.component.displayName || '',
                componentType: compAccess?.component.type || '',
                tatEndDate: item3.case.tatEndDate,
                tatStartDate: item3.case.initiationDate || "",
                clientName: item3.case.subclient.client.name,
                subclientName: item3.case.subclient.name,
                checkId: item3.checkId || '',
                status: item3.status,
                vendor: item3.allocatedToVendor,
                // dateOfBirth: item3.personalDetailsData?.dateOfBirth || "-",
                dateOfBirth: this.formatDate(item3.personalDetailsData?.dateofbirth),
                mobileNumber: item3.personalDetailsData?.mobileNumber || "-",
                fatherName: item3.personalDetailsData?.fathername || "-",
                address: item3.address || '',
                pin: item3.pin || '',
                city: item3.city || '',
                university: item3.nameofuniversity || item3.nameofuniverskty || '',
                employername: item3.nameofemployer || '',
                verifier: '',
                allocatedUser: item3.verificationAllocatedTo?.name || null,
                selected: false,
                // displayStatus: item3.status === "INPUTQC-ACCEPTED" ? item3.stage : item3.status || "New",
                // displayStatus: item3.stage || item3.status || "New",
                displayStatus: item3.status === "INPUTQC-ACCEPTED"
  ? "New"
  : (item3.stage || item3.status),



                location: item3.location || "-"
              };

              if (!item3.verificationAllocatedTo && !item3.allocatedToVendor && !item3.allocatedToFE) {
                this.dataSource.data.push(verificationItem);
              } else {
                this.wipDataSource.data.push(verificationItem);
                if (item3.verificationAllocatedTo?.status === "INACTIVE") {
                  this.wipInactiveDataSource.data.push(verificationItem);
                }
              }
            });
          });

          // Step 4: Update tables and UI
          setTimeout(() => {
            this.dataSource._updateChangeSubscription();
            this.wipDataSource._updateChangeSubscription();
            this.wipInactiveDataSource._updateChangeSubscription();

            this.dataSource.paginator = this.paginator1;
            this.dataSource.sort = this.sort1;
            this.wipDataSource.paginator = this.paginator2;
            this.wipDataSource.sort = this.sort2;
            this.wipInactiveDataSource.paginator = this.paginator3;
            this.wipInactiveDataSource.sort = this.sort3;

            this.cdRef.detectChanges();
            this.loading = false;
          }, 0);
        },
        () => {
          this.loading = false;
          this.showError("Error fetching unallocated components");
        }
      );
    },
    () => {
      this.loading = false;
      this.showError("Error fetching the accessible components");
    }
  );
}
  /////09Aug2025//

// readAllChecksForTheUser() {
//   this.loading = true;
//   this.componentAccessService.readAllForAUser().subscribe(
//     response1 => {
//       this.components = response1;
//       this.componentsForAllocated = response1;

//       const componentPromises = response1.map((item1: { component: { _id: string; name: any; displayName: any; type: any; }; }) => {
//         return new Promise<void>((resolve1) => {
//           this.componentService.findAComponent(item1.component._id).subscribe(
//             response2 => {
//               this.componentDataService.findUnallocatedComponentsForVerification(response2.name).subscribe(
//                 response3 => {
//                   response3.forEach(item3 => {
//                     if (!item3.case || !item3.case.subclient || !item3.case.subclient.client) return;

//                     const verificationItem: VerificationItem = {
//                       _id: item3._id,
//                       caseId: item3.case.caseId,
//                       case_id: item3.case._id,
//                       candidateName: item3.case.candidateName,
//                       component_id: item1.component._id,
//                       componentName: item1.component.name,
//                       componentDisplayName: item1.component.displayName,
//                       componentType: item1.component.type,
//                       tatEndDate: item3.case.tatEndDate,
//                       clientName: item3.case.subclient.client.name,
//                       subclientName: item3.case.subclient.name,
//                       checkId: item3.checkId || '',
//                       status: item3.status,
//                       vendor: item3.allocatedToVendor,
//                       dateOfBirth: item3.personalDetailsData?.dateOfBirth || "-",
//                       mobileNumber: item3.personalDetailsData?.mobileNumber || "-",
//                       fatherName: item3.personalDetailsData?.fathername || "-",
//                       address: item3.address || '',
//                       pin: item3.pin || '',
//                       city: item3.city || '',
//                       university: item3.nameofuniversity || item3.nameofuniverskty || '',
//                       employername: item3.nameofemployer || '',
//                       verifier: '',
//                       allocatedUser: item3.verificationAllocatedTo?.name || null,
//                       selected: false,
//                       displayStatus: item3.status === "INPUTQC-ACCEPTED" ? "New" : item3.status,
//                       location: item3.location || "-"
//                     };

//                     if (!item3.verificationAllocatedTo && !item3.allocatedToVendor && !item3.allocatedToFE) {
//                       this.dataSource.data.push(verificationItem);
//                     } else {
//                       this.wipDataSource.data.push(verificationItem);
//                       if (item3.verificationAllocatedTo?.status === "INACTIVE") {
//                         this.wipInactiveDataSource.data.push(verificationItem);
//                       }
//                     }
//                   });

//                   resolve1(); // resolve this component's loading
//                 },
//                 () => resolve1()
//               );
//             },
//             () => resolve1()
//           );
//         });
//       });

//       Promise.all(componentPromises).then(() => {
//         // Small timeout to defer UI update and avoid blocking
//         setTimeout(() => {
//           this.dataSource._updateChangeSubscription();
//           this.wipDataSource._updateChangeSubscription();
//           this.wipInactiveDataSource._updateChangeSubscription();

//           this.dataSource.paginator = this.paginator1;
//           this.dataSource.sort = this.sort1;
//           this.wipDataSource.paginator = this.paginator2;
//           this.wipDataSource.sort = this.sort2;
//           this.wipInactiveDataSource.paginator = this.paginator3;
//           this.wipInactiveDataSource.sort = this.sort3;

//           this.cdRef.detectChanges();
//           this.loading = false;
//         }, 0);
//       });
//     },
//     error => {
//       this.loading = false;
//       this.showError("Error fetching the accessible components");
//     }
//   );
// }

  // readAllChecksForTheUser() {
  //   this.componentAccessService.readAllForAUser().subscribe(
  //     response1 => {
  //       this.components = response1;
  //       this.componentsForAllocated = response1;
  //       response1?.forEach((item1: { component: { _id: string; name: string; displayName: any; type: string; }; }) => {
  //         this.componentService.findAComponent(item1.component._id).subscribe(
  //           response2 => {
  //             this.componentDataService.findUnallocatedComponentsForVerification(response2.name).subscribe(
  //               response3 => {
  //                 response3.forEach(item3 => {
  //                   if(!item3.case){
  //                     return
  //                   }
  //                   if (item3.case.subclient == null || item3.case.subclient.client == null) {
  //                   }

  //                   let verificationItem = ({
  //                     _id: item3._id,
  //                     caseId: item3.case.caseId,
  //                     case_id: item3.case._id,
  //                     candidateName: item3.case.candidateName,
  //                     component_id: item1.component._id,
  //                     componentName: item1.component.name,
  //                     componentDisplayName: item1.component.displayName,
  //                     componentType: item1.component.type,
  //                     tatEndDate: item3.case.tatEndDate,
  //                     clientName: item3.case.subclient.client.name,
  //                     subclientName: item3.case.subclient.name,
  //                     colorCodes: item3.case.subclient.client.colorCodes,
  //                     checkId:item3.checkId ? item3.checkId : '',
  //                     status: item3.status,
  //                     vendor: item3.allocatedToVendor,
  //                     // dateOfBirth:item3.personalDetailsData.dateofbirth != null ? item3.personalDetailsData.dateofbirth : "-",
  //                     // mobileNumber:item3.mobilenumber != null ? item3.mobilename : "-",
  //                     fatherName:item3.personalDetailsData?.fathername != null ? item3.personalDetailsData?.fathername : "-",
  //                     location: item3.location != null ? item3.location : "-",
  //                     // dateOfBirth: item3.personalDetailsData.dateofbirth != null ? item3.personalDetailsData.dateofbirth : "-",
  //                     dateOfBirth: item3.personalDetailsData && item3.personalDetailsData.dateOfBirth ? item3.personalDetailsData.dateOfBirth : "-",
  //                     mobileNumber: item3.mobileNumber !== null ? item3.mobileNumber : "-",
  //                     // fatherName: item3.personalDetailsData ? item3.personalDetailsData.fatherName : "-",
  //                     address: item3.address,
  //                     pin: item3.pin,
  //                     city: item3.city,
  //                     university: item3.university,
  //                     employername: item3.university,
  //                     verifier: "some value",
  //                     allocatedUser: item3.verificationAllocatedTo != null ? item3.verificationAllocatedTo.name : null,
  //                     //                      vendorName:item3.allocatedToVendor != null ? item3.vendor.vendor.name :null,
  //                     selected: false,
  //                     displayStatus: item3.status == "INPUTQC-ACCEPTED" ? "New" : item3.status
  //                   })
  //                   // console.log("personalDetailsData",item3.personalDetailsData.fathername);
                    
  //                   if (item3.personalDetailsData != null) {
  //                     // verificationItem["dateofbirth"]=item3.personalDetailsData.dateofbirth
  //                     // verificationItem["mobilenumber"]=item3.personalDetailsData.mobilenumber
  //                     // verificationItem["fathername"]=item3.personalDetailsData.fathername

  //                     // verificationItem["dateOfBirth"] = item3.personalDetailsData.dateOfBirth;
  //                     verificationItem["mobileNumber"] = item3.personalDetailsData.mobileNumber;
  //                     // verificationItem["fatherName"] = item3.personalDetailsData ? item3.personalDetailsData.fatherName : "-";
  //                   }

  //                   if (item1.component.type == 'address') {
  //                     verificationItem["address"] = item3.address;
  //                     verificationItem["pin"] = item3.pin
  //                     verificationItem["city"] = item3.city
  //                   }

  //                   if (item1.component.type == 'education') {
  //                     if (item3.nameofuniversity != null) {
  //                       verificationItem["university"] = item3.nameofuniversity;
  //                     } else if (item3.nameofuniverskty != null) {
  //                       verificationItem["university"] = item3.nameofuniverskty
  //                     }
  //                   }

  //                   if (item1.component.type == 'employment') {
  //                     verificationItem["employername"] = item3.nameofemployer
  //                   }

  //                   if (item1.component.name == 'criminalrecord') {
  //                     verificationItem["address"] = item3.fulladdress
  //                     verificationItem["pin"] = item3.pin
  //                     verificationItem["city"] = item3.city
  //                   }

  //                   if (item1.component.name == 'courtrecord') {
  //                     verificationItem["address"] = item3.addresswithpin
  //                     verificationItem["pin"] = item3.pin
  //                     verificationItem["city"] = item3.city
  //                   }

  //                   // console.log("verifaction Inactive",item3.verificationAllocatedTo);
  //                   //console.log("Status of this item is ",item3.status);
                    
  //                   if (item3.verificationAllocatedTo == null && item3.allocatedToVendor == null && item3.allocatedToFE == null) {
  //                     this.dataSource.data.push(verificationItem);
  //                     this.dataSource._updateChangeSubscription();
  //                   }

  //                   // else if(item3.verificationAllocatedTo != null && item3.verificationAllocatedTo.status === "INACTIVE"){
  //                   //   this.wipInactiveDataSource.data.push(verificationItem);
  //                   //   this.wipInactiveDataSource._updateChangeSubscription()
  //                   //     }

  //                   else {
  //                     this.wipDataSource.data.push(verificationItem);
  //                     this.wipDataSource._updateChangeSubscription();
  //                     if (item3.verificationAllocatedTo != null && item3.verificationAllocatedTo.status === "INACTIVE") {
  //                       this.wipInactiveDataSource.data.push(verificationItem);
  //                       this.wipInactiveDataSource._updateChangeSubscription()
  //                     }
  //                   }
  //                 })
  //                 // this.dataSource.paginator = this.paginator;
  //                 // this.dataSource.sort = this.sort;

  //                 this.dataSource.paginator = this.paginator1;
  //                 this.dataSource.sort = this.sort1;

  //                 this.wipDataSource.paginator = this.paginator2;
  //                 this.wipDataSource.sort = this.sort2;

  //                 this.wipInactiveDataSource.paginator = this.paginator3;
  //                 this.wipInactiveDataSource.sort = this.sort3;
  //               },
  //               error => {
  //                 //console.log("Error in response 3",error);
  //               }
  //             )
  //           },
  //           error => {
  //             //console.log("Error in response 2",error);
  //           }
  //         )
  //       })
  //     },
  //     error => {
  //       //console.log("Error fetching the accessible components",error);
  //     }
  //   )
  // }

  filterSelectionChanged(event: any) {
    if (this.selectedComponent != "-1") {
      this.dataSource.filter = this.selectedComponent
      this.fillUsersList();
      this.fillVendorList();
    }else if(this.selectedComponent == "-1"){
      this.dataSource.filter = this.selectedComponent
      this.fillUsersAllList()
    } else {
      this.dataSource.filter = ""
      this.dataSource.filterPredicate = (data: any, filter: String) => !filter || data.component_id == filter
    }
  }

  filterSelectionForWipChanged(event: any) {
    if (this.selectedWipComponent != "-1") {
      this.wipDataSource.filter = this.selectedWipComponent
      this.fillUsersForAllocatedList();
      this.fillVendorForAllocatedList();
    }else if(this.selectedComponent == "-1"){
      this.dataSource.filter = this.selectedComponent
      this.fillUsersAllList()
    } else {
      this.wipDataSource.filter = ""
      this.wipDataSource.filterPredicate = (data: any, filter: String) => !filter || data.component_id == filter
    }
  }

  filterSelectionForWipInactiveChanged(event: any) {
    if (this.selectedWipComponent != "-1") {
      this.wipInactiveDataSource.filter = this.selectedWipComponent
      this.fillUsersForAllocatedList();
      this.fillVendorForAllocatedList();
    }else if(this.selectedComponent == "-1"){
      this.dataSource.filter = this.selectedComponent
      this.fillUsersAllList()
    } else {
      this.wipInactiveDataSource.filter = ""
      this.wipInactiveDataSource.filterPredicate = (data: any, filter: String) => !filter || data.component_id == filter
    }
  }

  async allocateToUser() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      let item = this.dataSource.data[i];
      console.log("test iteams",item, this.selectedUser);
      
      if (item.selected) {

        let allocated = await this.allocate(item, this.selectedUser);
      }
    }

    this.showMessage("Allocated to user");
    location.reload();
  }

  allocate(item: any, selectedUser: any) {
    let promise = new Promise((resolve, reject) => {
      item.verifier = selectedUser;
      this.componentDataService.allocateCheckToVerifier(item.componentName, item).subscribe(
        response => {
          this.showMessage("Allocated to user");
          this.dataSource._updateChangeSubscription();
          resolve(true)
        },
        error => {
          this.showError(error.message);
          reject(false)
        }
      )
    })
    return promise
  }

  async reAllocateToUser() {
    console.log("Allocating to user:", this.selectedUser);
    for (let i = 0; i < this.wipDataSource.data.length; i++) {
      let item = this.wipDataSource.data[i];
      if (item.selected) {
        let reallocated = await this.reallocate(item, this.selectedUser);
      }
    }
    this.showMessage("Allocated to user");
    location.reload();
  }

  async reallocate(item: any, selectedUser: any) {
    let promise = new Promise((resolve, reject) => {
      item.verifier = selectedUser;
      this.componentDataService.allocateCheckToVerifier(item.componentName, item).subscribe(
        response => {
          this.showMessage("Reallocated ");
          this.wipDataSource._updateChangeSubscription();
    resolve(true)
        },
        error => {
          this.showError(error.message);
          reject(false)
        }
      )
    })
    return promise
    // let promise = new Promise((resolve, reject) => {
    //   item.verifier = this.selectedUserForAllocated;
    //   this.componentDataService.allocateCheckToVerifier(item.componentName, item).subscribe(
    //     response => {
    //       this.showMessage("Reallocated");
    //       this.wipDataSource._updateChangeSubscription();
    //       resolve(true)
    //     },
    //     error => {
    //       this.showError(error.message);
    //       reject(false)
    //     }
    //   )
    // })
  }
  // Find All Users 
  fillUsersAllList(){
    this.userService.findAllUsers().subscribe(
      response =>{
        console.log(response);
        this.users = response
      },

      error =>{
        console.log("Error reading users", error);
      }
  
    )
  }
    
    // Find All Users
  fillUsersList() {
    this.userService.getUsersForTheComponent(this.selectedComponent).subscribe(

      response => {
        console.log("response from users", response);
        response.forEach(item => {

          if (item.user !== null) {
            let user = ({
              _id: item.user._id,
              name: item.user.name
            })
            console.log("response users", user);

            this.users.push(user)
          }
        })
      },
      error => {
        this.showError(error.message);
      }
    )
  }
  fillUsersForAllocatedList() {
    //console.log("Selected WIP Component is ",this.selectedWipComponent);
    this.userService.getUsersForTheComponent(this.selectedWipComponent).subscribe(
      response => {
        //console.log("response from users for allocated checks",response);
        response.forEach(item => {
          if (item.user != null) {
            let user = ({
              _id: item.user._id,
              name: item.user.name
            })
            this.users.push(user)

            // this.usersForAllocated.push(user)
          }
        })
      },
      error => {
        // this.usersForAllocated = []
        this.showError(error.message);
      }
    )
  }
  fillVendorList() {
    //console.log("Selected Component is " ,this.selectedComponent);
    for (let i = 0; i < this.components.length; i++) {
      if (this.selectedComponent == this.components[i].component._id) {
        if (this.components[i].component.type == 'address') {
          this.vendorService.findAllVendorsForAddressComponent().subscribe(
            response => {
              this.vendors = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendors.push(vendor);
              })
            },
            error => {
              //console.log("error",error);
            }
          )
        } else if (this.components[i].component.type == 'education') {
          this.vendorService.findAllVendorsForEducationComponent().subscribe(
            response => {
              this.vendors = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendors.push(vendor);
              })
            },
            error => {
              //console.log("error",error)
            }
          )
        } else if (this.components[i].component.type == 'employment') {
          this.vendorService.findAllVendorsForEmploymentComponent().subscribe(
            response => {
              this.vendors = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendors.push(vendor);
              })
            },
            error => {
              //console.log("Error",error);
            }
          )
        } else {
          this.vendorService.findAllVendorsForOtherComponent(this.selectedComponent).subscribe(
            response => {
              this.vendors = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendors.push(vendor);
              })
            },
            error => {
              //console.log("Error",error);
            }
          )
        }
      }
    }

  }
  fillVendorForAllocatedList() {
    //console.log("Selected Component is " ,this.selectedWipComponent);
    for (let i = 0; i < this.componentsForAllocated.length; i++) {
      if (this.selectedWipComponent == this.componentsForAllocated[i].component._id) {
        if (this.componentsForAllocated[i].component.type == 'address') {
          this.vendorService.findAllVendorsForAddressComponent().subscribe(
            response => {
              this.vendorsForAllocated = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendorsForAllocated.push(vendor);
              })
            },
            error => {
              //console.log("error",error);
            }
          )
        } else if (this.componentsForAllocated[i].component.type == 'education') {
          this.vendorService.findAllVendorsForEducationComponent().subscribe(
            response => {
              this.vendorsForAllocated = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendorsForAllocated.push(vendor);
              })
            },
            error => {
              //console.log("error",error)
            }
          )
        } else if (this.componentsForAllocated[i].component.type == 'employment') {
          this.vendorService.findAllVendorsForEmploymentComponent().subscribe(
            response => {
              this.vendorsForAllocated = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendorsForAllocated.push(vendor);
              })
            },
            error => {
              //console.log("Error",error);
            }
          )
        } else {
          this.vendorService.findAllVendorsForOtherComponent(this.selectedWipComponent).subscribe(
            response => {
              this.vendors = [];
              response.forEach(item => {
                let vendor = ({
                  _id: item.vendor._id,
                  name: item.vendor.name
                })
                this.vendorsForAllocated.push(vendor);
              })
            },
            error => {
              //console.log("Error",error);
            }
          )
        }
      }
    }

  }

  allocateToVendor() {
    this.dataSource.data.forEach(item => {
      if (item.selected) {
        //console.log("this is selected ",item)
        item["vendor"] = this.selectedVendor
        this.componentDataService.allocateCheckToVendor(item.componentName, item).subscribe(
          response => {
            this.showMessage("Allocated to Vendor")
          },
          error => {
            this.showError("Error allocating to vendor");
          }
        )
      }
    })
  }

  reallocateToVendor() {
    this.wipDataSource.data.forEach(item => {
      if (item.selected) {
        //console.log("this is selected ",item)
        item["vendor"] = this.selectedVendor
        this.componentDataService.allocateCheckToVendor(item.componentName, item).subscribe(
          response => {
            this.showMessage("Allocated to Vendor")
          },
          error => {
            this.showError("Error allocating to vendor");
          }
        )
      }
    })
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Unallocated Checks');

    /* save to file */
    XLSX.writeFile(wb, 'UnallocatedChecks.xlsx');
  }
  exportAllocateChecksToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.wipDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'allocated Checks');

    /* save to file */
    XLSX.writeFile(wb, 'AllocatedChecks.xlsx');

  }


  showError(msg: any) {
    this.snackBar.open(msg, "error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  showMessage(msg: any) {
    this.snackBar.open(msg, "Info", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterWip(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wipDataSource.filter = filterValue.trim().toLowerCase();

    if (this.wipDataSource.paginator) {
      this.wipDataSource.paginator.firstPage();
    }
  }

  applyFilterWipInactive(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wipInactiveDataSource.filter = filterValue.trim().toLowerCase();

    if (this.wipInactiveDataSource.paginator) {
      this.wipInactiveDataSource.paginator.firstPage();
    }
  }


  showDetails(row: any): void {
    // console.log(row._id);
    this.showDetailsFlag = true;
    this.selectedRow = row;
    // this.router.navigate([`home/masters/branchdetails/${row._id}`]);
    this.componentDetailsForVerificationService.setVerificationItem(row);
  }

  onUnallocatedCheckbox() {
    this.unallocatedCheckboxSelected = this.dataSource.data.some(row => row.selected === true);
  }

  onAllocatedCheckboxChange() {
    this.allocatedCheckboxSelected = this.wipDataSource.data.some(row => row.selected === true)
  }

  onInactiveCheckboxChange() {
    this.inactiveCheckboxSelected = this.wipInactiveDataSource.data.some(row => row.selected === true)
  }


  togglemainSelectAll(): void {
    // this.dataSource.data.forEach(row => (row.selected = this.selectAllmainCheckbox));
      this.dataSource.filteredData.forEach(row => {
    row.selected = this.selectAllmainCheckbox;
  });
    this.onUnallocatedCheckbox()
  }

  toggleSelectAll(): void {
    // this.wipDataSource.data.forEach(row => (row.selected = this.selectAllCheckbox));
          this.wipDataSource.filteredData.forEach(row => {
    row.selected = this.selectAllCheckbox;
  });
    this.onAllocatedCheckboxChange()
  }
  getClassToApply(item: { tatEndDate: string | number | Date; }) {
    let currentDate = new Date()
    let tatEndDate = new Date(item.tatEndDate)
    let days = Math.floor((tatEndDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    // let today = `${new Date().getDate()+1}/${new Date().getMonth()}`
    // let folloupDate = `${new Date(item.nextfollowupdate).getDate()}/${new Date(item.nextfollowupdate).getMonth()}`
    // console.log("NEXT Follow up:", today, folloupDate)
    if (days <= 7 && days > 0) {
      return 'goldenrod'
    } else if (days <= 0) {
      return 'red'
    }
    // else if(today <= 0){
    //   return 'DeepSkyBlue'

    // }
    else {
      return 'black'
    }
  }

}
