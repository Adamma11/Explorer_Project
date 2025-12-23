import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http'
import { VibeReportService } from '../service/vibe-report.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'src/app/administration/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSubclientAccessService } from 'src/app/service/user-subclient-access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-monthly-status',
  templateUrl: './monthly-status.component.html',
  styleUrls: ['./monthly-status.component.scss']
})
export class MonthlyStatusComponent {

  resourceLoaded:boolean=true
  startdate!:Date | null
  enddate!:Date | null
  reportType:string="PENDING"
  subclients: any;
  clients = new Array<Client>();
  caseUploadForm!: FormGroup;
  fileForm!: FormGroup;
  selectedClientId: any;
  constructor(
    private location:Location,
    private activatedRoute:ActivatedRoute,
    private vibeReportService:VibeReportService,
    private snackBar:MatSnackBar,
    private userService:UserService,
    private fb: FormBuilder,
    private userSubclientAccessService: UserSubclientAccessService,
  ) { }

  ngOnInit(): void {
    this.getAllClients();
    if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'INCEPTION-QC'){
      this.startdate = new Date()
      this.startdate.setDate(1)
      this.startdate.setHours(0)
      this.startdate.setMinutes(0)
      this.startdate.setSeconds(0)
      this.startdate.setMilliseconds(0)
      this.enddate = new Date()
      if(this.enddate.getMonth() == 1 || this.enddate.getMonth() ==3 || this.enddate.getMonth() == 5 || this.enddate.getMonth() ==7 || this.enddate.getMonth() ==8 || this.enddate.getMonth() == 10 || this.enddate.getMonth() == 12){
        this.enddate.setDate(31)
      }else if(this.enddate.getMonth() == 4 || this.enddate.getMonth() ==6 || this.enddate.getMonth() == 9 || this.enddate.getMonth() ==11){
        this.enddate.setDate(30)
      }else{
        this.enddate.setDate(28)
      }
      this.enddate.setMinutes(59)
      this.enddate.setHours(23)
      this.enddate.setSeconds(59)
      this.enddate.setMilliseconds(9999)
      this.reportType='INCEPTION-QC'
      this.generateReport()
    } else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'INCEPTION'){
      this.startdate = new Date()
      this.startdate.setDate(1)
      this.startdate.setHours(0)
      this.startdate.setMinutes(0)
      this.startdate.setSeconds(0)
      this.startdate.setMilliseconds(0)
      this.enddate = new Date()
      if(this.enddate.getMonth() == 1 || this.enddate.getMonth() ==3 || this.enddate.getMonth() == 5 || this.enddate.getMonth() ==7 || this.enddate.getMonth() ==8 || this.enddate.getMonth() == 10 || this.enddate.getMonth() == 12){
        this.enddate.setDate(31)
      }else if(this.enddate.getMonth() == 4 || this.enddate.getMonth() ==6 || this.enddate.getMonth() == 9 || this.enddate.getMonth() ==11){
        this.enddate.setDate(30)
      }else{
        this.enddate.setDate(28)
      }
      this.enddate.setMinutes(59)
      this.enddate.setHours(23)
      this.enddate.setSeconds(59)
      this.enddate.setMilliseconds(9999)
      this.reportType='INCEPTION'
      this.generateReport()
    }
    else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'VERIFICATION-COMPLETED'){
      this.startdate = new Date()
      this.startdate.setDate(1)
      this.startdate.setHours(0)
      this.startdate.setMinutes(0)
      this.startdate.setSeconds(0)
      this.startdate.setMilliseconds(0)
      this.enddate = new Date()
      if(this.enddate.getMonth() == 1 || this.enddate.getMonth() ==3 || this.enddate.getMonth() == 5 || this.enddate.getMonth() ==7 || this.enddate.getMonth() ==8 || this.enddate.getMonth() == 10 || this.enddate.getMonth() == 12){
        this.enddate.setDate(31)
      }else if(this.enddate.getMonth() == 4 || this.enddate.getMonth() ==6 || this.enddate.getMonth() == 9 || this.enddate.getMonth() ==11){
        this.enddate.setDate(30)
      }else{
        this.enddate.setDate(28)
      }
      this.enddate.setMinutes(59)
      this.enddate.setHours(23)
      this.enddate.setSeconds(59)
      this.enddate.setMilliseconds(9999)
      this.reportType='VERIFICATION-COMPLETED'
      this.generateReport()
    }
    else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'INTERIM-COMPLETED'){
      this.startdate = new Date()
      this.startdate.setDate(1)
      this.startdate.setHours(0)
      this.startdate.setMinutes(0)
      this.startdate.setSeconds(0)
      this.startdate.setMilliseconds(0)
      this.enddate = new Date()
      if(this.enddate.getMonth() == 1 || this.enddate.getMonth() ==3 || this.enddate.getMonth() == 5 || this.enddate.getMonth() ==7 || this.enddate.getMonth() ==8 || this.enddate.getMonth() == 10 || this.enddate.getMonth() == 12){
        this.enddate.setDate(31)
      }else if(this.enddate.getMonth() == 4 || this.enddate.getMonth() ==6 || this.enddate.getMonth() == 9 || this.enddate.getMonth() ==11){
        this.enddate.setDate(30)
      }else{
        this.enddate.setDate(28)
      }
      this.enddate.setMinutes(59)
      this.enddate.setHours(23)
      this.enddate.setSeconds(59)
      this.enddate.setMilliseconds(9999)
      this.reportType='INTERIM-COMPLETED'
      this.generateReport()
    }

    else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'FINAL-COMPLETED'){
      this.startdate = new Date()
      this.startdate.setDate(1)
      this.startdate.setHours(0)
      this.startdate.setMinutes(0)
      this.startdate.setSeconds(0)
      this.startdate.setMilliseconds(0)
      this.enddate = new Date()
      if(this.enddate.getMonth() == 1 || this.enddate.getMonth() ==3 || this.enddate.getMonth() == 5 || this.enddate.getMonth() ==7 || this.enddate.getMonth() ==8 || this.enddate.getMonth() == 10 || this.enddate.getMonth() == 12){
        this.enddate.setDate(31)
      }else if(this.enddate.getMonth() == 4 || this.enddate.getMonth() ==6 || this.enddate.getMonth() == 9 || this.enddate.getMonth() ==11){
        this.enddate.setDate(30)
      }else{
        this.enddate.setDate(28)
      }
      this.enddate.setMinutes(59)
      this.enddate.setHours(23)
      this.enddate.setSeconds(59)
      this.enddate.setMilliseconds(9999)
      this.reportType='FINAL-COMPLETED'
      this.generateReport()
    }

    else if(this.activatedRoute.snapshot.paramMap.get('reportType') == 'pending'){
      this.reportType='PENDING'
      this.generateReport()
    }
  }
  backButtonClicked(){
    this.location.back()
  }
  generateReport(){
    this.resourceLoaded = false;
    // Add clientId as a parameter for the report generation.
    const clientId = this.selectedClientId;
    

      this.resourceLoaded = false
      this.vibeReportService.generateStatusTracker(this.reportType,this.startdate,this.enddate,clientId).subscribe(
        (response:HttpResponse<Blob> | any)=>{
          //console.log(response);
          FileSaver.saveAs(response.body,`date_status_tracker.csv`);
          this.resourceLoaded = true
        },
        error=>{
          console.error("Error from Jasper server", error);
          this.showError("Error downloading date_status_tracker");
          // this.resourceLoaded = true;
          //console.log("Error from jasper server ",error);
        })

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
    const userId = localStorage.getItem('userId') || '';
    this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(userId).subscribe(
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
  showError(msg:any){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
}
