import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { MenuLinkText, MenuListItem } from './index';
import { Location } from 'history';

type MenuLinkProps = {
  pathname?: string;
  location: Location;
  text?: string;
}

const MenuLink: FunctionComponent<MenuLinkProps> = ({ pathname = '', location, text = '' }) => {
  const active = pathname === '/' ? location.pathname === pathname : location.pathname.indexOf(pathname) === 0;

  return (
    <MenuListItem active={active}>
      <Link to={pathname}>
        <MenuLinkText active={active}>{text}</MenuLinkText>
      </Link>
    </MenuListItem>
  );
};

export default MenuLink;
