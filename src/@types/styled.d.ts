import 'styled-components';

declare module 'styled-components' {
    export type ThemeOptions = 'dark' | 'light';

    export interface DefaultTheme {
        mode: ThemeOptions;
        flow: string;
    }
}