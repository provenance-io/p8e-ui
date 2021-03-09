import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const useColor = <T extends Record<string, Function>>(colors: T): Record<keyof T, string> => {
    const theme = useContext(ThemeContext);

    return Object.entries(colors).reduce((acc, [name, getValue]: [keyof T, Function]) => {
        return {
            ...acc,
            [name]: getValue({ theme })
        };
    }, {} as Record<keyof T, string>);
}