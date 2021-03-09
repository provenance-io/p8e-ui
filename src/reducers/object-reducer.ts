import { handleActions } from 'redux-actions';
import { GET_OBJECT_DETAILS, XhrStatus } from "actions";

const initialState = {
    objects: new Map<string, Map<string, any>>(),
    fetchingObject: false,
}

const objectReducer = handleActions({
    [`${GET_OBJECT_DETAILS}_${XhrStatus.REQUEST}`]: state => ({
        ...state,
        fetchingObject: true,
    }),
    [`${GET_OBJECT_DETAILS}_${XhrStatus.SUCCESS}`]: (state, { payload: object, meta: { hash, publicKey } }) => {
        const publicKeyCache = state.objects.get(publicKey) || new Map<string, any>();
        publicKeyCache.set(hash, object);
        state.objects.set(publicKey, publicKeyCache);

        return {
            ...state,
            fetchingObject: false,
            objects: new Map([...state.objects.entries()]),
        };
    },
    [`${GET_OBJECT_DETAILS}_${XhrStatus.FAILURE}`]: state => ({
        ...state,
        fetchingObject: false,
    })
}, initialState);

export default objectReducer;