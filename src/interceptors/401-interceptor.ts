import store from 'store';
import { logout } from 'actions/identity-actions';
import { addError, ErrorLevels } from 'actions/error-actions';
import debounce from 'lodash.debounce';
import { axios } from 'actions';

const handle401 = debounce(() => {
    store.dispatch(addError('Unauthenticated, please log in again', ErrorLevels.WARNING));
    store.dispatch(logout());
}, 1000)

export const setup401Interceptor = () => {
    axios.interceptors.response.use(response => response,
        error => {
            const response = error.response;
            if (response?.status === 401) {
                handle401();
            }

            throw error;
        })
}