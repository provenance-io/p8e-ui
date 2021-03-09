import { GET_SCOPE, GET_SCOPE_HISTORY, GET_SCOPE_HISTORY_DETAILS, GET_SCOPE_INDEX, XhrStatus } from 'actions';
import { handleActions } from 'redux-actions';
import { ScopeHistory } from 'models/scope';

const initialState = {
    scopes: [],
    scope: {},
    fetchingScope: false,
    errorFindingScope: null,
    scopeHistory: [],
    scopeHistoryDetails: new Map<string, ScopeHistory>(),
    scopeHistoryLoading: false,
    errorFindingScopeHistory: null,
}

const scopeReducer = handleActions({
    [`${GET_SCOPE_INDEX}_${XhrStatus.SUCCESS}`]: (state, { payload: scopes }) => ({
        ...state,
        scopes,
    }),
    [`${GET_SCOPE}_${XhrStatus.REQUEST}`]: state => ({
        ...state,
        fetchingScope: true,
    }),
    [`${GET_SCOPE}_${XhrStatus.SUCCESS}`]: (state, { payload: scope }) => ({
        ...state,
        scope,
        fetchingScope: false,
        errorFindingScope: null,
    }),
    [`${GET_SCOPE}_${XhrStatus.FAILURE}`]: (state, { meta: { uuid } }) => ({
        ...state,
        fetchingScope: false,
        errorFindingScope: `Error fetching scope ${uuid}`,
    }),
    [`${GET_SCOPE_HISTORY}_${XhrStatus.SUCCESS}`]: (state, { payload: scopeHistory }) => ({
        ...state,
        scopeHistory,
    }),
    [`${GET_SCOPE_HISTORY_DETAILS}_${XhrStatus.REQUEST}`]: (state, { payload: scopeHistory }) => ({
        ...state,
        scopeHistoryLoading: true,
        errorFindingScopeHistory: null,
    }),
    [`${GET_SCOPE_HISTORY_DETAILS}_${XhrStatus.SUCCESS}`]: (state, { payload: scopeHistory }) => ({
        ...state,
        scopeHistoryDetails: new Map([...state.scopeHistoryDetails.entries(), [scopeHistory.uuid, scopeHistory]]),
        scopeHistoryLoading: false,
        errorFindingScopeHistory: null,
    }),
    [`${GET_SCOPE_HISTORY_DETAILS}_${XhrStatus.FAILURE}`]: (state, { meta: { uuid } }) => ({
        ...state,
        scopeHistoryLoading: false,
        errorFindingScopeHistory: `Error fetching scope history ${uuid}`,
    }),
}, initialState);

export default scopeReducer;