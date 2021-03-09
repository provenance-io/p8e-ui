import { FlexContainer } from 'components/Layout/Flex';
import { Sprite } from 'components/Sprite';
import { Color, Icon } from 'Constant';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type CalloutTypes = 'error' | 'success' | 'warning';
  
type CalloutProps = {
    type?: CalloutTypes;
    color?: string;
    icon?: string;
    /** Size of the icon */
    size?: string;
    /** Width of the callout */
    width?: string;
}

const CalloutWrapper = styled(FlexContainer)<CalloutProps>`
    width: ${({ width }) => width};
    padding: 10px 20px;
    color: ${({ color }) => color};
    background-color: ${({ color }) => Color.opacity(.15)(color as string)}; /* hex color with alpha of 10% */
    margin-bottom: 10px;
`;

CalloutWrapper.defaultProps = {
    alignItems: 'center',
}

const Content = styled.p`
    margin: 0 0 0 5px;
`;

const getColorAndIcon = (type: CalloutTypes): [string, string] => {
    switch (type) {
        case 'success':
            return [Color.LIGHT_GREEN, Icon.SUCCESS];
        case 'warning':
            return [Color.ORANGE, Icon.PENDING];
        case 'error':
        default:
            return [Color.RED, Icon.HELP];
    }
}

export const Callout: FunctionComponent<CalloutProps> = ({ type = 'error', children, color, icon, size = '16px', width = '100%' }) => {
    const [defaultColor, defaultIcon] = getColorAndIcon(type);
    
    return (
        <CalloutWrapper width={width} color={color || defaultColor}>
            <Sprite alt="error" color={color || defaultColor} icon={icon || defaultIcon} size={size} />
            <Content>{children}</Content>
        </CalloutWrapper>
    );
};