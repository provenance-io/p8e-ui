import { createAction } from 'redux-actions';

export const GENERAL_ERROR = 'ERROR::GENERAL';
export const REMOVE_ERROR = 'ERROR::REMOVE';

export enum ErrorLevels {
    ERROR,
    WARNING
}

export const addError = (message: string, level: ErrorLevels = ErrorLevels.ERROR) => async dispatch => dispatch(createAction(GENERAL_ERROR)({ message, level }));
export const removeError = (id: number) => async dispatch => dispatch(createAction(REMOVE_ERROR)({ id }));