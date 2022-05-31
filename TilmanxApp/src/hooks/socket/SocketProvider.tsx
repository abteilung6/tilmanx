import React, {createContext, useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useQueryClient} from 'react-query';

import {EnvironmentConfig} from '../../lib/environment';
import {QueryManager} from '../../lib/queryManager';
import {Friendship, FriendshipProperties} from '../../models/friendship';
import {Message, MessageProperties} from '../../models/message';
import {useAuthentication} from '../authentication/useAuthentication';
import {ReceivedMessageType} from './types';

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
  const queryClient = useQueryClient();

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
      websocket.onmessage = onMessage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websocket]);

  const connect = useCallback(() => {
    if (accessToken) {
      const uri = `${EnvironmentConfig.socket_url}?token=${accessToken}`;
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

  const onMessage = (event: WebSocketMessageEvent) => {
    console.debug('[SocketProvider] received message: ', event.data);
    const obj = JSON.parse(event.data);
    if (obj.type === ReceivedMessageType.CHAT_MESSAGE) {
      const properties = obj.message as MessageProperties;
      const message = new Message(properties);
      QueryManager.mergeMessagesByConversation(
        queryClient,
        message.conversation,
        [message],
      );
      QueryManager.updateConversationsWithMessage(queryClient, message);
    } else if (obj.type === ReceivedMessageType.FRIENDSHIP_MESSAGE) {
      const properties = obj.message as FriendshipProperties;
      const friendship = new Friendship(properties);
      QueryManager.mergeFriendships(queryClient, [friendship]);
    } else {
      console.warn('[SocketProvider] unknown message:', obj);
    }
  };

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
