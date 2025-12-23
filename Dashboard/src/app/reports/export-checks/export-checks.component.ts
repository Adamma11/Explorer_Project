import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserSubclientAccessService } from 'src/app/administration/service/user-subclient-access.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service';
import { VibeReportService } from '../service/vibe-report.service';

interface Client {
  _id: string;
  name: string;
  subclients: Subclient[];
}

interface Subclient {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-export-checks',
  templateUrl: './export-checks.component.html',
  styleUrls: ['./export-checks.component.scss']
})
export class ExportChecksComponent implements OnInit {
  exportForm!: FormGroup;
  clients: Client[] = [];
  subclients: Subclient[] = [];
  relevantContractId!: string;

  // statuses = ['Initiated', 'In Progress', 'Completed', 'On Hold', 'Cleared', 'Rejected'];
  statuses = [
  'DE-ALLOCATED',
  'DE-COMPLETED',
  'INITIATED',
  'INPUTQC-ACCEPTED',
  'MENTOR-REVIEW-ACCEPTED',
  'MENTOR-REVIEW-REJECTED',
  'OUTPUTQC-ACCEPTED',
  'OUTPUTQC-REJECTED'
];

  applications = ['All Checks', 'All Applications'];

  reportHeaders = [
    'Application Number',
    'Candidate Name',
    'Candidate Employee Id',
    'Process',
    'Customer Location',
    'Application Creation Date',
    'Band Level',
    'Document Received Date',
    'TAT Start Date',
    'TAT End Date',
    'Application Completion Date',
    'Application Status',
    'Application Grading',
    'Customer Legal Name'
  ];

  selectedHeaders: string[] = [];
  isLoading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userSubclientAccessService: UserSubclientAccessService,
    private clientContractService: ClientContractService,
    private vibeReportService: VibeReportService,
  ) {}

  ngOnInit(): void {
    this.exportForm = this.fb.group({
      applicationType: [''],
      clientId: [''],
      subclientId: [''],
      status: [''],
      dateFrom: [''],
      dateTo: ['']
    });

    this.loadClientsAndSubclients();
  }

  loadClientsAndSubclients() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(userId).subscribe({
      next: (response: any[]) => {
        for (const subclientInfo of response) {
          const clientId = subclientInfo.client._id;
          const subclientId = subclientInfo.subclient._id;
          const subclientName = subclientInfo.subclient.name;

          if (!this.clients.find(c => c._id === clientId)) {
            this.clients.push({
              _id: clientId,
              name: subclientInfo.client.name,
              subclients: []
            });
          }

          const client = this.clients.find(c => c._id === clientId);
          if (client && !client.subclients.find(s => s._id === subclientId)) {
            client.subclients.push({ _id: subclientId, name: subclientName });
          }
        }
      },
      error: (err) => console.error('Error fetching clients/subclients:', err)
    });
  }

  onClientSelectionChanged() {
    const clientId = this.exportForm.get('clientId')?.value;
    const selectedClient = this.clients.find(c => c._id === clientId);
    this.subclients = selectedClient ? selectedClient.subclients : [];

    this.getRelevantClientContracts(clientId);
  }

  getRelevantClientContracts(clientId: string) {
    this.clientContractService.findAllForAClient(clientId).subscribe({
      next: (contracts: any[]) => {
        const currentDate = new Date();
        const validContract = contracts.find(
          (c: any) =>
            currentDate > new Date(c.effectiveDate) &&
            currentDate < new Date(c.expiryDate)
        );
        if (validContract) this.relevantContractId = validContract._id;
      },
      error: (err) => console.error('Error loading contracts:', err)
    });
  }

  toggleHeader(header: string) {
    if (this.selectedHeaders.includes(header)) {
      this.selectedHeaders = this.selectedHeaders.filter(h => h !== header);
    } else {
      this.selectedHeaders.push(header);
    }
  }

  onExport(format: string) {
    this.isLoading = true;
    this.message = '';

    const filters = {
      ...this.exportForm.value,
      componentsToInclude: this.selectedHeaders,
      contractId: this.relevantContractId || null
    };

    console.log('Sending filters:', filters);

    
    this.vibeReportService.getclientTrackerForCustomFields(this.exportForm.get('clientId')?.value, filters).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.isLoading = false;
        const blob = response.body as Blob;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_checks.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.message = 'Export successful ';
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Export error:', err);
        this.message = 'Export failed ';
      }
    
    })

    
  }

  get isExportDisabled(): boolean {
  const clientId = this.exportForm.get('clientId')?.value;
  const subclientId = this.exportForm.get('subclientId')?.value;
  // Disable if either client or subclient not selected
  return !(clientId && subclientId);
}

}
