import React from 'react';
import { useDispatch } from 'react-redux';
import PageLayout from 'components/Layout/PageLayout';
import styled from 'styled-components';
import { oauthLogin } from 'actions/identity-actions';
import { IconButton } from 'components/Button';
import { currentLocation } from 'helpers/general';
import { Sprite } from 'components/Sprite';
import { useDeepLink } from 'hooks';

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const { location, setDeepLinkLocation } = useDeepLink();

    const handleLogin = () => {
        setDeepLinkLocation(location.pathname);
        dispatch(oauthLogin(currentLocation()))
    };

    return <PageLayout isAuthenticated={false}>
        <Container>
            <IconButton icon={Sprite.Icon.LOGO} onClick={handleLogin} secondary>
                Login with Provenance
            </IconButton>
        </Container>
    </PageLayout>
};