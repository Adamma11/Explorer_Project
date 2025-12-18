import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminstrationRoutingModule } from './adminstration-routing.module';
import { VendorsComponent } from './vendors/vendors.component';
import { PersonalDetailsConfigComponent } from './personal-details-config/personal-details-config.component';
import { GeneratePasswordComponent } from './generate-password/generate-password.component';
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
import { MAT_COLOR_FORMATS,NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MaterialModule} from "src/app/material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDrag,CdkDragPlaceholder,CdkDropList} from '@angular/cdk/drag-drop';
import { HolidayDialogComponent } from './holiday-dialog/holiday-dialog.component';
import { DefaultCalendarComponent } from './default-calendar/default-calendar.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    VendorsComponent,
    PersonalDetailsConfigComponent,
    GeneratePasswordComponent,
    VendorUsersComponent,
    ColorCodesListComponent,
    ClientListComponent,
    ClientDetailsComponent,
    ClientContractDetailsComponent,
    SubclientDetailsComponent,
    ComponentListComponent,
    ComponentDetailsComponent,
    RoleDetailsComponent,
    RoleListComponent,
    UserListComponent,
    UserDetailsComponent,
    HolidayDialogComponent,
    DefaultCalendarComponent,
  ],
  imports: [
    CommonModule,
    // AdministrationRoutingModule,
    AdminstrationRoutingModule,
     MaterialModule,
     FormsModule,
     ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    NgxMatColorPickerModule,
    MatDividerModule
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue:{appearance:'fill'}}],
})
export class AdminstrationModule { }
