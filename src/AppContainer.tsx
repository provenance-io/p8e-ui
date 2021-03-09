import React from 'react';
import { useSelector } from 'react-redux';
import App from 'App';
import { ErrorCardContainer } from 'components/ErrorCards';

export const AppContainer = () => {
    const { jwt } = useSelector(({ identityReducer }) => identityReducer);
    const isAuthenticated = typeof jwt === 'string' && jwt.length > 0;

    return (<>
        <App isAuthenticated={isAuthenticated} />
        <ErrorCardContainer />
    </>);
}