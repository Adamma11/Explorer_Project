import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';

import { StandardVerbiageService } from '../service/standard-verbiage.service';
export interface UserData {

  _id: any;
  comment: any;


}

@Component({
  selector: 'app-standrad-verbiage-list',
  templateUrl: './standrad-verbiage-list.component.html',
  styleUrls: ['./standrad-verbiage-list.component.scss']
})
export class StandradVerbiageListComponent {
  selectedRow:any; 
  showDetailsFlag:boolean = false;

  displayedColumns: string[] = ['serialNumber', 'comment'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private router:Router,
    private standardVerbiageService:StandardVerbiageService
  ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit(): void {
    this.readStandardVerbiageData();
    // this.showDetails()
    
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  addstandardVerbiageDetailsClicked() {
  this.router.navigate(['home/masters/standardverbiagedeatils']);
  }

 

showDetails(row: any): void {
  console.log(row._id);
  this.showDetailsFlag = true;
  this.router.navigate([`home/masters/standardverbiagedeatils/${row._id}`]);
  this.standardVerbiageService.findOne(row._id).subscribe(
    response => {
      this.selectedRow = response;
    },
    error => {
      console.log(error);
    }
  );
}




  readStandardVerbiageData(){
    this.standardVerbiageService.findAll().subscribe(
      response =>{
        const analysisType: UserData[] =response.map(item =>({
          _id:item._id,
          comment:item.comment,
     
        }))
        this.dataSource.data = analysisType;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }
}
