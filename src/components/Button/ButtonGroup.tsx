import { Width } from 'Constant';
import styled from 'styled-components';

export const ButtonGroup = styled.div`
    text-align: right;
    
    .error {
        display: inline-block;
        margin-right: 15px;
    }
    
    button + button,
    a + button,
    button + a,
    a + a {
        margin-top: 10px;
    }
    
    @media print, screen and (min-width: ${Width.SM}px) {
        button + button,
        a + button,
        button + a,
        a + a {
            margin-top: 0;
            margin-left: 20px;
        }
    }
`;