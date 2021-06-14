import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardContainer from 'components/Dashboard/DashboardContainer';
import { ContractContainer, ContractListContainer } from 'components/Contract';
import { KeyManagerContainer, AddServiceKeyModal } from 'components/KeyManagement';
import KeyDetailsContainer from 'components/KeyManagement/KeyDetailsContainer';
import { ScopeContainer, ScopeHistoryContainer, ScopeListContainer } from 'components/Scopes';
import { Settings } from 'Constant';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={DashboardContainer} />
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
