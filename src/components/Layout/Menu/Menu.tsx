import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { SECONDARY_BACKGROUND, SECONDARY_FONT } from 'Constant/colors';
import { PublicKeySelectorContainer } from 'components/PublicKeys';
import { Sprite } from 'components/Sprite';

const MenuWrapper = styled.div`
  background-color: ${SECONDARY_BACKGROUND};
  color: ${SECONDARY_FONT};
`

const MenuBar = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 15px 40px;
  max-width: 1700px;
  margin: 0 auto;
`

const Logo = styled(Sprite).attrs({ size: '32px', icon: Sprite.Icon.LOGO })``;

const RightSide = styled.div`
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 20px;
  }
`

const MenuLinks = styled.div`
  margin-left: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: right;

    li {
      display: inline-block;
    }
  }
`;

type MenuProps = {
}

const Menu: FunctionComponent<MenuProps> = ({ children }) => {
  return <MenuWrapper>
    <MenuBar>
      <Logo />
      <MenuLinks>
        {children}
      </MenuLinks>
      <RightSide>
        <PublicKeySelectorContainer />
      </RightSide>
    </MenuBar>
  </MenuWrapper>
};

export default Menu;
