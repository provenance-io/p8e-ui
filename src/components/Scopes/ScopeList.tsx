import React, { FunctionComponent } from 'react';
import { Scope } from 'models/scope';
import { SearchBar } from 'components/Form';
import { Table, TableRow, TD } from 'components/Table';
import { Sprite } from 'components/Sprite';
import { H2 } from 'components/Text';
import { Navbar } from 'components/Navbar';

type ScopeListParams = {
    searchTerm?: string;
    searchChanged: (term?: string) => void;
    scopes: Scope[];
}

export const ScopeList: FunctionComponent<ScopeListParams> = ({scopes, searchTerm, searchChanged}) => {
    return <>
        <Navbar title={<H2>Scopes</H2>}>
            <SearchBar searchTerm={searchTerm} searchChanged={searchChanged} />
        </Navbar>

        <Table headers={[
            { key: 'scope_uuid', value: 'Scope Uuid' },
            { key: 'lastExecutionUuid', value: 'Last Execution Uuid' },
            { key: '', value: '' },
        ]}>
            {scopes.map(scope =>
                <TableRow key={scope.scopeUuid} to={`/scopes/${scope.scopeUuid}`}>
                    <TD>{scope.scopeUuid}</TD>
                    <TD>{scope.lastExecutionUuid}</TD>
                    <TD><Sprite size="20px" icon={Sprite.Icon.BACK_ARROW} flipX={true} alt="View Scope" /></TD>
                </TableRow>
            )}
        </Table>
    </>;
}