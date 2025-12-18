import { INavbarData ,isAllowed ,isDataEntryMenuRequired,isInsufficiencyMenuRequired,isOutputqcMenuRequired, isVerificationsMenuRequired } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/home/dashboard',
        icon: 'fal fa-home',
        label: 'Home',
        permission:isAllowed('')

    },
            {
                routeLink: '/home/masters/universities',
                icon: 'fal fa-graduation-cap',
                label: 'Education DB',
                permission:isAllowed('MST-001')
            },
            {
                routeLink: '/home/masters/companies',
                icon: 'fal fa-user-check',
                label: 'Employment DB',
                permission:isAllowed('MST-002')
               
              
            },
            {
                routeLink: '/home/masters/pinlist',
                // icon: 'fal fa-graduation-cap',
                icon: 'fal fa-thumbtack',
                label: 'PIN',
                permission:isAllowed('MST-003')
                // <i class="fa-solid fa-thumbtack"></i>
            },
            {
                routeLink: '/home/masters/branchlist',
                icon: 'fal fa-code-branch',
                label: 'Branches',
                permission:isAllowed('MST-004')
               
            },
            // {
            //     routeLink: '/home/masters/educationmaster',
            //     icon: 'fal fa-graduation-cap',
            //     label: 'Education Master',
            //     permission:isAllowed('MST-005')

            // },
            // {
            //     routeLink: '/home/masters/employmentmaster',
            //     icon: 'fal fa-graduation-cap',
            //     label: 'Employment Master',
            //     permission:isAllowed('MST-006')

            // },
            {
                routeLink: '/home/masters/standardverbiagelist',
                icon: 'fal fa-bars',
                label: 'Standard Verbiage',
                permission:isAllowed('MST-010')
          
            },
            {
                routeLink: '/home/masters/emailtemplates',
                icon: 'fal fa-envelope',
                label: 'Email Templates',
                permission:isAllowed('MST-007')
          

            },
            // {
            //     routeLink: '/home/masters/analysistypes',
            //     icon: 'fal fa-graduation-cap',
            //     label: 'Analysis Type',
            //     permission:isAllowed('MST-008')

            // },
            // {
            //     routeLink: '/home/masters/analysiscodes',
            //     icon: 'fal fa-graduation-cap',
            //     label: 'Analysis Codes',
            //     permission:isAllowed('MST-009')

            // },
       
   
    // {
    //     routeLink: 'adminstration',
    //     icon: 'fal fa-chart-bar',
    //     label: 'ADMINSTRATIONS'
    // },

    {
        routeLink: '/home/administration/color-codes-list',
        icon: 'fal fa-palette',
        label: 'Color Codes',
        permission:isAllowed('ADM-001')
       
    },

    {
        routeLink: '/home/administration/clients-list',
        icon: 'fal fa-user-tie',
        label: 'Clients',
        permission:isAllowed('ADM-002')
       
    },
    // {
    //     routeLink: '/home/administration/vendors',
    //     icon: 'fal fa-user-tie',
    //     label: 'Vendors',
    //     permission:isAllowed('ADM-003')

    // },
    {
        routeLink: '/home/administration/personal-details-config',
        icon: 'fal fa-user',
        label: 'Profile Configuration',
        permission:isAllowed('ADM-004')
       
        
        
    },
    {
        routeLink: '/home/administration/components',
        icon: 'fal fa-building',
        label: 'Checks',
        permission:isAllowed('ADM-005')
       
    },

    {
        routeLink: '/home/administration/roles',
        icon: 'fal fa-user-tie',
        label: 'Role',
        permission:isAllowed('ADM-006')
       
    },

    {
        routeLink: '/home/administration/users',
        icon: 'fal fa-duotone fa-user',
        label: 'Users',
        permission:isAllowed('ADM-007')
        
    },
    {
        routeLink: '/home/administration/generate-password',
        icon: 'fal fa-lock-open',
        label: 'Generate Password',
        permission:isAllowed('ADM-008')
       
    },
    {
        routeLink: '/home/administration/default-calender',
        icon: 'fal fa-calendar',
        label: 'Yearly Calendar',
        permission:isAllowed('ADM-009')
    },
    // {
    //     routeLink: '/home/administration/vendor-users',
    //     icon: 'fal fa-tags',
    //     label: 'Vandor Users',
    //     permission:isAllowed('ADM-010')
    // },
 
{
    routeLink: '', 
    icon: 'fal fa-database',
    label: 'Inception',
    permission: isDataEntryMenuRequired(), 

    items: [
        {
            routeLink: '/home/operations/dataentry/decaselistfortl',
            label: 'Assign',
            permission: isAllowed('OPER-002') 
        },
        {
            routeLink: '/home/operations/dataentry/decaselist',
            label: 'Incept',
            permission: isAllowed('OPER-001') 
        }
    ]
},

    {
        routeLink: '/home/inputqc/inputqccaselist',
        icon: 'fal  fa-pencil',
        label: 'Inception QC',
        permission:isAllowed('OPER-012')
      
        
    },
    {
        routeLink: 'coupens/list',
        icon: 'fal  fa-recycle',
        label: 'Verification',
        permission:isVerificationsMenuRequired(),

       
        items:[
            {
                routeLink: '/home/verification/analystlistofchecks',
                label: 'Initiate Verification',
                permission:isAllowed('OPER-003')

            },
            // {
            //     routeLink: 'media',
            //     label: 'List Of Checks - Field Executive',
            // },
            // {
            //     routeLink: 'media',
            //     label: 'Request for Payment',
            // },

        ]
    },
    {
        routeLink: '/home/apiault',
        icon: 'fal fa-solid fa-box',
        label: 'API-Vault',
        permission:isAllowed('OPER-026')
       
     },
    {
       routeLink: '/home/mentorreview/mentorreviewlist',
       icon: 'fal fa-check',
       label: 'Interim QC',
       permission:isAllowed('OPER-008')
      
    },
{
       routeLink: 'coupens/list',
       icon: 'fal fa-file-import',
       label: 'Final QC',
       permission:isOutputqcMenuRequired(),
      
       
       items:[
           {
               routeLink: '/home/outputqc/allocateoutputqc',
               label: 'Assign QC',
               permission:isAllowed('OPER-025')

           },
           {
               routeLink: '/home/outputqc/outputqclist',
               label: 'Conduct QC', 
               permission:isAllowed('OPER-009')

           },
        //    {
        //        routeLink: '/home/outputqc/interimqclist',
        //        label: 'Interim QC Cases', 
        //        permission:isAllowed('OPER-029')

        //    }
       ]
},
{
routeLink: 'outputqc/interimqclist',
icon: 'fal fa-file-import',
label: 'Insufficiencies', 
permission:isInsufficiencyMenuRequired(),

items:[
   {
       routeLink: '/home/insufficiencies/scrutinyinsuflist',

       label: 'Validation', 
       permission:isAllowed('OPER-010')

   },
   {
       routeLink: '/home/insufficiencies/clientinsuflist',
       label: 'Clearance', 
       permission:isAllowed('OPER-011')

   },

]
},
{
routeLink: '/home/verification/listofcheckstoallocate',
icon: 'fal fa-list',
label: 'Assigning Checks- Others',
permission:isAllowed('OPER-019')
},

{
    routeLink: '/home/crm/casestatus',
    icon: 'fal fa-signal',
    label: 'CRM - Case Status',
    permission:isAllowed('CRM-001')
   
},
{
    routeLink: '/home/upload/caseupload',
    icon: 'fal fa-upload',
    label: 'Single Case Upload',
    permission:isAllowed('CRM-002')
   
},
{
    routeLink: '/home/upload/batchuploads',
    icon: 'fal fa-upload',
    label: 'Upload a Batch',
    permission:isAllowed('CRM-003')

},
{
    routeLink: '/home/upload/batchacceptancelist',
    icon: 'fal fa-list',
    label: 'Accept Batch',
    permission:isAllowed('CRM-004')
},
{
    routeLink: '/home/upload/downloadexcelcaseInitiation',
    icon: 'fal fa-download',
    label: 'Download Excel Case Initiiation',
    permission:isAllowed('CRM-005')
},
{
    routeLink: '/home/upload/downloadexceltemplate',
    icon: 'fal fa-download',
    label: 'Download Excel Template',
    permission:isAllowed('CRM-005')
},


    // {
    //     routeLink: 'coupens',
    //     icon: 'fal fa-tags',
    //     label: 'OPERATIONS',
    //     items: [
    //         {
    //             routeLink: 'coupens/list',
    //             label: 'Data Entry',
    //             items:[
    //                 {
    //                     routeLink: '/home/operations/dataentry/decaselistfortl',
    //                     label: 'Data Entry Case List'
    //                 },
    //                 {
    //                     routeLink: '/home/operations/dataentry/decaselist',
    //                     label: 'Data Entry Analyst'
    //                 },
    //                 {
    //                     routeLink: 'coupens/create',
    //                     label: 'Allocated Cases'
    //                 },

    //             ]
    //         },
    //         {
    //             routeLink: '/home/inputqc/inputqccaselist',
    //             label: 'Input QC'
    //         },{
    //             routeLink: 'coupens/list',
    //             label: 'Verification',
    //             items:[
    //                 {
    //                     routeLink: '/home/verification/analystlistofchecks',
    //                     label: 'List Of Checks - Analyst',
    //                 },
    //                 // {
    //                 //     routeLink: 'media',
    //                 //     label: 'List Of Checks - Field Executive',
    //                 // },
    //                 // {
    //                 //     routeLink: 'media',
    //                 //     label: 'Request for Payment',
    //                 // },

    //             ]
    //         },
    //         {
    //                      routeLink: '/home/mentorreview/mentorreviewlist',
    //                     label: 'Mentor Review',
    //         },
    //         {
    //                     routeLink: 'mentorreview/mentorreviewlist',
    //                     label: 'Output QC',
    //                     items:[
    //                         {
    //                             routeLink: '/home/outputqc/allocateoutputqc',
    //                             label: 'Allocate Cases',
    //                         },
    //                         {
    //                             routeLink: '/home/outputqc/outputqclist',
    //                             label: 'Outputqc Cases', 
    //                         },
    //                         {
    //                             routeLink: '/home/outputqc/interimqclist',
    //                             label: 'Interim QC Cases', 
    //                         }
    //                     ]
    //         },
    //         {
    //             routeLink: 'outputqc/interimqclist',
    //             label: 'Insufficiency', 
    //             items:[
    //                 {
    //                     routeLink: '/home/insufficiencies/scrutinyinsuflist',
    //                     label: 'Scrutiny', 
    //                 },
    //                 {
    //                     routeLink: '/home/insufficiencies/clientinsuflist',
    //                     label: 'Client', 
    //                 },

    //             ]
    //         },
    //         {
    //             routeLink: '/home/verification/listofcheckstoallocate',
    //             label: 'Allocated Checks - Other',
    //         }
    //     ]
    // },
    // {
    //     routeLink: 'pages',
    //     icon: 'fal fa-file',
    //     label: 'CRM',
    //     items:[
    //         {
    //             routeLink: '/home/crm/casestatus',
    //             icon: 'fal fa-file',
    //             label: 'Case Status',
    //         },
    //         {
    //             routeLink: '/home/upload/caseupload',
    //             icon: 'fal fa-file',
    //             label: 'Single Case Upload',
    //         },
    //         {
    //             routeLink: '/home/upload/batchuploads',
    //             icon: 'fal fa-file',
    //             label: 'Upload a Batch',
    //         },
    //         {
    //             routeLink: '/home/upload/batchacceptancelist',
    //             icon: 'fal fa-file',
    //             label: 'Accept Batch',
    //         },
    //         {
    //             routeLink: '/home/upload/downloadexceltemplate',
    //             icon: 'fal fa-file',
    //             label: 'Download Excel Template',
    //         }

    //     ]
    // },
  
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'REPORTS'
    },
    {
        routeLink: '/home/crm/newcasestatus',
        icon: 'fal fa-camera',
        label: 'Case Status in depth',
        permission:isAllowed('UTIL-003')

    },

    {
        routeLink: '/home/crm/utilitiescasestatus',
        icon: 'fal fa-camera',
        label: 'Modify Case',
        permission:isAllowed('UTIL-001') 

    },
    {
        routeLink: '/home/quick-verify/verify',
        icon: 'fal fa-check-circle',
        label: 'Instant Verify',
        permission:isAllowed('UTIL-005')

    },
    {
        routeLink: '/home/verification/downloadwordreportnew',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'Reports',
        permission:isAllowed('OPER-023')
       
    },
    {
        routeLink: '/home/verification/updatelhslist',
        icon: 'fal fa-camera',
        label: 'Update LHS',
        permission:isAllowed('UTIL-002') 

    },
    {
        routeLink: '/home/deletecase',
        icon: 'fal fa-trash',
        label: 'Delete Case',
        permission:isAllowed('UTIL-006')
       
    },
    {
        routeLink: '/home/changepassword',
        icon: 'fal fa-lock-open',
        label: 'Change Password',
        permission:isAllowed('')
       
    },
    {
        routeLink: '/home/reports/tlpendingreport',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'TL Reports',
        permission:isAllowed('REP-001')
       
    },
    {
        routeLink: '/home/reports/analysttracker',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'Analyst Reports',
        permission:isAllowed('REP-005')
       
    },

    {
        routeLink: '/home/reports/current-status',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'Status Reports',
        permission:isAllowed('OPER-028')
       
    },
    {
        routeLink: '/home/reports/statustracker',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'Date Wise Reports',
        permission:isAllowed('OPER-027')
       
    },
        {
        routeLink: '/home/reports/clientReport',
        icon: 'fal fa-arrow-alt-circle-down',
        label: 'Client Reports',
        permission:isAllowed('CRM-015')
       
    },
    
    // {
    //     routeLink: 'settings',
    //     icon: 'fal fa-cog',
    //     label: 'SUPPORT',
    //     expanded: true,
    //     items: [
    //         {
    //             routeLink: 'settings/profile',
    //             label: 'Profile'
    //         },
    //         {
    //             routeLink: 'settings/customize',
    //             label: 'Customize'
    //         }
    //     ]
    // },

    //code added Akshay nov-24//

     {
      routeLink: '/home/reports/export-checks',
      icon: 'fal fa-chart-line',
      label: 'Export Checks',
      permission: isAllowed('REP-001'),
    }
];