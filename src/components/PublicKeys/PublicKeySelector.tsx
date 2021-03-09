import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ContractKey } from 'models/keys';
import { truncate } from 'helpers/string';
import { SECONDARY_FONT, PRIMARY_BACKGROUND, PRIMARY_FONT } from 'Constant/colors';
import { Color } from 'Constant';
import { Dropdown } from 'components/Dropdown';

const Toggle = styled.span`
    display: inline-block;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${SECONDARY_FONT};
    font-weight: bold;

    &:hover {
        background: ${PRIMARY_BACKGROUND};
        color: ${PRIMARY_FONT};
    }
`

interface PublicKeySelectorProps {
    publicKeys: ContractKey[];
    currentPublicKey?: ContractKey;
    setCurrentPublicKey: (key?: ContractKey) => void;
    menuStyle?: React.StyleHTMLAttributes<any>;
}

export const PublicKeySelector: FunctionComponent<PublicKeySelectorProps> = ({ publicKeys, currentPublicKey, setCurrentPublicKey, menuStyle, ...rest }) => {
    return publicKeys?.length > 1 ? <Dropdown
        menuStyle={{ right: 0, overflowY: 'scroll', maxHeight: '200px', ...menuStyle }}
        menuList={[undefined, ...publicKeys].map((key, index) => (
        <div style={{ color: key?.signingKey.hexPublicKey === currentPublicKey?.signingKey.hexPublicKey ? Color.LIGHT_GREY : Color.BLACK }} key={index} onClick={() => setCurrentPublicKey(key)}>
            {key?.alias || key?.signingKey.hexPublicKey || 'Any'}
        </div>
        ))}
        toggle={<Toggle>Choose Public Key {currentPublicKey && `(${truncate(currentPublicKey.alias || currentPublicKey.signingKey.hexPublicKey, 20)})`}</Toggle>}
        {...rest}
    /> : <></>
}