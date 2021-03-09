import React, { FunctionComponent } from 'react';
import { ChartWrapper } from './ChartWrapper';
import { BarChart, Bar, XAxis, YAxis, LabelList, Label } from 'recharts';
import { DashboardPayload } from 'hooks';
import { ChartColors } from 'Constant/colors';
import { useChartSettings } from './ChartHooks/settings-hooks';

type ContractStatesProps = {
    data: DashboardPayload['envelopeStatuses'];
}

export const ContractStates: FunctionComponent<ContractStatesProps> = ({ data }) => {
    const { textColor, animationDuration, animationActive } = useChartSettings();

    return <ChartWrapper label="Contract State Distribution">
        <BarChart data={data} margin={{ bottom: 30 }}>
        <XAxis tick={false} />
        <YAxis width={40}>
            <Label value="%" position="insideLeft" fill={textColor} />
        </YAxis>
        <Bar animationDuration={animationDuration} isAnimationActive={animationActive} dataKey="value" fill={ChartColors[0]}>
            <LabelList dataKey="status" position="insideBottom" fill={textColor} offset={-30} angle={-45} />
        </Bar>
        </BarChart>
    </ChartWrapper>
}
