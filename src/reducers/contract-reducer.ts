import { handleActions } from 'redux-actions';
import { GET_CONTRACT_INDEX, GET_CONTRACT_DETAILS } from 'actions/contract-actions';
import { XhrStatus } from 'actions';

const initialState = {
  fetchingContracts: false,
  contracts: [],
  contract: {},
  fetchingContract: false,
  errorFindingContract: null,
};

const contractReducer = handleActions(
  {
    [`${GET_CONTRACT_INDEX}_${XhrStatus.REQUEST}`]: (state, { payload: contracts }) => ({
      ...state,
      fetchingContracts: true,
    }),
    [`${GET_CONTRACT_INDEX}_${XhrStatus.SUCCESS}`]: (state, { payload: contracts }) => ({
      ...state,
      contracts,
      fetchingContracts: false,
    }),
    [`${GET_CONTRACT_INDEX}_${XhrStatus.FAILURE}`]: (state, { payload: contracts }) => ({
      ...state,
      fetchingContracts: false,
    }),
    [`${GET_CONTRACT_DETAILS}_${XhrStatus.REQUEST}`]: state => ({
      ...state,
      fetchingContract: true,
    }),
    [`${GET_CONTRACT_DETAILS}_${XhrStatus.SUCCESS}`]: (state, { payload: contract }) => ({
      ...state,
      contract,
      fetchingContract: false,
      errorFindingContract: null,
    }),
    [`${GET_CONTRACT_DETAILS}_${XhrStatus.FAILURE}`]: (state, action) => ({
      ...state,
      fetchingContract: false,
      errorFindingContract: 'Error finding contract',
    }),
  },
  initialState
);

export default contractReducer;
