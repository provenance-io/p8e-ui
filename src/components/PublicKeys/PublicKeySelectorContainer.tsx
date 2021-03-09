import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { PublicKeySelector } from './PublicKeySelector';
import { usePublicKeys } from 'hooks/key-hooks';
import { setCurrentKey } from 'actions';
import { ContractKey } from 'models/keys';

export const PublicKeySelectorContainer: FunctionComponent<any> = (props) => {
    const dispatch = useDispatch();
    const { publicKeys, currentPublicKey } = usePublicKeys();

    const setCurrentPublicKey = (key?: ContractKey) => {
        dispatch(setCurrentKey(key));
    }

    return <PublicKeySelector publicKeys={publicKeys} currentPublicKey={currentPublicKey} setCurrentPublicKey={setCurrentPublicKey} {...props} />;
}