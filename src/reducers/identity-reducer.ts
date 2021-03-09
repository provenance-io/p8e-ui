import { handleActions } from "redux-actions"
import { LOGOUT, LOGIN } from "actions/identity-actions";
import { setupJwtInterceptor } from "interceptors";

export const jwtStorageKey = 'jwt';

const initialState = (() => {
    const storedJwt = window.localStorage.getItem(jwtStorageKey);
    setupJwtInterceptor(storedJwt || '');

    return {
        jwt: storedJwt || '',
    };
})();

const identityReducer = handleActions({
    [LOGOUT]: (state, action) => {
        window.localStorage.setItem(jwtStorageKey, '');
        setupJwtInterceptor();

        return {
            ...state,
            jwt: ''
        }
    },
    [LOGIN]: (state, { payload: jwt }) => {
        window.localStorage.setItem(jwtStorageKey, jwt);
        setupJwtInterceptor(jwt);

        return {
            ...state,
            jwt
        }
    }
}, initialState);

export default identityReducer;