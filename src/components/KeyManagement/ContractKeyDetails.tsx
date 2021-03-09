import React, { FunctionComponent, useState } from 'react';
import { ContractKey, ServiceKey, KeyShare } from 'models/keys';
import { KeyCard } from './KeyManager';
import { AddKeyShareModalContainer } from './AddKeyShareModal';
import { Settings } from 'Constant';
import { Card, CardHeader } from 'components/Card';
import { Table, TableRow, TD } from 'components/Table';
import { Sprite } from 'components/Sprite';
import { H4 } from 'components/Text';
import { Button, LinkButton, ButtonGroup } from 'components/Button';
import { Breadcrumb } from 'components/Breadcrumb';
import { Navbar } from 'components/Navbar';

interface ContractKeyDetailsProps {
    contractKey: ContractKey;
    serviceKeys: ServiceKey[];
    linkServiceKey: (serviceKey: ServiceKey) => Promise<any>;
    unlinkServiceKey: (serviceKey: ServiceKey) => Promise<any>;
    updateKey: (alias: string) => Promise<any>;
    keyShares: KeyShare[];
    addShare: (publicKey: string) => any;
    removeShare: (publicKey: string) => any;
}

export const ContractKeyDetails: FunctionComponent<ContractKeyDetailsProps> = ({ contractKey, serviceKeys, updateKey, linkServiceKey, unlinkServiceKey, keyShares, addShare, removeShare }) => {
    const linkedServiceKeysMap = new Map(contractKey.serviceKeys?.map(key => [key.publicKey.hexPublicKey, key]));
    const [processing, setProcessing] = useState(false);
    const [addingKeyShare, setAddingKeyShare] = useState(false);
    const handleAddKey = (publicKey: string) => addShare(publicKey).then(() => {
        setAddingKeyShare(false);
    });

    return <>
        <Navbar title={<Breadcrumb to="/key-management" name="Contract Key" />} />

        <KeyCard keyType="CONTRACT" contractOrServiceKey={contractKey} updateKey={(_, __, alias) => updateKey(alias)} disableNavigation/>

        {Settings.serviceKey && <Card>
            <H4>Associated Service Account Keys</H4>

            <Table headers={[
                { key: 'alias', value: 'Alias' },
                { key: 'publicKey', value: 'Public Key' },
                { key: 'linkUnlink', value: 'Link/Unlink' },
            ]}>
                {serviceKeys.map(sk => {
                    const isLinked = linkedServiceKeysMap.has(sk.publicKey.hexPublicKey);
                    const handleClick = () => {
                        setProcessing(true);
                        (isLinked ? unlinkServiceKey : linkServiceKey)(sk).finally(() => {
                            setProcessing(false);
                        })
                    };
                    return <tr key={sk.publicKey.hexPublicKey} >
                        <td style={{ minWidth: '100px', paddingRight: '10px' }}>{sk.alias}</td>
                        <td style={{ wordWrap: 'break-word' }}>{sk.publicKey.hexPublicKey}</td>
                        <td style={{ textAlign: 'right', paddingLeft: '10px' }}>
                            <Button onClick={handleClick} disabled={processing} secondary={isLinked}>
                                {isLinked ? 'Unlink' : 'Link'}
                            </Button>
                        </td>
                    </tr>
                })}
            </Table>
        </Card>}

        <CardHeader>Object Sharing</CardHeader>
        <Card>
            {keyShares.length > 0 && <Table headers={[
                { key: 'publicKey', value: 'Public Key' },
                { key: 'remove', value: 'Remove' },
            ]}>
                {keyShares.map(share => <TableRow key={`${share.affiliatePublicKey}_${share.publicKey}`} >
                    <TD >{share.publicKey}</TD>
                    <TD>
                        <LinkButton onClick={() => removeShare(share.publicKey)}>
                            <Sprite size="30px" icon={Sprite.Icon.CLOSE_SQUARE} alt="Remove Public Key From Object Sharing" />
                        </LinkButton>
                    </TD>
                </TableRow>)}
            </Table>}
            <ButtonGroup style={{ marginTop: '10px' }}>
                <Button onClick={() => setAddingKeyShare(true)}>Add new share</Button>
            </ButtonGroup>
            <AddKeyShareModalContainer addKeyShare={handleAddKey} isOpen={addingKeyShare} onClose={() => setAddingKeyShare(false)} />
        </Card>
    </>;
}