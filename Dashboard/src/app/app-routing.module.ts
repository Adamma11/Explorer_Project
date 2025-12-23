import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PostsComponent } from './admin/dashboard/posts/posts.component';
import { UniversitiesComponent } from './masters/universities/universities.component';
import { UniversityListComponent } from './masters/university-list/university-list.component';
import { CompanyListComponent } from './masters/company-list/company-list.component';
import { CompanyDetailsComponent } from './masters/company-details/company-details.component';
import { LoginComponent } from './login/login.component';
import { OtpValidationComponent } from './otp-validation/otp-validation.component';
import { BranchListComponent } from './masters/branch-list/branch-list.component';
import { BranchDetailsComponent } from './masters/branch-details/branch-details.component';
import { PinDetailsComponent } from './masters/pin-details/pin-details.component';
import { PinListComponent } from './masters/pin-list/pin-list.component';
import { AnalysisTypeDetailsComponent } from './masters/analysis-type-details/analysis-type-details.component';
import { AnalysisTypeComponent } from './masters/analysis-type/analysis-type.component';
import { AnalysisCodeDetailsComponent } from './masters/analysis-code-details/analysis-code-details.component';
import { AnalysisCodeComponent } from './masters/analysis-code/analysis-code.component';
import { StandradVerbiageListComponent } from './masters/standrad-verbiage-list/standrad-verbiage-list.component';
import { StandradVerbiageDetailsComponent } from './masters/standrad-verbiage-details/standrad-verbiage-details.component';
import { EducationMasterListComponent } from './masters/education-master-list/education-master-list.component';
import { EducationMasterDetailsComponent } from './masters/education-master-details/education-master-details.component';
import { EmploymentMasterListComponent } from './masters/employment-master-list/employment-master-list.component';
import { EmploymentMasterDetailsComponent } from './masters/employment-master-details/employment-master-details.component';
import { EmailTemplatesComponent } from './masters/email-templates/email-templates.component';
import { EmailTemplateDetailsComponent } from './masters/email-template-details/email-template-details.component';
import { DeCaseListComponent } from './operations/data-entry/de-case-list/de-case-list.component';
import { DataEntryTlComponent } from './operations/data-entry/data-entry-tl/data-entry-tl.component';
import { DataEntryAllComponent } from './operations/data-entry/data-entry-all/data-entry-all.component';
import { AnalystListOfChecksComponent } from './verification/analyst-list-of-checks/analyst-list-of-checks.component';
import { OutputqcAllocationComponent } from './outputqc/outputqc-allocation/outputqc-allocation.component';
import { OutputqcCaseListComponent } from './outputqc/outputqc-case-list/outputqc-case-list.component';
import { InterimQcComponent } from './outputqc/interim-qc/interim-qc.component';
import { TlUnallocatedCasesComponent } from './verification/tl-unallocated-cases/tl-unallocated-cases.component';
import { CaseStatusComponent } from './crm/case-status/case-status.component';
import { BatchUploadComponent } from './upload/batch-upload/batch-upload.component';
import { CaseUploadComponent } from './upload/case-upload/case-upload.component';
import { PendingUploadBatchListComponent } from './upload/pending-upload-batch-list/pending-upload-batch-list.component';
import { DownloadExcelTemplateComponent } from './upload/download-excel-template/download-excel-template.component';
import { ScrutinyInsufListComponent } from './operations/insufficiency/scrutiny/scrutiny-insuf-list/scrutiny-insuf-list.component';
import { ClientInsufListComponent } from './operations/insufficiency/client/client-insuf-list/client-insuf-list.component';
import { MentorReviewListComponent } from './operations/mentor-review/mentor-review-list/mentor-review-list.component';
import { InputqcCaseListComponent } from './operations/inputqc/inputqc-case-list/inputqc-case-list.component';
import { InputqcComponentListComponent } from './operations/inputqc/inputqc-component-list/inputqc-component-list.component';
import { AnalystComponentVerificationComponent } from './verification/analyst-component-verification/analyst-component-verification.component';
import { TlUnallocatedReviewComponent } from './verification/tl-unallocated-review/tl-unallocated-review.component';
import { DataEntryComponentListComponent } from './operations/data-entry/data-entry-component-list/data-entry-component-list.component';
import { OutputqcComponentListComponent } from './outputqc/outputqc-component-list/outputqc-component-list.component';
import { OutputqcOfCompComponent } from './outputqc/outputqc-of-comp/outputqc-of-comp.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { NewCaseStatusComponent } from './crm/new-case-status/new-case-status.component';
import { NewCasestatusCmpListComponent } from './crm/new-casestatus-cmp-list/new-casestatus-cmp-list.component';
import { NewCaseStatusReviewComponent } from './crm/new-case-status-review/new-case-status-review.component';
import { UtilitiesCaseStatusComponent } from './crm/utilities-case-status/utilities-case-status.component';
import { ClientContractDetailsComponent } from './administration/client-contract-details/client-contract-details.component';
import { SubclientDetailsComponent } from './administration/subclient-details/subclient-details.component';
import { ComponentDetailsComponent } from './administration/component-details/component-details.component';
import { RoleDetailsComponent } from './administration/role-details/role-details.component';
import { UserDetailsComponent } from './administration/user-details/user-details.component';
import { VendorUsersComponent } from './administration/vendor-users/vendor-users.component';
import { DefaultCalendarComponent } from './administration/default-calendar/default-calendar.component';
import { GeneratePasswordComponent } from './administration/generate-password/generate-password.component';
import { UserListComponent } from './administration/user-list/user-list.component';
import { RoleListComponent } from './administration/role-list/role-list.component';
import { ComponentListComponent } from './administration/component-list/component-list.component';
import { VendorsComponent } from './administration/vendors/vendors.component';
import { ClientDetailsComponent } from './administration/client-details/client-details.component';
import { ClientListComponent } from './administration/client-list/client-list.component';
import { ColorCodesListComponent } from './administration/color-codes-list/color-codes-list.component';
import { PersonalDetailsConfigComponent } from './administration/personal-details-config/personal-details-config.component';
import { InstantVerifyComponent } from './quick-verify/instant-verify/instant-verify.component';
import { DownloadWordReportComponent } from './reports/download-word-report/download-word-report.component';
import { DownloadPdfComponentListComponent } from './reports/download-pdf-component-list/download-pdf-component-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UtilitiesCaseStatusComponentListComponent } from './crm/utilities-case-status-component-list/utilities-case-status-component-list.component';
import { DeleteCaseComponent } from './crm/delete-case/delete-case.component';
import { UpdateLhsListComponent } from './crm/update-lhs-list/update-lhs-list.component';
import { UpdateLhsDetailsComponent } from './crm/update-lhs-details/update-lhs-details.component';
import { CaseStatusComponentListComponent } from './crm/case-status-component-list/case-status-component-list.component';
import { TlPendingReportComponent } from './reports/tl-pending-report/tl-pending-report.component';
import { PersonalDetailsInputqcComponent } from './operations/inputqc/personal-details-inputqc/personal-details-inputqc.component';
import { ComponentInputqcComponent } from './operations/inputqc/component-inputqc/component-inputqc.component';
import { MentorReviewDetailsComponent } from './operations/mentor-review/mentor-review-details/mentor-review-details.component';
import { NewDashboardComponent } from './admin/new-dashboard/new-dashboard.component';
import { CurrentStatusComponent } from './reports/current-status/current-status.component';
import { MonthlyStatusComponent } from './reports/monthly-status/monthly-status.component';
import { DropBoxComponent } from './verification/drop-box/drop-box.component';
import { AnalystTrackerComponent } from './reports/analyst-tracker/analyst-tracker.component';
import { DownloadExcelCaseInititaionBulkComponent } from './upload/download-excel-case-inititaion-bulk/download-excel-case-inititaion-bulk.component';
import { ClientReportComponent } from './reports/client-report/client-report.component';

const routes: Routes = [
  {
     
   path:'',component:LoginComponent,
  },
    {path:'', redirectTo: "", pathMatch:"full"},

   {
    path:'otpvalidation/:userId',component:OtpValidationComponent,
   },
   {
    path:'home',component:HomeComponent,
    children:[
      
      // {
      //   path:'dashboard-old',component:DashboardComponent
      // },
      // {
      //   path:'dashboard',component:NewDashboardComponent
      // },
      {
        path:'dashboard',component:DashboardComponent
      },
      {
        path:'posts',component:PostsComponent
      }
      ,
      {
        path:'masters/universitydetails',component:UniversitiesComponent,
      },
      {
         path:'masters/universitydetails/:_id',component:UniversityListComponent,
      },
      {
         path:'masters/universities',component:UniversityListComponent,
      },
     {
        path:'masters/companies',component:CompanyListComponent
     },
     {
      path:'masters/companydetails',component:CompanyDetailsComponent
     },
     {
      path:'masters/companydetails/:_id',component:CompanyListComponent
     },
     {
      path:'masters/branchlist',component:BranchListComponent
     },
     {
      path:'masters/branchdetails',component:BranchDetailsComponent
     },
     {
      path:'masters/branchdetails/:_id',component:BranchListComponent

     },
     {
      path:'masters/pindetails',component:PinDetailsComponent
     },
     {
      path:'masters/pinlist',component:PinListComponent
     },
     {
      path:'masters/pindetails/:_id',component:PinListComponent
     },
     {
      path:'masters/analysistypedetails',component:AnalysisTypeDetailsComponent
     },
     {
      path:'masters/analysistypes',component:AnalysisTypeComponent
     },
     {
      path:'masters/analysistypedetails/:_id',component:AnalysisTypeComponent
     },
     {
      path:'masters/analysiscodedetails',component:AnalysisCodeDetailsComponent

     },
     {
      path:'masters/analysiscodes',component:AnalysisCodeComponent

     },
     {
      path:'masters/analysiscodedetails/:_id',component:AnalysisCodeComponent

     },
     {
      path:'masters/standardverbiagelist',component:StandradVerbiageListComponent

     },
     {
      path:'masters/standardverbiagedeatils',component:StandradVerbiageDetailsComponent

     },
     {
      path:'masters/standardverbiagedeatils/:_id',component:StandradVerbiageListComponent

     },
     {
      path:'masters/educationmaster',component:EducationMasterListComponent
   },
   {
    path:'masters/educationmasterdetails',component:EducationMasterDetailsComponent
   },
   {
    path:'masters/educationmasterdetails/:_id',component:EducationMasterListComponent
   },
   {
      path:'masters/employmentmaster',component:EmploymentMasterListComponent
   },
   {
    path:'masters/employmentmasterdetails',component:EmploymentMasterDetailsComponent
   },
   {
    path:'masters/employmentmasterdetails/:_id',component:EmploymentMasterListComponent
   },
   {
      path:'masters/emailtemplates',component:EmailTemplatesComponent
   },
   {
    path:'masters/emailtemplatedetails',component:EmailTemplateDetailsComponent
   },
   {
    path:'masters/emailtemplatedetails/:_id',component:EmailTemplatesComponent
   },
   {
    path:'operations/dataentry/decaselist',component:DeCaseListComponent
   },
   {
    path:'operations/dataentry/decaselist/:_id',component:DataEntryAllComponent
   },
   {
    path:'operations/dataentry/decaselistfortl',component:DataEntryTlComponent

   },
   {
    path:'operations/dataentry/dataentry-components',component:DataEntryComponentListComponent
   },
   {
    path:'dataentry/dataentryall/:mode',component:DataEntryAllComponent
   },
   {
    path:'verification/analystlistofchecks',component:AnalystListOfChecksComponent
   },
   {
    path:'outputqc/allocateoutputqc',component:OutputqcAllocationComponent
   },
   {
    path:'outputqc/outputqclist',component:OutputqcCaseListComponent
   },
   {
     path:'outputqc/outputqccomponentlist',component:OutputqcComponentListComponent

   },
   {
     path:'outputqc/outputqcofcomp',component:OutputqcOfCompComponent
   },
   {
    path:'outputqc/interimqclist',component:InterimQcComponent
   },
   {
    path:'verification/listofcheckstoallocate',component:TlUnallocatedCasesComponent
   },
   {
    path:'crm/casestatus',component:CaseStatusComponent
   },
   {
    path:'crm/componentlist',component:CaseStatusComponentListComponent
   },
   {
    path:'crm/newcasestatus',component:NewCaseStatusComponent
  },
  {
   path:'crm/newcaseComplist',component:NewCasestatusCmpListComponent
  },
  {
   path:'crm/casestatusreviewdetails',component:NewCaseStatusReviewComponent
  },
  {
   path:'crm/utilitiescasestatus',component:UtilitiesCaseStatusComponent
  },
    {
    path:'upload/batchuploads',component:BatchUploadComponent
   },
   {
    path: 'upload/caseupload', component:CaseUploadComponent
  },
   {
    path: 'upload/batchacceptancelist', component:PendingUploadBatchListComponent
  },
   {
    path: 'upload/downloadexcelcaseInitiation', component:DownloadExcelCaseInititaionBulkComponent
  },
   {
    path: 'upload/downloadexceltemplate', component:DownloadExcelTemplateComponent
  },
  {
    path: 'insufficiencies/scrutinyinsuflist', component:ScrutinyInsufListComponent
  },
  {
    path: 'insufficiencies/clientinsuflist', component:ClientInsufListComponent
  },
  // {
  //   path:'mentorreview/mentorreviewlist',component:MentorReviewListComponent
  // },
  {
    path: 'inputqc/inputqccaselist', component:InputqcCaseListComponent
  },
  {
    path: 'inputqc/inputqccomponentlist', component:InputqcComponentListComponent
  },
  {
    path: 'inputqc/personaldetailsinputqc', component:PersonalDetailsInputqcComponent
  },
  {
    path: 'inputqc/componentinputqc', component:ComponentInputqcComponent
  },
  // {
  //   path:'verification/analystcomponentverification', component:AnalystComponentVerificationComponent
  // },
  {
    path:'verification/analystcomponentverification/:_id', component:AnalystComponentVerificationComponent
  },{
    path:'tlreview/tlreviewDetails',component:TlUnallocatedReviewComponent
  } ,
   {path: "administration", loadChildren: () => import('./administration/adminstration.module').then(m => m.AdminstrationModule)},
   {path:'chatbox',component:ChatboxComponent},
   {path:'chatbox/:_id',component:ChatboxComponent},
   {path:'quick-verify/verify',component:InstantVerifyComponent},
   {path:'deletecase',component: DeleteCaseComponent},
   {
    path:'verification/updatelhslist',component:UpdateLhsListComponent
   },
   {
    path:'verification/updatelhsdetails',component:UpdateLhsDetailsComponent
   },
   {
    path:'verification/downloadwordreportnew', component:DownloadWordReportComponent
   },
   {
    path:'verification/downloadwordreportnew/componentlist', component:DownloadPdfComponentListComponent
   },
   {
    path:'changepassword',component:ChangePasswordComponent
   },
   {
    path:'crm/utilitiescasestatuscomponetlist',component:UtilitiesCaseStatusComponentListComponent
  },
  {
    path:'mentorreview/mentorreviewlist',component:MentorReviewListComponent
  },
  {
    path:'mentorreview/mentorreviewdetails',component:MentorReviewDetailsComponent
  },
  // {path:'/deletecase',component: DeleteCaseComponent},
   ///Anil Routes
   {
    path:'color-codes-list',component:ColorCodesListComponent
   },
   {
    path:'clients-list',component:ClientListComponent
   },
   {
    path:'client-details',component:ClientDetailsComponent
   },
   {
    path:'client-details/:_id',component:ClientDetailsComponent
   },
   {
    path:'vendors',component:VendorsComponent
   },
   {
    path:'personal-details-config',component:PersonalDetailsConfigComponent
   },
   {
    path:'components',component:ComponentListComponent
   },
   {
    path:'roles',component:RoleListComponent
   },
   {
    path:'users',component:UserListComponent
   },
   {
    path:'generate-password',component:GeneratePasswordComponent
   },
   {
    path:'default-calender',component:DefaultCalendarComponent
   },
   {
    path:'vendor-users',component:VendorUsersComponent
   },
   {path:'client-contract-details/client/:clientId',component:ClientContractDetailsComponent},
   {path:'client-contract-details/contract/:clientContractId',component:ClientContractDetailsComponent},
   {path:'subclient-details/client/:clientId/subclient/:subclientId',component:SubclientDetailsComponent},
   {path:'subclient-details/client/:clientId',component:SubclientDetailsComponent},
   {path:'componentdetails',component:ComponentDetailsComponent},
   {path:'componentdetails/:_id',component:ComponentDetailsComponent},
   {path:'roledetails',component:RoleDetailsComponent},
   {path:'roledetails/:_id',component:RoleDetailsComponent},
   {path:'userdetails/:_id',component:UserDetailsComponent},
   {path:'userdetails',component:UserDetailsComponent},
   { path: 'home/mentorreview/mentorreviewlist', component: MentorReviewListComponent },
   {path:'reports/tlpendingreport',component:TlPendingReportComponent},
   {path:'reports/analysttracker',component:AnalystTrackerComponent},
  {path:'reports/current-status',component:CurrentStatusComponent},
{path:'reports/statustracker',component:MonthlyStatusComponent},
{path:'reports/clientReport',component:ClientReportComponent},
{path:'apiault',component:DropBoxComponent}




    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
