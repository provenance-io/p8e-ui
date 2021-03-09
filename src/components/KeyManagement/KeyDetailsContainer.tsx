import React from 'react';
import { withRouter } from 'react-router-dom';
import PageLayout from 'components/Layout/PageLayout';
import { ContractKeyDetailsContainer } from './ContractKeyDetailsContainer';
import { ServiceKeyDetailsContainer } from './ServiceKeyDetailsContainer';

const KeyDetailsContainer = ({ match: { params: { publicKey, keyType } } }) => {
    return <PageLayout>
        {keyType === 'contract' && <ContractKeyDetailsContainer publicKey={publicKey} />}
        {keyType === 'service' && <ServiceKeyDetailsContainer publicKey={publicKey} />}
    </PageLayout>
}

export default withRouter(KeyDetailsContainer);