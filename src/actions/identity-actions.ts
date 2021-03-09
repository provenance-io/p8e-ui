import { createAction } from "redux-actions";
import { P8E_URL } from "Constant/http";
import { addError } from "./error-actions";
import { ajaxGet } from "./xhr-actions";

const BASE_URL = `${P8E_URL}/external/api/v1/provenance/oauth`;

export const LOGOUT = 'IDENTITY::LOGOUT';
export const OAUTH_LOGIN = 'IDENTITY::OAUTH_LOGIN';
export const OAUTH_TOKEN_EXCHANGE = 'IDENTITY::OAUTH_TOKEN_EXCHANGE';
export const LOGIN = 'IDENTITY::LOGIN';

export const logout = () => async dispatch => dispatch(createAction(LOGOUT)());

export const oauthLogin = (redirectUrl: string) => async dispatch => ajaxGet(OAUTH_LOGIN, dispatch, `${BASE_URL}?redirectUrl=${redirectUrl}`)
    .then(({ url }) => window.location.href = url);

export const oauthTokenExchange = (code, state) => async dispatch => ajaxGet(OAUTH_TOKEN_EXCHANGE, dispatch, `${BASE_URL}/callback`, { params: { code, state } })
    .then(({ access_token, cookie_name }) => dispatch(login(access_token)))
    .catch((err) => {
        err.data.errors.forEach(error => dispatch(addError(error)))
        return Promise.reject(err);
    });

export const login = (jwt: string) => async dispatch => dispatch(createAction(LOGIN)(jwt));