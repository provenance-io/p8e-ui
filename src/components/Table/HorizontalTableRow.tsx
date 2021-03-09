import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type HorizontalTableRowProps = {
    className?: string;
}

export const HorizontalTableRow: FunctionComponent<HorizontalTableRowProps> = props => <Element {...props} />

const Element = styled.div.attrs(({ className }) => ({
    className: className || 'horizontal-table-row',
}))`
    display: table-row;
    width: 100%;

    > * {
      display: table-cell;
      padding: 7.5px 25px 7.5px 0;
    }

    > p {
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      text-transform: uppercase;
      word-break: break-all;
    }
`;