import { NgModule } from "@angular/core";

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  exports:[
      MatSidenavModule,
      MatIconModule,
      MatButtonModule,
      MatToolbarModule,
      MatExpansionModule,
      MatCardModule,
      MatTableModule,
      MatSnackBarModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      MatRadioModule,
      MatAutocompleteModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatSortModule,
      MatTabsModule,
      MatDialogModule
  ]
})
export class MaterialModule { }
