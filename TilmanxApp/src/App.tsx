import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Navigation} from './navigation';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
