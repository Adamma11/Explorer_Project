import { PersonalDetailsField } from './personal-details-field';

export class PersonalDetails {
    _id?:string;
    displayName!:string;
    personalDetailsFields!:PersonalDetailsField[];
    modifiedBy!:string;      
}
