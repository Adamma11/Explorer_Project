export interface RoleModule {
    _id:string;
    role:string;
    roleName:string;
    applicationModule:string;
    applicationModuleName:string;
    create:boolean;
    read:boolean;
    update:boolean;
    delete:boolean;
    modifiedBt:string;    
}
