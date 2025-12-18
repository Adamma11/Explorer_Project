import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { EmailTemplateService } from '../service/email-template.service';

export interface UserData {
  _id: any;
  name: any;
} 
@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent {
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns: string[] = ['serialNumber','name'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router,
    private emailTemplateService: EmailTemplateService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.readEmailTemplateData();
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
    this.router.navigate(['/home/masters/emailtemplatedetails']);
  }

  showDetails(row:any):void{
    // console.log('show details', row._id);
    
    this.showDetailsFlag = true;
    this.router.navigate([`/home/masters/emailtemplatedetails/${row._id}`]);
    this.emailTemplateService.findOne(row._id).subscribe(
      response  => {
        // console.log('response === ',response);
        
        this.selectedRow = response
      }, error => {
        console.log('error ', error);
      }
    )
    // this.selectedRow =row;
  }

  readEmailTemplateData(){
    this.emailTemplateService.findAll().subscribe(
      response =>{
        const emailTempalte: any[] =response.map(item =>({
          _id:item._id,
          name:item.name
        }))
        // console.log(emailTempalte[1], response[1]);
        
        this.dataSource.data = emailTempalte;
        this.dataSource.sort = this.sort
      },
      error => {
        console.error('Error reading list', error);
      }
    )
  }
  addEmailClicked() {
    this.router.navigate(['/home/masters/emailtemplatedetails']);
  }
}
