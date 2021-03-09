import { Color } from "Constant";
import styled from 'styled-components';

export const LinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: ${Color.BLUE};
  text-transform: uppercase;
  font-size: 12px;
`;

LinkButton.defaultProps = {
  type: 'button',
  disabled: false,
};