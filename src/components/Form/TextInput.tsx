import React, { CSSProperties, FunctionComponent } from 'react';
import { Input } from './Input';
import { InputGroup } from './InputGroup';
import { Label } from './Label';
import { Error } from './Error';

type TextInputProps = {
    /** The classname */
    className?: string;
    /** Whether or not the input is disabled */
    disabled?: boolean;
    /** Used for validation */
    errorText?: string;
    /** The id for the input */
    id: string;
    /** The label for the input */
    label?: string;
    /** Function used to update the value prop */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /** If the field is required */
    required?: boolean;
    /** Removes padding and margins to compress the input. No label rendered. */
    thin?: boolean;
    /** Value that controls the input */
    value?: string;
    /** A placeholder value to display when input is empty */
    placeholder?: string;
    style?: CSSProperties;
    onKeyDown?: React.KeyboardEventHandler;
}

export const TextInput: FunctionComponent<TextInputProps> = ({ className, disabled, id, label, value, errorText, onChange, required, thin, ...rest }) => {
    const inputProps = {
        ...rest,
        errorText,
        disabled,
        id,
        onChange,
        required,
        value,
        type: 'text',
    };

    return (
        <InputGroup {...{ className, disabled, errorText, thin }}>
            <Label htmlFor={id}>{`${label}${required ? '*' : ''}`}</Label>
            <Input {...inputProps} />
            <Error>{errorText}</Error>
        </InputGroup>
    );
};


TextInput.defaultProps = {
    className: '',
    disabled: false,
    errorText: '',
    label: '',
    required: false,
    thin: false,
    value: '',
};