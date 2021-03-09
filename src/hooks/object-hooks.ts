import { getObject } from 'actions';
import { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export type LinkableObject = {
    hash: string;
    className: string;
    contractSpecHash: string;
    publicKey: string;
}

export const useObject = () => {
    const dispatch = useDispatch();
    const { objects, fetchingObject } = useSelector(({ objectReducer }) => objectReducer);
    const [currentObject, setCurrentObject] = useState<any | undefined>(undefined);

    const object = useMemo(() => {
        return currentObject ? objects.get(currentObject.publicKey)?.get(currentObject.hash) : undefined;
    }, [objects, currentObject]);

    const fetchObject = useCallback((o: LinkableObject) => {
        dispatch(getObject(o.hash, o.className, o.contractSpecHash, o.publicKey));
        setCurrentObject(o);
    }, [dispatch]);

    const clearObject = useCallback(() => {
        setCurrentObject(undefined);
    }, []);

    return {
        object,
        fetchingObject,
        fetchObject,
        clearObject
    }
}