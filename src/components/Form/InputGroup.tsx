import { HTMLProps } from 'react';
import styled from 'styled-components';

type InputGroupProps = {
    /** Overrides the default margin */
    margin?: string;
    disabled?: boolean;
} & HTMLProps<HTMLDivElement>

export const InputGroup = styled.div<InputGroupProps>`
  margin: ${({ margin }) => (margin ? margin : '20px 0')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

InputGroup.defaultProps = {
  className: 'input-group',
};