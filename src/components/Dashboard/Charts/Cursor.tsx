import React from 'react';

type CustomCursorProps = {
    onClick: (context: {id: string}) => any;
} & Record<string, any>

export const Cursor = ({payload, x, y, width, height, fill, onClick}: CustomCursorProps) => {
    return <>{payload && payload.length > 0 && <rect fill={fill} x={x} y={y} width={width} height={height} onClick={onClick.bind(null, payload[0]?.payload)} opacity={.3} />}</>;
}