import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ComponentDetailsForVerificationService } from '../service/component-details-for-verification.service';
import { faPaperPlane, faInfoCircle } from '@fortawesome/free-solid-svg-icons';  // Import icons




@Component({
  selector: 'app-drop-box',
  templateUrl: './drop-box.component.html',
  styleUrls: ['./drop-box.component.scss']
})
export class DropBoxComponent {
  faPaperPlane = faPaperPlane;  
  faInfoCircle = faInfoCircle;
  selectedRow:any; 

  showDetailsFlag:boolean = false;
  displayedColumns = [
    'serialNumber', 'caseId', 'candidateName', 'clientName', 'subclientName','componentDisplayName',  'displayStatus', 'verificationAllocatedTo','tatEndDate','fileUploaded','reInitiate','details'];
    dataSource = new MatTableDataSource<any>([]); // Initialize with empty array

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private componentDataService: ComponentDataService,
    private router: Router,
    private componentDetailsForVerificationService: ComponentDetailsForVerificationService,

    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): void {
    this.componentDataService.getDropboxData().subscribe((response: any[]) => {
      const newData = response.map((item: any) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const currentDate = new Date();
        const initiationDate = new Date(item.case?.initiationDate); 
        const timeDifference = Math.round((currentDate.getTime() - initiationDate.getTime()) / oneDay);
        console.log("iteams :",item);
          console.log("color coddddeesssss",item.case);

        return {
          
          _id: item._id,
          case_id: item.case._id,
          caseId: item.case.caseId,
          candidateName: item.personalDetailsData?.name || null,
          displayStatus: item.status,
          vendorVerificationCompletionDate: item.vendorVerificationCompletionDate || null,
          verificationAllocatedTo: item.verificationAllocatedTo?.name || null,
          caseSystemId: item.caseSystemId || null,
          reportId: item.reportId || null,
          clientName: item.case.subclient.client.name,
          subclientName: item.case.subclient.name,
          tatEndDate: item.case.tatEndDate,
          componentDisplayName: item.component?.displayName || null,
          componentName: item.component?.name || null,
          client_id: item.client,
          component_id: item.component?._id || null,
          fileUploaded: item.fileUploaded === true ? "uploaded" : "Pending",
          fathername: item.personalDetailsData?.fathername,
          dateofbirth: item.personalDetailsData?.dateofbirth,
          timeDifference: timeDifference,
          colorCodes: item.case.subclient.client.colorCodes,
          
                        // if (item.personalDetailsData != null) {
      // dateofbirth:item.personalDetailsData.dateofbirth,
      mobilenumber:item.personalDetailsData.mobilename,
      // fathername:item.personalDetailsData.fathername,
      emailid:item.personalDetailsData.emailid,
      doj:item.personalDetailsData.doj,
      location:item.personalDetailsData.location,
      process:item.personalDetailsData.process,
      number:item.personalDetailsData.number,
      
      // if (item.personalDetailsData.candidatename != null) {
      //   candidateName:item.personalDetailsData.candidatename;
      // }
    // }
                // colorCodes: clientData.colorCodes || null,

        };
      });

      this.dataSource.data = newData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 

  // Apply filtering based on search input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Method to export data to Excel (you can implement your own logic)
  exportToExcel(): void {
    // Extract data from the MatTableDataSource
    const dataToExport = this.dataSource.data.map((row) => ({
      SerialNumber: row.serialNumber,       // You can rename or keep field names
      CaseId: row.caseId,
      CheckId: row.checkId,
      CandidateName: row.candidateName,
      ClientName: row.clientName,
      SubclientName: row.subclientName,
      TatStart: row.tatStartDate,
      TatEndDate: row.tatEndDate,
      Component: row.componentDisplayName,
      Status: row.displayStatus,
      FileUploaded: row.fileUploaded,
      TimeDifference: row.timeDifference,
      FatherName: row.fathername,
      DOB: row.dateofbirth,
      ColorCodes: row.colorCodes,
    }));
  
    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DropBoxData');
  
    // Generate Excel file and download it
    XLSX.writeFile(workbook, 'DropBoxData.xlsx');
  }
  

  // Method to handle row click to show details


  sendToApi(row: any): void {
    console.log("item",row);
    this.componentDataService.reinitiateChecks(row.componentName, row).subscribe(
      response => {
        console.log('response == ', response);
        if (row.componentName === 'globaldatabase') {
            if (response instanceof Blob) {
                const contentType = response.type;
                
                if (contentType === 'application/pdf') {
                    // Handle PDF Blob
                    console.log('File downloaded successfully.');
                    this.showMessage("File Uploaded Successfully");
                    this.dataSource.data.forEach(verificationItem => {
                      if (verificationItem._id === row._id) {
                        verificationItem.fileUploaded = 'uploaded'; // Adjust based on your needs
                      }
                    });
                } else if (contentType === 'application/json') {
                    // Read JSON Blob
                    response.text().then(text => {
                        const jsonResponse = JSON.parse(text);
                        console.log('JSON response:', jsonResponse);
                        this.showError(`Error: ${jsonResponse.message}`);
                    }).catch(error => {
                        console.error('Failed to parse JSON:', error);
                        this.showError('Error parsing server response.');
                    });
                } else {
                    this.showError('Unexpected response type');
                }
            } else {
                this.showError('Unexpected response format');
            }

          this.dataSource._updateChangeSubscription();
        } else {
          this.showMessage("Reinitiated Check Successfully");
          // Update the specific item in the dataSource
          this.dataSource.data.forEach(verificationItem => {
            if (verificationItem._id === row._id) {
              verificationItem.fileUploaded = 'uploaded';
            }
          });
            // Notify the dataSource about the data change
          this.dataSource._updateChangeSubscription();
        }
      },
      error => {
        console.log("error during reinitiate:", error);
        //added by anil on 6/11/2024
        this.showError(`Error: ${error.error.message}`);
      }
    )



    
  }

  details(row: any): void {
    console.log(row._id);
    this.showDetailsFlag =true;
   this.selectedRow =row;
   

   this.router.navigate([`home/verification/analystcomponentverification/${row._id}`]);
 this.componentDetailsForVerificationService.setVerificationItem(row);
   console.log('component type is  ', row);
   //console.log('status is   ',item.status);
   this.componentDataService.allocateCheckToMyself(row.componentName, row).subscribe(

     response => { 
       if (row.PV) {
         if (row.componentType == 'education') {
           this.router.navigate(['verification/analysteducationpv'])
         } else if (row.componentType == 'employment') {

           this.router.navigate(['verification/analystemploymentpv'])
         }
         //        }else if(item.componentType=='address'){
         //          this.router.navigate(['verification/analystfecheckedcomponent']);
         //          this.router.navigate(['verification/analystcomponentverification']);
       } else {
         //console.log("Item pv ",item.PV);
         //console.log("Item status ",item.status);
         if (row.status == 'FE-COMPLETED' || row.status == 'FE-INSUFFICIENT' || row.status == 'FE-COULD-NOT-VERIFY') {
           this.router.navigate(['verification/analystfecheckedcomponent']);
         } else if (row.status == 'VENDOR-COMPLETED' || row.status == 'VENDOR-INSUF' || row.status == 'FE-INSUFFICIENT' || row.status == 'VENDOR-COULD-NOT-VERIFY') {
           this.router.navigate(['verification/analystvendorcheckedcomponent']);
         } else {
           //console.log("I am here because ",item.status);
           this.router.navigate(['verification/analystcomponentverification']);
         }

       }
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