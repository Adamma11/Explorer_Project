import {User} from "./user";
export interface AnalysisType{
    _id?:string;
    name:string,
    modifiedBy:string|User,
    modifiedOn?:Date
}