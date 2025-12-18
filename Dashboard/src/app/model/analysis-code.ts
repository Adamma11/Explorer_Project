import {AnalysisType} from "./analysis-type";
import {User} from "./user";
export interface AnalysisCode{
    _id?:string;
    analysisType:string|AnalysisType;
    name:string;
    modifiedBy:string|User;
    modifiedOn?:Date;
}