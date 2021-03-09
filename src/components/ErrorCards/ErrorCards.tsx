import React, { FunctionComponent, useEffect } from 'react';
import { ErrorLevels } from 'actions/error-actions';
import styled from 'styled-components';
import { Callout } from './Callout';

interface Error {
    message: string;
    level: ErrorLevels;
    id: number;
}

type ErrorCardProps = {
    clearError: (id: number) => void;
} & Error;

const type = (level: ErrorLevels) => {
    switch (level) {
        case ErrorLevels.ERROR:
            return 'error';
        case ErrorLevels.WARNING:
            return 'warning';
    }
}

export const ErrorCard: FunctionComponent<ErrorCardProps> = ({message, level, id, clearError}) => {
    useEffect(() => {
        setTimeout(() => clearError(id), 3000)
    }, [id, clearError])

    return <Callout type={type(level)}>{message}</Callout>
}

const ErrorCardWrapper = styled.div`
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 1000;
`

interface ErrorCardsProps {
    errors: Error[];
    clearError: (id: number) => void;
}

export const ErrorCards: FunctionComponent<ErrorCardsProps> = ({ errors, clearError }) => (<ErrorCardWrapper>
    {errors.map((error, index) => <ErrorCard key={`error-${error.id}`} clearError={clearError} {...error} />)}
</ErrorCardWrapper>)