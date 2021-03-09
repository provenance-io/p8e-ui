import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { ContractKey, KeyTypes, ServiceKey } from 'models/keys';
import { Button, IconButton, ButtonGroup } from 'components/Button';
import { H2, H3, H4, H5, Pre } from 'components/Text';
import { SimpleUpdateInput } from 'components/Form';
import { Settings } from 'Constant';
import { Card } from 'components/Card';
import { Sprite } from 'components/Sprite';
import { Navbar } from 'components/Navbar';
import { FlexContainer, FlexItem } from 'components/Layout/Flex';
import { HorizontalTable, HorizontalTableRow } from 'components/Table';

const LinkedWithProvenance = () => (<FlexContainer style={{ display: 'inline-flex' }} alignItems="center">
    <Sprite icon={Sprite.Icon.SUCCESS} size="30px" style={{ marginLeft: '20px', marginRight: '10px' }} alt="Provenance Logo" />
    <FlexItem>Linked with Provenance</FlexItem>
</FlexContainer>)

interface KeyCardProps {
    keyType: KeyTypes;
    contractOrServiceKey: ContractKey | ServiceKey;
    removeKey?: (key: ContractKey | ServiceKey) => void;
    updateKey: (type: KeyTypes, publicKey: string, alias: string) => Promise<any>;
    disableNavigation?: boolean;
}

export const KeyCard: FunctionComponent<KeyCardProps> = ({ keyType, contractOrServiceKey, updateKey, disableNavigation = false }) => {
    // todo: how should we go about getting the provenance key balance?
    const history = useHistory();

    const publicKey = keyType === 'CONTRACT' ? (contractOrServiceKey as ContractKey).signingKey : (contractOrServiceKey as ServiceKey).publicKey;
    const encryptionPublicKey = keyType === 'CONTRACT' ? (contractOrServiceKey as ContractKey).encryptionKey : null;

    const updateAlias = (alias: string) => updateKey(keyType, publicKey.hexPublicKey, alias);

    return <Card>
        <SimpleUpdateInput id={`alias-${publicKey.hexPublicKey}`} value={contractOrServiceKey.alias} onUpdate={updateAlias} placeholder="Enter an alias" />
        <HorizontalTable style={{ marginTop: '10px' }}>
            <HorizontalTableRow>
                <H5>Signing Public Key</H5>
                <p style={{ textTransform: 'none' }}>
                    <FlexContainer>
                        <FlexItem>Hex:&nbsp;</FlexItem>
                        <FlexItem><Pre margin="0" padding="0">{publicKey.hexPublicKey}</Pre></FlexItem>
                    </FlexContainer>
                    <FlexContainer>
                        <FlexItem>Base 64:&nbsp;</FlexItem>
                        <FlexItem><Pre margin="0" padding="0">{publicKey.publicKey}</Pre></FlexItem>
                    </FlexContainer>
                </p>
            </HorizontalTableRow>
            {encryptionPublicKey && <HorizontalTableRow>
                <H5>Encryption Public Key</H5>
                <p style={{ textTransform: 'none' }}>
                    <FlexContainer>
                        <FlexItem>Hex:&nbsp;</FlexItem>
                        <FlexItem><Pre margin="0" padding="0">{encryptionPublicKey.hexPublicKey}</Pre></FlexItem>
                    </FlexContainer>
                    <FlexContainer>
                        <FlexItem>Base 64:&nbsp;</FlexItem>
                        <FlexItem><Pre margin="0" padding="0">{encryptionPublicKey.publicKey}</Pre></FlexItem>
                    </FlexContainer>
                </p>
            </HorizontalTableRow>}
            {keyType === 'CONTRACT' && <HorizontalTableRow>
                <H5>Index Name</H5>
                <p style={{ textTransform: 'none' }}><Pre margin="0" padding="0">{(contractOrServiceKey as ContractKey).indexName}</Pre></p>
            </HorizontalTableRow>}
        </HorizontalTable>
        {/* {keyType === 'SERVICE' && <FlexContainer>
            <FlexItem>Balance:&nbsp;</FlexItem>
            <FlexItem><Pre margin="0" padding="0">{(+(linkedKey?.balance?.amount || 0)).toLocaleString()} {linkedKey?.balance?.denom}</Pre></FlexItem>
        </FlexContainer>} */}
        <ButtonGroup style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!disableNavigation && <Button onClick={() => history.push(`/key-management/${keyType.toLowerCase()}/${publicKey.hexPublicKey}`)}>Manage</Button>}
            <LinkedWithProvenance />
        </ButtonGroup>
    </Card>
}

KeyCard.defaultProps = {
    removeKey: () => {}
}

interface KeyManagerProps {
    serviceAccountKey: ContractKey;
    contractKeys: ContractKey[];
    addKey: (type: KeyTypes) => void;
    removeKey: (key: ContractKey | ServiceKey) => void;
    updateKey: (type: KeyTypes, publicKey: string, alias: string) => Promise<any>;
}

export const KeyManager: FunctionComponent<KeyManagerProps> = ({ serviceAccountKey, contractKeys, addKey, removeKey, updateKey }) => (
    <>
        <Navbar title={<H2>Key Management</H2>} />

        <div>
            {Settings.serviceKey && <Card>
                <H4>Service Account Key</H4>
                {serviceAccountKey && <KeyCard keyType='SERVICE' removeKey={removeKey} contractOrServiceKey={serviceAccountKey} updateKey={updateKey}/> }
            </Card>}
            <H3>Contract Keys</H3>
            {contractKeys.map((key, index) => <KeyCard key={index} keyType='CONTRACT' contractOrServiceKey={key} updateKey={updateKey} />)}
            <ButtonGroup style={{ marginTop: '30px' }}>
                <IconButton icon={Sprite.Icon.EXPAND} size="20px" onClick={() => addKey('CONTRACT')}>Add Key</IconButton>
            </ButtonGroup>
        </div>
    </>
)