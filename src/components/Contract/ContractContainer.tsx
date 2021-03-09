import React, { FunctionComponent } from 'react';
import PageLayout from 'components/Layout/PageLayout';
import { withRouter } from 'react-router-dom';
import { useContract, useObject } from 'hooks';
import Contract from './Contract';
import { Loader } from 'components/Loader/Loader';
import { Callout } from 'components/ErrorCards';

type ContractContainerProps = {
  match: { params: { uuid: string } };
}

const ContractContainer: FunctionComponent<ContractContainerProps> = ({ match: { params: { uuid: contractUuid }} }) => {
  const { contract, fetchingContract, errorFindingContract } = useContract(contractUuid);
  const { object, fetchingObject, fetchObject, clearObject } = useObject();

  return (
    <PageLayout>
      {!fetchingContract && (errorFindingContract ? <Callout>{errorFindingContract}</Callout> : <Contract contract={contract} object={object} fetchObject={fetchObject} clearObject={clearObject} />)}
      <Loader isLoading={fetchingObject} />
    </PageLayout>
  );
};

export default withRouter(ContractContainer);
