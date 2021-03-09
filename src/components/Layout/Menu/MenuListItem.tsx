import styled from 'styled-components';
import { SECONDARY_FONT } from 'Constant/colors';

type MenuListItemProps = {
  active?: boolean;
}

export default styled.li<MenuListItemProps>`
  position: relative;
  border-bottom: 2px solid;
  border-bottom-color: ${({ active }) => active ? SECONDARY_FONT : 'transparent'};
  opacity: ${({ active }) => active ? 1 : 0.9};

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
