import React, { FunctionComponent } from 'react';
import styled, { withTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DashboardPayload } from 'hooks';
import { PausableTimer } from 'components/PausableTimer';
import { CompleteContractExecutionTime } from './Charts/CompleteContractExecutionTime';
import { ContractTime } from './Charts/ContractTime';
import { ContractStates } from './Charts/ContractStates';
import { ContractTimingOverview } from './Charts/ContractTimingOverview';

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 20px;
`;

const ChartControls = styled.div`
  position: fixed;
  right: 25px;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


type DashboardProps = DashboardPayload & {
  theme: any;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ aggregateTimeSeries, contractTimeSeries, completeContractExecutionTime, envelopeStatuses, fetchContracts }) => {
  const history = useHistory();
  const navigateToContract = ({ id }) => history.push(`/contracts/${id}`);

  return (
    <>
      <ChartContainer>
        <ContractStates data={envelopeStatuses} />
        <CompleteContractExecutionTime data={completeContractExecutionTime} navigateToContract={navigateToContract} />
        <ContractTimingOverview data={aggregateTimeSeries} />
        <ContractTime data={contractTimeSeries} navigateToContract={navigateToContract} />
      </ChartContainer>
      <ChartControls>
        <PausableTimer period={30} action={() => fetchContracts()} />
      </ChartControls>
    </>
  );
};

export default withTheme(Dashboard);
