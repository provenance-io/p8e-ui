import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Modal } from 'components/Modal';
import { ContractKey } from 'models/keys';
import { H3, H4, H5 } from 'components/Text';
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

    return <Modal header={`Signing/Encryption Key Pairs${contractKey.alias ? ` for ${contractKey.alias}` : ''}`} closable={closeable} onClose={onClose}>
        <p>Below are the newly generated Signing/Encryption key pairs.</p>
        <p><b>Please save these to a secure location, as this is the only time you will be able to view the private keys.</b></p>

        <CardHeader>Signing Key</CardHeader>
        <Card>
            <HorizontalTable>
                <HorizontalTableRow>
                    <H5>Public:</H5>
                    <p>{contractKey.signingKey.hexPublicKey}</p>
                </HorizontalTableRow>
                <HorizontalTableRow>
                    <H5>Private:</H5>
                    <p>{contractKey.signingKey.hexPrivateKey}</p>
                </HorizontalTableRow>
            </HorizontalTable>
        </Card>

        <CardHeader>Encryption Key</CardHeader>
        <Card>
            <HorizontalTable>
                <HorizontalTableRow>
                    <H5>Public:</H5>
                    <p>{contractKey.encryptionKey.hexPublicKey}</p>
                </HorizontalTableRow>
                <HorizontalTableRow>
                    <H5>Private:</H5>
                    <p>{contractKey.encryptionKey.hexPrivateKey}</p>
                </HorizontalTableRow>
            </HorizontalTable>
        </Card>

        <ButtonGroup>
            <Button secondary={!closeable} onClick={closeable ? onClose : acknowledge}>{closeable ? 'Close' : 'Acknowledge'}</Button>
        </ButtonGroup>
    </Modal>
}