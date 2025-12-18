import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { EductionMasterService } from '../service/education-master.service';
// import { EductionMasterService } from '../service/eduction-master.service';


export interface UserData {
  _id: any;
  name: any;
  address: any;
  country: any;
}

@Component({
  selector: 'app-education-master-list',
  templateUrl: './education-master-list.component.html',
  styleUrls: ['./education-master-list.component.scss']
})
export class EducationMasterListComponent {
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns: string[] = ['serialNumber','name','mandatory','city','email','createdby','modifiedOn'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router,
    private eductionMasterService: EductionMasterService) {
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

  addEductionDetailsClicked() {
    this.router.navigate(['/home/masters/educationmasterdetails']);
  }

  showDetails(row:any):void{
    // console.log('show details', row._id);
    
    this.showDetailsFlag = true;
    this.router.navigate([`/home/masters/educationmasterdetails/${row._id}`]);
    this.eductionMasterService.read(row._id).subscribe(
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
    this.eductionMasterService.readAllForMe().subscribe(
      response =>{
        const educationMaster: any[] =response.map(item =>({
          _id:item._id,
          name:item.name,
          mandatory:item.mandatory,
          city:item.city,
          email:item.email,
          createdBy:item.createdby,
          modifiedOn: item.createdby
        }))
        // console.log(educationMaster[1], response[1]);
        
        this.dataSource.data = educationMaster;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }
}
