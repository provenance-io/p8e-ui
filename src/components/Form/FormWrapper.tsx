import { Color } from 'Constant';
import styled from 'styled-components';

type FormWrapperProps = {
    children: React.ReactNode;
}

export const FormWrapper = styled.div<FormWrapperProps>`
    > h1 {
        color: ${Color.PRIMARY_FONT};
        font-size: 22px;
        margin-bottom: 33px;
    }

    > h5,
    form > h5 {
        color: ${Color.PRIMARY_FONT};
        border-bottom: 1px solid ${Color.LIGHT_GREY};
        padding-bottom: 7px;
        margin-bottom: 17px;
    }

    form > h6 {
        color: ${Color.PRIMARY_FONT};
        padding-bottom: 7px;
        margin-bottom: 17px;
    }

    > button {
        text-align: right;
    }
`;