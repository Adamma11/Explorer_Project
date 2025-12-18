// import {  OnDestroy } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import { Component, OnInit, HostListener } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { report } from 'process';
// import { DashboardAccessService } from 'src/app/service/dashboard-access.service';
// import { VibeReportService } from 'src/app/reports/service/vibe-report.service';
// import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
// import { UserService } from 'src/app/administration/service/user.service';
// import { UserRoleService } from 'src/app/administration/service/user-role.service';
//  import { Observable, interval, Subscription } from 'rxjs';
//  import { takeWhile } from 'rxjs/operators';
// import {ChartConfiguration,ChartOptions,ChartType} from "chart.js";
// import { CaseInitiationService } from 'src/app/service/case-initiation.service';
// import { AllComponentsDataService } from 'src/app/operations/service/all-components-data.service';
// import { forkJoin } from 'rxjs';
// import { MatTableDataSource } from '@angular/material/table';
// import {FormControl} from '@angular/forms';
// import {map, startWith} from 'rxjs/operators';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { MeetingService } from 'src/app/service/meeting.service';
// import { DashboardDataService } from 'src/app/service/dashboard-data.service';
// import { AnalystDashboardCountData, ClientDashboardCountData, TLDashboardCountData } from '../new-dashboard/new-dashboard.component';
// const queryParams = new URLSearchParams(window.location.search);
// console.log("queryParams", queryParams)
// if (queryParams.has('userId') && queryParams.has('accessToken')) {
//   localStorage.setItem('accessToken', queryParams.get('accessToken')??'' );
//   localStorage.setItem('userId', queryParams.get('userId')?? '');
//   localStorage.setItem('screens', queryParams.get('screens')?? '');
//   console.log("Query parameters saved in localStorage:", queryParams.get('userId'), queryParams.get('accessToken'), queryParams.get('screens'));
// }
// if (queryParams.has('aisdigital')) {
//   const aisdigitalValue = queryParams.get('aisdigital');
//   console.log("aisdigital parameter value:", aisdigitalValue); // Log the value of aisdigital
  
//   if (aisdigitalValue) {
//     window.location.href = `https://uat-explorer.adamma.in/aisdigiapi/upload/${aisdigitalValue}`;
//   } else {
//     console.error("aisdigital value is not present in the query string");
//   }
// } else {
//   console.error("aisdigital parameter not found in the query string");
// }
// Chart.register(...registerables);

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })




// export class DashboardComponent implements OnInit   {
//    /////////////////////New Client DAshboard New///////////////////
//    caseDataForDashboard: any;
//    public caseDataForDashboardLoading:boolean = true;
//    //case Inflow Outflow Chart
//    public caseInflowOutflowData!: ChartConfiguration<'line'>['data'];
//    public caseInflowOutflowOptions: ChartOptions<'line'> = {
//      responsive: false,
//      scales: this.getScales('Date', 'Cases'),
//    };
//    public caseInflowOutflowLegend = true;
//    public caseInflowOutflowLoading = true;
 
//    //pending Frequency Bucket
//    public pendingFrequencyBucketData!: ChartConfiguration<'pie'>['data'];
//    public pendingFrequencyBucketOptions: ChartOptions<'pie'> = {
//      responsive: false,
//    };
//    public pendingFrequencyBucketLegend = true;
//    public pendingFrequencyBucketLoading = true;
 
//    // Cases by grading color
//    public gradingColorData!: ChartConfiguration<'pie'>['data'];
//    public gradingColorOptions: ChartOptions<'pie'> = {
//      responsive: false,
//    };
//    public gradingColorLegend = true;
//    public gradingColorLoading = true;
 
//    //Case Initiation
//    public caseInitiationData!: ChartConfiguration<'bar'>['data'] | any;
//    public caseInitiationOptions!: ChartOptions<'bar'>;
//    public caseInitiationLegend = true;
//    public caseInitiationLoading = true;
//    public caseInitiationOverlay = true;
 
//    //Output Qc Completion
//    public outputQcCompletionData!:ChartConfiguration<'bar'>['data'] | any;
//    public outputQcCompletionOptions?:ChartOptions<'bar'>;
//    public outputQcCompletionLegend=true;
//    public outputQcCompletionLoading = true;
//    public OutputQcCompletionOverlay = true;
 
//    //Initiated Cases Checks
//    public initiatedCasesChecksData!:ChartConfiguration<'bar'>['data'];
//    public initiatedCasesChecksOptions?:ChartOptions<'bar'>;
//    public initiatedCasesChecksLegend=true;
//    public initiatedCasesChecksLoading = true;
//  displayedColumns=['serialNumber','discussionPoint','actionItem','responsibility','targetDate','status'];
//  dataSource = new MatTableDataSource();
//  noOfApprochedTatChecks!:number;
//  noOfBeyondTatChecks!:number;
 
//  public  noOfApproachedTATLoading: boolean = true;
//  public  noOfBeyondTATLoading:boolean = true;
//  noOfEffortsOnToday!:number;
//  public noOfEffortsOnTodayLoading:boolean = true;
 
       
 
//        public noOfEffortsPerDayData!: ChartConfiguration<'line'>['data'];
//        public noOfEffortsPerDayLoading = true;
//        public noOfEffortsPerDayDataOptions: ChartOptions<'line'> = {
//          responsive: false,
//          scales: this.getScales('Date', 'Cases'),
//        };
//        public noOfEffortsPerDayDataLegend = true;
       
//  tlPendingChecksCount!:number;
//  tlCompletedChecksCount!:number;
//  tlMentorPending!:number;
//  public tlPendingAndCompletedChecksForMonthCountLoading:boolean = true;
//  //////////TL dashboard/////////////////////////
//  // <!-- Managment level Dashboard  -->
//  ManagementcaseDataForDashboard: any;
//  ManagementFilteredCaseDataForDashboard:any;
//  public ManagementcaseDataForDashboardLoading:boolean = true;
//  //case Inflow Outflow Chart
//  public ManagementcaseInflowOutflowData!: ChartConfiguration<'line'>['data'];
//  public ManagementCaseInflowOutflowOptions: ChartOptions<'line'> = {
//    responsive: false,
//    scales: this.getManagmentScales('Date', 'Cases'),
//  };
//  public ManagementCaseInflowOutflowLegend = true;
//  public ManagementCaseInflowOutflowLoading = true;
 
//  //pending Frequency Bucket
//  public ManagementPendingFrequencyBucketData!: ChartConfiguration<'pie'>['data'];
//  public ManagementPendingFrequencyBucketOptions: ChartOptions<'pie'> = {
//    responsive: false,
//  };
//  public ManagementPendingFrequencyBucketLegend = true;
//  public ManagementPendingFrequencyBucketLoading = true;
 
//  // Cases by grading color
//  public ManagementGradingColorData!: ChartConfiguration<'pie'>['data'];
//  public ManagementGradingColorOptions: ChartOptions<'pie'> = {
//    responsive: false,
//  };
//  public ManagementGradingColorLegend = true;
//  public ManagementGradingColorLoading = true;
 
//  //Case Initiation
//  public ManagementCaseInitiationData: ChartConfiguration<'bar'>['data'] | any;
//  public ManagementCaseInitiationOptions!: ChartOptions<'bar'>;
//  public ManagementCaseInitiationLegend = true;
//  public ManagementCaseInitiationLoading = true;
//  public ManagementCaseInitiationOverlay = true;
 
//  //Output Qc Completion
//  public ManagementOutputQcCompletionData:ChartConfiguration<'bar'>['data'] | any;
//  public ManagementOutputQcCompletionOptions?:ChartOptions<'bar'>;
//  public ManagementOutputQcCompletionLegend=true;
//  public ManagementOutputQcCompletionLoading = true;
//  public ManagementOutputQcCompletionOverlay = true;
 
//  //Initiated Cases Checks
//  public ManagementInitiatedCasesChecksData!:ChartConfiguration<'bar'>['data'];
//  public ManagementInitiatedCasesChecksOptions?:ChartOptions<'bar'>;
//  public ManagementInitiatedCasesChecksLegend=true;
//  public ManagementInitiatedCasesChecksLoading = true;
 

//  ManagementClientNameControl = new FormControl('');
//  ManagementclientNames: string[] = [];
//  ManagementFilteredClientNames!: Observable<string[]>;
//  private ManagementSelectedClientId:string='';
//  private ManagementSelectedClientIds:string[]=[];
 
//  // <!-- Managment level Dashboard  -->
 
 
//  closedChecks!:number;
//  wipChecks!:number;
//  rejectedChecks!:number;
//  pendingChecks!:number;
//  insuffClearedChecks!:number;
//  public pendingChecksCountLoading:boolean = true;
//  public rejectedChecksCountLoading:boolean = true;
//  public wipChecksCountLoading:boolean = true;
//  public closedChecksCountLoading:boolean = true;
//  public insuffClearedChecksCountLoading:boolean = true;
 
//  //  Checks-Closed VS Pending
//  public checksVSPendingData!:ChartConfiguration<'bar'>['data'];
//  public checksVSPendingOptions?:ChartOptions<'bar'>;
//  public checksVSPendingLegend=true;
//  public checksVSPendingLoading=true;

 
 
 
//    userName=""
//    title = 'Initiations';  
//    type = 'ColumnChart'; 
//    mytitle ='Completed';
  
//    data:any = [];  
//    mytype = 'PieChart';
//    completeddata:any =[
 
//    ]
 
    
 
 
//  //  data =[]
//    columnNames = ['Name', 'Percentage'];  
//    options = {
//     legend: { position: 'none' },
//     is3D: true,
//     series: {
//       0: { color: '#ed7014' }, // Color for the first series (bar)
//       1: { color: '#ff0000' }, // Color for the second series (if applicable)
//       2: { color: '#00ff00' }, // Color for the third series (if applicable)
//       // Add more series as needed
//     }
//   };
//    options2 = { color: ['#ed7014', '#ed7014', '#ed7014'],is3D:true
//  };
//  options3 = {
//   color: ['#ed7014', '#ed7014', '#ed7014'],
//    title: 'Components Data',
//    pieHole:0.4
//  }
   
//    width = 480;  
//    height = 200; 
 
//    componentcount:any
//    componentcasescount:any
//    componentdayscount:any
//    analystcomponentcount:any
//    tlcomponentcount:any
//    componentNames:any
//    dataForChart:any
//    dataforpie:any
//    filteredData:any
//    allcomponents:any
//    showClientDashboard:boolean=false
//    showClientDashboardtwo:boolean=false
//    showClientDashboardthree:boolean=false
//    showAnalystDashboardtwo:boolean=false
//    showTlDashboard:boolean=false
//    showManagmentDashboard:boolean=false
//    showLeadershipDashboard:boolean=false
//    showLeadershipCompDashboard:boolean=false
//    showDataEntryDashboard:boolean=false
//    showAnalystDashboard:boolean=false
//    showTLDashboard:boolean=false
//    showProcessManagerDashboard:boolean=false
//    showQualityDashboard:boolean=false
//    showComplianceDashboard:boolean=false
 
 
//    completedCaseCount = 0
//    wipCaseCount = 0
//    insuffCaseCount = 0
//    initiatedCaseCount = 0
//    initiatedCaseTillNowCount = 0
//    greenCount = 0
//    amberCount = 0
//    redCount = 0
 
//    openingBalanceForLeadership = 0
//    initiatedCaseCountForLeadership = 0
//    completedCaseCountForLeadership = 0
//    completedCaseCountWithinTatForLeadership = 0
//    completedCaseCountBeyondTatForLeadership = 0
//    wipCaseCountForLeadership = 0
//    wipCaseCountWithinTatForLeadership = 0
//    wipCaseCountBeyondTatForLeadership = 0
//    insuffCaseCountForLeadership = 0
 
 
//    openingBalanceOfChecksForLeadership = 0
//    initiatedChecksCountForLeadership = 0
//    insufficientChecksCountForLeadership = 0
//    completedChecksCountForLeadership = 0
//    completedChecksWithinTatCountForLeadership = 0
//    completedChecksBeyondTatCountForLeadership = 0
//    wipChecksCountForLeadership = 0
//    wipChecksWithinTatCountForLeadership = 0
//    wipChecksBeyondTatCountForLeadership = 0
 
 
 
//    newInitiationsForDataEntryDashboard = 0
//    inputqcRejectionsForDataEntryDashboard = 0
//    inputqcAcceptanceForDataEntryDashboard = 0
 
//    openingBalanceOfChecksForAnalyst = 0
//    initiatedChecksCountForAnalyst = 0
//    completedChecksCountForAnalyst = 0
//    wipChecksCountForAnalyst = 0
 
//    openingBalanceOfChecksForTeamLead = 0
//    initiatedChecksCountForTeamLead = 0
//    completedChecksCountForTeamLead = 0
//    wipChecksCountForTeamLead = 0
   
//    openingBalanceOfChecksForProcessManager = 0
//    initiatedChecksCountForProcessManager = 0
//    completedChecksCountForProcessManager = 0
//    wipChecksCountForProcessManager = 0 

//    clientDashboardloading: boolean = false;
//    analystDashboardloading: boolean = false;
//    tlDashboardloading: boolean = false;

//    clientDashboardCardItems:{title:string,count:number|null,headerHeight:string}[]=[
//     {
//       title:"Initiated Cases",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Completed Cases",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Wip Cases",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Hold Cases",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Insuff Cases",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Cases Within TAT",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Cases Beyond TAT",
//       count:null,
//       headerHeight:'60px'
//     }
//   ];

//   analystDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
//     {
//       title:"Initiated Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"WIP Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Insuff Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Within TAT Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Beyond Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Completed Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Rejected Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Hold Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//   ]

  
//   tlDashboardCardItems:{title:string,count:number|null,headerHeight:string}[] = [
//     {
//       title:"Initiated Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"WIP Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Insuff Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Within TAT Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Beyond Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Completed Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Rejected Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Hold Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Green Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Red Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//     {
//       title:"Amber Checks",
//       count:null,
//       headerHeight:'60px'
//     },
//   ]



//   constructor(
//     private router:Router,
//     private dashboardAccessService:DashboardAccessService,
//     private dashboardDataService: DashboardDataService,
//     private caseUploadService:CaseUploadService,
//     private vibeReportService:VibeReportService,
//     private userService:UserService,
//     private userRoleService:UserRoleService,
//     private snackbar:MatSnackBar,
//     // private loginService: LoginService,
//     // private loginNewService: LoginNewService,
//     private caseInitiationService: CaseInitiationService,
//     private allComponentsDataService: AllComponentsDataService,
//     private meetingService:MeetingService
//   ){}
//   ngOnInit(): void {
//     ///MBRDI 20June2023
    
//         if (queryParams.has('userId') && queryParams.has('accessToken')) {
//           // this.login()
//           location.reload()
//         }
//     ///MBRDI 20June2023
    
//         this.dashboardAccessService.readAllForCurrentUser().subscribe(
//           response=>{
//             console.log('Response from dashboard access ',response)
//             response.forEach(item=>{
//               if(item.dashboard.code == 'CLIENT-01'){
//                 this.showClientDashboard = true
//                 this.getClientDashboardDetails()
//                 this.getInitiatedCasesTillNow()
//               }
//               if(item.dashboard.code == 'LEADERSHIP-01'){
//                 this.showLeadershipDashboard = true
//                 this.getLeadershipDashboardDetails()
    
//               }
//               if(item.dashboard.code == 'LEADERSHIPCOMP-01'){
//                 this.showLeadershipCompDashboard = true
//                 this.getTlComponentsDashboardDetails()
//                 this.getTlComponentsDashboardDetails()
//               }
//               if(item.dashboard.code == 'LEADERSHIPCOMP-01'){
//                 this.showLeadershipCompDashboard = true
//                 this.getComponentsDashboardDetails()
                
//               }
    
//               if(item.dashboard.code =='DATAENTRY-01'){
//                 this.showDataEntryDashboard =true
//                 this.getDataEntryDashboardDetails()
//               }
//               if(item.dashboard.code == 'ANALYST-01'){
//                 this.showAnalystDashboard = true
//                 this.getAnalystDashboardDetails()
//                 this.getAnalystComponentsDashboardDetails()
//               }
//               if (item.dashboard.code =='TL-01'){
//                 this.showTLDashboard = true
//                 this.getTeamLeadDashboardDetails()
//                 this.tlDashboardCountData()
//               }
//               if(item.dashboard.code =='PM-01'){
//                 this.showProcessManagerDashboard = true
//                 this.getProcessManagerDashboardDetails()
//               }
//               if(item.dashboard.code =='QUALITY-01'){
//                 this.showQualityDashboard= true
//               }
//               if(item.dashboard.code =='COMP-01'){
//                 this.showComplianceDashboard= true
//               }  
//               if(item.dashboard.code =='CLIENT-02'){
//                 this.showClientDashboardtwo = true
//                 this.getComponentsDaysDetails()
//                 this.getComponentsCasesDetails()
//                 this.getcountOfCompletedCases()
//               }         
//               if(item.dashboard.code =='CLIENT-03'){
//                 this.showClientDashboardthree = true
//                 this.getInflowsAndOutflowsPerDay();
//                 this.getPendingFrequencyBucketDetails();
//                 this.getCasesBreakdown();
//                 this.getWipSummary();
//                 this.getCaseDataForDashboard();
//                 this.getClientPendingFrequencyBucket();
//                 this.getLastSixMonthsCaseInitiationCount();
//                 this.getLastSixMonthsOutputQcCompletionCount();
//                 this.getLastSixMonthsInitiatedCasesChecksCount();
                 
    
//                 this.getAllCrmMeetingDocsUsingLogedInUserId();
                 
    
//               } 
//               if(item.dashboard.code =='ANALYST-02'){
//                 this.showAnalystDashboardtwo = true
//                 ///////New Analyst //////
//                 this.getAnalystDashboardDetails()
//                 this.prepareChartForChecksClosedVsPending();
//                 this.rejectedChecksCount();
//                 this.wipChecksCount();
//                 this.insuffClearedChecksCount();
//                 forkJoin([
//                   this.closedChecksCount(),
//                   this.pendingChecksCount()
//                 ]).subscribe(([closedChecks,pendingChecks])=>{
//                          this.closedChecks = closedChecks;
//                          this.pendingChecks = pendingChecks;
//                          this.closedChecksCountLoading=false;
//                          this.pendingChecksCountLoading=false;
//                          this.prepareChartForChecksClosedVsPending();
            
//                 })
//                 this.getNoOfApproachedTatChecksForAnalyst();
//                 this.getNoOfEffortsOnTodayForAnalyst()
//                 this.getNoOfBeyondTatChecksForAnalyst();
//                 this.getNoOfEffortsPerDayForAnalyst();
//                 /////////////////////////
//               }  
//               if(item.dashboard.code =='TLS-001'){
//                 this.showTlDashboard = true
//                 ///////////TL Dashboard/////
//                 this.tlPendingAndCompletedChecksForTheMonthCount();
//                 //////////TL dashboard/////
//               }
//               if(item.dashboard.code =='MANAGMENT-001'){
//                 this.showManagmentDashboard = true
//                 this.getClientDashboardDetails()
//                 this.managementGetInflowsAndOutflowsPerDay();
//                 this.managementGetPendingFrequencyBucketDetails();
//                 this.managemenGetCasesBreakdown();
//                 this.managementGetWipSummary();
//                 this.managementGetCaseDataForDashboard();
//                 this.managementGetClientPendingFrequencyBucket();
//                 this.managementGetLastSixMonthsCaseInitiationCount();
//                 this.managementGetLastSixMonthsOutputQcCompletionCount();
//                 this.managementGetLastSixMonthsInitiatedCasesChecksCount();
//               }
     
//             })
//           },
//           error=>{
//             this.showError("Error reading dashboards")
//           }
    
//         )
//         // this.getUserName()
//         this.getDataForInitiationChart()
//         this.getDataForCompletedChart()
//         // this.getcountOfCompletedCases()
//         this.getcompchart()
//       }

//       getDataForInitiationChart(){
//         this.caseUploadService.getLastSixmonthsCount().subscribe(
//           response=>{
//             //console.log("Response from sixmonths count is ",response)
//             this.data = response
//           },
//           error=>{
//             // this.showError("Error fetching six month's data")
//           }
//         )
   
//       }


//       getcompchart(){
//         this.caseUploadService.componentcount().subscribe(
//           response =>{
//             console.log(response)
//             this.filteredData = response ;
//             this.dataForChart = response.map(item=>{
//               return [item.compName, item.count]
//             })
//             console.log("dataforchart",this.dataForChart)
//             console.log(this.mytype)
//           },
//           error=>{
//             //console.log("Error getting the count")
//           }
//         ) 
//       }

//       getFirstMonthData(){
//         //    let currData = []
//             let promise = new Promise((resolve,reject)=>{
//               this.caseUploadService.countCasesBetweenDates("2021-05-01","2021-05-31","").subscribe(
//                 (response)=>{
//                   this.data.push(['May', response.count])
//                   //console.log("April Data added",response.count)
//                   resolve(true)
//                 },
//                 error=>{
//                   resolve(true)
//                    this.showError("Error fethcing data for the chart")
//                 }
//               )   
//             })
//             return promise
//           }
//           getSecondMonthData(){
//             //    let currData = []
//                 let promise = new Promise((resolve,reject)=>{    
//                 this.caseUploadService.countCasesBetweenDates("2021-06-01","2021-06-30","").subscribe(
//                   response=>{
//                     this.data.push(['June',response.count])
//                     //console.log("May Data added")        
//                     resolve(true)
//                   },
//                   error=>{
//                     resolve(true)
//                   })
//                 })
//                 return promise
//               }

//               getThirdMonthData(){
//                 //    let  currData=[]
//                     let promise = new Promise((resolve,reject)=>{
//                       this.caseUploadService.countCasesBetweenDates("2021-07-01","2021-07-31","").subscribe(
//                         response=>{
//                           this.data.push(['July',response.count])
//                           //console.log("June Data added")          
//                           resolve(true)
//                         },
//                         error=>{
//                           this.showError("Error fethcing data for the chart")
//                           resolve(true)
//                         })                 
//                     })
//                     return promise
//                   }
//                   getFourthMonthData(){
//                 //    let currData = []
//                     let promise = new Promise((resolve,reject)=>{
//                       this.caseUploadService.countCasesBetweenDates("2021-08-01","2021-08-31","").subscribe(
//                         response=>{
//                           this.data.push(['August',response.count])
//                           //console.log("July Data added")          
//                           resolve(true)
//                         },
//                         error=>{
//                           resolve(true)
//                         })     
//                     })
//                     return promise
//                   }
//                   getFifthMonthData(){
//                 //    let currData = []
//                     let promise = new Promise((resolve,reject)=>{
//                       this.caseUploadService.countCasesBetweenDates("2021-09-01","2021-09-30","").subscribe(
//                         response=>{
//                           this.data.push(['September',response.count])    
//                           //console.log("August Data added")          
//                           resolve(true)
//                         },
//                         error=>{
//                           this.showError("Error fethcing data for the chart")          
//                           resolve(true)
//                         })      
//                     })
//                     return promise
//                   }
//                   getSixthMonthData(){
//                 //    let currData=[]
//                     let promise = new Promise((resolve,reject)=>{
//                       this.caseUploadService.countCasesBetweenDates("2021-10-01","2021-10-31","").subscribe(
//                         response=>{
//                           this.data.push(['October',response.count])
//                           //console.log("September Data added")          
//                           resolve(true)
//                         },
//                         errror=>{
//                           this.showError("Error fethcing data for the chart")
//                           resolve(true)
//                         })                        
//                     })
//                     return promise
//                   }
                  
//                   // getClientDashboardDetails(){
//                   //   let fromDate = new Date();
//                   //   let month = fromDate.getMonth() + 1
//                   //   let year = fromDate.getFullYear()
//                   //   let monthString = ""
//                   //   //console.log("Month while getting client dash boards is ",month)
//                   //   if(month < 10){
//                   //     monthString = "0" + month 
//                   //   }else{
//                   //     monthString = month.toString()
//                   //   }
//                   //   let startDate = "01"
//                   //   let endDate = "30"
//                   //   if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
//                   //     endDate = "31"
//                   //   }
//                   //   if(month==2){
//                   //     if(year%4 == 0){
//                   //       endDate="29"
//                   //     }else{
//                   //       endDate="28"
//                   //     }
//                   //   }
//                   //   //console.log("Start Date is ",year+monthString+startDate)
//                   //   //console.log("End Date is ",year+monthString+endDate)
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"COMPLETED").subscribe(
//                   //     response=>{
//                   //       this.completedCaseCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"WIP").subscribe(
//                   //     response=>{
//                   //       this.wipCaseCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )        
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"INSUF").subscribe(
//                   //     response=>{
//                   //       this.insuffCaseCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )    
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"").subscribe(
//                   //     response=>{
//                   //       this.initiatedCaseCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )        
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"GREEN").subscribe(
//                   //     response=>{
//                   //       this.greenCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )            
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"AMBER").subscribe(
//                   //     response=>{
//                   //       this.amberCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )                
//                   //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"RED").subscribe(
//                   //     response=>{
//                   //       this.redCount = response.count
//                   //     },
//                   //     error=>{
//                   //       //console.log("Error getting the count")
//                   //     }
//                   //   )                    
//                   // }

//                     getClientDashboardDetails(){
//                       this.dashboardDataService.getClientDashboardCountData().subscribe((response:ClientDashboardCountData)=>{
                  
//                         this.clientDashboardCardItems[0].count = response.initiatedCasesCount;
//                         this.clientDashboardCardItems[1].count = response.completedCasesCount;
//                         this.clientDashboardCardItems[2].count = response.wipCasesCount;
//                         this.clientDashboardCardItems[3].count = response.casesUnderHoldCount;
//                         this.clientDashboardCardItems[4].count = response.insuffCasesCount;
//                         this.clientDashboardCardItems[5].count = response.casesWithInTATCount;
//                         this.clientDashboardCardItems[6].count = response.casesBeyondTATCount;
                  
//                         this.showMessage("case count for the current month fetched successfully");
//                       },(error)=>{
//                         this.showError("unexpected error has occured");
//                         console.log("error in getClientDashboardCountData:",error);
                        
//                       }).add(()=>{
//                         this.clientDashboardloading = false;
//                       });
                  
//                     }


//                   getLeadershipDashboardDetails(){
//                     let fromDate = new Date();
//                     let month = fromDate.getMonth() + 1
//                     let year = fromDate.getFullYear()
//                     let monthString = ""
//                     if(month < 10){
//                       monthString = "0" + month 
//                     }else{
//                       monthString = month.toString()
//                     }
//                     let startDate = "01"
//                     let endDate = "30"
//                     if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
//                       endDate = "31"
//                     }
//                     if(month==2){
//                       if(year%4 == 0){
//                         endDate="29"
//                       }else{
//                         endDate="28"
//                       }
//                     }
//                     //console.log("Start Date is ",year+monthString+startDate)
//                     //console.log("End Date is ",year+monthString+endDate)
//                     this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"COMPLETED").subscribe(
//                       response=>{
//                         this.completedCaseCountForLeadership = response.count
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )
//                     this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"WIP").subscribe(
//                       response=>{
//                         this.wipCaseCountForLeadership = response.count
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )        
//                     this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"INSUF").subscribe(
//                       response=>{
//                         this.insuffCaseCountForLeadership = response.count
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )    
//                     this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"").subscribe(
//                       response=>{
//                         this.initiatedCaseCountForLeadership = response.count
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )        
//                     this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
//                       response=>{
//                         this.openingBalanceOfChecksForLeadership =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
//                       response=>{
//                         this.initiatedChecksCountForLeadership =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )      
//                     this.vibeReportService.getCompletedChecksOperationStats().subscribe(
//                       response=>{
//                         this.completedChecksCountForLeadership = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getWIPChecksOperationStats().subscribe(
//                       response=>{
//                         this.wipChecksCountForLeadership = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getInsufChecksOperationStats().subscribe(
//                       response=>{
//                         this.insufficientChecksCountForLeadership = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }    
//                     )
//                   }  
//                   getDataEntryDashboardDetails(){
//                     this.vibeReportService.getDataEntryNewInitiationsDashboard().subscribe(
//                       response=>{
//                         this.newInitiationsForDataEntryDashboard = response.count
//                       },
//                       error=>{
//                         //console.log("Data Entry Initiations Error  is ",error)
//                         this.showError("Error getting data entry new initiations for dashboard")
//                       }
                      
//                     )
//                     this.vibeReportService.getInputqcRejectionsForDashboard().subscribe(
//                       response=>{
//                         this.inputqcRejectionsForDataEntryDashboard = response.count
//                       },
//                       error=>{
//                         //console.log("Data Entry Rejections Error  is ",error)
//                         this.showError("Error data entry rejections for dashboard")
//                       }    
//                     )
//                     this.vibeReportService.getInputqcAcceptanceForDashboard().subscribe(
//                       response=>{
//                         this.inputqcAcceptanceForDataEntryDashboard = response.count
//                       },
//                       error=>{
//                         //console.log("Data Entry Inputqc Acceptance Error  is ",error)
//                         this.showError("Error getting Inputqc Acceptance for dashboard")
//                       }    
//                     )    
//                   }


//                   // getAnalystDashboardDetails(){
                
//                   //   this.vibeReportService.getOpeningBalanceChecksOperationStatsForAnalyst().subscribe(
//                   //     response=>{
//                   //       this.openingBalanceOfChecksForAnalyst =response.count
//                   //     },
//                   //     error=>{
//                   //       this.showError("Error in getting initiated cases for operations")
//                   //     }
//                   //   )          
//                   //   this.vibeReportService.getInitiatedChecksOperationStatsForAnalyst().subscribe(
//                   //     response=>{
//                   //       this.initiatedChecksCountForAnalyst =response.count
//                   //     },
//                   //     error=>{
//                   //       this.showError("Error in getting initiated cases for operations")
//                   //     }
//                   //   )      
//                   //   this.vibeReportService.getCompletedChecksOperationStatsForAnalyst().subscribe(
//                   //     response=>{
//                   //       this.completedChecksCountForAnalyst = response.count
//                   //     },
//                   //     error=>{
//                   //       this.showError("Error in getting initiated cases for operations")
//                   //     }
//                   //   )          
//                   //   this.vibeReportService.getWIPChecksOperationStatsForAnalyst( ).subscribe(
//                   //     response=>{
//                   //       this.wipChecksCountForAnalyst = response.count
//                   //     },
//                   //     error=>{
//                   //       this.showError("Error in getting initiated cases for operations")
//                   //     }
//                   //   )     
//                   // }

//                     getAnalystDashboardDetails(){
//                       this.dashboardDataService.getAnalystDashboardCountData().subscribe((response:AnalystDashboardCountData) => {
//                         console.log("DATA FOR ANALYST",response);
                        
//                         this.analystDashboardCardItems[0].count = response.initiatedChecksCount;
//                         this.analystDashboardCardItems[1].count = response.wipChecksCount;
//                         this.analystDashboardCardItems[2].count = response.insuffChecksCount;
//                         this.analystDashboardCardItems[3].count = response.checksWithinTATCount;
//                         this.analystDashboardCardItems[4].count = response.checksBeyondTATCount;
//                         this.analystDashboardCardItems[5].count = response.completedChecksCount;
//                         this.analystDashboardCardItems[6].count = response.rejectedChecksCount;
//                         this.analystDashboardCardItems[7].count = response.holdChecksCount;
//                         this.showMessage("checks count for the current month fetched successfully");
                  
                  
//                       },(error)=>{
//                         this.showError("unexpected error has occured");
                  
//                         console.log("error in getClientDashboardCountData:",error);
                        
//                       }).add(()=>{
//                         this.analystDashboardloading = false;
//                       })
                  
//                     }

//                       tlDashboardCountData(){
//                         this.dashboardDataService.getTLDashboardCountData().subscribe((response:TLDashboardCountData) => {
//                           this.tlDashboardCardItems[0].count = response.initiatedChecksCount;
//                           this.tlDashboardCardItems[1].count = response.wipChecksCount;
//                           this.tlDashboardCardItems[2].count = response.insuffChecksCount;
//                           this.tlDashboardCardItems[3].count = response.checksWithinTATCount;
//                           this.tlDashboardCardItems[4].count = response.checksBeyondTATCount;
//                           this.tlDashboardCardItems[5].count = response.completedChecksCount;
//                           this.tlDashboardCardItems[6].count = response.rejectedChecksCount;
//                           this.tlDashboardCardItems[7].count = response.holdChecksCount;
//                           this.tlDashboardCardItems[8].count = response.checksGradedAsGreenCount;
//                           this.tlDashboardCardItems[9].count = response.checksGradedAsRedCount;
//                           this.tlDashboardCardItems[10].count = response.checksGradedAsAmberCount;
//                           this.showMessage("checks count for the current month fetched successfully");
                    
//                         },(error)=>{
//                           this.showError("unexpected error has occured");
                    
//                           console.log("error in getClientDashboardCountData:",error);
                          
//                         }).add(()=>{
//                           this.tlDashboardloading = false;
//                         })
                    
//                       }


//                   getTeamLeadDashboardDetails(){
//                     this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
//                       response=>{
//                         this.openingBalanceOfChecksForTeamLead =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
//                       response=>{
//                         this.initiatedChecksCountForTeamLead =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )      
//                     this.vibeReportService.getCompletedChecksOperationStats().subscribe(
//                       response=>{
//                         this.completedChecksCountForTeamLead = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getWIPChecksOperationStats().subscribe(
//                       response=>{
//                         this.wipChecksCountForTeamLead = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )             
//                   }
//                   getProcessManagerDashboardDetails(){
//                     this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
//                       response=>{
//                         this.openingBalanceOfChecksForProcessManager =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
//                       response=>{
//                         this.initiatedChecksCountForProcessManager =response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )      
//                     this.vibeReportService.getCompletedChecksOperationStats().subscribe(
//                       response=>{
//                         this.completedChecksCountForProcessManager = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )          
//                     this.vibeReportService.getWIPChecksOperationStats().subscribe(
//                       response=>{
//                         this.wipChecksCountForProcessManager = response.count
//                       },
//                       error=>{
//                         this.showError("Error in getting initiated cases for operations")
//                       }
//                     )                 
//                   }
//                   clientInitiatedCasesButtonClicked(){
//                     this.router.navigate(['crm/casestatus/initiationDate'])    
//                   }  
//                   clientWIPCasesButtonClicked(){
//                     this.router.navigate(['crm/casestatus/pending'])    
//                   }
//                   clientInsuffCasesButtonClicked(){
//                     this.router.navigate(['insufficiencies/clientinsuflist'])
//                   }
//                   clientCompletedCasesButtonClicked(){
//                     this.router.navigate(['crm/casestatus/completionDate'])
//                   }
//                   callTLPending(type:any){
//                     if(type == 'NEW'){
//                       this.router.navigate([`reports/tlpendingreport/pending`])      
//                     }else if(type == 'INSUF'){
//                       this.router.navigate(['insufficiencies/scrutinyinsuflist'])
//                     }else if(type == 'PENDING'){
//                       this.router.navigate([`reports/tlpendingreport/pending`])
//                     }else if(type == 'COMPLETED'){
//                       this.router.navigate([`reports/tlpendingreport/completed`])
//                     }
//                   }
//                   uploadACase(){
//                     this.router.navigate([`upload/caseupload`])
//                   }
//                   clientInsufList(){
//                     this.router.navigate([`insufficiencies/clientinsuflist`])
//                   }
//                   caseStatus(){
//                     this.router.navigate([`crm/casestatus`])
//                   }
//                   showError(msg:any){
//                     this.snackbar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
//                   }
//                   showMessage(msg:any){
//                     this.snackbar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
//                   }  
                
//                   //new 09-feb23
//                  getComponentsDashboardDetails(){
                
                           
//                   this.caseUploadService.componentcount().subscribe(
//                     response=>{
//                       console.log(response)
//                       this.componentcount = response
                  
//                     },
//                     error=>{
//                       //console.log("Error getting the count")
//                     }
//                   )                
                                 
//                 }
//                 // tl completed count 
//                 getTlComponentsDashboardDetails(){
                
                           
//                   this.caseUploadService.TlCompletedcompcount().subscribe(
//                     response=>{
//                       console.log(response)
//                       this.tlcomponentcount = response
                  
//                     },
//                     error=>{
//                       //console.log("Error getting the count")
//                     }
//                   )                
//                   }
//                 getAnalystComponentsDashboardDetails(){
                
                           
//                   this.caseUploadService.analystcomponentcount().subscribe(
//                     response=>{
//                       console.log(response)
//                       this.analystcomponentcount = response
                  
//                     },
//                     error=>{
//                       //console.log("Error getting the count")
//                     }
//                   )                
//                   }
                
//                   getInitiatedCasesTillNow(){
//                     this.caseUploadService.InitiatedCasesTillNow("").subscribe(
//                       response=>{
//                         this.initiatedCaseTillNowCount = response.count
//                       },
//                       error=>{
//                         console.log("Error getting the count", this.initiatedCaseTillNowCount)
//                       }
//                     )  
//                   }
                
//                   getDataForCompletedChart(){
//                     this.caseUploadService.getLastSixMonthsCompletedCase().subscribe(
//                       response=>{
//                         this.completeddata = response
//                         // console.log("shoaib", response)
//                       },
//                       error=>{
//                         // this.showError("Error fetching six month's data")
//                       }
//                     )
                
//                   }
                
//                   getcountOfCompletedCases(){
//                     this.caseUploadService.getCompletedCasescount().subscribe(
//                       response=>{
//                         // this.dataforpie 
//                         console.log(response)
//                         this.dataforpie = response.map(item=>{
//                           return [item.colorName, item.count]
//                         })
//                         console.log("dataforpie  of",this.dataforpie)
//                         // console.log(this.mytype)= response
//                         // console.log("Ahmed", response)
//                       },
//                       error=>{
//                         // this.showError("Error fetching six month's data")
//                       }
//                     )
                
//                   }
                
//                   getComponentsDaysDetails(){
                
                           
//                     this.caseUploadService.componentdayscount().subscribe(
//                       response=>{
//                         console.log("ResponseDays:",response)
//                         this.componentdayscount = response
                    
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )                
                                   
//                   }
                
//                   getComponentsCasesDetails(){
                
                           
//                     this.caseUploadService.componentcasescount().subscribe(
//                       response=>{
//                         console.log("caseRatio: ",response)
//                          this.allcomponents = Object.keys(response)
                
//                         this.componentcasescount = response
                    
//                       },
//                       error=>{
//                         //console.log("Error getting the count")
//                       }
//                     )                
                                   
//                   }
                
                 
              
//                   //////////////New client dashboard New/////////////////////
//                   getInflowsAndOutflowsPerDay(): void {
//                     this.caseUploadService.getInflowsAndOutflowsPerDay().subscribe({
//                       next: (response: any) => {
//                         const newLineChartData: ChartConfiguration<'line'>['data'] = {
//                           labels:
//                             response.length && response[0].data.length
//                               ? response[0].data.map((item:any) => item.x)
//                               : [],
//                           datasets: response.map((item:any) => ({
//                             data: item.data.map((dataItem:any) => dataItem.y.length),
//                             label: item.id,
//                             fill: true,
//                             tension: 0.5,
//                             borderColor: 'black',
//                             backgroundColor: item.color,
//                           })),
//                         };
                
//                         this.caseInflowOutflowData = newLineChartData;
//                         this.caseInflowOutflowLoading = false; // Set loading to false when data is loaded
//                       },
//                       error: (error) => {
//                         console.log('error in getInflowsAndOutflowsPerDay', error);
//                       },
//                     });
//                   }
//                   getPendingFrequencyBucketDetails(): void {
//                     this.caseUploadService.getPendingFrequencyBucketDetails(null).subscribe({
//                       next: (response:any) => {
//                         const pendingFrequencyBucketKeys = Object.keys(response);
//                         const pendingFrequencyBucketLabels = pendingFrequencyBucketKeys.length
//                           ? pendingFrequencyBucketKeys.filter((item) => item != 'Total')
//                           : [];
                
//                         const pendingFrequencyBucketData: ChartConfiguration<'pie'>['data'] = {
//                           labels: pendingFrequencyBucketLabels,
//                           datasets: [
//                             {
//                               data: pendingFrequencyBucketLabels.map(
//                                 (item) => response[item].length
//                               ),
//                               backgroundColor: [
//                                 '#080',
//                                 '#26D9A9',
//                                 '#FFBF00',
//                                 'orange',
//                                 'pink',
//                                 '#ed7014',
//                               ],
//                               hoverBackgroundColor: [
//                                 'lightcoral',
//                                 'lightgreen',
//                                 'lightyellow',
//                                 'lightsalmon',
//                                 'lightpink',
//                                 'lightblue',
//                               ],
//                               hoverOffset: 4,
//                             },
//                           ],
//                         };
//                         this.pendingFrequencyBucketData = pendingFrequencyBucketData;
//                         this.pendingFrequencyBucketLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in getPendingFrequencyBucketDetails', error);
//                       },
//                     });
//                   }
//                   getCasesBreakdown(): void {
//                     this.caseUploadService.getCasesBreakdown(null).subscribe({
//                       next: (response:any) => {
//                         const gradingColorData: ChartConfiguration<'pie'>['data'] = {
//                           labels: ['Green', 'Red', 'Amber'],
//                           datasets: [
//                             {
//                               data: [
//                                 response['greenCasesCount'],
//                                 response['redCasesCount'],
//                                 response['amberCasesCount'],
//                               ],
//                               backgroundColor: ['#080', '#F00', '#FFBF00'],
//                               hoverOffset: 4,
//                             },
//                           ],
//                         };
//                         this.gradingColorData = gradingColorData;
//                         this.gradingColorLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in getCasesBreakdown', error);
//                       },
//                     });
//                   }
//                   getWipSummary(): void {
//                     this.caseUploadService.getWipSummary(null).subscribe({
//                       next: (response) => {
//                         // console.log("getWipSummary response",response);
//                       },
//                       error: (error) => {
//                         console.log('error in getWipSummary', error);
//                       },
//                     });
//                   }
//                   getCaseDataForDashboard(): void {
//                     this.caseUploadService.getCaseDataForDashboard().subscribe({
//                       next: (response) => {
//                         console.log('getCaseDataForDashboard response', response);
//                         this.caseDataForDashboard = response;
//                         this.caseDataForDashboardLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in getCaseDataForDashboard', error);
//                       },
//                     });
//                   }
                
//                   getClientPendingFrequencyBucket(): void {
//                     this.caseUploadService.getClientPendingFrequencyBucket().subscribe({
//                       next: (response) => {
//                         console.log('getClientPendingFrequencyBucket response', response);
//                       },
//                       error: (error) => {
//                         console.log('error in getClientPendingFrequencyBucket', error);
//                         this.showError(
//                           'error while fetching client pending frequency bucket data'
//                         );
//                       },
//                     });
//                   }
                
//                   //CASE INITIATION
                
//                   onMonthSelectForCaseInitiation(event: any) {
//                     const month = this.caseInitiationData.labels[event.active[0].index];
                
//                     if (month) {
//                       this.caseInitiationOverlay = false;
                
//                       // Use setTimeout to delay the loading state update
//                       setTimeout(() => {
//                         this.caseInitiationLoading = true;
                
//                         this.caseInitiationService
//                           .getDateWiseCaseInitiationData(month as string)
//                           .subscribe(
//                             (response) => {
//                               const updatedCaseInitiationData: ChartConfiguration<'bar'>['data'] =
//                                 {
//                                   labels: response.map((item:any) => item[0]),
//                                   datasets: [
//                                     {
//                                       data: response.map((item:any) => item[1]),
//                                       label: 'Initiated Cases',
//                                       backgroundColor: ['#ed7014'],
//                                       hoverBackgroundColor: ['#ADD8F6'],
//                                     },
//                                   ],
//                                 };
                
//                               // Update the chart data
//                               this.caseInitiationData = updatedCaseInitiationData;
                
//                               const updateCaseInitiationOptions: ChartOptions<'bar'> = {
//                                 responsive: false,
//                                 scales: this.getScales('Date', 'Cases'),
//                               };
//                               this.caseInitiationOptions = updateCaseInitiationOptions;
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.caseInitiationLoading = false;
//                               }, 0);
//                             },
//                             (error) => {
//                               console.log(
//                                 'Error while fetching date wise case initiation data',
//                                 error
//                               );
//                               this.showError(
//                                 'Error while fetching date wise case initiation data'
//                               );
                
//                               // Ensure that loading is set to false even in case of an error
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.caseInitiationLoading = false;
//                               }, 0);
//                             }
//                           );
//                       }, 0);
//                     }
//                   }
//                   onMonthSelectForOutputQcCompletion(event: any) {
//                     const month = this.outputQcCompletionData.labels[event.active[0].index] as string;
                
//                     if (month) {
//                       this.OutputQcCompletionOverlay = false;
                
//                       // Use setTimeout to delay the loading state update
//                       setTimeout(() => {
//                         this.outputQcCompletionLoading = true;
                
//                         this.caseInitiationService
//                           .getDateWiseCaseOutputQcCompletionCount(month)
//                           .subscribe(
//                             (response) => {
//                               const updatedOutputQcCompletionData: ChartConfiguration<'bar'>['data'] =
//                                 {
//                                   labels: response.map((item:any) => item[0]),
//                                   datasets: [
//                                     {
//                                       data: response.map((item:any) => item[1]),
//                                       label: 'Output-QC Completed Cases',
//                                       backgroundColor: ['#ed7014'],
//                                       hoverBackgroundColor: ['#ADD8F6'],
//                                     },
//                                   ],
//                                 };
                
//                               // Update the chart data
//                               this.outputQcCompletionData = updatedOutputQcCompletionData;
                
//                               const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
//                                 responsive: false,
//                                 scales: this.getScales('Date', 'Cases'),
//                               };
//                               this.outputQcCompletionOptions = updateOutputQcCompletedOptions;
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.outputQcCompletionLoading = false;
//                               }, 0);
//                             },
//                             (error) => {
//                               console.log(
//                                 'Error in onMonthSelectForOutputQcCompletion',
//                                 error
//                               );
//                               this.showError(
//                                 'Error while fetching date wise output qc completion data'
//                               );
                
//                               // Ensure that loading is set to false even in case of an error
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.outputQcCompletionLoading = false;
//                               }, 0);
//                             }
//                           );
//                       }, 0);
//                     }
//                   }
                
//                   getLastSixMonthsCaseInitiationCount() {
//                     this.caseInitiationLoading = true;
//                     this.caseInitiationOverlay = true;
//                     this.caseInitiationService.getLastSixMonthsCaseInitiationCount().subscribe(
//                       (response) => {
//                         const caseInitiationData: ChartConfiguration<'bar'>['data'] = {
//                           labels: response.map((item:any) => item[0]),
//                           datasets: [
//                             {
//                               data: response.map((item:any) => item[1]),
//                               label: 'Initiated Cases',
//                               backgroundColor: ['#ed7014'],
//                               hoverBackgroundColor: ['#ADD8F6'],
//                             },
//                           ],
//                         };
//                         this.caseInitiationData = caseInitiationData;
                
//                         const updateCaseInitiationOptions: ChartOptions<'bar'> = {
//                           responsive: false,
//                           scales: this.getScales('Month', 'Cases'),
//                         };
//                         this.caseInitiationOptions = updateCaseInitiationOptions;
//                         this.caseInitiationLoading = false;
//                       },
//                       (error) => {
//                         console.log(
//                           'Error while fetching last six months case initiation data',
//                           error
//                         );
//                         // this.showError(
//                         //   'Error while fetching last six months case initiation data'
//                         // );
//                       }
//                     );
//                   }
                
//                   getLastSixMonthsOutputQcCompletionCount() {
//                     this.outputQcCompletionLoading = true;
//                     this.OutputQcCompletionOverlay = true;
//                     this.caseInitiationService
//                       .getLastSixMonthsOutputQcCompletionCount()
//                       .subscribe(
//                         (response) => {
//                           const updateOutputQcCompletedData: ChartConfiguration<'bar'>['data'] = {
//                             labels: response.map((item:any) => item[0]),
//                             datasets: [
//                               {
//                                 data: response.map((item:any) => item[1]),
//                                 label: 'Output Qc Completed Cases',
//                                 backgroundColor: ['#ed7014'],
//                                 hoverBackgroundColor: ['#ADD8F6'],
//                               },
//                             ],
//                           };
//                           this.outputQcCompletionData = updateOutputQcCompletedData;
                  
//                           const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
//                             responsive: false,
//                             scales: this.getScales('Month', 'Cases'),
//                           };
//                           this.outputQcCompletionOptions = updateOutputQcCompletedOptions;
//                           this.outputQcCompletionLoading= false;
//                         },
//                         (error) => {
//                           console.log(
//                             'Error while fetching last six months output qc completion data',
//                             error
//                           );
//                           // this.showError(
//                           //   'Error while fetching last six months output qc completion data'
//                           // );
//                         }
//                       );
//                   }
//                   getLastSixMonthsInitiatedCasesChecksCount() {
//                     this.initiatedCasesChecksLoading = true;
//                     this.caseInitiationService
//                       .getTotalActualComponentsCountForLastSixMonths()
//                       .subscribe(
//                         (response) => {
//                           const updateIntiatedCasesChecksData: ChartConfiguration<'bar'>['data'] = {
//                             labels: response.map((item:any) => item[0]),
//                             datasets: [
//                               {
//                                 data: response.map((item:any) => item[1]),
//                                 label: 'Checks',
//                                 backgroundColor: ['#ed7014'],
//                                 hoverBackgroundColor: ['#ADD8F6'],
//                               },
//                             ],
//                           };
//                           this.initiatedCasesChecksData = updateIntiatedCasesChecksData;
                  
//                           const initiatedCasesChecksOptions: ChartOptions<'bar'> = {
//                             responsive: false,
//                             scales: this.getScales('Month', 'Cases'),
//                           };
//                           this.initiatedCasesChecksOptions = initiatedCasesChecksOptions;
//                           this.initiatedCasesChecksLoading= false;
//                         },
//                         (error) => {
//                           console.log(
//                             'Error in getLastSixMonthsInitiatedCasesChecksCount',
//                             error
//                           );
//                           // this.showError(
//                           //   'Error while fetching last six months initiated cases checks data'
//                           // );
//                         }
//                       );
//                   }
                  
                
                
                
//                   navigateToCaseStatus(reportType:string){
//                     this.router.navigate([`/crm/casestatus/${reportType}`]);
//                   }
//                 // Added on 12Mar2024 
//                 getAllCrmMeetingDocsUsingLogedInUserId():void{
//                   this.meetingService.getAllCrmMeetingDocsUsingLogedInUserId().subscribe({
//                    next:(response:any)=>{
//                      console.log("response515",response);
                     
//                      this.dataSource.data = response;
                
//                    },
//                    error:(error)=>{
//                      this.showError(error?.error?.message || error?.message);
//                    }
//                   })
//                 }
//                 // Added on 12Mar2024 
                
//                 //////////////New client dashboard New/////////////////////
//                   //////////////New Analyst Dashboard///////////////////////
//                   pendingChecksCount() {
//                     return this.allComponentsDataService.pendingChecksCount();
//                   }
                
//                   rejectedChecksCount() {
//                     this.allComponentsDataService.rejectedChecksCount().subscribe({
//                       next: (response) => {
//                         console.log('rejectedChecksCount', response);
//                         this.rejectedChecks=response;
//                         this.rejectedChecksCountLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in rejectedChecksCount', error);
//                       },
//                     });
//                   }
//                   wipChecksCount() {
//                     this.allComponentsDataService.wipChecksCount().subscribe({
//                       next: (response) => {
//                         console.log('wipChecksCount', response);
//                         this.wipChecks=response;
//                         this.wipChecksCountLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in wipChecksCount', error);
//                       },
//                     });
//                   }
//                   closedChecksCount() {
//                     return this.allComponentsDataService.closedChecksCount();
//                   }
//                   insuffClearedChecksCount() {
//                     this.allComponentsDataService.insuffClearedChecksCount().subscribe({
//                       next: (response) => {
//                         console.log('insuffClearedChecksCount', response);
//                         this.insuffClearedChecks = response;
//                         this.insuffClearedChecksCountLoading=false;
//                       },
//                       error: (error) => {
//                         console.log('error in insuffClearedChecksCount', error);
//                       },
//                     });
//                   }
                
//                   prepareChartForChecksClosedVsPending() {
//                     this.checksVSPendingLoading = true;
//                     const updateChecksVSPendingData: ChartConfiguration<'bar'>['data'] = {
//                       labels: ['','','',''],
//                       datasets: [
//                         {
//                           data: [this.closedChecks],
//                           label: 'Closed Checks',
//                           backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)'
//                           ],
//                           borderColor: [
//                             'rgb(255, 99, 132)'
//                           ],
//                           borderWidth: 1
//                         },
//                         {
//                           data: [this.pendingChecks],
//                           label: 'Pending Checks',
//                           backgroundColor: [
//                             'rgba(153, 102, 255, 0.2)',
//                           ],
//                           borderColor: [
//                             'rgb(153, 102, 255)',
//                           ],
//                           borderWidth: 1
//                         }
//                       ],
//                     };
//                     this.checksVSPendingData = updateChecksVSPendingData;
                
//                     this.checksVSPendingLoading= false;
//                   }
                
//                   getNoOfEffortsOnTodayForAnalyst(){
//                     this.allComponentsDataService.getNoOfEffortsOnTodayForAnalyst().subscribe({
//                       next: (response) => {
//                         console.log('NoOfEffortsOnToday', response);
//                         this.noOfEffortsOnToday=response;
//                         this.noOfEffortsOnTodayLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in NoOfEffortsOnToday', error);
//                       },
//                     });
//                   }
//                   // 30Jan2023 
//                   getNoOfApproachedTatChecksForAnalyst(){
//                     this.allComponentsDataService.getNoOfApproachedTatChecksForAnalyst().subscribe({
//                       next:(response) => {
//                         console.log("noOfApprochedTatChecks",response);
//                         this.noOfApprochedTatChecks=response;
//                         this.noOfApproachedTATLoading=false;
//                       },
//                       error:(error)=>{
//                         console.log('error in noOfApprochedTatChecks', error);
                 
//                       }
//                     })
//                   }
//                   getNoOfBeyondTatChecksForAnalyst(){
//                     this.allComponentsDataService.getNoOfBeyondTatChecksForAnalyst().subscribe({
//                       next:(response) => {
//                         console.log("noOfBeyondTatChecks",response);
//                         this.noOfBeyondTatChecks=response;
//                         this.noOfBeyondTATLoading=false;
//                       },
//                       error:(error)=>{
//                         console.log('error in noOfBeyondTatChecks', error); 
//                       }
//                     })
//                   }
//                   ///////07Feb2024///
//                   getNoOfEffortsPerDayForAnalyst():void{
//                     this.allComponentsDataService.getNoOfEffortsPerDayForAnalyst().subscribe({
//                      next:(response:any[])=>{
//                         const noOfEffortsPerDayChartData:ChartConfiguration<'line'>['data']={
//                           labels:response.length && response[0].xData.length ? response[0].xData : [],
//                           datasets:response.map(item => ({
//                             data:item.yData,
//                             label:item.id,
//                             fill:true,
//                             tension:0.5,
//                             borderColor:'black',
//                             backgroundColor:item.color,
//                           }))
//                         }
                
//                         this.noOfEffortsPerDayData= noOfEffortsPerDayChartData;
//                         this.noOfEffortsPerDayLoading=false;
//                      },
//                      error:(error)=>{
//                       console.log('error in getNoOfEffortsPerDayForAnalyst', error);
                
//                      } 
//                     })
//                   }
                
              

//                   getScales(xtext: string, ytext: string) {
//                     return {
//                       x: {
                        
//                         title: {
//                           color: 'black',
//                           display: true,
//                           text: xtext,
//                           font: {
//                             weight: 'bold' as 'bold',
//                           },
//                         },
//                       },
//                       y: {
                        
//                         title: {
//                           color: 'black',
//                           display: true,
//                           text: ytext,
//                           font: {
//                             weight: 'bold' as 'bold',
//                           },
//                         },
//                       },
//                     };
//                   }
                
//                   //////////////New Analyst Dashboard///////////////////////
//                   //////////////Tl Dashboard/////////////////////
//                   tlPendingAndCompletedChecksForTheMonthCount(){
//                     this.allComponentsDataService.tlPendingAndCompletedChecksForTheMonthCount().subscribe({
//                       next : (response:any)=>{
                
//                         this.tlPendingChecksCount = response.pendingCount;
//                         this.tlCompletedChecksCount = response.completedCount;
//                         this.tlMentorPending=response.mentorCount;
//                         this.tlPendingAndCompletedChecksForMonthCountLoading = false;
                
//                       },
//                       error : (error) => {
//                               console.log(error);
//                               this.showError(error.message || "Error In Getting TL Pending And Completed Checkks For The Month");    
//                       }
//                     })
//                   }
//                   /////////////TL dashboard//////////////////////
//                   // <!-- Managment level Dashboard  -->/////////////
                
//                   private _filter(value: string): string[] {
//                     const filterValue = value.toLowerCase();
                
//                     return this.ManagementclientNames.filter(option => option.toLowerCase().includes(filterValue));
//                   }
//                   managementGetInflowsAndOutflowsPerDay(): void {
//                     this.ManagementCaseInflowOutflowLoading = true;
//                     this.caseUploadService.getInflowsAndOutflowsPerDay(this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
//                       next: (response: any) => {
//                         const newLineChartData: ChartConfiguration<'line'>['data'] = {
//                           labels:
//                             response.length && response[0].data.length
//                               ? response[0].data.map((item:any) => item.x)
//                               : [],
//                           datasets: response.map((item:any) => ({
//                             data: item.data.map((dataItem:any) => dataItem.y.length),
//                             label: item.id,
//                             fill: true,
//                             tension: 0.5,
//                             borderColor: 'black',
//                             backgroundColor: item.color,
//                           })),
//                         };
                
//                         this.ManagementcaseInflowOutflowData = newLineChartData;
//                         this.ManagementCaseInflowOutflowLoading = false; // Set loading to false when data is loaded
//                       },
//                       error: (error) => {
//                         console.log('error in getInflowsAndOutflowsPerDay', error);
//                       },
//                     });
//                   }
//                   managementGetPendingFrequencyBucketDetails(): void {
//                     this.ManagementPendingFrequencyBucketLoading = true;
                
//                     this.caseUploadService.getPendingFrequencyBucketDetails(null,this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
//                       next: (response:any) => {
//                         const pendingFrequencyBucketKeys = Object.keys(response);
//                         const pendingFrequencyBucketLabels = pendingFrequencyBucketKeys.length
//                           ? pendingFrequencyBucketKeys.filter((item) => item != 'Total')
//                           : [];
                
//                         const ManagementPendingFrequencyBucketData: ChartConfiguration<'pie'>['data'] = {
//                           labels: pendingFrequencyBucketLabels,
//                           datasets: [
//                             {
//                               data: pendingFrequencyBucketLabels.map(
//                                 (item) => response[item].length
//                               ),
//                               backgroundColor: [
//                                 '#080',
//                                 '#26D9A9',
//                                 '#FFBF00',
//                                 'orange',
//                                 'pink',
//                                 '#ed7014',
//                               ],
//                               hoverBackgroundColor: [
//                                 'lightcoral',
//                                 'lightgreen',
//                                 'lightyellow',
//                                 'lightsalmon',
//                                 'lightpink',
//                                 'lightblue',
//                               ],
//                               hoverOffset: 4,
//                             },
//                           ],
//                         };
//                         this.ManagementPendingFrequencyBucketData = ManagementPendingFrequencyBucketData;
//                         this.ManagementPendingFrequencyBucketLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in getPendingFrequencyBucketDetails', error);
//                       },
//                     });
//                   }
//                   managemenGetCasesBreakdown(): void {
//                     this.ManagementGradingColorLoading = true;
                
//                     this.caseUploadService.getCasesBreakdown(null,this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
//                       next: (response:any) => {
//                         const ManagementGradingColorData: ChartConfiguration<'pie'>['data'] = {
//                           labels: ['Green', 'Red', 'Amber'],
//                           datasets: [
//                             {
//                               data: [
//                                 response['greenCasesCount'],
//                                 response['redCasesCount'],
//                                 response['amberCasesCount'],
//                               ],
//                               backgroundColor: ['#080', '#F00', '#FFBF00'],
//                               hoverOffset: 4,
//                             },
//                           ],
//                         };
//                         this.ManagementGradingColorData = ManagementGradingColorData;
//                         this.ManagementGradingColorLoading = false;
//                       },
//                       error: (error) => {
//                         console.log('error in getCasesBreakdown', error);
//                       },
//                     });
//                   }
//                   managementGetWipSummary(): void {
//                     this.caseUploadService.getWipSummary(null).subscribe({
//                       next: (response) => {
//                         // console.log("getWipSummary response",response);
//                       },
//                       error: (error) => {
//                         console.log('error in getWipSummary', error);
//                       },
//                     });
//                   }
//                   managementGetCaseDataForDashboard(): void {
//                     this.caseUploadService.getCaseDataForDashboard().subscribe({
//                       next: (response:any) => {
//                         this.ManagementcaseDataForDashboard = Object.assign(response) ;
//                         this.ManagementFilteredCaseDataForDashboard = Object.assign(response);
//                         this.ManagementcaseDataForDashboardLoading = false;
//                         const clients = response.allClients.map((client: { name: any; }) => client.name)
//                         this.ManagementclientNames = clients;
//                         this.ManagementFilteredClientNames = this.ManagementClientNameControl.valueChanges.pipe(
//                           startWith(''),
//                           map((value:any) => this._filter(value)),
//                         );
//                         // console.log('Clients NAmes', this.ManagementFilteredClientNames);
//                       },
//                       error: (error) => {
//                         console.log('error in getCaseDataForDashboard', error);
//                       },
//                     });
//                   }
                
//                 // Inside your component class
//                 onClientNameOptionSelected(event: MatAutocompleteSelectedEvent) {
//                   this.ManagementSelectedClientIds=[];
//                   const selectedValue = event.option.value;
//                   console.log('Selected value:', selectedValue);
//                   this.ManagementSelectedClientId= this.ManagementcaseDataForDashboard.allClients.find((item:any) => item.name.trim()===selectedValue.trim())?._id;
//                   const inflowForClient = this.ManagementcaseDataForDashboard.inflowForFilter.reduce((count:number,currentValue:string) => {
//                     if(currentValue===this.ManagementSelectedClientId){
//                       count++
//                     }
//                     return count;
//                   },0)
                
//                   const outflowForClient = this.ManagementcaseDataForDashboard.outflowForFilter.reduce((count:number,currentValue:string)=>{
//                     if(currentValue === this.ManagementSelectedClientId){
//                       count++;
//                     }
//                     return count;
//                   },0)
                
//                   const wipForClient = this.ManagementcaseDataForDashboard.wipForFilter.reduce((count:number,currentValue:string) => {
//                     if(currentValue===this.ManagementSelectedClientId){
//                       count++;
//                     }
//                     return count;
//                   })
                
//                   const insuffForClient = this.ManagementcaseDataForDashboard.insuffForFilter.reduce((count:number,currentValue:string) =>{
//                     if(currentValue === this.ManagementSelectedClientId){
//                       count++;
//                     }
//                     return count;
//                   },0)
                
//                   const insuffWipForClient = this.ManagementcaseDataForDashboard.insuffWipForFilter.reduce((count:number,currentValue:string) =>{
//                     if(currentValue === this.ManagementSelectedClientId){
//                       count++;
//                     }
//                     return count;
//                   },0)
                  
//                   console.log("inflowForClient",inflowForClient,"outflowForClient",outflowForClient,"wipForClient",wipForClient,"insuffForClient",insuffForClient,"insuffWipForClient",insuffWipForClient);
                  
//                   this.ManagementFilteredCaseDataForDashboard = {
//                     inflow: !isNaN(inflowForClient) ? inflowForClient : 0,
//                     outflow: !isNaN(outflowForClient) ? outflowForClient : 0,
//                     wip: !isNaN(wipForClient) ? wipForClient : 0,
//                     insuff: !isNaN(insuffForClient) ? insuffForClient : 0,
//                     insuffWip: !isNaN(insuffForClient) ? insuffForClient : 0,
//                     clientCount: this.ManagementcaseDataForDashboard.clientCount
//                   };
                
//                   this.managementGetInflowsAndOutflowsPerDay();
//                   this.managementGetPendingFrequencyBucketDetails();
//                   this.managementGetLastSixMonthsCaseInitiationCount();
//                   this.managemenGetCasesBreakdown();
//                   this.managementGetLastSixMonthsOutputQcCompletionCount();
//                   this.managementGetLastSixMonthsInitiatedCasesChecksCount();
//                 }
                  
//                 onChangeClientName(event: Event){
//                   const inputElement = event.target as HTMLInputElement
//                   const inputText = inputElement?.value || ''
//                  console.log("inputText",inputText);
//                  console.log("this.ManagementcaseDataForDashboard;",this.ManagementcaseDataForDashboard);
                 
//                  if(!inputText){
//                   this.ManagementSelectedClientId='';
//                   this.ManagementFilteredCaseDataForDashboard = Object.assign(this.ManagementcaseDataForDashboard);
//                   this.managementGetInflowsAndOutflowsPerDay();
//                   this.managementGetPendingFrequencyBucketDetails();
//                   this.managementGetLastSixMonthsInitiatedCasesChecksCount();
                
//                  }
                
//                 }
                
//                 prepareMinicardsDataForTopClients(inputClients:any):void{
//                    this.ManagementSelectedClientId='';
//                    const topTenClientsNames=inputClients;
                
//                   this.ManagementSelectedClientIds = topTenClientsNames.map((company:any) => {
//                     const clientDetail = this.ManagementcaseDataForDashboard.allClients.find((item:any)=> item.name.trim()=== company.trim());
//                     return clientDetail ? clientDetail?._id : null;
//                   });
                
//                   const inflowForClients = this.ManagementcaseDataForDashboard.inflowForFilter.reduce((count:number,currentValue:string) => {
//                     if(this.ManagementSelectedClientIds.includes(currentValue)){
//                       count++
//                     }
//                     return count;
//                   },0)
                
//                   const outflowForClients = this.ManagementcaseDataForDashboard.outflowForFilter.reduce((count:number,currentValue:string)=>{
//                     if(this.ManagementSelectedClientIds.includes(currentValue)){
//                       count++;
//                     }
//                     return count;
//                   },0)
                
//                   const wipForClients = this.ManagementcaseDataForDashboard.wipForFilter.reduce((count:number,currentValue:string) => {
//                     if(this.ManagementSelectedClientIds.includes(currentValue)){
//                       count++;
//                     }
//                     return count;
//                   })
                
//                   const insuffForClients = this.ManagementcaseDataForDashboard.insuffForFilter.reduce((count:number,currentValue:string) =>{
//                     if(this.ManagementSelectedClientIds.includes(currentValue)){
//                       count++;
//                     }
//                     return count;
//                   },0)
                
//                   const insuffWipForClients = this.ManagementcaseDataForDashboard.insuffWipForFilter.reduce((count:number,currentValue:string) =>{
//                     if(this.ManagementSelectedClientIds.includes(currentValue)){
//                       count++;
//                     }
//                     return count;
//                   },0)
                  
//                   this.ManagementFilteredCaseDataForDashboard = {
//                     inflow: !isNaN(inflowForClients) ? inflowForClients : 0,
//                     outflow: !isNaN(outflowForClients) ? outflowForClients : 0,
//                     wip: !isNaN(wipForClients) ? wipForClients : 0,
//                     insuff: !isNaN(insuffForClients) ? insuffForClients : 0,
//                     insuffWip: !isNaN(insuffWipForClients) ? insuffWipForClients : 0,
//                     clientCount: this.ManagementcaseDataForDashboard.clientCount
//                   };
                
//                   this.managementGetInflowsAndOutflowsPerDay();
//                   this.managementGetPendingFrequencyBucketDetails();
//                   this.managementGetLastSixMonthsCaseInitiationCount();
//                   this.managemenGetCasesBreakdown();
//                   this.managementGetLastSixMonthsOutputQcCompletionCount();
//                   this.managementGetLastSixMonthsInitiatedCasesChecksCount();
                
//                 }
                
//                 topTenClientsHandler():void{
//                   const topTenClientsNames=['TCS - BPS','TCS e-Serve International Limited','TCS IT - Projects','TCS IT - Regular','MBRDI-Regular',
//                   'MBRDI-Fastrack','Tech Mahindra Limited','Quest Global Engineering Services Private Limited','Firstforce Technologies Private Limited',
//                   'Teleperformance Global Services Private Limited'];
//                   this.prepareMinicardsDataForTopClients(topTenClientsNames);
//                 }
//                 topTwentyClientsHandler():void{
//                   const topTenClientsNames=['TCS - BPS','TCS e-Serve International Limited','TCS IT - Projects','TCS IT - Regular','MBRDI-Regular',
//                   'MBRDI-Fastrack','Tech Mahindra Limited','Quest Global Engineering Services Private Limited','Firstforce Technologies Private Limited',
//                   'Teleperformance Global Services Private Limited','Unravel Data Systems Private Limited','Ceragon Networks India Private Limited',
//                 'Micro Genesis techsoft Private Limited','Weir Minerals (India) Private Limited','Tescra Software Private Limited','Think N Solutions Software Private Limited','Terumo Penpol Private Limited','Think N Solutions Software Private Limited','Terumo Penpol Private Limited','Sigma Allied Services Private Limited'];
//                   this.prepareMinicardsDataForTopClients(topTenClientsNames);
//                 }
//                 managementGetClientPendingFrequencyBucket(): void {
//                     this.caseUploadService.getClientPendingFrequencyBucket().subscribe({
//                       next: (response) => {
//                         console.log('getClientPendingFrequencyBucket response', response);
//                       },
//                       error: (error) => {
//                         console.log('error in getClientPendingFrequencyBucket', error);
//                         this.showError(
//                           'error while fetching client pending frequency bucket data'
//                         );
//                       },
//                     });
//                 }
                
//                   //CASE INITIATION
                
//                   managementOnMonthSelectForCaseInitiation(event: any) {
//                     const month = this.ManagementCaseInitiationData.labels[event.active[0].index];
                
//                     if (month) {
//                       this.ManagementCaseInitiationOverlay = false;
                
//                       // Use setTimeout to delay the loading state update
//                       setTimeout(() => {
//                         this.ManagementCaseInitiationLoading = true;
                
//                         this.caseInitiationService
//                           .getDateWiseCaseInitiationData(month as string,this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
//                           .subscribe(
//                             (response) => {
//                               const updatedCaseInitiationData: ChartConfiguration<'bar'>['data'] =
//                                 {
//                                   labels: response.map((item:any) => item[0]),
//                                   datasets: [
//                                     {
//                                       data: response.map((item:any) => item[1]),
//                                       label: 'Initiated Cases',
//                                       backgroundColor: ['#ed7014'],
//                                       hoverBackgroundColor: ['#ADD8F6'],
//                                     },
//                                   ],
//                                 };
                
//                               // Update the chart data
//                               this.ManagementCaseInitiationData = updatedCaseInitiationData;
                
//                               const updateCaseInitiationOptions: ChartOptions<'bar'> = {
//                                 responsive: false,
//                                 scales: this.getScales('Date', 'Cases'),
//                               };
//                               this.ManagementCaseInitiationOptions = updateCaseInitiationOptions;
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.ManagementCaseInitiationLoading = false;
//                               }, 0);
//                             },
//                             (error) => {
//                               console.log(
//                                 'Error while fetching date wise case initiation data',
//                                 error
//                               );
//                               this.showError(
//                                 'Error while fetching date wise case initiation data'
//                               );
                
//                               // Ensure that loading is set to false even in case of an error
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.ManagementCaseInitiationLoading = false;
//                               }, 0);
//                             }
//                           );
//                       }, 0);
//                     }
//                   }
//                   managementOnMonthSelectForOutputQcCompletion(event: any) {
//                     const month = this.ManagementOutputQcCompletionData.labels[event.active[0].index] as string;
                
//                     if (month) {
//                       this.ManagementOutputQcCompletionOverlay = false;
                
//                       // Use setTimeout to delay the loading state update
//                       setTimeout(() => {
//                         this.ManagementOutputQcCompletionLoading = true;
                
//                         this.caseInitiationService
//                           .getDateWiseCaseOutputQcCompletionCount(month,this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
//                           .subscribe(
//                             (response) => {
//                               const updatedOutputQcCompletionData: ChartConfiguration<'bar'>['data'] =
//                                 {
//                                   labels: response.map((item:any) => item[0]),
//                                   datasets: [
//                                     {
//                                       data: response.map((item:any) => item[1]),
//                                       label: 'Output-QC Completed Cases',
//                                       backgroundColor: ['#ed7014'],
//                                       hoverBackgroundColor: ['#ADD8F6'],
//                                     },
//                                   ],
//                                 };
                
//                               // Update the chart data
//                               this.ManagementOutputQcCompletionData = updatedOutputQcCompletionData;
                
//                               const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
//                                 responsive: false,
//                                 scales: this.getScales('Date', 'Cases'),
//                               };
//                               this.ManagementOutputQcCompletionOptions = updateOutputQcCompletedOptions;
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.ManagementOutputQcCompletionLoading = false;
//                               }, 0);
//                             },
//                             (error) => {
//                               console.log(
//                                 'Error in onMonthSelectForOutputQcCompletion',
//                                 error
//                               );
//                               this.showError(
//                                 'Error while fetching date wise output qc completion data'
//                               );
                
//                               // Ensure that loading is set to false even in case of an error
//                               // Use setTimeout to delay the loading state update
//                               setTimeout(() => {
//                                 this.ManagementOutputQcCompletionLoading = false;
//                               }, 0);
//                             }
//                           );
//                       }, 0);
//                     }
//                   }
                
//                   managementGetLastSixMonthsCaseInitiationCount() {
//                     this.ManagementCaseInitiationLoading = true;
//                     this.ManagementCaseInitiationOverlay = true;
//                     this.caseInitiationService.getLastSixMonthsCaseInitiationCount(this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe(
//                       (response) => {
//                         const ManagementCaseInitiationData: ChartConfiguration<'bar'>['data'] = {
//                           labels: response.map((item:any) => item[0]),
//                           datasets: [
//                             {
//                               data: response.map((item:any) => item[1]),
//                               label: 'Initiated Cases',
//                               backgroundColor: ['#ed7014'],
//                               hoverBackgroundColor: ['#ADD8F6'],
//                             },
//                           ],
//                         };
//                         this.ManagementCaseInitiationData = ManagementCaseInitiationData;
                
//                         const updateCaseInitiationOptions: ChartOptions<'bar'> = {
//                           responsive: false,
//                           scales: this.getScales('Month', 'Cases'),
//                         };
//                         this.ManagementCaseInitiationOptions = updateCaseInitiationOptions;
//                         this.ManagementCaseInitiationLoading = false;
//                       },
//                       (error) => {
//                         console.log(
//                           'Error while fetching last six months case initiation data',
//                           error
//                         );
//                         this.showError(
//                           'Error while fetching last six months case initiation data'
//                         );
//                       }
//                     );
//                   }
                
//                   managementGetLastSixMonthsOutputQcCompletionCount() {
//                     this.ManagementOutputQcCompletionLoading = true;
//                     this.ManagementOutputQcCompletionOverlay = true;
//                     this.caseInitiationService
//                       .getLastSixMonthsOutputQcCompletionCount(this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
//                       .subscribe(
//                         (response) => {
//                           const updateOutputQcCompletedData: ChartConfiguration<'bar'>['data'] = {
//                             labels: response.map((item:any) => item[0]),
//                             datasets: [
//                               {
//                                 data: response.map((item:any) => item[1]),
//                                 label: 'Output Qc Completed Cases',
//                                 backgroundColor: ['#ed7014'],
//                                 hoverBackgroundColor: ['#ADD8F6'],
//                               },
//                             ],
//                           };
//                           this.ManagementOutputQcCompletionData = updateOutputQcCompletedData;
                  
//                           const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
//                             responsive: false,
//                             scales: this.getScales('Month', 'Cases'),
//                           };
//                           this.ManagementOutputQcCompletionOptions = updateOutputQcCompletedOptions;
//                           this.ManagementOutputQcCompletionLoading= false;
//                         },
//                         (error) => {
//                           console.log(
//                             'Error while fetching last six months output qc completion data',
//                             error
//                           );
//                           this.showError(
//                             'Error while fetching last six months output qc completion data'
//                           );
//                         }
//                       );
//                   }
//                   managementGetLastSixMonthsInitiatedCasesChecksCount() {
//                     this.ManagementInitiatedCasesChecksLoading = true;
//                     this.caseInitiationService
//                       .getTotalActualComponentsCountForLastSixMonths(this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
//                       .subscribe(
//                         (response) => {
//                           const updateIntiatedCasesChecksData: ChartConfiguration<'bar'>['data'] = {
//                             labels: response.map((item:any) => item[0]),
//                             datasets: [
//                               {
//                                 data: response.map((item:any) => item[1]),
//                                 label: 'Checks',
//                                 backgroundColor: ['#ed7014'],
//                                 hoverBackgroundColor: ['#ADD8F6'],
//                               },
//                             ],
//                           };
//                           this.ManagementInitiatedCasesChecksData = updateIntiatedCasesChecksData;
                  
//                           const ManagementInitiatedCasesChecksOptions: ChartOptions<'bar'> = {
//                             responsive: false,
//                             scales: this.getScales('Month', 'Cases'),
//                           };
//                           this.ManagementInitiatedCasesChecksOptions = ManagementInitiatedCasesChecksOptions;
//                           this.ManagementInitiatedCasesChecksLoading= false;
//                         },
//                         (error) => {
//                           console.log(
//                             'Error in getLastSixMonthsInitiatedCasesChecksCount',
//                             error
//                           );
//                           this.showError(
//                             'Error while fetching last six months initiated cases checks data'
//                           );
//                         }
//                       );
//                   }
                  
                
                
//                   getManagmentScales(xtext: string, ytext: string) {
//                     return {
//                       x: {
//                         title: {
//                           color: 'black',
//                           display: true,
//                           text: xtext,
//                           font: {
//                             weight: 'bold',
//                           },
//                         },
//                       },
//                       y: {
//                         title: {
//                           color: 'black',
//                           display: true,
//                           text: ytext,
//                           font: {
//                             weight: 'bold',
//                           },
//                         },
//                       },
//                     };
//                   }
                
//                   refreshPage() {
//                     window.location.reload()
//                   }
                



// }

//////////////////////New 1Nov2025////
import {  OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { report } from 'process';
import { DashboardAccessService } from 'src/app/service/dashboard-access.service';
import { VibeReportService } from 'src/app/reports/service/vibe-report.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';
import { UserService } from 'src/app/administration/service/user.service';
import { UserRoleService } from 'src/app/administration/service/user-role.service';
 import { Observable, interval, Subscription } from 'rxjs';
 import { takeWhile } from 'rxjs/operators';
import {ChartConfiguration,ChartOptions,ChartType} from "chart.js";
import { CaseInitiationService } from 'src/app/service/case-initiation.service';
import { AllComponentsDataService } from 'src/app/operations/service/all-components-data.service';
import { forkJoin,of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MeetingService } from 'src/app/service/meeting.service';
import { DashboardDataService } from 'src/app/service/dashboard-data.service';
import { AnalystDashboardCountData, ClientDashboardCountData, TLDashboardCountData } from '../new-dashboard/new-dashboard.component';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // line added sep-13
import { ComponentDataService } from 'src/app/operations/data-entry/service/component-data.service';// line added sep-24
import { ComponentAccessService } from 'src/app/administration/service/component-access.service';// line added sep-24
import { ComponentService } from 'src/app/administration/service/component.service';//line added sep-25
import { switchMap, catchError } from 'rxjs/operators'; // line added sep-25


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
// Chart.register(...registerables);
Chart.register(...registerables, ChartDataLabels); // new line added sep-13

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit   {

  //code added oct -5////
  

  mergedCaseComponentData: any;
mergedCaseComponentOptions: any;
mergedCaseComponentLegend = true;
mergedCaseComponentLoading = true;

  ///lines added sep-25//
  caseInitiationCount: number = 0;//
inTatTotal: number = 0;   // for "Closed within TAT"
outTatTotal: number = 0;  // for "Closed beyond TAT"
caseInitiationTotal: number = 0;  // total cases initiated in current month
totalInitiatedCasesChecks: number = 0;


tatStatsRaw: any[] = []; // keep the API response here
////
  caseInitiationCountForMonth: number = 0; //line added sep-25
  outputQcAcceptedCount: number = 0;// line added sep-25
   onHoldCount: number = 0;//line addded sep-25
mentorReviewCount: number = 0; //line added sep-25
  insuffCount: number = 0;//line added sep-25
  unallocatedCount: number = 0;//line added sep-24
  unallocatedForAllBgv:number=0;// for all bgv checks
 
    ChartDataLabels = ChartDataLabels; //  add this line sep-13
     currentMonthLabel: string = '';//  add this line sep-13
  nextMonthLabel: string = '';//  add this line sep-13
    monthLabel: string = '';//add this line sep-13

    /// added code sep-22///
    combinedCount: number = 0;
    /// added code sep-22///

/////line added sep-22
caseCounts: any = {};
////////////////////////
  ////////////////////////
   /////////////////////New Client DAshboard New///////////////////
   caseDataForDashboard: any;
   public caseDataForDashboardLoading:boolean = true;
   //case Inflow Outflow Chart
   public caseInflowOutflowData!: ChartConfiguration<'line'>['data'];
   public caseInflowOutflowOptions: ChartOptions<'line'> = {
     responsive: false,
     scales: this.getScales('Date', 'Cases'),
   };
   public caseInflowOutflowLegend = true;
   public caseInflowOutflowLoading = true;
 
   //pending Frequency Bucket
   public pendingFrequencyBucketData!: ChartConfiguration<'pie'>['data'];
   public pendingFrequencyBucketOptions: ChartOptions<'pie'> = {
     responsive: false,
   };
   public pendingFrequencyBucketLegend = true;
   public pendingFrequencyBucketLoading = true;
 
   // Cases by grading color
   public gradingColorData!: ChartConfiguration<'pie'>['data'];
   public gradingColorOptions: ChartOptions<'pie'> = {
     responsive: false,
   };
   public gradingColorLegend = true;
   public gradingColorLoading = true;
 
   //Case Initiation
   public caseInitiationData!: ChartConfiguration<'bar'>['data'] | any;
   public caseInitiationOptions!: ChartOptions<'bar'>;
   public caseInitiationLegend = true;
   public caseInitiationLoading = true;
   public caseInitiationOverlay = true;
 
   //Output Qc Completion
   public outputQcCompletionData!:ChartConfiguration<'bar'>['data'] | any;
   public outputQcCompletionOptions?:ChartOptions<'bar'>;
   public outputQcCompletionLegend=true;
   public outputQcCompletionLoading = true;
   public OutputQcCompletionOverlay = true;
 
   //Initiated Cases Checks
   public initiatedCasesChecksData!:ChartConfiguration<'bar'>['data'];
   public initiatedCasesChecksOptions?:ChartOptions<'bar'>;
   
   public initiatedCasesChecksLegend=true;
   public initiatedCasesChecksLoading = true;
 displayedColumns=['serialNumber','discussionPoint','actionItem','responsibility','targetDate','status'];
 dataSource = new MatTableDataSource();
 noOfApprochedTatChecks!:number;
 noOfBeyondTatChecks!:number;
 
 public  noOfApproachedTATLoading: boolean = true;
 public  noOfBeyondTATLoading:boolean = true;
 noOfEffortsOnToday!:number;
 public noOfEffortsOnTodayLoading:boolean = true;
 
       
 
       public noOfEffortsPerDayData!: ChartConfiguration<'line'>['data'];
       public noOfEffortsPerDayLoading = true;
       public noOfEffortsPerDayDataOptions: ChartOptions<'line'> = {
         responsive: false,
         scales: this.getScales('Date', 'Cases'),
       };
       public noOfEffortsPerDayDataLegend = true;
       
 tlPendingChecksCount!:number;
 tlCompletedChecksCount!:number;
 tlMentorPending!:number;
 public tlPendingAndCompletedChecksForMonthCountLoading:boolean = true;
 //////////TL dashboard/////////////////////////
 // <!-- Managment level Dashboard  -->
 ManagementcaseDataForDashboard: any;
 ManagementFilteredCaseDataForDashboard:any;
 public ManagementcaseDataForDashboardLoading:boolean = true;
 //case Inflow Outflow Chart
 public ManagementcaseInflowOutflowData!: ChartConfiguration<'line'>['data'];
 public ManagementCaseInflowOutflowOptions: ChartOptions<'line'> = {
   responsive: false,
   scales: this.getManagmentScales('Date', 'Cases'),
 };
 public ManagementCaseInflowOutflowLegend = true;
 public ManagementCaseInflowOutflowLoading = true;
 
 //pending Frequency Bucket
 public ManagementPendingFrequencyBucketData!: ChartConfiguration<'pie'>['data'];
 public ManagementPendingFrequencyBucketOptions: ChartOptions<'pie'> = {
   responsive: false,
 };
 public ManagementPendingFrequencyBucketLegend = true;
 public ManagementPendingFrequencyBucketLoading = true;
 
 // Cases by grading color
 public ManagementGradingColorData!: ChartConfiguration<'pie'>['data'];
 public ManagementGradingColorOptions: ChartOptions<'pie'> = {
   responsive: false,
 };
 public ManagementGradingColorLegend = true;
 public ManagementGradingColorLoading = true;
 
 //Case Initiation
 public ManagementCaseInitiationData: ChartConfiguration<'bar'>['data'] | any;
 public ManagementCaseInitiationOptions!: ChartOptions<'bar'>;
 public ManagementCaseInitiationLegend = true;
 public ManagementCaseInitiationLoading = true;
 public ManagementCaseInitiationOverlay = true;
 
 //Output Qc Completion
 public ManagementOutputQcCompletionData:ChartConfiguration<'bar'>['data'] | any;
 public ManagementOutputQcCompletionOptions?:ChartOptions<'bar'>;
 public ManagementOutputQcCompletionLegend=true;
 public ManagementOutputQcCompletionLoading = true;
 public ManagementOutputQcCompletionOverlay = true;
 
 //Initiated Cases Checks
 public ManagementInitiatedCasesChecksData!:ChartConfiguration<'bar'>['data'];
 public ManagementInitiatedCasesChecksOptions?:ChartOptions<'bar'>;
 public ManagementInitiatedCasesChecksLegend=true;
 public ManagementInitiatedCasesChecksLoading = true;
 

 ManagementClientNameControl = new FormControl('');
 ManagementclientNames: string[] = [];
 ManagementFilteredClientNames!: Observable<string[]>;
 private ManagementSelectedClientId:string='';
 private ManagementSelectedClientIds:string[]=[];
 
 // <!-- Managment level Dashboard  -->
 
 
 closedChecks!:number;
 wipChecks!:number;
 rejectedChecks!:number;
 pendingChecks!:number;
 insuffClearedChecks!:number;
 public pendingChecksCountLoading:boolean = true;
 public rejectedChecksCountLoading:boolean = true;
 public wipChecksCountLoading:boolean = true;
 public closedChecksCountLoading:boolean = true;
 public insuffClearedChecksCountLoading:boolean = true;
 
 //  Checks-Closed VS Pending
 public checksVSPendingData!:ChartConfiguration<'bar'>['data'];
 public checksVSPendingOptions?:ChartOptions<'bar'>;
 public checksVSPendingLegend=true;
 public checksVSPendingLoading=true;

 
   userName=""
   title = 'Initiations';  
   type = 'ColumnChart'; 
   mytitle ='Completed';
  
   data:any = [];  
   mytype = 'PieChart';
   completeddata:any =[
 
   ]
 
    
 
 
 //  data =[]
   columnNames = ['Name', 'Percentage'];  
   options = {
    legend: { position: 'none' },
    is3D: true,
    series: {
      0: { color: '#ed7014' }, // Color for the first series (bar)
      1: { color: '#ff0000' }, // Color for the second series (if applicable)
      2: { color: '#00ff00' }, // Color for the third series (if applicable)
      // Add more series as needed
    }
  };
   options2 = { color: ['#ed7014', '#ed7014', '#ed7014'],is3D:true
 };
 options3 = {
  color: ['#ed7014', '#ed7014', '#ed7014'],
   title: 'Components Data',
   pieHole:0.4
 }
   
   width = 480;  
   height = 200; 

   ///added code sep-19//
   tatStatsData: any;
tatStatsOptions: any;
tatStatsLegend = true;
tatStatsLoading = true;

tatTrendData: any;
tatTrendOptions: any;
tatTrendLegend = false;
tatTrendLoading = true;

inTatTrendData: any;
outTatTrendData: any;

// tatFilter: 'inTatPercent' | 'outTatPercent' = 'inTatPercent';
tatFilter: 'inTat' | 'outTat' = 'inTat';
   ///ended code sep-19//
 
   componentcount:any
   componentcasescount:any
   componentdayscount:any
   analystcomponentcount:any
   tlcomponentcount:any
   componentNames:any
   dataForChart:any
   dataforpie:any
   filteredData:any
   allcomponents:any
   showClientDashboard:boolean=false
   showClientDashboardtwo:boolean=false
   showClientDashboardthree:boolean=false
   showAnalystDashboardtwo:boolean=false
   showTlDashboard:boolean=false
   showManagmentDashboard:boolean=false
   showLeadershipDashboard:boolean=false
   showLeadershipCompDashboard:boolean=false
   showDataEntryDashboard:boolean=false
   showAnalystDashboard:boolean=false
   showTLDashboard:boolean=false
   showProcessManagerDashboard:boolean=false
   showQualityDashboard:boolean=false
   showComplianceDashboard:boolean=false
 
 
   completedCaseCount = 0
   wipCaseCount = 0
   insuffCaseCount = 0
   initiatedCaseCount = 0
   initiatedCaseTillNowCount = 0
   greenCount = 0
   amberCount = 0
   redCount = 0
 
   openingBalanceForLeadership = 0
   initiatedCaseCountForLeadership = 0
   completedCaseCountForLeadership = 0
   completedCaseCountWithinTatForLeadership = 0
   completedCaseCountBeyondTatForLeadership = 0
   wipCaseCountForLeadership = 0
   wipCaseCountWithinTatForLeadership = 0
   wipCaseCountBeyondTatForLeadership = 0
   insuffCaseCountForLeadership = 0
 
 
   openingBalanceOfChecksForLeadership = 0
   initiatedChecksCountForLeadership = 0
   insufficientChecksCountForLeadership = 0
   completedChecksCountForLeadership = 0
   completedChecksWithinTatCountForLeadership = 0
   completedChecksBeyondTatCountForLeadership = 0
   wipChecksCountForLeadership = 0
   wipChecksWithinTatCountForLeadership = 0
   wipChecksBeyondTatCountForLeadership = 0
 
 
 
   newInitiationsForDataEntryDashboard = 0
   inputqcRejectionsForDataEntryDashboard = 0
   inputqcAcceptanceForDataEntryDashboard = 0
 
   openingBalanceOfChecksForAnalyst = 0
   initiatedChecksCountForAnalyst = 0
   completedChecksCountForAnalyst = 0
   wipChecksCountForAnalyst = 0
 
   openingBalanceOfChecksForTeamLead = 0
   initiatedChecksCountForTeamLead = 0
   completedChecksCountForTeamLead = 0
   wipChecksCountForTeamLead = 0
   
   openingBalanceOfChecksForProcessManager = 0
   initiatedChecksCountForProcessManager = 0
   completedChecksCountForProcessManager = 0
   wipChecksCountForProcessManager = 0 

   clientDashboardloading: boolean = false;
   analystDashboardloading: boolean = false;
   tlDashboardloading: boolean = false;

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



  constructor(
    private router:Router,
    private dashboardAccessService:DashboardAccessService,
    private dashboardDataService: DashboardDataService,
    private caseUploadService:CaseUploadService,
    private vibeReportService:VibeReportService,
    private userService:UserService,
    private userRoleService:UserRoleService,
    private snackbar:MatSnackBar,
    // private loginService: LoginService,
    // private loginNewService: LoginNewService,
    private caseInitiationService: CaseInitiationService,
    private allComponentsDataService: AllComponentsDataService,
    private meetingService:MeetingService,
    private componentDataService: ComponentDataService,///line added sep-24//
      private componentAccessService: ComponentAccessService,///line added sep-24//
        private componentService:ComponentService,/// line added sep-25//
  ){}
  ngOnInit(): void {
    ///MBRDI 20June2023
    
        if (queryParams.has('userId') && queryParams.has('accessToken')) {
          // this.login()
          location.reload()
        }
    ///MBRDI 20June2023
    
        this.dashboardAccessService.readAllForCurrentUser().subscribe(
          response=>{
            console.log('Response from dashboard access ',response)
            response.forEach(item=>{
              if(item.dashboard.code == 'CLIENT-01'){
                this.showClientDashboard = true
                this.getClientDashboardDetails()
                this.getInitiatedCasesTillNow()
              }
              if(item.dashboard.code == 'LEADERSHIP-01'){
                this.showLeadershipDashboard = true
                this.getLeadershipDashboardDetails()
    
              }
              if(item.dashboard.code == 'LEADERSHIPCOMP-01'){
                this.showLeadershipCompDashboard = true
                this.getTlComponentsDashboardDetails()
                this.getTlComponentsDashboardDetails()
              }
              if(item.dashboard.code == 'LEADERSHIPCOMP-01'){
                this.showLeadershipCompDashboard = true
                this.getComponentsDashboardDetails()
                
              }
    
              if(item.dashboard.code =='DATAENTRY-01'){
                this.showDataEntryDashboard =true
                this.getDataEntryDashboardDetails()
              }
              if(item.dashboard.code == 'ANALYST-01'){
                this.showAnalystDashboard = true
                this.getAnalystDashboardDetails()
                this.getAnalystComponentsDashboardDetails()
              }
              if (item.dashboard.code =='TL-01'){
                this.showTLDashboard = true
                this.getTeamLeadDashboardDetails()
                this.tlDashboardCountData()
              }
              if(item.dashboard.code =='PM-01'){
                this.showProcessManagerDashboard = true
                this.getProcessManagerDashboardDetails()
              }
              if(item.dashboard.code =='QUALITY-01'){
                this.showQualityDashboard= true
              }
              if(item.dashboard.code =='COMP-01'){
                this.showComplianceDashboard= true
              }  
              if(item.dashboard.code =='CLIENT-02'){
                this.showClientDashboardtwo = true
                this.getComponentsDaysDetails()
                this.getComponentsCasesDetails()
                this.getcountOfCompletedCases()
              }         
              if(item.dashboard.code =='CLIENT-03'){
                this.showClientDashboardthree = true
                this.getInflowsAndOutflowsPerDay();
                this.getPendingFrequencyBucketDetails();
                this.getCasesBreakdown();
                this.getWipSummary();
                this.getCaseDataForDashboard();
                this.getClientPendingFrequencyBucket();
                this.getLastSixMonthsCaseInitiationCount();
                this.getLastSixMonthsOutputQcCompletionCount();
                this.getLastSixMonthsInitiatedCasesChecksCount();
                 
    
                this.getAllCrmMeetingDocsUsingLogedInUserId();
                this.tryMergeCharts(); //line added oct-04
                 
    
              } 
              if(item.dashboard.code =='ANALYST-02'){
                this.showAnalystDashboardtwo = true
                ///////New Analyst //////
                this.getAnalystDashboardDetails()
                this.prepareChartForChecksClosedVsPending();
                this.rejectedChecksCount();
                this.wipChecksCount();
                this.insuffClearedChecksCount();
                forkJoin([
                  this.closedChecksCount(),
                  this.pendingChecksCount()
                ]).subscribe(([closedChecks,pendingChecks])=>{
                         this.closedChecks = closedChecks;
                         this.pendingChecks = pendingChecks;
                         this.closedChecksCountLoading=false;
                         this.pendingChecksCountLoading=false;
                         this.prepareChartForChecksClosedVsPending();
            
                })
                this.getNoOfApproachedTatChecksForAnalyst();
                this.getNoOfEffortsOnTodayForAnalyst()
                this.getNoOfBeyondTatChecksForAnalyst();
                this.getNoOfEffortsPerDayForAnalyst();
                /////////////////////////
              }  
              if(item.dashboard.code =='TLS-001'){
                this.showTlDashboard = true
                ///////////TL Dashboard/////
                this.tlPendingAndCompletedChecksForTheMonthCount();
                //////////TL dashboard/////
              }
              if(item.dashboard.code =='MANAGMENT-001'){
                this.showManagmentDashboard = true
                this.getClientDashboardDetails()
                this.managementGetInflowsAndOutflowsPerDay();
                this.managementGetPendingFrequencyBucketDetails();
                this.managemenGetCasesBreakdown();
                this.managementGetWipSummary();
                this.managementGetCaseDataForDashboard();
                this.managementGetClientPendingFrequencyBucket();
                this.managementGetLastSixMonthsCaseInitiationCount();
                this.managementGetLastSixMonthsOutputQcCompletionCount();
                this.managementGetLastSixMonthsInitiatedCasesChecksCount();
              }
     
            })
          },
          error=>{
            this.showError("Error reading dashboards")
          }
    
        )
        // this.getUserName()
        this.getDataForInitiationChart()
        this.getDataForCompletedChart()
        // this.getcountOfCompletedCases()
        this.getcompchart()
       this.setMonthLabels()/// new line sep-13

       this.loadTatStats();

         this.loadTatTrend();

         /////////code added sep-22 //////////
      
        this.caseUploadService.findCaseCountsForDashboard().subscribe({
    next: (res) => {
      if (res.success) {
        this.caseCounts = res.counts;
      }
      this.caseDataForDashboardLoading = false;
    },
    error: (err) => {
      console.error("Error fetching dashboard case counts", err);
      this.caseDataForDashboardLoading = false;
    }
  });


  this.caseUploadService.findCombinedCount().subscribe({
    next: (res) => {
      if (res.success) {
        this.combinedCount = res.totalCount;
      }
    },
    error: (err) => {
      console.error("Error fetching combined count", err);
    }
  });

  ////////////////end sep-24//////////////

  /////////added line sep-24///
// this.getUnallocatedChecks();
 this.getUnallocatedCountForDashboard();
  ////////////////////////

  //// added line sep-25
this.getInsuffCountForDashboard();

////
//// added line sep-25
this.getMentorReviewCountForDashboard();
 ////    
 
 /// added line sep-25 //
  this.loadOnHoldCount();
  ///
  // added line sep-25//
  this.loadOutputQcAcceptedCount();
  ///

  // this.getCaseInitiationCountForMonth();

  //sep
 


 ///
  this.getTatStatsTotals();

  //

  //sep-28
this.caseInitiationService.getTotalCaseInitiationCount().subscribe(
  (res) => {
    this.caseInitiationTotal = res.total;
  },
  (error) => {
    console.error("Error fetching total initiation count", error);
    this.caseInitiationTotal = 0;
  }
);
///added code sep-28//
this.getUnallocatedCountForAllBgv();

///oct -05
this.mergeCaseAndComponentTrends();


        }

// loadTatTrend() {
//   this.caseUploadService.getTatStatsTrend().subscribe({
//     next: (res) => {
      
//       this.updateTatTrendChart(res);
//       this.tatTrendLoading = false;
//     },
//     error: (err) => {
//       console.error('Error fetching TAT stats:', err);
//       this.tatTrendLoading = false;
//     }
//   });
// }

loadTatTrend() {
  this.caseUploadService.getTatStatsTrend().subscribe({
    next: (res) => {
      // update chart
      this.updateTatTrendChart(res);

      // update totals for dashboard cards
      this.inTatTotal = res.reduce((sum, r) => sum + (r.inTat || 0), 0);
      this.outTatTotal = res.reduce((sum, r) => sum + (r.outTat || 0), 0);

      this.tatTrendLoading = false;
    },
    error: (err) => {
      console.error('Error fetching TAT stats:', err);
      this.tatTrendLoading = false;
    }
  });
}

// updateTatTrendChart(res: any[]) {
//   const labels = res.map(r => r.month);
//   const data = res.map(r => r[this.tatFilter]);

//   this.tatTrendData = {
//     labels,
//     datasets: [
//       {
//         label: this.tatFilter === 'inTat' ? 'In TAT (Initiated)' : 'Out TAT (Ended)',
//         data,
//         backgroundColor: this.tatFilter === 'inTat' ? '#A5CC82' : '#bfe9ff'
//       }
//     ]
//   };

//   this.tatTrendOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: 'top' },
//       datalabels: {
//         anchor: 'end',
//         align: 'top',
//         formatter: (val: number) => val // show count at top of each bar
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { precision: 0 }
//       }
//     }
//   };
// }


// updateTatTrendChart(res: any[]) {
//   const labels = res.map(r => r.month);
//   const data = res.map(r => r[this.tatFilter]);

//   this.tatTrendData = {
//     labels,
//     datasets: [
//       {
//         label: this.tatFilter === 'inTat' ? 'In TAT (Initiated)' : 'Out TAT (Ended)',
//         data,
//         backgroundColor: this.tatFilter === 'inTat' ? '#A5CC82' : '#bfe9ff'
//       }
//     ]
//   };

//   this.tatTrendOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: 'top' },
//       datalabels: {
//         anchor: 'end',
//         align: 'top',
//         formatter: (val: number) => val // show count at top of each bar
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { precision: 0 }
//       }
//     }
//   };
// }

updateTatTrendChart(res: any[]) {
  const labels = res.map(r => r.month);

  // In TAT dataset
  this.inTatTrendData = {
    labels,
    datasets: [
      {
        label: 'In TAT',
        data: res.map(r => r.inTat),
        backgroundColor: '#7fb84eff'
      }
    ]
  };

  // Out TAT dataset
  this.outTatTrendData = {
    labels,
    datasets: [
      {
        label: 'Out of TAT',
        data: res.map(r => r.outTat),
        backgroundColor: '#4588acff'
      }
    ]
  };

  this.tatTrendOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (val: number) => val
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
}
onTatFilterChange(filter: 'inTat' | 'outTat') {
  this.tatFilter = filter;
  this.loadTatTrend();
} 
      ///new code added sep-19//
      loadTatStats() {
  this.caseUploadService.getTatStats().subscribe({
    next: (res) => {
      this.tatStatsData = {
        labels: ['TAT Status'],
        datasets: [
          {
            label: 'In TAT',
            data: [res.inTat],
            backgroundColor: '#A5CC82'
          },
          {
            label: 'Out of TAT',
            data: [res.outTat],
            backgroundColor: '#bfe9ff'
          }
        ]
      };

      this.tatStatsOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Cases Within vs Beyond TAT (Current Month)'
          }
        }
      };

      this.tatStatsLoading = false;
    },
    error: (err) => {
      console.error('Error fetching TAT stats:', err);
      this.tatStatsLoading = false;
    }
  });
}

      //ended code sep-19

      ////new code added sep-13
 private setMonthLabels(): void {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentYear = today.getFullYear();
    this.monthLabel = `${currentMonth}-${currentYear}`;
  }

      getDataForInitiationChart(){
        this.caseUploadService.getLastSixmonthsCount().subscribe(
          response=>{
            //console.log("Response from sixmonths count is ",response)
            this.data = response
          },
          error=>{
            // this.showError("Error fetching six month's data")
          }
        )
   
      }


      getcompchart(){
        this.caseUploadService.componentcount().subscribe(
          response =>{
            console.log(response)
            this.filteredData = response ;
            this.dataForChart = response.map(item=>{
              return [item.compName, item.count]
            })
            console.log("dataforchart",this.dataForChart)
            console.log(this.mytype)
          },
          error=>{
            //console.log("Error getting the count")
          }
        ) 
      }

      getFirstMonthData(){
        //    let currData = []
            let promise = new Promise((resolve,reject)=>{
              this.caseUploadService.countCasesBetweenDates("2021-05-01","2021-05-31","").subscribe(
                (response)=>{
                  this.data.push(['May', response.count])
                  //console.log("April Data added",response.count)
                  resolve(true)
                },
                error=>{
                  resolve(true)
                   this.showError("Error fethcing data for the chart")
                }
              )   
            })
            return promise
          }
          getSecondMonthData(){
            //    let currData = []
                let promise = new Promise((resolve,reject)=>{    
                this.caseUploadService.countCasesBetweenDates("2021-06-01","2021-06-30","").subscribe(
                  response=>{
                    this.data.push(['June',response.count])
                    //console.log("May Data added")        
                    resolve(true)
                  },
                  error=>{
                    resolve(true)
                  })
                })
                return promise
              }

              getThirdMonthData(){
                //    let  currData=[]
                    let promise = new Promise((resolve,reject)=>{
                      this.caseUploadService.countCasesBetweenDates("2021-07-01","2021-07-31","").subscribe(
                        response=>{
                          this.data.push(['July',response.count])
                          //console.log("June Data added")          
                          resolve(true)
                        },
                        error=>{
                          this.showError("Error fethcing data for the chart")
                          resolve(true)
                        })                 
                    })
                    return promise
                  }
                  getFourthMonthData(){
                //    let currData = []
                    let promise = new Promise((resolve,reject)=>{
                      this.caseUploadService.countCasesBetweenDates("2021-08-01","2021-08-31","").subscribe(
                        response=>{
                          this.data.push(['August',response.count])
                          //console.log("July Data added")          
                          resolve(true)
                        },
                        error=>{
                          resolve(true)
                        })     
                    })
                    return promise
                  }
                  getFifthMonthData(){
                //    let currData = []
                    let promise = new Promise((resolve,reject)=>{
                      this.caseUploadService.countCasesBetweenDates("2021-09-01","2021-09-30","").subscribe(
                        response=>{
                          this.data.push(['September',response.count])    
                          //console.log("August Data added")          
                          resolve(true)
                        },
                        error=>{
                          this.showError("Error fethcing data for the chart")          
                          resolve(true)
                        })      
                    })
                    return promise
                  }
                  getSixthMonthData(){
                //    let currData=[]
                    let promise = new Promise((resolve,reject)=>{
                      this.caseUploadService.countCasesBetweenDates("2021-10-01","2021-10-31","").subscribe(
                        response=>{
                          this.data.push(['October',response.count])
                          //console.log("September Data added")          
                          resolve(true)
                        },
                        errror=>{
                          this.showError("Error fethcing data for the chart")
                          resolve(true)
                        })                        
                    })
                    return promise
                  }
                  
                  // getClientDashboardDetails(){
                  //   let fromDate = new Date();
                  //   let month = fromDate.getMonth() + 1
                  //   let year = fromDate.getFullYear()
                  //   let monthString = ""
                  //   //console.log("Month while getting client dash boards is ",month)
                  //   if(month < 10){
                  //     monthString = "0" + month 
                  //   }else{
                  //     monthString = month.toString()
                  //   }
                  //   let startDate = "01"
                  //   let endDate = "30"
                  //   if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
                  //     endDate = "31"
                  //   }
                  //   if(month==2){
                  //     if(year%4 == 0){
                  //       endDate="29"
                  //     }else{
                  //       endDate="28"
                  //     }
                  //   }
                  //   //console.log("Start Date is ",year+monthString+startDate)
                  //   //console.log("End Date is ",year+monthString+endDate)
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"COMPLETED").subscribe(
                  //     response=>{
                  //       this.completedCaseCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"WIP").subscribe(
                  //     response=>{
                  //       this.wipCaseCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )        
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"INSUF").subscribe(
                  //     response=>{
                  //       this.insuffCaseCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )    
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"").subscribe(
                  //     response=>{
                  //       this.initiatedCaseCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )        
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"GREEN").subscribe(
                  //     response=>{
                  //       this.greenCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )            
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"AMBER").subscribe(
                  //     response=>{
                  //       this.amberCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )                
                  //   this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"RED").subscribe(
                  //     response=>{
                  //       this.redCount = response.count
                  //     },
                  //     error=>{
                  //       //console.log("Error getting the count")
                  //     }
                  //   )                    
                  // }

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


                  getLeadershipDashboardDetails(){
                    let fromDate = new Date();
                    let month = fromDate.getMonth() + 1
                    let year = fromDate.getFullYear()
                    let monthString = ""
                    if(month < 10){
                      monthString = "0" + month 
                    }else{
                      monthString = month.toString()
                    }
                    let startDate = "01"
                    let endDate = "30"
                    if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
                      endDate = "31"
                    }
                    if(month==2){
                      if(year%4 == 0){
                        endDate="29"
                      }else{
                        endDate="28"
                      }
                    }
                    //console.log("Start Date is ",year+monthString+startDate)
                    //console.log("End Date is ",year+monthString+endDate)
                    this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"COMPLETED").subscribe(
                      response=>{
                        this.completedCaseCountForLeadership = response.count
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )
                    this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"WIP").subscribe(
                      response=>{
                        this.wipCaseCountForLeadership = response.count
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )        
                    this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"INSUF").subscribe(
                      response=>{
                        this.insuffCaseCountForLeadership = response.count
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )    
                    this.caseUploadService.countCasesBetweenDates(year +'-'+monthString + '-'+startDate,year + '-'+monthString + '-'+ endDate,"").subscribe(
                      response=>{
                        this.initiatedCaseCountForLeadership = response.count
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )        
                    this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
                      response=>{
                        this.openingBalanceOfChecksForLeadership =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
                      response=>{
                        this.initiatedChecksCountForLeadership =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )      
                    this.vibeReportService.getCompletedChecksOperationStats().subscribe(
                      response=>{
                        this.completedChecksCountForLeadership = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getWIPChecksOperationStats().subscribe(
                      response=>{
                        this.wipChecksCountForLeadership = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getInsufChecksOperationStats().subscribe(
                      response=>{
                        this.insufficientChecksCountForLeadership = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }    
                    )
                  }  
                  getDataEntryDashboardDetails(){
                    this.vibeReportService.getDataEntryNewInitiationsDashboard().subscribe(
                      response=>{
                        this.newInitiationsForDataEntryDashboard = response.count
                      },
                      error=>{
                        //console.log("Data Entry Initiations Error  is ",error)
                        this.showError("Error getting data entry new initiations for dashboard")
                      }
                      
                    )
                    this.vibeReportService.getInputqcRejectionsForDashboard().subscribe(
                      response=>{
                        this.inputqcRejectionsForDataEntryDashboard = response.count
                      },
                      error=>{
                        //console.log("Data Entry Rejections Error  is ",error)
                        this.showError("Error data entry rejections for dashboard")
                      }    
                    )
                    this.vibeReportService.getInputqcAcceptanceForDashboard().subscribe(
                      response=>{
                        this.inputqcAcceptanceForDataEntryDashboard = response.count
                      },
                      error=>{
                        //console.log("Data Entry Inputqc Acceptance Error  is ",error)
                        this.showError("Error getting Inputqc Acceptance for dashboard")
                      }    
                    )    
                  }


                  // getAnalystDashboardDetails(){
                
                  //   this.vibeReportService.getOpeningBalanceChecksOperationStatsForAnalyst().subscribe(
                  //     response=>{
                  //       this.openingBalanceOfChecksForAnalyst =response.count
                  //     },
                  //     error=>{
                  //       this.showError("Error in getting initiated cases for operations")
                  //     }
                  //   )          
                  //   this.vibeReportService.getInitiatedChecksOperationStatsForAnalyst().subscribe(
                  //     response=>{
                  //       this.initiatedChecksCountForAnalyst =response.count
                  //     },
                  //     error=>{
                  //       this.showError("Error in getting initiated cases for operations")
                  //     }
                  //   )      
                  //   this.vibeReportService.getCompletedChecksOperationStatsForAnalyst().subscribe(
                  //     response=>{
                  //       this.completedChecksCountForAnalyst = response.count
                  //     },
                  //     error=>{
                  //       this.showError("Error in getting initiated cases for operations")
                  //     }
                  //   )          
                  //   this.vibeReportService.getWIPChecksOperationStatsForAnalyst( ).subscribe(
                  //     response=>{
                  //       this.wipChecksCountForAnalyst = response.count
                  //     },
                  //     error=>{
                  //       this.showError("Error in getting initiated cases for operations")
                  //     }
                  //   )     
                  // }

                    getAnalystDashboardDetails(){
                      this.dashboardDataService.getAnalystDashboardCountData().subscribe((response:AnalystDashboardCountData) => {
                        console.log("DATA FOR ANALYST",response);
                        
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


                  getTeamLeadDashboardDetails(){
                    this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
                      response=>{
                        this.openingBalanceOfChecksForTeamLead =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
                      response=>{
                        this.initiatedChecksCountForTeamLead =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )      
                    this.vibeReportService.getCompletedChecksOperationStats().subscribe(
                      response=>{
                        this.completedChecksCountForTeamLead = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getWIPChecksOperationStats().subscribe(
                      response=>{
                        this.wipChecksCountForTeamLead = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )             
                  }
                  getProcessManagerDashboardDetails(){
                    this.vibeReportService.getOpeningBalanceChecksOperationStats().subscribe(
                      response=>{
                        this.openingBalanceOfChecksForProcessManager =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getInitiatedChecksOperationStats().subscribe(
                      response=>{
                        this.initiatedChecksCountForProcessManager =response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )      
                    this.vibeReportService.getCompletedChecksOperationStats().subscribe(
                      response=>{
                        this.completedChecksCountForProcessManager = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )          
                    this.vibeReportService.getWIPChecksOperationStats().subscribe(
                      response=>{
                        this.wipChecksCountForProcessManager = response.count
                      },
                      error=>{
                        this.showError("Error in getting initiated cases for operations")
                      }
                    )                 
                  }
                  clientInitiatedCasesButtonClicked(){
                    this.router.navigate(['crm/casestatus/initiationDate'])    
                  }  
                  clientWIPCasesButtonClicked(){
                    this.router.navigate(['crm/casestatus/pending'])    
                  }
                  clientInsuffCasesButtonClicked(){
                    this.router.navigate(['insufficiencies/clientinsuflist'])
                  }
                  clientCompletedCasesButtonClicked(){
                    this.router.navigate(['crm/casestatus/completionDate'])
                  }
                  callTLPending(type:any){
                    if(type == 'NEW'){
                      this.router.navigate([`reports/tlpendingreport/pending`])      
                    }else if(type == 'INSUF'){
                      this.router.navigate(['insufficiencies/scrutinyinsuflist'])
                    }else if(type == 'PENDING'){
                      this.router.navigate([`reports/tlpendingreport/pending`])
                    }else if(type == 'COMPLETED'){
                      this.router.navigate([`reports/tlpendingreport/completed`])
                    }
                  }
                  uploadACase(){
                    this.router.navigate([`upload/caseupload`])
                  }
                  clientInsufList(){
                    this.router.navigate([`insufficiencies/clientinsuflist`])
                  }
                  caseStatus(){
                    this.router.navigate([`crm/casestatus`])
                  }
                  showError(msg:any){
                    this.snackbar.open(msg,"Error",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
                  }
                  showMessage(msg:any){
                    this.snackbar.open(msg,"Info",{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
                  }  
                
                  //new 09-feb23
                 getComponentsDashboardDetails(){
                
                           
                  this.caseUploadService.componentcount().subscribe(
                    response=>{
                      console.log(response)
                      this.componentcount = response
                  
                    },
                    error=>{
                      //console.log("Error getting the count")
                    }
                  )                
                                 
                }
                // tl completed count 
                getTlComponentsDashboardDetails(){
                
                           
                  this.caseUploadService.TlCompletedcompcount().subscribe(
                    response=>{
                      console.log(response)
                      this.tlcomponentcount = response
                  
                    },
                    error=>{
                      //console.log("Error getting the count")
                    }
                  )                
                  }
                getAnalystComponentsDashboardDetails(){
                
                           
                  this.caseUploadService.analystcomponentcount().subscribe(
                    response=>{
                      console.log(response)
                      this.analystcomponentcount = response
                  
                    },
                    error=>{
                      //console.log("Error getting the count")
                    }
                  )                
                  }
                
                  getInitiatedCasesTillNow(){
                    this.caseUploadService.InitiatedCasesTillNow("").subscribe(
                      response=>{
                        this.initiatedCaseTillNowCount = response.count
                      },
                      error=>{
                        console.log("Error getting the count", this.initiatedCaseTillNowCount)
                      }
                    )  
                  }
                
                  getDataForCompletedChart(){
                    this.caseUploadService.getLastSixMonthsCompletedCase().subscribe(
                      response=>{
                        this.completeddata = response
                        // console.log("shoaib", response)
                      },
                      error=>{
                        // this.showError("Error fetching six month's data")
                      }
                    )
                
                  }
                
                  getcountOfCompletedCases(){
                    this.caseUploadService.getCompletedCasescount().subscribe(
                      response=>{
                        // this.dataforpie 
                        console.log(response)
                        this.dataforpie = response.map(item=>{
                          return [item.colorName, item.count]
                        })
                        console.log("dataforpie  of",this.dataforpie)
                        // console.log(this.mytype)= response
                        // console.log("Ahmed", response)
                      },
                      error=>{
                        // this.showError("Error fetching six month's data")
                      }
                    )
                
                  }
                
                  getComponentsDaysDetails(){
                
                           
                    this.caseUploadService.componentdayscount().subscribe(
                      response=>{
                        console.log("ResponseDays:",response)
                        this.componentdayscount = response
                    
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )                
                                   
                  }
                
                  getComponentsCasesDetails(){
                
                           
                    this.caseUploadService.componentcasescount().subscribe(
                      response=>{
                        console.log("caseRatio: ",response)
                         this.allcomponents = Object.keys(response)
                
                        this.componentcasescount = response
                    
                      },
                      error=>{
                        //console.log("Error getting the count")
                      }
                    )                
                                   
                  }
                
                 
              
                  //////////////New client dashboard New/////////////////////
                  getInflowsAndOutflowsPerDay(): void {
                    this.caseUploadService.getInflowsAndOutflowsPerDay().subscribe({
                      next: (response: any) => {
                        const newLineChartData: ChartConfiguration<'line'>['data'] = {
                          labels:
                            response.length && response[0].data.length
                              ? response[0].data.map((item:any) => item.x)
                              : [],
                          datasets: response.map((item:any) => ({
                            data: item.data.map((dataItem:any) => dataItem.y.length),
                            label: item.id,
                            fill: true,
                            tension: 0.5,
                            borderColor: 'black',
                            backgroundColor: item.color,
                          })),
                        };
                
                        this.caseInflowOutflowData = newLineChartData;
                        this.caseInflowOutflowLoading = false; // Set loading to false when data is loaded
                      },
                      error: (error) => {
                        console.log('error in getInflowsAndOutflowsPerDay', error);
                      },
                    });
                  }
                  getPendingFrequencyBucketDetails(): void {
                    this.caseUploadService.getPendingFrequencyBucketDetails(null).subscribe({
                      next: (response:any) => {
                        const pendingFrequencyBucketKeys = Object.keys(response);
                        const pendingFrequencyBucketLabels = pendingFrequencyBucketKeys.length
                          ? pendingFrequencyBucketKeys.filter((item) => item != 'Total')
                          : [];
                
                        const pendingFrequencyBucketData: ChartConfiguration<'pie'>['data'] = {
                          labels: pendingFrequencyBucketLabels,
                          datasets: [
                            {
                              data: pendingFrequencyBucketLabels.map(
                                (item) => response[item].length
                              ),
                              backgroundColor: [
                                '#080',
                                '#26D9A9',
                                '#FFBF00',
                                'orange',
                                'pink',
                                '#ed7014',
                              ],
                              hoverBackgroundColor: [
                                'lightcoral',
                                'lightgreen',
                                'lightyellow',
                                'lightsalmon',
                                'lightpink',
                                'lightblue',
                              ],
                              hoverOffset: 4,
                            },
                          ],
                        };
                        this.pendingFrequencyBucketData = pendingFrequencyBucketData;
                        this.pendingFrequencyBucketLoading = false;
                      },
                      error: (error) => {
                        console.log('error in getPendingFrequencyBucketDetails', error);
                      },
                    });
                  }
                  getCasesBreakdown(): void {
                    this.caseUploadService.getCasesBreakdown(null).subscribe({
                      next: (response:any) => {
                        const gradingColorData: ChartConfiguration<'pie'>['data'] = {
                          labels: ['Green', 'Red', 'Amber'],
                          datasets: [
                            {
                              data: [
                                response['greenCasesCount'],
                                response['redCasesCount'],
                                response['amberCasesCount'],
                              ],
                              backgroundColor: ['#080', '#F00', '#FFBF00'],
                              hoverOffset: 4,
                            },
                          ],
                        };
                        this.gradingColorData = gradingColorData;
                        this.gradingColorLoading = false;
                      },
                      error: (error) => {
                        console.log('error in getCasesBreakdown', error);
                      },
                    });
                  }
                  getWipSummary(): void {
                    this.caseUploadService.getWipSummary(null).subscribe({
                      next: (response) => {
                        // console.log("getWipSummary response",response);
                      },
                      error: (error) => {
                        console.log('error in getWipSummary', error);
                      },
                    });
                  }
                  getCaseDataForDashboard(): void {
                    this.caseUploadService.getCaseDataForDashboard().subscribe({
                      next: (response) => {
                        console.log('getCaseDataForDashboard response', response);
                        this.caseDataForDashboard = response;
                        this.caseDataForDashboardLoading = false;
                      },
                      error: (error) => {
                        console.log('error in getCaseDataForDashboard', error);
                      },
                    });
                  }
                
                  getClientPendingFrequencyBucket(): void {
                    this.caseUploadService.getClientPendingFrequencyBucket().subscribe({
                      next: (response) => {
                        console.log('getClientPendingFrequencyBucket response', response);
                      },
                      error: (error) => {
                        console.log('error in getClientPendingFrequencyBucket', error);
                        this.showError(
                          'error while fetching client pending frequency bucket data'
                        );
                      },
                    });
                  }
                
                  //CASE INITIATION
                
            //       onMonthSelectForCaseInitiation(event: any) {
            //         const month = this.caseInitiationData.labels[event.active[0].index];
                
            //         if (month) {
            //           this.caseInitiationOverlay = false;
                
            //           // Use setTimeout to delay the loading state update
            //           setTimeout(() => {
            //             this.caseInitiationLoading = true;
                
            //             this.caseInitiationService
            //               .getDateWiseCaseInitiationData(month as string)
            //               .subscribe(
            //                 (response) => {
            //                   const updatedCaseInitiationData: ChartConfiguration<'bar'>['data'] =
            //                     {
            //                       labels: response.map((item:any) => item[0]),
            //                       datasets: [
            //                         {
            //                           data: response.map((item:any) => item[1]),
            //                           label: 'Initiated Cases',
            //                           backgroundColor: ['#ed7014'],
            //                           hoverBackgroundColor: ['#ADD8F6'],
            //                         },
            //                       ],
            //                     };
                
            //                   // Update the chart data
            //                   this.caseInitiationData = updatedCaseInitiationData;

            //                   // added code Update dashboard card total
            // this.caseInitiationTotal = response.reduce(
            //   (sum: number, item: any) => sum + (item[1] || 0),
            //   0
            // );

                
            //                   const updateCaseInitiationOptions: ChartOptions<'bar'> = {
            //                     responsive: false,
            //                     scales: this.getScales('Date', 'Cases'),
            //                   };
            //                   this.caseInitiationOptions = updateCaseInitiationOptions;
            //                   // Use setTimeout to delay the loading state update
            //                   setTimeout(() => {
            //                     this.caseInitiationLoading = false;
            //                   }, 0);
            //                 },
            //                 (error) => {
            //                   console.log(
            //                     'Error while fetching date wise case initiation data',
            //                     error
            //                   );
            //                   this.showError(
            //                     'Error while fetching date wise case initiation data'
            //                   );
                
            //                   // Ensure that loading is set to false even in case of an error
            //                   // Use setTimeout to delay the loading state update
            //                   setTimeout(() => {
            //                     this.caseInitiationLoading = false;
            //                   }, 0);
            //                 }
            //               );
            //           }, 0);
            //         }
            //       }

            onMonthSelectForCaseInitiation(event: any) {
  const month = this.caseInitiationData.labels[event.active[0].index];

  if (month) {
    this.caseInitiationOverlay = false;

    setTimeout(() => {
      this.caseInitiationLoading = true;

      this.caseInitiationService
        .getDateWiseCaseInitiationData(month as string)
        .subscribe(
          (response) => {
            const updatedCaseInitiationData: ChartConfiguration<'bar'>['data'] = {
              labels: response.map((item: any) => item[0]),
              datasets: [
                {
                  data: response.map((item: any) => item[1]),
                  label: 'Initiated Cases',
                  backgroundColor: ['#ed7014'],
                  hoverBackgroundColor: ['#ADD8F6'],
                },
              ],
            };

            this.caseInitiationData = updatedCaseInitiationData;

            //  Instead of reduce(), fetch total from backend
            this.caseInitiationService
              .getMonthlyCaseInitiationTotal(month as string)
              .subscribe(
                (res) => {
                  this.caseInitiationTotal = res.total;
                },
                (error) => {
                  console.error('Error fetching monthly total', error);
                  this.caseInitiationTotal = 0;
                }
              );

            const updateCaseInitiationOptions: ChartOptions<'bar'> = {
              responsive: false,
              scales: this.getScales('Date', 'Cases'),
            };
            this.caseInitiationOptions = updateCaseInitiationOptions;

            setTimeout(() => {
              this.caseInitiationLoading = false;
            }, 0);
          },
          (error) => {
            console.log(
              'Error while fetching date wise case initiation data',
              error
            );
            this.showError(
              'Error while fetching date wise case initiation data'
            );

            setTimeout(() => {
              this.caseInitiationLoading = false;
            }, 0);
          }
        );
    }, 0);
  }
}

                  onMonthSelectForOutputQcCompletion(event: any) {
                    const month = this.outputQcCompletionData.labels[event.active[0].index] as string;
                
                    if (month) {
                      this.OutputQcCompletionOverlay = false;
                
                      // Use setTimeout to delay the loading state update
                      setTimeout(() => {
                        this.outputQcCompletionLoading = true;
                
                        this.caseInitiationService
                          .getDateWiseCaseOutputQcCompletionCount(month)
                          .subscribe(
                            (response) => {
                              const updatedOutputQcCompletionData: ChartConfiguration<'bar'>['data'] =
                                {
                                  labels: response.map((item:any) => item[0]),
                                  datasets: [
                                    {
                                      data: response.map((item:any) => item[1]),
                                      label: 'Output-QC Completed Cases',
                                      backgroundColor: ['#ed7014'],
                                      hoverBackgroundColor: ['#ADD8F6'],
                                    },
                                  ],
                                };
                
                              // Update the chart data
                              this.outputQcCompletionData = updatedOutputQcCompletionData;
                
                              const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
                                responsive: false,
                                scales: this.getScales('Date', 'Cases'),
                              };
                              this.outputQcCompletionOptions = updateOutputQcCompletedOptions;
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.outputQcCompletionLoading = false;
                              }, 0);
                            },
                            (error) => {
                              console.log(
                                'Error in onMonthSelectForOutputQcCompletion',
                                error
                              );
                              this.showError(
                                'Error while fetching date wise output qc completion data'
                              );
                
                              // Ensure that loading is set to false even in case of an error
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.outputQcCompletionLoading = false;
                              }, 0);
                            }
                          );
                      }, 0);
                    }
                  }
                
                  getLastSixMonthsCaseInitiationCount() {
                    this.caseInitiationLoading = true;
                    this.caseInitiationOverlay = true;
                    this.caseInitiationService.getLastSixMonthsCaseInitiationCount().subscribe(
                      (response) => {
                        const caseInitiationData: ChartConfiguration<'bar'>['data'] = {
                          labels: response.map((item:any) => item[0]),
                          datasets: [
                            {
                              data: response.map((item:any) => item[1]),
                              label: 'Initiated Cases',
                              backgroundColor: ['#ed7014'],
                              hoverBackgroundColor: ['#ADD8F6'],
                            },
                          ],
                        };
                        this.caseInitiationData = caseInitiationData;
                
                        const updateCaseInitiationOptions: ChartOptions<'bar'> = {
                          responsive: false,
                          scales: this.getScales('Month', 'Cases'),
                        };
                        this.caseInitiationOptions = updateCaseInitiationOptions;
                        this.caseInitiationLoading = false;
                         this.tryMergeCharts();  //line added oct-04
                      },
                      (error) => {
                        console.log(
                          'Error while fetching last six months case initiation data',
                          error
                        );
                        // this.showError(
                        //   'Error while fetching last six months case initiation data'
                        // );
                      }
                    );
                  }
                
                  getLastSixMonthsOutputQcCompletionCount() {
                    this.outputQcCompletionLoading = true;
                    this.OutputQcCompletionOverlay = true;
                    this.caseInitiationService
                      .getLastSixMonthsOutputQcCompletionCount()
                      .subscribe(
                        (response) => {
                          const updateOutputQcCompletedData: ChartConfiguration<'bar'>['data'] = {
                            labels: response.map((item:any) => item[0]),
                            datasets: [
                              {
                                data: response.map((item:any) => item[1]),
                                label: 'Output Qc Completed Cases',
                                backgroundColor: ['#ed7014'],
                                hoverBackgroundColor: ['#ADD8F6'],
                              },
                            ],
                          };
                          this.outputQcCompletionData = updateOutputQcCompletedData;
                  
                          const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
                            responsive: false,
                            scales: this.getScales('Month', 'Cases'),
                          };
                          this.outputQcCompletionOptions = updateOutputQcCompletedOptions;
                          this.outputQcCompletionLoading= false;
                        },
                        (error) => {
                          console.log(
                            'Error while fetching last six months output qc completion data',
                            error
                          );
                          // this.showError(
                          //   'Error while fetching last six months output qc completion data'
                          // );
                        }
                      );
                  }

                  // new code on sep-13

                  getLastSixMonthsInitiatedCasesChecksCount() {
  this.initiatedCasesChecksLoading = true;

  this.caseInitiationService
    .getTotalActualComponentsCountForLastSixMonths()
    .subscribe(
      (response) => {
        const updateIntiatedCasesChecksData: ChartConfiguration<'bar'>['data'] = {
          labels: response.map((item: any) => item[0]),
          datasets: [
            {
              data: response.map((item: any) => item[1]),
              label: 'Checks',
              backgroundColor: [
                '#f7d560', '#f78fb3', '#63d3af', '#9b59b6',
                '#74b9ff', '#ffeaa7', '#e17055', '#a29bfe',
                '#fd79a8', '#55efc4', '#dfe6e9', '#b19cd9',
              ],
              hoverBackgroundColor: [
                '#f5c400', '#e84393', '#00b894', '#6c5ce7',
                '#0984e3', '#fdcb6e', '#d63031', '#8e44ad',
                '#e056fd', '#00cec9', '#b2bec3', '#9b59b6',
              ],
            },
          ],
        };
        this.initiatedCasesChecksData = updateIntiatedCasesChecksData;

        const initiatedCasesChecksOptions: ChartOptions<'bar'> = {
          // responsive: false,
          // scales: this.getScales('Month', 'Cases'),
          // plugins: {
          //   datalabels: {
          //     anchor: 'end',
          //     align: 'end',
          //     color: '#000',
          //     font: { weight: 'bold', size: 12 },
          //     formatter: (value) => value.toLocaleString(),
          //   },
          // },

           responsive: true,                  // enable responsiveness
  maintainAspectRatio: false,        // allow full width/height stretch
  scales: this.getScales('Month', 'Cases'),
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      color: '#000',
      font: { weight: 'bold', size: 12 },
      formatter: (value) => value.toLocaleString(),
    },
  },
        };
        this.initiatedCasesChecksOptions = initiatedCasesChecksOptions;
        this.initiatedCasesChecksLoading = false;
            this.tryMergeCharts(); // line added oct-04
      },
      (error) => {
        console.log(
          'Error in getLastSixMonthsInitiatedCasesChecksCount',
          error
        );
      }
    );
}


                  ///old code 

//                   getLastSixMonthsInitiatedCasesChecksCount() {
//                     this.initiatedCasesChecksLoading = true;
//                     this.caseInitiationService
//                       .getTotalActualComponentsCountForLastSixMonths()
//                       .subscribe(
//                         (response) => {
//                           const updateIntiatedCasesChecksData: ChartConfiguration<'bar'>['data'] = {
//                             labels: response.map((item:any) => item[0]),
//                             datasets: [
//                               {
//                                 data: response.map((item:any) => item[1]),
//                                 label: 'Checks',
//                                backgroundColor: [
//   '#f7d560', // pastel yellow
//   '#f78fb3', // pastel pink
//   '#63d3af', // pastel green
//   '#9b59b6', // violet
//   '#74b9ff', // light blue
//   '#ffeaa7', // light yellow
//   '#e17055', // coral
//   '#a29bfe', // lavender
//   '#fd79a8', // pink
//   '#55efc4', // teal
//   '#dfe6e9', // light grey
//   '#b19cd9', // pastel purple
// ],
// hoverBackgroundColor: [
//   '#f5c400',
//   '#e84393',
//   '#00b894',
//   '#6c5ce7',
//   '#0984e3',
//   '#fdcb6e',
//   '#d63031',
//   '#8e44ad',
//   '#e056fd',
//   '#00cec9',
//   '#b2bec3',
//   '#9b59b6',
// ],

//                               },
//                             ],
//                           };
//                           this.initiatedCasesChecksData = updateIntiatedCasesChecksData;
                  
//                           const initiatedCasesChecksOptions: ChartOptions<'bar'> = {
//                             responsive: false,
//                             scales: this.getScales('Month', 'Cases'),
//                           };
//                           this.initiatedCasesChecksOptions = initiatedCasesChecksOptions;
//                           this.initiatedCasesChecksLoading= false;
//                         },
//                         (error) => {
//                           console.log(
//                             'Error in getLastSixMonthsInitiatedCasesChecksCount',
//                             error
//                           );
//                           // this.showError(
//                           //   'Error while fetching last six months initiated cases checks data'
//                           // );
//                         }
//                       );
//                   }
                  
                
                
                
                  navigateToCaseStatus(reportType:string){
                    this.router.navigate([`/crm/casestatus/${reportType}`]);
                  }
                // Added on 12Mar2024 
                getAllCrmMeetingDocsUsingLogedInUserId():void{
                  this.meetingService.getAllCrmMeetingDocsUsingLogedInUserId().subscribe({
                   next:(response:any)=>{
                     console.log("response515",response);
                     
                     this.dataSource.data = response;
                
                   },
                   error:(error)=>{
                     this.showError(error?.error?.message || error?.message);
                   }
                  })
                }
                // Added on 12Mar2024 
                
                //////////////New client dashboard New/////////////////////
                  //////////////New Analyst Dashboard///////////////////////
                  pendingChecksCount() {
                    return this.allComponentsDataService.pendingChecksCount();
                  }
                
                  rejectedChecksCount() {
                    this.allComponentsDataService.rejectedChecksCount().subscribe({
                      next: (response) => {
                        console.log('rejectedChecksCount', response);
                        this.rejectedChecks=response;
                        this.rejectedChecksCountLoading = false;
                      },
                      error: (error) => {
                        console.log('error in rejectedChecksCount', error);
                      },
                    });
                  }
                  wipChecksCount() {
                    this.allComponentsDataService.wipChecksCount().subscribe({
                      next: (response) => {
                        console.log('wipChecksCount', response);
                        this.wipChecks=response;
                        this.wipChecksCountLoading = false;
                      },
                      error: (error) => {
                        console.log('error in wipChecksCount', error);
                      },
                    });
                  }
                  closedChecksCount() {
                    return this.allComponentsDataService.closedChecksCount();
                  }
                  insuffClearedChecksCount() {
                    this.allComponentsDataService.insuffClearedChecksCount().subscribe({
                      next: (response) => {
                        console.log('insuffClearedChecksCount', response);
                        this.insuffClearedChecks = response;
                        this.insuffClearedChecksCountLoading=false;
                      },
                      error: (error) => {
                        console.log('error in insuffClearedChecksCount', error);
                      },
                    });
                  }
                
                  prepareChartForChecksClosedVsPending() {
                    this.checksVSPendingLoading = true;
                    const updateChecksVSPendingData: ChartConfiguration<'bar'>['data'] = {
                      labels: ['','','',''],
                      datasets: [
                        {
                          data: [this.closedChecks],
                          label: 'Closed Checks',
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                          ],
                          borderColor: [
                            'rgb(255, 99, 132)'
                          ],
                          borderWidth: 1
                        },
                        {
                          data: [this.pendingChecks],
                          label: 'Pending Checks',
                          backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                          ],
                          borderColor: [
                            'rgb(153, 102, 255)',
                          ],
                          borderWidth: 1
                        }
                      ],
                    };
                    this.checksVSPendingData = updateChecksVSPendingData;
                
                    this.checksVSPendingLoading= false;
                  }
                
                  getNoOfEffortsOnTodayForAnalyst(){
                    this.allComponentsDataService.getNoOfEffortsOnTodayForAnalyst().subscribe({
                      next: (response) => {
                        console.log('NoOfEffortsOnToday', response);
                        this.noOfEffortsOnToday=response;
                        this.noOfEffortsOnTodayLoading = false;
                      },
                      error: (error) => {
                        console.log('error in NoOfEffortsOnToday', error);
                      },
                    });
                  }
                  // 30Jan2023 
                  getNoOfApproachedTatChecksForAnalyst(){
                    this.allComponentsDataService.getNoOfApproachedTatChecksForAnalyst().subscribe({
                      next:(response) => {
                        console.log("noOfApprochedTatChecks",response);
                        this.noOfApprochedTatChecks=response;
                        this.noOfApproachedTATLoading=false;
                      },
                      error:(error)=>{
                        console.log('error in noOfApprochedTatChecks', error);
                 
                      }
                    })
                  }
                  getNoOfBeyondTatChecksForAnalyst(){
                    this.allComponentsDataService.getNoOfBeyondTatChecksForAnalyst().subscribe({
                      next:(response) => {
                        console.log("noOfBeyondTatChecks",response);
                        this.noOfBeyondTatChecks=response;
                        this.noOfBeyondTATLoading=false;
                      },
                      error:(error)=>{
                        console.log('error in noOfBeyondTatChecks', error); 
                      }
                    })
                  }
                  ///////07Feb2024///
                  getNoOfEffortsPerDayForAnalyst():void{
                    this.allComponentsDataService.getNoOfEffortsPerDayForAnalyst().subscribe({
                     next:(response:any[])=>{
                        const noOfEffortsPerDayChartData:ChartConfiguration<'line'>['data']={
                          labels:response.length && response[0].xData.length ? response[0].xData : [],
                          datasets:response.map(item => ({
                            data:item.yData,
                            label:item.id,
                            fill:true,
                            tension:0.5,
                            borderColor:'black',
                            backgroundColor:item.color,
                          }))
                        }
                
                        this.noOfEffortsPerDayData= noOfEffortsPerDayChartData;
                        this.noOfEffortsPerDayLoading=false;
                     },
                     error:(error)=>{
                      console.log('error in getNoOfEffortsPerDayForAnalyst', error);
                
                     } 
                    })
                  }
                
              

                  getScales(xtext: string, ytext: string) {
                    return {
                      x: {
                        
                        title: {
                          color: 'black',
                          display: true,
                          text: xtext,
                          font: {
                            weight: 'bold' as 'bold',
                          },
                        },
                      },
                      y: {
                        
                        title: {
                          color: 'black',
                          display: true,
                          text: ytext,
                          font: {
                            weight: 'bold' as 'bold',
                          },
                        },
                      },
                    };
                  }
                
                  //////////////New Analyst Dashboard///////////////////////
                  //////////////Tl Dashboard/////////////////////
                  tlPendingAndCompletedChecksForTheMonthCount(){
                    this.allComponentsDataService.tlPendingAndCompletedChecksForTheMonthCount().subscribe({
                      next : (response:any)=>{
                
                        this.tlPendingChecksCount = response.pendingCount;
                        this.tlCompletedChecksCount = response.completedCount;
                        this.tlMentorPending=response.mentorCount;
                        this.tlPendingAndCompletedChecksForMonthCountLoading = false;
                
                      },
                      error : (error) => {
                              console.log(error);
                              this.showError(error.message || "Error In Getting TL Pending And Completed Checkks For The Month");    
                      }
                    })
                  }
                  /////////////TL dashboard//////////////////////
                  // <!-- Managment level Dashboard  -->/////////////
                
                  private _filter(value: string): string[] {
                    const filterValue = value.toLowerCase();
                
                    return this.ManagementclientNames.filter(option => option.toLowerCase().includes(filterValue));
                  }
                  managementGetInflowsAndOutflowsPerDay(): void {
                    this.ManagementCaseInflowOutflowLoading = true;
                    this.caseUploadService.getInflowsAndOutflowsPerDay(this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
                      next: (response: any) => {
                        const newLineChartData: ChartConfiguration<'line'>['data'] = {
                          labels:
                            response.length && response[0].data.length
                              ? response[0].data.map((item:any) => item.x)
                              : [],
                          datasets: response.map((item:any) => ({
                            data: item.data.map((dataItem:any) => dataItem.y.length),
                            label: item.id,
                            fill: true,
                            tension: 0.5,
                            borderColor: 'black',
                            backgroundColor: item.color,
                          })),
                        };
                
                        this.ManagementcaseInflowOutflowData = newLineChartData;
                        this.ManagementCaseInflowOutflowLoading = false; // Set loading to false when data is loaded
                      },
                      error: (error) => {
                        console.log('error in getInflowsAndOutflowsPerDay', error);
                      },
                    });
                  }
                  managementGetPendingFrequencyBucketDetails(): void {
                    this.ManagementPendingFrequencyBucketLoading = true;
                
                    this.caseUploadService.getPendingFrequencyBucketDetails(null,this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
                      next: (response:any) => {
                        const pendingFrequencyBucketKeys = Object.keys(response);
                        const pendingFrequencyBucketLabels = pendingFrequencyBucketKeys.length
                          ? pendingFrequencyBucketKeys.filter((item) => item != 'Total')
                          : [];
                
                        const ManagementPendingFrequencyBucketData: ChartConfiguration<'pie'>['data'] = {
                          labels: pendingFrequencyBucketLabels,
                          datasets: [
                            {
                              data: pendingFrequencyBucketLabels.map(
                                (item) => response[item].length
                              ),
                              backgroundColor: [
                                '#080',
                                '#26D9A9',
                                '#FFBF00',
                                'orange',
                                'pink',
                                '#ed7014',
                              ],
                              hoverBackgroundColor: [
                                'lightcoral',
                                'lightgreen',
                                'lightyellow',
                                'lightsalmon',
                                'lightpink',
                                'lightblue',
                              ],
                              hoverOffset: 4,
                            },
                          ],
                        };
                        this.ManagementPendingFrequencyBucketData = ManagementPendingFrequencyBucketData;
                        this.ManagementPendingFrequencyBucketLoading = false;
                      },
                      error: (error) => {
                        console.log('error in getPendingFrequencyBucketDetails', error);
                      },
                    });
                  }
                  managemenGetCasesBreakdown(): void {
                    this.ManagementGradingColorLoading = true;
                
                    this.caseUploadService.getCasesBreakdown(null,this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe({
                      next: (response:any) => {
                        const ManagementGradingColorData: ChartConfiguration<'pie'>['data'] = {
                          labels: ['Green', 'Red', 'Amber'],
                          datasets: [
                            {
                              data: [
                                response['greenCasesCount'],
                                response['redCasesCount'],
                                response['amberCasesCount'],
                              ],
                              backgroundColor: ['#080', '#F00', '#FFBF00'],
                              hoverOffset: 4,
                            },
                          ],
                        };
                        this.ManagementGradingColorData = ManagementGradingColorData;
                        this.ManagementGradingColorLoading = false;
                      },
                      error: (error) => {
                        console.log('error in getCasesBreakdown', error);
                      },
                    });
                  }
                  managementGetWipSummary(): void {
                    this.caseUploadService.getWipSummary(null).subscribe({
                      next: (response) => {
                        // console.log("getWipSummary response",response);
                      },
                      error: (error) => {
                        console.log('error in getWipSummary', error);
                      },
                    });
                  }
                  managementGetCaseDataForDashboard(): void {
                    this.caseUploadService.getCaseDataForDashboard().subscribe({
                      next: (response:any) => {
                        this.ManagementcaseDataForDashboard = Object.assign(response) ;
                        this.ManagementFilteredCaseDataForDashboard = Object.assign(response);
                        this.ManagementcaseDataForDashboardLoading = false;
                        const clients = response.allClients.map((client: { name: any; }) => client.name)
                        this.ManagementclientNames = clients;
                        this.ManagementFilteredClientNames = this.ManagementClientNameControl.valueChanges.pipe(
                          startWith(''),
                          map((value:any) => this._filter(value)),
                        );
                        // console.log('Clients NAmes', this.ManagementFilteredClientNames);
                      },
                      error: (error) => {
                        console.log('error in getCaseDataForDashboard', error);
                      },
                    });
                  }
                
                // Inside your component class
                onClientNameOptionSelected(event: MatAutocompleteSelectedEvent) {
                  this.ManagementSelectedClientIds=[];
                  const selectedValue = event.option.value;
                  console.log('Selected value:', selectedValue);
                  this.ManagementSelectedClientId= this.ManagementcaseDataForDashboard.allClients.find((item:any) => item.name.trim()===selectedValue.trim())?._id;
                  const inflowForClient = this.ManagementcaseDataForDashboard.inflowForFilter.reduce((count:number,currentValue:string) => {
                    if(currentValue===this.ManagementSelectedClientId){
                      count++
                    }
                    return count;
                  },0)
                
                  const outflowForClient = this.ManagementcaseDataForDashboard.outflowForFilter.reduce((count:number,currentValue:string)=>{
                    if(currentValue === this.ManagementSelectedClientId){
                      count++;
                    }
                    return count;
                  },0)
                
                  const wipForClient = this.ManagementcaseDataForDashboard.wipForFilter.reduce((count:number,currentValue:string) => {
                    if(currentValue===this.ManagementSelectedClientId){
                      count++;
                    }
                    return count;
                  })
                
                  const insuffForClient = this.ManagementcaseDataForDashboard.insuffForFilter.reduce((count:number,currentValue:string) =>{
                    if(currentValue === this.ManagementSelectedClientId){
                      count++;
                    }
                    return count;
                  },0)
                
                  const insuffWipForClient = this.ManagementcaseDataForDashboard.insuffWipForFilter.reduce((count:number,currentValue:string) =>{
                    if(currentValue === this.ManagementSelectedClientId){
                      count++;
                    }
                    return count;
                  },0)
                  
                  console.log("inflowForClient",inflowForClient,"outflowForClient",outflowForClient,"wipForClient",wipForClient,"insuffForClient",insuffForClient,"insuffWipForClient",insuffWipForClient);
                  
                  this.ManagementFilteredCaseDataForDashboard = {
                    inflow: !isNaN(inflowForClient) ? inflowForClient : 0,
                    outflow: !isNaN(outflowForClient) ? outflowForClient : 0,
                    wip: !isNaN(wipForClient) ? wipForClient : 0,
                    insuff: !isNaN(insuffForClient) ? insuffForClient : 0,
                    insuffWip: !isNaN(insuffForClient) ? insuffForClient : 0,
                    clientCount: this.ManagementcaseDataForDashboard.clientCount
                  };
                
                  this.managementGetInflowsAndOutflowsPerDay();
                  this.managementGetPendingFrequencyBucketDetails();
                  this.managementGetLastSixMonthsCaseInitiationCount();
                  this.managemenGetCasesBreakdown();
                  this.managementGetLastSixMonthsOutputQcCompletionCount();
                  this.managementGetLastSixMonthsInitiatedCasesChecksCount();
                }
                  
                onChangeClientName(event: Event){
                  const inputElement = event.target as HTMLInputElement
                  const inputText = inputElement?.value || ''
                 console.log("inputText",inputText);
                 console.log("this.ManagementcaseDataForDashboard;",this.ManagementcaseDataForDashboard);
                 
                 if(!inputText){
                  this.ManagementSelectedClientId='';
                  this.ManagementFilteredCaseDataForDashboard = Object.assign(this.ManagementcaseDataForDashboard);
                  this.managementGetInflowsAndOutflowsPerDay();
                  this.managementGetPendingFrequencyBucketDetails();
                  this.managementGetLastSixMonthsInitiatedCasesChecksCount();
                
                 }
                
                }
                
                prepareMinicardsDataForTopClients(inputClients:any):void{
                   this.ManagementSelectedClientId='';
                   const topTenClientsNames=inputClients;
                
                  this.ManagementSelectedClientIds = topTenClientsNames.map((company:any) => {
                    const clientDetail = this.ManagementcaseDataForDashboard.allClients.find((item:any)=> item.name.trim()=== company.trim());
                    return clientDetail ? clientDetail?._id : null;
                  });
                
                  const inflowForClients = this.ManagementcaseDataForDashboard.inflowForFilter.reduce((count:number,currentValue:string) => {
                    if(this.ManagementSelectedClientIds.includes(currentValue)){
                      count++
                    }
                    return count;
                  },0)
                
                  const outflowForClients = this.ManagementcaseDataForDashboard.outflowForFilter.reduce((count:number,currentValue:string)=>{
                    if(this.ManagementSelectedClientIds.includes(currentValue)){
                      count++;
                    }
                    return count;
                  },0)
                
                  const wipForClients = this.ManagementcaseDataForDashboard.wipForFilter.reduce((count:number,currentValue:string) => {
                    if(this.ManagementSelectedClientIds.includes(currentValue)){
                      count++;
                    }
                    return count;
                  })
                
                  const insuffForClients = this.ManagementcaseDataForDashboard.insuffForFilter.reduce((count:number,currentValue:string) =>{
                    if(this.ManagementSelectedClientIds.includes(currentValue)){
                      count++;
                    }
                    return count;
                  },0)
                
                  const insuffWipForClients = this.ManagementcaseDataForDashboard.insuffWipForFilter.reduce((count:number,currentValue:string) =>{
                    if(this.ManagementSelectedClientIds.includes(currentValue)){
                      count++;
                    }
                    return count;
                  },0)
                  
                  this.ManagementFilteredCaseDataForDashboard = {
                    inflow: !isNaN(inflowForClients) ? inflowForClients : 0,
                    outflow: !isNaN(outflowForClients) ? outflowForClients : 0,
                    wip: !isNaN(wipForClients) ? wipForClients : 0,
                    insuff: !isNaN(insuffForClients) ? insuffForClients : 0,
                    insuffWip: !isNaN(insuffWipForClients) ? insuffWipForClients : 0,
                    clientCount: this.ManagementcaseDataForDashboard.clientCount
                  };
                
                  this.managementGetInflowsAndOutflowsPerDay();
                  this.managementGetPendingFrequencyBucketDetails();
                  this.managementGetLastSixMonthsCaseInitiationCount();
                  this.managemenGetCasesBreakdown();
                  this.managementGetLastSixMonthsOutputQcCompletionCount();
                  this.managementGetLastSixMonthsInitiatedCasesChecksCount();
                
                }
                
                topTenClientsHandler():void{
                  const topTenClientsNames=['TCS - BPS','TCS e-Serve International Limited','TCS IT - Projects','TCS IT - Regular','MBRDI-Regular',
                  'MBRDI-Fastrack','Tech Mahindra Limited','Quest Global Engineering Services Private Limited','Firstforce Technologies Private Limited',
                  'Teleperformance Global Services Private Limited'];
                  this.prepareMinicardsDataForTopClients(topTenClientsNames);
                }
                topTwentyClientsHandler():void{
                  const topTenClientsNames=['TCS - BPS','TCS e-Serve International Limited','TCS IT - Projects','TCS IT - Regular','MBRDI-Regular',
                  'MBRDI-Fastrack','Tech Mahindra Limited','Quest Global Engineering Services Private Limited','Firstforce Technologies Private Limited',
                  'Teleperformance Global Services Private Limited','Unravel Data Systems Private Limited','Ceragon Networks India Private Limited',
                'Micro Genesis techsoft Private Limited','Weir Minerals (India) Private Limited','Tescra Software Private Limited','Think N Solutions Software Private Limited','Terumo Penpol Private Limited','Think N Solutions Software Private Limited','Terumo Penpol Private Limited','Sigma Allied Services Private Limited'];
                  this.prepareMinicardsDataForTopClients(topTenClientsNames);
                }
                managementGetClientPendingFrequencyBucket(): void {
                    this.caseUploadService.getClientPendingFrequencyBucket().subscribe({
                      next: (response) => {
                        console.log('getClientPendingFrequencyBucket response', response);
                      },
                      error: (error) => {
                        console.log('error in getClientPendingFrequencyBucket', error);
                        this.showError(
                          'error while fetching client pending frequency bucket data'
                        );
                      },
                    });
                }
                
                  //CASE INITIATION
                
                  managementOnMonthSelectForCaseInitiation(event: any) {
                    const month = this.ManagementCaseInitiationData.labels[event.active[0].index];
                
                    if (month) {
                      this.ManagementCaseInitiationOverlay = false;
                
                      // Use setTimeout to delay the loading state update
                      setTimeout(() => {
                        this.ManagementCaseInitiationLoading = true;
                
                        this.caseInitiationService
                          .getDateWiseCaseInitiationData(month as string,this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
                          .subscribe(
                            (response) => {
                              const updatedCaseInitiationData: ChartConfiguration<'bar'>['data'] =
                                {
                                  labels: response.map((item:any) => item[0]),
                                  datasets: [
                                    {
                                      data: response.map((item:any) => item[1]),
                                      label: 'Initiated Cases',
                                      backgroundColor: ['#ed7014'],
                                      hoverBackgroundColor: ['#ADD8F6'],
                                    },
                                  ],
                                };
                
                              // Update the chart data
                              this.ManagementCaseInitiationData = updatedCaseInitiationData;
                
                              const updateCaseInitiationOptions: ChartOptions<'bar'> = {
                                responsive: false,
                                scales: this.getScales('Date', 'Cases'),
                              };
                              this.ManagementCaseInitiationOptions = updateCaseInitiationOptions;
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.ManagementCaseInitiationLoading = false;
                              }, 0);
                            },
                            (error) => {
                              console.log(
                                'Error while fetching date wise case initiation data',
                                error
                              );
                              this.showError(
                                'Error while fetching date wise case initiation data'
                              );
                
                              // Ensure that loading is set to false even in case of an error
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.ManagementCaseInitiationLoading = false;
                              }, 0);
                            }
                          );
                      }, 0);
                    }
                  }
                  managementOnMonthSelectForOutputQcCompletion(event: any) {
                    const month = this.ManagementOutputQcCompletionData.labels[event.active[0].index] as string;
                
                    if (month) {
                      this.ManagementOutputQcCompletionOverlay = false;
                
                      // Use setTimeout to delay the loading state update
                      setTimeout(() => {
                        this.ManagementOutputQcCompletionLoading = true;
                
                        this.caseInitiationService
                          .getDateWiseCaseOutputQcCompletionCount(month,this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
                          .subscribe(
                            (response) => {
                              const updatedOutputQcCompletionData: ChartConfiguration<'bar'>['data'] =
                                {
                                  labels: response.map((item:any) => item[0]),
                                  datasets: [
                                    {
                                      data: response.map((item:any) => item[1]),
                                      label: 'Output-QC Completed Cases',
                                      backgroundColor: ['#ed7014'],
                                      hoverBackgroundColor: ['#ADD8F6'],
                                    },
                                  ],
                                };
                
                              // Update the chart data
                              this.ManagementOutputQcCompletionData = updatedOutputQcCompletionData;
                
                              const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
                                responsive: false,
                                scales: this.getScales('Date', 'Cases'),
                              };
                              this.ManagementOutputQcCompletionOptions = updateOutputQcCompletedOptions;
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.ManagementOutputQcCompletionLoading = false;
                              }, 0);
                            },
                            (error) => {
                              console.log(
                                'Error in onMonthSelectForOutputQcCompletion',
                                error
                              );
                              this.showError(
                                'Error while fetching date wise output qc completion data'
                              );
                
                              // Ensure that loading is set to false even in case of an error
                              // Use setTimeout to delay the loading state update
                              setTimeout(() => {
                                this.ManagementOutputQcCompletionLoading = false;
                              }, 0);
                            }
                          );
                      }, 0);
                    }
                  }
                
                  managementGetLastSixMonthsCaseInitiationCount() {
                    this.ManagementCaseInitiationLoading = true;
                    this.ManagementCaseInitiationOverlay = true;
                    this.caseInitiationService.getLastSixMonthsCaseInitiationCount(this.ManagementSelectedClientId,this.ManagementSelectedClientIds).subscribe(
                      (response) => {
                        const ManagementCaseInitiationData: ChartConfiguration<'bar'>['data'] = {
                          labels: response.map((item:any) => item[0]),
                          datasets: [
                            {
                              data: response.map((item:any) => item[1]),
                              label: 'Initiated Cases',
                              backgroundColor: ['#ed7014'],
                              hoverBackgroundColor: ['#ADD8F6'],
                            },
                          ],
                        };
                        this.ManagementCaseInitiationData = ManagementCaseInitiationData;
                
                        const updateCaseInitiationOptions: ChartOptions<'bar'> = {
                          responsive: false,
                          scales: this.getScales('Month', 'Cases'),
                        };
                        this.ManagementCaseInitiationOptions = updateCaseInitiationOptions;
                        this.ManagementCaseInitiationLoading = false;
                      },
                      (error) => {
                        console.log(
                          'Error while fetching last six months case initiation data',
                          error
                        );
                        this.showError(
                          'Error while fetching last six months case initiation data'
                        );
                      }
                    );
                  }
                
                  managementGetLastSixMonthsOutputQcCompletionCount() {
                    this.ManagementOutputQcCompletionLoading = true;
                    this.ManagementOutputQcCompletionOverlay = true;
                    this.caseInitiationService
                      .getLastSixMonthsOutputQcCompletionCount(this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
                      .subscribe(
                        (response) => {
                          const updateOutputQcCompletedData: ChartConfiguration<'bar'>['data'] = {
                            labels: response.map((item:any) => item[0]),
                            datasets: [
                              {
                                data: response.map((item:any) => item[1]),
                                label: 'Output Qc Completed Cases',
                                backgroundColor: ['#ed7014'],
                                hoverBackgroundColor: ['#ADD8F6'],
                              },
                            ],
                          };
                          this.ManagementOutputQcCompletionData = updateOutputQcCompletedData;
                  
                          const updateOutputQcCompletedOptions: ChartOptions<'bar'> = {
                            responsive: false,
                            scales: this.getScales('Month', 'Cases'),
                          };
                          this.ManagementOutputQcCompletionOptions = updateOutputQcCompletedOptions;
                          this.ManagementOutputQcCompletionLoading= false;
                        },
                        (error) => {
                          console.log(
                            'Error while fetching last six months output qc completion data',
                            error
                          );
                          this.showError(
                            'Error while fetching last six months output qc completion data'
                          );
                        }
                      );
                  }
                  managementGetLastSixMonthsInitiatedCasesChecksCount() {
                    this.ManagementInitiatedCasesChecksLoading = true;
                    this.caseInitiationService
                      .getTotalActualComponentsCountForLastSixMonths(this.ManagementSelectedClientId,this.ManagementSelectedClientIds)
                      .subscribe(
                        (response) => {
                          const updateIntiatedCasesChecksData: ChartConfiguration<'bar'>['data'] = {
                            labels: response.map((item:any) => item[0]),
                            datasets: [
                              {
                                data: response.map((item:any) => item[1]),
                                label: 'Checks',
                                backgroundColor: ['#ed7014'],
                                hoverBackgroundColor: ['#ADD8F6'],
                              },
                            ],
                          };
                          this.ManagementInitiatedCasesChecksData = updateIntiatedCasesChecksData;
                  
                          const ManagementInitiatedCasesChecksOptions: ChartOptions<'bar'> = {
                            responsive: false,
                            scales: this.getScales('Month', 'Cases'),
                          };
                          this.ManagementInitiatedCasesChecksOptions = ManagementInitiatedCasesChecksOptions;
                          this.ManagementInitiatedCasesChecksLoading= false;
                        },
                        (error) => {
                          console.log(
                            'Error in getLastSixMonthsInitiatedCasesChecksCount',
                            error
                          );
                          this.showError(
                            'Error while fetching last six months initiated cases checks data'
                          );
                        }
                      );
                  }
                  
                
                
                  getManagmentScales(xtext: string, ytext: string) {
                    return {
                      x: {
                        title: {
                          color: 'black',
                          display: true,
                          text: xtext,
                          font: {
                            weight: 'bold',
                          },
                        },
                      },
                      y: {
                        title: {
                          color: 'black',
                          display: true,
                          text: ytext,
                          font: {
                            weight: 'bold',
                          },
                        },
                      },
                    };
                  }
                
                  refreshPage() {
                    window.location.reload()
                  }
                

///added code-sep21
goToDecaseList(event: Event) {
  event.stopPropagation(); // prevent triggering parent card click
  this.router.navigate(['/home/operations/dataentry/decaselistfortl']);
}

goTopendingDeCase(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/operations/dataentry/decaselistfortl']);
}

goInceptionQc(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/inputqc/inputqccaselist']);
}

getUnalocatedCheks(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/verification/listofcheckstoallocate']);
}

getInsuffdata(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/insufficiencies/scrutinyinsuflist']);
}
getOnHold(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/verification/analystlistofchecks']);
}

getPendingInterimQc(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/mentorreview/mentorreviewlist']);
}

getPedingFinalQc(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/outputqc/allocateoutputqc']);
}
getSinglecheckPeding(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/operations/dataentry/decaselistfortl']);
}

getAllchecksCompleted(event:Event){
  event.stopPropagation();
  this.router.navigate(['home/verification/downloadwordreportnew']);
}

getAllcostApprovalPending(event:Event){
  event.stopPropagation();
  this.router.navigate(['/home/insufficiencies/scrutinyinsuflist']);
}

///added code sep-24///

getUnallocatedCountForAllBgv() {
  this.componentDataService.findAllUnallocatedComponentsForUser([]) // send empty array if backend can handle dynamic
    .subscribe((res: any[]) => {
      // res is an array like [{ component, data: [...] }, ...]

      // sum all data lengths to get total unallocated checks
      this.unallocatedForAllBgv = res.reduce((sum, item) => sum + (item.data?.length || 0), 0);
    }, (error) => {
      console.error('Error fetching unallocated checks', error);
      this.unallocatedForAllBgv = 0;
    });
}


getUnallocatedCountForDashboard() {
  this.componentAccessService.readAllForAUser().subscribe(
    (accessList: any[]) => {
      const componentNames = accessList.map(c => c.component.name);

      if (!componentNames.length) {
        this.unallocatedCount = 0;
        return;
      }

      this.componentDataService.findAllUnallocatedComponentsForUser(componentNames)
        .subscribe((groups: any[]) => {
          let total = 0;

          groups.forEach(group => {
            group.data.forEach((item: any) => {
              //  only count truly unallocated
              if (!item.verificationAllocatedTo && !item.allocatedToVendor && !item.allocatedToFE) {
                total++;
              }
            });
          });

          this.unallocatedCount = total; //  Correct unallocated count
        }, err => {
          console.error(err);
          this.unallocatedCount = 0;
        });
    },
    err => {
      console.error(err);
      this.unallocatedCount = 0;
    }
  );
}

///code added sep-25;

getInsuffCountForDashboard() {
  this.componentService.findAllComponents().subscribe(
    (components: any[]) => {
      let total = 0;

      const requests = components.map(comp =>
        this.componentDataService.findInsufficienciesForScrutiny(comp.name)
      );

      // Run all requests in parallel
      forkJoin(requests).subscribe(
        (responses: any[][]) => {
          responses.forEach(resArr => {
            total += resArr.length;  // ✅ count insuff checks directly
          });

          this.insuffCount = total;
        },
        error => {
          console.error("Error fetching insuff counts", error);
          this.insuffCount = 0;
        }
      );
    },
    error => {
      console.error("Error loading components", error);
      this.insuffCount = 0;
    }
  );
}

////
////code added sep-25

getMentorReviewCountForDashboard() {
  this.componentAccessService.readAllForAUser().pipe(
    switchMap((componentAccessList: any[]) => {
      const observables = componentAccessList.map(item1 =>
        this.componentDataService.findComponentsFor(item1.component.name, 'MENTOR-REVIEW').pipe(
          catchError(() => of([])), // prevent breaking
          map((response2: any[]) => response2.length) // take array length as count
        )
      );
      return forkJoin(observables);
    })
  ).subscribe(counts => {
    this.mentorReviewCount = counts.reduce((acc, c) => acc + c, 0);
  });
}
///////////////////////////////////////////////

///added code sep-25///

//  loadOnHoldCount(): void {
//     // 1️⃣ Get accessible components
//     this.componentAccessService.readAllForAUser().subscribe(
//       (accessList: any[]) => {
//         if (!accessList || accessList.length === 0) {
//           this.caseDataForDashboardLoading = false;
//           return;
//         }

//         const componentNames = accessList.map(a => a.component.name);

//         // 2️⃣ Fetch data from API
//         this.componentDataService.getAllChecksAllocatedToMeForVerificationMulti(componentNames)
//           .subscribe((results: any[]) => {
//             let count = 0;

//             results.forEach(result => {
//               const compData = result.data;

//               compData.forEach((item: { stage: string }) => {
//                 if (item.stage === 'ON-HOLD') {
//                   count++;
//                 }
//               });
//             });

//             this.onHoldCount = count;
//             this.caseDataForDashboardLoading = false;
//           },
//           error => {
//             console.error('Error fetching On-Hold count:', error);
//             this.caseDataForDashboardLoading = false;
//           });
//       },
//       error => {
//         console.error('Error fetching component access list:', error);
//         this.caseDataForDashboardLoading = false;
//       }
//     );
//   }

loadOnHoldCount(): void {
  this.caseDataForDashboardLoading = true;

  this.componentAccessService.readAllForAUser().subscribe(
    (accessList: any[]) => {
      if (!accessList || accessList.length === 0) {
        this.caseDataForDashboardLoading = false;
        return;
      }

      const componentNames = accessList.map(a => a.component.name);

      this.componentDataService
        .getAllChecksAllocatedToMeForVerificationMulti(componentNames)
        .subscribe(
          (results: any[]) => {
            let allItems: any[] = [];

            // 🔹 Flatten all items from all components into one array
            results.forEach(result => {
              if (result && result.data) {
                allItems = allItems.concat(result.data);
              }
            });

            // 🔹 Filter only ON-HOLD items (case-insensitive + trim)
            let onHoldItems = allItems.filter(
              item =>
                item.stage &&
                item.stage.trim().toUpperCase() === 'ON-HOLD'
            );

            // 🔹 Deduplicate by unique ID (if available, e.g., checkId)
            if (onHoldItems.length > 0 && onHoldItems[0].checkId) {
              onHoldItems = Array.from(
                new Map(onHoldItems.map(item => [item.checkId, item])).values()
              );
            }

            // Assign the correct count
            this.onHoldCount = onHoldItems.length;

            this.caseDataForDashboardLoading = false;
          },
          error => {
            console.error('Error fetching On-Hold count:', error);
            this.caseDataForDashboardLoading = false;
          }
        );
    },
    error => {
      console.error('Error fetching component access list:', error);
      this.caseDataForDashboardLoading = false;
    }
  );
}
  //////////////////////////
//added code sep-25
loadOutputQcAcceptedCount(): void {
  this.caseDataForDashboardLoading = true;

  // pageCount = 0 (or whatever initial page you want to use)
  this.caseUploadService.findAllCasesWithStatus("OUTPUTQC-ACCEPTED", 0).subscribe(
    response => {
      // API should return totalCount field
      this.outputQcAcceptedCount = response.totalCount || 0;
      this.caseDataForDashboardLoading = false;
    },
    error => {
      console.error("Error fetching OUTPUTQC-ACCEPTED count:", error);
      this.caseDataForDashboardLoading = false;
    }
  );
}
////

///sep-26

private getTatStatsTotals(): void {
  this.caseUploadService.getTatStatsTrend().subscribe(
    (res: any[]) => {
      // res is an array like [{month: 'Apr', inTat: 12, outTat: 5}, ...]
      this.inTatTotal = res.reduce((sum, item) => sum + (item.inTat || 0), 0);
      this.outTatTotal = res.reduce((sum, item) => sum + (item.outTat || 0), 0);
    },
    (err) => {
      console.error('Error fetching TAT stats', err);
      this.inTatTotal = 0;
      this.outTatTotal = 0;
    }
  );
}
/////////////////////////

// sep-28

//added code oct-04///
// mergeCaseAndComponentTrends() {
//   if (!this.caseInitiationData || !this.initiatedCasesChecksData) return;

//   const labels = this.caseInitiationData.labels || this.initiatedCasesChecksData.labels;

//   const caseInitiationCounts = this.caseInitiationData.datasets[0].data;
//   const componentCounts = this.initiatedCasesChecksData.datasets[0].data;

//   this.mergedCaseComponentData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Case Initiations',
//         data: caseInitiationCounts,
//         backgroundColor: '#42A5F5',
//       },
//       {
//         label: 'Total Components Received',
//         data: componentCounts,
//         backgroundColor: '#FFA726',
//       }
//     ]
//   };

//   this.mergedCaseComponentOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       tooltip: { enabled: true }
//     },
//     scales: {
//       x: { title: { display: true, text: 'Month' } },
//       y: { title: { display: true, text: 'Count' }, beginAtZero: true }
//     }
//   };

//   this.mergedCaseComponentLoading = false;
// }

///////

///code added oct-04
mergeCaseAndComponentTrends() {
  if (!this.caseInitiationData || !this.initiatedCasesChecksData) return;

  const labels = this.caseInitiationData.labels || this.initiatedCasesChecksData.labels;

  const caseInitiationCounts = this.caseInitiationData.datasets[0].data;
  const componentCounts = this.initiatedCasesChecksData.datasets[0].data;

  this.mergedCaseComponentData = {
    labels: labels,
    datasets: [
      {
        label: 'Case Initiations',
        data: caseInitiationCounts,
        backgroundColor: '#42A5F5',
        borderRadius: 6
      },
      {
        label: 'Total Components Received',
        data: componentCounts,
        backgroundColor: '#FFA726',
        borderRadius: 6
      }
    ]
  };

  this.mergedCaseComponentOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#444',
        font: { weight: 'bold' },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: {
        title: { display: true, text: 'Count' },
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  this.mergedCaseComponentLoading = false;
}
// tryMergeCharts() {
//   if (this.caseInitiationData && this.initiatedCasesChecksData) {
//     this.mergeCaseAndComponentTrends();
//   }
// }

///

tryMergeCharts() {
  // Initialize empty labels if needed
  const labels = this.caseInitiationData?.labels || this.initiatedCasesChecksData?.labels || [];

  // Prepare empty datasets first
  const caseInitiationCounts = this.caseInitiationData?.datasets?.[0]?.data || [];
  const componentCounts = this.initiatedCasesChecksData?.datasets?.[0]?.data || [];

  // Merge available data — even if one is missing
  this.mergedCaseComponentData = {
    labels: labels,
    datasets: [
      {
        label: 'Case Initiations',
        data: caseInitiationCounts,
        backgroundColor: '#42A5F5',
        borderRadius: 6
      },
      {
        label: 'Total Components Received',
        data: componentCounts,
        backgroundColor: '#FFA726',
        borderRadius: 6
      }
    ]
  };

  this.mergedCaseComponentOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#444',
        font: { weight: 'bold' },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: {
        title: { display: true, text: 'Count' },
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };

  // As soon as one dataset is ready, show partial chart
  this.mergedCaseComponentLoading = false;
}

////end oct -04


}



