import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-case',
  templateUrl: './delete-case.component.html',
  styleUrls: ['./delete-case.component.scss']
})
export class DeleteCaseComponent {

  filteredOptions!: Observable<any[]>;
  clients:any[]=[]
  requiredClient!:FormControl
  resourceLoaded :boolean = true
  pageCount:number = 0;
  collection: any;
  p!: number;
  totalCount!: number;
  nameSearchValue!: string;
  caseId!: string;
  caseIdSearchValue!: string;
  initiationStartDateSearchValue!: Date;
  initiationEndDateSearchValue!: Date;
  requiredCases:string="-1"
  startDate!: Date;
  endDate!: Date;
  selected: boolean = false;
  selectAllCheckbox: boolean = false;
  checkboxSelected: boolean = false;
  xlsData:any[]=[]

  dataSource:MatTableDataSource<any>;
  displayedColumns = ['serialNumber','caseId','candidateName','clientName','subclientName','initiationDate','tatEndDate','displayStatus', 'select']

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private caseUpoadService:CaseUploadService,
    private userSubclientAccessService:UserSubclientAccessService,
    private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar
  ) { 
    this.dataSource = new MatTableDataSource();
    this.requiredClient = new FormControl('')
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('reportType')=='completionDate'){

     this.requiredCases="COMPLETED"
     this.pageCount = 0;
     this.totalCount = 0;
     this.startDate = new Date()
     this.startDate.setDate(1)
     this.startDate.setHours(0)
     this.startDate.setMinutes(0)
     this.startDate.setSeconds(0)
     this.startDate.setMilliseconds(0)
     this.endDate = new Date()
     if(this.endDate.getMonth() == 1 || this.endDate.getMonth() ==3 || this.endDate.getMonth() == 5 || this.endDate.getMonth() ==7 || this.endDate.getMonth() ==8 || this.endDate.getMonth() == 10 || this.endDate.getMonth() == 12){
       this.endDate.setDate(31)
     }else if(this.endDate.getMonth() == 4 || this.endDate.getMonth() ==6 || this.endDate.getMonth() == 9 || this.endDate.getMonth() ==11){
       this.endDate.setDate(30)
     }else{
       this.endDate.setDate(28)
     }
     this.endDate.setMinutes(59)
     this.endDate.setHours(23)
     this.endDate.setSeconds(59)
     this.endDate.setMilliseconds(9999)
     this.searchByCompletionDate()
   }
   this.userSubclientAccessService.findAllSubclientsForMe().subscribe(
     response=>{
       //console.log("got the subclients",response)
       response.forEach(item=>{
         let found = false
         for(let i=0; i < this.clients.length;i++){
           let clientItem = this.clients[i]
           if(item.subclient.client._id.toString() == clientItem._id.toString()){
             found = true
             break;
           }
         }
         if(!found){
           let client = ({
             _id : item.subclient.client._id,
             name : item.subclient.client.name
           })
           this.clients.push(client)
         }
       })
     },
     error=>{
       this.showError("Error getting the clients for the user")
     }
   )
   this.filteredOptions = this.requiredClient.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
 }

 displayFn(client: any): string {
   return client && client.name ? client.name : '';
 }

 private _filter(value: string): any[] {
   const filterValue = value.toLowerCase();
   return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
 }


 applyFilter(event:Event){
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();

   if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
 }

//  initializeDataSource(){
//    this.dataSource.data.splice(0,this.dataSource.data.length)
//    this.dataSource._updateChangeSubscription()
//  }

 searchByCompletionDateButtonClicked(){
  //  this.initializeDataSource()
   this.searchByCompletionDate()
 }

 searchByCompletionDate(){
   if(this.startDate === null || this.endDate === null){
     this.showError('Both Start Date and End Date are mandatory');
   }else{
     let local_client_id = "-"
     if(this.requiredClient.value !== ""){
       local_client_id = this.requiredClient.value._id
     }
     this.caseUpoadService.searchUnarchivedCases(this.startDate,this.endDate,local_client_id,this.pageCount).subscribe(
       response=>{
         this.totalCount = response.totalCount
         let resp = response.resp;
         resp.forEach((item:any)=>{
           let acase = ({
             _id: item._id,
             caseId:item.caseId,
             candidateName:item.candidateName,
             clientName:item.subclient.client.name,
             subclientName:item.subclient.name,
             initiationDate:item.initiationDate,
             tatEndDate:item.tatEndDate,
             displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
             status:item.status,
             employeeId:item.employeeId
           })
           this.dataSource.data.push(acase);
           this.dataSource._updateChangeSubscription();
         })
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       },
       error=>{
         this.showError("Error reading cases");
       }
     )
   }
 }

 searchByCaseIdButtonClicked(){
   this.caseUpoadService.searchByCaseIdUnarchived(this.caseIdSearchValue,this.pageCount).subscribe(
     response=>{
       this.totalCount = response.totalCount
       let resp = response.resp;
       let dataCase = resp.map((item: any) => {
        return {
          _id: item._id,
         caseId:item.caseId,
         candidateName:item.candidateName,
         clientName:item.subclient.client.name,
         subclientName:item.subclient.name,
         initiationDate:item.initiationDate,
         tatEndDate:item.tatEndDate,
         displayStatus:item.status=='OUTPUTQC-ACCEPTED' ? 'Completed' : 'Pending',
         status:item.status,
         employeeId:item.employeeId
        }
       })
       this.dataSource.data = dataCase
       this.dataSource._updateChangeSubscription();

       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     },
     error=>{
       this.showError("Error reading cases");
     }
   )
 }

  deleteacase() {
    // const arr = this.dataSource.data.filter(item => item.selected).map(item => item.caseId)
    const arr = this.dataSource.data.reduce((acc, cur) => {
      if (cur.selected) {
        acc.push(cur.caseId);
      }
      return acc;
    }, []);
    console.log('ar == ', arr);
    
    
    // const resultArr = new Array()
    // this.dataSource.data.forEach(item => {
    //   if (item.selected) {
    //     console.log("item == ", item)
    //     resultArr.push(item.caseId)
    //   }
    // })


    this.caseUpoadService.deletecase(arr).subscribe(
      response => {
        this.showSuccessMessage(" Successfully Deleted");
      },
      error => {
        this.showError("Error Deleting  files.");
      }
    )
  }


 showSuccessMessage(msg:string){
   this.snackBar.open(`${msg}`,'Info',{duration:2000,horizontalPosition:'end',verticalPosition:'top'});    
 }

 onCheckboxSelectAll(): void {
  this.dataSource.data.forEach(row => (row.selected = this.selectAllCheckbox));
  this.onCheckboxSelected()
}

onCheckboxSelected() {
  this.checkboxSelected = this.dataSource.data.some(row => row.selected === true);
}  

  showMessage(msg: string) {
    this.snackBar.open(msg, "Info", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
  showError(msg: string) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}

