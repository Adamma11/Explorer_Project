const authenticateToken = require('../shared/authenticate_token');
const authenticateCdeToken = require('../shared/authenticate_cde_token_new')
const caseController = require("../controllers/uploads/case.controller")
const autoInitate = require('../controllers/support/code_to_read_unread_mails.js')

function getAllRoutes(app){
    app.use('/api/pins',authenticateToken,require('../routes/pin.routes'));
    app.use('/api/branches',authenticateToken,require('../routes/branch.routes'));
    app.use('/api/emailtemplates',authenticateToken,require('../routes/email_template.routes'));    	
    app.use('/api/universities',authenticateToken,require('../routes/university.routes'));
    app.use('/api/companies',authenticateToken,require('../routes/company.routes'));
    app.use('/api/users',authenticateToken,require('../routes/user.routes'));
    app.use('/api/roles',authenticateToken,require('../routes/role.routes'));
    app.use('/api/screens',authenticateToken,require('../routes/screen.routes'));
    app.use('/api/screenaccesses',authenticateToken,require('../routes/screen_access.routes'));
    app.use('/api/tickets',authenticateToken,require('../routes/ticket.routes'));
    app.use('/api/ticketresponses',authenticateToken,require('../routes/ticket_response.routes'));	
    app.use('/api/dashboards',authenticateToken,require('../routes/dashboard.routes'));	
    app.use('/api/dashboardaccesses',authenticateToken,require('../routes/dashboard_access.routes'))	
    app.use('/api/colormaster',authenticateToken,require('../routes/color_master.routes'));
    app.use('/api/componentaccesses',authenticateToken,require('../routes/component_access.routes'));
    app.use('/api/branchaccesses',authenticateToken,require('../routes/branch_access.routes'));
    app.use('/api/applicationmodules',authenticateToken,require('../routes/application_module.routes'));
    app.use('/api/userroles',authenticateToken,require('../routes/user_role.routes'));
    app.use('/api/userbranchaccess',authenticateToken,require('../routes/user_branch_access.routes'));
    app.use('/api/components',authenticateToken,require('../routes/component.routes'));
    app.use('/api/componentfields',authenticateToken,require('../routes/component_field.routes'));
    app.use('/api/personaldetails',authenticateToken,require('../routes/personal_details.routes'));
    app.use('/api/personaldetailsfields',authenticateToken,require('../routes/personal_details_field.routes'));
    app.use('/api/vendors',authenticateToken,require('../routes/vendor.routes'));
    app.use('/api/vendorcomponents',authenticateToken,require('../routes/vendor_component.routes'));
    app.use('/api/vendorcontracts',authenticateToken,require('../routes/vendor_contract.routes'));
    app.use('/api/clients',authenticateToken,require('../routes/client.routes'));
    app.use('/api/clientholidays',authenticateToken,require('../routes/client_holiday.routes'));
    app.use('/api/clientcontracts',authenticateToken,require('../routes/client_contract.routes'));
    app.use('/api/clientcontractcomponents',authenticateToken,require('../routes/client_contract_component.routes'));
    app.use('/api/clientcontractpackages',authenticateToken,require('../routes/client_contract_package.routes'));
    app.use('/api/clientcontractprofiles',authenticateToken,require('../routes/client_contract_profile.routes'));
    app.use('/api/subclients',authenticateToken,require('../routes/subclient.routes'));
    app.use('/api/subclientnotifications',authenticateToken,require('../routes/subclient_notification.routes'));	
    app.use('/api/rolemoduleaccess',authenticateToken,require('../routes/role_module_access.routes'));
    app.use('/api/usersubclientaccess',authenticateToken,require('../routes/user_subclient_access.routes'));
    app.use('/api/uservendoraccess',authenticateToken,require('../routes/user_vendor_access.routes'));
    app.use('/api/passwordcreate',authenticateToken,require('../routes/password_create.routes'));
    app.use('/api/passwordvalidate',require('../routes/password_validate.routes'));
    app.use('/api/batches',authenticateToken,require('../routes/batch.routes'));
    app.use('/api/cases',authenticateToken,require('../routes/case.routes'));
    app.use('/api/downloadcasefiles',authenticateToken,require('../routes/download_case_file.routes'));
    app.use('/api/rejectedcases',authenticateToken,require('../routes/rejected_case_routes'));
    app.use('/api/exceluploads',authenticateToken,require('../routes/excel_upload.routes'));    
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/pveducation',authenticateToken,require('../routes/physical_verification_education.routes'));
    app.use('/api/pvemployment',authenticateToken,require('../routes/physical_verification_employment.routes'));
    app.use('/api/requestforpaymenteducation',authenticateToken,require('../routes/request_for_payment_education.routes'));
    app.use('/api/requestforpaymentemployment',authenticateToken,require('../routes/request_for_payment_education.routes'));
    app.use('/api/courierdetailseducation',authenticateToken,require('../routes/courier_details_employment.routes'));
    app.use('/api/courierdetailsemployment',authenticateToken,require('../routes/courier_details_employment.routes'));
    app.use('/api/allcomponents',authenticateToken,require('../routes/all_components.routes'));
    app.use('/api/leadorprospect',authenticateToken,require('../routes/lead_or_prospect.routes'));
    app.use('/api/vouchers',authenticateToken,require('../routes/voucher.routes'));
    app.use('/api/followup',authenticateToken,require('../routes/follow_up.routes'));
    app.use('/api/meeting',authenticateToken,require('../routes/meeting.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/educationmaster',authenticateToken,require('../routes/education_master.routes'));
    app.use('/api/education',authenticateToken,require('../routes/education.routes'));
    app.use('/api/idb',authenticateToken,require('../routes/idb.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/reports',authenticateToken,require('../routes/reports.routes'))	
    app.use('/api/defaultcalendar',authenticateToken,require('../routes/default_calendar.routes'))	
    app.use('/api/casehistory',authenticateToken,require('../routes/case_history.routes'))
    app.use('/api/cdecase',authenticateCdeToken,require('../routes/cdecase.routes'))
    app.use('/api/personaldetailsforcde',authenticateCdeToken,require('../routes/personal_details_for_cde.routes'))
    //app.use('/api/personaldetailsdataforcde',authenticateCdeToken,require('../routes/personal_details_data_for_cde.routes'))
    app.use('/api/componentsforcde',authenticateCdeToken,require('../routes/component_for_cde.routes'))
    app.use('/api/analysistypes',authenticateToken,require('../routes/analysis_type.routes'))
    app.use('/api/analysiscodes',authenticateToken,require('../routes/analysis_code.routes'))
    app.use('/api/clientanalysiscodes',authenticateToken,require('../routes/client_analysis_code.routes'))
    app.use('/api/caseinvoices',authenticateToken,require('../routes/case_invoice.routes'))
    app.use('/api/apigetcaseroutes',authenticateToken,require('../routes/apigetcaseroutes.routes'))
    app.use('/api/apiroutes',authenticateToken,require('../routes/apiroutes.routes'))
    app.use('/api/sendEmailCde',authenticateToken,require('../routes/sendEmailCde.routes'))
    app.use("/api/generateAuthCode",require("../routes/apigetauthcode.routes"))
    app.use("/api/clientExpiryEmail", authenticateToken, require("../routes/client_expiry_email.routes"))
    app.use('/api/archive', authenticateToken, require('../routes/archive.routes'));
    app.use("/api/checksforfe", authenticateToken, require("../routes/checksforfe.routes"))
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    //app.use('/api/currentaddress',authenticateToken,require('../routes/currentaddress.routes'));
    app.use('/api/idbglobalsolutions',authenticateToken,require('../routes/idbglobalsolutions.routes'));
    app.use('/api/idbgdb',authenticateToken,require('../routes/idbgdb.routes'));
    app.use('/api/additionalidb',authenticateToken,require('../routes/additionalidb.routes'));
    app.use('/api/righttowork',authenticateToken,require('../routes/righttowork.routes'));
    app.use('/api/pvc',authenticateToken,require('../routes/pvc.routes'));
    app.use('/api/identity',authenticateToken,require('../routes/identity.routes'));
    //app.use('/api/identityanddigitalfacerecognitioncheck',authenticateToken,require('../routes/identityanddigitalfacerecognitioncheck.routes'));
    app.use('/api/uan',authenticateToken,require('../routes/uan.routes'));
    app.use('/api/mca',authenticateToken,require('../routes/mca.routes'));
    app.use('/api/identityanddigital',authenticateToken,require('../routes/identityanddigital.routes'));
    app.use('/api/dinverification',authenticateToken,require('../routes/dinverification.routes'));
    app.use('/api/directorproprietorcrc',authenticateToken,require('../routes/directorproprietorcrc.routes'));
    app.use('/api/companycreditcheck',authenticateToken,require('../routes/companycreditcheck.routes'));
    app.use('/api/emergencycontact',authenticateToken,require('../routes/emergencycontact.routes'));
    app.use('/api/fca',authenticateToken,require('../routes/fca.routes'));
    app.use('/api/csadp',authenticateToken,require('../routes/csadp.routes'));
    app.use('/api/cfbusa',authenticateToken,require('../routes/cfbusa.routes'));
    app.use('/api/occeausa',authenticateToken,require('../routes/occeausa.routes'));
    app.use('/api/kyc',authenticateToken,require('../routes/kyc.routes'));
    app.use('/api/sdn',authenticateToken,require('../routes/sdn.routes'));
    app.use('/api/drivinglicense',authenticateToken,require('../routes/drivinglicense.routes'));
    app.use('/api/ofacwithecq',authenticateToken,require('../routes/ofacwithecq.routes'));
    app.use('/api/ofac',authenticateToken,require('../routes/ofac.routes'));
    app.use('/api/sanctionsbase',authenticateToken,require('../routes/sanctionsbase.routes'));
    app.use('/api/globex',authenticateToken,require('../routes/globex.routes'));
    app.use('/api/permanentaddress',authenticateToken,require('../routes/permanentaddress.routes'));
    app.use('/api/sam',authenticateToken,require('../routes/sam.routes'));
    app.use('/api/facis',authenticateToken,require('../routes/facis.routes'));
    app.use('/api/gsa',authenticateToken,require('../routes/gsa.routes'));
    app.use('/api/oig',authenticateToken,require('../routes/oig.routes'));
    //app.use('/api/directorproprietoridentitycheck',authenticateToken,require('../routes/directorproprietoridentitycheck.routes'));
    app.use('/api/directorproprietoridentity',authenticateToken,require('../routes/directorproprietoridentity.routes'));
    app.use('/api/fourpaneldrugabusecheck',authenticateToken,require('../routes/fourpaneldrugabusecheck.routes'));
    app.use('/api/cibilcheck',authenticateToken,require('../routes/cibilcheck.routes'));
    app.use('/api/directorship',authenticateToken,require('../routes/directorship.routes'));
    app.use('/api/fivepaneldrugabusetest',authenticateToken,require('../routes/fivepaneldrugabusetest.routes'));
    app.use('/api/creditcheck',authenticateToken,require('../routes/creditcheck.routes'));
    app.use('/api/criminalwritten',authenticateToken,require('../routes/criminalwritten.routes'));
    app.use('/api/ssncheck',authenticateToken,require('../routes/ssncheck.routes'));
    app.use('/api/ninepaneldrugtest',authenticateToken,require('../routes/ninepaneldrugtest.routes'));
    app.use('/api/permanentandcurrentaddress',authenticateToken,require('../routes/permanentandcurrentaddress.routes'));
    app.use('/api/gapanalysis',authenticateToken,require('../routes/gapanalysis.routes'));
    app.use('/api/elevenpaneldrugabusetest',authenticateToken,require('../routes/elevenpaneldrugabusetest.routes'));
    app.use('/api/personalreference',authenticateToken,require('../routes/personalreference.routes'));
    app.use('/api/workpermit',authenticateToken,require('../routes/workpermit.routes'));
    app.use('/api/employment',authenticateToken,require('../routes/employment.routes'));
    app.use('/api/criminalcourt',authenticateToken,require('../routes/criminalcourt.routes'));
    app.use('/api/professionalreference',authenticateToken,require('../routes/professionalreference.routes'));
    app.use('/api/fda',authenticateToken,require('../routes/fda.routes'));
    app.use('/api/criminalverbal',authenticateToken,require('../routes/criminalverbal.routes'));
    app.use('/api/bankstatement',authenticateToken,require('../routes/bankstatement.routes'));
    app.use('/api/cpc',authenticateToken,require('../routes/cpc.routes'));
    app.use('/api/previousaddresscheck',authenticateToken,require('../routes/previousaddresscheck.routes'));
    app.use('/api/criminalonline',authenticateToken,require('../routes/criminalonline.routes'));
    app.use('/api/cvc',authenticateToken,require('../routes/cvc.routes'));
    app.use('/api/companyverificationphysical',authenticateToken,require('../routes/companyverificationphysical.routes'));
    app.use('/api/companyverificationonline',authenticateToken,require('../routes/companyverificationonline.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
	 app.use("/api/caseInitiation",authenticateToken,require("../routes/caseInitiation.router"));
    
    app.use("/api/idbcopy", authenticateToken ,require("../routes/idbcopy.routes"))
    app.use("/api/pan", authenticateToken ,require("../routes/pan.routes"))
    app.use("/api/resumechecks", authenticateToken ,require("../routes/resumechecks.routes"))
    app.use("/api/socialmedia", authenticateToken ,require("../routes/socialmedia.routes"))
    app.use("/api/webandmedia", authenticateToken ,require("../routes/webandmedia.routes"))
        app.use("/api/testcopy", authenticateToken ,require("../routes/testcopy.routes"))
        app.use("/api/testcopy", authenticateToken ,require("../routes/testcopy.routes"))
        //app.use("/api/idb", authenticateToken ,require("../routes/idb.routes"))
        app.use("/api/testcopy", authenticateToken ,require("../routes/testcopy.routes"))
        app.use("/api/testcopy", authenticateToken ,require("../routes/testcopy.routes"))
        //app.use('/api/ education',authenticateToken,require('../routes/ education.routes'));
    app.use('/api/criminalcourtrecordcheckpermanentaddress',authenticateToken,require('../routes/criminalcourtrecordcheckpermanentaddress.routes'));
    app.use('/api/saveenpaneldrugabusetest',authenticateToken,require('../routes/saveenpaneldrugabusetest.routes'));
    app.use('/api/tenpaneldrugabusetest',authenticateToken,require('../routes/tenpaneldrugabusetest.routes'));
    app.use('/api/twelvepaneldrugabusetest',authenticateToken,require('../routes/twelvepaneldrugabusetest.routes'));
    app.use('/api/fivepaneldrugabusewithnicotine',authenticateToken,require('../routes/fivepaneldrugabusewithnicotine.routes'));
    app.use('/api/tenpaneldrugabusewithnicotine',authenticateToken,require('../routes/tenpaneldrugabusewithnicotine.routes'));
    app.use('/api/idbglobalsanctions',authenticateToken,require('../routes/idbglobalsanctions.routes'));
    app.use('/api/nationalitywithrighttowork',authenticateToken,require('../routes/nationalitywithrighttowork.routes'));
    app.use('/api/passport',authenticateToken,require('../routes/passport.routes'));
    app.use('/api/indianriskdatabase',authenticateToken,require('../routes/indianriskdatabase.routes'));
    app.use('/api/formcheck',authenticateToken,require('../routes/formcheck.routes'));
    app.use('/api/directorpropritorresidence',authenticateToken,require('../routes/directorpropritorresidence.routes'));
    app.use('/api/licensecertification',authenticateToken,require('../routes/licensecertification.routes'));
    app.use('/api/academicreference',authenticateToken,require('../routes/academicreference.routes'));
    app.use('/api/referenceabe',authenticateToken,require('../routes/referenceabe.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/msmeudyam',authenticateToken,require('../routes/msmeudyam.routes'));
    app.use('/api/voterid',authenticateToken,require('../routes/voterid.routes'));
	//30Sep2023
    app.use('/api/standardverbiage',authenticateToken, require('../routes/standard_verbiage.routes'));
	    //Email
    app.use("/api/emailCandidateData",authenticateToken,require("../routes/emailCandidateData.routes"));
    //
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
	/////26Oct2023
    app.use("/api/common",authenticateToken, require("../routes/common.routes"));
	//
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use("/api/testidentity", authenticateToken ,require("../routes/testidentity.routes"))
    app.use("/api/testidentityforcde", authenticateToken ,require("../routes/testidentity_for_cde.routes"))
        app.use("/api/identitytest", authenticateToken ,require("../routes/identitytest.routes"))
    app.use("/api/identitytestforcde", authenticateToken ,require("../routes/identitytest_for_cde.routes"))
       // app.use("/api/employment", authenticateToken ,require("../routes/employment.routes"))
   // app.use("/api/employmentforcde", authenticateToken ,require("../routes/employment_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
   // app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/identity", authenticateToken ,require("../routes/identity.routes"))
    app.use("/api/identityforcde", authenticateToken ,require("../routes/identity_for_cde.routes"))
        app.use("/api/criminalcourtrecordcheckpermanentaddress", authenticateToken ,require("../routes/criminalcourtrecordcheckpermanentaddress.routes"))
    //app.use("/api/criminalcourtrecordcheckpermanentaddressforcde", authenticateToken ,require("../routes/criminalcourtrecordcheckpermanentaddress_for_cde.routes"))
/*        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    //app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))*/
        app.use("/api/mca", authenticateToken ,require("../routes/mca.routes"))
    //app.use("/api/mcaforcde", authenticateToken ,require("../routes/mca_for_cde.routes"))
        app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
	    app.use('/api/getExternal',authenticateToken,require('../routes/external-file.routes.js'))

    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));
    app.use("/api/caseupload", authenticateToken, require("../routes/caseupload.routes"))	

//update lhs by candidate
app.get("/api/showLoginPageForCandidateLhsFieldUpdate", caseController.showLoginPageForCandidateLhsFieldUpdate)
app.post("/api/showLhsPageToCandidate", caseController.showLhsPageToCandidate)
app.post("/api/updateCandidateLhs", caseController.updateCandidateLhs)
    app.use("/api/dashboardData",authenticateToken,require("../routes/dashboardData.routes.js"));
////////////////////////////////////////////////////////////////////////////////////////////////	
        app.use("/api/employmenttest", authenticateToken ,require("../routes/employmenttest.routes"))
    app.use("/api/employmenttestforcde", authenticateToken ,require("../routes/employmenttest_for_cde.routes"))
        app.use("/api/employment", authenticateToken ,require("../routes/employment.routes"))
    app.use("/api/employmentforcde", authenticateToken ,require("../routes/employment_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/idb", authenticateToken ,require("../routes/idb.routes"))
    app.use("/api/idbforcde", authenticateToken ,require("../routes/idb_for_cde.routes"))
	app.get('/api/readOutlook', autoInitate.readEmails);
	app.get('/api/sendFollowUpEmail', autoInitate.sendFollowUpEmail);
        app.use("/api/identity", authenticateToken ,require("../routes/identity.routes"))
    app.use("/api/identityforcde", authenticateToken ,require("../routes/identity_for_cde.routes"))
        app.use("/api/tenpaneldrugabusetest", authenticateToken ,require("../routes/tenpaneldrugabusetest.routes"))
    app.use("/api/tenpaneldrugabusetestforcde", authenticateToken ,require("../routes/tenpaneldrugabusetest_for_cde.routes"))
        app.use("/api/tenpaneldrugabusetest", authenticateToken ,require("../routes/tenpaneldrugabusetest.routes"))
    app.use("/api/tenpaneldrugabusetestforcde", authenticateToken ,require("../routes/tenpaneldrugabusetest_for_cde.routes"))
        app.use("/api/tenpaneldrugabusewithnicotine", authenticateToken ,require("../routes/tenpaneldrugabusewithnicotine.routes"))
    app.use("/api/tenpaneldrugabusewithnicotineforcde", authenticateToken ,require("../routes/tenpaneldrugabusewithnicotine_for_cde.routes"))
        app.use("/api/fourpaneldrugabusecheck", authenticateToken ,require("../routes/fourpaneldrugabusecheck.routes"))
    app.use("/api/fourpaneldrugabusecheckforcde", authenticateToken ,require("../routes/fourpaneldrugabusecheck_for_cde.routes"))
        app.use("/api/fivepaneldrugabusetest", authenticateToken ,require("../routes/fivepaneldrugabusetest.routes"))
    app.use("/api/fivepaneldrugabusetestforcde", authenticateToken ,require("../routes/fivepaneldrugabusetest_for_cde.routes"))
        app.use("/api/saveenpaneldrugabusetest", authenticateToken ,require("../routes/saveenpaneldrugabusetest.routes"))
    app.use("/api/saveenpaneldrugabusetestforcde", authenticateToken ,require("../routes/saveenpaneldrugabusetest_for_cde.routes"))
        app.use("/api/ninepaneldrugtest", authenticateToken ,require("../routes/ninepaneldrugtest.routes"))
    app.use("/api/ninepaneldrugtestforcde", authenticateToken ,require("../routes/ninepaneldrugtest_for_cde.routes"))
        app.use("/api/academicreference", authenticateToken ,require("../routes/academicreference.routes"))
    app.use("/api/academicreferenceforcde", authenticateToken ,require("../routes/academicreference_for_cde.routes"))
        app.use("/api/additionalidb", authenticateToken ,require("../routes/additionalidb.routes"))
    app.use("/api/additionalidbforcde", authenticateToken ,require("../routes/additionalidb_for_cde.routes"))
        app.use("/api/bankstatement", authenticateToken ,require("../routes/bankstatement.routes"))
    app.use("/api/bankstatementforcde", authenticateToken ,require("../routes/bankstatement_for_cde.routes"))
        app.use("/api/cfbusa", authenticateToken ,require("../routes/cfbusa.routes"))
    app.use("/api/cfbusaforcde", authenticateToken ,require("../routes/cfbusa_for_cde.routes"))
        app.use("/api/cibilcheck", authenticateToken ,require("../routes/cibilcheck.routes"))
    app.use("/api/cibilcheckforcde", authenticateToken ,require("../routes/cibilcheck_for_cde.routes"))
        app.use("/api/companycreditcheck", authenticateToken ,require("../routes/companycreditcheck.routes"))
    app.use("/api/companycreditcheckforcde", authenticateToken ,require("../routes/companycreditcheck_for_cde.routes"))
        app.use("/api/companyverificationonline", authenticateToken ,require("../routes/companyverificationonline.routes"))
    app.use("/api/companyverificationonlineforcde", authenticateToken ,require("../routes/companyverificationonline_for_cde.routes"))
        app.use("/api/companyverificationphysical", authenticateToken ,require("../routes/companyverificationphysical.routes"))
    app.use("/api/companyverificationphysicalforcde", authenticateToken ,require("../routes/companyverificationphysical_for_cde.routes"))
        app.use("/api/cpc", authenticateToken ,require("../routes/cpc.routes"))
    app.use("/api/cpcforcde", authenticateToken ,require("../routes/cpc_for_cde.routes"))
        app.use("/api/creditcheck", authenticateToken ,require("../routes/creditcheck.routes"))
    app.use("/api/creditcheckforcde", authenticateToken ,require("../routes/creditcheck_for_cde.routes"))
        app.use("/api/criminalcourt", authenticateToken ,require("../routes/criminalcourt.routes"))
    app.use("/api/criminalcourtforcde", authenticateToken ,require("../routes/criminalcourt_for_cde.routes"))
        app.use("/api/criminalcourtrecordcheckpermanentaddress", authenticateToken ,require("../routes/criminalcourtrecordcheckpermanentaddress.routes"))
    app.use("/api/criminalcourtrecordcheckpermanentaddressforcde", authenticateToken ,require("../routes/criminalcourtrecordcheckpermanentaddress_for_cde.routes"))
        app.use("/api/criminalonline", authenticateToken ,require("../routes/criminalonline.routes"))
    app.use("/api/criminalonlineforcde", authenticateToken ,require("../routes/criminalonline_for_cde.routes"))
        app.use("/api/criminalverbal", authenticateToken ,require("../routes/criminalverbal.routes"))
    app.use("/api/criminalverbalforcde", authenticateToken ,require("../routes/criminalverbal_for_cde.routes"))
        app.use("/api/criminalwritten", authenticateToken ,require("../routes/criminalwritten.routes"))
    app.use("/api/criminalwrittenforcde", authenticateToken ,require("../routes/criminalwritten_for_cde.routes"))
        app.use("/api/csadp", authenticateToken ,require("../routes/csadp.routes"))
    app.use("/api/csadpforcde", authenticateToken ,require("../routes/csadp_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/cvc", authenticateToken ,require("../routes/cvc.routes"))
    app.use("/api/cvcforcde", authenticateToken ,require("../routes/cvc_for_cde.routes"))
        app.use("/api/dinverification", authenticateToken ,require("../routes/dinverification.routes"))
    app.use("/api/dinverificationforcde", authenticateToken ,require("../routes/dinverification_for_cde.routes"))
        app.use("/api/directorpropritorresidence", authenticateToken ,require("../routes/directorpropritorresidence.routes"))
    app.use("/api/directorpropritorresidenceforcde", authenticateToken ,require("../routes/directorpropritorresidence_for_cde.routes"))
        app.use("/api/directorproprietorcrc", authenticateToken ,require("../routes/directorproprietorcrc.routes"))
    app.use("/api/directorproprietorcrcforcde", authenticateToken ,require("../routes/directorproprietorcrc_for_cde.routes"))
        app.use("/api/directorproprietoridentity", authenticateToken ,require("../routes/directorproprietoridentity.routes"))
    app.use("/api/directorproprietoridentityforcde", authenticateToken ,require("../routes/directorproprietoridentity_for_cde.routes"))
        app.use("/api/directorship", authenticateToken ,require("../routes/directorship.routes"))
    app.use("/api/directorshipforcde", authenticateToken ,require("../routes/directorship_for_cde.routes"))
        app.use("/api/drivinglicense", authenticateToken ,require("../routes/drivinglicense.routes"))
    app.use("/api/drivinglicenseforcde", authenticateToken ,require("../routes/drivinglicense_for_cde.routes"))
        app.use("/api/education", authenticateToken ,require("../routes/education.routes"))
    app.use("/api/educationforcde", authenticateToken ,require("../routes/education_for_cde.routes"))
        app.use("/api/emergencycontact", authenticateToken ,require("../routes/emergencycontact.routes"))
    app.use("/api/emergencycontactforcde", authenticateToken ,require("../routes/emergencycontact_for_cde.routes"))
        app.use("/api/employment", authenticateToken ,require("../routes/employment.routes"))
    app.use("/api/employmentforcde", authenticateToken ,require("../routes/employment_for_cde.routes"))
        app.use("/api/employmenttest3", authenticateToken ,require("../routes/employmenttest3.routes"))
    app.use("/api/employmenttest3forcde", authenticateToken ,require("../routes/employmenttest3_for_cde.routes"))
        app.use("/api/facis", authenticateToken ,require("../routes/facis.routes"))
    app.use("/api/facisforcde", authenticateToken ,require("../routes/facis_for_cde.routes"))
        app.use("/api/fda", authenticateToken ,require("../routes/fda.routes"))
    app.use("/api/fdaforcde", authenticateToken ,require("../routes/fda_for_cde.routes"))
        app.use("/api/formcheck", authenticateToken ,require("../routes/formcheck.routes"))
    app.use("/api/formcheckforcde", authenticateToken ,require("../routes/formcheck_for_cde.routes"))
        app.use("/api/gapanalysis", authenticateToken ,require("../routes/gapanalysis.routes"))
    app.use("/api/gapanalysisforcde", authenticateToken ,require("../routes/gapanalysis_for_cde.routes"))
        app.use("/api/globex", authenticateToken ,require("../routes/globex.routes"))
    app.use("/api/globexforcde", authenticateToken ,require("../routes/globex_for_cde.routes"))
        app.use("/api/gsa", authenticateToken ,require("../routes/gsa.routes"))
    app.use("/api/gsaforcde", authenticateToken ,require("../routes/gsa_for_cde.routes"))
        app.use("/api/idb", authenticateToken ,require("../routes/idb.routes"))
    app.use("/api/idbforcde", authenticateToken ,require("../routes/idb_for_cde.routes"))
        app.use("/api/idbglobalsanctions", authenticateToken ,require("../routes/idbglobalsanctions.routes"))
    app.use("/api/idbglobalsanctionsforcde", authenticateToken ,require("../routes/idbglobalsanctions_for_cde.routes"))
        app.use("/api/idbgdb", authenticateToken ,require("../routes/idbgdb.routes"))
    app.use("/api/idbgdbforcde", authenticateToken ,require("../routes/idbgdb_for_cde.routes"))
        app.use("/api/identity", authenticateToken ,require("../routes/identity.routes"))
    app.use("/api/identityforcde", authenticateToken ,require("../routes/identity_for_cde.routes"))
        app.use("/api/identityanddigital", authenticateToken ,require("../routes/identityanddigital.routes"))
    app.use("/api/identityanddigitalforcde", authenticateToken ,require("../routes/identityanddigital_for_cde.routes"))
        app.use("/api/indianriskdatabase", authenticateToken ,require("../routes/indianriskdatabase.routes"))
    app.use("/api/indianriskdatabaseforcde", authenticateToken ,require("../routes/indianriskdatabase_for_cde.routes"))
        app.use("/api/kyc", authenticateToken ,require("../routes/kyc.routes"))
    app.use("/api/kycforcde", authenticateToken ,require("../routes/kyc_for_cde.routes"))
        app.use("/api/mca", authenticateToken ,require("../routes/mca.routes"))
    app.use("/api/mcaforcde", authenticateToken ,require("../routes/mca_for_cde.routes"))
        app.use("/api/msmeudyam", authenticateToken ,require("../routes/msmeudyam.routes"))
    app.use("/api/msmeudyamforcde", authenticateToken ,require("../routes/msmeudyam_for_cde.routes"))
        app.use("/api/occeausa", authenticateToken ,require("../routes/occeausa.routes"))
    app.use("/api/occeausaforcde", authenticateToken ,require("../routes/occeausa_for_cde.routes"))
        app.use("/api/ofacwithecq", authenticateToken ,require("../routes/ofacwithecq.routes"))
    app.use("/api/ofacwithecqforcde", authenticateToken ,require("../routes/ofacwithecq_for_cde.routes"))
        app.use("/api/oig", authenticateToken ,require("../routes/oig.routes"))
    app.use("/api/oigforcde", authenticateToken ,require("../routes/oig_for_cde.routes"))
        app.use("/api/oig", authenticateToken ,require("../routes/oig.routes"))
    app.use("/api/oigforcde", authenticateToken ,require("../routes/oig_for_cde.routes"))
        app.use("/api/oig", authenticateToken ,require("../routes/oig.routes"))
    app.use("/api/oigforcde", authenticateToken ,require("../routes/oig_for_cde.routes"))
        app.use("/api/pan", authenticateToken ,require("../routes/pan.routes"))
    app.use("/api/panforcde", authenticateToken ,require("../routes/pan_for_cde.routes"))
        app.use("/api/pan", authenticateToken ,require("../routes/pan.routes"))
    app.use("/api/panforcde", authenticateToken ,require("../routes/pan_for_cde.routes"))
        app.use("/api/pan", authenticateToken ,require("../routes/pan.routes"))
    app.use("/api/panforcde", authenticateToken ,require("../routes/pan_for_cde.routes"))
        app.use("/api/passport", authenticateToken ,require("../routes/passport.routes"))
    app.use("/api/passportforcde", authenticateToken ,require("../routes/passport_for_cde.routes"))
        app.use("/api/permanentaddress", authenticateToken ,require("../routes/permanentaddress.routes"))
    app.use("/api/permanentaddressforcde", authenticateToken ,require("../routes/permanentaddress_for_cde.routes"))
        app.use("/api/permanentaddress", authenticateToken ,require("../routes/permanentaddress.routes"))
    app.use("/api/permanentaddressforcde", authenticateToken ,require("../routes/permanentaddress_for_cde.routes"))
        app.use("/api/permanentandcurrentaddress", authenticateToken ,require("../routes/permanentandcurrentaddress.routes"))
    app.use("/api/permanentandcurrentaddressforcde", authenticateToken ,require("../routes/permanentandcurrentaddress_for_cde.routes"))
        app.use("/api/personalreference", authenticateToken ,require("../routes/personalreference.routes"))
    app.use("/api/personalreferenceforcde", authenticateToken ,require("../routes/personalreference_for_cde.routes"))
        app.use("/api/previousaddresscheck", authenticateToken ,require("../routes/previousaddresscheck.routes"))
    app.use("/api/previousaddresscheckforcde", authenticateToken ,require("../routes/previousaddresscheck_for_cde.routes"))
        app.use("/api/licensecertification", authenticateToken ,require("../routes/licensecertification.routes"))
    app.use("/api/licensecertificationforcde", authenticateToken ,require("../routes/licensecertification_for_cde.routes"))
        app.use("/api/professionalreference", authenticateToken ,require("../routes/professionalreference.routes"))
    app.use("/api/professionalreferenceforcde", authenticateToken ,require("../routes/professionalreference_for_cde.routes"))
        app.use("/api/referenceabe", authenticateToken ,require("../routes/referenceabe.routes"))
    app.use("/api/referenceabeforcde", authenticateToken ,require("../routes/referenceabe_for_cde.routes"))
        app.use("/api/pvc", authenticateToken ,require("../routes/pvc.routes"))
    app.use("/api/pvcforcde", authenticateToken ,require("../routes/pvc_for_cde.routes"))
        app.use("/api/righttowork", authenticateToken ,require("../routes/righttowork.routes"))
    app.use("/api/righttoworkforcde", authenticateToken ,require("../routes/righttowork_for_cde.routes"))
        app.use("/api/sdn", authenticateToken ,require("../routes/sdn.routes"))
    app.use("/api/sdnforcde", authenticateToken ,require("../routes/sdn_for_cde.routes"))
        app.use("/api/socialmedia", authenticateToken ,require("../routes/socialmedia.routes"))
    app.use("/api/socialmediaforcde", authenticateToken ,require("../routes/socialmedia_for_cde.routes"))
        app.use("/api/ssncheck", authenticateToken ,require("../routes/ssncheck.routes"))
    app.use("/api/ssncheckforcde", authenticateToken ,require("../routes/ssncheck_for_cde.routes"))
        app.use("/api/testidentity", authenticateToken ,require("../routes/testidentity.routes"))
    app.use("/api/testidentityforcde", authenticateToken ,require("../routes/testidentity_for_cde.routes"))
        app.use("/api/uan", authenticateToken ,require("../routes/uan.routes"))
    app.use("/api/uanforcde", authenticateToken ,require("../routes/uan_for_cde.routes"))
        app.use("/api/voterid", authenticateToken ,require("../routes/voterid.routes"))
    app.use("/api/voteridforcde", authenticateToken ,require("../routes/voterid_for_cde.routes"))
        app.use("/api/webandmedia", authenticateToken ,require("../routes/webandmedia.routes"))
    app.use("/api/webandmediaforcde", authenticateToken ,require("../routes/webandmedia_for_cde.routes"))
        app.use("/api/workpermit", authenticateToken ,require("../routes/workpermit.routes"))
    app.use("/api/workpermitforcde", authenticateToken ,require("../routes/workpermit_for_cde.routes"))
        app.use("/api/ofac", authenticateToken ,require("../routes/ofac.routes"))
    app.use("/api/ofacforcde", authenticateToken ,require("../routes/ofac_for_cde.routes"))
        app.use("/api/ofac", authenticateToken ,require("../routes/ofac.routes"))
    app.use("/api/ofacforcde", authenticateToken ,require("../routes/ofac_for_cde.routes"))
        app.use("/api/fca", authenticateToken ,require("../routes/fca.routes"))
    app.use("/api/fcaforcde", authenticateToken ,require("../routes/fca_for_cde.routes"))
        app.use("/api/nationalitywithrighttowork", authenticateToken ,require("../routes/nationalitywithrighttowork.routes"))
    app.use("/api/nationalitywithrighttoworkforcde", authenticateToken ,require("../routes/nationalitywithrighttowork_for_cde.routes"))
        app.use("/api/webandmedia", authenticateToken ,require("../routes/webandmedia.routes"))
    app.use("/api/webandmediaforcde", authenticateToken ,require("../routes/webandmedia_for_cde.routes"))
	///kymode///
	 app.use('/api/crmcasestatus', authenticateToken, require('../routes/crm_case_status.route.js'))
    app.use('/api/checkhistorys', authenticateToken,require('../routes/check_history.routes.js'))

        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
        app.use("/api/currentaddress", authenticateToken ,require("../routes/currentaddress.routes"))
    app.use("/api/currentaddressforcde", authenticateToken ,require("../routes/currentaddress_for_cde.routes"))
    app.use('/api/apigetdynamiccases',authenticateToken, require('../routes/getDynamicCases.routes.js'))
        //app.use("/api/digitalcurrentaddress", authenticateToken ,require("../routes/digitalcurrentaddress.routes"))
    //app.use("/api/digitalcurrentaddressforcde", authenticateToken ,require("../routes/digitalcurrentaddress_for_cde.routes"))
      //  app.use("/api/digipermanentaddress", authenticateToken ,require("../routes/digipermanentaddress.routes"))
   // app.use("/api/digipermanentaddressforcde", authenticateToken ,require("../routes/digipermanentaddress_for_cde.routes"))
     //   app.use("/api/digitcurrentandpermanentaddress", authenticateToken ,require("../routes/digitcurrentandpermanentaddress.routes"))
   // app.use("/api/digitcurrentandpermanentaddressforcde", authenticateToken ,require("../routes/digitcurrentandpermanentaddress_for_cde.routes"))
        app.use("/api/digitalcurrentaddress", authenticateToken ,require("../routes/digitalcurrentaddress.routes"))
    app.use("/api/digitalcurrentaddressforcde", authenticateToken ,require("../routes/digitalcurrentaddress_for_cde.routes"))
        app.use("/api/digipermanentaddress", authenticateToken ,require("../routes/digipermanentaddress.routes"))
    app.use("/api/digipermanentaddressforcde", authenticateToken ,require("../routes/digipermanentaddress_for_cde.routes"))
        app.use("/api/digitcurrentandpermanentaddress", authenticateToken ,require("../routes/digitcurrentandpermanentaddress.routes"))
    app.use("/api/digitcurrentandpermanentaddressforcde", authenticateToken ,require("../routes/digitcurrentandpermanentaddress_for_cde.routes"))
        app.use("/api/digitalcurrentaddress", authenticateToken ,require("../routes/digitalcurrentaddress.routes"))
    app.use("/api/digitalcurrentaddressforcde", authenticateToken ,require("../routes/digitalcurrentaddress_for_cde.routes"))
        app.use("/api/bankruptcyandinsolvency", authenticateToken ,require("../routes/bankruptcyandinsolvency.routes"))
    app.use("/api/bankruptcyandinsolvencyforcde", authenticateToken ,require("../routes/bankruptcyandinsolvency_for_cde.routes"))
        app.use("/api/bic", authenticateToken ,require("../routes/bic.routes"))
    app.use("/api/bicforcde", authenticateToken ,require("../routes/bic_for_cde.routes"))
    }


module.exports = getAllRoutes;
