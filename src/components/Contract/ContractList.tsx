import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { SearchBar } from 'components/Form';
import { Contract } from 'models/contract';
import { getContractTimeSeries } from 'helpers/contract';
import { Table, TableRow, TD } from 'components/Table';
import { H2 } from 'components/Text';
import { Navbar } from 'components/Navbar';
import { Dropdown } from 'components/Dropdown';
import styled from 'styled-components';
import { Color } from 'Constant';

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
  searchColumn?: string;
  searchColumnChanged: (column: string) => void;
  contracts: Contract[];
  type: string;
  typeChanged: (type: string) => void;
}

const SearchToggle = styled.span`
  padding: 10px 30px 10px 10px;
  border-radius: 4px;
  font-size: 1.4rem;
  line-height: 2.2rem;
  border: 1px solid ${Color.LIGHT_GREY};
  display: inline-block;
  position: relative;

  &:hover {
    border-color: ${Color.BLUE};
    background-color: ${Color.WHITE};
  }
  
  &:after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    vertical-align: text-bottom;
    border-top: 7.5px solid ${Color.GREY};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`

const Equals = styled.div`
  margin: 0 5px;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 2.2rem;
`

const SearchableColumns = [
  { key: 'scope_uuid', display: 'Scope Uuid' },
  { key: 'execution_uuid', display: 'Execution Uuid' },
  { key: 'group_uuid', display: 'Group Uuid' },
  { key: 'uuid', display: 'Envelope Uuid' },
]

const SearchColumnDisplay = SearchableColumns.reduce((acc, column) => acc.set(column.key, column.display), new Map<string, string>())

const ContractList: FunctionComponent<ContractListProps> = ({ contracts, searchColumn = '', searchColumnChanged, searchTerm = '', searchChanged, type, typeChanged }) => {
  return (
    <>
      <Navbar title={<H2>Contracts</H2>}>
        <SearchWrapper>
          <Dropdown toggle={<SearchToggle>{SearchColumnDisplay.get(searchColumn)}</SearchToggle>} menuList={SearchableColumns.map(column => 
            <span key={column.key} onClick={() => searchColumnChanged(column.key)}>{column.display}</span>
          )}></Dropdown>
          <Equals>=</Equals>
          <SearchBar searchTerm={searchTerm} searchChanged={searchChanged} />
        </SearchWrapper>
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
