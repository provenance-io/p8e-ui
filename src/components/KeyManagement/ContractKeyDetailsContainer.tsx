import React, { FunctionComponent, useCallback } from 'react';
import { useContractKeyDetails, useKeyLinking, useKeySharing } from 'hooks/key-hooks';
import { ContractKeyDetails } from './ContractKeyDetails';
import { ServiceKey } from 'models/keys';
import { Callout } from 'components/ErrorCards';

interface ContractKeyDetailsContainerProps {
    publicKey: string;
}

export const ContractKeyDetailsContainer: FunctionComponent<ContractKeyDetailsContainerProps> = ({ publicKey }) => {
    const { contractKey, updateKey } = useContractKeyDetails(publicKey);
    const { serviceAccountKeys, linkKey, unlinkKey } = useKeyLinking();
    const { keyShares, addShare, removeShare } = useKeySharing(publicKey)

    const contractPublicKey = contractKey?.signingKey?.hexPublicKey || '';

    const linkServiceKey = useCallback((serviceKey: ServiceKey) =>
        linkKey(contractPublicKey, serviceKey)
    , [contractPublicKey, linkKey])

    const unlinkServiceKey = useCallback((serviceKey: ServiceKey) =>
        unlinkKey(contractPublicKey, serviceKey)
    , [contractPublicKey, unlinkKey])

    if (!contractKey) {
        return <Callout>Error fetching contract key</Callout>
    }

    return <ContractKeyDetails contractKey={contractKey} updateKey={updateKey}
        keyShares={keyShares} addShare={addShare} removeShare={removeShare}
        serviceKeys={serviceAccountKeys} linkServiceKey={linkServiceKey} unlinkServiceKey={unlinkServiceKey}
    />
}