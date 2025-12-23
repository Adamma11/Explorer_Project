import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientContractComponentService } from 'src/app/administration/service/client-contract-component.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractProfileService } from 'src/app/administration/service/client-contract-profile.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';



interface ClientContractPackage {
  _id: string;
  client: string;
  clientContract: string;
  name: string;
  tat: number;
  price: number;
  selected: boolean;
  clientContractPackageComponents: ClientContractPackageComponent[];
  modifiedBy: string;
}

interface ClientContractProfileComponent {
  _id: string;
  client: string;
  contract: string;
  profile: string;
  component: string;
  componentName: string;
  displayName: string;
  selected: boolean;
  details: string;
  maxChecks: number;
  modifiedBy: string;
}

class CaseComponent {
  component!: string;
  componentName!: string;
  componentDisplayName!: string;
  instructions!: string;
  tat!: number;
  price!: number;
  maxChecks!: number;
  selected!: boolean;
}

interface ClientContractPackageComponent {
  _id: string;
  client: string;
  contract: string;
  package: string;
  component: string;
  componentName: string;
  displayName: string;
  details: string;
  maxChecks: number;
  selected: boolean;
  modifiedBy: string;
}

interface ClientContractProfile {
  _id: string;
  client: string;
  clientContract: string;
  name: string;
  tat: number;
  selected: boolean;
  clientContractProfileComponents: ClientContractProfileComponent[];
  modifiedBy: string;
}

class Client {
  _id!: string;
  name!: string;
  clientCode!: string;
  status!: string;
  contactPerson!: string;
  telephone!: string;
  email!: string;
  address!: string;
  pinCode!: string;
  city!: string;
  state!: string;
  country!: string;
  cin!: string;
  gstIn!: string;
  pan!: string;
  pfNumber!: string;
  domainName!: string;
  colorCodes!: any[];
  reportTypes!: any[];
  priority!: number;
  archiveAfter!: number;
  uploadTypes!: string[];
  closureTypesAllowed!: string[];
  closureModesAllowed!: string[];
  tatCalculationMethod!: string;
  modifiedBy!: string;

// Used only on client side
  subclients!: any[];
}

class Subclient {
  _id!: string;
  client!: string;
  clientName!: string;
  name!: string;
  status!: string;
  branch!: string;
  cam!: string;
  contactPerson!: string;
  telephone!: string;
  email!: string;
  address!: string;
  pinCode!: string;
  city!: string;
  state!: string;
  country!: string;
  modifiedBy!:string;    
  selected!: boolean;
}

class Case {
  _id!: string;
  caseId!: string;
  candidateName!: string;
  employeeId!: string;
  batch!: string;
  client!: string;
  subclient!: string;
  package!: string;
  profile!: string;
  casePriority!:any;
  uploadDate!: string;
  initiationDate!: string;
  tatEndDate!: string;
  dataEntryCompletionDate!: string;
  inputqcCompletionDate!: string;
  outputqcCompletionDate!: string;
  reportDate!: string;
  caseStopDate!: string;
  reinitiationDate!: string;
  firstInsufficiencyRaisedDate!: string;
  lastInsufficiencyClearedDate!: string;
  status!: string;
  componentsToCheck!: any[];
  tat!: number;
  grade!: string;
  modifiedBy!: string;    
}


@Component({
  selector: 'app-case-upload',
  templateUrl: './case-upload.component.html',
  styleUrls: ['./case-upload.component.scss']
})
export class CaseUploadComponent {


  showFooter: boolean = false;
  resourceLoaded: boolean = true
  caseId!: string;
  relevantContractId!: string; 
  packageComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
  packageComponentsDataSource = new MatTableDataSource<ClientContractPackageComponent>();

  profileComponentsDisplayedColumns = ['serialNumber', 'component', 'details'];
  profileComponentsDataSource = new MatTableDataSource<ClientContractProfileComponent>();

  componentsDisplayedColumns = ['serialNumber', 'component', 'tat', 'details', 'maxChecks', 'select'];
  componentsDataSource = new MatTableDataSource<CaseComponent>();

  packages!: ClientContractPackage[];
  profiles!: ClientContractProfile[];
  clients = new Array<Client>();
  subclients: any;
  caseUploadForm!: FormGroup;
  fileForm!: FormGroup;

  @ViewChild(MatTable)
  table!: MatTable<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userSubclientAccessService: UserSubclientAccessService,
    private activatedRoute: ActivatedRoute,
    private clientContractPackageService: ClientContractPackageService,
    private clientContractProfileService: ClientContractProfileService,
    private clientContractService: ClientContractService,
    private clientContractComponentService: ClientContractComponentService,
    private caseUploadService:CaseUploadService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,

  ) {
    this.componentsDataSource.paginator = this.paginator;
    this.componentsDataSource.sort = this.sort;
   }

  ngOnInit() {
    this.getAllClients()
    this.initializeForm()
    
  }

  // ngAfterViewInit(): void {
  //   this.componentsDataSource.paginator = this.paginator;
  //   this.componentsDataSource.sort = this.sort;
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.componentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.componentsDataSource.paginator) {
      this.componentsDataSource.paginator.firstPage();
    }
  }

  private initializeForm() {
    this.caseUploadForm = this.fb.group({
      clientId: ['', [Validators.required]],
      subclientId: ['', [Validators.required]],
      candidateName: ['', [Validators.required]],
      employeeId: [''],
      packageProfileAlacarte: ['', [Validators.required]],
      package: [''],
      profile: [''],
      tat: [''],
      rate: [''],
    })

    this.fileForm = this.fb.group({
      caseZipFile: ['', [Validators.required]]
    })
  }

  getAllClients(){
    this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(localStorage.getItem('userId')).subscribe(
      response=>{
        for(let subclientOfResponse of response){
          //console.log('client id being checked is ',subclientOfResponse.client);
          if(!this.foundInClients(subclientOfResponse.client._id)){
            let client = new Client();
            client._id = subclientOfResponse.client._id;
            client.name = subclientOfResponse.client.name;
            if(subclientOfResponse.client.status=='ACTIVE'){
              this.clients.push(client);
            }
          }
          this.addToClient(subclientOfResponse.client._id,subclientOfResponse.subclient._id,subclientOfResponse.subclient.name);
        }
        for(let client of this.clients){
          if(client._id == this.caseUploadForm.get('clientId')!.value){
            this.subclients = client.subclients;
            break;
          }
        }

      },
      error=>{
        console.log(error);
      }
    )    
  }
  getRelevantClientContracts(){
    this.clientContractService.findAllForAClient(this.caseUploadForm.get('clientId')!.value).subscribe(
      response=>{
        let currentDate = new Date();
        for(let item of response){
          if(currentDate > new Date(item.effectiveDate) && currentDate < new Date(Date.parse(item.expiryDate))){
            this.relevantContractId = item._id;
            break;
          }
        }
        this.readAllComponentsForThisContract();        
        this.getPackages();
        this.getProfiles();

//        this.getCaseDetails();
      },
      error=>{
        console.log("Error reading contract details : "+error.error.message);
      }
    )    
  }

  getProfiles(){
    this.clientContractProfileService.findAllForAClientContract(this.relevantContractId).subscribe(
      response=>{
        this.profiles = response;
      },
      error=>{
       console.log("Error Reading Packages " + error.error.message);
      }
    )
  }  
  getPackages(){
    this.clientContractPackageService.findAllForAClientContract(this.relevantContractId).subscribe(
      response=>{
        this.packages = response;
      },
      error=>{
        console.log("Error Reading Packages " + error.error.message);
      }
    )
  }
  foundInClients(clientId:string){
    //console.log('in found  in clients');
    for(let client of this.clients){
      //console.log('client id is ',client._id);
      if(client._id === clientId){
        //console.log('both are equal and hence returning true');
        return true;
      }
    }
    //console.log('not equal and hence returning false');
    return false;
  }
  addToClient(clientId:string,subclientId:string,subclientName:string){
    for(let client of this.clients){
      if(client._id === clientId){
        if(client.subclients==null){
          client.subclients = new Array<Subclient>();
        }
        let  subclient = new Subclient();
        subclient._id = subclientId;
        subclient.name = subclientName;
        client.subclients.push(subclient);
      }
    }
  }
  packageProfileAlacarteChanged(event:any){
    if(this.caseUploadForm.get('packageProfileAlacarte')!.value=='A-LA-CARTE'){
      this.caseUploadForm.get('profile')!.clearValidators();
      this.caseUploadForm.get('package')!.clearValidators();
      this.caseUploadForm.get('package')!.updateValueAndValidity();
      this.caseUploadForm.get('profile')!.updateValueAndValidity();
//      this.componentsDataSource.data.splice(0,this.componentsDataSource.data.length);
    }else if(this.caseUploadForm.get('packageProfileAlacarte')!.value=='PACKAGE'){
      this.caseUploadForm.get('package')!.setValidators([Validators.required]);
      this.caseUploadForm.get('profile')!.clearValidators();
      this.caseUploadForm.get('profile')!.updateValueAndValidity();
    }else if(this.caseUploadForm.get('packageProfileAlacarte')!.value=='PROFILE'){
      this.caseUploadForm.get('profile')!.setValidators([Validators.required]);
      this.caseUploadForm.get('package')!.clearValidators();
      this.caseUploadForm.get('package')!.updateValueAndValidity();
    }

  }
  readAllComponentsForThisContract(){
    //console.log("all components for this contract read");
    this.clientContractComponentService.findAllForAClientContract(this.relevantContractId).subscribe(
      response=>{
        for(let responseItem of response){
          console.log("responseItem.component",responseItem.component);
          
          let caseComponent = new CaseComponent();
          caseComponent.component = responseItem.component._id;
          caseComponent.componentName = responseItem.component.name;
          caseComponent.componentDisplayName = responseItem.component.displayName;
          //console.log(responseItem.component.displayName, ' ',responseItem.component._id);
//          caseComponent.price = responseItem.price;
          caseComponent.tat =responseItem.tat;
          this.componentsDataSource.data.push(caseComponent);
        }         
        this.componentsDataSource._updateChangeSubscription();
        this.sortComponents();
      }
    )    
  }
  sortComponents(){
    //console.log('Sorting Components');
    for(let j=0; j < this.componentsDataSource.data.length;j++){
      for(let i=0; i < this.componentsDataSource.data.length-1;i++){
        let comp1 = this.componentsDataSource.data[i];
        let comp2 = this.componentsDataSource.data[i+1];
        let altComp :any;
        if(comp1.componentDisplayName > comp2.componentDisplayName){
          altComp = comp1;
          this.componentsDataSource.data[i] = this.componentsDataSource.data[i+1];
          this.componentsDataSource.data[i+1] = altComp;
          this.componentsDataSource._updateChangeSubscription();              
        }

      }
    }

  }
  profileChanged(event:any){
    this.showProfileComponents();
  }
  showProfileComponents(){
    for(let profile of this.profiles){
      if(this.caseUploadForm.get('profile')!.value === profile._id){
        this.profileComponentsDataSource.data =profile.clientContractProfileComponents;
        this.caseUploadForm.get('tat')!.setValue(profile.tat);
        break;
      }
    }
    this.profileComponentsDataSource._updateChangeSubscription();    
  }
  packageChanged(event:any){
    this.showPackageComponents();
    
  }
  showPackageComponents(){
    for(let apackage of this.packages){
      if(this.caseUploadForm.get('package')!.value === apackage._id){
        this.packageComponentsDataSource.data =apackage.clientContractPackageComponents;
        this.caseUploadForm.get('tat')!.setValue(apackage.tat);
//        this.caseUploadForm.get('rate').setValue(apackage.rate);
        break;
      }
    }
    this.packageComponentsDataSource._updateChangeSubscription();    
  }

  uploadButtonClicked(){
    const ConfirmDialog = new MatDialogConfig();
    ConfirmDialog.disableClose = true;
    ConfirmDialog.autoFocus= true;
    ConfirmDialog.height = '200px'
    ConfirmDialog.width = '330px'
    const dialogRef = this.dialog.open(ConfirmDialogComponent,ConfirmDialog);
    dialogRef.afterClosed().subscribe(
      result=>{
     if(result.event=='confirmed'){
       this.onFormSubmit();
     } 
   })
 }
  onFormSubmit(){
    
    let formValid = false;
    let aCase = new Case();
    aCase.candidateName= this.caseUploadForm.get('candidateName')!.value;
    aCase.employeeId=this.caseUploadForm.get('employeeId')!.value;
    aCase.client =this.caseUploadForm.get('clientId')!.value;
    aCase.subclient = this.caseUploadForm.get('subclientId')!.value;
    if(this.caseUploadForm.get('packageProfileAlacarte')!.value =='PACKAGE'){
      //console.log('package value being set ',this.caseUploadForm.get('package').value);
      aCase.package = this.caseUploadForm.get('package')!.value;
      aCase.tat= this.caseUploadForm.get('tat')!.value;
      formValid = true;
    }
    if(formValid==false){
      if(this.caseUploadForm.get('packageProfileAlacarte')!.value === 'PROFILE'){
        //console.log('profile value being set ',this.caseUploadForm.get('profile').value);
        aCase.profile = this.caseUploadForm.get('profile')!.value;
        aCase.tat = this.caseUploadForm.get('tat')!.value;
        formValid=true;
      }    
    }
    if(formValid==false){
      if(this.caseUploadForm.get('packageProfileAlacarte')!.value =='A-LA-CARTE'){
        let caseComponentsArray = new Array<CaseComponent>();
        aCase.tat=0;
        for(let  item of this.componentsDataSource.data){
          if(item.selected){
            formValid=true;
            if(item.tat > aCase.tat){
              aCase.tat = item.tat;
            }
            caseComponentsArray.push(item);
          }
        }
        aCase.componentsToCheck = caseComponentsArray;
      }
    }
    
    if(formValid==true){
      
      this.resourceLoaded = false
     aCase.status="INITIATED";
    //  const files: FileList = this.fileForm.get('caseZipFile')!.value    
      // console.log("Employee Id being uploaded is ",aCase.employeeId)
      this.caseUploadService.uploadCase(aCase,this.fileForm.get('caseZipFile')?.value.files).subscribe(
        response=>{
          console.log(`Case ${response.caseId} uploaded`);
          this.showMessage(`Case ${response.caseId} uploaded`);
          // this.router.navigate(["home/upload/caseupload"])
          // this.resourceLoaded=true
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.router.navigate([`home/upload/caseupload`]);
          })        
        },

        error=>{
          console.log('error on file upload',error);
          this.showError('error on file upload');

        }
      )
    }else{
      console.log("Please fill all necessary fields");
    }        

  }

  clientSelectionChanged(event:any){
    this.getRelevantClientContracts();
    this.showSubclientsForClient();

  }  
  showSubclientsForClient(){
    for(let client of this.clients){
      if(client._id == this.caseUploadForm.get('clientId')!.value){
        this.subclients = client.subclients;
        break;
      }
    }
  }  
  initializeFields(){
    this.caseUploadForm.get('clientId')!.setValue(null);
    this.caseUploadForm.get('subclientId')!.setValue(null);
    this.caseUploadForm.get('candidateName')!.setValue(null);
    this.caseUploadForm.get('packageProfileAlacarte')!.setValue(null);
    this.caseUploadForm.get('profile')!.setValue(null);
    this.caseUploadForm.get('package')!.setValue(null);
    this.caseUploadForm.get('tat')!.setValue(null);
    this.caseUploadForm.get('rate')!.setValue(null);
    this.componentsDataSource.data.splice(0,this.componentsDataSource.data.length);
    this.packageComponentsDataSource.data.splice(0,this.packageComponentsDataSource.data.length)
    this.profileComponentsDataSource.data.splice(0,this.profileComponentsDataSource.data.length)
//    this.caseUploadForm.markAsPristine;
  }

  showDetails(row:any){
    console.log(row);
    
  }
  showError(msg:any) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showMessage(msg:any) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

}
