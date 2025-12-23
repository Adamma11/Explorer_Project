export class Case {
    _id!: string;
    caseId!: string;
    candidateName!: string;
    employeeId!: string;
    batch!: string;
    client!: string;
    subclient!: string;
    package!: string;
    profile!: string;
    casePriority!:string;
    uploadDate!: string;
    initiationDate!: string;
    tatEndDate!: string;
    dataEntryCompletionDate!: string;
    inputqcCompletionDate!: string;
    outputqcCompletionDate!: string;
    reportDate!: string;
    caseStopDate!: string;
    reinitiationDate!: string;
    firstInsufficiencyRaisedDate!: string;
    lastInsufficiencyClearedDate!: string;
    status!: string;
    componentsToCheck!: any[];
    batchId!: number;
    tat!: number;
    grade!: string;
    modifiedBy!: string;    
}
