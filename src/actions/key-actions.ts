import { createAction } from 'redux-actions';
import { P8E_URL } from 'Constant/http';
import { ContractKey, ServiceKey } from 'models/keys';
import { addError } from './error-actions';
import { handleAndThrow } from 'helpers/general';
import { ajaxDelete, ajaxGet, ajaxPatch, ajaxPost } from './xhr-actions';
import { KEY_PROVIDERS } from 'Constant/affiliate';

const AFFILIATE_URL = `${P8E_URL}/keys/affiliate`;
const SERVICE_URL = `${P8E_URL}/keys/service`;

export const GET_KEYS = 'KEYS::GET';
export const UPDATE_CONTRACT_KEY = 'KEYS::UPDATE_CONTRACT';
export const UPDATE_SERVICE_KEY = 'KEYS::UPDATE_SERVICE';
export const SET_CURRENT_KEY = 'KEYS::SET_CURRENT';

export const ADD_CONTRACT_KEY = 'KEYS::ADD_CONTRACT';
export const ADD_SERVICE_KEY = 'KEYS::ADD_SERVICE';
export const FETCH_SERVICE_ACCOUNT_KEYS = 'KEYS::FETCH_SERVICE_ACCOUNT_KEYS';
export const REMOVE_SERVICE_ACCOUNT_KEY = 'KEYS::REMOVE_SERVICE_ACCOUNT_KEY';

export const LINK_SERVICE_ACCOUNT_KEY = 'KEYS::LINK_SERVICE_ACCOUNT';
export const UNLINK_SERVICE_ACCOUNT_KEY = 'KEYS::UNLINK_SERVICE_ACCOUNT';

export const GET_CONTRACT_KEY_SHARES = 'KEYS::GET_CONTRACT_KEY_SHARES';
export const ADD_CONTRACT_KEY_SHARE = 'KEYS::ADD_CONTRACT_KEY_SHARE';
export const REMOVE_CONTRACT_KEY_SHARE = 'KEYS::REMOVE_CONTRACT_KEY_SHARE';

export const getKeys = () => async dispatch => ajaxGet(GET_KEYS, dispatch, AFFILIATE_URL)
    .catch(() => dispatch(addError('Error fetching contract keys')));

export const updateContractKey = (hexPublicKey: string, { alias }: { alias: string }) => async dispatch => ajaxPatch(UPDATE_CONTRACT_KEY, dispatch, `${AFFILIATE_URL}/${hexPublicKey}`, { alias })
    .catch((e) => dispatch(addError('Error updating key value')));

export const setCurrentKey = (currentKey?: ContractKey) => async dispatch => dispatch(createAction(SET_CURRENT_KEY)(currentKey));

export const addContractKey = (signingPrivateKey: string, encryptionPrivateKey: string, keyProvider: KEY_PROVIDERS, indexName: string, alias?: string) => async dispatch => 
    ajaxPost(ADD_CONTRACT_KEY, dispatch, AFFILIATE_URL, { signingPrivateKey, encryptionPrivateKey, keyProvider: keyProvider, indexName, alias })
        .catch(handleAndThrow(() => dispatch(addError('Error adding contract key'))));

export const addServiceKey = (privateKey: string, alias: string) => async dispatch => ajaxPost(ADD_SERVICE_KEY, dispatch, SERVICE_URL, { privateKey, alias })
    .catch(handleAndThrow(() =>  dispatch(addError('Error adding service key'))));

export const updateServiceKey = (hexPublicKey: string, { alias }: { alias: string }) => async dispatch => ajaxPatch(UPDATE_SERVICE_KEY, dispatch, `${SERVICE_URL}/${hexPublicKey}`, { alias })
    .catch((e) => dispatch(addError('Error updating key value')));

export const fetchServiceAccountKey = () => async dispatch => ajaxGet(FETCH_SERVICE_ACCOUNT_KEYS, dispatch, SERVICE_URL)
    .catch(() => dispatch(addError('Error fetching service account keys')))

// todo: replace with ajax or just get rid of this functionality entirely... can we remove service account key? or will this just be treated like other keys?
export const removeServiceAccountKey = (key) => async dispatch => dispatch(createAction(`${REMOVE_SERVICE_ACCOUNT_KEY}_SUCCESS`)());

// data sharing
export const fetchContractKeyShares = (contractPublicKey: string) => async dispatch => ajaxGet(GET_CONTRACT_KEY_SHARES, dispatch, `${AFFILIATE_URL}/${contractPublicKey}/shares`, {}, { contractPublicKey })
    .catch(handleAndThrow(() => dispatch(addError('Error fetching contract key shares'))));

export const addContractKeyShare = (contractPublicKey: string, publicKey: String) => async dispatch => ajaxPost(ADD_CONTRACT_KEY_SHARE, dispatch, `${AFFILIATE_URL}/${contractPublicKey}/shares`, {
    contractPublicKey,
    publicKey
}).catch(handleAndThrow(() => dispatch(addError('Error adding contract key share'))));

export const removeContractKeyShare = (contractPublicKey: string, publicKey: String) => async dispatch => ajaxDelete(REMOVE_CONTRACT_KEY_SHARE, dispatch, `${AFFILIATE_URL}/${contractPublicKey}/shares/${publicKey}`, {}, { contractPublicKey, publicKey })
    .catch(handleAndThrow(() => dispatch(addError('Error removing contract key share'))));
    
// contract/service key linking
export const linkServiceKey = (contractPublicKey: string, serviceKey: ServiceKey) => async dispatch => ajaxPost(LINK_SERVICE_ACCOUNT_KEY, dispatch, `${AFFILIATE_URL}/${contractPublicKey}/service_keys`, {
    contractPublicKey,
    serviceKeys: [serviceKey.publicKey.hexPublicKey]
}).catch(handleAndThrow(() => dispatch(addError('Error linking service account key'))))

export const unlinkServiceKey = (contractPublicKey: string, serviceKey: ServiceKey) => async dispatch => ajaxDelete(UNLINK_SERVICE_ACCOUNT_KEY, dispatch, `${AFFILIATE_URL}/${contractPublicKey}/service_keys`, {
    data: { serviceKeys: [serviceKey.publicKey.hexPublicKey] }
}, { contractPublicKey, unlinkedServiceKeys: [serviceKey] }).catch(handleAndThrow(() => dispatch(addError('Error unlinking service account key'))))
