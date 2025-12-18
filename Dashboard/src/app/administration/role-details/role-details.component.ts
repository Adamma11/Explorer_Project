import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserRole } from 'src/app/model/user-role';
import { RoleModule } from 'src/app/model/role-module';
import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';
import { UserRoleService } from 'src/app/service/user-role.service';
import { RoleModuleService } from 'src/app/service/role-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationModuleService } from 'src/app/service/application-module.service';
import { Role } from 'src/app/model/role';
import { ScreenService } from '../service/screen.service';
import { ScreenAccessService } from '../service/screen-access.service';
import { resolve } from 'dns';
import { ComponentService } from 'src/app/service/component.service';
import { ComponentAccessService } from 'src/app/service/component-access.service';
import { BranchService } from 'src/app/service/branch.service';
import { BranchAccessService } from '../service/branch-access.service';
import { DashboardService } from '../service/dashboard.service';
import { DashboardAccessService } from 'src/app/service/dashboard-access.service';
import { timeStamp } from 'console';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent {
  roleNameForm = new  FormGroup({
    roleName:new FormControl('',[Validators.required])
  })
  _id :string=''; 
  disableName:boolean=false;
  roleUsersDisplayedColumns=['serialNumber','userId','userName','select'];
  selectedDisplayedColumns=['serialNumber','userName','selected'];
  moduleDisplayedColumns = ['serialNumber','name','create','read','update','delete'];
  dashboardDisplayedColumns = ['serialNumber','name','select'];
  roleUsersDataSource = new MatTableDataSource<UserRole>();
  roleModuleDataSource = new MatTableDataSource<RoleModule>();

  screenAccessDataSource = new MatTableDataSource<any>();
  screenAccessDisplayedColumns=['serialNumber','name','select'];

  componentAccessDataSource = new MatTableDataSource<any>();
  componentAccessDisplayedColumns=['serialNumber','name','select'];  

  branchDataAccessDataSource = new MatTableDataSource<any>();
  branchDataAccessDisplayedColumns=['serialNumber','name','select'];    

  dashboardDataSource = new MatTableDataSource<any>();


  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<UserRole>(this.allowMultiSelect, this.initialSelection);
  constructor(
    private location:Location,
    private roleService:RoleService,
    private userService:UserService,
    private userRoleService:UserRoleService,
    private applicationModuleService:ApplicationModuleService,
    private roleModuleService:RoleModuleService,
    private screenService:ScreenService,
    private screenAccessService:ScreenAccessService,
    private componentService:ComponentService,
    private componentAccessService:ComponentAccessService,
    private branchService:BranchService,
    private branchAccessService:BranchAccessService,
    private dashboardService:DashboardService,
    private dashbaordAccessService:DashboardAccessService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar    
  ) { }

  ngOnInit(): void {
    this.getAllModules();
    this.getAllScreens();    
    this.getAllComponents();    
    this.getAllBranches();    
    this.getAllDashboards();
    this._id =this.activatedRoute.snapshot.paramMap.get('_id')??'';
    this.getRoleDetails();

  }
  getAllDashboards(){
    this.dashboardService.readAll().subscribe({
      next:(response)=>{
        response.forEach(item=>{
          let dashboard = ({
            _id : item._id,
            name:item.name,
            selected:false,
          })
          this.dashboardDataSource.data.push(dashboard)
          this.dashboardDataSource._updateChangeSubscription()
        })
      },
      error:(error)=>{
        this.showError('Error Reading Dashboards')
      }
    })
  }
  readAndSetDashboardData(){
    this.dashbaordAccessService.readForARole(this._id).subscribe({
      next:(response)=>{
        response.forEach(dashboardAccessItem=>{
          this.dashboardDataSource.data.forEach(dashboardItem=>{
             if(dashboardAccessItem.dashboard.toString() == dashboardItem._id.toString()){
               dashboardItem.selected = true
               this.dashboardDataSource._updateChangeSubscription()
             }
          })
        })
      },
      error:(error)=>{
        this.showError("Error reading dashboard access")
      }
    })
  }
  getAllScreens(){
    this.screenService.readAll().subscribe({
      next:(response)=>{
        response.forEach(responseItem=>{
          let screen = ({
            screen:responseItem._id,
            name:responseItem.name,
            selected:false
          })
          this.screenAccessDataSource.data.push(screen);          
        })
        this.screenAccessDataSource._updateChangeSubscription();
      },
      error:(error)=>{
        this.showError(error.error.message);
      }
    })
  }
  getAllModules(){
    // find all modules    
    this.applicationModuleService.findAll().subscribe(
      response=>{
        //console.log(response);
        response.forEach(item=>{
          let roleModule:RoleModule = {} as RoleModule;
          roleModule.applicationModule = item._id;
          roleModule.applicationModuleName = item.name;
          this.roleModuleDataSource.data.push(roleModule);
        })
        this.roleModuleDataSource._updateChangeSubscription();
      },
      error=>{
        this.showError("Error retrieving modules");
      }
    )    
  }

  getAllComponents(){
    this.componentService.findAllComponents().subscribe({
      next:(response)=>{
        response.forEach(responseItem=>{
          let componentItem = ({
            component:responseItem._id,
            name:responseItem.displayName,
            selected:false
          })
          this.componentAccessDataSource.data.push(componentItem)
        })
        this.componentAccessDataSource._updateChangeSubscription();
      },
      error:(error)=>{
        this.showError(error.error.message);
      }
    })
  }

  getAllBranches(){
    this.branchService.findAllBranches().subscribe({
      next:response=>{
        response.forEach(responseItem=>{
          let branchItem = ({
            branch:responseItem._id,
            name:responseItem.name,
            selected:false
          })
          this.branchDataAccessDataSource.data.push(branchItem)
        })
        this.branchDataAccessDataSource._updateChangeSubscription();
      },
      error:error=>{
        this.showError(error.error.message);
      }
    })
  }  
  async getRoleDetails(){
    this.roleService.findOneRole(this._id).subscribe({
      next:response=>{
        this.roleNameForm.get('roleName')?.setValue(response.name);
      },
      error:error=>{
        this.showError("Could not fetch role details");
      }
    })
    this.getAllModulesForTheRole();
    this.getAllScreensForTheRole();
    this.getAllComponentsForTheRole();
    this.getAllBranchesForTheRole();   
    this.readAndSetDashboardData()     
  }
  getAllModulesForTheRole(){
    let promise = new Promise((resolve,reject)=>{
      this.roleModuleService.findAllModulesForARole(this._id).subscribe({
        next:response=>{
          response.forEach(item=>{
            this.roleModuleDataSource.data.forEach(roleModuleDataSourceItem=>{
              if(item.applicationModule===roleModuleDataSourceItem.applicationModule){
                roleModuleDataSourceItem.create = item.create;
                roleModuleDataSourceItem.read=item.read;
                roleModuleDataSourceItem.update=item.update;
                roleModuleDataSourceItem.delete=item.delete;
              }
            })
          })
          this.roleModuleDataSource._updateChangeSubscription();
        },
        error:error=>{
          this.showError("Error reading modules");
          reject(false);
        }
      })
      resolve(true);    
    })
    return promise;
  }
  getAllComponentsForTheRole(){
    let promise = new Promise((resolve,reject)=>{
      this.componentAccessService.readAllForARole(this._id).subscribe({
        next:(response)=>{
          response.forEach(responseItem=>{
            this.componentAccessDataSource.data.forEach(dataSourceItem=>{
              if(dataSourceItem.component == responseItem.component){
                dataSourceItem.selected = true;
              }
            })
          })
          this.componentAccessDataSource._updateChangeSubscription();
        },
        error:(error)=>{
          this.showError(error.error.message);
          reject(false);
        }
      })
      resolve(true)
    })
    return promise;
  }

  getAllBranchesForTheRole(){
    let promise = new Promise((resolve,reject)=>{
      this.branchAccessService.readAllForARole(this._id).subscribe({
        next:(response)=> {
          response.forEach(responseItem=>{
            this.branchDataAccessDataSource.data.forEach(dataSourceItem=>{
              if(dataSourceItem.component == responseItem.component){
                dataSourceItem.selected = true;
              }
            })
          })
          this.branchDataAccessDataSource._updateChangeSubscription();
        },
        error:error=>{
          this.showError(error.error.message);
          reject(false);
        }
      })
      resolve(true);
    })
    return promise;
  }  

  getAllScreensForTheRole(){
    let promise = new Promise((resolve,reject)=>{
      this.screenAccessService.readAllForARole(this._id).subscribe({
        next:(response)=>{
          response.forEach(responseItem=>{
            this.screenAccessDataSource.data.forEach(dataSourceItem=>{
              if(dataSourceItem.screen == responseItem.screen){
                dataSourceItem.selected = true;
              }
            })
          })
          this.screenAccessDataSource._updateChangeSubscription();
        },
        error:(error)=>{
          this.showError(error.error.message);
          reject(false);
        }
      })
      resolve(true);
    })
    return promise;
  }
  getAllUsersForTheRole(){
this.userRoleService.findAllUsersForARole(this._id).subscribe({
  next:(response)=>{
    response.forEach(item=>{
      this.roleUsersDataSource.data.forEach(itemInDataSource=>{
        if(item.user === itemInDataSource.user){
          this.selection.select(itemInDataSource);
        }
      })
    })
  },
  error:(error)=>{
    this.showError("Error reading users for the role");
  }
})   
  }
  saveButtonClicked(){
    this.saveRole();
  }

  saveRole(){
    let role:Role = {} as Role;
    role.name = this.roleNameForm.get('roleName')?.value??'';
    if(this._id===''){
      this.roleService.createRole(role).subscribe({
        next:response=>
        {
          this.roleNameForm.get('roleName')?.setValue(response.name);
          this.saveRoleModules();
          this.saveScreenAccess();
          this.saveComponentAccess();
          this.saveBranchAccess();
          this.saveDashboardAccess();
          this.showMessage("Role Created");
          this.location.back();
        },
        error:error=>{
          this.showError("Error creating role")
        }
      })
    }else{
      this.roleService.updateRole(this._id,role).subscribe({
        next:(response)=>{
          this.roleNameForm.get('roleName')?.setValue(response.name)
          this.saveRoleModules();
          this.saveScreenAccess();
          this.saveComponentAccess();
          this.saveBranchAccess();
          this.saveDashboardAccess();
          this.showMessage("Role Updated");
          this.location.back();
        },
        error:(error) => {
          this.showError("Error updating role")
        }
      })
    }

  }
  saveUserRole(){
    this.userRoleService.deleteUsersForARole(this._id).subscribe(
      response=>{
        let roleUsers = new Array();
        //console.log('length of selection is ',this.selection.selected.length);
        this.selection.selected.forEach(item=>{
             let userRoleData = {
              user:item.user,
              role:this._id
             }
            roleUsers.push(userRoleData);
        })
        let postData = {
          userRoles :roleUsers
        }
        //console.log('post data has ',postData);
        this.userRoleService.createUserRoles(postData).subscribe(
          response=>{
            this.showMessage("Role Users Saved");
          },
          error=>{
            //console.log('error saving users for the role',error);
            this.showError("Error saving users for the role");
          }
        )
      },
      error=>{
        //console.log('error deleting role',error);
        this.showError("Error deleting users for the given role");
      }
    )
  }
  saveRoleModules(){
    this.roleModuleService.deleteAllModulesForARole(this._id).subscribe(
      response=>{
        let roleModuleArray = new Array();
        this.roleModuleDataSource.data.forEach(item=>{
          let roleModuleData ={
            role:this._id,
            applicationModule:item.applicationModule,
            create:item.create,
            read:item.read,
            update:item.update,
            delete:item.delete,
          }
          roleModuleArray.push(roleModuleData); 
        })
        let postData = {
          roleModules:roleModuleArray
        }
        this.roleModuleService.create(postData).subscribe(
          response=>{
            this.showMessage("Role Modules Saved");
          },
          error=>{
            //console.log(error);
            this.showError("Error saving Modules");
          }
        )
      },
      error=>{
        this.showError("Error deleting Modules");
      }
    )
  }
/*  buildScreenAccessArray(){
    return new Promise((resolve,reject)=>{
      let screenAccessArray = new Array();
      this.screenAccessDataSource.data.forEach(item=>{
        if(item.selected){
          let screenAccessItem = ({
            role:this._id,
            screen:item.screen
          })
          screenAccessArray.push(screenAccessItem)
        }
      })
      resolve(screenAccessArray);
    })
  } */
  saveScreenAccess(){
    //console.log('in save screen access');
    let screenAccessArray = new Array();
    this.screenAccessDataSource.data.forEach(item=>{
      if(item.selected){
        let screenAccessItem = ({
          role:this._id,
          screen:item.screen
        })
        screenAccessArray.push(screenAccessItem)
      }
    })
    let screenAccessData = ({
      screenAccesses:screenAccessArray
    })
    //console.group(screenAccessData);
    this.screenAccessService.updateForARole(this._id,screenAccessData).subscribe(
      response=>{
        this.showMessage("Screen Access Saved");
      },
      error=>{
        this.showError(error.error.message)
      }
    )
   
  }
  saveComponentAccess(){
    let componentAccessArray = new Array();
    this.componentAccessDataSource.data.forEach(item=>{
      if(item.selected){
        let componentAccessItem = ({
          role:this._id,
          component:item.component
        })
        componentAccessArray.push(componentAccessItem)
      }
    })
    let componentAccessData = ({
      componentAccesses:componentAccessArray
    })
    this.componentAccessService.updateForARole(this._id,componentAccessData).subscribe(
      response=>{
        this.showMessage("Component Access Saved");
      },
      error=>{
        this.showError(error.error.message)
      }
    )
   
  }
  saveBranchAccess(){
    //console.log("in save component access");
    let branchAccessArray = new Array();
    this.branchDataAccessDataSource.data.forEach(item=>{
      //console.log('item.component is ',item.component);
      if(item.selected){
        let branchAccessItem = ({
          role:this._id,
          component:item.component
        })
        branchAccessArray.push(branchAccessItem)
      }
    })
    let branchAccessData = ({
      branchAccesses:branchAccessArray
    })
    this.branchAccessService.updateForARole(this._id,branchAccessData).subscribe(
      response=>{
        this.showMessage("Component Access Saved");
      },
      error=>{
        this.showError(error.error.message)
      }
    )
   
  }

  async saveDashboardAccess(){
    let dashboardAccesses = await this.prepareDashBoardAccessData()
    this.dashbaordAccessService.deleteForARole(this._id).subscribe({
      next:(response)=>{
        this.dashbaordAccessService.createMany({dashboardAccesses:dashboardAccesses}).subscribe({
          next:response=>{
            this.showMessage("Dashboard Accesses Saved")
          },
          error:error=>{
            this.showError("Error Saving Dashboard Accesses")
          }
        })
      },
      error:(error) => {
        this.showError("Error deleting existing Dashboard Acccesses")
      }
    })
  }
  prepareDashBoardAccessData(){
    let promise = new Promise((resolve,reject)=>{
      let dashBoardAccesses = new Array()
      this.dashboardDataSource.data.forEach(item=>{
        if(item.selected){
          let dashboardAccess = ({
            role:this._id,
            dashboard:item._id
          })
          dashBoardAccesses.push(dashboardAccess)
        }
      })
      resolve(dashBoardAccesses)
    })
    return promise
  }
  backButtonClicked(){
    this.location.back();
  }
  showError(msg:string){
    this.snackBar.open(msg,'Error',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,'Info',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});
  }  

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.roleUsersDataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.roleUsersDataSource.data.forEach(row=>this.selection.select(row));
  } 
  
  
  masterToggleScreenSelection(event:Event){
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    for(let screen of this.screenAccessDataSource.data){
      screen.selected = isChecked;
    }
    this.screenAccessDataSource._updateChangeSubscription();

  }

  masterToggleDashboardSelection(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
  
    for (let item of this.dashboardDataSource.data) {
      item.selected = isChecked;
    }
  
    this.dashboardDataSource._updateChangeSubscription();
  }
  masterToggleComponentSelection(event:Event){
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    for(let component of this.componentAccessDataSource.data){
      component.selected = isChecked;
    }
    this.componentAccessDataSource._updateChangeSubscription();    
  }
  masterToggleBranchSelection(event:Event){
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    for(let branch of this.branchDataAccessDataSource.data){
      branch.selected = isChecked;
    }
    this.branchDataAccessDataSource._updateChangeSubscription();    
  }






  // masterToggleScreenSelection(event:MatCheckboxChange){

  //   for(let screen of this.screenAccessDataSource.data){
  //     if(event.checked){
  //       screen.selected = true;        
  //     }else{
  //       screen.selected = false;        
  //     }
  //   }
  //   this.screenAccessDataSource._updateChangeSubscription();

  // }

  // masterToggleDashboardSelection(event:MatCheckboxChange){

  //   for(let item of this.dashboardDataSource.data){
  //     if(event.checked){
  //       item.selected = true;        
  //     }else{
  //       item.selected = false;        
  //     }
  //   }
  //   this.dashboardDataSource._updateChangeSubscription();

  // }  
  // masterToggleComponentSelection(event:MatCheckboxChange){
  //   for(let component of this.componentAccessDataSource.data){
  //     if(event.checked){
  //       component.selected = true;        
  //     }else{
  //       component.selected = false;        
  //     }
  //   }
  //   this.componentAccessDataSource._updateChangeSubscription();    
  // }
  // masterToggleBranchSelection(event:MatCheckboxChange){
  //   for(let branch of this.branchDataAccessDataSource.data){
  //     if(event.checked){
  //       branch.selected = true;        
  //     }else{
  //       branch.selected = false;        
  //     }
  //   }
  //   this.branchDataAccessDataSource._updateChangeSubscription();    
  // }
}
