import store from 'store';
import { jwtStorageKey } from 'reducers/identity-reducer';
import { logout, login } from 'actions/identity-actions';
import { axios } from 'actions';

const storeJwt = (): string | null => store.getState()?.identityReducer?.jwt;

const getInterceptor = (jwt?: string) => config => {
    config = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${jwt}`
        }
    }

    return config;
};

let interceptor;
export const setupJwtInterceptor = (jwt: string = '') => {
    if (interceptor !== undefined) {
        axios.interceptors.request.eject(interceptor);
    }

    interceptor = axios.interceptors.request.use(getInterceptor(jwt));
}

axios.interceptors.response.use(response => {
    if (response?.headers?.authorization) {
        store.dispatch(login(response.headers.authorization))
    }
    return response;
})

window.addEventListener('storage', (e) => {
    if (!e.key || e.key === jwtStorageKey) {
        const exitingJwt = storeJwt();
        const newJwt = window.localStorage.getItem(jwtStorageKey);

        if (exitingJwt && !newJwt) {
            store.dispatch(logout());
        } else if (newJwt && exitingJwt !== newJwt) {
            store.dispatch(login(newJwt));
        }
    }
})