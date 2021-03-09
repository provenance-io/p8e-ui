import { Color } from "Constant";
import styled from 'styled-components';
import theme from 'styled-theming';

const activeBorder = theme('mode', {
    dark: Color.BLUE,
    light: Color.DARK_BLUE,
});

const focusBorder = theme('mode', {
    dark: Color.WHITE,
    light: Color.BLACK,
});

type FunctionComponentProps = {
    errorText?: string;
}

export const Input = styled.input.attrs<FunctionComponentProps>(({ errorText }) => ({
    'data-error': errorText && errorText.length > 0,
  }))<FunctionComponentProps>`
    padding: 10px;
    width: 100%;
    border: ${({ errorText }) => (errorText ? Color.RED : Color.LIGHT_GREY)} 1px solid;
    border-radius: 4px;
    outline: none;
    caret-color: ${Color.STEEL}; /* IE/Edge doesn't honor this but uses the inverse of the background color */
    color: ${Color.STEEL};
    font-size: 1.4rem;
    line-height: 2.2rem;
    background-color: ${Color.WHITE};
    appearance: none;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'initial')};

    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder {
      color: ${Color.LIGHT_GREY};
    }

    &:hover,
    &:active {
      border-color: ${activeBorder};
    }

    &:focus {
      border-color: ${focusBorder};
    }
  `;