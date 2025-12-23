import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantVerifyComponent } from './instant-verify/instant-verify.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-material-file-input';



@NgModule({
  declarations: [
    InstantVerifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    DragDropModule,
    MatDividerModule,
    MaterialFileInputModule
  ]
})
export class QuickVerifyModule { }
