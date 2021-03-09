import { Color } from 'Constant';
import React, { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components'

type ProgressBarContainerProps = {
    backgroundColor: string;
    height: number;
}

const ProgressBarContainer = styled.div<ProgressBarContainerProps>`
    position: relative;
    background-color: ${({ backgroundColor }) => backgroundColor};
    height: ${({ height }) => `${height}px`};
`

type ProgressBarProps = {
    color?: string;
    value: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
    position: absolute;
    background-color: ${({ color }) => color};
    top: 0;
    height: 100%;
    transition: width .9s ease-in-out;
`

interface IndeterminateProgressBarProps {
    backgroundColor?: string;
    color?: string;
    height?: number;
    fixed?: boolean
}

const STATES = [
    { left: 'unset', right: 0, width: 0 },
    { left: 0, right: 'unset', width: '100%' },
]

export const IndeterminateProgressBar: FunctionComponent<IndeterminateProgressBarProps> = ({fixed = false, color = Color.LIGHT_BLUE, backgroundColor = Color.MEDIUM_GREY, height = 7}) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        const advance = () => {
            setValue(prev => (prev + 1) % STATES.length)
        }
        advance();
        const handle = setInterval(advance, 1000)
        return () => clearInterval(handle);
    }, []);

    const style: CSSProperties = fixed ? { position: 'fixed', bottom: 0, left: 0, width: '100%' } : {}

    return <ProgressBarContainer style={style} backgroundColor={backgroundColor} height={height}>
        <ProgressBar value={value} color={color} style={STATES[value]} />
    </ProgressBarContainer>
}