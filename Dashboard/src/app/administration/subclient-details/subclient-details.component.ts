import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SubclientNotification } from 'src/app/model/subclient-notification';
import { Subclient } from 'src/app/model/subclient';

import { BranchService } from 'src/app/service/branch.service';
import { EmailTemplateService } from 'src/app/service/email-template.service';
import { PinService } from 'src/app/service/pin.service';
import { ClientService } from 'src/app/service/client.service';
import { SubclientNotificationService } from '../service/subclient-notification.service';
import { SubclientService } from 'src/app/service/subclient.service';
import { UserService } from 'src/app/service/user.service';
import { Observable, map, startWith } from 'rxjs';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-subclient-details',
  templateUrl: './subclient-details.component.html',
  styleUrls: ['./subclient-details.component.scss']
})
export class SubclientDetailsComponent {
  @ViewChild(MatAutocompleteTrigger) _auto!: MatAutocompleteTrigger;
  filteredUserOptions!:Observable<User[]>|undefined;
  _id :string='';
  clientId:string='';
  showNotifications:boolean=true;
  nameForm!:FormGroup;
  contactDetailsForm!:FormGroup;
  
  notificationDisplayedColumns:string[] = ['serialNumber','triggerStatus','triggerColor','frequency','email','template','add','delete'] ; 
  notificationsDataSource:MatTableDataSource<SubclientNotification> = new MatTableDataSource<SubclientNotification>() 

  branches:any[]=[];
  users!:User[];
  emailTemplates:any[]=[]
  colorCodes:any[]=[]
  constructor(
    private location:Location,
    private activatedRoute:ActivatedRoute,
    private subclientService:SubclientService,
    private branchService:BranchService,
    private userService:UserService,
    private pinService:PinService,
    private emailTemplateService:EmailTemplateService,
    private clientService:ClientService,
    private subclientNotificationService:SubclientNotificationService,
    private snackbar:MatSnackBar,
    private fb:FormBuilder

  ) { 

    this.initializeNameForm();
    this.initializeContactDetailsForm();
  }

  initializeNameForm():void{
    this.nameForm = this.fb.group({
      name : ['',[Validators.required]],
      status : ['',[Validators.required]],
      branch : ['',[Validators.required]],
      cam : [null]
    })
  }

  initializeContactDetailsForm():void{
    this.contactDetailsForm = this.fb.group({
      contactPerson:[''],
      telephone:[''],
      email:[''],
      address:['',[Validators.required]],
      pinCode:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      country:['',[Validators.required]]
    })
  }
  
  ngOnInit(): void {
    this.getDetails()
  }
   getDetails(){
    this.clientId = this.activatedRoute.snapshot.paramMap.get('clientId')??'';
    this._id = this.activatedRoute.snapshot.paramMap.get('subclientId')??'';
    console.log("this.clientId",this.clientId,"this._id",this._id);
    
      this.readUsers();    
      this.readBranches();
      this.readEmailTemplates();
    
    if(this.clientId){
      this.readColorCodes();
    }

    if(this._id){
      this.readSubclientDetails(); 
      this.readSubclientNotifications();
    }
  }  
  readUsers(){
      this.userService.findAllUsers().subscribe({
        next:(response)=>{
          this.users = response;
          this.filteredUserOptions = this.nameForm.get('cam')?.valueChanges.pipe(
            startWith(''),
            map(value => {
            
              const name = typeof value === 'string' ? value : value.name;
              return name ? this._filter(name as string) : this.users;
            }),
          );
        },
        error:(error)=>{
          console.log(error);
          this.showError("Error reading branches");
        }
      })         
  }
  readBranches(){
    this.branchService.findAllBranches().subscribe({
      next:(response)=>{
        this.branches = response;
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error reading branches");
      } 
    })
  }
  readEmailTemplates(){
    this.emailTemplateService.findAll().subscribe({
      next:(response) =>{
        this.emailTemplates = response;
      },
      error:(error) => {
        console.log(error); 
        this.showError("Error reading email templates")
      }
    })
  }
  readColorCodes(){
    this.clientService.findAClient(this.clientId).subscribe({
      next: (response) => {
        console.log("response.colorCodes",response);
        
        this.colorCodes = response.colorCodes
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error reading color Codes")
      }
    })
  }
  readSubclientDetails(){
    this.subclientService.findOne(this._id).subscribe({
      next:(response)=>{
        this.nameForm.patchValue({
          name: response.name,
          branch: response.branch,
          cam: response.cam,
          status: response.status
        })
        this.contactDetailsForm.patchValue({
          contactPerson: response.contactPerson,
          telephone: response.telephone,
          email: response.email,
          address: response.address,
          pinCode: response.pinCode,
          city: response.city,
          state: response.state,
          country: response.country
        })
      },
      error:(error)=>{
        console.log(error);   
        this.showError("Error in reading subclient deatils");
      }
    })
  }
  readSubclientNotifications(){
    this.subclientNotificationService.findAllForASubclient(this._id).subscribe({
      next: (response) => {
        this.notificationsDataSource.data = response;
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error reading notifications")

      }
    })
  }


  backButtonClicked(){
    this.location.back();
  }
  
  saveButtonClicked() {
    let subclient: Subclient = {} as Subclient;
    subclient.client = this.clientId;
    subclient.name = this.nameForm.get('name')?.value;
    subclient.status = this.nameForm.get('status')?.value;
    subclient.branch = this.nameForm.get('branch')?.value;
    
    const camValue = this.nameForm.get('cam')?.value;
    subclient.cam = camValue ? camValue._id : null; // Ensure cam has _id

    subclient.contactPerson = this.contactDetailsForm.get('contactPerson')?.value;
    subclient.telephone = this.contactDetailsForm.get('telephone')?.value;
    subclient.email = this.contactDetailsForm.get('email')?.value;
    subclient.address = this.contactDetailsForm.get('address')?.value;
    subclient.pinCode = this.contactDetailsForm.get('pinCode')?.value;
    subclient.city = this.contactDetailsForm.get('city')?.value;
    subclient.state = this.contactDetailsForm.get('state')?.value;
    subclient.country = this.contactDetailsForm.get('country')?.value;

    console.log("notify:", subclient);

    if (!this._id) {
        this.createSubclient(subclient);
    } else {
        this.updateSubclient(subclient);
    }
}

  createSubclient(subclient:Subclient){
    this.subclientService.create(subclient).subscribe({
      next:(response)=>{
        if(this.notificationsDataSource.data.length > 0){
          this.createNotifications()

        }else{
          this.showMessage("Subclient Saved");
          this.location.back();
        }
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error saving Subclient");

      }
    }) 
  }

  createNotifications() {
    
    let notifications = this.notificationsDataSource.data.map(item => ({
      subclient: this._id,
      triggerStatus: item.triggerStatus,
      triggerColor: item.triggerColor,
      template: item.template,
      frequency: item.frequency,
      email: item.email
    }));

    this.subclientNotificationService.create({ subclientNotifications: notifications }).subscribe({
      next: (response) => {
        this.showMessage("Subclient Saved");
        this.location.back();
      },
      error: (error) => {
        console.log(error);
        this.showError('Error saving notifications');
      }
    });
  }

  deleteNotifications(){
    this.subclientNotificationService.delete(this._id).subscribe({
      next:(response)=>{
        console.log(response);
        this.createNotifications()
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error deleting notifications")
      }
    })  
  }

  updateSubclient(subclient:Subclient){
  
    
    this.subclientService.update(this._id,subclient).subscribe({
      next:(response)=>{
        this.deleteNotifications()
        this.showMessage("Subclient Saved");
      },
      error:(error)=>{
        console.log(error);
        this.showError("Error Saving Subclient");
      }
    })
  }
  showMessage(msg:string){
    this.snackbar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:string){
    this.snackbar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  validatePin(){
    const pincode=this.contactDetailsForm.get('pinCode')?.value;
    if(pincode){
      this.pinService.findOnePin(pincode).subscribe({
        next:(response)=>{
          if(response){
            this.contactDetailsForm.patchValue({
              city:response.district,
              state:response.state,
              country:response.country
            })
          }else{ 
            this.contactDetailsForm.patchValue({
              city:'',
              state:'',
              country:''
            })    
          }
        },
        error:(error)=>{
          console.log(error);
          this.contactDetailsForm.patchValue({
            city:'',
            state:'',
            country:''
          })    
          this.showError("Error in validate pin")
        }
      })
    }  
  }

  
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  addNotificationsButtonClicked(){
    let notification:SubclientNotification = {
      triggerStatus:"-1",
      frequency:"-1",
      template:"-1",
      email:"-1",
      triggerColor:"-1",
      subclient:"-1"
    }
    this.notificationsDataSource.data.push(notification)
    this.notificationsDataSource._updateChangeSubscription()
  }
  
}
