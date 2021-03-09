import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getKeys, fetchServiceAccountKey, removeServiceAccountKey, addContractKey as addContractKeyAction, addServiceKey as addServiceKeyAction, updateContractKey, updateServiceKey, fetchContractKeyShares, addContractKeyShare, removeContractKeyShare, linkServiceKey, unlinkServiceKey } from 'actions';
import { KeyTypes, ContractKey, ServiceKey, KeyShare } from 'models/keys';

export const usePublicKeys = () => {
    const dispatch = useDispatch();
    const { currentPublicKey, publicKeys, serviceAccountKey, serviceAccountKeyFetched } = useSelector(({ keyReducer }) => keyReducer);

    const addContractKey = (signingPrivateKey: string, encryptionPrivateKey: string, useSigningKeyForEncryption: boolean, indexName: string, alias?: string): Promise<ContractKey> => dispatch(addContractKeyAction(signingPrivateKey, encryptionPrivateKey, useSigningKeyForEncryption, indexName, alias));
    const addServiceKey = (privateKey: string, alias: string): Promise<ServiceKey> => dispatch(addServiceKeyAction(privateKey, alias));
    const updateKey = (type: KeyTypes, publicKey: string, alias: string): Promise<ContractKey | ServiceKey> => {
        const action = (type === 'CONTRACT' ? updateContractKey : updateServiceKey)
        return dispatch(action(publicKey, { alias }))
    }

    const removeKey = key => dispatch(removeServiceAccountKey(key))

    useEffect(() => {
        dispatch(getKeys());
        dispatch(fetchServiceAccountKey());
    }, [dispatch])

    return {
        publicKeys,
        currentPublicKey,
        serviceAccountKey,
        serviceAccountKeyFetched,
        addContractKey,
        addServiceKey,
        updateKey,
        removeKey,
    };
}

export const useServiceKeyDetails = (publicKey: string) => {
    const dispatch = useDispatch();
    const { serviceAccountKeys }: { serviceAccountKeys: ServiceKey[] } = useSelector(({ keyReducer }) => keyReducer);

    const updateKey = (alias: string): Promise<ContractKey> => dispatch(updateServiceKey(publicKey, { alias }))

    useEffect(() => {
        dispatch(fetchServiceAccountKey());
    }, [dispatch])

    return {
        serviceKey: serviceAccountKeys.find(key => key.publicKey.hexPublicKey === publicKey),
        updateKey
    }
}

export const useContractKeyDetails = (publicKey: string) => {
    const dispatch = useDispatch();
    const { publicKeys }: { publicKeys: ContractKey[] } = useSelector(({ keyReducer }) => keyReducer);
    
    const updateKey = (alias: string): Promise<ContractKey> => dispatch(updateContractKey(publicKey, { alias }))

    useEffect(() => {
        dispatch(getKeys());
    }, [dispatch]);

    return {
        contractKey: publicKeys.find(key => key.signingKey.hexPublicKey === publicKey),
        updateKey
    }
}

export const useKeySharing = (contractPublicKey: string) => {
    const dispatch = useDispatch();
    const { keyShares }: { keyShares: Map<string, KeyShare[]> } = useSelector(({ keyReducer }) => keyReducer);

    const addShare = (publicKey: string) => dispatch(addContractKeyShare(contractPublicKey, publicKey));
    const removeShare = (publicKey: string) => dispatch(removeContractKeyShare(contractPublicKey, publicKey));

    useEffect(() => {
        if (!keyShares.has(contractPublicKey)) {
            dispatch(fetchContractKeyShares(contractPublicKey));
        }
    }, [dispatch, contractPublicKey, keyShares]);

    return {
        keyShares: keyShares.get(contractPublicKey) || [],
        addShare,
        removeShare,
    };
}

export const useKeyLinking = () => {
    const dispatch = useDispatch();

    const { serviceAccountKeys } = useSelector(({ keyReducer }) => keyReducer);

    const linkKey = (contractPublicKey: string, serviceKey: ServiceKey): Promise<ServiceKey[]> => dispatch(linkServiceKey(contractPublicKey, serviceKey))
    const unlinkKey = (contractPublicKey: string, serviceKey: ServiceKey): Promise<ServiceKey[]> => dispatch(unlinkServiceKey(contractPublicKey, serviceKey))

    return {
        serviceAccountKeys,
        linkKey,
        unlinkKey,
    }
}