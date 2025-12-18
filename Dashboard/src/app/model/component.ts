import { ComponentField } from './component-field';

export interface ApplicationComponent {
    [x: string]: any;
    _id:string;
    displayName:string;
    name:string;
    fileUploadRequired:boolean;
    componentFields:any[];
    allowCopyingFrom:string;
    type:string;
    modifiedBy:string;  
}
