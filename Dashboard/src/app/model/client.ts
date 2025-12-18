import { ReportType } from '../administration/model/report-type';
import { Subclient } from './subclient';
import {ColorCodes} from "./color-code";
export interface Client {
    _id:string;
    name:string;
    clientCode:string;
    status:string;
    contactPerson:string;
    telephone:string;
    email:string;
    address:string;
    pinCode:string;
    city:string;
    state:string;
    country:string;
    cin:string;
    gstIn:string;
    pan:string;
    pfNumber:string;
    domainName:string;
    colorCodes:ColorCodes[];
    reportTypes:ReportType[];
    priority:number;
    archiveAfter:number;
    uploadTypes:string[];
    closureTypesAllowed:string[];
    closureModesAllowed:string[];
    tatCalculationMethod:string;
    modifiedBy:string;

// Used only on client side
    subclients:Subclient[];
    clientId:string[];
    subClientId:string[];
}