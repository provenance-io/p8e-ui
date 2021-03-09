import { getContractTimeSeries, getTotalElapsedTime } from 'helpers/contract';
import { ENVELOPE_STATUSES } from 'Constant/contract';
import { useContractIndex } from './contract-hooks';
import { useMemo } from 'react';

export type DashboardPayload = ReturnType<typeof useDashboard>;

const addIndex = <T>(elements: T[]) => elements.map((element, index) => ({...element, index: index + 1}))

export const useDashboard = () => {
  let { contracts, fetchingContracts, fetchContracts } = useContractIndex(undefined, 'invoker');
  
  const {
    envelopeStatuses,
    aggregateTimeSeries,
    contractTimeSeries,
    completeContractExecutionTime
  } = useMemo(() => {
    const reversedContracts = [...contracts].reverse();

    const contractsByStatus = reversedContracts.reduce((acc, contract) => ({
      ...acc,
      [contract.status]: (acc[contract.status] || 0) + 1,
    }), ENVELOPE_STATUSES.reduce((acc, status) => ({ ...acc, [status]: 0 }), {}));

    const aggregateTimeSeries = Object.entries(
      reversedContracts.reduce((acc: { [label: string]: number }, contract) => {
        const timeSeries = getContractTimeSeries(contract);
  
        acc = timeSeries.filter(({ value }) => !isNaN(value)).reduce(
          (acc, { label, value }) => ({
            ...acc,
            [label]: (acc[label] || 0) + value,
          }),
          acc
        );
  
        return acc;
      }, {})
    ).map(([label, value]) => ({ label, value }));

    const contractTimeSeries = reversedContracts.reduce((acc: { id: string; [label: string]: any }[], contract) => {
      const timeSeries = getContractTimeSeries(contract);
      acc.push(
        timeSeries.reduce(
          (acc2, { label, value }) => ({
            ...acc2,
            [label]: isNaN(value) ? null : value,
          }),
          { id: contract.id }
        )
      );
      return acc;
    }, []);

    const completeContractExecutionTime = reversedContracts
      .filter(contract => contract.status === 'COMPLETE')
      .map(contract => ({ id: contract.id, value: getTotalElapsedTime(contract) }))
      .filter(({ value }) => !isNaN(value))

    const envelopeStatuses = ENVELOPE_STATUSES.map(status => ({ status, value: (contractsByStatus[status] / contracts.length) * 100 }));

    return {
      envelopeStatuses: addIndex(envelopeStatuses),
      aggregateTimeSeries: addIndex(aggregateTimeSeries),
      contractTimeSeries: addIndex(contractTimeSeries),
      completeContractExecutionTime: addIndex(completeContractExecutionTime),
    }
  }, [contracts]);

  return {
    aggregateTimeSeries,
    contractTimeSeries,
    completeContractExecutionTime,
    envelopeStatuses,
    fetchingContracts,
    fetchContracts,
  };
};
