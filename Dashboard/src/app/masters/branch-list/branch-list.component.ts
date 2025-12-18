import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { UniversityService } from '../service/university.service';
import { BranchService } from '../service/branch.service';



export interface UserData {

  _id: any;
  name: any;
  address: any;
  pinCode: any;
  district: any;
  state: any;
  country: any;

}
@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent {

  selectedRow:any; 
  showDetailsFlag:boolean = false;

  displayedColumns: string[] = ['serialNumber', 'name', 'address', 'district','state','pinCode','country'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private router:Router,
    private branchService:BranchService
  ) {
    this.dataSource = new MatTableDataSource();
  }
 
  ngOnInit(): void {
    // this.readUniversityData();
    // this.showDetails()


    this.branchService.findAllBranches().subscribe(
      response => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        
      }
    );  
    
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


  addBranchDetailsClicked() {

  this.router.navigate(['home/masters/branchdetails']);
  }

  showDetails(row:any):void{
    console.log(row._id);
    this.showDetailsFlag =true;
    this.selectedRow =row;
  this.router.navigate([`home/masters/branchdetails/${row._id}`]);
    
    this.branchService.findOneBranch(row._id).subscribe(
      response => {
        this.selectedRow = response;
      },
      error => {
        console.log(error);
      }
    );  
  }





//  readUniversityData(){
    // this.universityService.readAllForMe().subscribe(
    //   response =>{
    //     const universities: UserData[] =response.map(item =>({
    //       _id:item._id,
    //       name:item.name,
    //       address:item.address,
    //       pinCode: item.pinCode,
    //       district:item.district,
    //       state:item.state,
    //       country:item.country,
    //     }))
    //     this.dataSource.data = universities;
    //     this.dataSource.sort = this.sort
    //   },
    //   error => {
    //     console.error('Error reading list', error);
    //   }
    // )
  // }


}
