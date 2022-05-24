import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {AuthenticationProvider} from './hooks/authentication/AuthenticationProvider';
import {SocketProvider} from './hooks/socket/SocketProvider';
import {Navigation} from './navigation';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <SocketProvider>
          <Navigation />
        </SocketProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default App;
