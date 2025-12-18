import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import { PinService } from 'src/app/service/pin.service';
import {Pin} from "../../model/pin";
import { ColorMasterData } from '../model/color-master';
import { ColorMasterService } from '../service/color-master.service';
import { Subclient } from '../../model/subclient';
import { SubclientService } from '../../service/subclient.service';
import {ClientService} from "../../service/client.service";
import {ClientContractService} from "../../service/client-contract.service";
import {Client} from "../../model/client";
import {ClientContract} from "../../model/client-contract";
import { ReportType } from '../model/report-type';
import {ClientHolidayService} from "../service/client-holiday.service";
import {ClientHoliday} from "../model/client-holiday";
import {ActivatedRoute, Router} from "@angular/router";
import { AnalysisTypeService } from 'src/app/service/analysis-type.service';
import { ClientAnalysisCodeService } from 'src/app/service/client-analysis-code.service';
import { AnalysisCodeService } from 'src/app/service/analysis-code.service';
import { ColorCodes } from "../../model/color-code";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {
  selectedTab:string ='CONTRACT';
  generalDetailsForm!:FormGroup;
  contactDetailsForm!:FormGroup;
  statutoryDetailsForm!:FormGroup;
  otherDetailsForm!:FormGroup;
  holidayYearForm!:FormGroup;
  colorDataSource:MatTableDataSource<ColorCodes> = new MatTableDataSource<ColorCodes>();
  subclientsDataSource:MatTableDataSource<Subclient> = new MatTableDataSource<Subclient>();
  holidayDataSource:MatTableDataSource<ClientHoliday> = new MatTableDataSource<ClientHoliday>();
  clientAnalysisCodeDataSource = new MatTableDataSource<any>()

  contractDataSource = new MatTableDataSource();
  reportTypeDataSource = new MatTableDataSource<ReportType>();

  colorDisplayedColumns:string[]=['serialNumber','color','status','add','delete'];
  reportTypeDisplayedColumns:string[]=['serialNumber','reportType','add','delete'];
  holidayDisplayedColumns:string[] = ['serialNumber','date','description','add','delete'];
  contractDisplayedColumns:string[] = ['serialNumber','agreementDate','effectiveDate','expiryDate','retentationDate','add','details','delete'];
  subclientDisplayedColumns:string[] = ['serialNumber','name','add','details','delete']
  clientAnalysisCodeDisplayedColumns:string[]=['serialNumber','analysisType','analysisCode'];

  hoveredRow: number | null = null;
  _id:string='';
  showAnalysis:boolean=false;
  colorcodes!:ColorMasterData[];


  constructor(private fb:FormBuilder,private pinService:PinService,private snackBar:MatSnackBar, private colorMasterService:ColorMasterService, private subclientService:SubclientService,private clientService:ClientService, 
    private clientContractService:ClientContractService, private clientHolidayService:ClientHolidayService, private datePipe:DatePipe, private router:Router, private activatedRoute:ActivatedRoute, private analysisTypeService:AnalysisTypeService, private clientAnalysisCodeService:ClientAnalysisCodeService, private analysisCodeService:AnalysisCodeService, private location:Location,


    ){
    this.initializeGeneralDetailsFormGroup();
    this.initializeContactDetailsFormGroup();
    this.initializeStatutoryDetailsForm();
    this.initializeOtherDetailsForm();
    this.initializeHolidaysForm();
  }
  ngOnInit(): void {
    this.readAllDataFromColorMaster();
    if(this.activatedRoute.snapshot.paramMap.get('_id')){
      this._id = this.activatedRoute.snapshot.paramMap.get('_id')??''
    // read the client with the given id and fill the form fields
      this.getClientDetails();    
  
    // read the client contract details and fill the table
      this.getClientContractDetails();          
    // read the subclient details
      this.getSubclientDetails();
  
      
    }else{
      this._id = '';
    }
    this.readAnalysisTypes()          
  }
  initializeGeneralDetailsFormGroup():void{
    this.generalDetailsForm = this.fb.group({
      name:['',[Validators.required]],
      status:['',[Validators.required]],
      clientCode:['']
    })
  }

  initializeContactDetailsFormGroup():void{
    this.contactDetailsForm = this.fb.group({
      contactPerson:[''],
      telephone:[''],
      email:['',[Validators.email]],
      address:['',[Validators.required]],
      pinCode:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      country:['',[Validators.required]]
    })
    
  }

  initializeStatutoryDetailsForm():void{
    this.statutoryDetailsForm = this.fb.group({
      cin: [''],
      gstIn: [''],
      pan: [''],
      pfNumber: [''],
      domainName: ['']    
    })
  }

  initializeOtherDetailsForm():void{
    this.otherDetailsForm = this.fb.group({
      priority:[''],
      archiveAfter:[''],  
      uploadTypes: [''],
      closureTypesAllowed: [''],
      closureModesAllowed: [''],
      tatCalculationMethod:['']
    })
  }

  initializeHolidaysForm():void{
    this.holidayYearForm = this.fb.group({
      holidayYear:['',[Validators.required]]
    })  
    
  }
  readAnalysisTypes() {
    this.analysisTypeService.readAll().subscribe({
      next: (response) => {
        response.forEach(async item => {
          let clientAnalysisCode = ({
            analysisType: item._id,
            analysisTypeName: item.name,
            analysisCode: await this.getAnalysisCodeForClientAndType(item._id),
            analysisCodes: await this.getAnalysisCodes(item._id)
          })
          this.clientAnalysisCodeDataSource.data.push(clientAnalysisCode)
          this.clientAnalysisCodeDataSource._updateChangeSubscription()
        })

      },
      error: (error) => {
        console.log("Error reading analysis types :",error);
        
        this.showError("Error Reading analysis types")
      }
    })

  }
  getAnalysisCodeForClientAndType(analysisType:any){
    return new Promise((resolve,reject)=>{
//      console.log("About to get analysis code for type ",analysisType ," and for client ",this.activatedRoute.snapshot.paramMap.get('_id'))
      this.clientAnalysisCodeService.readAllForAClientAndType(this.activatedRoute.snapshot.paramMap.get('_id'),analysisType).subscribe(
        response=>{
          if(response != null){
            resolve(response.analysisCode)
          }else{
            resolve(null)
          }
//          console.log("got analysis code response ",response)

        },
        error=>{
          resolve(null)
        }
      )
    })

  }
  getAnalysisCodes(analysisType:any){
    return new Promise((resolve,reject)=>{
      this.analysisCodeService.readAll(analysisType).subscribe(
        response=>{
          resolve(response)
        },
        error=>{
          resolve(null);
        }
      )
    })

  }
  readAllDataFromColorMaster():void{
    this.colorMasterService.readAll().subscribe({
      next:(response:ColorMasterData[])=>{

      this.colorcodes=response;
    } ,
    error:(error)=>{
      console.log(error);
      
      this.showError("Error Reading Color Master");
    }
    }) 
  }

  getSubclientDetails() {
    this.subclientService.findAllForAClient(this._id).subscribe({
      next: (response) => {
        this.subclientsDataSource.data = response;
      },
      error: (error) => {
        console.log(error);
        this.showError('Error reading subclients');
      }
    })
  }
  getClientDetails() {
    this.clientService.findAClient(this._id).subscribe({
      next: (response) => {
        this.setResponseToFields(response);
      },
      error: (error) => {
        this.showError("Error reading Client Details");
      }
    })
  }
  getClientContractDetails() {
    this.clientContractService.findAllForAClient(this._id).subscribe({
      next: (response) => {
        this.contractDataSource.data = response;
      },
      error: (error) => {
        console.log(error);
        this.showError("Error fetching Contracts");
      }
    })
  }
  setResponseToFields(response:Client){

    // set general details    
    this.generalDetailsForm?.get('name')?.setValue(response.name);
    this.generalDetailsForm?.get('status')?.setValue(response.status);
    this.generalDetailsForm?.get('clientCode')?.setValue(response.clientCode)

  
    // set contact details    
    this.contactDetailsForm?.get('contactPerson')?.setValue(response.contactPerson);
    this.contactDetailsForm?.get('telephone')?.setValue(response.telephone);
    this.contactDetailsForm?.get('email')?.setValue(response.email);
    this.contactDetailsForm?.get('address')?.setValue(response.address);
    this.contactDetailsForm?.get('pinCode')?.setValue(response.pinCode);
    this.contactDetailsForm?.get('city')?.setValue(response.city);
    this.contactDetailsForm?.get('state')?.setValue(response.state);
    this.contactDetailsForm?.get('country')?.setValue(response.country);
  
    // set statutory details
    this.statutoryDetailsForm?.get('cin')?.setValue(response.cin);
    this.statutoryDetailsForm?.get('gstIn')?.setValue(response.gstIn);    
    this.statutoryDetailsForm?.get('pan')?.setValue(response.pan);
    this.statutoryDetailsForm?.get('pfNumber')?.setValue(response.pfNumber);
    this.statutoryDetailsForm?.get('domainName')?.setValue(response.domainName);
  
    // set other details
    this.otherDetailsForm?.get('priority')?.setValue(response.priority);
    this.otherDetailsForm?.get('archiveAfter')?.setValue(response.archiveAfter);
    this.otherDetailsForm?.get('uploadTypes')?.setValue(response.uploadTypes);
    this.otherDetailsForm?.get('closureTypesAllowed')?.setValue(response.closureTypesAllowed);
    this.otherDetailsForm?.get('closureModesAllowed')?.setValue(response.closureModesAllowed);
    this.otherDetailsForm?.get('tatCalculationMethod')?.setValue(response.tatCalculationMethod);
    this.colorDataSource.data = response.colorCodes;
    this.reportTypeDataSource.data = response.reportTypes;
    this.colorDataSource._updateChangeSubscription();
    this.reportTypeDataSource._updateChangeSubscription();
   
  
  }
  validatePin(): void {
    const pinCodeControl = this.contactDetailsForm?.get('pinCode');
    if (pinCodeControl) {
      this.pinService.findOnePin(pinCodeControl.value).subscribe({
        next: (response: Pin) => {
          if (response) {
            this.contactDetailsForm?.get('city')?.setValue(response.district);
            this.contactDetailsForm?.get('state')?.setValue(response.state);
            this.contactDetailsForm?.get('country')?.setValue(response.country);
          } else {
            this.contactDetailsForm?.get('city')?.setValue('');
            this.contactDetailsForm?.get('state')?.setValue('');
            this.contactDetailsForm?.get('country')?.setValue('');
          }
        },
        error: (error) => {
          this.contactDetailsForm?.get('city')?.setValue('');
          this.contactDetailsForm?.get('state')?.setValue('');
          this.contactDetailsForm?.get('country')?.setValue('');
        }
      })

    }
  }

  yearChanged() {
    if (this.holidayYearForm?.get('holidayYear')?.value) {
      this.clientHolidayService.findAllHolidaysForAYear(this.holidayYearForm?.get('holidayYear')?.value).subscribe({
        next: (response) => {
          this.holidayDataSource.data = response;
          response.forEach(item => {
            item.date = this.datePipe.transform(item.date, 'yyyy-MM-dd') ?? '';

          })
          //console.log('after date formatting ',response);
          this.holidayDataSource.data = response;
          this.holidayDataSource._updateChangeSubscription();
        },
        error: (error) => {
          console.log(error);
          this.showError("Error fetching holidays for the selected year");
        }
      })
    }
  }

  addAHoliday(){
    let clientHoliday:ClientHoliday={
      client:this._id?this._id:'',
      date:'',
      description:''
    };
  
    this.holidayDataSource.data.push(clientHoliday);
    this.holidayDataSource._updateChangeSubscription();
    }
    deleteAHoliday(holiday:ClientHoliday){
    this.holidayDataSource.data.splice(this.holidayDataSource.data.indexOf(holiday),1);
    this.holidayDataSource._updateChangeSubscription();
  }

  addContractDetailsClicked(){
    this.router.navigate([`home/client-contract-details/client/${this._id}`]);
  }

  editContractButtonClicked(contract:ClientContract){
    this.router.navigate([`home/client-contract-details/contract/${contract._id}`]); 
  }  
  createClient(client: Client) {
    this.clientService.createClient(client).subscribe({
      next: (response) => {
        this._id = response._id;
        this.saveClientHolidays();
        this.saveClientAnalysisCodes()
        this.showMessage("Client Saved");
        
      },
      error: (error) => {
        console.log(error);
        this.showError("Error Creating Client");
      }
    })
  }
  updateClient(client: Client) {
    this.clientService.updateClient(this._id, client).subscribe({
      next: (response) => {
        this.deleteClientHolidays();
        this.saveClientAnalysisCodes()
        this.showMessage("Client Saved");
      },
      error: (error) => {
        this.showError("Error saving Client");

      }
    })
  }
  saveClientHolidays(){
    this.holidayDataSource.data.forEach(item=>{
      item.client = this._id;
    })
    let postData = {
      "clientHolidays":this.holidayDataSource.data
    }
    this.clientHolidayService.createClientHolidays(postData).subscribe({
      next:(response)=>{
        this.showMessage("Client Saved");
      },
      error :error=>{
        console.log('error saving client holidays ',error);
        this.showError("Error saving the client holidays");
      }
    })
  }
  saveClientAnalysisCodes(){
    this.clientAnalysisCodeService.deleteAllForClient(this._id).subscribe(
      response=>{
        this.clientAnalysisCodeDataSource.data.forEach(item=>{
          let clientAnalysisCodeData = ({
            client:this._id,
            analysisType:item.analysisType,
            analysisCode:item.analysisCode
          })
          this.clientAnalysisCodeService.create(clientAnalysisCodeData).subscribe({
            next:(response)=>{
               this.showMessage("Client analysis code created");
            },
            error:error=>{
              this.showError("Error saving analysis code")
            }
          })
            
        })
        this.showMessage("Analsysi Codes Saved")
      },
      error=>{
        this.showError("Error deleting analysis codes")
      }
    )
  }
  deleteClientHolidays(){
    const holidayYear=this.holidayYearForm.get('holidayYear')?.value
    if(holidayYear){
      this.clientHolidayService.deleteClientHolidays(holidayYear).subscribe({
        next:(response)=>{
          this.saveClientHolidays();
        },
        error:(error)=>{
          console.log(error);
          this.showError("Error deleting current holidays for the client");
        }
      })
    }
  }
  saveButtonClicked() {
    if (this.validateForm()) {
      let client: Client = {} as Client;

      client.name = this.generalDetailsForm.get('name')?.value;
      client.clientCode = this.generalDetailsForm.get('clientCode')?.value,
      client.status = this.generalDetailsForm.get('status')?.value;
      client.contactPerson = this.contactDetailsForm.get('contactPerson')?.value;
      client.telephone = this.contactDetailsForm.get('telephone')?.value;
      client.email = this.contactDetailsForm.get('email')?.value;
      client.address = this.contactDetailsForm.get('address')?.value;
      client.pinCode = this.contactDetailsForm.get('pinCode')?.value;
      client.city = this.contactDetailsForm.get('city')?.value;
      client.state = this.contactDetailsForm.get('state')?.value;
      client.country = this.contactDetailsForm.get('country')?.value;
      client.cin = this.statutoryDetailsForm.get('cin')?.value;
      client.gstIn = this.statutoryDetailsForm.get('gstIn')?.value;
      client.pan = this.statutoryDetailsForm.get('pan')?.value;
      client.pfNumber = this.statutoryDetailsForm.get('pfNumber')?.value;
      client.domainName = this.statutoryDetailsForm.get('domainName')?.value;
      client.priority = this.otherDetailsForm.get('priority')?.value;
      client.archiveAfter = this.otherDetailsForm.get('archiveAfter')?.value;
      client.colorCodes = this.colorDataSource.data;
      client.reportTypes = this.reportTypeDataSource.data;
      client.uploadTypes = this.otherDetailsForm.get('uploadTypes')?.value;
      client.closureTypesAllowed = this.otherDetailsForm.get('closureTypesAllowed')?.value;
      client.closureModesAllowed = this.otherDetailsForm.get('closureModesAllowed')?.value;
      client.tatCalculationMethod = this.otherDetailsForm.get('tatCalculationMethod')?.value;
      if (this._id === '') {
        this.createClient(client);
      } else {
        this.updateClient(client);
      }
    }

  }
  validateForm(){
    let valid = true;
    for(let item of this.colorDataSource.data){
      if(item.status.length ===0){
        valid = false;
        this.showError('Status for the color code cannot be blank');
        break;
      }
    }
    for(let item of this.reportTypeDataSource.data){
      if(item.type.length === 0){
        valid = false;
        this.showError('Report Type cannot be blank');
        break;
      }
    }
    for(let item of this.holidayDataSource.data){
      if(item.date === null){
        valid = false;
        this.showError('Holiday Date cannot be blank');
        break;
      }
      if(item.description.length ===0){
        valid = false;
        this.showError('Holiday description cannot be blank');
        break;
      }
    }
    return valid;
  }
  isHovered(index: number): boolean {
    return this.hoveredRow === index;
  }
  
  highlightRow(index: number): void {
    this.hoveredRow = index;
  }
  
  unhighlightRow(index: number): void {
    this.hoveredRow = null;
  }

  addColorStatus(){
    let colorCode:ColorCodes = {} as ColorCodes;
    colorCode.color = "#ffffff"
    this.colorDataSource.data.push(colorCode);    
    this.colorDataSource._updateChangeSubscription();   
    this.showMessage("Fill color details & click submit button to save changes");
 
  }


  addReportType(){
    let reportType:ReportType = ({
      type:""
    });
    this.reportTypeDataSource.data.push(reportType);    
    this.reportTypeDataSource._updateChangeSubscription();    
  }  

  deleteContract(contract:ClientContract){
    this.clientContractService.deleteContract(contract._id).subscribe({
      next: (response) => {
        this.showMessage("Client Contract deleted successfully");
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error fetching Contracts");
      }
    })
    }
  deleteColorCode(element:ColorCodes){
    this.colorDataSource.data.splice(this.colorDataSource.data.indexOf(element),1);
    this.colorDataSource._updateChangeSubscription();
    this.showMessage("Click submit button to save changes");
  }
  addSubclientButtonClicked(){
  this.router.navigate([`home/subclient-details/client/${this._id}`]);
  }
  editSubclientButtonClicked(subclient:Subclient){
    this.router.navigate([`home/subclient-details/client/${subclient.client}/subclient/${subclient._id}`]);
  }
showMessage(msg:string):void{
  this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
showError(msg:string):void{
  this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
}
backButtonClicked(){
  this.location.back();
}

}
