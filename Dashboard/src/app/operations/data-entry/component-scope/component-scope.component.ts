import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaseUploadService } from 'src/app/service/case-upload.service';
import { ClientContractPackageService } from 'src/app/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/service/client-contract-profile.service';

export interface TableData {
  id:number,
  componentName: string,
  scope: number,
  actual: number
}

@Component({
  selector: 'app-component-scope',
  templateUrl: './component-scope.component.html',
  styleUrls: ['./component-scope.component.scss']
})
export class ComponentScopeComponent {
  dataFromParent: any;
  displayedColumns: string[] = ['serialNumber','componentName', 'scope', 'actual'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogRef: MatDialogRef<ComponentScopeComponent>,
    private caseUploadService: CaseUploadService,
    private clientContractPackageService : ClientContractPackageService,
    private clientContractProfileService : ClientContractProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataFromParent = data;
  }

  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.getActualComponent();
  }

  getActualComponent() {
    this.caseUploadService.findACase(this.dataFromParent.case_id).subscribe({
      next: (data) => {
        const counts:any = {};
        data.actualComponents.forEach((item:any) => {
          counts[item] = (counts[item] || 0) + 1;
        });
        if (data.profile) {
          this.getClientContractProfile(data.profile, counts)
        } else if (data.package) {
          this.getClientContractPackage(data.package, counts)
        } else {
          let newData = data?.componentsToCheck.map((value:any) => {
            return({
              componentName: value?.componentDisplayName,
              scope: value?.maxChecks,
              actual: counts[value?.componentName] || 0
            })
          })
          this.dataSource.data = newData
        }
      },
      error: (error) => console.log('error === ', error),
    });
  }

  getClientContractProfile(profile:any, counts:any){
    this.clientContractProfileService.getClientContractProfileDetails(profile).subscribe({
      next: data => {
        if (data) {
          let newData = data?.clientContractProfileComponents.map((value:any) => {
            return({
              componentName: value?.componentName,
              scope: value?.maxChecks,
              actual: counts[value?.componentName] || 0
            })
          })
          this.dataSource.data = newData
        }
        console.log('profile === ', data?.clientContractProfileComponents)
      },
      error: err => {
        console.log('error === ', err)
      }
    })
  }

  getClientContractPackage(packageId:any, counts:any){
    this.clientContractPackageService.findOne(packageId).subscribe({
      next: data => {
        if (data) {
          let newData = data?.clientContractPackageComponents.map((value:any) => {
            return({
              componentName: value?.componentName,
              scope: value?.maxChecks,
              actual: counts[value?.componentName] || 0
            })
          })
          this.dataSource.data = newData
        }
      },
      error: err => {
        console.log('error === ', err)
      }
    })
  }

  closeDialogue() {
    this.dialogRef.close({event:'close'});
  }

  submitDialogue() {
    this.dialogRef.close({event:'submit'})
  }
}

