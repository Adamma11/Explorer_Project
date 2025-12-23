import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './admin/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PostsComponent } from './admin/dashboard/posts/posts.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { UniversitiesComponent } from './masters/universities/universities.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {  ReactiveFormsModule } from '@angular/forms';
import { UniversityListComponent } from './masters/university-list/university-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CompanyDetailsComponent } from './masters/company-details/company-details.component';
import { CompanyListComponent } from './masters/company-list/company-list.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OtpValidationComponent } from './otp-validation/otp-validation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './http-interceptors/auth.interceptor';
import { BranchDetailsComponent } from './masters/branch-details/branch-details.component';
import { BranchListComponent } from './masters/branch-list/branch-list.component';
import { PinListComponent } from './masters/pin-list/pin-list.component';
import { PinDetailsComponent } from './masters/pin-details/pin-details.component';
import { EducationMasterDetailsComponent } from './masters/education-master-details/education-master-details.component';
import { EducationMasterListComponent } from './masters/education-master-list/education-master-list.component';
import { EmploymentMasterListComponent } from './masters/employment-master-list/employment-master-list.component';
import { EmploymentMasterDetailsComponent } from './masters/employment-master-details/employment-master-details.component';
import { EmailTemplateDetailsComponent } from './masters/email-template-details/email-template-details.component';
import { EmailTemplatesComponent } from './masters/email-templates/email-templates.component';
import { AnalysisCodeDetailsComponent } from './masters/analysis-code-details/analysis-code-details.component';
import { AnalysisCodeComponent } from './masters/analysis-code/analysis-code.component';
import { AnalysisTypeComponent } from './masters/analysis-type/analysis-type.component';
import { AnalysisTypeDetailsComponent } from './masters/analysis-type-details/analysis-type-details.component';
import { StandradVerbiageDetailsComponent } from './masters/standrad-verbiage-details/standrad-verbiage-details.component';
import { StandradVerbiageListComponent } from './masters/standrad-verbiage-list/standrad-verbiage-list.component'
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ComponentDataEntryComponent } from './operations/data-entry/component-data-entry/component-data-entry.component';
import { DataEntryAllComponent } from './operations/data-entry/data-entry-all/data-entry-all.component';
import { DataEntryAllocatedCasesComponent } from './operations/data-entry/data-entry-allocated-cases/data-entry-allocated-cases.component';
import { DataEntryComponentListComponent } from './operations/data-entry/data-entry-component-list/data-entry-component-list.component';
import { DataEntryTlComponent } from './operations/data-entry/data-entry-tl/data-entry-tl.component';
import { DeCaseListComponent } from './operations/data-entry/de-case-list/de-case-list.component';
import { EmpInfoComponent } from './operations/data-entry/emp-info/emp-info.component';
import { PersonalDetailsDataEntryComponent } from './operations/data-entry/personal-details-data-entry/personal-details-data-entry.component';
import { AnalystListOfChecksComponent } from './verification/analyst-list-of-checks/analyst-list-of-checks.component';
import { OutputqcAllocationComponent } from './outputqc/outputqc-allocation/outputqc-allocation.component';
import { CompOutputqcComponent } from './outputqc/comp-outputqc/comp-outputqc.component';
import { InterimQcComponent } from './outputqc/interim-qc/interim-qc.component';
import { InterimqcComponentListComponent } from './outputqc/interimqc-component-list/interimqc-component-list.component';
import { OutputqcCaseListComponent } from './outputqc/outputqc-case-list/outputqc-case-list.component';
import { OutputqcComponentListComponent } from './outputqc/outputqc-component-list/outputqc-component-list.component';
import { OutputqcOfCompComponent } from './outputqc/outputqc-of-comp/outputqc-of-comp.component';
import { TlUnallocatedCasesComponent } from './verification/tl-unallocated-cases/tl-unallocated-cases.component';
import { TlUnallocatedReviewComponent } from './verification/tl-unallocated-review/tl-unallocated-review.component';
import { UnallocatedChecksComponent } from './verification/unallocated-checks/unallocated-checks.component';
import { CaseStatusComponent } from './crm/case-status/case-status.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LeadProspectListComponent } from './sales/lead-prospect-list/lead-prospect-list.component';
import { BatchUploadComponent } from './upload/batch-upload/batch-upload.component';
import { BatchUploadListComponent } from './upload/batch-upload-list/batch-upload-list.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ComponentInputqcComponent } from './operations/inputqc/component-inputqc/component-inputqc.component';
import { InputqcCaseListComponent } from './operations/inputqc/inputqc-case-list/inputqc-case-list.component';
import { InputqcComponentListComponent } from './operations/inputqc/inputqc-component-list/inputqc-component-list.component';
import { PersonalDetailsInputqcComponent } from './operations/inputqc/personal-details-inputqc/personal-details-inputqc.component';
import { ClientInsufDetailsComponent } from './operations/insufficiency/client/client-insuf-details/client-insuf-details.component';
import { ClientInsufListComponent } from './operations/insufficiency/client/client-insuf-list/client-insuf-list.component';
import { InsufRejectionComponent } from './operations/insufficiency/scrutiny/insuf-rejection/insuf-rejection.component';
import { ScrutinyInsufListComponent } from './operations/insufficiency/scrutiny/scrutiny-insuf-list/scrutiny-insuf-list.component';
import { MentorReviewDetailsComponent } from './operations/mentor-review/mentor-review-details/mentor-review-details.component';
import { MentorReviewListComponent } from './operations/mentor-review/mentor-review-list/mentor-review-list.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { BatchAcceptanceComponent } from './upload/batch-acceptance/batch-acceptance.component';
import { CaseUploadComponent } from './upload/case-upload/case-upload.component';
import { DownloadExcelTemplateComponent } from './upload/download-excel-template/download-excel-template.component';
import { PendingUploadBatchListComponent } from './upload/pending-upload-batch-list/pending-upload-batch-list.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SublevelMenuComponent } from './admin/sidebar/sublevel-menu.component';
import { AnalystComponentVerificationComponent } from './verification/analyst-component-verification/analyst-component-verification.component';
import { HistoryDialogComponent } from './shared/history-dialog/history-dialog.component';
import { DeleteConfirmationDialogComponent } from './shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CasehistoryDialogComponent } from './shared/casehistory-dialog/casehistory-dialog.component';
import { AddNoteDialogComponent } from './verification/add-note-dialog/add-note-dialog.component';
import { ServetelCallsComponent } from './verification/servetel-calls/servetel-calls.component';
import { EmailComponent } from './verification/email/email.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { OtpValidationDialogComponent } from './otp-validation-dialog/otp-validation-dialog.component';
import { MatMenuModule} from '@angular/material/menu';
import { QuickVerifyModule } from './quick-verify/quick-verify.module';
// import { ClientContractDetailsComponent } from './administration/client-contract-details/client-contract-details.component';
// import { ClientDetailsComponent } from './administration/client-details/client-details.component';
// import { ClientListComponent } from './administration/client-list/client-list.component';
// import { ColorCodesListComponent } from './administration/color-codes-list/color-codes-list.component';
// import { ComponentDetailsComponent } from './administration/component-details/component-details.component';
// import { ComponentListComponent } from './administration/component-list/component-list.component';
// import { DefaultCalendarComponent } from './administration/default-calendar/default-calendar.component';
// import { GeneratePasswordComponent } from './administration/generate-password/generate-password.component';
// import { HolidayDialogComponent } from './administration/holiday-dialog/holiday-dialog.component';
// import { PersonalDetailsConfigComponent } from './administration/personal-details-config/personal-details-config.component';
// import { RoleDetailsComponent } from './administration/role-details/role-details.component';
// import { RoleListComponent } from './administration/role-list/role-list.component';
// import { SubclientDetailsComponent } from './administration/subclient-details/subclient-details.component';
// import { UserDetailsComponent } from './administration/user-details/user-details.component';
// import { UserListComponent } from './administration/user-list/user-list.component';
// import { VendorUsersComponent } from './administration/vendor-users/vendor-users.component';
// import { VendorsComponent } from './administration/vendors/vendors.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {MaterialModule } from "./material/material.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { CdkDrag,CdkDragPlaceholder,CdkDropList} from '@angular/cdk/drag-drop';
import { DeConfirmDialogComponent } from './operations/data-entry/de-confirm-dialog/de-confirm-dialog.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { QuicknoteComponent } from './quicknote/quicknote.component';
import { ReinitiateCheckComponent } from './crm/reinitiate-check/reinitiate-check.component';
import { StopcheckDialogComponent } from './crm/stopcheck-dialog/stopcheck-dialog.component';
import { UtilitiesCaseStatusComponent } from './crm/utilities-case-status/utilities-case-status.component';
import { UtilitiesCaseStatusComponentListComponent } from './crm/utilities-case-status-component-list/utilities-case-status-component-list.component';
import { AddcheckDialogComponent } from './crm/addcheck-dialog/addcheck-dialog.component';
import { NewCaseStatusComponent } from './crm/new-case-status/new-case-status.component';
import { NewCasestatusCmpListComponent } from './crm/new-casestatus-cmp-list/new-casestatus-cmp-list.component';
import { NewCaseStatusReviewComponent } from './crm/new-case-status-review/new-case-status-review.component';
import { DownloadPdfComponentListComponent } from './reports/download-pdf-component-list/download-pdf-component-list.component';
import { DownloadWordReportComponent } from './reports/download-word-report/download-word-report.component';
import { UploadPdfReportComponent } from './reports/upload-pdf-report/upload-pdf-report.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteCaseComponent } from './crm/delete-case/delete-case.component';
import { DeleteCheckComponent } from './crm/delete-check/delete-check.component';
import { UpdateLhsListComponent } from './crm/update-lhs-list/update-lhs-list.component';
import { UpdateLhsDetailsComponent } from './crm/update-lhs-details/update-lhs-details.component';
import { CaseStatusComponentListComponent } from './crm/case-status-component-list/case-status-component-list.component';
import { NgChartjsModule } from 'ng-chartjs';
// import { GoogleChartsModule } from 'angular-google-charts';
import { MatListModule } from '@angular/material/list';  // Import MatListModule
import { NgChartsModule } from 'ng2-charts';
import { TlPendingReportComponent } from './reports/tl-pending-report/tl-pending-report.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NewDashboardComponent } from './admin/new-dashboard/new-dashboard.component';
import { CurrentStatusComponent } from './reports/current-status/current-status.component';
import { MonthlyStatusComponent } from './reports/monthly-status/monthly-status.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DropBoxComponent } from './verification/drop-box/drop-box.component';
import { AnalystTrackerComponent } from './reports/analyst-tracker/analyst-tracker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentScopeComponent } from './operations/data-entry/component-scope/component-scope.component';
import { EmploymentInfoComponent } from './upload/employment-info/employment-info.component';
import {MatBadgeModule} from '@angular/material/badge';
import { LhsPopupComponent } from './verification/lhs-popup/lhs-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DownloadExcelCaseInititaionBulkComponent } from './upload/download-excel-case-inititaion-bulk/download-excel-case-inititaion-bulk.component';
import { CheckFieldHistoryComponent } from './check-field-history/check-field-history.component';
import { ClientReportComponent } from './reports/client-report/client-report.component';
import { FilePreviewDialogComponent } from './shared/file-preview-dialog/file-preview-dialog.component';
import { SafePipe } from './shared/file-preview-dialog/safe.pipe';
import { UploadPopupComponent } from './upload/upload-popup/upload-popup.component';
import { CaseStatusPopupComponent } from './verification/case-status-popup/case-status-popup.component';
import { ExportChecksComponent } from './reports/export-checks/export-checks.component';

// import { NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    PostsComponent,
    UniversitiesComponent,
    UniversityListComponent,
    CompanyDetailsComponent,
    CompanyListComponent,
    LoginComponent,
    OtpValidationComponent,
    BranchDetailsComponent,
    BranchListComponent,
    PinListComponent,
    PinDetailsComponent,
    EducationMasterDetailsComponent,
    EducationMasterListComponent,
    EmploymentMasterListComponent,
    EmploymentMasterDetailsComponent,
    EmailTemplateDetailsComponent,
    EmailTemplatesComponent,
    AnalysisCodeDetailsComponent,
    AnalysisCodeComponent,
    AnalysisTypeComponent,
    AnalysisTypeDetailsComponent,
    StandradVerbiageDetailsComponent,
    StandradVerbiageListComponent,
    ComponentDataEntryComponent,
    DataEntryAllComponent,
    DataEntryAllocatedCasesComponent,
    DataEntryComponentListComponent,
    DataEntryTlComponent,
    DeCaseListComponent,
    EmpInfoComponent,
    PersonalDetailsDataEntryComponent,
    AnalystListOfChecksComponent,
    OutputqcAllocationComponent,
    CompOutputqcComponent,
    InterimQcComponent,
    InterimqcComponentListComponent,
    OutputqcCaseListComponent,
    OutputqcComponentListComponent,
    OutputqcOfCompComponent,
    TlUnallocatedCasesComponent,
    TlUnallocatedReviewComponent,
    UnallocatedChecksComponent,
    CaseStatusComponent,
    LeadProspectListComponent,
    BatchUploadComponent,
    BatchUploadListComponent,
    ComponentInputqcComponent,
    InputqcCaseListComponent,
    InputqcComponentListComponent,
    PersonalDetailsInputqcComponent,
    ClientInsufDetailsComponent,
    ClientInsufListComponent,
    InsufRejectionComponent,
    ScrutinyInsufListComponent,
    MentorReviewDetailsComponent,
    MentorReviewListComponent,
    ConfirmDialogComponent,
    BatchAcceptanceComponent,
    CaseUploadComponent,
    DownloadExcelTemplateComponent,
    PendingUploadBatchListComponent,
    SublevelMenuComponent,
    AnalystComponentVerificationComponent,
    HistoryDialogComponent,
    DeleteConfirmationDialogComponent,
    CasehistoryDialogComponent,
    AddNoteDialogComponent,
    ServetelCallsComponent,
    EmailComponent,
    OtpValidationDialogComponent,
    DeConfirmDialogComponent,
    ChatboxComponent,
    QuicknoteComponent,
    ReinitiateCheckComponent,
    StopcheckDialogComponent,
    UtilitiesCaseStatusComponent,
    UtilitiesCaseStatusComponentListComponent,
    AddcheckDialogComponent,
    NewCaseStatusComponent,
    NewCasestatusCmpListComponent,
    NewCaseStatusReviewComponent,
    DownloadPdfComponentListComponent,
    DownloadWordReportComponent,
    UploadPdfReportComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    DeleteCaseComponent,
    DeleteCheckComponent,
    UpdateLhsListComponent,
    UpdateLhsDetailsComponent,
    CaseStatusComponentListComponent,
    TlPendingReportComponent,
    NewDashboardComponent,
    CurrentStatusComponent,
    MonthlyStatusComponent,
    DropBoxComponent,
    AnalystTrackerComponent,
    ComponentScopeComponent,
    EmploymentInfoComponent,
    LhsPopupComponent,
    DownloadExcelCaseInititaionBulkComponent,
    CheckFieldHistoryComponent,
    ClientReportComponent,
    FilePreviewDialogComponent,
    // ClientContractDetailsComponent,
    // ClientDetailsComponent,
    // ClientListComponent,
    // ColorCodesListComponent,
    // ComponentDetailsComponent,
    // ComponentListComponent,
    // DefaultCalendarComponent,
    // GeneratePasswordComponent,
    // HolidayDialogComponent,
    // PersonalDetailsConfigComponent,
    // RoleDetailsComponent,
    // RoleListComponent,
    // SubclientDetailsComponent,
    // UserDetailsComponent,
    // UserListComponent,
    // VendorUsersComponent,
    // VendorsComponent,
     FilePreviewDialogComponent,
    SafePipe,
    UploadPopupComponent,
    CaseStatusPopupComponent,
    ExportChecksComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    NgbModule,
    MatSnackBarModule,
    MatTabsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MaterialFileInputModule,
    MatDividerModule,
    MatDialogModule,
    MatGridListModule,
    MaterialModule,
    CdkDragPlaceholder,
    CdkDrag,
    CdkDropList,
    NgxMatColorPickerModule,
    MatMenuModule,
    QuickVerifyModule,
    NgChartjsModule,
    NgChartsModule,
    MatProgressBarModule,
    MatListModule,
    MatBadgeModule,
    MatTooltipModule,
    // NgxExtendedPdfViewerModule,
    AngularEditorModule,
    FontAwesomeModule
    



  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue:{appearance:'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
