import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/administration/service/user.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { UniversityService } from '../service/university.service';
import * as XLSX from 'xlsx';
export interface CaseData  {

    _id: string;
    caseId: string;
    candidateName: string;
    clientName: string;
    subclientName: string;
    initiationDate: string;
    tatEndDate: string;
    selected?:boolean;

  
}

@Component({
  selector: 'app-data-entry-tl',
  templateUrl: './data-entry-tl.component.html',
  styleUrls: ['./data-entry-tl.component.scss']
})
export class DataEntryTlComponent implements OnInit {
  selectedRow:any; 
  showDetailsFlag:boolean = false;
  users:any[] =[];
  selectedUser: string|null = null;
  displayedColumns: string[] = ['select','serialNumber', 'caseId', 'candidateName', 'clientName','subclientName','initiationDate','tatEndDate','dataEntryAllocatedTo','checks','pchecks','rchecks'];
  dataSource: MatTableDataSource<CaseData>;
  totalCount = 0;
  pageCount = 0;
  checked:any=false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  checkboxSelected: boolean =false;
  // @ViewChild('paginator1', { static: true })
  // paginator1!: MatPaginator; 
  constructor(
    private router:Router,
    // private universityService:UniversityService,
    private snackBar:MatSnackBar,
    private userService:UserService,
    private caseUploadService:CaseUploadService
  ) {
    this.dataSource = new MatTableDataSource<CaseData>();
  }
 
  ngOnInit(): void {
     this.userService.findUserByRoles().subscribe(

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
    // this.userService.findAllUsers().subscribe(
    //   response =>{
    //     console.log(response);
    //     this.users = response
    //   },
    //   error =>{
    //     console.log("Error reading users", error);
    //   }

    // )
    this.readUnallocatedCases();  
    
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  readUnallocatedCases(){
    this.caseUploadService.findAllCasesWithStatus("INITIATED",this.pageCount).subscribe(
      response=>{
        //console.log("response is ",response);
        this.totalCount = response.totalCount
        let  resp = response.resp
        resp.forEach((item:any)=>{
          let acase:any = ({

          })
          acase["selected"] = false;
          acase['case_id']= item._id;
          acase['caseId'] = item.caseId;
          acase['candidateName']=item.candidateName;
          acase['cientId'] = item.client._id;
          acase['clientName']=item.client.name;
          acase['subclientId']=item.subclient._id;
          acase['subclientName']=item.subclient.name;
          acase['initiationDate'] = item.initiationDate;
          acase['tatEndDate'] = item.tatEndDate;
          acase["dataEntryAllocatedTo"]=item.dataEntryAllocatedTo != null ? item.dataEntryAllocatedTo.name : null;
          acase['totalChecks'] = item.totalChecks
          acase['pendingChecks']= item.pendingChecks
          acase['rejectChecks'] = item.rejectChecks
          acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
          if(item.package){
            acase["packageName"] = item.package.name;
            acase["packageComponents"] = item.package.clientContractPackageComponents;                    
            acase["clientContractId"] = item.package.clientContract
          }else if(item.profile){
            acase["profileName"] = item.profile.name;
            acase["profileComponents"] = item.profile.clientContractProfileComponents;                    
            acase["clientContractId"] = item.profile.clientContract
          }else{
            acase["componentsToCheck"] = item.componentsToCheck;
          } 
          console.log('Acquired data:', acase);
            this.dataSource.data.push(acase);                      
            this.dataSource._updateChangeSubscription();

        })        
        
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator1;                

      },
      error=>{
        //console.log("error  is ",error);
      }
    )

    this.caseUploadService.findAllCasesWithStatus("DE-ALLOCATED",this.pageCount).subscribe(
      response=>{
        //console.log("response is ",response);
        this.totalCount = response.totalCount
        let  resp = response.resp
        resp.forEach((item:any)=>{
          let acase:any = ({

          })
          acase["selected"] = false;
          acase['case_id']= item._id;
          acase['caseId'] = item.caseId;
          acase['candidateName']=item.candidateName;
          acase['cientId'] = item.client._id;
          acase['clientName']=item.client.name;
          acase['subclientId']=item.subclient._id;
          acase['subclientName']=item.subclient.name;
          acase['initiationDate'] = item.initiationDate;
          acase['tatEndDate'] = item.tatEndDate;
          acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
          acase["dataEntryAllocatedTo"]=item.dataEntryAllocatedTo != null ? item.dataEntryAllocatedTo.name : null;
          if(item.package){
            acase["packageName"] = item.package.name;
            acase["packageComponents"] = item.package.clientContractPackageComponents;                    
            acase["clientContractId"] = item.package.clientContract
          }else if(item.profile){
            acase["profileName"] = item.profile.name;
            acase["profileComponents"] = item.profile.clientContractProfileComponents;                    
            acase["clientContractId"] = item.profile.clientContract
          }else{
            acase["componentsToCheck"] = item.componentsToCheck;
          } 
          console.log('Acquired data:', acase);
            this.dataSource.data.push(acase);                      
            this.dataSource._updateChangeSubscription();

        })        
        
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator1;                

      },
      error=>{
        //console.log("error  is ",error);
      }
    )
    ////new ///
    this.caseUploadService.findAllCasesWithStatus("INPUTQC-REJECTED",this.pageCount).subscribe(
      response=>{
        //console.log("response is ",response);
        this.totalCount = response.totalCount
        let  resp = response.resp
        resp.forEach((item:any)=>{
          let acase:any = ({

          })
          acase["selected"] = false;
          acase['case_id']= item._id;
          acase['caseId'] = item.caseId;
          acase['candidateName']=item.candidateName;
          acase['cientId'] = item.client._id;
          acase['clientName']=item.client.name;
          acase['subclientId']=item.subclient._id;
          acase['subclientName']=item.subclient.name;
          acase['initiationDate'] = item.initiationDate;
          acase['tatEndDate'] = item.tatEndDate;
          acase['dataEntryCompletionDate'] = item.dataEntryCompletionDate;
          acase["dataEntryAllocatedTo"]=item.dataEntryAllocatedTo != null ? item.dataEntryAllocatedTo.name : null;
          if(item.package){
            acase["packageName"] = item.package.name;
            acase["packageComponents"] = item.package.clientContractPackageComponents;                    
            acase["clientContractId"] = item.package.clientContract
          }else if(item.profile){
            acase["profileName"] = item.profile.name;
            acase["profileComponents"] = item.profile.clientContractProfileComponents;                    
            acase["clientContractId"] = item.profile.clientContract
          }else{
            acase["componentsToCheck"] = item.componentsToCheck;
          } 
          console.log('Acquired data:', acase);
            this.dataSource.data.push(acase);                      
            this.dataSource._updateChangeSubscription();

        })        
        
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator1;                

      },
      error=>{
        //console.log("error  is ",error);
      }
    )
    


  }

  exportToExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Available Checks');

    /* save to file */
    XLSX.writeFile(wb, 'AvailableChecks.xlsx');    
}

async allocateToUser(){
  //  let allocated = await this.allocate()
  //  if(allocated){
  //    location.reload()
     console.log("Allocating to user:",this.selectedUser)

      for(let i =0; i < this.dataSource.data.length;i++){
        let item = this.dataSource.data[i];
        if(item.selected){
          let allocated = await this.allocate(item,this.selectedUser)
        }
      }
      this.showMessage("Allocated to user")
      location.reload()
  }  
  
  allocate(item:any,selectedUser:any){
    let promise = new Promise((resolve,reject)=>{
          this.caseUploadService.allocateCaseToUser(item.case_id,{user_id:selectedUser}).subscribe(
            response=>{
              resolve(true)
            },
            error=>{
              this.showError("Error allocating to user");
              reject(false);
            }
          )
  
    })
    return promise
  }


  showError(msg:any){
    this.snackBar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showMessage(msg:any){
    this.snackBar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  } 

  // Added By Navin ON 27/02/24

  onCheckboxChange(e:any,row:CaseData){
    console.log("Event",e.checked);
    console.log('Checkbox changed', row)

    this.checkboxSelected = e.checked;

    if(e.checked){
      console.log('Checkbox is checked. Enable mat-select...');
    }
    else{
      console.log('Checkbox is unchecked. Disable mat-select...');
    }
   }

}
