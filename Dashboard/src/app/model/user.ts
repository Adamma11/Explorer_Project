import {Branch} from "./branch";
export interface User{
    _id?:string;
    userId: string,
    name:string,
    status: string,
    branch: string | Branch,
    reportingManager:string | User,
    type: string,
    includedPinRanges: any[],
    excludedPinRanges: any[],
    loggedIn: Boolean,
    modifiedBy: string | User,
    modifiedOn?: Date,
    signatureFile?:any
    password?:string;
}