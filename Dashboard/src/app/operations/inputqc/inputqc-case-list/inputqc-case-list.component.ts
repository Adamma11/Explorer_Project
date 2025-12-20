import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { CaseUploadService } from '../../../upload/service/case-upload.service';
import { ComponentDetailsForVerificationService } from '../../../verification/service/component-details-for-verification.service';
import * as XLSX from 'xlsx'; //added line oct-05//


export interface UserData {
  _id: any;
  name: any;
  address: any;
  country: any;
  caseId:any,
  candidateName:any,
  client:any,
  subclient:any,
  branch:any,
  initiationDate:any,
  dataEntryCompletionDate:any,
  tatEndDate:any
  colorTypes :any
  comments :any
}




@Component({
  selector: 'app-inputqc-case-list',
  templateUrl: './inputqc-case-list.component.html',
  styleUrls: ['./inputqc-case-list.component.scss']
})
export class InputqcCaseListComponent {
  totalCount = 0;
  pageCount = 0;
  showDetailsFlag: boolean = false;
  selectedRow: any;
  displayedColumns = ['serialNumber','caseId','candidateName','client','subclient','branch','initiationDate','dataEntryCompletionDate','tatEndDate'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; 

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  // @ViewChild(MatSort)
  // sort!: MatSort;
  constructor(
    private caseUploadService:CaseUploadService,
    private componentDetailsForVerificationService:ComponentDetailsForVerificationService,
    private router:Router
    ){
      // this.dataSource = new MatTableDataSource();
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
      this.findCases();
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

    showDetails(row:any):void{
      let caseDetails = ({
        case_id :row.case_id,
        caseId : row.caseId,
        candidateName : row.candidateName,
        clientId : row.client_id,
        clientName : row.clientName,
        subclient_id : row.subclient_id,
        subclientName : row.subclientName,
        colorTypes :row.colorType,
        comments :row.comment,
        tatstart:row.initiationDate,
        tatend:row.tatEndDate
      })          
      this.componentDetailsForVerificationService.setVerificationItem(caseDetails);
      this.router.navigate([`/home/inputqc/inputqccomponentlist`]);
    }
    
    findCases(){
      // this.caseUploadService.findAllCasesWithStatus('DE-COMPLETED',this.pageCount).subscribe(
        this.caseUploadService.findAllCasesForInputqc('DE-COMPLETED',this.pageCount).subscribe(
        response=>{
            this.totalCount = response.totalCount
            let resp = response.resp;
            // console.log(this.totalCount, resp);
            const inputqcList:any = resp.map((item:any) => ({
                case_id : item._id,
                caseId : item.caseId,
                candidateName : item.candidateName,
                cientId : item.client._id,
                clientName : item.client.name,
                subclient_id : item.subclient._id,
                subclientName : item.subclient.name,
                branch_id : item.subclient.branch._id,
                branchName : item.subclient.branch.name,
                initiationDate : item.initiationDate,
                tatEndDate : item.tatEndDate,
                dataEntryCompletionDate : item.dataEntryCompletionDate,
                colorType: item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].colorType  : "",
                comment:item.comments && item.comments.length > 0  ? item.comments[item.comments.length - 1].comment  : "",
                ...(item.package
                  ? {
                      packageName: item.package.name,
                      packageComponents: item.package.clientContractPackageComponents,
                      clientContractId: item.package.clientContract,
                    }
                  : {}),
                ...(item.profile
                  ? {
                      profileName: item.profile.name,
                      profileComponents: item.profile.clientContractProfileComponents,
                      clientContractId: item.profile.clientContract,
                    }
                  : {}),
            }))
            // console.log('inputqcList == ', inputqcList[0]);
                  
            this.dataSource.data = inputqcList;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        },
        error=>{
          console.error('Error reading list', error);
        }
      )          
    }
    getClassToApply(item: { tatEndDate: string | number | Date; }) {
      let currentDate = new Date()
      let tatEndDate = new Date(item.tatEndDate)
      let days = Math.floor((tatEndDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
      // let today = `${new Date().getDate()+1}/${new Date().getMonth()}`
      // let folloupDate = `${new Date(item.nextfollowupdate).getDate()}/${new Date(item.nextfollowupdate).getMonth()}`
      // console.log("NEXT Follow up:", today, folloupDate)
      if (days <= 7 && days > 0) {
        return 'goldenrod'
      } else if (days <= 0) {
        return 'red'
      }
      // else if(today <= 0){
      //   return 'DeepSkyBlue'
  
      // }
      else {
        return 'black'
      }
    }


         exportToExcel(){
        const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data);//converts a DOM TABLE element to a worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws,  'Checks in InceptionQC');
        
        /* save to file */
        XLSX.writeFile(wb, 'InceptionQC.xlsx');
      }
}
