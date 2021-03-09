import React, { FunctionComponent } from 'react';
import { Scope as ScopeModel, ScopeHistory } from 'models/scope';
import { formatDatetime } from 'helpers/general';
import { LinkableObject } from 'hooks';
import { Table, TableRow, TD } from 'components/Table';
import { ScopeRecordGroups } from './ScopeRecordGroups';
import { H2 } from 'components/Text';
import { Breadcrumb } from 'components/Breadcrumb';
import { Navbar } from 'components/Navbar';

type ScopeProps = {
    scope: ScopeModel;
    scopeHistory?: ScopeHistory[];
    object: any;
    fetchObject: (object: LinkableObject) => any;
    clearObject: () => any;
}

export const Scope: FunctionComponent<ScopeProps> = ({ scope, scopeHistory, object, fetchObject, clearObject }) => {
    return <>
        <Navbar title={<Breadcrumb to="/scopes" name="Scope" />} />

        <ScopeRecordGroups recordGroups={scope.data?.recordGroup} publicKey={scope.publicKey} object={object} fetchObject={fetchObject} clearObject={clearObject} />

        {scopeHistory && <>
            <H2>Scope History</H2>

            <Table headers={[
                { key: 'uuid', value: 'Uuid' },
                { key: 'date', value: 'Date' },
            ]}>
                {scopeHistory.map(history => <TableRow key={`history-${history.uuid}`} to={`/scopes/${scope.scopeUuid}/history/${history.uuid}`}>
                    <TD>{history.uuid}</TD>
                    <TD>{formatDatetime(history.created)}</TD>
                </TableRow>)}
            </Table>
        </>}
    </>
}