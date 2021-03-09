import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScope, getScopeHistory, getScopeHistoryDetails, getScopeIndex } from 'actions';
import { Scope, ScopeHistory } from 'models/scope';

export const useScopes = (q: string) => {
    const dispatch = useDispatch();
    const { scopes } = useSelector(({ scopeReducer }) => scopeReducer);

    useEffect(() => {
        dispatch(getScopeIndex(q));
    }, [dispatch, q]);

    return {
        scopes,
    };
}

export const useScope = (scopeUuid: string) => {
    const dispatch = useDispatch();
    const { scope, fetchingScope, errorFindingScope, scopeHistory }: { scope: Scope; fetchingScope: boolean; errorFindingScope?: string; scopeHistory?: ScopeHistory[] } = useSelector(({ scopeReducer }) => scopeReducer);

    useEffect(() => {
        dispatch(getScope(scopeUuid));
        dispatch(getScopeHistory(scopeUuid));
    }, [dispatch, scopeUuid]);

    return {
        scope,
        fetchingScope,
        errorFindingScope,
        scopeHistory
    };
}

export const useScopeHistory = (uuid: string) => {
    const dispatch = useDispatch();
    const { scopeHistoryDetails, errorFindingScopeHistory, scopeHistoryLoading }: { scopeHistoryDetails: Map<string, ScopeHistory>; errorFindingScopeHistory: boolean; scopeHistoryLoading: boolean } = useSelector(({ scopeReducer }) => scopeReducer);

    useEffect(() => {
        dispatch(getScopeHistoryDetails(uuid));
    }, [dispatch, uuid]);

    return {
        scopeHistoryDetails: scopeHistoryDetails.get(uuid),
        scopeHistoryLoading,
        errorFindingScopeHistory,
    };
}