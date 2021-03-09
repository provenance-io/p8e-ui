import React, { useEffect, FunctionComponent, useState } from 'react';
import { NoLabelInput } from './SlimInput';
import { Sprite } from 'components/Sprite';
import { Color } from 'Constant';
import { LinkButton } from 'components/Button';
import { FlexContainer, FlexItem } from 'components/Layout/Flex';

type SimpleUpdateInputProps = {
    id: string;
    value?: string;
    onUpdate: (value: string) => Promise<any>;
} & Record<string, any>;

export const SimpleUpdateInput: FunctionComponent<SimpleUpdateInputProps> = ({ id, value, onUpdate, ...rest }) => {
    const [updatedValue, setUpdatedValue] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setUpdatedValue(value || '');
        setUpdating(false);
    }, [value])

    const handleUpdate = () => {
        setUpdating(true);
        onUpdate(updatedValue)
            .finally(() => setUpdating(false))
    }

    const dirty = (value || '') !== (updatedValue || '');

    return <FlexContainer alignItems="center">
        <FlexItem flexGrow={1}>
            <NoLabelInput value={updatedValue} id={id} onChange={(e) => setUpdatedValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && dirty && handleUpdate()} {...rest} />
        </FlexItem>
        <FlexItem style={{ display: 'flex', alignItems: 'center', marginLeft: dirty ? "10px" : 0, maxWidth: dirty ? '100px' : 0, transition: 'all .5s ease-in-out', overflow: 'hidden', position: 'relative' }}>
            {updating && <Sprite icon={Sprite.Icon.SPINNER} size="20px" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} alt="Updating..." />}
            <LinkButton disabled={!dirty} style={{ color: dirty ? undefined : Color.LIGHT_GREY, opacity: updating ? 0 : 1 }} onClick={handleUpdate}>Update</LinkButton>
        </FlexItem>
    </FlexContainer>
}