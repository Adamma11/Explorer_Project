import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AnalysisTypeService } from '../service/analysis-type.service';

export interface UserData {

    _id: any;
    name: any;
  
  
}

@Component({
  selector: 'app-analysis-type',
  templateUrl: './analysis-type.component.html',
  styleUrls: ['./analysis-type.component.scss']
})
export class AnalysisTypeComponent {
  selectedRow:any; 
  showDetailsFlag:boolean = false;

  displayedColumns: string[] = ['serialNumber', 'name'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private router:Router,
    private analysisTypeService:AnalysisTypeService
  ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit(): void {
    this.readAnalysisTypeData();
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


  addAnalysisTypeDetailsClicked() {
  this.router.navigate(['home/masters/analysistypedetails']);
  }

 

showDetails(row: any): void {
  console.log(row._id);
  this.showDetailsFlag = true;
  this.router.navigate([`home/masters/analysistypedetails/${row._id}`]);
  this.analysisTypeService.read(row._id).subscribe(
    response => {
      this.selectedRow = response;
    },
    error => {
      console.log(error);
    }
  );
}




  readAnalysisTypeData(){
    this.analysisTypeService.readAll().subscribe(
      response =>{
        const analysisType: UserData[] =response.map(item =>({
          _id:item._id,
          name:item.name,
     
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
