import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { UserRole } from 'src/app/model/user-role';
import { User } from 'src/app/model/user';
import { Branch } from 'src/app/model/branch';
import { UserSubclient } from 'src/app/model/user-subclient';
import { Vendor } from 'src/app/model/vendor';
import { UserVendorAccess } from 'src/app/model/user-vendor-access';

import { UserService } from 'src/app/service/user.service';
import { UserRoleService } from 'src/app/service/user-role.service';
import { RoleService } from 'src/app/service/role.service';
import { BranchService } from 'src/app/service/branch.service';
import { SubclientService } from 'src/app/service/subclient.service';
import { UserSubclientAccessService } from 'src/app/service/user-subclient-access.service';
import { VendorService } from 'src/app/service/vendor.service';
import { UserVendorAccessService } from 'src/app/service/user-vendor-access.service';
import { UserBranchAccessService } from '../service/user-branch-access.service';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { map } from 'rxjs';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  fileUploadForm!:FormGroup;
  userForm!:FormGroup;
  
  _id:string='';
  idDisabled :boolean = false;
  showUserClients:boolean=false;
  roleDisplayedColumns =['serialNumber','name','select'];
  subclientDisplayedColumns = ['serialNumber','clientName','subclientName','select'];
  includePinDisplayedColumns = ['serialNumber','from','to','add','delete'];
  excludePinDisplayedColumns = ['serialNumber','from','to','add','delete'];
  vendorDisplayedColumns = ['serialNumber','vendor','select'];
  branchDisplayedColumns =['serialNumber','name','select'];
  signatureDisplayedColumns = ['signatureFile','delete']
  
  includedPinDataSource = new MatTableDataSource();
  excludedPinDataSource = new MatTableDataSource();
  userRoleDataSource = new MatTableDataSource<UserRole>();
  subclientDataSource = new MatTableDataSource<any>();
  vendorDataSource = new MatTableDataSource<Vendor>();
  userBranchAccessDataSource:MatTableDataSource<Branch> = new MatTableDataSource<Branch>();
  signatureFileDatasource = new MatTableDataSource<any>();
  branches! : Branch[];
  users!:User[];

  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private userRoleService:UserRoleService,
    private roleService:RoleService,
    private branchService:BranchService,
    private subclientService:SubclientService,
    private userSubclientAccessService:UserSubclientAccessService,
    private userBranchAccessService:UserBranchAccessService,
    private vendorService:VendorService,
    private userVendorAccessService:UserVendorAccessService,
    private snackBar:MatSnackBar,
    private location:Location,
    private fb:FormBuilder
    ) {
      this.initializeFileUploadForm();
      this.initializeUserForm();
     }
    private initializeFileUploadForm():void{
      this.fileUploadForm = this.fb.group({
        signatureFile:['',[Validators.required]]
      })
    }
  
    private initializeUserForm():void{
     this.userForm = this.fb.group({
      userId: ['',[Validators.required,Validators.email]],
      name: ['',[Validators.required]],
      type: ['',[Validators.required]],
      status: ['',[Validators.required]],
      branch: [''],
      reportingManager:['']
    })
    }
    
  ngOnInit(): void {
    this._id= this.activatedRoute.snapshot.paramMap.get('_id') ?? '';

    if (this._id) {
      this.idDisabled = true;
      this.userService.findOneUser(this._id).subscribe({
        next: (response) => {
          this.userForm.setValue({
            userId: response.userId,
            name: response.name,
            type: response.type,
            status: response.status,
            // branch: response.branch,
            // reportingManager: response.reportingManager,
             branch: response?.branch || '',
            reportingManager: response?.reportingManager || '',
          });
  
          this.includedPinDataSource.data = response.includedPinRanges;
          this.excludedPinDataSource.data = response.excludedPinRanges;
  
          if(response.signatureFile){
            this.signatureFileDatasource.data.push(response.signatureFile);
          }
          this.signatureFileDatasource._updateChangeSubscription();
  
          this.getUserRoles();
          this.getUserVendorAccess();
        },
        error: (error) => {
          console.log(error);
          this.showError("Error fetching user data");
        },
      });
    }
    this.roleService.findAllRoles().pipe(
      map(response => response.map(item => ({
        _id: '',
        user: '',
        role: item._id,
        userId: '',
        userName: '',
        roleName: item.name,
        selected: false,
        modifiedBy: ''
      })))
    ).subscribe({
      next: (transformedResponse) => {
        this.userRoleDataSource.data.push(...transformedResponse);
        this.userRoleDataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
        this.showError("Error in fetching roles");
      }
    });

    this.branchService.findAllBranches().subscribe({
      next: (response: Branch[]) => {
        this.userBranchAccessDataSource.data = response.map(item => ({
          _id: item._id ?? '',
          name: item.name,
          selected: false
        }));
    
        this.userBranchAccessDataSource._updateChangeSubscription();
        this.fillSubclients();
      },
      error: (error) => {
        console.log(error);
        this.showError('Error reading branches');
      }
    }); 
     this.branchService.findAllBranches().subscribe({
      next: (response) => {
        this.branches= response;
      },
      error: (error) => {
        this.showError("Error reading branches");
      }
     }) 
     this.userService.findAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        this.showError("Error reading users for reporting managers");
      }
     })
    
    this.vendorService.findAllVendors().subscribe({
      next: (response) => {
        this.vendorDataSource.data = response;
      },
      error: (error) => {
        this.showError("Error retrieving Vendors");
      }
    })      
  }
   fillSubclients(){
    this.fillBranchAccess()
    this.getBranchAccessData()
    this.subclientService.findAllForBranches().pipe(
      map(response => {
        return response.map(item => ({
          _id: item._id,
          name: item.name,
          client: item.client._id,
          clientName: item.client.name,
          selected: false
        }));
      })
    ).subscribe({
      next:(transformedData) => {
        this.subclientDataSource.data = transformedData;
        this.subclientDataSource._updateChangeSubscription();
        this.getUserSubclientAccess();
      },
      error:(error) => {
        console.log("Error reading subclients for branches ", error);
        this.showError("Error reading subclients for branches");
      }
    });


  }
   fillBranchAccess(): void {
      this.userBranchAccessService.findAllForAUser(this._id).subscribe({
        next:(response) => {
          this.userBranchAccessDataSource.data.forEach(itemFromDataSource => {
            const matchingBranch =response.some(item => item.branch?.toString() === itemFromDataSource._id?.toString())
             if (matchingBranch) {
              itemFromDataSource.selected = true;
            }
          }

          )
          this.userBranchAccessDataSource._updateChangeSubscription();
        },
        error:(error) => {
          console.error('Error reading user branch access', error);
          this.showError('Error reading user branch access');
        }
    });
  }
   getBranchAccessData(): void {
      let branchesString = '';
  
      for (const item of this.userBranchAccessDataSource.data) {
        if (item.selected) {
          branchesString += (branchesString ? ',' : '') + item._id;
        }
      }
  }
  getUserVendorAccess() {
    this.userVendorAccessService.findAllVendorsForAUser(this._id).subscribe({
      next: (response) => {
        this.vendorDataSource.data.forEach(dataSourceItem => {
          const matchingVendor = response.some( item => item.vendor?.toString() === dataSourceItem._id?.toString())
             if (matchingVendor) {
              dataSourceItem.selected = true;
          }
        })
  
        this.vendorDataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.error(error);
        this.showError("Error reading Vendors for a User");
      },
    });
  }

  getUserSubclientAccess() {
    this.userSubclientAccessService.findAllSubclientsForAUser(this._id).subscribe({
      next: (response) => {
        this.subclientDataSource.data.forEach(dataSourceItem => {
          const matchingSubclient = response.some(item => item.subclient._id.toString() === dataSourceItem._id.toString());
             if (matchingSubclient) {
              dataSourceItem.selected = true;
          }
        })
     
        this.subclientDataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.error(error);
        this.showError("Error reading User Subclient Access data");
      }
    });
  }
  getUserRoles(): void {
    this.userRoleService.findAllRolesForAUser(this._id).subscribe({
      next: (response) => {
        this.userRoleDataSource.data.forEach(userRoleOfDataSource => {
          const matchingUserRole = response.some(item => item.role === userRoleOfDataSource.role);
  
          if (matchingUserRole) {
            userRoleOfDataSource.selected = true;
          }
        });
  
        this.userRoleDataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.error(error);
        this.showError("Error reading user roles");
      },
    });
  }
  
  includeAddClicked(){
    this.includedPinDataSource.data.push({});
    this.includedPinDataSource._updateChangeSubscription();
  }
  excludeAddClicked(){
    this.excludedPinDataSource.data.push({});
    this.excludedPinDataSource._updateChangeSubscription();
  }
  deleteIncludePinRange(index:any){
    this.includedPinDataSource.data.splice(this.includedPinDataSource.data.indexOf(index,1));
    this.includedPinDataSource._updateChangeSubscription();
  }
  deleteExcludePinRange(index:any){
    this.excludedPinDataSource.data.splice(this.excludedPinDataSource.data.indexOf(index,1));
    this.excludedPinDataSource._updateChangeSubscription();
  }

  async saveButtonClicked(){
    await this.saveUser();
    await this.deleteUserRoles();
    await this.createUserRoles();
    await this.createUserBranchAccess();
    await this.createUserSubclientAccess();
    await this.createUserVendorAccess();
    this.showSuccessMessage("User Created Successfully");    
  }
 async saveUser(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const user: User = {} as User;
      user.userId = this.userForm.get('userId')?.value;
      user.name = this.userForm.get('name')?.value;
      user.type = this.userForm.get('type')?.value;
      user.status = this.userForm.get('status')?.value;
      user.includedPinRanges = this.includedPinDataSource.data;
      user.excludedPinRanges = this.excludedPinDataSource.data;
  
      if (user.type === 'INTERNAL') {
        user.branch = this.userForm.get('branch')?.value;
        user.reportingManager = this.userForm.get('reportingManager')?.value || null;
      }
  
      if (this._id === '') {
        user.password = 'password@123';
        this.userService.createUser(user).subscribe({
          next: (response) => {
            this._id = response._id ?? '';
            this.updateFormWithResponse(response);
            resolve(true);
            this.location.back();
          },
          error: (error) => {
            this.showError('Error Creating the User');
            resolve(false);
          }
        });
      } else {
        user._id = this._id;
        this.userService.updateUser(this._id, user).subscribe({
           next: (response) => {
            this.updateFormWithResponse(response);
            this.includedPinDataSource.data = response.includedPinRanges;
            this.includedPinDataSource.data = response.excludedPinRanges;
            this.showSuccessMessage('User updated successfully');
            resolve(true);
            this.location.back();
          },
          error: (error) => {
            this.showError('Error Updating the User');
            resolve(false);
          }
        });
      }
    });
  }
  
  private updateFormWithResponse(response: User): void {
    this.userForm.get('userId')?.setValue(response.userId);
    this.userForm.get('name')?.setValue(response.name);
    this.userForm.get('type')?.setValue(response.type);
    this.userForm.get('status')?.setValue(response.status);
  }
  
  
  deleteUserRoles(){
    let promise = new Promise((resolve,reject)=>{
      this.userRoleService.deleteRolesForAUser(this._id).subscribe({
        next: (response) => {
          resolve(true);
        },
        error: (error) => {
          resolve(false);
          this.showError("Error deleting current roles for the user");
        }
      })
    })
    return promise;
  }
  createUserRoles(){
    let promise = new Promise((resolve,reject)=>{
      let userRolesArray = new Array();
      this.userRoleDataSource.data.forEach(item=>{
        if(item.selected){
          let userRole = {
            user:this._id,
            role:item.role
          }
          userRolesArray.push(userRole);  
        }
      })
      let postData = {
        userRoles:userRolesArray
      }
      this.userRoleService.createUserRoles(postData).subscribe({
        next: (response) => {
          resolve(true);
          this.showSuccessMessage("Roles for the user  created");
        },
        error: (error) => {
          resolve(false);
          this.showError("Error creating roles for the user");
        }
      })
    })
    return promise;
  }
  createUserSubclientAccess(){
    let promise = new Promise((resolve,reject)=>{
      this.userSubclientAccessService.deleteAllSubclientsForAUser(this._id).subscribe({
        next: (response) => {
          let userSubclientArray = new Array<UserSubclient>();
          this.subclientDataSource.data.forEach(item=>{
            if(item.selected){
              let userSubclient:UserSubclient = {} as UserSubclient;
              userSubclient.client = item.client;
              userSubclient.subclient = item._id;
              userSubclient.user = this._id;
              userSubclientArray.push(userSubclient);
            }
          })
          let postData  = {
            userSubclients:userSubclientArray
          }
          this.userSubclientAccessService.createMany(postData).subscribe({
               next: (response) => {
                resolve(true);
                this.showSuccessMessage("User Subclient Access Created");
              },
              error: (error) => {
                resolve(false);
                this.showError("Error creting User Subclient Access");
              }
          })
        },
        error: (error) => {
          resolve(false);
          this.showError("Error deleting current User Subclient Access");
        }
      })       
    })
    return promise; 
  }
  createUserVendorAccess(){
    let promise = new Promise((resolve,reject)=>{
      this.userVendorAccessService.deleteAllVendorsForAUser(this._id).subscribe({
        next: (response) => {
          let userVendorAccessArray = new Array<UserVendorAccess>();
          this.vendorDataSource.data.forEach(item=>{
            if(item.selected){
              let userVendorAccess:UserVendorAccess = {} as UserVendorAccess;
              userVendorAccess.vendor = item._id;
              userVendorAccess.user = this._id;
              userVendorAccessArray.push(userVendorAccess);
            }
          })
          let postData  = {
            userVendors:userVendorAccessArray
          }
          this.userVendorAccessService.create(postData).subscribe({
            next: (response) => {
              resolve(true);
              this.showSuccessMessage("User Vendor Access Created");
            },
            error: (error) => {
              resolve(false);
              this.showError("Error creting User Vendor Access");
            }
          })
        },
        error: (error) => {
          resolve(false);
          this.showError("Error deleting current User Vendor Access");
        }
      }) 
    })
    return promise;       
  }
  createUserBranchAccess(){
    let promise = new Promise((reslove,reject)=>{
      this.userBranchAccessService.deleteForAUser(this._id).subscribe({
        next: (response) => {
          let userBranchArray = new Array<any>();
          this.userBranchAccessDataSource.data.forEach(item=>{
            if(item.selected){
              let userBranch = ({
                user:this._id,
                branch:item._id
              })
              userBranchArray.push(userBranch);
            }
          })
          let postData  = {
            userBranchAccesses:userBranchArray
          }
          this.userBranchAccessService.createMany(postData).subscribe({
            next: (response) => {
              this.showSuccessMessage("User Branch Access Created");
            },
            error: (error) => {
              this.showError("Error creting User Subclient Access");
            }
          })
          reslove(true);
        },
        error: (error)=>{
          reslove(false);
          this.showError("Error deleting current User Subclient Access");
        }
      }) 
    })
    return promise;       
  }    
  typeChanged(event:MatSelectChange){
    if(this.userForm.get('type')?.value=='INTERNAL'){
      this.userForm.get('branch')?.setValidators(Validators.required);
    }
  }
  applyFilterForClient(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;

    this.subclientDataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterForVendor(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.vendorDataSource.filter = filterValue.trim().toLowerCase();
  }  
  masterToggleSubclientSelection(event:MatCheckboxChange){
    if(event.checked){
      this.subclientDataSource.filteredData.forEach(item=>{
        item.selected = true;
      })
    }else{
      this.subclientDataSource.filteredData.forEach(item=>{
        item.selected = false;
      })      
    }
  } 
  masterToggleVendorSelection(event:MatCheckboxChange){
    if(event.checked){
      this.vendorDataSource.filteredData.forEach(item=>{
        item.selected = true;
      })
    }else{
      this.vendorDataSource.filteredData.forEach(item=>{
        item.selected = false;
      })      
    }
  }   
  uploadFile(){
   const userId=this.userForm.get("userId")?.value;
   const file=this.fileUploadForm.get('signatureFile')?.value.files[0];
  this.userService.uploadSignatureFile(userId,file).subscribe({
    next: (response) => {
      this.showSuccessMessage("Signature File uploaded")
    },
    error :(error) => {
      this.showError("Error uploading Signature file")
    }
  })
  }
  signatureDeleteButtonClicked(signatureFile:any){
    console.log();
    
  }
  backButtonClicked(){
    this.location.back();
  }
  showError(msg:string){
    this.snackBar.open(`${msg}`,'Error',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showSuccessMessage(msg:string){
    this.snackBar.open(`${msg}`,'Info',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});    
  }
}
