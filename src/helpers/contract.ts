import moment from 'moment';
import { CHART_COLORS } from 'Constant/contract';
import { Contract } from 'models/contract';

export const diffInSeconds = (a, b) => a && b ? moment.duration(moment(a).diff(moment(b))).asSeconds() : Number.NaN;

interface ContractTimingSpecification {
  name: string;
  type: 'invoker' | 'fragment' | 'both';
  getValue: (contract: Contract) => string | undefined;
}

const CONTRACT_TIMING: ContractTimingSpecification[] = [
  { name: 'Start', type: 'both',  getValue: (contract) => contract.createdTime },
  { name: 'Signed', type: 'invoker',  getValue: (contract) => contract.signedTime },
  { name: 'Chain', type: 'invoker',  getValue: (contract) => contract.chaincodeTime },
  { name: 'Inbox', type: 'fragment',  getValue: (contract) => contract.inboxTime },
  { name: 'Executed', type: 'fragment',  getValue: (contract) => contract.executedTime },
  { name: 'Read', type: 'fragment',  getValue: (contract) => contract.readTime },
  { name: 'Outbound', type: 'fragment',  getValue: (contract) => contract.outboundTime },
  { name: 'Index', type: 'both',  getValue: (contract) => contract.indexTime },
  { name: 'Complete', type: 'both',  getValue: (contract) => contract.completeTime },
];

const includeTiming = (timing: ContractTimingSpecification, type: 'invoker' | 'fragment' | 'both') => timing.type === 'both' || timing.type === type;

const INVOKER_TIMING = CONTRACT_TIMING.filter(timing => includeTiming(timing, 'invoker'));
const FRAGMENT_TIMING = CONTRACT_TIMING.filter(timing => includeTiming(timing, 'fragment'));

export const getTimingForContract = (contract: Contract) => contract.isInvoker ? INVOKER_TIMING : FRAGMENT_TIMING;
export const getTimingForType = (type: 'invoker' | 'fragment' | 'both') => {
  switch (type) {
    case 'invoker': return INVOKER_TIMING;
    case 'fragment': return FRAGMENT_TIMING;
    default: return CONTRACT_TIMING;
  }
};

interface TimeSeriesElement {
  label: string;
  value: number;
}

export const getContractTimeSeries = (contract: Contract): TimeSeriesElement[] => {
  const { values: timeSeries } = getTimingForContract(contract)
    .reduce(
      (acc: any, { name, getValue }, index) => {
        const value = getValue(contract);
        if (index > 0) {
          const [prevName, prevValue] = acc.prev;
          acc.values.push({
            label: `${prevName} to ${name}`,
            value: diffInSeconds(value, prevValue),
          });
        }

        acc.prev = [name, value];
        return acc;
      },
      { prev: undefined, values: [] }
    );

  return timeSeries;
};

export const getTotalElapsedTime = (contract: Contract) => {
  const [startTime, endTime] = getTimingForContract(contract)
    .reduce((acc: any, timing) => {
      const value = timing.getValue(contract);
      if (value) {
        return acc.every(x => x === null) ? [value, value] : [acc[0], value]
      }
      return acc;
    }, [null, null]);

  return startTime === null && endTime === null ? 0 : diffInSeconds(endTime, startTime);
}

export const getTimeSeriesLabels = (type: string): string[] => (type === 'invoker' ? INVOKER_TIMING : FRAGMENT_TIMING)
  .reduce((acc: any, { name }, index) => {
    if (index > 0) {
      acc.values.push(`${acc.prevName} to ${name}`);
    }

    acc.prevName = name;
    return acc;
  }, { prevName: undefined, values: [] }).values;

export const getChartColor = index => CHART_COLORS[index % CHART_COLORS.length];
