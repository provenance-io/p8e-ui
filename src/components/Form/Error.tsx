import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color } from 'Constant';

type ErrorProps = {
    /** Applied to the base element */
    className?: string;
    /** Value for the css display property, applied to the base element */
    display?: string;
    /** Value for the css margin-bottom property */
    marginBottom?: number;
}

const Element = styled.span<ErrorProps>`
    display: ${(props) => props.display};
    margin-top: 10px;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
    color: ${Color.RED};
    font-size: 1.2rem;
    line-height: 1.9rem;
    text-align: left;
`;

Element.defaultProps = {
    className: 'error',
    display: 'block',
    marginBottom: 0,
}

export const Error: FunctionComponent<ErrorProps> = (props) => (props.children ? <Element {...props} /> : null);