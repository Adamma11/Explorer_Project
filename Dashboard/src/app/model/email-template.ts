import {User} from "./user"
export interface EmailTemplate{
      _id?:string;
      name :string,
      subject:string,
      content:string,
      modifiedBy?:string | User,
      modifiedOn?:Date

}