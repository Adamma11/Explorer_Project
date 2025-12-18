 import { ClientContractPackageComponent } from './client-contract-package-component';


export class ClientContractPackage {
    _id!: string;    
    client!: string;
    clientContract!: string;
    name!: string;
    tat!: number;
    price!: number;
    selected!: boolean;
    clientContractPackageComponents!: ClientContractPackageComponent[];
    modifiedBy!: string;    
}