import { ajaxGet } from "./xhr-actions";
import { P8E_URL } from "Constant/http";
import { handleAndThrow } from 'helpers/general';
import store from 'store';
import { addError } from './error-actions';

const BASE_OBJECT_URL = `${P8E_URL}/object`;

export const GET_OBJECT_DETAILS = 'OBJECT_DETAILS::GET';

export const getObject = (hash: string, className: string, contractSpecHash: string, publicKey: string) => async dispatch => {
    const cachedObject = store.getState().objectReducer.objects.get(publicKey)?.get(hash);
    if (cachedObject) {
        return Promise.resolve(cachedObject);
    }

    return ajaxGet(GET_OBJECT_DETAILS, dispatch, BASE_OBJECT_URL, {
        params: {
            hash,
            className,
            contractSpecHash,
            publicKey
        }
    }, { hash, publicKey }).catch(handleAndThrow(() => dispatch(addError("Unable to fetch object"))))
}