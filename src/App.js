import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardContainer from 'components/Dashboard/DashboardContainer';
import { ContractContainer, ContractListContainer } from 'components/Contract';
import { LoginContainer } from 'components/Login';
import { KeyManagerContainer, AddServiceKeyModal } from 'components/KeyManagement';
import { OAuthCallback } from 'components/OAuth';
import KeyDetailsContainer from 'components/KeyManagement/KeyDetailsContainer';
import { ScopeContainer, ScopeHistoryContainer, ScopeListContainer } from 'components/Scopes';
import { Settings } from 'Constant';
import { useDeepLink } from 'hooks';

const App = ({ isAuthenticated }) => {
  const { performDeepLink } = useDeepLink();

  useEffect(() => {
    if (isAuthenticated) {
      performDeepLink();
    }
  }, [isAuthenticated, performDeepLink]);

  if (!isAuthenticated) {
    return (
      <>
        <Switch>
          <Route exact path="/oauth/callback" component={OAuthCallback} />
        </Switch>
        <LoginContainer />
      </>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={DashboardContainer} />
        {/* <Route exact path="/login" component={LoginContainer} /> */}
        {/* <Route exact path="/register" component={RegisterContainer} /> */}
        <Route exact path="/contracts/:uuid" component={ContractContainer} />
        <Route exact path="/contracts" component={ContractListContainer} />
        <Route exact path="/scopes/:scopeUuid/history/:uuid" component={ScopeHistoryContainer} />
        <Route exact path="/scopes/:scopeUuid" component={ScopeContainer} />
        <Route exact path="/scopes" component={ScopeListContainer} />
        <Route exact path="/key-management" component={KeyManagerContainer} />
        <Route exact path="/key-management/:keyType/:publicKey" component={KeyDetailsContainer} />
        <Redirect to="/" />
      </Switch>
      {Settings.serviceKey && <AddServiceKeyModal />}
    </>
  );
};

export default App;
