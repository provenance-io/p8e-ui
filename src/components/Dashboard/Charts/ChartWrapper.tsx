import React from 'react';
import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { PRIMARY_CARD_BACKGROUND } from 'Constant/colors';
import { Sprite } from 'components/Sprite';
import { H4 } from 'components/Text';

const ChartInner = styled.div`
  background-color: ${PRIMARY_CARD_BACKGROUND};
  padding: 0 20px 20px 20px;
  border-radius: 5px;
  overflow: hidden;
  fill: white;
`;

const Chart = styled.div`
  padding: 10px;
  position: relative;
`

const ResetZoomButton = ({ resetZoom }) => <Sprite onClick={resetZoom} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', zIndex: 100 }} size="20px" icon={Sprite.Icon.CLOSE_CIRCLE} alt="Reset Chart Zoom" />

export const ChartWrapper = ({ children, label, isZoomed = false, resetZoom = () => {} }) => (
  <ChartInner>
    <H4>{label}</H4>
    <Chart>
      {isZoomed && <ResetZoomButton resetZoom={resetZoom} />}
      <ResponsiveContainer aspect={2}>
        {children}
      </ResponsiveContainer>
    </Chart>
  </ChartInner>
);