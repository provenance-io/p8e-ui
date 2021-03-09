import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import * as Font from 'Constant/font';
import { SpriteSheet } from 'components/Sprite';

const Style = createGlobalStyle`
    ${styledNormalize}

    html {
        font-size: 62.5%;
    }
    html, *, ::after, ::before {
        box-sizing: border-box;
    }
    body {
        font-size: 10px;
        font-family: ${Font.MONTSERRAT};
    }
    h1, h2, h3, h4, body {
        font-family: ${Font.MONTSERRAT};
        letter-spacing: 0.04em;
        line-height: 155%;
        font-weight: 400;    
    }
    h1 {
        font-size: 2.8rem;
        line-height: 3.4rem;
    }
    h2 {
        font-size: 2.0rem;
    }
    h3 {
        font-size: 1.8rem;
    }
    h4 {
        font-size: 1.4rem;
    }
    h5 {
        font-size: 1.2rem;
    }
    p {
        font-size: 1.4rem;
    }
    p.bold {
        font-weight: 700;
    }
    p.small {
        font-size: 1.2rem;
    }
    a {
        text-decoration: none;
    }
`

export const GlobalStyle = () => <>
    <Style />
    <SpriteSheet />
</>