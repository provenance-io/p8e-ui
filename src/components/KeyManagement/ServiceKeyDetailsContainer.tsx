import React, { FunctionComponent } from 'react';
import { useServiceKeyDetails } from 'hooks/key-hooks';
import { ServiceKeyDetails } from './ServiceKeyDetails';
import { Callout } from 'components/ErrorCards';


interface ServiceKeyDetailsContainerProps {
    publicKey: string;
}

export const ServiceKeyDetailsContainer: FunctionComponent<ServiceKeyDetailsContainerProps> = ({ publicKey }) => {
    const { serviceKey, updateKey } = useServiceKeyDetails(publicKey);

    if (!serviceKey) {
        return <Callout>Error fetching service key</Callout>
    }

    return <ServiceKeyDetails serviceKey={serviceKey} updateKey={updateKey} />
}