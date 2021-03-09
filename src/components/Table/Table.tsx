import React, { FunctionComponent, MouseEventHandler, ReactElement } from 'react';
import styled from 'styled-components';
import { PRIMARY_BACKGROUND, PRIMARY_ROW_BACKGROUND, PRIMARY_TABLE_HEADER, ROW_HOVER_BACKGROUND, SECONDARY_ROW_BACKGROUND, SECONDARY_TABLE_HEADER } from 'Constant/colors';
import { ColorLink } from 'components/Link';

type TableProps = {
    headers: { key: string, value: string }[];
    secondary?: boolean;
}

export const Table: FunctionComponent<TableProps> = ({ headers, secondary = false, children }) => {
    return <TableWrapper secondary={secondary}>
        <TableHeader>
            <tr>
                {headers.map(header => <TH key={header.key}>
                    {header.value}
                </TH>)}
            </tr>
        </TableHeader>
        <TableBody>{children}</TableBody>
    </TableWrapper>
}

type TableWrapperProps = {
    secondary?: boolean;
}

const TableWrapper = styled.table<TableWrapperProps>`
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    font-size: 1.2rem;

    th:last-child, td:last-child {
        text-align: right;
    }

    thead tr {
        background: ${({ secondary }) => secondary ? SECONDARY_TABLE_HEADER : PRIMARY_TABLE_HEADER };
        border-bottom: 1px solid ${PRIMARY_BACKGROUND};
    }
    
    tr {
        background: ${({ secondary }) => secondary ? SECONDARY_ROW_BACKGROUND : PRIMARY_ROW_BACKGROUND }
    }
`

const TableHeader = styled.thead`
    font-weight: bold;
`

const TH = styled.th`
    padding: 20px;
`

const TableBody = styled.tbody`

`

type TableRowWrapperProps = {
    onClick?: MouseEventHandler<HTMLTableRowElement>;
}

const TableRowWrapper = styled.tr<TableRowWrapperProps>`
    display: table-row;
    color: inherit;

    &:not(:last-child) {
        border-bottom: 1px solid ${PRIMARY_BACKGROUND};
    }

    &:hover {
        background: ${ROW_HOVER_BACKGROUND};
        cursor: ${({ onClick }) => onClick ? 'pointer': 'unset'};
    }
`

type TableRowProps = {
    to?: string;
    onClick?: MouseEventHandler<HTMLTableRowElement>;
    children: ReactElement[];
}

export const TableRow: FunctionComponent<TableRowProps> = ({ to, onClick, children }) => {
    return <TableRowWrapper onClick={onClick}>{children instanceof Array ? children.map((child, index) => {
        const RowElement = to ? RowLink : RowButton;

        return <TD key={index}>
            <RowElement to={to} onClick={child.props.onClick} color={child.props.to ? undefined : 'inherit'}>
                {child.props.to ? <ColorLink to={child.props.to}>{child.props.children || child}</ColorLink> : (child.props.children || child)}
            </RowElement>
        </TD>}
    ) : children}</TableRowWrapper>
}

type RowLinkProps = {
    to?: string;
    onClick?: MouseEventHandler;
}

const RowLink = styled(ColorLink)<RowLinkProps>`
    display: block;
    padding: 20px;

    &:hover {
        cursor: ${({ onClick, to }) => onClick || to ? 'pointer' : 'unset'}
    }
`

const RowButton = styled.div<RowLinkProps>`
    display: block;
    padding: 20px;

    &:hover {
        cursor: ${({ onClick, to }) => onClick || to ? 'pointer' : 'unset'}
    }
`

export const TD = styled.td<RowLinkProps>`
    color: inherit;
`