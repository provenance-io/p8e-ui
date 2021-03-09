import { P8E_URL } from 'Constant/http';
import { handleAndThrow } from 'helpers/general';
import { addError } from './error-actions';
import { ajaxGet } from './xhr-actions';

const BASE_URL = `${P8E_URL}/scopes`

export const GET_SCOPE_INDEX = 'SCOPE_INDEX::GET';
export const GET_SCOPE = 'SCOPE::GET';
export const GET_SCOPE_HISTORY = 'SCOPE_HISTORY::GET';
export const GET_SCOPE_HISTORY_DETAILS = 'SCOPE_HISTORY_DETAILS::GET';

export const getScopeIndex = (searchQuery: string) => async dispatch => ajaxGet(GET_SCOPE_INDEX, dispatch, BASE_URL, {
    params: {
        limit: 100,
        q: searchQuery
    }
}).catch(handleAndThrow(() => dispatch(addError("Error fetching scopes"))));

export const getScope = (uuid: string) => async dispatch => ajaxGet(GET_SCOPE, dispatch, `${BASE_URL}/${uuid}`, undefined, { uuid })
    .catch(handleAndThrow(() => dispatch(addError(`Error fetching scope ${uuid}`))))

export const getScopeHistory = (scopeUuid: string) => async dispatch => ajaxGet(GET_SCOPE_HISTORY, dispatch, `${BASE_URL}/${scopeUuid}/history`)
    .catch(handleAndThrow(() => dispatch(addError(`Error fetching scope history for ${scopeUuid}`))))

export const getScopeHistoryDetails = (uuid: string) => async dispatch => ajaxGet(GET_SCOPE_HISTORY_DETAILS, dispatch, `${BASE_URL}/history/${uuid}`, undefined, { uuid })
    .catch(handleAndThrow(() => dispatch(addError(`Error fetching scope history ${uuid}`))))