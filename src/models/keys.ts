export type KeyTypes = 'SERVICE' | 'CONTRACT';

export interface ContractKey {
    alias?: string;
    indexName: string;
    signingKey: P8EPublicKey;
    encryptionKey: P8EPublicKey;
    serviceKeys: ServiceKey[];
}

export interface P8EPublicKey {
    publicKey: string;
    hexPublicKey: string;
    hexPrivateKey?: string;
    curve: string;
}

export interface ServiceKey {
    alias?: string;
    status: string;
    publicKey: P8EPublicKey;
}

export interface KeyShare {
    affiliatePublicKey: string;
    created: string;
    publicKey: string;
}

interface Address {
    type: string;
    value: string;
}

interface ProvenancePublicKey {
    address: Address;
    compressed: boolean;
    curve: string;
    encodedKey: string;
    encoding: string;
}

export interface ProvenanceRegisteredKey {
    id: string;
    keyUsage: KeyTypes;
    publicKey: ProvenancePublicKey;
    balance?: {
        denom: string;
        amount: string;
    }
}