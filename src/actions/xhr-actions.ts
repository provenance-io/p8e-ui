import _axios, { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'react';
import { createAction } from 'redux-actions';

export const isProd = window.location.hostname.replace(/^www\./i, '') === process.env.REACT_APP_PROD_HOSTNAME;

export const axios = _axios.create({
  baseURL: window.location.origin,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setBaseUrl = value => (axios.defaults.baseURL = value);
export const setTimeout = value => (axios.defaults.timeout = value);

export enum XhrStatus {
    REQUEST = 'REQUEST',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export function errorHandling(error) {
  if (error.response) {
    return error.response.data;
  }
  if (error.request) {
    // TODO: handle request error
    console.error(`Unexpected request error ${error.request}`, error); // eslint-disable-line no-console
  } else {
    console.error(`Something happened setting up the request ${error.message}`, error); // eslint-disable-line no-console
  }
  return null;
}

export const ajaxGet = async (action: string, dispatch: Dispatch<any>, url: string, config?: AxiosRequestConfig, meta?: any) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const result = await axios.get(url, config);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...meta }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`, null, () => ({ ...meta }))(errorHandling(error)));

    return Promise.reject(error.response);
  }
};

export const ajaxPost = async (action: string, dispatch: Dispatch<any>, url: string, data: any, config?: AxiosRequestConfig) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const result = await axios.post(url, data, config);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...data }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`)(errorHandling(error)));

    return Promise.reject(error.response);
  }
};

export const ajaxPut = async (action: string, dispatch: Dispatch<any>, url: string, data: any, config?: AxiosRequestConfig) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const result = await axios.put(url, data, config);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...data }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`)(errorHandling(error)));

    return Promise.reject(error.response);
  }
};

export const ajaxPatch = async (action: string, dispatch: Dispatch<any>, url: string, data: any, config?: AxiosRequestConfig) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const result = await axios.patch(url, data, config);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...data }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`)(errorHandling(error)));

    return Promise.reject(error.response);
  }
};

export const ajaxDelete = async (action: string, dispatch: Dispatch<any>, url: string, config?: AxiosRequestConfig, meta?: any) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const result = await axios.delete(url, config);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...meta }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`)(errorHandling(error)));

    return Promise.reject(error.response);
  }
};

export const formPost = async (action: string, dispatch: Dispatch<any>, url: string, formData: any, config?: AxiosRequestConfig, meta?: any) => {
  dispatch(createAction(`${action}_${XhrStatus.REQUEST}`)());

  try {
    const options = { headers: { 'Content-Type': 'multipart/form-data' }, ...config };
    const result = await axios.post(url, formData, options);

    dispatch(createAction(`${action}_${XhrStatus.SUCCESS}`, null, () => ({ ...meta }))(result.data));

    return Promise.resolve(result.data);
  } catch (error) {
    dispatch(createAction(`${action}_${XhrStatus.FAILURE}`)(errorHandling(error)));

    return Promise.reject(error.response);
  }
};