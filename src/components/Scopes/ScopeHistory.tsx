import { ScopeHistory as ScopeHistoryModel } from 'models/scope';
import React, { FunctionComponent } from 'react';
import { formatDatetime } from 'helpers/general';
import { ColorLink } from 'components/Link';
import { LinkableObject } from 'hooks';
import { Card } from 'components/Card';
import { ScopeRecordGroups } from './ScopeRecordGroups';
import { H5 } from 'components/Text';
import { Breadcrumb } from 'components/Breadcrumb';
import { Navbar } from 'components/Navbar';
import { HorizontalTable, HorizontalTableRow } from 'components/Table';

type ScopeHistoryProps = {
    scopeHistoryDetails: ScopeHistoryModel;
    object: any;
    fetchObject: (object: LinkableObject) => any;
    clearObject: () => any;
}

export const ScopeHistory: FunctionComponent<ScopeHistoryProps> = ({ scopeHistoryDetails, object, fetchObject, clearObject }) => {
    const publicKey = scopeHistoryDetails.publicKey;

    return <>
        <Navbar title={<Breadcrumb to={`/scopes/${scopeHistoryDetails?.scopeUuid}`} name="Scope History" />} />

        <Card>
            <HorizontalTable>
                <HorizontalTableRow>
                    <H5>Scope UUID</H5>
                    <p><ColorLink to={`/scopes/${scopeHistoryDetails?.scopeUuid}`}>{scopeHistoryDetails.scopeUuid}</ColorLink></p>
                </HorizontalTableRow>

                <HorizontalTableRow>
                    <H5>Timestamp</H5>
                    <p>{formatDatetime(scopeHistoryDetails.created)}</p>
                </HorizontalTableRow>
            </HorizontalTable>
        </Card>

        <ScopeRecordGroups recordGroups={scopeHistoryDetails.data.recordGroup} publicKey={publicKey} object={object} fetchObject={fetchObject} clearObject={clearObject} />
    </>
}