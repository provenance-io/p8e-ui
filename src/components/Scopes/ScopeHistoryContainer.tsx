import PageLayout from 'components/Layout/PageLayout';
import { useObject, useScopeHistory } from 'hooks';
import React, { FunctionComponent } from 'react';
import { ScopeHistory } from './ScopeHistory';
import { withRouter } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { Callout } from 'components/ErrorCards';

type ScopeHistoryContainerProps = {

}

export const ScopeHistoryContainer: FunctionComponent<ScopeHistoryContainerProps> = withRouter(({ match: { params: { uuid } } }) => {
    const { scopeHistoryDetails, errorFindingScopeHistory, scopeHistoryLoading } = useScopeHistory(uuid);
    const { object, fetchingObject, fetchObject, clearObject } = useObject();

    return <PageLayout>
        {!scopeHistoryLoading && (errorFindingScopeHistory ? <Callout>{errorFindingScopeHistory}</Callout> : scopeHistoryDetails && <ScopeHistory scopeHistoryDetails={scopeHistoryDetails} object={object} fetchObject={fetchObject} clearObject={clearObject} />)}
        <Loader isLoading={fetchingObject} />
    </PageLayout>
})