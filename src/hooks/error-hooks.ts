import { useSelector, useDispatch } from 'react-redux';
import { removeError } from 'actions/error-actions';

export const useErrors = () => {
    const { errors } = useSelector(({errorReducer}) => errorReducer);
    const dispatch = useDispatch();

    const clearError = (id: number) => dispatch(removeError(id));

    return {
        errors,
        clearError
    }
}