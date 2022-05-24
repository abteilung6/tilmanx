import React, {createContext, useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';

import {EnvironmentConfig} from '../../lib/environment';
import {useAuthentication} from '../authentication/useAuthentication';

export interface SocketContextProps {
  connected: boolean;
}

export const SocketContext = createContext<SocketContextProps>({
  connected: false,
});

export interface SocketProviderProps {
  children?: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const {accessToken} = useAuthentication();
  const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    if (accessToken && !isConnected()) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (websocket) {
      websocket.onopen = () => {
        console.debug('[SocketProvider] Open');
      };
      websocket.onerror = error => {
        console.warn('[SocketProvider] ', error);
      };
    }
  }, [websocket]);

  const connect = useCallback(() => {
    if (accessToken) {
      const uri = `${EnvironmentConfig.socket_url}?token=${accessToken}`;
      console.debug('[SocketProvider] Connecting');
      setWebsocket(new WebSocket(uri));
    }
  }, [accessToken]);

  const disconnect = useCallback(() => {
    if (websocket) {
      console.debug('[SocketProvider] Disconnecting');
      websocket.close();
      setWebsocket(undefined);
    }
  }, [websocket]);

  const isConnected = useCallback(() => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      return true;
    } else {
      return false;
    }
  }, [websocket]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.debug('[SocketProvider] App has come to the foreground!');
      } else {
        console.debug('[SocketProvider] App has come to the background!');
        disconnect();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [disconnect]);

  return (
    <SocketContext.Provider value={{connected: isConnected()}}>
      {children}
    </SocketContext.Provider>
  );
};
