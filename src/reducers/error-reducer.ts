import { handleActions } from 'redux-actions';
import { GENERAL_ERROR, REMOVE_ERROR } from 'actions/error-actions';

const initialState = {
    errors: [],
    errorCount: 0,
};

const errorReducer = handleActions({
    [GENERAL_ERROR]: (state, { payload: error}) => ({
        ...state,
        errorCount: state.errorCount + 1,
        errors: [...state.errors, {...error, id: state.errorCount}]
    }),
    [REMOVE_ERROR]: (state, { payload: { id }}) => ({
        ...state,
        errors: state.errors.filter(error => error.id !== id),
    })
}, initialState);

export default errorReducer;