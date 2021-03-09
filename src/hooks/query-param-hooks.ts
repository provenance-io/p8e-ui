import { useLocation, useHistory } from 'react-router-dom';
import { parseParams, encodeParams } from 'helpers/params';
import { useCallback, useMemo } from 'react';

export const useQueryParams = () => {
    const location = useLocation();
    const history = useHistory();
    const params = useMemo(() => parseParams(location.search), [location.search]);

    const setParam = useCallback((param: string, value?: string) => {
        const newParams = Object.entries({...params, [param]: value}).reduce((acc, [key, value]) => {
            if (value) {
                acc[key] = value
            }
            return acc;
        }, {})
        const search = encodeParams(newParams);

        history.replace({ search })
    }, [history, params]);

    return {
        params,
        setParam
    };
}