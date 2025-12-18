import { ClientContractProfileComponent } from './client-contract-profile-component';

export class ClientContractProfile {
    _id!: string;    
    client!: string;
    clientContract!: string;
    name!: string;
    tat!: number;
    selected!: boolean;
    clientContractProfileComponents!: ClientContractProfileComponent[];
    modifiedBy!: string;    
}