import React, { Fragment, FunctionComponent, useState } from 'react';
import { Input, Record, RecordGroup } from 'models/scope';
import { Card, CardHeader } from 'components/Card';
import { Table, TableRow, TD } from 'components/Table';
import { LinkableObject } from 'hooks';
import { ObjectModal } from 'components/Object';
import { SearchBar } from 'components/Form';
import { H2, H3, H4 } from 'components/Text';
import { Callout } from 'components/ErrorCards';
import { FlexContainer, FlexItem } from 'components/Layout/Flex';

type RecordGroupsProps = {
    recordGroups: RecordGroup[];
    publicKey: string;
    object: any;
    fetchObject: (object: LinkableObject) => any;
    clearObject: () => any;
}

export const ScopeRecordGroups: FunctionComponent<RecordGroupsProps> = ({ recordGroups, publicKey, object, fetchObject, clearObject }) => {
    const [objectMeta, setObjectMeta] = useState<{ title: string; subtitle?: string }>({ title: '' });

    const [searchTerm, setSearchTerm] = useState('');
    const searchChanged = (term: string) => {
        setSearchTerm(term.trim().toLowerCase());
    }

    const match = (value?: string) => value?.toLowerCase().includes(searchTerm)

    const recordFilter = (record: Record) => match(record.classname) || record.inputs.some(input => match(input.name) || match(input.classname) || match(input.type)) || match(record.resultName) || match(record.result)

    const linkFromInput = (input: Input, contractSpecHash: string, title: string, subtitle?: string) => () => {
        fetchObject({
            hash: input.hash,
            className: input.classname,
            contractSpecHash,
            publicKey: publicKey
        });
        setObjectMeta({ title, subtitle });
    }

    const linkFromRecord = (record: Record, contractSpecHash: string, title: string, subtitle?: string) => () => {
        fetchObject({
            hash: record.resultHash,
            className: record.classname,
            contractSpecHash,
            publicKey: publicKey
        });
        setObjectMeta({ title, subtitle });
    }

    return <>
        <FlexContainer justifyContent="space-between" alignItems="center">
            <FlexItem><H2>Record Groups</H2></FlexItem>
            <FlexItem><SearchBar searchTerm={searchTerm} searchChanged={searchChanged} /></FlexItem>
        </FlexContainer>

        {recordGroups
            ?.filter(recordGroup => recordGroup.records?.length > 0)
            .map((recordGroup, index) => {
                const filteredRecords = recordGroup.records.filter(recordFilter)
                return <Fragment key={`recordGroup-${index}`}>
                    <H3>{recordGroup.classname}</H3>
                    {filteredRecords.map((record, recordIndex) => <Fragment key={`record-${index}-${recordIndex}`}>
                        <CardHeader>{record.classname}</CardHeader>
                        <Card>
                            <H4>Inputs</H4>
                            <Table headers={[
                                { key: 'name', value: 'Name' },
                                { key: 'type', value: 'Type' },
                                { key: 'hash', value: 'Hash' },
                            ]} secondary>
                                {record.inputs.map((input, inputIdx) => <TableRow onClick={linkFromInput(input, recordGroup.specification, `Input: ${input.name}`)} key={`record-input-${index}-${recordIndex}-${inputIdx}`}>
                                    <TD>{input.name}</TD>
                                    <TD>{input.type}</TD>
                                    <TD>{input.hash}</TD>
                                </TableRow>)}
                            </Table>

                            <H4>Result</H4>
                            <Table headers={[
                                { key: 'name', value: 'Name' },
                                { key: 'result', value: 'Result' },
                                { key: 'hash', value: 'Hash' },
                            ]} secondary>
                                <TableRow onClick={linkFromRecord(record, recordGroup.specification, `Result: ${record.resultName}`)}>
                                    <TD>{record.resultName}</TD>
                                    <TD>{record.result}</TD>
                                    <TD>{record.resultHash}</TD>
                                </TableRow>
                            </Table>
                        </Card>
                    </Fragment>)}
                    {recordGroup.records.length > 0 && filteredRecords.length === 0 && <Callout>No Records in group match search term</Callout>}
                </Fragment>})}

            <ObjectModal object={object} onClose={clearObject} {...objectMeta} />
    </>
}