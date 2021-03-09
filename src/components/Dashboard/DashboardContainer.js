import React from 'react';

import PageLayout from 'components/Layout/PageLayout';
import { useDashboard } from 'hooks';
import { IndeterminateProgressBar } from 'components/ProgressBar';
import Dashboard from './Dashboard';

const DashboardContainer = () => {
  const { fetchingContracts, ...envelopeData } = useDashboard();

  return (
    <PageLayout>
      <Dashboard {...envelopeData} />
      {fetchingContracts && <IndeterminateProgressBar fixed={true} />}
    </PageLayout>
  );
};

export default DashboardContainer;
