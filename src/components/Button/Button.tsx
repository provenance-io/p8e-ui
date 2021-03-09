import { Color, Width } from "Constant";
import { MouseEventHandler } from "react";
import styled from 'styled-components';
import * as Font from 'Constant/font';
import theme from 'styled-theming';

const secondaryColor = theme('mode', {
    dark: Color.WHITE,
    light: Color.BLUE,
});

type ButtonProps = {
    disabled?: boolean;
    fullWidth?: boolean;
    noMinWidth?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    secondary?: boolean;
    type?: string;
    uppercase?: boolean;
}

export const Button = styled.button.attrs<ButtonProps>(({ type, disabled }) => ({ type, disabled }))<ButtonProps>`
  min-width: ${({ noMinWidth }) => (noMinWidth ? 'auto' : '186px')};
  padding: 10px 40px;
  width: 100%;
  border: 1px solid ${Color.BLUE};
  border-radius: 100px;
  color: ${({ secondary }) => (secondary ? secondaryColor : Color.WHITE)};
  font-family: ${Font.PRIMARY_FONT};
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  background-color: ${({ secondary }) => (secondary ? 'transparent' : Color.BLUE)};
  cursor: pointer;
  outline: none;
  &:focus {
    border: 2px solid ${Color.WHITE};
    background-color: ${({ secondary }) => !secondary && Color.LIGHT_BLUE};
  }
  &:disabled,
  *[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:active {
    background-color: ${({ secondary }) => !secondary && Color.STEEL};
    border: ${({ secondary }) => secondary && `1px solid ${Color.WHITE}`};
  }
  @media print, screen and (min-width: ${Width.SM}px) {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  }
`;

Button.defaultProps = {
  disabled: false,
  fullWidth: false,
  noMinWidth: false,
  secondary: false,
  type: 'button',
  uppercase: false,
};