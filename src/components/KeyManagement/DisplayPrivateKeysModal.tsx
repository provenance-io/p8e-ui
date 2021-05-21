import React, { FunctionComponent, useCallback, useState } from 'react';
import { Modal } from 'components/Modal';
import { ContractKey } from 'models/keys';
import { H5 } from 'components/Text';
import { HorizontalTable, HorizontalTableRow } from 'components/Table';
import { Card, CardHeader } from 'components/Card';
import { Button, ButtonGroup } from 'components/Button';

type DisplayPrivateKeysModalProps = {
    contractKey: ContractKey;
    onClose: () => any;
}

export const DisplayPrivateKeysModal: FunctionComponent<DisplayPrivateKeysModalProps> = ({ contractKey, onClose }) => {
    const [closeable, setCloseable] = useState(false);
    const acknowledge = useCallback(() => {
        setCloseable(true);
    }, []);

    return <Modal header={`Auth Key Pair${contractKey.alias ? ` for ${contractKey.alias}` : ''}`} closable={closeable} onClose={onClose}>
        <p>Below is the newly generated Auth key pair.</p>
        <p><b>Please save these to a secure location, as this is the only time you will be able to view the private key.</b></p>

        <CardHeader>Auth Key</CardHeader>
        <Card>
            <HorizontalTable>
                <HorizontalTableRow>
                    <H5>Public:</H5>
                    <p>{contractKey.authKey.hexPublicKey}</p>
                </HorizontalTableRow>
                <HorizontalTableRow>
                    <H5>Private:</H5>
                    <p>{contractKey.authKey.hexPrivateKey}</p>
                </HorizontalTableRow>
            </HorizontalTable>
        </Card>

        <ButtonGroup>
            <Button secondary={!closeable} onClick={closeable ? onClose : acknowledge}>{closeable ? 'Close' : 'Acknowledge'}</Button>
        </ButtonGroup>
    </Modal>
}