import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { CompanyService } from '../service/company.service';



export interface UserData {
  _id: any;
  name: any;
  address: any;
  country: any;
}




@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements AfterViewInit {

  showDetailsFlag:boolean = false;
  selectedRow:any;
  displayedColumns: string[] = ['serialNumber','name','address','country'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(
    private router:Router,
    private companyService:CompanyService
  ) {

    
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));


    this.dataSource = new MatTableDataSource();


  }
  ngOnInit(): void {
    this.readCompanyData();
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


  addCompanyDetailsClicked() {

  this.router.navigate(['/home/masters/companydetails']);
  }

  showDetails(row:any):void{
    // console.log('show details', row._id);
    
    this.showDetailsFlag =true;
    this.router.navigate([`home/masters/companydetails/${row._id}`]);
    this.companyService.findOneCompany(row._id).subscribe(
      response  => {
        this.selectedRow = response
      }, error => {
        console.log('error ', error);
      }
    )
    // this.selectedRow =row;
  }

  readCompanyData(){
    this.companyService.readAllForMe().subscribe(
      response =>{
        const companies: UserData[] =response.map(item =>({
          _id:item._id,
          name:item.name,
          address:item.address,
          country:item.country,
        }))
        console.log(companies);
        
        this.dataSource.data = companies;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }

}

// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };

  //}