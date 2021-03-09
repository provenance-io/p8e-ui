import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import MenuContainer from './Menu/MenuContainer';
import Wrapper from './Wrapper';

const MainWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

type MainProps = {
  padding?: string;
}

const Main = styled.div<MainProps>`
  flex-grow: 1;
  display: flex;
  max-width: 1600px;
  flex-direction: column;
  padding: ${({ padding }) => padding};
`;

Main.defaultProps = {
  padding: `27px 39px 82px`
}

type PageLayoutProps = {
  padding?: string;
  isAuthenticated?: boolean;
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children, padding, isAuthenticated = true }) => (
  <Wrapper>
    {isAuthenticated && <MenuContainer />}
    <MainWrapper>
      <Main padding={padding}>{children}</Main>
    </MainWrapper>
  </Wrapper>
);

export default PageLayout;
