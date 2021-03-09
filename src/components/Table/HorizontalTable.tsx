import React, { FunctionComponent, CSSProperties } from 'react';
import styled from 'styled-components';

type HorizontalTableProps = {
    className?: string;
    style?: CSSProperties
}

export const HorizontalTable: FunctionComponent<HorizontalTableProps> = props => <Element {...props} />

const Element = styled.div.attrs(({ className }) => ({
    className: className || 'horizontal-table'
}))`
    display: table;
    border-collapse: collapse;
`;