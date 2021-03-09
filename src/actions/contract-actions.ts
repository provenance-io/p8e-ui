import { P8E_URL } from 'Constant/http';
import { addError } from './error-actions';
import { ajaxGet } from './xhr-actions';

const BASE_URL = `${P8E_URL}/envelope`;

export const GET_CONTRACT_INDEX = 'CONTRACT_INDEX::GET';
export const GET_CONTRACT_DETAILS = 'CONTRACT_DETAILS::GET';

export const getContractIndex = (searchQuery, publicKey, type) => async dispatch =>
  ajaxGet(GET_CONTRACT_INDEX, dispatch, BASE_URL, {
      params: {
        limit: 100,
        q: searchQuery,
        publicKey,
        type,
      },
    })
    .catch(() => dispatch(addError('Error fetching contracts')));

export const getContractDetails = uuid => async dispatch => ajaxGet(GET_CONTRACT_DETAILS, dispatch, `${BASE_URL}/${uuid}`);