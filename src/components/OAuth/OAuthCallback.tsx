import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { parseParams } from 'helpers/params';
import { Loader } from 'components/Loader/Loader';
import { oauthTokenExchange } from 'actions/identity-actions';

const OAuthCallback = ({ location, history }) => {
    const { code, state } = parseParams(location.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(oauthTokenExchange(code, state)).catch(() => history.push('/'))
    }, [code, state, dispatch, history])

    return <Loader solidBackground />
}

export default withRouter(OAuthCallback);