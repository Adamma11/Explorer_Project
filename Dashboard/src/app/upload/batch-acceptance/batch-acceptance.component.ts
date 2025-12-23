import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BatchFileUploadService } from '../service/batch-file-upload.service';
import { CaseUploadService } from '../service/case-upload.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientService } from 'src/app/administration/service/client.service';
import { SubclientService } from 'src/app/administration/service/subclient.service';
import { RejectedCaseService } from '../service/rejected-case.service';
export interface UserData {
  _id?: any,
  fileName: any,
  candidateName: any,
  packageOrProfile: any,
  package: any,
  profile: any,
  accept?: any,
  reject?: any
}

@Component({
  selector: 'app-batch-acceptance',
  templateUrl: './batch-acceptance.component.html',
  styleUrls: ['./batch-acceptance.component.scss']
})
export class BatchAcceptanceComponent {
  @Input() selectedRow: any;
  @Output() dataToParent = new EventEmitter<any>();
  relevantContract_id!:string
  clientName!: string;
  subclientName!: string;
  batchId!: Number;
  clientId!: string;
  subClientId!: string;
  batch_id!: string;
  packages:any[]=[];
  profiles:any[]=[];

  batchAcceptanceDisplayedColumns = ['serialNumber', 'fileName', 'candidateName', 'packageOrProfile', 'package', 'profile', 'accept', 'reject']
  batchCasesDataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private subclientService: SubclientService,
    private batchFileUploadService: BatchFileUploadService,
    private caseUploadService: CaseUploadService,
    private clientContractService: ClientContractService,
    private clientContractProfileService: ClientContractProfileService,
    private clientContractPackageService: ClientContractPackageService,
    private rejectedCaseService: RejectedCaseService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    // console.log('selected val === ', this.selectedRow);
    this.clientName = this.selectedRow.client.name
    this.subclientName = this.selectedRow.subclient.name
    this.batchId = this.selectedRow.batchId;
    this.clientId = this.selectedRow.client._id;
    this.subClientId = this.selectedRow.subclient._id;
    this.batch_id = this.selectedRow._id;
    this.componentOnInit()
  }

  ngAfterViewInit(): void {
    this.batchCasesDataSource.paginator = this.paginator;
    this.batchCasesDataSource.sort = this.sort;
  }

  componentOnInit() {
    if (this.batch_id !== null) {
      this.readBatchFiles();
      // this.readAcceptedBatchCases();
      // this.readRejectedCasesForTheBatch();
    }
    this.getRelevantClientContracts();
  }

  getRelevantClientContracts(){
    this.clientContractService.findAllForAClient(this.clientId).subscribe(
      response=>{
        let currentDate = new Date();
        for(let item of response){
          if(currentDate > new Date(item.effectiveDate) && currentDate < new Date(Date.parse(item.expiryDate))){
            this.relevantContract_id = item._id;
            break;
          }
        }
        this.getPackages();
        this.getProfiles();
      },
      error=>{
        console.log("Error reading contract details : "+error.error.message);
      }
    )    
  }

  getProfiles(){
    this.clientContractProfileService.findAllForAClientContract(this.relevantContract_id).subscribe(
      response=>{
        this.profiles = response;
      },
      error=>{
        console.log("Error Reading Packages " + error.error.message);
      }
    )
  }  
  getPackages(){
    this.clientContractPackageService.findAllForAClientContract(this.relevantContract_id).subscribe(
      response=>{
        this.packages = response;
      },
      error=>{
       console.log("Error Reading Packages " + error.error.message);
      }
    )
  }

  readBatchFiles(){
    this.batchFileUploadService.readBatchFiles(this.batch_id).subscribe(
      response=>{        
        response.forEach(item=>{
          let batchCaseItem = ({
            fileName:item,
            candidateName:'',
            packageOrProfile:'-1',
            package:'-1',
            profile:'-1',
          })
          this.batchCasesDataSource.data.push(batchCaseItem);
        })
        this.batchCasesDataSource._updateChangeSubscription();
      },
      error=>{
        console.log(error.error.message);
      }
    )
  }

  packageOrProfileChanged(batchCaseItem:any){
    if(batchCaseItem.packageOrProfile == 'PACKAGE'){
      batchCaseItem.profile = '-1'
    }else{
      batchCaseItem.package = '-1'
    }
  }

  acceptButtonClicked(batchCaseItem:any){
    console.log("batchCaseItem accept == ", batchCaseItem);
    
    let caseData:any = {
      client:this.clientId,
      subclient:this.subClientId,
      candidateName:batchCaseItem.candidateName,
      package:batchCaseItem.packageOrProfile == 'PACKAGE' ? batchCaseItem.package:null,
      profile:batchCaseItem.packageOrProfile == 'PROFILE' ? batchCaseItem.profile:null,
      status:'INITIATED',
      batch:this.batch_id,
      caseFileName:batchCaseItem.fileName
    }
    
    let indexToRemove = this.batchCasesDataSource.data.indexOf(batchCaseItem)    
    this.caseUploadService.createABatchCase(caseData).subscribe(
      response=>{
        console.log(this.batchCasesDataSource.data.length);
        
        console.log(`${response.caseId} Uploaded Successfully`);
        this.dataToParent.emit(batchCaseItem);
        this.batchCasesDataSource.data.splice(indexToRemove,1);
        this.batchCasesDataSource._updateChangeSubscription();
        if(this.batchCasesDataSource.data.length === 0){
          this.dataToParent.emit(batchCaseItem);
        }    
      },
      error=>{
        console.log(error.error.message);
      } 
    )
  }
  rejectButtonClicked(batchCaseItem:any){
    console.log("batchCaseItem reject === ", batchCaseItem);
    
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus= true;
    // const dialogRef = this.dialog.open(BatchCaseRejectionCommentsDialogComponent,dialogConfig);    
    // dialogRef.afterClosed().subscribe(
    //   response=>{
    //     if(response){
    //       let rejectedCase = new RejectedCase();
    //       rejectedCase.batch = this.batch_id
    //       rejectedCase.candidateName = batchCaseItem.candidateName
    //       rejectedCase.rejectionReason = response.rejectionReason
    //       this.rejectedCaseService.create(rejectedCase).subscribe(
    //         response=>{
    //           this.batchFileUploadService.deleteCaseFile(this.batch_id,batchCaseItem.fileName).subscribe(
    //             response=>{
    //               this.batchCasesDataSource.data.splice(this.batchCasesDataSource.data.indexOf(batchCaseItem),1)
    //               this.batchCasesDataSource._updateChangeSubscription();
    //               if(this.batchCasesDataSource.data.length==0){
    //                 this.location.back();
    //               }
    //               this.showMessage("Case Rejected");
    //             },
    //             error=>{
    //               this.showError(error.error.message);
    //             }
    //           )
    //         },
    //         error=>{
    //           this.showError(error.error.message);
    //         }
    //       )           
    //     }

    //   },
    //   error=>{
    //     this.showError(error.error.message);
        
    //   }
    // )

  }

  downloadBatchFile() {
    console.log('dowloading....');

  }
}
