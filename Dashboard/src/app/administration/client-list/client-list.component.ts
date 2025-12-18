import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,Sort } from '@angular/material/sort';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { Client } from '../../model/client';
import { ClientService } from '../../service/client.service';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';

import { ClientAnalysisCodeService } from 'src/app/service/client-analysis-code.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  displayedColumns = ['serialNumber','name','city','status','edit','delete'];
  dataSource = new  MatTableDataSource<Client>();
  hoveredRow: number | null = null;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  constructor(
    private location:Location,
    private router:Router,
    private clientService:ClientService,
    private clientAnalysisCodeService:ClientAnalysisCodeService,
    private _liveAnnouncer:LiveAnnouncer,
    private snackBar:MatSnackBar
  ) { }
  ngOnInit(): void {
    this.findAllClients();
  }

  findAllClients():void{
    this.clientService.findAllClients().subscribe(
      response=>{
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log("cleints",this.dataSource.data);

      },
      error=>{
        this.showError("Error While fetching clients list");
      }
    )
    
  }

  editButtonClicked(client:Client){
    // this.router.navigate([`home/client-details/${client._id}`])
    this.router.navigate([`home/client-details/${client._id}`]);
  } 


  // changes required 26/december
  deleteColorCode(element:Client){
    console.log('element == ', element);
    
  }

  
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
addButtonClicked(){
  this.router.navigate(['home/administration/client-details'])
}
  exportToXlButtonClicked(){
    console.log("Export to xls button clicked")
    this.clientService.writeClientDetails().subscribe(
      (response:HttpResponse<Blob> | any)=>{
        //console.log(response);
        FileSaver.saveAs(response.body,`client_details.xlsx`);
      },
      error=>{
        //console.log("Error from jasper server ",error);
      }
    )

  }
  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }else{
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
