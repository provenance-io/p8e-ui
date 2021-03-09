import styled from 'styled-components';
import theme from 'styled-theming';
import { Color } from 'Constant';

const color = theme('mode', {
    dark: Color.WHITE,
    light: Color.DARK_GREY,
});

export const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    color: ${color};

    li {
        font-size: 12px;
    }
`;