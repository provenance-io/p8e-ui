import React, { FunctionComponent } from 'react';
import { ErrorCards } from './ErrorCards';
import { useErrors } from 'hooks';

export const ErrorCardContainer: FunctionComponent = () => {
    const { errors, clearError } = useErrors();

    return <ErrorCards errors={errors} clearError={clearError} />;
}