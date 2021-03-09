import React, { FunctionComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Label, Dot, Tooltip, ReferenceArea } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { ChartColors } from 'Constant/colors';
import { CustomTooltip } from './CustomTooltip';
import { useZoom } from './ChartHooks/zoom-hook';
import { DashboardPayload } from 'hooks';
import { useChartSettings } from './ChartHooks/settings-hooks';

type CompleteContractExecutionTimeProps = {
    data: DashboardPayload['completeContractExecutionTime'];
    navigateToContract: ({ id: string }) => any;
}

export const CompleteContractExecutionTime: FunctionComponent<CompleteContractExecutionTimeProps> = ({ data, navigateToContract }) => {
    const { textColor, animationDuration, animationActive } = useChartSettings();
    const { chartProps, xAxisProps, yAxisProps, refAreaProps, wrapperProps } = useZoom(data, 'value', 'xValue');

    return <ChartWrapper label="Complete Contract Execution Time" {...wrapperProps}>
    <ScatterChart data={data} {...chartProps}>
      <XAxis {...xAxisProps} />
      <YAxis width={40} {...yAxisProps} >
        <Label value="seconds" position="insideLeft" angle={-90} fill={textColor} />
      </YAxis>
      <Scatter
        isAnimationActive={animationActive}
        animationDuration={animationDuration}
        shape={props => <Dot r={2} {...props} />}
        dataKey="value"
        fill={ChartColors[0]}
        line={{ stroke: textColor, strokeWidth: 1 }}
        lineType="fitting"
        onClick={navigateToContract}
      />
      <Tooltip content={({ payload }) => <CustomTooltip>{payload[0]?.value}s</CustomTooltip>} />
      <ReferenceArea {...refAreaProps} />
    </ScatterChart>
  </ChartWrapper>;
}