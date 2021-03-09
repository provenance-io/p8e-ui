import React, { FunctionComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Label } from 'recharts';
import { getChartColor, getTimeSeriesLabels } from 'helpers/contract';
import { ChartWrapper } from './ChartWrapper';
import { CustomTooltip } from './CustomTooltip';
import { Cursor } from './Cursor';
import { useZoom } from './ChartHooks/zoom-hook';
import { DashboardPayload } from 'hooks';
import { useChartSettings } from './ChartHooks/settings-hooks';

type ContractTimeProps = {
    data: DashboardPayload['contractTimeSeries'];
    navigateToContract: ({ id: string }) => any;
}

export const ContractTime: FunctionComponent<ContractTimeProps> = ({ data, navigateToContract }) => {
    const { animationDuration, animationActive, textColor } = useChartSettings();

    const sections = getTimeSeriesLabels('invoker');

    const getYValue = (element) => sections.reduce((acc, label) => acc + element[label], 0);
    const { chartProps, xAxisProps, yAxisProps, refAreaProps, wrapperProps } = useZoom(data, getYValue, 'activeLabel');

    return <ChartWrapper label="Contract Time Breakdown" {...wrapperProps}>
        <BarChart data={data} {...chartProps}>
        <XAxis {...xAxisProps} />
        <YAxis width={40} {...yAxisProps}>
          <Label value="seconds" position="insideLeft" angle={-90} fill={textColor} />
        </YAxis>
        {sections.map((label, index) => <Bar
            isAnimationActive={animationActive}
            animationDuration={animationDuration}
            key={label}
            stackId="a"
            dataKey={label}
            fill={getChartColor(index)}
            onClick={navigateToContract}
        />)}
        <Tooltip cursor={<Cursor onClick={navigateToContract} />} filterNull={false} content={TimeTooltip} />
        <Legend verticalAlign="bottom" />
        <ReferenceArea {...refAreaProps} />
        </BarChart>
    </ChartWrapper>
}

const TimeTooltip = ({ payload }) => {
    const total = payload ? payload.reduce((acc, { value }) => acc + value, 0) : null;
  
    return (
      <CustomTooltip>
        <p>Total: {total === null ? 'invalid' : `${total.toFixed(2)}s`}</p>
        {payload && payload.map(({ name, value }, index) => (
          <p key={index}>
            {name}: {value === null ? 'invalid' : `${value}s`}
          </p>
        ))}
      </CustomTooltip>
    );
  };