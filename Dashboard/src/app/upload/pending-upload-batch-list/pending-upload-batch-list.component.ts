import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { BatchFileUploadService } from '../service/batch-file-upload.service';


export interface UserData {
  _id: any;
  batchId: any;
  clientName: any;
  subclientName: any;
  numberOfCases: any,
  acceptedCases: any,
  rejectedCases: any,
  uploadedDate: any,
}
@Component({
  selector: 'app-pending-upload-batch-list',
  templateUrl: './pending-upload-batch-list.component.html',
  styleUrls: ['./pending-upload-batch-list.component.scss']
})
export class PendingUploadBatchListComponent {
  totalCount = 0;
  pageCount = 0;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns = ['serialNumber', 'batchId', 'clientName', 'subclientName', 'numberOfCases', 'acceptedCases', 'rejectedCases', 'uploadedDate'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private batchFileUploadService: BatchFileUploadService,
    private userSubclientAccessService: UserSubclientAccessService,
    private router: Router,
    private location: Location
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllBatches();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getAllBatches(){
  //   this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(localStorage.getItem('userId')).subscribe(
  //     response=>{
  //       this.batchFileUploadService.getAllBatchesForAListOfClientAndSubclients().subscribe(
  //         batchResponse=>{
  //           this.dataSource.data = batchResponse;
  //         },
  //         error=>{
  //           console.log(error.error.message);
  //         }
  //       )
  //     },
  //     error=>{
  //       console.log(error.error.message);
  //     })
  // }


  getAllBatches() {
    const userId = localStorage.getItem('userId');
    this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(userId).subscribe(
      (response) => {
        this.batchFileUploadService.getAllBatchesForAListOfClientAndSubclients().subscribe(
          (batchResponse) => {            
            this.dataSource.data = batchResponse.slice(-2)
          },
          (batchError) => {
            console.error('Error fetching batches:', batchError);
          }
        );
      },
      (subclientError) => {
        console.error('Error fetching subclients:', subclientError);
      }
    );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  receiveDataFromChild(data: any) { 
    if (data) {
      console.log('data == ', data);
          
      // let indexToRemove = this.dataSource.data.findIndex((item:any) => (item.caseId === data.caseId) && (item.componentName === data.componentName));
      // console.log("indexToRemove == ", indexToRemove);
      this.showDetailsFlag = false;
      this.displayedColumns = ['serialNumber', 'batchId', 'clientName', 'subclientName', 'numberOfCases', 'acceptedCases', 'rejectedCases', 'uploadedDate'];
    }
    // if (indexToRemove !== -1) {
    //   this.showDetailsFlag = false;
    //   this.displayedColumns = ['serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName', 'componentDisplayName', 'field', 'displayStatus', 'insufficiencyRaisedDate', 'insufficiencyComments']
    //   this.table.renderRows();
    //   this.dataSource.data.splice(indexToRemove,1);
    //   this.dataSource._updateChangeSubscription();
    // }
  }

  showDetails(row: any) {
    // console.log('row == ', row);
    this.showDetailsFlag = true;
    this.selectedRow = row;
    const columnToToggle = ['clientName', 'subclientName','numberOfCases', 'acceptedCases', 'rejectedCases', 'uploadedDate'];
    columnToToggle.forEach(column => {
    const columnIdx = this.displayedColumns.indexOf(column);
    if (columnIdx !== -1) {
      this.displayedColumns.splice(columnIdx, 1);
    }
  });
    this.table.renderRows();
  }
}
