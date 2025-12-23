import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { BatchFileUploadService } from '../service/batch-file-upload.service';
import * as JSZip from 'jszip';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Batch {
  _id?:string;
  batchId?:number;
  client?:string;
  subclient?:string;
  batchDescription?:string;
  uploadDate?:string;
  numberOfCases?:number;
  acceptedCases?:number;
  rejectedCases?:number;
  modifiedBy?:string;
}

@Component({
  selector: 'app-batch-upload',
  templateUrl: './batch-upload.component.html',
  styleUrls: ['./batch-upload.component.scss']
})
export class BatchUploadComponent implements AfterViewInit, OnInit {
showDetails(_t98: any) {
throw new Error('Method not implemented.');
}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedRow: any;
  showDetailsFlag: boolean = false;

  displayedColumns: string[] = ['serialNumber', 'batchId', 'batchDescription', 'uploadDate', 'numberOfCases', 'acceptedCases'];
  dataSource: MatTableDataSource<any>;

  batchUploadForm: FormGroup;
  clients: any[] = [];
  subclients: any;

  constructor(
    private snackBar: MatSnackBar,
    private userSubclientAccessService: UserSubclientAccessService,
    private batchFileUploadService: BatchFileUploadService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource();
    this.batchUploadForm = this.createFormGroup();
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(userId).subscribe(
        response => {
          for (let subclientOfResponse of response) {
            if (!this.foundInClients(subclientOfResponse.client._id)) {
              let client = {
                _id: subclientOfResponse.client._id,
                name: subclientOfResponse.client.name
              };
              this.clients.push(client);
            }
            this.addToClient(subclientOfResponse.client._id, subclientOfResponse.subclient._id, subclientOfResponse.subclient.name);
          }
        },
        error => {
          this.showError('Error retrieving subclients');
        }
      );
    } else {
      console.error('User ID is null');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      clientId: new FormControl('', [Validators.required]),
      subclientId: new FormControl('', [Validators.required]),
      batchDescription: new FormControl('', [Validators.required]),
      numberOfCases: new FormControl(null, [Validators.required]),
      batchZipFile: new FormControl(null, [Validators.required])
    });
  }

  foundInClients(clientId: string): boolean {
    return this.clients.some(client => client._id === clientId);
  }

  addToClient(clientId: string, subclientId: string, subclientName: string): void {
    const client = this.clients.find(c => c._id === clientId);

    if (client) {
      if (!client.subclients) {
        client.subclients = [];
      }

      let subclient = {
        _id: subclientId,
        name: subclientName
      };

      client.subclients.push(subclient);
    }
  }

  clientSelectionChanged(event: any): void {
    this.showSubclientsForClient();
  }

  showSubclientsForClient(): void {
    const clientIdValue = this.batchUploadForm.get('clientId')?.value;

    if (clientIdValue) {
      const client = this.clients.find(c => c._id === clientIdValue);

      if (client) {
        this.subclients = client.subclients;
      } else {
        console.error('Client not found');
      }
    } else {
      console.error('clientId control is null');
    }
  }

  subclientSelectionChanged(event: any): void {
    this.readBatches();
  }

  // async onFormSubmit(): Promise<void> {
  //   const clientId = this.batchUploadForm.get('clientId')?.value as string;
  //   const subclientId = this.batchUploadForm.get('subclientId')?.value as string;
  //   const numberOfCases = this.batchUploadForm.get('numberOfCases')?.value as string;
  //   const batchDescription = this.batchUploadForm.get('batchDescription')?.value as string;
  //   const batchZipFileControl = this.batchUploadForm.get('batchZipFile');

  //   if (clientId && subclientId && numberOfCases && batchDescription && batchZipFileControl) {
  //     const formData = new FormData();
  //     formData.append('clientId', clientId);
  //     formData.append('subclientId', subclientId);
  //     formData.append('numberOfCases', numberOfCases);
  //     formData.append('batchDescription', batchDescription);

  //     const batchZipFileInput = batchZipFileControl?.value as HTMLInputElement | null;

  //     if (batchZipFileInput && batchZipFileInput.files && batchZipFileInput.files.length > 0) {
  //       formData.append('batchZipFile', batchZipFileInput.files[0]);

  //       const batch = {
  //         client: clientId,
  //         subclient: subclientId,
  //         numberOfCases: numberOfCases,
  //         batchDescription: batchDescription
  //       };

  //       try {
  //         const zipFile = await this.zipAllFiles();
  //         this.batchFileUploadService.uploadFile(batch, zipFile).subscribe(
  //           response => {
  //             this.showMessage('Batch Uploaded Successfully');
  //             this.readBatches();
  //           },
  //           error => {
  //             this.showError('Error Uploading Batch');
  //           }
  //         );
  //       } catch (err:any) {
  //         this.showError(err.message);
  //       }
  //     } else {
  //       this.showError('Invalid batchZipFile');
  //     }
  //   } else {
  //     this.showError('Invalid form data');
  //   }
  // }


  // async onFormSubmit() {
  //   const clientId = this.batchUploadForm.get('clientId')!.value;
  //   const subclientId = this.batchUploadForm.get('subclientId')!.value;
  //   const numberOfCases = this.batchUploadForm.get('numberOfCases')!.value;
  //   const batchDescription = this.batchUploadForm.get('batchDescription')!.value;
  //   const batchZipFileControl = this.batchUploadForm.get('batchZipFile');
  
  //   if (clientId && subclientId && numberOfCases && batchDescription && batchZipFileControl) {
  //     const formData = new FormData();
  //     formData.append('clientId', clientId);
  //     formData.append('subclientId', subclientId);
  //     formData.append('numberOfCases', numberOfCases);
  //     formData.append('batchDescription', batchDescription);
  
  //     const batchZipFileInput = batchZipFileControl.value[0];
  
  //     if (batchZipFileInput && this.isFileList(batchZipFileInput)) {
  //       formData.append('batchZipFile', batchZipFileInput);
  //     } else {
  //       this.showError('Invalid batchZipFile');
  //       return;
  //     }
  
  //     try {
  //       await this.batchFileUploadService.uploadFile(formData).toPromise();
  //       this.showMessage('Batch Uploaded Successfully');
  //       this.readBatches();
  //     } catch (error) {
  //       this.showError('Error Uploading Batch');
  //     }
  //   } else {
  //     this.showError('Invalid form data');
  //   }
  // }

  // async onFormSubmit() {
  //   const clientId = this.batchUploadForm.get('clientId')!.value;
  //   const subclientId = this.batchUploadForm.get('subclientId')!.value;
  //   const numberOfCases = this.batchUploadForm.get('numberOfCases')!.value;
  //   const batchDescription = this.batchUploadForm.get('batchDescription')!.value;
  //   const batchZipFileControl = this.batchUploadForm.get('batchZipFile');
  
  //   if (clientId && subclientId && numberOfCases && batchDescription && batchZipFileControl) {
  //     const formData = new FormData();
  //     formData.append('clientId', clientId);
  //     formData.append('subclientId', subclientId);
  //     formData.append('numberOfCases', numberOfCases);
  //     formData.append('batchDescription', batchDescription);
  
  //     const batchZipFileInput = batchZipFileControl.value._files[0];
      
  
  //     if (batchZipFileInput instanceof File) {
  //       formData.append('batchZipFile', batchZipFileInput);
  
  //       try {
  //         const zipFile = await this.zipAllFiles(); // Assuming this function returns the JSZip object
  //         await this.batchFileUploadService.uploadFile(formData, zipFile).toPromise();
  //         this.showMessage('Batch Uploaded Successfully');
  //         this.readBatches();
  //       } catch (error) {
  //         this.showError('Error Uploading Batch');
  //       }
  //     } else {
  //       this.showError('Invalid batchZipFile');
  //     }
  //   } else {
  //     this.showError('Invalid form data');
  //   }
  // }

  async onFormSubmit(){
    let batch:Batch = {};
        batch.client = this.batchUploadForm.get('clientId')!.value;
        batch.subclient = this.batchUploadForm.get('subclientId')!.value;
        batch.numberOfCases = this.batchUploadForm.get('numberOfCases')!.value;
        batch.batchDescription = this.batchUploadForm.get('batchDescription')!.value;
        this.batchFileUploadService.uploadFile(batch,this.batchUploadForm.get('batchZipFile')!.value._files[0]).subscribe(
          response=>{
            this.showMessage("Batch Uploaded Successfully");
            this.readBatches();
          },
          error=>{
            this.showError("Error Uploding Batch")
          }
        )
  }
  
  

  // zipAllFiles(): Promise<JSZip> {
  //   return new Promise((resolve, reject) => {
  //     const batchZipFileControl = this.batchUploadForm.get('batchZipFile');

  //     if (batchZipFileControl?.value && this.isFileList(batchZipFileControl.value)) {
  //       const zipFile = new JSZip();

  //       for (let i = 0; i < batchZipFileControl.value.length; i++) {
  //         zipFile.file(
  //           batchZipFileControl.value[i].name,
  //           batchZipFileControl.value[i]
  //         );
  //       }

  //       resolve(zipFile);
  //     } else {
  //       reject(new Error('Batch zip file not found or invalid.'));
  //     }
  //   });
  // }


  zipAllFiles(): Promise<JSZip> {
    return new Promise((resolve, reject) => {
      const batchZipFileControl = this.batchUploadForm.get('batchZipFile');

      if (batchZipFileControl?.value && this.isFileList(batchZipFileControl.value)) {
        const zipFile = new JSZip();
  
        for (let i = 0; i < batchZipFileControl.value.length; i++) {
          zipFile.file(
            batchZipFileControl.value[i].name,
            batchZipFileControl.value[i]
          );
        }
  
        console.log(zipFile); 
  
        resolve(zipFile);
      } else {
        reject(new Error('Batch zip file not found or invalid.'));
      }
    });
  }
  

  validateEntries(): number {
    let zipFileCount = 0;
    const batchZipFileControl = this.batchUploadForm.get('batchZipFile');

    if (batchZipFileControl && batchZipFileControl.value) {
      const zipFile = new JSZip();
      zipFile
        .loadAsync(batchZipFileControl.value, { checkCRC32: true })
        .then(zip => {
          zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
              const lastIndexOfDot = relativePath.lastIndexOf('.');
              const extension = relativePath.substring(lastIndexOfDot + 1);
              if (extension === 'zip') {
                zipFileCount++;
              }
            }
          });
        })
        .catch(err => {
          this.showError('Error reading zip file ' + err.message);
        });
    } else {
      this.showError('Invalid batchZipFile');
    }

    return zipFileCount;
  }

  readBatches(): void {
    const clientId = this.batchUploadForm.get('clientId')?.value;
    const subclientId = this.batchUploadForm.get('subclientId')?.value;

    if (clientId && subclientId) {
      this.batchFileUploadService
        .getAllBatchesForAClientAndSubclient(clientId as string, subclientId as string)
        .subscribe(
          response => {
            this.dataSource.data = response;
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.showMessage(error.error.message);
          }
        );
    } else {
      this.showError('Invalid clientId or subclientId');
    }
  }

  addBatch(): void {}

  showError(msg: string): void {
    this.snackBar.open(msg, 'Error', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Success', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  backButtonClicked(): void {
    this.location.back();
  }

  private isFileList(value: any): value is FileList {
    console.log('--------------------',value instanceof FileList);
    
    return value instanceof FileList;
  }
}
