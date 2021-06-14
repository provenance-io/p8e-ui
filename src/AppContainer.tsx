import React from 'react';
import App from 'App';
import { ErrorCardContainer } from 'components/ErrorCards';

export const AppContainer = () => {
    return (<>
        <App />
        <ErrorCardContainer />
    </>);
}