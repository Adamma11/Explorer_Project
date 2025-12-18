import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorsComponent } from './vendors/vendors.component';
import { PersonalDetailsConfigComponent } from './personal-details-config/personal-details-config.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
import { DefaultCalendarComponent } from './default-calendar/default-calendar.component';
import { VendorUsersComponent } from './vendor-users/vendor-users.component'; 
import { ColorCodesListComponent } from './color-codes-list/color-codes-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientContractDetailsComponent } from './client-contract-details/client-contract-details.component';
import { SubclientDetailsComponent } from './subclient-details/subclient-details.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { ComponentDetailsComponent } from './component-details/component-details.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path:'color-codes-list',component:ColorCodesListComponent
   },
   {
    path:'clients-list',component:ClientListComponent
   },
   {
    path:'client-details',component:ClientDetailsComponent
   },
   {
    path:'client-details/:_id',component:ClientDetailsComponent
   },
   {
    path:'vendors',component:VendorsComponent
   },
   {
    path:'personal-details-config',component:PersonalDetailsConfigComponent
   },
   {
    path:'components',component:ComponentListComponent
   },
   {
    path:'roles',component:RoleListComponent
   },
   {
    path:'users',component:UserListComponent
   },
   {
    path:'generate-password',component:GeneratePasswordComponent
   },
   {
    path:'default-calender',component:DefaultCalendarComponent
   },
   {
    path:'vendor-users',component:VendorUsersComponent
   },
   {path:'client-contract-details/client/:clientId',component:ClientContractDetailsComponent},
   {path:'client-contract-details/contract/:clientContractId',component:ClientContractDetailsComponent},
   {path:'subclient-details/client/:clientId/subclient/:subclientId',component:SubclientDetailsComponent},
   {path:'subclient-details/client/:clientId',component:SubclientDetailsComponent},
   {path:'componentdetails',component:ComponentDetailsComponent},
   {path:'componentdetails/:_id',component:ComponentDetailsComponent},
   {path:'roledetails',component:RoleDetailsComponent},
   {path:'roledetails/:_id',component:RoleDetailsComponent},
   {path:'userdetails/:_id',component:UserDetailsComponent},
   {path:'userdetails',component:UserDetailsComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminstrationRoutingModule { }
