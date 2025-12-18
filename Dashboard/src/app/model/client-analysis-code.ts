import {User} from "./user";
import {AnalysisType} from "./analysis-type";
import {AnalysisCode} from './analysis-code';
import {Client} from "./client";

export interface ClientAnalysisCode{
    _id?:string;
    client:string|Client,
    analysisType:string | AnalysisType,
    analysisCode:string|AnalysisCode,
    modifiedBy:string|User,
}