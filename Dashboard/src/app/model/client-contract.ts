
import {Client} from "./client";
export interface ClientContract {
    _id:string; 
    name:string
    client:string;
    agreementDate:string;
    effectiveDate:string;
    expiryDate:string;
    retentationDate:string;
    penaltySlabs:any[];
    incentiveSlabs:any[];
    modifiiedBy:string; 
       
}
