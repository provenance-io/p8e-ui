import { Color } from 'Constant';
import React, { FunctionComponent, useState } from 'react';
import styled, { keyframes } from 'styled-components'

const ButtonKeyframes = ({ period }) => {
    const finalSweepDuration = .2;
    const finalPercentage = 100 - (finalSweepDuration / period * 100)
    return keyframes`
        0% {
            transform: rotate(-90deg);
            stroke-dashoffset: 25.132;
        }
        ${finalPercentage}% {
            stroke-dashoffset: 0;
            transform: rotate(-90deg);
        }
        100% {
            stroke-dashoffset: 25.132;
            transform: rotate(270deg);
        }
    `;
}

const ButtonWrapper = styled.div`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    svg.circle
    {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        circle {
            transform: rotate(-90deg);
            transform-origin: center;
            stroke-width: 1;
            stroke: ${({color}) => color};
            fill: transparent;
            stroke-dasharray: 25.132;
            /* stroke-dashoffset: 25.132; */
            animation: ${ButtonKeyframes} ${({ period }) => period}s infinite linear;
        }
    }

    svg.play, svg.pause {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 35%;
        height: 35%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        * {
            fill: ${({color}) => color};
        }
    }
`;

const Play = ({ style }) => <svg className="play" style={style} viewBox="0 0 32 32">
    <polygon points="4,0 28,16 4,32"/>
</svg>;

const Pause = ({ style }) => <svg className="pause" style={style} viewBox="0 0 353.562 353.562">
    <path d="M41.064,353.562h109.014V0H41.064V353.562z"/>
    <path d="M203.482,0v353.562h109.017V0H203.482z"/>
</svg>;

const PlayPause = ({ paused, onClick, color }) => <span onClick={onClick}>
    <Play style={{ opacity: paused ? 1 : 0 }}/>
    <Pause style={{ opacity: paused ? 0 : 1 }}/>
</span>

interface PausableTimerProps {
    period: number;
    action: () => any;
    color?: string;
}

export const PausableTimer: FunctionComponent<PausableTimerProps> = ({ period, action, color = Color.BLUE }) => {
    const [paused, setPaused] = useState(false);

    return <ButtonWrapper period={period} color={color} >
        <svg className="circle" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4" style={{ animationPlayState: paused ? 'paused' : 'running' }} onAnimationIteration={() => action()} />
        </svg>
        
        <PlayPause paused={paused} color={color} onClick={() => {
            setPaused(p => !p)
        }} />
    </ButtonWrapper>;
}