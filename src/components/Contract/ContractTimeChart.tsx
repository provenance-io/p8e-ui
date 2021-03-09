import React from 'react';
import { withTheme } from 'styled-components';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, Label } from 'recharts';
import { Contract } from 'models/contract';
import { getContractTimeSeries, getChartColor } from 'helpers/contract';
import { Color } from 'Constant';
import { Callout } from 'components/ErrorCards';

interface ContractTimeChartProps {
    contract: Contract
}
  
export const ContractTimeChart = withTheme(({ contract, theme }: ContractTimeChartProps & { theme: any }) => {
    const labelColor = theme.mode === 'dark' ? Color.WHITE : Color.BLACK;
    const timeSeries = getContractTimeSeries(contract);

    if (timeSeries.every(({ value }) => isNaN(value))) {
        return <Callout type="warning">invalid timing</Callout>;
    }

    return (
        <ResponsiveContainer height={120}>
            <BarChart
                layout="vertical"
                margin={{ bottom: 20 }}
                data={[timeSeries.filter(timing => !isNaN(timing.value)).reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {})]}
            >
                <YAxis type="category" hide={true} />
                <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={val => val.toFixed(3)}>
                    <Label value="seconds" fill={labelColor} position="insideBottom" offset={-1} />
                </XAxis>
                {timeSeries.map(({ label }, index) => (
                    <Bar key={`bar-${label}`} dataKey={label} stackId="a" fill={getChartColor(index)} />
                ))}
                <Legend wrapperStyle={{ paddingTop: '5px' }} />
            </BarChart>
        </ResponsiveContainer>
    );
})