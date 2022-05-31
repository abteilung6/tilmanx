import {useContext} from 'react';

import {LoginRequest} from '../../api/authApi';
import {AuthenticationContext} from './AuthenticationProvider';

export interface useAuthenticationResult {
  isLoggedIn: boolean | undefined;
  loading: boolean | undefined;
  accessToken: string | undefined;
  login: (loginRequest: LoginRequest) => void;
  logout: () => void;
}

export const useAuthentication = (): useAuthenticationResult => {
  const {isLoggedIn, loading, accessToken, login, logout} = useContext(
    AuthenticationContext,
  );

  return {isLoggedIn, loading, accessToken, login, logout};
};
