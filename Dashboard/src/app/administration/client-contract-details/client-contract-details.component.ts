import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { ClientContract } from 'src/app/model/client-contract';
import { ClientContractComponent } from 'src/app/model/client-contract-component';
import { ClientContractPackage } from 'src/app/model/client-contract-package';
import { ClientContractPackageComponent } from 'src/app/model/client-contract-package-component';
import { ClientContractProfile } from 'src/app/model/client-contract-profile';
import { ClientContractProfileComponent } from 'src/app/model/client-contract-profile-component';
import { Incentive } from 'src/app/model/incentive';
import { Penalty } from 'src/app/model/penalty';
import { ClientContractComponentService } from 'src/app/service/client-contract-component.service';
import { ClientContractPackageService } from 'src/app/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/service/client-contract-profile.service';
import { ClientContractService } from 'src/app/service/client-contract.service';
import { ClientService } from 'src/app/service/client.service';
import { ComponentService } from 'src/app/service/component.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
// import { ClientContract } from '../model/client-contract';

import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { CaseUploadService } from 'src/app/service/case-upload.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

//import Models
import {Client} from "src/app/model/client";

@Component({
  selector: 'app-client-contract-details',
  templateUrl: './client-contract-details.component.html',
  styleUrls: ['./client-contract-details.component.scss']
})
export class ClientContractDetailsComponent {
  oldPackageSelected!: ClientContractPackage;
  _id: string = '';
  clientId!: string;
  clientName: string = '';
  clientContractId: string = '';
  penaltyDisplayedColumns!: string[];
  incentiveDisplayedColumns!: string[];
  componentDisplayedColumns!: string[];
  profileDisplayedColumns!: string[];
  packageDisplayedColumns!: string[];
  packageComponentDisplayedColumns!: string[];
  profileComponentDisplayedColumns!: string[];
  fileDownloadDisplayedColumns!: string[];

  contractDetailsForm!: FormGroup;
  fileUploadForm!: FormGroup;

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  files = [];

  componentDataSource: MatTableDataSource<ClientContractComponent> =
    new MatTableDataSource<ClientContractComponent>();
  packageDataSource: MatTableDataSource<ClientContractPackage> =
    new MatTableDataSource<ClientContractPackage>();
  profileDataSource: MatTableDataSource<ClientContractProfile> =
    new MatTableDataSource<ClientContractProfile>();
  packageComponentDataSource: MatTableDataSource<ClientContractPackageComponent> =
    new MatTableDataSource<ClientContractPackageComponent>();
  profileComponentDataSource: MatTableDataSource<ClientContractProfileComponent> =
    new MatTableDataSource<ClientContractProfileComponent>();
  penaltyDataSource: MatTableDataSource<Penalty> =
    new MatTableDataSource<Penalty>();
  incentiveDataSource: MatTableDataSource<Incentive> =
    new MatTableDataSource<Incentive>();
  fileDownloadDataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private clientContractService: ClientContractService,
    private clientContractComponentService: ClientContractComponentService,
    private clientContractPackageService: ClientContractPackageService,
    private clientContractProfileService: ClientContractProfileService,
    private caseUploadService: CaseUploadService,
    private componentService: ComponentService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private location: Location,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.initializeContractDetailsForm();
    this.initializeFileUploadForm();
    this.penaltyDisplayedColumns = [
      'serialNumber',
      'from',
      'to',
      'penalty',
      'add',
      'delete',
    ];
    this.incentiveDisplayedColumns = [
      'serialNumber',
      'from',
      'to',
      'penalty',
      'add',
      'delete',
    ];

    this.componentDisplayedColumns = [
      'serialNumber',
      'component',
      'select',
      'tat',
      'writtenPrice',
      'verbalPrice',
      'onlinePrice',
      'physicalVisitPrice',
      'reimbursementAllowed',
      'reimbursementAbove',
      'closureModesAllowed',
      'interimClosureAllowed',
      'scopeOfWork',
    ];
    this.profileDisplayedColumns = [
      'serialNumber',
      'name',
      'tat',
      'select',
      'add',
      'delete',
    ];
    this.packageDisplayedColumns = [
      'serialNumber',
      'name',
      'price',
      'tat',
      'select',
      'add',
      'delete',
    ];

    this.packageComponentDisplayedColumns = [
      'serialNumber',
      'component',
      'details',
      'maxChecks',
      'select',
    ];
    this.profileComponentDisplayedColumns = [
      'serialNumber',
      'component',
      'details',
      'maxChecks',
      'select',
    ];
    this.fileDownloadDisplayedColumns = [
      'serialNumber',
      'fileName',
      'download',
      'delete',
    ];
  }
  initializeContractDetailsForm(): void {
    this.contractDetailsForm = this.fb.group({
      agreementDate: ['', [Validators.required]],
      effectiveDate: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      retentationDate: [''],
    });
  }

  initializeFileUploadForm(): void {
    this.fileUploadForm = this.fb.group({
      clientContractFile: [''],
      fileTitle: [''],
    });
  }
  ngOnInit(): void {
    console.log('oldPackageSelected', this.oldPackageSelected);
// this.getClientDetails()
    this.initializeFromRoute();
    this.getComponents();
    
  }


  selectedFileName: string | null = null;

  onFileSelected(event: any): void {    
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
     console.log("files",files);
     
    if (files && files.length > 0) {
      this.selectedFileName = files[0].name;
    } else {
      this.selectedFileName = null;
    }
  }

  clearFileSelection(): void {
    this.selectedFileName = null;
  }



  private initializeFromRoute() {
    if (this.activatedRoute.snapshot.paramMap.get('clientId')) {
      this.clientId =
        this.activatedRoute.snapshot.paramMap.get('clientId') || '';
      this.getClientDetails();
    }

    if (this.activatedRoute.snapshot.paramMap.get('clientContractId')) {
      this._id =
        this.activatedRoute.snapshot.paramMap.get('clientContractId') || '';
      this.getContractDetails();
    } else {
      this._id = '';
    }
  }

  getClientDetails() {
    this.clientService.findAClient(this.clientId).subscribe({
      next: (response) => {
          console.log("name of the clinet",response,);
        this.clientName = response.name;
        // this.clientId = response._id
      },
      error: (error) => {
        console.log(error);

        this.showError('Error reading Client');
      },
    });
  }

  getComponents() {
    this.componentService.findAllComponents().subscribe({
      next: (response) => {
        for (const element of response) {
          let clientContractComponent: ClientContractComponent =
            {} as ClientContractComponent;
          clientContractComponent.component = element._id;
          clientContractComponent.componentName = element.name;
          clientContractComponent.displayName = element.displayName;
          this.componentDataSource.data.push(clientContractComponent);
        }
        this.componentDataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
        this.showError('error in getting components');
      },
    });
  }
  getContractDetails() {
    this.clientContractService.findContractDetails(this._id).subscribe({
      next: (response) => {
        this.fillResponseDetails(response);
        this.readFiles();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fillResponseDetails(response:any) {
    this.clientName = response.client.name;
    this.clientId = response.client;
    this.clientContractId = response._id;
    this.contractDetailsForm.get('agreementDate')?.setValue(this.datePipe.transform(response.agreementDate,'yyyy-MM-dd'));
    this.contractDetailsForm.get('effectiveDate')?.setValue(this.datePipe.transform(response.effectiveDate,'yyyy-MM-dd'));
    this.contractDetailsForm.get('expiryDate')?.setValue(this.datePipe.transform(response.expiryDate,'yyyy-MM-dd'));
    this.contractDetailsForm.get('retentationDate')?.setValue(this.datePipe.transform(response.retentationDate,'yyyy-MM-dd'));
    this.incentiveDataSource.data = response.incentiveSlabs;
    this.penaltyDataSource.data = response.penaltySlabs;

    this.fillClientContractComponents();
    this.fillClientContractPackages();
    this.fillClientContractProfiles();
  }
  fillClientContractComponents() {
    this.clientContractComponentService
      .findAllForAClientContract(this.clientContractId)
      .subscribe({
        next:(response) => {
          console.log('trying to set the selected components ', response);
          response.forEach((item) => {
            this.componentDataSource.data.forEach((dataSourceComp) => {
              if (dataSourceComp.component == item.component._id) {
                dataSourceComp.selected = true;
                dataSourceComp.tat = item.tat;
                dataSourceComp.price = item.price;
                dataSourceComp.verbalPrice = item.verbalPrice;
                dataSourceComp.onlinePrice = item.onlinePrice;
                dataSourceComp.pvPrice = item.pvPrice;
                dataSourceComp.reimbursementAllowed = item.reimbursementAllowed;
                dataSourceComp.reimbursementPrice = item.reimbursementPrice;
                dataSourceComp.closureModesAllowed = item.closureModesAllowed;
                dataSourceComp.interimClosureAllowed =
                  item.interimClosureAllowed;
                dataSourceComp.scopeOfWork = item.scopeOfWork;
              }
            });
          });
          this.componentDataSource._updateChangeSubscription();
          this.componentDataSource.data.forEach((item) => {
            if (item.selected) {
              let clientContractPackageComponent:ClientContractPackageComponent =  {} as ClientContractPackageComponent;
              let clientContractProfileComponent:ClientContractProfileComponent = {} as ClientContractProfileComponent;
              clientContractPackageComponent.component = item.component;
              clientContractPackageComponent.componentName = item.componentName;
              clientContractPackageComponent.displayName = item.displayName;

              clientContractProfileComponent.component = item.component;
              clientContractProfileComponent.componentName = item.componentName;
              clientContractProfileComponent.displayName = item.displayName;

              this.packageComponentDataSource.data.push(
                clientContractPackageComponent
              );
              this.profileComponentDataSource.data.push(
                clientContractProfileComponent
              );
            }
          });

          this.packageComponentDataSource._updateChangeSubscription();
          this.profileComponentDataSource._updateChangeSubscription();
        },
        error:(error) => {
          this.showError('Error reading Components in Client Contract');
        }
  });
  }
  fillClientContractPackages() {
    this.clientContractPackageService
      .findAllForAClientContract(this.clientContractId)
      .subscribe(
        (response) => {
          response.forEach((item) => {
            let clientContractPackage:ClientContractPackage =  {} as ClientContractPackage;
            clientContractPackage._id = item._id;
            clientContractPackage.name = item.name;
            clientContractPackage.clientContract = item.clientContract;
            clientContractPackage.name = item.name;
            clientContractPackage.tat = item.tat;
            clientContractPackage.price = item.price;
            clientContractPackage.clientContractPackageComponents =
              item.clientContractPackageComponents;
            this.packageDataSource.data.push(clientContractPackage);
          });
          this.packageDataSource._updateChangeSubscription();
        },
        (error) => {
          this.showError('Error fetching Package details');
        }
      );
  }
  fillClientContractProfiles() {
    this.clientContractProfileService
      .findAllForAClientContract(this.clientContractId)
      .subscribe((response) => {
        response.forEach((item) => {
          let clientContractProfile:ClientContractProfile = {} as ClientContractProfile;
          clientContractProfile._id = item._id;
          clientContractProfile.clientContract = item.clientContract;
          clientContractProfile.name = item.name;
          clientContractProfile.tat = item.tat;
          clientContractProfile.clientContractProfileComponents =
            item.clientContractProfileComponents;
          this.profileDataSource.data.push(clientContractProfile);
        });
        this.profileDataSource._updateChangeSubscription();
      });
  }
  optionChanged(e:MatCheckboxChange, component:ClientContractComponent) {
    if (e.checked) {
      component.selected = true;
      this.addToPackageComponentDataSource(component);
      this.addToProfileComponentDataSource(component);
    } else {
      component.selected = false;
    }
    this.componentDataSource._updateChangeSubscription();
  }
  addToPackageComponentDataSource(component:ClientContractComponent) {
    let clientContractPackageComponent:ClientContractPackageComponent = {} as ClientContractPackageComponent;
    clientContractPackageComponent.componentName = component.componentName;
    clientContractPackageComponent.component = component.component;
    this.packageComponentDataSource.data.push(clientContractPackageComponent);
    this.packageComponentDataSource._updateChangeSubscription();
  }
  addToProfileComponentDataSource(component:ClientContractComponent) {
    let clientContractProfileComponent:ClientContractProfileComponent = {} as ClientContractProfileComponent;
    clientContractProfileComponent.componentName = component.componentName;
    clientContractProfileComponent.component = component.component;
    this.profileComponentDataSource.data.push(clientContractProfileComponent);
    this.profileComponentDataSource._updateChangeSubscription();
  }
  addComponentClicked() {
    console.log('add component clicked');
    this.router.navigate(['home/administration/clientcomponentdetails']);
  }
  addPackageButtonClicked() {
    this.packageDataSource.data.forEach((item) => {
      item.selected = false;
    });
    let clientContractPackage:ClientContractPackage = {} as ClientContractPackage;
    clientContractPackage.selected = true;
    this.packageDataSource.data.push(clientContractPackage);
    this.packageDataSource._updateChangeSubscription();

    console.log(
      'package component daata source is ',
      this.packageComponentDataSource.data
    );
    this.packageComponentDataSource.data.forEach((comp) => {
      comp.selected = false;
      comp.details = '';
    });
    this.packageComponentDataSource._updateChangeSubscription();
  }
  deletePackageButtonClicked(pkg: ClientContractPackage) {
    this.caseUploadService.packageUsed(pkg._id).subscribe(
      (response) => {
        if (!response.used) {
          this.packageDataSource.data.splice(
            this.packageDataSource.data.indexOf(pkg),
            1
          );
          this.packageDataSource._updateChangeSubscription();
        } else {
          this.showError('Package is used and cannot be deleted');
        }
      },
      (error) => {
        this.showError('Error Deleting Package');
      }
    );
  }
  addProfileButtonClicked() {
    this.profileDataSource.data.forEach((item) => {
      item.selected = false;
    });
    let clientContractProfile:ClientContractProfile = {} as  ClientContractProfile;
    clientContractProfile.selected = true;
    this.profileDataSource.data.push(clientContractProfile);
    this.profileDataSource._updateChangeSubscription();

    console.log(
      'package component daata source is ',
      this.profileComponentDataSource.data
    );
    this.profileComponentDataSource.data.forEach((comp) => {
      comp.selected = false;
      comp.details = '';
    });
    this.profileComponentDataSource._updateChangeSubscription();
  }
  deleteProfileButtonClicked(profile: ClientContractProfile) {
    this.caseUploadService.packageUsed(profile._id).subscribe(
      (response) => {
        if (!response.used) {
          this.profileDataSource.data.splice(
            this.profileDataSource.data.indexOf(profile),
            1
          );
          this.profileDataSource._updateChangeSubscription();
        } else {
          this.showError('Profile is used and cannot be deleted');
        }
      },
      (error) => {
        this.showError('Error deleting profile');
      }
    );
  }
  addPenaltySlabButtonClicked() {
    let penalty = new Penalty();
    this.penaltyDataSource.data.push(penalty);
    this.penaltyDataSource._updateChangeSubscription();
    console.log(
      'penalty data source size is ' + this.penaltyDataSource.data.length
    );
  }
  addIncentiveSlabButtonClicked() {
    let incentive:Incentive = {} as Incentive;
    this.incentiveDataSource.data.push(incentive);
    this.incentiveDataSource._updateChangeSubscription();
  }
  deletePenaltySlabButtonClicked(penalty:Penalty) {
    this.penaltyDataSource.data.splice(
      this.penaltyDataSource.data.indexOf(penalty),
      1
    );
    this.penaltyDataSource._updateChangeSubscription();
  }
  deleteIncentiveSlabButtonClicked(incentive:Incentive) {
    this.incentiveDataSource.data.splice(
      this.incentiveDataSource.data.indexOf(incentive),
      1
    );
    this.incentiveDataSource._updateChangeSubscription();
  }
  saveContractButtonClicked() {
    // let clientContract = new ClientContract();
    let clientContract:ClientContract = {} as  ClientContract;
    clientContract.client = this.clientId;
    clientContract.agreementDate= this.contractDetailsForm.get('agreementDate')?.value;
    clientContract.effectiveDate= this.contractDetailsForm.get('effectiveDate')?.value;
    clientContract.expiryDate= this.contractDetailsForm.get('expiryDate')?.value;
    clientContract.retentationDate = this.contractDetailsForm.get('retentationDate')?.value;
    console.log('trying to save penalty slabs size is',this.penaltyDataSource.data.length);
    clientContract.penaltySlabs = this.penaltyDataSource.data;
    clientContract.incentiveSlabs = this.incentiveDataSource.data;
    console.log("Contract",this._id)
    // let clientContract:ClientContract = {} as  ClientContract;
    // clientContract.client = this.clientId;
    // clientContract.agreementDate =
    //   this.contractDetailsForm.get('agreementDate')?.value;
    // clientContract.effectiveDate =
    //   this.contractDetailsForm.get('effectiveDate')?.value;
    // clientContract.expiryDate =
    //   this.contractDetailsForm.get('expiryDate')?.value;
    // clientContract.retentationDate =
    //   this.contractDetailsForm.get('retentationDate')?.value;
    // console.log(
    //   'trying to save penalty slabs size is',
    //   this.penaltyDataSource.data.length
    // );
    // clientContract.penaltySlabs = this.penaltyDataSource.data;
    // clientContract.incentiveSlabs = this.incentiveDataSource.data;
    if (this._id == '') {
      this.createContract(clientContract);
    } else {
      this.updateContract(clientContract);
    }
  }
  createContract(clientContract:ClientContract) {
    this.clientContractService.createContract(clientContract).subscribe({
      next:(response) => {
        this.clientContractId = response._id;
        this.showMessage('Client Contract Saved');
        this.createClientContractComponents();
      },
      error : (error) => {
        console.log(error);
        
        this.showError('Error Saving Client Contract');
      }
    })
  }

  updateContract(clientContract:ClientContract) {
    clientContract._id = this._id;
    this.clientContractService
      .updateContract(this._id, clientContract)
      .subscribe({
        next:(response) => {
        this.showMessage('Client Contract Saved');
        this.deleteContractComponents();
        },
        error:(error) => {
          console.log(error);
          this.showError('Error saving Client Contract');
        }
    })
  }
  createClientContractComponents() {
    let clientContractComponents = new Array<ClientContractComponent>();
    this.componentDataSource.data.forEach((item) => {
      console.log('Trying to save component ', item);
      if (item.selected) {
        let clientContractComponent:ClientContractComponent = {} as ClientContractComponent;
        clientContractComponent.client = this.clientId;
        clientContractComponent.clientContract = this.clientContractId;
        clientContractComponent.component = item.component;
        clientContractComponent.tat = item.tat;
        clientContractComponent.price = item.price;
        clientContractComponent.verbalPrice = item.verbalPrice;
        clientContractComponent.onlinePrice = item.onlinePrice;
        clientContractComponent.pvPrice = item.pvPrice;
        clientContractComponent.reimbursementAllowed =
          item.reimbursementAllowed;
        clientContractComponent.reimbursementPrice = item.reimbursementPrice;
        clientContractComponent.closureModesAllowed = item.closureModesAllowed;
        clientContractComponent.interimClosureAllowed =
          item.interimClosureAllowed;
        clientContractComponent.scopeOfWork = item.scopeOfWork;
        clientContractComponents.push(clientContractComponent);
      }
    });
    let postData = {
      clientContractComponents: clientContractComponents,
    };
    this.clientContractComponentService
      .createForAClientContract(this.clientContractId, postData)
      .subscribe(
        (response) => {
          this.showMessage('Contract Components Saved');
          this.deleteClientContractPackages();
          this.deleteClientContractProfiles();
        },
        (error) => {
          console.log(error);
          this.showError('Error saving Contract Components');
        }
      );
  }
  deleteContractComponents() {
    this.clientContractComponentService
      .deleteAllForAClientContract(this.clientContractId)
      .subscribe(
        (response) => {
          this.showMessage('Contract Components Deleted');
          this.createClientContractComponents();
        },
        (error) => {
          console.log('error deleting contract components ', error);
          this.showError('Error deleting Contract Components');
        }
      );
  }
  deleteClientContractPackages() {
    this.clientContractPackageService
      .deleteAllForAClientContract(this.clientContractId)
      .subscribe(
        (response) => {
          this.showMessage('Contract Packages Deleted');
          this.createClientContractPackages();
        },
        (error) => {
          this.showError('Error deleting contract packages');
        }
      );
  }
  deleteClientContractProfiles() {
    this.clientContractProfileService
      .deleteAllForAClientContract(this.clientContractId)
      .subscribe(
        (response) => {
          this.showMessage('Contract Profiles Deleted');
          this.createClientContractProfiles();
        },
        (error) => {
          this.showError('Error deleting contract profiles');
        }
      );
  }
  createClientContractPackages() {
    console.log('package data source contains', this.packageDataSource.data);
    this.packageDataSource.data.forEach((item) => {
      item.clientContract = this.clientContractId;
    });
    let postData = {
      clientContractPackages: this.packageDataSource.data,
    };
    this.clientContractPackageService
      .createManyForAClientContract(this.clientContractId, postData)
      .subscribe(
        (response) => {
          this.showMessage('Contract Packages Created');
        },
        (error) => {
          console.log('error saving pages ', error);
          this.showError('Error Creating Contract Packages');
        }
      );
  }
  createClientContractProfiles() {
    console.log('package data source contains', this.profileDataSource.data);
    this.profileDataSource.data.forEach((item) => {
      item.clientContract = this.clientContractId;
    });
    let postData = {
      clientContractProfiles: this.profileDataSource.data,
    };
    this.clientContractProfileService
      .createManyForAClientContract(this.clientContractId, postData)
      .subscribe(
        (response) => {
          this.showMessage('Contract Profiles Created');
        },
        (error) => {
          this.showError('Error Creating Contract Profiless');
        }
      );
  }
  packageComponentOptionChanged(e:MatCheckboxChange, packageComponent:ClientContractPackageComponent) {
    if (e.checked) {
      for (let pkg of this.packageDataSource.data) {
        if (pkg.selected) {
          if (pkg.clientContractPackageComponents == null) {
            pkg.clientContractPackageComponents =
              new Array<ClientContractPackageComponent>();
          }
          let clientContractPackageComponent:ClientContractPackageComponent = {} as ClientContractPackageComponent;
          clientContractPackageComponent.component = packageComponent.component;
          clientContractPackageComponent.componentName =
            packageComponent.componentName;
          clientContractPackageComponent.details = packageComponent.details;
          clientContractPackageComponent.maxChecks = packageComponent.maxChecks;
          pkg.clientContractPackageComponents.push(
            clientContractPackageComponent
          );
          break;
        }
      }
    } else {
      for (let pkg of this.packageDataSource.data) {
        if (pkg.selected) {
          pkg.clientContractPackageComponents.splice(
            pkg.clientContractPackageComponents.indexOf(packageComponent),
            1
          );
          break;
        }
      }
    }
    /*    console.log('Component clicked is ', dataSourceComponent.component, dataSourceComponent.componentName);
    if(e.checked){
      for(let pkg of this.packageDataSource.data){
        if(pkg.selected){
          if(pkg.clientContractPackageComponents==null){
            pkg.clientContractPackageComponents= new Array<ClientContractPackageComponent>();
            let clientContractPackageComponent = new ClientContractPackageComponent();
            clientContractPackageComponent.component = dataSourceComponent.component;
            clientContractPackageComponent.componentName = dataSourceComponent.componentName;
            clientContractPackageComponent.details = dataSourceComponent.details;
            clientContractPackageComponent.maxChecks = dataSourceComponent.maxChecks;
            pkg.clientContractPackageComponents.push(clientContractPackageComponent);            
          }else{
            let pkgComponents =pkg.clientContractPackageComponents;
            for(let pkgcomponent of pkgComponents){
              if(dataSourceComponent.component == pkgcomponent.component){
                pkgcomponent.details = dataSourceComponent.details;
                pkgcomponent.maxChecks = dataSourceComponent.maxChecks;
                break;
              }
            }
          }
          break;
        }
      }
    }else{
      for(let pkg of this.packageDataSource.data){
        if(pkg.selected){
          pkg.clientContractPackageComponents.splice(pkg.clientContractPackageComponents.indexOf(dataSourceComponent),1);
          break;
        }
      }
    } */
  }
  profileComponentOptionChanged(e:MatCheckboxChange, profileComponent:ClientContractProfileComponent) {
    console.log(
      'Component clicked is ',
      profileComponent.component,
      profileComponent.componentName
    );
    if (e.checked) {
      for (let prof of this.profileDataSource.data) {
        if (prof.selected) {
          if (prof.clientContractProfileComponents == null) {
            prof.clientContractProfileComponents =
              new Array<ClientContractProfileComponent>();
          }
          let clientContractProfileComponent:ClientContractProfileComponent = {} as ClientContractProfileComponent;
          clientContractProfileComponent.component = profileComponent.component;
          clientContractProfileComponent.componentName =
            profileComponent.componentName;
          clientContractProfileComponent.details = profileComponent.details;
          clientContractProfileComponent.maxChecks = profileComponent.maxChecks;
          prof.clientContractProfileComponents.push(
            clientContractProfileComponent
          );
          break;
        }
      }
    } else {
      for (let prof of this.profileDataSource.data) {
        if (prof.selected) {
          prof.clientContractProfileComponents.splice(
            prof.clientContractProfileComponents.indexOf(profileComponent),
            1
          );
          break;
        }
      }
    }
  }
  packageSelectionChanged(e:MatCheckboxChange, pkg: ClientContractPackage) {
    /*    if(this.oldPackageSelected){
      console.log('old vlaue is ',this.oldPackageSelected.name);
      for(let i=0; i < this.packageComponentDataSource.data.length;i++){
        this.oldPackageSelected.clientContractPackageComponents = new Array<ClientContractPackageComponent>();
        if(this.packageComponentDataSource.data[i].selected){
          let clientContractPackageComponent = new ClientContractPackageComponent();
          clientContractPackageComponent.component = this.packageComponentDataSource.data[i].component; 
          clientContractPackageComponent.componentName = this.packageComponentDataSource.data[i].componentName; 
          clientContractPackageComponent.details = this.packageComponentDataSource.data[i].details; 
          clientContractPackageComponent.maxChecks = this.packageComponentDataSource.data[i].maxChecks; 
          this.oldPackageSelected.clientContractPackageComponents.push(clientContractPackageComponent);
        }
      }
    }else{
      console.log('old vlaue is ',null);
    } */
    this.packageDataSource.data.forEach((item) => {
      item.selected = false;
    });

    if (e.checked) {
      pkg.selected = true;
    } else {
      pkg.selected = false;
    }
    this.packageDataSource._updateChangeSubscription();
    if (pkg.selected) {
      let pkgComponents = pkg.clientContractPackageComponents;
      for (let item of this.packageComponentDataSource.data) {
        let found = false;
        for (let comp of pkgComponents) {
          if (item.component === comp.component) {
            item.selected = true;
            item.details = comp.details;
            item.maxChecks = comp.maxChecks;
            break;
          } else {
            item.selected = false;
            item.details = '';
            item.maxChecks = 0;
          }
        }
      }
    }
    this.oldPackageSelected = pkg;
  }
  profileSelectionChanged(e:MatCheckboxChange, prof: ClientContractProfile) {
    this.profileDataSource.data.forEach((item) => {
      item.selected = false;
    });

    if (e.checked) {
      prof.selected = true;
    } else {
      prof.selected = false;
    }
    this.profileDataSource._updateChangeSubscription();
    if (prof.selected) {
      let profComponents = prof.clientContractProfileComponents;
      for (let item of this.profileComponentDataSource.data) {
        let found = false;
        for (let comp of profComponents) {
          if (item.component === comp.component) {
            item.selected = true;
            item.details = comp.details;
            item.maxChecks = comp.maxChecks;
            break;
          } else {
            item.selected = false;
            item.details = '';
            item.maxChecks = 0;
          }
        }
      }
    }
  }
  backButtonClicked() {
    this.location.back();
  }
  showError(msg:string) {
    this.snackBar.open(msg, 'Error', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  showMessage(msg:string) {
    this.snackBar.open(msg, 'Info', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  numberOnly(event:KeyboardEvent): boolean {

    const charCode = event.key.charCodeAt(0);
    if (charCode && (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {};
  }
  downloadFile(file:File) {
    this.clientContractService.downloadFile(this._id, file).subscribe({
      next:(response: HttpResponse<Blob>) => {
        if (response.body) {
          const fileName = file.name || 'unknownFileName';
          FileSaver.saveAs(response.body, `${fileName}.pdf`);
        } else {
          console.error('Received null response body');
        }
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
  readFiles() {
    this.clientContractService.readFileNames(this._id).subscribe({
      next:(response) => {
        console.log('Response from filename reading is ', response);
        this.fileDownloadDataSource.data = response;
      },
      error:(error) => {
        console.log("error in readFiles",error);
        this.showError('Error reading Files');
      }
    })
  }
  uploadFile() {
    if (this._id != '') {
      this.clientContractService
        .uploadFile(
          this._id,
          this.fileUploadForm.get('clientContractFile')?.value.files[0],
          this.fileUploadForm.get('fileTitle')?.value
        ).subscribe({
          next:(response) => {
            this.showMessage('File Uploaded');
            // console.log('Uploaded file response ', response);
            this.fileDownloadDataSource.data.push(
              this.fileUploadForm.get('fileTitle')?.value
            );
            this.fileDownloadDataSource._updateChangeSubscription();
          },
          error:(error) => {
            console.log("error in uploadFile : ",error);
            
            this.showMessage('Error Uploading file');
          }
        })
        
    } else {
      this.showError('Please save the contract before saving the file');
    }

  }
}
