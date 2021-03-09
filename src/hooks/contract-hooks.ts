import { useDispatch, useSelector } from 'react-redux';
import { getContractIndex, getContractDetails } from 'actions';
import { useEffect, useCallback } from 'react';
import { Contract } from 'models/contract';
import { ContractKey } from 'models/keys';

export const useContractIndex = (searchQuery = '', type?: string): { contracts: Contract[], fetchingContracts: boolean, fetchContracts: () => any } => {
  const dispatch = useDispatch();
  const { contracts, fetchingContracts } = useSelector(({ contractReducer }) => contractReducer);
  const { currentPublicKey }: { currentPublicKey: ContractKey } = useSelector(({ keyReducer }) => keyReducer);

  const hexPublicKey = currentPublicKey?.signingKey?.hexPublicKey;

  const fetchContracts = useCallback(() => {
    dispatch(getContractIndex(searchQuery, hexPublicKey, type));
  }, [searchQuery, type, hexPublicKey, dispatch]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return {
    contracts,
    fetchingContracts,
    fetchContracts,
  };
};

export const useContract = (uuid) => {
  const dispatch = useDispatch();
  const { contract, fetchingContract, errorFindingContract }: { contract: Contract; fetchingContract: boolean; errorFindingContract: string } = useSelector(({ contractReducer }) => contractReducer);

  useEffect(() => {
    dispatch(getContractDetails(uuid));
  }, [uuid, dispatch]);

  return {
    contract,
    fetchingContract,
    errorFindingContract,
  };
};
