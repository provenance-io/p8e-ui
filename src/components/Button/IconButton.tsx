import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color } from 'Constant';
import { Sprite } from 'components/Sprite';
import { Button } from './Button';

const ButtonContainer = styled(Button)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

interface IconButtonProps {
    icon: string;
    size?: string;
}

export const IconButton: FunctionComponent<IconButtonProps & { [label: string]: any }> = ({ icon, size = '30px', children, theme, ...rest }) => {
    const color = rest.secondary ? undefined : Color.WHITE;

    return (
        <ButtonContainer {...rest}>
            <Sprite icon={icon} color={color} size={size} style={{ marginRight: '10px' }} alt={icon} />
            {children}
        </ButtonContainer>
    );
}