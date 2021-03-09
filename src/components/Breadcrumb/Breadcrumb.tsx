import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Sprite } from 'components/Sprite';

const Header = styled.h2`
    display: flex;
    align-items: center;

    > a {
        height: 34px;
        padding-right: 10px;
    }
`;

type BreadcrumbProps = {
    to: string;
    name: string;
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({ to, name, ...otherProps }) => <Header {...otherProps}>
    {to.includes('http') && to.includes('://') ? (
    <a href={to}>
        <BackBtn />
    </a>
    ) : (
    <Link to={to}>
        <BackBtn />
    </Link>
    )}{' '}
    {name}
</Header>

const BackBtn = () => <Sprite icon={Sprite.Icon.BOXED_ARROW} width="34px" />