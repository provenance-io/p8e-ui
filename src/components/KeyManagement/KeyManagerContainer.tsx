import React, { useCallback, useState } from 'react';
import PageLayout from 'components/Layout/PageLayout';
import { KeyManager } from './KeyManager';
import { usePublicKeys } from 'hooks/key-hooks';
import { ContractKey, KeyTypes } from 'models/keys';
import { AddKeyModalContainer, AddKeyFields } from './AddKeyModalContainer';
import { DisplayPrivateKeysModal } from './DisplayPrivateKeysModal';

export const KeyManagerContainer = () => {
    const { publicKeys, serviceAccountKey, addContractKey, removeKey, updateKey } = usePublicKeys();

    const [addingKey, setAddingKey] = useState<{adding: boolean, type: KeyTypes}>({ adding: false, type: 'CONTRACT' });
    const resetAddingKey = () => setAddingKey({ adding: false, type: 'CONTRACT' });
    const handleAddKey = (type: KeyTypes) => setAddingKey({ adding: !addingKey.adding, type });
    const [newKey, setNewKey] = useState<ContractKey | null>(null)

    const handleCreateKey = ({ signingPrivateKey, encryptionPrivateKey, keyProvider, indexName, alias }: AddKeyFields) => addContractKey(signingPrivateKey, encryptionPrivateKey, keyProvider, indexName, alias)
        .then((key) => {
            setNewKey(key);
            resetAddingKey()
        });

    const dismissNewKey = useCallback(() => {
        setNewKey(null);
    }, []);

    return (
        <PageLayout>
            <KeyManager serviceAccountKey={serviceAccountKey} contractKeys={publicKeys} removeKey={removeKey} addKey={handleAddKey} updateKey={updateKey} />
            <AddKeyModalContainer keyType={addingKey.type} isOpen={addingKey.adding} addKey={handleCreateKey} onClose={resetAddingKey} />
            {newKey && <DisplayPrivateKeysModal contractKey={newKey} onClose={dismissNewKey} />}
        </PageLayout>
    );
}