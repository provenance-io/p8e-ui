import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { CARD_BORDER, PRIMARY_CARD_BACKGROUND, SECONDARY_CARD_BACKGROUND } from 'Constant/colors';
import { H3 } from 'components/Text';

type CardProps = {
    bgColor?: string;
    secondary?: boolean;
    marginBottom?: string;
}

export const Card = styled.div<CardProps>`
    background-color: ${({ bgColor, secondary }) => (bgColor || (secondary ? SECONDARY_CARD_BACKGROUND : PRIMARY_CARD_BACKGROUND))};
    border: ${CARD_BORDER};
    padding: 20px;

    &:not(:last-child) {
        margin-bottom: ${({ marginBottom }) => marginBottom};
    }
`

Card.defaultProps = {
    className: 'card',
    marginBottom: '20px',
}

const CardHeaderWrapper = styled(Card).attrs({ marginBottom: '1px' })`
    border-bottom: 0;
    h3 {
        margin: 0;
    }
`

export const CardHeader: FunctionComponent = ({ children }) => {
    return <CardHeaderWrapper>
        <H3>{children}</H3>
    </CardHeaderWrapper>
}