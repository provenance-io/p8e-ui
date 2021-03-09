import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { SearchBar } from 'components/Form';
import { Contract } from 'models/contract';
import { getContractTimeSeries } from 'helpers/contract';
import { Table, TableRow, TD } from 'components/Table';
import { H2 } from 'components/Text';
import { Navbar } from 'components/Navbar';

const contractTimeFormatter = (diffS: number) => {
  const duration = moment.duration(diffS, 's');
  const [hours, minutes, seconds] = [duration.hours(), duration.minutes(), duration.seconds()];

  return `${hours}h ${minutes}m ${seconds}s`;
};

const ElapsedContractTimes = ({ contract }: { contract: Contract }) => {
  const timeSeries = getContractTimeSeries(contract);
  const total = timeSeries.reduce((acc, timing) => isNaN(timing.value) ? acc : acc + timing.value, 0)

  return (<>
    {/* {timeSeries.map((timing, index) => <td key={index}>
      {isNaN(timing.value) ? '--' : contractTimeFormatter(timing.value)}
    </td>)} */}
    {contractTimeFormatter(total)}
  </>)
  ;
};

interface TypeSelectorProps {
  type: string;
  typeChanged: (type: string) => void;
  style?: any;
}

// const TypeSelector: FunctionComponent<TypeSelectorProps> = ({ type, typeChanged, style }) => (
//   <Dropdown
//     style={style}
//     menuList={['Invoker', 'Fragment'].map(type => <div onClick={() => typeChanged(type.toLowerCase())} key={type}>{type}</div>)}
//     toggle={<span>Type: {type}</span>} 
//   />
// );

interface ContractListProps {
  searchTerm?: string;
  searchChanged: (term?: string) => void;
  contracts: Contract[];
  type: string;
  typeChanged: (type: string) => void;
}

const ContractList: FunctionComponent<ContractListProps> = ({ contracts, searchTerm = '', searchChanged, type, typeChanged }) => {
  return (
    <>
      <Navbar title={<H2>Contracts</H2>}>
        <SearchBar searchTerm={searchTerm} searchChanged={searchChanged} />
      </Navbar>

      <Table headers={[
        { key: 'contractType', value: 'Type' },
        { key: 'status', value: 'Status' },
        { key: 'scope_uuid', value: 'Scope Uuid' },
        { key: 'totalTime', value: 'Total Time'}
      ]}>
        {contracts.map((contract) => (
          <TableRow to={`/contracts/${contract.id}`} key={contract.executionId}>
            <TD>{contract.contractName || contract.data?.result?.contract?.spec?.name}</TD>
            <TD>{contract.status}</TD>
            <TD to={`/scopes/${contract.scopeUuid}`}>{contract.scopeUuid}</TD>
            <ElapsedContractTimes contract={contract} />
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default ContractList;
