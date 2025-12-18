import {Subclient} from "./subclient";
import {EmailTemplate} from "./email-template";
import { User } from "./user";
export interface SubclientNotification{
        _id?:string;
        subclient:string|Subclient,
        triggerStatus:string,
        triggerColor:string,
        frequency:string,
        template:string | EmailTemplate,	
        email: string ,
        modifiedBy?:string|User,
        modifiedOn?:Date
    
}