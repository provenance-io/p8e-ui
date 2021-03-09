import { handleActions } from 'redux-actions';
import { SET_CURRENT_KEY, GET_KEYS, ADD_CONTRACT_KEY, FETCH_SERVICE_ACCOUNT_KEYS, REMOVE_SERVICE_ACCOUNT_KEY, ADD_SERVICE_KEY, UPDATE_CONTRACT_KEY, UPDATE_SERVICE_KEY, LINK_SERVICE_ACCOUNT_KEY, UNLINK_SERVICE_ACCOUNT_KEY, GET_CONTRACT_KEY_SHARES, REMOVE_CONTRACT_KEY_SHARE, ADD_CONTRACT_KEY_SHARE } from "actions/key-actions";
import { KeyShare } from 'models/keys';
import { XhrStatus } from 'actions';

const initialState = {
    publicKeys: [],
    serviceAccountKeyFetched: false,
    serviceAccountKeys: [],
    serviceAccountKey: null,
    currentPublicKey: null,
    keyShares: new Map(),
};

const keyReducer = handleActions({
    [`${GET_KEYS}_${XhrStatus.SUCCESS}`]: (state, { payload: publicKeys }) => ({
        ...state,
        publicKeys,
    }),
    [SET_CURRENT_KEY]: (state, { payload: currentPublicKey }) => ({
        ...state,
        currentPublicKey,
    }),
    [`${ADD_SERVICE_KEY}_${XhrStatus.SUCCESS}`]: (state, { payload: serviceAccountKey }) => ({
        ...state,
        serviceAccountKey,
        serviceAccountKeys: [...state.serviceAccountKeys, serviceAccountKey],
        serviceAccountKeyFetched: true,
    }),
    [`${ADD_CONTRACT_KEY}_${XhrStatus.SUCCESS}`]: (state, { payload: newPublicKey }) => ({
        ...state,
        publicKeys: [...state.publicKeys, newPublicKey],
    }),
    [`${UPDATE_CONTRACT_KEY}_${XhrStatus.SUCCESS}`]: (state, { payload: updatedKey }) => ({
        ...state,
        publicKeys: state.publicKeys.map(key => key.hexPublicKey === updatedKey.hexPublicKey ? updatedKey : key)
    }),
    [`${FETCH_SERVICE_ACCOUNT_KEYS}_${XhrStatus.SUCCESS}`]: (state, { payload: serviceAccountKeys }) => ({
        ...state,
        serviceAccountKeys,
        serviceAccountKey: serviceAccountKeys?.length > 0 && serviceAccountKeys[0],
        serviceAccountKeyFetched: true,
    }),
    [`${UPDATE_SERVICE_KEY}_${XhrStatus.SUCCESS}`]: (state, { payload: serviceAccountKey }) => ({
        ...state,
        serviceAccountKey,
        serviceAccountKeys: state.serviceAccountKeys.map(key => key.hexPublicKey === serviceAccountKey.hexPublicKey ? serviceAccountKey : key)
    }),
    [`${REMOVE_SERVICE_ACCOUNT_KEY}_${XhrStatus.SUCCESS}`]: (state, action) => ({
        ...state,
        serviceAccountKey: null,
    }),
    [`${LINK_SERVICE_ACCOUNT_KEY}_${XhrStatus.SUCCESS}`]: (state, { payload: linkedServiceKeys, meta: { contractPublicKey }}) => ({
        ...state,
        publicKeys: state.publicKeys.map(pk => pk.hexPublicKey === contractPublicKey ? {
            ...pk,
            serviceKeys: [...pk.serviceKeys, ...linkedServiceKeys]
        } : pk)
    }),
    [`${UNLINK_SERVICE_ACCOUNT_KEY}_${XhrStatus.SUCCESS}`]: (state, { meta: { unlinkedServiceKeys, contractPublicKey }}) => {
        const unlinkedServiceKeysMap = new Map(unlinkedServiceKeys.map(sk => [sk.hexPublicKey, sk]))

        return {
            ...state,
            publicKeys: state.publicKeys.map(pk => pk.hexPublicKey === contractPublicKey ? {
                ...pk,
                serviceKeys: pk.serviceKeys.filter(sk => !unlinkedServiceKeysMap.has(sk.hexPublicKey))
            } : pk)
        }
    },
    [`${GET_CONTRACT_KEY_SHARES}_${XhrStatus.SUCCESS}`]: (state, { payload: shares, meta: { contractPublicKey } }) => {
        state.keyShares.set(contractPublicKey, shares);

        return {
            ...state,
            keyShares: state.keyShares,
        };
    },
    [`${ADD_CONTRACT_KEY_SHARE}_${XhrStatus.SUCCESS}`]: (state, { payload: share, meta: { contractPublicKey }}) => {
        const shares = state.keyShares.get(contractPublicKey) || [];
        state.keyShares.set(contractPublicKey, [...shares, share]);

        return {
            ...state,
            keyShares: state.keyShares
        };
    },
    [`${REMOVE_CONTRACT_KEY_SHARE}_${XhrStatus.SUCCESS}`]: (state, { meta: { contractPublicKey, publicKey } }) => ({
        ...state,
        keyShares: new Map([...state.keyShares.entries()].map(([contractPK, keys]) => contractPK === contractPublicKey
            ? [contractPK, keys.filter((key: KeyShare) => key.publicKey !== publicKey)]
            : [contractPK, keys]
        ))
    }),
}, initialState);

export default keyReducer;