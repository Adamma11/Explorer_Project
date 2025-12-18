import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { EmploymentMasterService  } from '../service/employment-master.service';


export interface UserData {
  _id: any;
  name: any;
  mandatory: any;
  city: any;
  email: any;
}

@Component({
  selector: 'app-employment-master-list',
  templateUrl: './employment-master-list.component.html',
  styleUrls: ['./employment-master-list.component.scss']
})
export class EmploymentMasterListComponent {
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns: string[] = ['serialNumber','name','mandatory','city','email','createdby'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router,
    private employmentMasterService: EmploymentMasterService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.readCompanyData();
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

  addEmploymentDetailsClicked() {
    this.router.navigate(['/home/masters/employmentmasterdetails']);
  }

  showDetails(row:any):void{
    // console.log('show details', row._id);
    
    this.showDetailsFlag = true;
    this.router.navigate([`/home/masters/employmentmasterdetails/${row._id}`]);
    this.employmentMasterService.read(row._id).subscribe(
      response  => {
        // console.log('response === ',response);
        
        this.selectedRow = response
      }, error => {
        console.log('error ', error);
      }
    )
    // this.selectedRow =row;
  }

  readCompanyData(){
    this.employmentMasterService.readAll().subscribe(
      response =>{
        const employment: any[] =response.map(item =>({
          _id:item._id,
          name:item.name,
          mandatory:item.mandatory,
          city:item.city,
          email:item.email,
          createdBy:item.createdby,
          modifiedOn: item.createdby
        }))
        // console.log(employment[1], response[1]);
        
        this.dataSource.data = employment;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }
}
