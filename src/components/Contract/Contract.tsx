import React, { Fragment, FunctionComponent, useState } from 'react';
import { getTotalElapsedTime } from 'helpers/contract';
import { Condition, Contract as ContractModel, InputElement, ProposedFact, ResultConsideration, ResultEnum } from 'models/contract';
import { ContractTimeChart } from './ContractTimeChart';
import { ColorLink } from 'components/Link';
import { Pre, H2, H4, H5 } from 'components/Text';
import { formatDatetime } from 'helpers/general';
import { Card, CardHeader } from 'components/Card';
import { HorizontalTable, HorizontalTableRow, Table, TableRow, TD } from 'components/Table';
import { ObjectModal } from 'components/Object';
import { LinkableObject } from 'hooks';
import { Callout } from 'components/ErrorCards';
import { SearchBar } from 'components/Form';
import { Grid } from 'components/Layout/Grid';
import { Breadcrumb } from 'components/Breadcrumb';
import { Navbar } from 'components/Navbar';
import { FlexContainer, FlexItem } from 'components/Layout/Flex';

interface ContractProps {
  contract: ContractModel;
  object: any;
  fetchObject: (object: LinkableObject) => any;
  clearObject: () => any;
}

const Contract: FunctionComponent<ContractProps> = ({ contract, object, fetchObject, clearObject }) => {
  const totalTimeS = getTotalElapsedTime(contract);
  const contractSpecHash = contract?.data?.result?.contract?.spec?.dataLocation?.ref?.hash;

  const [searchTerm, setSearchTerm] = useState('');
  const searchChanged = (term: string) => {
    setSearchTerm(term.trim().toLowerCase());
  }

  const match = (value?: string) => value?.toLowerCase().includes(searchTerm)
  const conditionFilter = (condition: Condition) => match(condition.conditionName) || match(condition.result.result)
  const inputFilter = (input: InputElement) => match(input.name)
  const considerationFilter = (consideration: ResultConsideration) => match(consideration.considerationName) || consideration.inputs?.some(input => match(input.name)) || match(consideration.result.output?.name);

  const filteredConditions = contract?.data?.result?.contract?.conditions?.filter(conditionFilter);
  const filteredInputs = contract?.data?.result?.contract?.inputs?.filter(inputFilter);
  const filteredConsiderations = contract?.data?.result?.contract?.considerations?.filter(considerationFilter);

  const [objectMeta, setObjectMeta] = useState<{ title: string; subtitle?: string }>({ title: '' });

  const linkFromProposedFact = (fact: ProposedFact, title: string, subtitle?: string) => () => {
    fetchObject({
      hash: fact.hash,
      className: fact.classname,
      contractSpecHash,
      publicKey: contract.publicKey
    });
    setObjectMeta({ title, subtitle });
  }

  const linkFromInputElement = (input: InputElement, title, subtitle?: string) => () => {
    fetchObject({
      hash: input.dataLocation.ref.hash,
      className: input.dataLocation.classname,
      contractSpecHash,
      publicKey: contract.publicKey
    });
    setObjectMeta({ title, subtitle });
  }

  return (
    <>
      <Navbar title={<Breadcrumb to="/contracts" name="Contract" />} />

      <Grid>
          <Card>
            <H4>Overview</H4>

            <HorizontalTable>
              <HorizontalTableRow>
                <H5>Name</H5>
                <p style={{textTransform: 'none'}}>{contract.data?.result?.contract?.spec?.name}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Status</H5>
                <p>{contract.status}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>UUID</H5>
                <p>{contract.id}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Execution UUID</H5>
                <p>{contract.executionId}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Group UUID</H5>
                <p>{contract.groupId}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Scope UUID</H5>
                <p><ColorLink to={`/scopes/${contract?.scopeUuid}`}>{contract?.scopeUuid}</ColorLink></p>
              </HorizontalTableRow>

              {contract?.blockHeight && <HorizontalTableRow>
                <H5>Block Height</H5>
                <p>{contract?.blockHeight}</p>
              </HorizontalTableRow>}

              {contract?.transactionHash && <HorizontalTableRow>
                <H5>Transaction Hash</H5>
                <p>{contract?.transactionHash}</p>
              </HorizontalTableRow>}

            </HorizontalTable>

            <H4>Contract Details</H4>

            <HorizontalTable>
              <HorizontalTableRow>
                <H5>Contract Class</H5>
                <Pre padding="15px 0">{contract?.data?.result?.contract?.definition?.resourceLocation?.classname}</Pre>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Contract Jar Hash</H5>
                <Pre padding="15px 0">{contract?.data?.result?.contract?.definition?.resourceLocation?.ref?.hash}</Pre>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Proto Hash</H5>
                <Pre padding="15px 0">{contract?.data?.result?.contract?.spec?.dataLocation?.ref?.hash}</Pre>
              </HorizontalTableRow>
            </HorizontalTable>
          </Card>
          <Card>
            <H4>Timing</H4>
            <ContractTimeChart contract={contract} />

            <HorizontalTable>
              <HorizontalTableRow>
                <H4>Total Time</H4>
                <p>{isNaN(totalTimeS) ? 'N/A' : `${totalTimeS} seconds`}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Created Time</H5>
                <p>{formatDatetime(contract.createdTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Signed Time</H5>
                <p>{formatDatetime(contract.signedTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Chaincode Time</H5>
                <p>{formatDatetime(contract.chaincodeTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Inbox Time</H5>
                <p>{formatDatetime(contract.inboxTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Executed Time</H5>
                <p>{formatDatetime(contract.executedTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Read Time</H5>
                <p>{formatDatetime(contract.readTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Outbound Time</H5>
                <p>{formatDatetime(contract.outboundTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Index Time</H5>
                <p>{formatDatetime(contract.indexTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Complete Time</H5>
                <p>{formatDatetime(contract.completeTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Error Time</H5>
                <p>{formatDatetime(contract.errorTime)}</p>
              </HorizontalTableRow>

              <HorizontalTableRow>
                <H5>Fragment Time</H5>
                <p>{formatDatetime(contract.fragmentTime)}</p>
              </HorizontalTableRow>
            </HorizontalTable>
          </Card>
      </Grid>

      {contract?.data?.errors?.length > 0 && <Card>
        <H4>Errors</H4>

        {contract.data.errors.map((error, idx) => <Callout key={`error-${idx}`}>{error.message}</Callout>)}
      </Card>}

      {contract?.data?.result?.contract?.conditions?.length > 0 && <>
        <FlexContainer justifyContent="space-between" alignItems="center">
          <FlexItem>
            <H2>Prerequisites</H2>
          </FlexItem>
          <FlexItem>
            <SearchBar searchTerm={searchTerm} searchChanged={searchChanged} debounceTime={100} />
          </FlexItem>
        </FlexContainer>
        <Card>
          {filteredConditions.length > 0 && <Table headers={[
            { key: 'name', value: 'Name' },
            { key: 'result', value: 'Result' },
            { key: 'hash', value: 'Hash' },
          ]} secondary>
            {filteredConditions?.map((condition, conditionIndex) => <TableRow onClick={linkFromProposedFact(condition.result.output, `Prerequisite: ${condition.conditionName} output`)} key={`condition-${conditionIndex}`}>
              <TD>{condition.conditionName}</TD>
              <TD>{condition.result.result}</TD>
              <TD>{condition.result.output.hash}</TD>
            </TableRow>)}
          </Table>}
          {filteredConditions.length === 0 && <Callout>No Prerequisite names or results match search term</Callout>}
        </Card>
      </>}

      {contract?.data?.result?.contract?.inputs?.length > 0 && <>
        <FlexContainer justifyContent="space-between" alignItems="center">
          <FlexItem><H2>Facts</H2></FlexItem>
          <FlexItem><SearchBar searchTerm={searchTerm} searchChanged={searchChanged} debounceTime={100} /></FlexItem>
        </FlexContainer>
        <Card>
          {filteredInputs.length > 0 && <Table headers={[
            { key: 'name', value: 'Name' },
            { key: 'hash', value: 'Hash' },
          ]} secondary>
            {filteredInputs?.map((input, inputIndex) => <TableRow onClick={linkFromInputElement(input, `Fact: ${input.name}`)} key={`input-${inputIndex}`}>
              <TD>{input.name}</TD>
              <TD>{input.dataLocation.ref.hash}</TD>
            </TableRow>)}
          </Table>}
          {filteredInputs.length === 0 && <Callout>No Fact names match search term</Callout>}
        </Card>
      </>}

      {contract?.data?.result?.contract?.considerations?.length > 0 && <>
        <FlexContainer justifyContent="space-between" alignItems="center">
          <FlexItem><H2>Considerations</H2></FlexItem>
          <FlexItem><SearchBar searchTerm={searchTerm} searchChanged={searchChanged} debounceTime={100} /></FlexItem>
        </FlexContainer>
        {filteredConsiderations.map((consideration, considerationIndex) => <Fragment key={`consideration-${considerationIndex}`}>
          <CardHeader>{consideration.considerationName}</CardHeader>
          <Card>
            {
              consideration.result?.result === ResultEnum.Skip
              ? `Consideration result: ${consideration.result.result}`
              : <>
                  <H4>Inputs</H4>
                  <Table headers={[
                    { key: 'name', value: 'Name' },
                    { key: 'hash', value: 'Hash' },
                  ]} secondary>
                    {consideration.inputs?.map((input, inputIndex) => <TableRow onClick={linkFromProposedFact(input, `Consideration: ${consideration.considerationName}`, `Input: ${input.name}`)} key={`input-${input.name}-${considerationIndex}-${inputIndex}`}>
                      <TD>{input.name}</TD>
                      <TD>{input.hash}</TD>
                    </TableRow>)}
                  </Table>

                  <H4>Output</H4>
                  {consideration.result.output && <Table headers={[
                      { key: 'name', value: 'Name' },
                      { key: 'hash', value: 'Hash' },
                    ]} secondary>
                    <TableRow onClick={linkFromProposedFact(consideration.result.output, `Consideration: ${consideration.considerationName}`, `Output: ${consideration.result.output.name}`)}>
                      <TD>{consideration.result.output.name}</TD>
                      <TD>{consideration.result.output.hash}</TD>
                    </TableRow>
                  </Table>}
                </>
            }
          </Card>
        </Fragment>)}
        {filteredConsiderations.length === 0 && <Callout>No Considerations, Consideration inputs or Consideration output names match search term</Callout>}
      </>}

      <ObjectModal object={object} onClose={clearObject} {...objectMeta} />

      <H2>Recitals</H2>
      <Card>
        <Table headers={[
          { key: 'role', value: 'Role' },
          { key: 'public key', value: 'Public Key' },
        ]} secondary>
            {contract.data?.result?.contract?.recitals?.map((recital, idx) => <TableRow key={`recital-${idx}`}>
              <TD>{recital.signerRole}</TD>
              <TD>{recital.signer.signingPublicKey.publicKeyBytes}</TD>
            </TableRow>)}
        </Table>
      </Card>
    </>
  );
};

export default Contract;