export interface Contract {
    executionId: string;
    publicKey: string;
    id: string;
    groupId: string;
    prevExecutionId?: string;
    data: EnvelopeData;
    tx?: any;
    scopeUuid?: string;
    contractName: string;
    expirationTime?: string;
    errorTime?: string;
    fragmentTime?: string;
    executedTime?: string;
    chaincodeTime?: string;
    outboundTime?: string;
    inboxTime?: string;
    indexTime?: string;
    readTime?: string;
    completeTime?: string;
    signedTime?: string;
    createdTime?: string;
    isInvoker?: boolean;
    isExpired: boolean;
    status: string;
    blockHeight?: string;
    transactionHash?: string;
}

export interface EnvelopeData {
    input:             EnvelopeDataInput;
    result:            EnvelopeDataResult;
    errors:            EnvelopeErrors;
    indexTime:         string;
    isInvoker:         boolean;
    signedTime:        string;
    auditFields:       AuditFields;
    completeTime:      string;
    chaincodeTime:     string;
    contractClassname: string;
}

export type EnvelopeErrors = EnvelopeError[];

export interface EnvelopeError {
    auditFields: AuditFields;
    uuid: UUID;
    executionUuid: UUID;
    groupUuid: UUID;
    message: string;
    readTime: string;
    type: string;
}

export interface AuditFields {
    version:     number;
    createdBy:   string;
    updatedBy:   string;
    createdDate: string;
    updatedDate: string;
}

export interface EnvelopeDataInput {
    ref:           InputRef;
    scope:         Scope;
    contract:      InputContract;
    executionUuid: UUID;
}

export interface InputContract {
    spec:           Spec;
    inputs:         InputElement[];
    invoker:        Invoker;
    recitals:       Recital[];
    startTime:      string;
    definition:     Definition;
    timesExecuted:  number;
    considerations: InputConsideration[];
}

export interface InputConsideration {
    inputs:            ProposedFact[];
    considerationName: string;
}

export interface ProposedFact {
    hash:      string;
    name:      string;
    classname: string;
    type?:     Type;
    ancestor?: ProvenanceReference;
}

export interface ProvenanceReference {
    hash?:      string;
    name?:      string;
    scopeUuid: UUID;
    groupUuid?: UUID;
}

export interface UUID {
    value: string;
}

export enum Type {
    Proposed = "PROPOSED",
}

export interface Definition {
    name:             string;
    type:             string;
    resourceLocation: Location;
}

export interface Location {
    ref:       ResourceLocationRef;
    classname: string;
}

export interface ResourceLocationRef {
    hash: string;
}

export interface InputElement {
    name:         string;
    dataLocation: DataLocation;
}

export interface DataLocation {
    ref:       PurpleRef;
    classname: string;
}

export interface PurpleRef {
    hash:      string;
    scopeUuid: UUID;
}

export interface Invoker {
    encryptionPublicKey: PublicKey;
}

export interface PublicKey {
    publicKeyBytes: string;
}

export interface Recital {
    signer:     RecitalSigner;
    signerRole: string;
}

export interface RecitalSigner {
    signingPublicKey:    PublicKey;
    encryptionPublicKey: PublicKey;
}

export interface Spec {
    name:         string;
    dataLocation: Location;
}

export interface InputRef {
    hash:      string;
    groupUuid: UUID;
    scopeUuid: UUID;
}

export interface Scope {
    uuid:        UUID;
    parties:     Party[];
    lastEvent:   LastEvent;
    recordGroup: RecordGroup[];
}

export interface LastEvent {
    groupUuid:     UUID;
    executionUuid: UUID;
}

export interface Party {
    signer:     RecitalSigner;
    address:    string;
    signerRole: string;
}

export interface RecordGroup {
    parties:       Party[];
    records:       Record[];
    executor:      Invoker;
    classname:     string;
    groupUuid:     UUID;
    specification: string;
}

export interface Record {
    hash:       string;
    name:       string;
    inputs:     ProposedFact[];
    result:     ResultEnum;
    classname:  string;
    resultHash: string;
    resultName: string;
}

export enum ResultEnum {
    Pass = "PASS",
    Skip = "SKIP",
}

export interface EnvelopeDataResult {
    ref:           InputRef;
    scope:         Scope;
    status:        string;
    contract:      ResultContract;
    signatures:    Signature[];
    executionUuid: UUID;
}

export interface ResultContract {
    spec:           Spec;
    inputs:         InputElement[];
    invoker:        Invoker;
    recitals:       Recital[];
    startTime:      string;
    definition:     Definition;
    timesExecuted:  number;
    considerations: ResultConsideration[];
    conditions:     Condition[];
}

export interface Condition {
    conditionName: string;
    result:        ExecutionResult;
}

export type ResultConsideration = {
    result:            ExecutionResult;
} & InputConsideration

export interface ExecutionResult {
    output: ProposedFact;
    result: ResultEnum;
}

export interface Signature {
    algo:      string;
    signer:    SignatureSigner;
    provider:  string;
    signature: string;
}

export interface SignatureSigner {
    signingPublicKey: PublicKey;
}
