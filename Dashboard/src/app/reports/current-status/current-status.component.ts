import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { VibeReportService } from '../service/vibe-report.service';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/administration/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSubclientAccessService } from 'src/app/service/user-subclient-access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent {
  resourceLoaded: boolean = true;
  reportType: string = "PENDING";
  clients = new Array<Client>();
  selectedClientId: any;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private vibeReportService: VibeReportService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private fb: FormBuilder,
    private userSubclientAccessService: UserSubclientAccessService
  ) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    const userId = localStorage.getItem('userId') || '';
    this.userSubclientAccessService.findAllSubclientsForAUserUsingEmailId(userId).subscribe(
      response => {
        for (let subclientOfResponse of response) {
          if (!this.foundInClients(subclientOfResponse.client._id)) {
            let client = new Client();
            client._id = subclientOfResponse.client._id;
            client.name = subclientOfResponse.client.name;
            if (subclientOfResponse.client.status == 'ACTIVE') {
              this.clients.push(client);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  foundInClients(clientId: string) {
    return this.clients.some(client => client._id === clientId);
  }

  generateReport() {
    this.resourceLoaded = false;
    const clientId = this.selectedClientId;
    
    this.vibeReportService.StatusBasedReportGenerator(this.reportType, clientId).subscribe(
      (response: HttpResponse<Blob> | any) => {
        FileSaver.saveAs(response.body, `Status-based_report.xlsx`);
        this.resourceLoaded = true;
      },
      error => {
        console.error("Error from Jasper server", error);
        this.showError("Error downloading report");
        this.resourceLoaded = true;
      }
    );
  }

  showError(msg: any) {
    this.snackBar.open(msg, 'Error', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}

class Client {
  _id!: string;
  name!: string;
  status!: string;
}

class Subclient {
  _id!: string;
  name!: string;
}
