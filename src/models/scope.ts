export interface Scope {
    uuid:               string;
    scopeUuid:          string;
    lastExecutionUuid?: string;
    publicKey:          string;
    data:               ScopeData;
}

export interface ScopeHistory {
    uuid: string;
    scopeUuid: string;
    data: ScopeData;
    created: string;
    publicKey: string;
}

export interface ScopeData {
    uuid?:       UUID;
    parties:     Party[];
    recordGroup: RecordGroup[];
    lastEvent?:  LastEvent;
}

export interface LastEvent {
    groupUuid:     UUID;
    executionUuid: UUID;
}

export interface UUID {
    value: string;
}

export interface Party {
    signerRole: SignerRole;
    signer:     Signer;
    address:    Address;
}

export type Address = string

export interface Signer {
    signingPublicKey:    PublicKey;
    encryptionPublicKey: PublicKey;
}

export interface PublicKey {
    publicKeyBytes: string;
    type:           EncryptionPublicKeyType;
    curve:          Curve;
    compressed:     boolean;
}

export enum Curve {
    Secp256K1 = "SECP256K1",
}

export enum EncryptionPublicKeyType {
    Elliptic = "ELLIPTIC",
}

export enum SignerRole {
    Owner = "OWNER",
}

export interface RecordGroup {
    specification: string;
    groupUuid:     UUID;
    executor:      Executor;
    parties:       Party[];
    records:       Record[];
    classname:     string;
    audit:         Audit;
}

export interface Audit {
    createdDate: string;
    createdBy:   Address;
    updatedBy:   string;
    version:     number;
    message:     string;
}

export interface Executor {
    encryptionPublicKey: PublicKey;
}

export interface Record {
    name:       Name;
    hash:       string;
    classname:  string;
    inputs:     Input[];
    result:     Result;
    resultName: Name;
    resultHash: string;
}

export interface Input {
    name:      Name;
    hash:      string;
    classname: string;
    type:      InputType;
}

export enum Name {
    ModifyName = "modifyName",
    Name = "name",
}

export enum InputType {
    NoDefType = "NO_DEF_TYPE",
    Proposed = "PROPOSED",
}

export enum Result {
    Pass = "PASS",
    Skip = "SKIP",
}
