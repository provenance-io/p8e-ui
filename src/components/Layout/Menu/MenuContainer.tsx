import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from 'actions/identity-actions';
import { Menu, MenuLink, MenuLinkText, MenuListItem } from './index';
import { Location } from 'history';

type MenuContainerProps = {
  location: Location;
}

const MenuContainer = ({ location }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu>
      <ul>
        <MenuLink pathname="/" location={location} text="Dashboard" />
        <MenuLink pathname="/contracts" location={location} text="Contracts" />
        <MenuLink pathname="/scopes" location={location} text="Scopes" />
        <MenuLink pathname="/key-management" location={location} text="Key Management" />
        <MenuListItem>
          <MenuLinkText onClick={handleLogout}>Logout</MenuLinkText>
        </MenuListItem>
      </ul>
    </Menu>
  );
};

export default withRouter(MenuContainer);
