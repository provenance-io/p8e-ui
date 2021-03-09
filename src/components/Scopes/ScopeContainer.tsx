import React from 'react';
import { withRouter } from 'react-router-dom';
import PageLayout from 'components/Layout/PageLayout';
import { Scope } from './Scope';
import { useScope, useObject } from 'hooks';
import { Loader } from 'components/Loader/Loader';
import { Callout } from 'components/ErrorCards';

export const ScopeContainer = withRouter(({ match: { params: { scopeUuid } } }) => {
    const { scope, fetchingScope, errorFindingScope, scopeHistory } = useScope(scopeUuid);
    const { object, fetchingObject, fetchObject, clearObject } = useObject();

    return <PageLayout>
        {!fetchingScope && (errorFindingScope ? <Callout>{errorFindingScope}</Callout> : <Scope scope={scope} scopeHistory={scopeHistory} object={object} fetchObject={fetchObject} clearObject={clearObject} />)}
        <Loader isLoading={fetchingObject} />
    </PageLayout>
})