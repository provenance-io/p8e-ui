import React, { ChangeEventHandler, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import useWhatInput from 'react-use-what-input';
import { Color, Width, Icon } from 'Constant';
import { Sprite } from 'components/Sprite';
import { InputGroup } from '../InputGroup';
import { Label } from '../Label';
import { Error } from '../Error';

const backgroundColor = theme('mode', {
  dark: Color.BLACK,
  light: Color.WHITE,
});

const borderColor = theme('mode', {
  dark: Color.LIGHT_GREY,
  light: Color.LIGHT_GREY,
});

const activeBorder = theme('mode', {
  dark: Color.BLUE,
  light: Color.BLUE,
});

const errorBorderColor = theme('mode', {
  dark: Color.RED,
  light: Color.RED,
});

const caretColor = theme('mode', {
  dark: Color.WHITE,
  light: Color.GREY,
});

const focusColor = theme('mode', {
  dark: Color.STEEL,
  light: Color.SKY,
});

const placeholderColor = theme('mode', {
  dark: Color.LIGHT_GREY,
  light: Color.LIGHT_GREY,
});

const arrowDownBackground = theme('mode', {
  dark: Color.GREY,
  light: Color.WHITE,
});

const arrowColor = theme('mode', {
  dark: Color.WHITE,
  light: Color.BLACK,
});

type ElementProps = {
    errorText?: string;
    $isKeyboard?: boolean;
    thin?: boolean;
}

const Element = styled.select.attrs<ElementProps>(({ errorText }) => ({
  'data-error': errorText && errorText.length > 0,
}))<ElementProps>`
  position: relative;
  padding: 10px 20px;
  height: 44px;
  width: 100%;
  border: ${({ errorText }) => (errorText ? errorBorderColor : borderColor)} 1px solid;
  border-radius: 4px;
  caret-color: ${caretColor}; /* IE/Edge doesn't honor this but uses the inverse of the background color */
  color: ${caretColor};
  font-size: 1.4rem;
  line-height: 1.6;
  background: ${(props) => backgroundColor(props)};
  appearance: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'initial')};
  outline: none;

  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: ${placeholderColor};
  }

  &:hover:not([disabled]) {
    border-color: ${activeBorder};
  }

  &:focus {
    ${({ $isKeyboard }) =>
      $isKeyboard &&
      css`
        border-color: ${activeBorder};
        box-shadow: 0px 0px 0px 6px ${focusColor};
        /* Only visible in Windows High Contrast mode */
        outline: 1px solid transparent;
      `};
  }

  @media (min-width: ${Width.SM}px) {
    padding: ${({ thin }) => thin && '5px 10px'};
    height: ${({ thin }) => thin && '34px'};
  }
`;

type ArrowDownProps = {
    thin?: boolean;
}

const ArrowDownContainer = styled.div<ArrowDownProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1px;
  bottom: 1px;
  height: 42px;
  width: 42px;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background: ${(props) => arrowDownBackground(props)};
  pointer-events: none;
  color: ${arrowColor};

  @media (min-width: ${Width.SM}px) {
    width: ${({ thin }) => thin && '34px'};
    height: ${({ thin }) => thin && '32px'};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
`;

type SelectProps = {
    /** The className */
    className?: string;
    /** How many columns to span  */
    colSpan?: number;
    /** Whether or not the input is disabled */
    disabled?: boolean;
    /** The id for the input */
    id: string;
    /** The label for the input */
    label: string;
    /** Value that controls the input */
    value: string;
    /** Used for validation */
    errorText?: string;
    /** Function used to update the value prop */
    onChange: ChangeEventHandler<HTMLSelectElement>;
    /** Thin is used for smaller height selects in tighter designs */
    thin?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({ className, colSpan, disabled, id, label, value, errorText, onChange, children, thin, ...rest }) => {
  const currentInput = useWhatInput('input');

  const inputProps = {
    ...rest,
    disabled,
    id,
    value,
    onChange,
    errorText,
    thin,
    $isKeyboard: currentInput === 'keyboard',
  };

  return (
    <InputGroup className={className} colSpan={colSpan} disabled={disabled}>
      <Label htmlFor={id}>{label}</Label>
      <SelectWrapper>
        <Element {...inputProps}>{children}</Element>
        <ArrowDownContainer thin={thin}>
          <Sprite icon={Icon.CARET} color="currentColor" size="9px" />
        </ArrowDownContainer>
      </SelectWrapper>
      <Error>{errorText}</Error>
    </InputGroup>
  );
};

Select.defaultProps = {
    className: '',
    colSpan: 1,
    disabled: false,
    errorText: '',
    thin: false,
};

export default Select;