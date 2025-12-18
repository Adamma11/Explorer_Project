import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { UniversityService } from '../service/university.service';
import { PinService } from '../service/pin.service';

export interface UserData {

    _id: any;
    // name: any;
    // address: any;
    pinCode: any;
    district: any;
    state: any;
    country: any;
  
}

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent {

  selectedRow:any; 
  showDetailsFlag:boolean = false;

  displayedColumns: string[] = ['serialNumber', 'district','state','pinCode','country'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private router:Router,
    private pinService:PinService
  ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit(): void {
    this.readPinData();
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


  addPinDetailsClicked() {
  this.router.navigate(['home/masters/pindetails']);
  }

  // showDetails(row:any):void{
  //   this.showDetailsFlag =true;
  //   // this.selectedRow =row;
  //   this.universityService.findOneUniversity(row._id).subscribe(
  //     response =>{
  //       this.selectedRow = response
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

 

showDetails(row: any): void {
  console.log(row._id);
  this.showDetailsFlag = true;

  this.router.navigate([`home/masters/pindetails/${row._id}`]);
  this.pinService.findOnePinWithId(row._id).subscribe(
    response => {
      this.selectedRow = response;
      // console.log("this.selectedRow ",this.selectedRow );
      
    },
    error => {
      console.log(error);
    }
  );
}




  readPinData(){
    this.pinService.findAllPins().subscribe(
      response =>{
        const pin: UserData[] =response.map(item =>({
          _id:item._id,
          // name:item.name,
          // address:item.address,
          pinCode: item.pinCode,
          district:item.district,
          state:item.state,
          country:item.country,
        }))
        this.dataSource.data = pin;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }

}
