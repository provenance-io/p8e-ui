import PageLayout from 'components/Layout/PageLayout';
import { useQueryParams, useScopes } from 'hooks';
import React, { useState } from 'react';
import { ScopeList } from './ScopeList';

export const ScopeListContainer = () => {
    const { params, setParam } = useQueryParams();
    const [searchTerm, setSearchTerm] = useState(params.q);
    const { scopes } = useScopes(searchTerm);

    const searchChanged = (term) => {
        setSearchTerm(term);
        setParam('q', term);
    }

    return <PageLayout>
        <ScopeList scopes={scopes} searchChanged={searchChanged} searchTerm={searchTerm} />
    </PageLayout>
}