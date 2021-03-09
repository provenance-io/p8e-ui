import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { PRIMARY_BACKGROUND } from 'Constant/colors';
import { Sprite } from 'components/Sprite';


const LoaderWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type LoaderBackgroundProps = {
    solidBackground?: boolean;
}

const LoaderBackground = styled.div<LoaderBackgroundProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${PRIMARY_BACKGROUND};
    opacity: ${({ solidBackground }) => solidBackground ? 1 : .5};
`

LoaderBackground.defaultProps = {
    solidBackground: false,
}

const logoAnimation = keyframes`
    from {
        opacity: 1;
    }

    50% {
        opacity: .2;
    }

    100% {
        opacity: 1;
    }
`;

const LogoWrapper = styled.div`
    display: inline-block;
    animation: ${logoAnimation} 2s linear infinite;
`;

const Logo = () => <Sprite icon={Sprite.Icon.LOGO} size="100px" alt="Provenance Logo" />;

interface LoaderProps {
    isLoading?: boolean;
    solidBackground?: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ isLoading = true, solidBackground = false }) => {
    return isLoading ? <LoaderWrapper>
        <LoaderBackground solidBackground={solidBackground} />
        <LogoWrapper >
            <Logo />
        </LogoWrapper>
    </LoaderWrapper> : null
}