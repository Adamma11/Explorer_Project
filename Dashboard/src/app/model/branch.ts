import {User} from "./user";
export interface Branch{
    _id?:string;
    name :string,
    address?:string,
    pinCode?:string,
    district? :string,
    state?:string,
    country?:string,
    includedPinRanges?:any[],
    excludedPinRanges?:any[],
    modifiedBy?:string | User,
    modifiedOn?:Date,
    selected?:boolean

}