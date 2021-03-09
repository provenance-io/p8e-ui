import React, { useState } from 'react';
import PageLayout from 'components/Layout/PageLayout';
import { useContractIndex, useQueryParams } from 'hooks';
import { IndeterminateProgressBar } from 'components/ProgressBar';
import ContractList from './ContractList';

const ContractListContainer = () => {
  const { params, setParam } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(params.q);
  const [type, setType] = useState(params.type || 'invoker');
  const { contracts, fetchingContracts } = useContractIndex(searchTerm, type);

  const searchChanged = term => {
    setSearchTerm(term);
    setParam('q', term);
  };

  const typeChanged = type => {
    setType(type);
    setParam('type', type);
  };

  return (
    <PageLayout>
      <ContractList
        contracts={contracts}
        searchTerm={searchTerm}
        searchChanged={searchChanged}
        type={type}
        typeChanged={typeChanged}
      />
      {fetchingContracts && <IndeterminateProgressBar fixed={true} />}
    </PageLayout>
  );
};

export default ContractListContainer;
