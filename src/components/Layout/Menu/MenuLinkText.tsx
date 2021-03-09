import styled from 'styled-components';
import { ACTIVE_LINK_COLOR, LINK_COLOR } from 'Constant/colors';

type MenuLinkTextProps = {
  active?: boolean;
}

export default styled.h4<MenuLinkTextProps>`
  color: ${({ active }) => (active ? ACTIVE_LINK_COLOR : LINK_COLOR)};
  text-decoration: none;
  cursor: pointer;
  margin: 0 0 3px 0;
`;
