import React, { useState } from 'react';
import PageLayout from 'components/Layout/PageLayout';
import { useContractIndex, useQueryParams } from 'hooks';
import { IndeterminateProgressBar } from 'components/ProgressBar';
import ContractList from './ContractList';

const ContractListContainer = () => {
  const { params, setParam } = useQueryParams();
  const [column, uuid] = params.q?.split(',') || ['scope_uuid', ''];
  const [searchColumn, setSearchColumn] = useState(column);
  const [searchTerm, setSearchTerm] = useState(uuid);
  const [type, setType] = useState(params.type || 'invoker');
  const { contracts, fetchingContracts } = useContractIndex(searchTerm?.trim().length > 0 ? `${searchColumn},${searchTerm}` : '', type);

  const setQ = (column, uuid) => setParam('q', `${column},${uuid}`);

  const searchColumnChanged = column => {
    setSearchColumn(column);
    setQ(column, searchTerm);
  };

  const searchChanged = term => {
    setSearchTerm(term);
    setQ(searchColumn, term)
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
        searchColumn={searchColumn}
        searchColumnChanged={searchColumnChanged}
        type={type}
        typeChanged={typeChanged}
      />
      {fetchingContracts && <IndeterminateProgressBar fixed={true} />}
    </PageLayout>
  );
};

export default ContractListContainer;
