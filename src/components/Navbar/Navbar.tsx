import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type NavbarProps = {
    title: React.ReactNode;
}

export const Navbar: FunctionComponent<NavbarProps> = ({ title, children }) => <Element>
    {title}
    {children}
</Element>

const Element = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  > header:first-child {
    display: flex;
    align-items: baseline;
    > * {
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  > h4,
  > h6 {
    margin: 0;
  }
`;