import React, { FunctionComponent } from 'react';
import { DashboardPayload } from 'hooks';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartWrapper } from './ChartWrapper';
import { getChartColor } from 'helpers/contract';
import { useChartSettings } from './ChartHooks/settings-hooks';

type ContractTimingOverviewProps = {
    data: DashboardPayload['aggregateTimeSeries'];
}

export const ContractTimingOverview: FunctionComponent<ContractTimingOverviewProps> = ({ data }) => {
    const { animationDuration, animationActive } = useChartSettings();

    return <ChartWrapper label="Contract Timing Overview">
        <PieChart>
            <Pie
                isAnimationActive={animationActive}
                animationDuration={animationDuration}
                data={data}
                dataKey="value"
                label={({ label }) => label}
                labelLine
                fontSize={12}
                fontWeight="bold"
            >
                {data.map((timing, index) => (
                    <Cell key={`aggregateTimeSeries-${index}`} fill={getChartColor(index)} />
                ))}
            </Pie>
        </PieChart>
    </ChartWrapper>
}