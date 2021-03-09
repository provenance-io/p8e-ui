import React, { FunctionComponent } from 'react';
import { ServiceKey } from 'models/keys';
import { KeyCard } from './KeyManager';
import { Card } from 'components/Card';
import { Breadcrumb } from 'components/Breadcrumb';
import { Navbar } from 'components/Navbar';

interface ServiceKeyDetailsProps {
    serviceKey: ServiceKey;
    updateKey: (alias: string) => Promise<any>;
}

export const ServiceKeyDetails: FunctionComponent<ServiceKeyDetailsProps> = ({ serviceKey, updateKey }) => {
    return <>
        <Navbar title={<Breadcrumb to="/key-management" name="Contract Key" />} />

        <Card>
            <KeyCard keyType="SERVICE" contractOrServiceKey={serviceKey} updateKey={(_, __, alias) => updateKey(alias)} disableNavigation/>
        </Card>
    </>;
}