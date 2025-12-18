import { Component } from '@angular/core';
// import { DashboardDataService } from '../service/dashboard-data.service';
import { DashboardDataService } from 'src/app/service/dashboard-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardAccessService } from 'src/app/service/dashboard-access.service';
const queryParams = new URLSearchParams(window.location.search);
console.log("queryParams", queryParams)
if (queryParams.has('userId') && queryParams.has('accessToken')) {
  localStorage.setItem('accessToken', queryParams.get('accessToken')??'' );
  localStorage.setItem('userId', queryParams.get('userId')?? '');
  localStorage.setItem('screens', queryParams.get('screens')?? '');
  console.log("Query parameters saved in localStorage:", queryParams.get('userId'), queryParams.get('accessToken'), queryParams.get('screens'));
}
if (queryParams.has('aisdigital')) {
  const aisdigitalValue = queryParams.get('aisdigital');
  console.log("aisdigital parameter value:", aisdigitalValue); // Log the value of aisdigital
  
  if (aisdigitalValue) {
    window.location.href = `https://uat-explorer.adamma.in/aisdigiapi/upload/${aisdigitalValue}`;
  } else {
    console.error("aisdigital value is not present in the query string");
  }
} else {
  console.error("aisdigital parameter not found in the query string");
}

export interface ClientDashboardCountData {
  insuffCasesCount: number;
  initiatedCasesCount: number;
  completedCasesCount: number;
  wipCasesCount: number;
  casesWithInTATCount: number;
  casesBeyondTATCount: number;
  casesUnderHoldCount: number;
}

export interface AnalystDashboardCountData {
    initiatedChecksCount: number,
    wipChecksCount: number,
    insuffChecksCount: number,
    checksWithinTATCount: number,
    checksBeyondTATCount: number,
    completedChecksCount: number,
    rejectedChecksCount: number,
    holdChecksCount: number
}

export interface TLDashboardCountData {
    initiatedChecksCount: number,
    wipChecksCount: number,
    insuffChecksCount: number,
    checksWithinTATCount: number,
    checksBeyondTATCount: number,
    completedChecksCount: number,
    rejectedChecksCount: number,
    checksGradedAsGreenCount: number,
    checksGradedAsRedCount: number,
    checksGradedAsAmberCount: number,
    holdChecksCount: number
}

export interface QcDashboardCountData {
  totalChecksInInterimQc: number,
  totalChecksCompletedInInterimQcMonthly: number,
  totalChecksInFinalQc: number,
  totalChecksCompletedInFinalQcMonthly: number,
  totalChecksGradedAsGreen: number,
  totalChecksGradedAsRed: number,
  totalChecksGradedAsAmber: number,
  checksRejectedInInterimQcMonthly: number,
  checksRejectedInFinalQcMonthly: number
}

export interface InceptionDashboardCountData {
  checksInceptedCount: number,
  checksAssignedCount: number,
  checksPendingAssignmentCount: number,
  checksUnderInceptionQcCount: number,
  checksUnderInceptionQcRejectedCount: number
}
@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent {
  upComingHoliday:any
  clientDashboardloading: boolean = false; // Add this property to control loader visibility
  analystDashboardloading: boolean = false;
  tlDashboardloading: boolean = false;
  qcDashboardloading: boolean = false;
  inceptionDashboardloading: boolean = false;

  clientDashboardCardItems:{title:string,count:number|null,headerHeight:string}[]=[
    {
      title:"Initiated Cases",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Completed Cases",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Wip Cases",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Hold Cases",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Insuff Cases",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Cases Within TAT",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Cases Beyond TAT",
      count:null,
      headerHeight:'60px'
    }
  ];

  analystDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
    {
      title:"Initiated Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"WIP Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Insuff Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Within TAT Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Beyond Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Completed Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Rejected Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Hold Checks",
      count:null,
      headerHeight:'60px'
    },
  ]

  
  tlDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
    {
      title:"Initiated Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"WIP Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Insuff Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Within TAT Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Beyond Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Completed Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Rejected Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Hold Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Green Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Red Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Amber Checks",
      count:null,
      headerHeight:'60px'
    },
  ]

  qcDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
    {
      title:"Checks In Interim QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Completed In Interim QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Rejected In Interim QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks In Final QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Completed In Final QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Rejected In Final QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Graded As Green",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Graded As Red",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Graded As Amber",
      count:null,
      headerHeight:'60px'
    }
  ]

  inceptionDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
    {
      title:"Checks Incepted",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Assigned",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Unassigned Checks",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Under Inception QC",
      count:null,
      headerHeight:'60px'
    },
    {
      title:"Checks Under Inception-QC-Rejected",
      count:null,
      headerHeight:'60px'
    }
  ];
  showClientDashboard:boolean=false
  showAnalystDashboard:boolean=false
  showTlDashboard:boolean=false
  showQualityDashboard:boolean=false
  showDataEntryDashboard:boolean=false
  // upComingHoliday:any
  constructor(
    private dashboardDataService:DashboardDataService,
    private dashboardAccessService:DashboardAccessService,
    private snackBar:MatSnackBar
  ) { }


  ngOnInit(): void {
    this.clientDashboardloading = true; // Add this property to control loader visibility
    this.analystDashboardloading = true;
    this.tlDashboardloading = true;
    this.qcDashboardloading = true;
    this.inceptionDashboardloading = true;
    this.dashboardAccessService.getUpcomingHoliday().subscribe(
      response=>{
       console.log("Response:",response[0] );
       
        this.upComingHoliday=response[0]
      }
    )

    this.dashboardAccessService.readAllForCurrentUser().subscribe(
      response=>{
        console.log('Response from dashboard access ',response)
        response.forEach(item=>{
          if(item.dashboard.code == 'MANAGMENT-001'){
            this.showClientDashboard = true
            this.getClientDashboardDetails()
          }
          if(item.dashboard.code == 'ANALYST-02'){
            this.showAnalystDashboard = true
            this.getAnalystDashboardDetails()
          }
          if(item.dashboard.code =='TL-01'){
            this.showTlDashboard = true
            ///////////TL Dashboard/////
            this.tlDashboardCountData();
            //////////TL dashboard/////
          }
          if(item.dashboard.code =='QUALITY-01'){
            this.showQualityDashboard= true
            this.getQcDashboardCountData()
          }
          if(item.dashboard.code =='DATAENTRY-01'){
            this.showDataEntryDashboard =true
            this.getDataEntryDashboardDetails()
          }

        })
      },
      error=>{
        this.showError("Error reading dashboards")
      }

    )
    
    // this.dashboardAccessService.getUpcomingHoliday().subscribe(
    //      response=>{
    //       console.log("response:",response[0]);
          
    //       //  this.upComingHoliday=response[0]
    //      }
    //    )
  








    

  }


  getClientDashboardDetails(){
    this.dashboardDataService.getClientDashboardCountData().subscribe((response:ClientDashboardCountData)=>{

      this.clientDashboardCardItems[0].count = response.initiatedCasesCount;
      this.clientDashboardCardItems[1].count = response.completedCasesCount;
      this.clientDashboardCardItems[2].count = response.wipCasesCount;
      this.clientDashboardCardItems[3].count = response.casesUnderHoldCount;
      this.clientDashboardCardItems[4].count = response.insuffCasesCount;
      this.clientDashboardCardItems[5].count = response.casesWithInTATCount;
      this.clientDashboardCardItems[6].count = response.casesBeyondTATCount;

      this.showMessage("case count for the current month fetched successfully");
    },(error)=>{
      this.showError("unexpected error has occured");
      console.log("error in getClientDashboardCountData:",error);
      
    }).add(()=>{
      this.clientDashboardloading = false;
    });

  }

  getAnalystDashboardDetails(){
    this.dashboardDataService.getAnalystDashboardCountData().subscribe((response:AnalystDashboardCountData) => {
      this.analystDashboardCardItems[0].count = response.initiatedChecksCount;
      this.analystDashboardCardItems[1].count = response.wipChecksCount;
      this.analystDashboardCardItems[2].count = response.insuffChecksCount;
      this.analystDashboardCardItems[3].count = response.checksWithinTATCount;
      this.analystDashboardCardItems[4].count = response.checksBeyondTATCount;
      this.analystDashboardCardItems[5].count = response.completedChecksCount;
      this.analystDashboardCardItems[6].count = response.rejectedChecksCount;
      this.analystDashboardCardItems[7].count = response.holdChecksCount;
      this.showMessage("checks count for the current month fetched successfully");


    },(error)=>{
      this.showError("unexpected error has occured");

      console.log("error in getClientDashboardCountData:",error);
      
    }).add(()=>{
      this.analystDashboardloading = false;
    })

  }

  tlDashboardCountData(){
    this.dashboardDataService.getTLDashboardCountData().subscribe((response:TLDashboardCountData) => {
      this.tlDashboardCardItems[0].count = response.initiatedChecksCount;
      this.tlDashboardCardItems[1].count = response.wipChecksCount;
      this.tlDashboardCardItems[2].count = response.insuffChecksCount;
      this.tlDashboardCardItems[3].count = response.checksWithinTATCount;
      this.tlDashboardCardItems[4].count = response.checksBeyondTATCount;
      this.tlDashboardCardItems[5].count = response.completedChecksCount;
      this.tlDashboardCardItems[6].count = response.rejectedChecksCount;
      this.tlDashboardCardItems[7].count = response.holdChecksCount;
      this.tlDashboardCardItems[8].count = response.checksGradedAsGreenCount;
      this.tlDashboardCardItems[9].count = response.checksGradedAsRedCount;
      this.tlDashboardCardItems[10].count = response.checksGradedAsAmberCount;
      this.showMessage("checks count for the current month fetched successfully");

    },(error)=>{
      this.showError("unexpected error has occured");

      console.log("error in getClientDashboardCountData:",error);
      
    }).add(()=>{
      this.tlDashboardloading = false;
    })

  }

  getQcDashboardCountData(){
    this.dashboardDataService.getQcDashboardCountData().subscribe((response:QcDashboardCountData) => {
      this.qcDashboardCardItems[0].count = response.totalChecksInInterimQc;
      this.qcDashboardCardItems[1].count = response.totalChecksCompletedInInterimQcMonthly;
      this.qcDashboardCardItems[2].count = response.checksRejectedInInterimQcMonthly;
      this.qcDashboardCardItems[3].count = response.totalChecksInFinalQc;
      this.qcDashboardCardItems[4].count = response.totalChecksCompletedInFinalQcMonthly;
      this.qcDashboardCardItems[5].count = response.checksRejectedInFinalQcMonthly;
      this.qcDashboardCardItems[6].count = response.totalChecksGradedAsGreen;
      this.qcDashboardCardItems[7].count = response.totalChecksGradedAsRed;
      this.qcDashboardCardItems[8].count = response.totalChecksGradedAsAmber;
      this.showMessage("checks count for the current month fetched successfully");
    },(error)=>{
      this.showError("unexpected error has occured");
      console.log("error in getClientDashboardCountData:",error);
    }).add(()=>{
      this.qcDashboardloading = false;
    })

  }
  getDataEntryDashboardDetails(){
    this.dashboardDataService.getInceptionDashboardData().subscribe((response:InceptionDashboardCountData) => {
      this.inceptionDashboardCardItems[0].count = response.checksInceptedCount;
      this.inceptionDashboardCardItems[1].count = response.checksAssignedCount;
      this.inceptionDashboardCardItems[2].count = response.checksPendingAssignmentCount;
      this.inceptionDashboardCardItems[3].count = response.checksUnderInceptionQcCount;
      this.inceptionDashboardCardItems[4].count = response.checksUnderInceptionQcRejectedCount;
      this.showMessage("checks count for the current month fetched successfully");
    },(error)=>{
      this.showError("unexpected error has occured");
      console.log("error in getClientDashboardCountData:",error);
    }).add(()=>{
      this.inceptionDashboardloading = false;
    })

  }

  showError(msg:string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showMessage(msg:string){
    this.snackBar.open(msg,'Success',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }

}


