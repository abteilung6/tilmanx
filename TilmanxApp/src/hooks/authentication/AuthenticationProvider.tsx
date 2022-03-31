import React, {createContext, useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LoginRequest} from '../../api/authApi';
import {useLoginMutation, useRefreshTokenMutation} from '../useAuthQuery';

export interface AuthenticationContextProps {
  /**
   * Defines wether the user is logged in or not.
   * Undefined means not initialized.
   */
  isLoggedIn: boolean | undefined;
  loading: boolean | undefined;
  login: (loginRequest: LoginRequest) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  isLoggedIn: undefined,
  login: () => undefined,
  logout: () => undefined,
  loading: undefined,
});

export interface AuthenticationProviderProps {
  children?: React.ReactNode;
}

export const accessTokenKey = '@tilmanx/access-token';
export const refreshTokenKey = '@tilmanx/refresh-token';

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  const loginMutation = useLoginMutation({
    onSuccess: data => {
      AsyncStorage.setItem(accessTokenKey, data.access);
      AsyncStorage.setItem(refreshTokenKey, data.refresh);
      setIsLoggedIn(true);
    },
  });
  const refreshTokenMutation = useRefreshTokenMutation({
    onSuccess: data => {
      AsyncStorage.setItem(accessTokenKey, data.access);
      setIsLoggedIn(true);
    },
    onError: _error => {
      AsyncStorage.removeItem(refreshTokenKey);
      AsyncStorage.removeItem(accessTokenKey);
      setIsLoggedIn(false);
    },
  });

  const login = useCallback(
    (loginRequest: LoginRequest) => {
      loginMutation.mutate(loginRequest);
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    AsyncStorage.removeItem(refreshTokenKey);
    AsyncStorage.removeItem(accessTokenKey);
    setIsLoggedIn(false);
  }, []);

  const onMount = useCallback(async () => {
    const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
    if (refreshToken) {
      refreshTokenMutation.mutate({refresh: refreshToken});
    } else {
      AsyncStorage.removeItem(accessTokenKey);
      setIsLoggedIn(false);
    }
  }, [refreshTokenMutation]);

  /**
   * Subcribe `AppState` in order to initilize the `isLoggedIn` state.
   */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.info('App has come to the foreground!');
        onMount();
      } else {
        console.info('App has come to the background!');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onMount]);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        loading: loginMutation.isLoading,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
