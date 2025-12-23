import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ComponentService } from 'src/app/administration/service/component.service';
import { UserRoleService } from 'src/app/administration/service/user-role.service';
import { UserService } from 'src/app/administration/service/user.service';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from 'src/app/verification/service/component-details-for-verification.service';
// import { UniversityService } from '../service/university.service';
import * as XLSX from 'xlsx';
export interface CaseData  {

    _id: string;
    caseId: string;
    candidateName: string;
    clientName: string;
    subclientName: string;
    tatEndDate: string;
    initiationDate:string;
    selected?:boolean;

  
}


interface OutputqcItem {
  case_id?: string;
  caseId?: string;
  subclient_id?: string;
  subclientName?: string;
  client_id?: string;
  clientName?: string;
  tatEndDate?: Date;
  initiationDate?:Date;
  candidateName?: string;
  colorCodes?: string;
  allocatedTo?: string;
  outputqcAllocationDate?: Date | null;
  selected: boolean;
}
@Component({
  selector: 'app-outputqc-allocation',
  templateUrl: './outputqc-allocation.component.html',
  styleUrls: ['./outputqc-allocation.component.scss']
})
export class OutputqcAllocationComponent {

    //added code nov-13//
  isAllSelected: boolean = false;
isAllSelectedAllocated: boolean = false;
serialFrom: number | null = null;
serialTo: number | null = null;
///end///
  selectedChecksOption: string = 'unallocated';
  selectedUser:any
  selectedUserForAllocated:any;
  selectedWipComponent:any;
  usersForAllocated:any[]=[];
  usersForAllocation:any[]=[]
  totalCount = 0; 
  pageCount = 0;
  selectedRow:any; 
  showDetailsFlag:boolean = false;
  users:any[] =[]; 
  
  displayedColumns: string[] = ['select','serialNumber', 'caseId', 'candidateName', 'clientName','subclientName','initiationDate','tatEndDate',];
  dataSource: MatTableDataSource<any>;
  wipDisplayedColumns = ['select','serialNumber','caseId','candidateName','client','subclient','tatEndDate','allocatedTo','outputqcAllocationDate',];
  wipDataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
@ViewChild('paginator1') paginator1!: MatPaginator;
@ViewChild('paginator2') paginator2!: MatPaginator;
@ViewChild('sort1') sort1!: MatSort;
@ViewChild('sort2') sort2!: MatSort;





    // Initialize the paginator configuration
    pageSizeOptions: number[] = [10, 25, 100];
    pageSize: number = 10; // Initial page size
  constructor(
    private componentService:ComponentService,
    private componentDataService:ComponentDataService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private caseUploadService:CaseUploadService,
    private userRoleService:UserRoleService,
    private router:Router,
    private snackBar:MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<OutputqcItem>();

  }
 
  ngOnInit(): void {
    this.readUsersOfOutputqc()
    this.fillUsersForAllocatedList()
    this.findComponentsForOutputqc();
    // this.userService.findAllUsers().subscribe(
    //   response =>{
    //     console.log(response);
    //     this.users = response
    //   },
    //   error =>{
    //     console.log("Error reading users", error);
    //   }

    // )
    // this.readUnallocatedCases();  
    this.dataSource = new MatTableDataSource<OutputqcItem>([]);
    this.wipDataSource = new MatTableDataSource<OutputqcItem>([]);
    
  }
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator1;
  this.dataSource.sort = this.sort1;

  this.wipDataSource.paginator = this.paginator2;
  this.wipDataSource.sort = this.sort2;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // readUnallocatedCases(){
  //   this.caseUploadService.findAllCasesWithStatus("INITIATED",this.pageCount).subscribe(
  //     response=>{
  //       //console.log("response is ",response);
  //       this.totalCount = response.totalCount
  //       let  resp = response.resp
  //       resp.forEach((item:any)=>{
  //         let acase:any = ({

  //         })
  //         acase["selected"] = false;
  //         acase['case_id']= item._id;
  //         acase['caseId'] = item.caseId;
  //         acase['candidateName']=item.candidateName;
  //         acase['cientId'] = item.client._id;
  //         acase['clientName']=item.client.name;
  //         acase['subclientId']=item.subclient._id;
  //         acase['subclientName']=item.subclient.name;
  //         acase['initiationDate'] = item.initiationDate;
  //         acase['tatEndDate'] = item.tatEndDate;
  //         acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
  //         if(item.package){
  //           acase["packageName"] = item.package.name;
  //           acase["packageComponents"] = item.package.clientContractPackageComponents;                    
  //           acase["clientContractId"] = item.package.clientContract
  //         }else if(item.profile){
  //           acase["profileName"] = item.profile.name;
  //           acase["profileComponents"] = item.profile.clientContractProfileComponents;                    
  //           acase["clientContractId"] = item.profile.clientContract
  //         }else{
  //           acase["componentsToCheck"] = item.componentsToCheck;
  //         } 
  //         console.log('Acquired data:', acase);
  //           this.dataSource.data.push(acase);                      
  //           this.dataSource._updateChangeSubscription();

  //       })        
        
  //       this.dataSource.sort = this.sort;
  //       // this.dataSource.paginator = this.paginator1;                

  //     },
  //     error=>{
  //       //console.log("error  is ",error);
  //     }
  //   )
    


  // }

  readUsersOfOutputqc(){
    this.userRoleService.findAllUsersWithDetailsForARole("6058871640cb6e2ad5b4d95b").subscribe(
      response=>{
        response.forEach(item=>{
//          this.dataSource.data.push(item.user)
//          this.dataSource._updateChangeSubscription() 
          console.log("user is  ",item)
          if(item.user !== null){
            let user = ({
              _id:item.user._id,
              name:item.user.name
            })
            this.usersForAllocation.push(user)
          }


        })
      },
      error=>{
        this.showError("Error reading users for allocation")
      }
    )
  }
// findComponentsForOutputqc() {
//   this.caseUploadService.findAllCasesWithStatusForFinalQc("MENTOR-REVIEW-ACCEPTED", this.pageCount).subscribe({
//     next: (response) => {
//       this.totalCount = response.totalCount;

//       const outputqcItems: OutputqcItem[] = response.resp.map((item: any) => ({
//         case_id: item._id,
//         caseId: item.caseId,
//         subclient_id: item.subclient?._id,
//         subclientName: item.subclient?.name,
//         client_id: item.client?._id,
//         clientName: item.client?.name,
//         tatEndDate: item.tatEndDate,
//         initiationDate: item.initiationDate,
//         candidateName: item.candidateName,
//         colorCodes: item.client?.colorCodes,
//         allocatedTo: item.outputqcAllocatedTo?.name || "",
//         outputqcAllocationDate: item.outputqcAllocationDate || null,
//         selected: false
//       }));

//       // Split data once, no repeated pushes
//       const unallocated = outputqcItems.filter((i) => !i.allocatedTo);
//       const wip = outputqcItems.filter((i) => !!i.allocatedTo);

//       // Assign to data sources
//       this.dataSource.data = unallocated;
//       this.wipDataSource.data = wip;

//       // Update subscriptions
//       this.dataSource._updateChangeSubscription();
//       this.wipDataSource._updateChangeSubscription();

//       // Set paginator & sort
//       if (this.paginator) this.dataSource.paginator = this.paginator;
//       if (this.sort) this.dataSource.sort = this.sort;
//       if (this.paginator2) this.wipDataSource.paginator = this.paginator2;
//       if (this.sort1) this.wipDataSource.sort = this.sort1;
//     },
//     error: (err) => console.error(err)
//   });
// }

  findComponentsForOutputqc(){
    this.caseUploadService.findAllCasesWithStatus("MENTOR-REVIEW-ACCEPTED",this.pageCount).subscribe(
      response=>{
        this.totalCount = response.totalCount
        let  resp = response.resp
        //console.log("response from server",response)
        resp.forEach((item: { _id: any; caseId: any; subclient: { _id: any; name: any; }; client: { _id: any; name: any; colorCodes: any; }; tatEndDate: any;initiationDate:any; candidateName: any; outputqcAllocatedTo: { name: string | undefined; } | null; outputqcAllocationDate: Date | null | undefined; })=>{

          
          let outputqcItem: OutputqcItem = {
            case_id: item._id,
            caseId: item.caseId,
            subclient_id: item.subclient._id,
            subclientName: item.subclient.name,
            client_id: item.client._id,
            clientName: item.client.name,
            tatEndDate: item.tatEndDate,
            initiationDate:item.initiationDate,
            candidateName: item.candidateName,
            colorCodes: item.client.colorCodes,
            allocatedTo: item.outputqcAllocatedTo != null ? item.outputqcAllocatedTo.name : "",
            outputqcAllocationDate: item.outputqcAllocationDate != null ? item.outputqcAllocationDate : null,
            selected: false,
          };
            console.log("item is ",item)
            console.log("Outputqc item is ",outputqcItem)
           if(item.outputqcAllocatedTo == null ){
            // this.dataSource.data.push(outputqcItem);
            this.dataSource._updateChangeSubscription();
  this.dataSource.data = [...this.dataSource.data, outputqcItem];

           
  
          }else{
            // this.wipDataSource.data.push(outputqcItem);
            this.wipDataSource._updateChangeSubscription();
            this.wipDataSource.sort = this.sort1;
              this.wipDataSource.data = [...this.wipDataSource.data, outputqcItem];

          }

        })



      },
      error=>{

      }
    )
  }

  checkAndUpdate(outputqcItem: OutputqcItem){
    let promise = new Promise((resolve,reject)=>{
      let found = false;
      for(let i=0; i < this.dataSource.data.length;i++){
        let searchItem = this.dataSource.data[i];
        if(outputqcItem.caseId == searchItem.caseId){
          found = true;
        }
      }
      if(!found){
        this.dataSource.data.push(outputqcItem);
        this.dataSource._updateChangeSubscription();
      }
    })
    return promise;
  }

  detailsButtonClicked(outputqcItem: { case_id: any; caseId: any; candidateName: any; client_id: any; clientName: any; subclient_id: any; subclientName: any; colorCodes: any; }){
    //console.log("selected outputqc item is ",outputqcItem);
    let caseDetails = ({
      case_id :outputqcItem.case_id,
      caseId : outputqcItem.caseId,
      candidateName : outputqcItem.candidateName,
      clientId : outputqcItem.client_id,
      clientName : outputqcItem.clientName,
      subclientId : outputqcItem.subclient_id,
      subclientName : outputqcItem.subclientName,
      colorCodes:outputqcItem.colorCodes
    })
    this.componentDetailsForVerificationService.setVerificationItem(caseDetails)
    this.router.navigate([`outputqc/outputqccomponentlist`])

  }
  exportToExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cases in Outputqc');

    /* save to file */
    XLSX.writeFile(wb, 'CasesInOutputqc.xlsx');
  }
  exportToExcelwip(){
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.wipDataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cases in Outputqc');

    /* save to file */
    XLSX.writeFile(wb, 'AllocatedCasesInOutputqc.xlsx');
  }
  
  loadMoreClicked(){
    this.pageCount = this.pageCount + 1
    this.findComponentsForOutputqc()
  }

  // applyFilter(event:Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  applyFilterAllocated(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.wipDataSource.filter = filterValue.trim().toLowerCase();
  }
  allocateToUser(){
    if(this.selectedUser == null){
      this.showError("Select a user")
    }else{
      this.dataSource.data.forEach(item=>{
        if(item.selected){
          this.caseUploadService.updateOutputqcAllocation(item.case_id,this.selectedUser).subscribe(
            response=>{
              this.dataSource.data = []
              this.findComponentsForOutputqc()
            },
            error=>{
              this.showError("Error allocating to the user")
            }
          )
        }
      })
    }


  }
  reallocateToUser(){

    if(this.selectedUserForAllocated == null){
      this.showError("Select a user")
    }else{
      this.wipDataSource.data.forEach(item=>{
        if(item.selected){
          this.caseUploadService.updateOutputqcAllocation(item.case_id,this.selectedUserForAllocated).subscribe(
            response=>{
              this.wipDataSource.data = []
              this.findComponentsForOutputqc()
            },
            error=>{
              this.showError("Error allocating to the user")
            }
          )
        }
      })
    }


  }

  // filterSelectionForWipChanged(event){
  //   if(this.selectedWipComponent != "-1"){
  //     this.wipDataSource.filter = this.selectedWipComponent
  //     this.wipDataSource.filterPredicate = (data:any,filter:String)=> !filter || data.component_id ==filter
  //     this.fillUsersForAllocatedList();
  //   }else{
  //     this.wipDataSource.filter = ""
  //     this.wipDataSource.filterPredicate = (data:any,filter:String)=> !filter || data.component_id ==filter
  //   }
  // }
  fillUsersForAllocatedList(){
    this.userRoleService.findAllUsersWithDetailsForARole("6058871640cb6e2ad5b4d95b").subscribe(
      response=>{
        response.forEach(item=>{ 
//          this.dataSource.data.push(item.user)
//          this.dataSource._updateChangeSubscription()
          console.log("user is  ",item)
          if(item.user !== null){
            let user = ({
              _id:item.user._id,
              name:item.user.name
            })
            this.usersForAllocated.push(user)
          }
        })
      },
      error=>{
        this.usersForAllocated = []
        this.showError(error.message);
      }
    )
  }
 

  showMessage(msg:any){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }



  // onCheckboxChange(row:CaseData){
  //   console.log('Checkbox changed', row)
  //  }
    // Select All for Unallocated Table
toggleSelectAll(event: any) {
  const checked = event.checked;
  this.dataSource.data.forEach((row: any) => (row.selected = checked));
  this.isAllSelected = checked;
}

// Select All for Allocated Table  
toggleSelectAllAllocated(event: any) {
  const checked = event.checked;
  this.wipDataSource.data.forEach((row: any) => (row.selected = checked));
  this.isAllSelectedAllocated = checked;
}

// Individual checkbox change
onCheckboxChange(row: any) {
  // For unallocated table
  if (this.dataSource.data.includes(row)) {
    const allSelected = this.dataSource.data.every((item: any) => item.selected);
    this.isAllSelected = allSelected;
  } 
  // For allocated table
  else if (this.wipDataSource.data.includes(row)) {
    const allSelected = this.wipDataSource.data.every((item: any) => item.selected);
    this.isAllSelectedAllocated = allSelected;
  }
}

// Serial Number Range Selection
selectBySerialRange() {
  if (this.serialFrom == null || this.serialTo == null) {
    this.showError('Please enter both "From" and "To" serial numbers.');
    return;
  }

  if (this.serialFrom < 1) {
    this.showError('Serial number cannot be less than 1.');
    return;
  }

  if (this.serialFrom > this.serialTo) {
    this.showError('"From" serial number cannot be greater than "To".');
    return;
  }

  // Determine which table is active
  if (this.selectedChecksOption === 'unallocated') {
    this.selectBySerialRangeInDataSource(this.dataSource, this.serialFrom, this.serialTo, 'isAllSelected');
  } else if (this.selectedChecksOption === 'allocated') {
    this.selectBySerialRangeInDataSource(this.wipDataSource, this.serialFrom, this.serialTo, 'isAllSelectedAllocated');
  }
}

selectBySerialRangeInDataSource(dataSource: MatTableDataSource<any>, from: number, to: number, selectAllFlag: string) {
  if (dataSource.data.length === 0) {
    this.showError('No data available to select.');
    return;
  }

  if (to > dataSource.data.length) {
    this.showError(`"To" serial number cannot be greater than ${dataSource.data.length}.`);
    return;
  }

  // Update selection based on serial range
  dataSource.data.forEach((row: any, index: number) => {
    const serial = index + 1;
    row.selected = (serial >= from && serial <= to);
  });

  // Update the data source
  dataSource._updateChangeSubscription();

  // Update the select all flag
  if (selectAllFlag === 'isAllSelected') {
    this.isAllSelected = dataSource.data.every((item: any) => item.selected);
  } else {
    this.isAllSelectedAllocated = dataSource.data.every((item: any) => item.selected);
  }

  // Show selection feedback
  const selectedCount = dataSource.data.filter((item: any) => item.selected).length;
  this.showMessage(`Selected ${selectedCount} cases from serial ${from} to ${to}`);
}

}
