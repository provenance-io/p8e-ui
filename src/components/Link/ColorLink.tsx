import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DARK_BLUE } from 'Constant/colors';

const Element = styled(Link)`
  font-size: 1.2rem;
  color: ${({ color }) => color};
`;

type ColorLinkProps = {
  color?: string;
  to?: string;
}

const ColorLink: FunctionComponent<ColorLinkProps> = ({ color = DARK_BLUE, children, ...props }) => <Element color={color} {...props}>{children}</Element>;

export default ColorLink;
