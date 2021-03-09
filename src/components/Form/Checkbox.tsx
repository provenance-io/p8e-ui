import React, { ChangeEventHandler, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import useWhatInput from 'react-use-what-input';
import { BLACK, BLUE, RED, SKY, STEEL, WHITE } from 'Constant/colors';
import { Sprite } from 'components/Sprite';

// const fontColor = theme('mode', {
//   dark: DARKER_GREY,
//   light: MIDNIGHT,
// });

const bgColor = theme('mode', {
  dark: BLACK,
  light: 'transparent',
});

const focusColor = theme('mode', {
  dark: STEEL,
  light: SKY,
});

type CheckProps = {
    checked: boolean;
    errorText: string;
    round: boolean;
}

const Check = styled.span<CheckProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ errorText }) => (errorText ? RED : BLUE)};
  border-radius: ${({ round }) => (round ? '50%' : '2px')};
  background-color: ${bgColor};
  z-index: 0;
  cursor: pointer;
  flex: 0 0 auto;

  &:before {
    content: '';
    text-align: center;
    position: absolute;
    top: -1px;
    right: -1px;
    left: -1px;
    bottom: -1px;
    background-color: ${BLUE};
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    border-radius: ${({ round }) => (round ? '50%' : '2px')};
    z-index: 1;
    line-height: 20px;
  }
`;

type CheckmarkProps = {
    checked: boolean;
}

const CheckmarkBase = styled(Sprite).attrs({ icon: Sprite.Icon.CHECKMARK, color: WHITE })<CheckmarkProps>`
  display: ${({ checked }) => (checked ? 'block' : 'none')};
  z-index: 2;
`;

const Checkmark = styled(CheckmarkBase)`
  margin-top: 3px;
  height: 65%;
  width: 65%;
`;

const CheckmarkRound = styled(CheckmarkBase)`
  width: 10px;
  height: 10px;
  transform: translateY(1px);
`;

const Label = styled.label`
  display: block;
  margin-top: -19px;
  padding-left: 35px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const Element = styled.input`
  position: absolute;
  background-color: initial;
  cursor: pointer;
  opacity: 0;
  outline: none;
  z-index: 1;
  height: 20px;
  width: 20px;

  &:disabled {
    cursor: not-allowed;
  }
`;

type WrapperProps = {
    inline: boolean;
    $isKeyboard: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: max-content;
  position: relative;
  min-height: 20px;
  ${({ inline }) => (inline ? 'display: inline-block;' : 'display: block;')}

  + div {
    margin-left: ${(props) => (props.inline ? 20 : 0)}px;
  }

  & ${Element}:focus + ${Check} {
    ${({ $isKeyboard }) =>
      $isKeyboard &&
      css`
        /* box-shadow is used for a curved focus outline */
        box-shadow: 0 0 0 4px ${focusColor};
        /* Only visible in Windows High Contrast mode */
        outline: 1px solid transparent;
      `};
  }
`;

type CheckboxProps = {
    className?: string;
    id: string;
    inline?: boolean;
    label: string;
    value?: string;
    checked?: boolean;
    onChange: ChangeEventHandler;
    errorText?: string;
    round?: boolean;
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({ className, id, inline = true, label, value, checked = false, onChange, errorText = '', round = false, ...otherProps }) => {
  const currentInput = useWhatInput('input');

  return (
    <Wrapper className={className} inline={inline} $isKeyboard={currentInput === 'keyboard'}>
      <Element type="checkbox" id={id} value={value} checked={checked} onChange={onChange} {...otherProps} />
      <Check checked={checked} errorText={errorText} round={round}>
        {round ? <CheckmarkRound checked={checked} /> : <Checkmark checked={checked} />}
      </Check>
      <Label htmlFor={id}>
        {label}
      </Label>
    </Wrapper>
  );
}