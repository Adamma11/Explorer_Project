export interface Role {
    _id:string;
    name:string;
    usersInRole:string[];
    dashboardsInRole:string[];
    modifiedBy:string;
    modifiedOn:Date;    
}
