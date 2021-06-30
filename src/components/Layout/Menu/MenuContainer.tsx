import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, MenuLink } from './index';
import { Location } from 'history';

type MenuContainerProps = {
  location: Location;
}

const MenuContainer = ({ location }) => {
  return (
    <Menu>
      <ul>
        <MenuLink pathname="/" location={location} text="Dashboard" />
        <MenuLink pathname="/contracts" location={location} text="Contracts" />
        <MenuLink pathname="/scopes" location={location} text="Scopes" />
        <MenuLink pathname="/key-management" location={location} text="Key Management" />
      </ul>
    </Menu>
  );
};

export default withRouter(MenuContainer);
