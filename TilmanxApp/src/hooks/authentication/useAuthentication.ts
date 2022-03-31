import {useContext} from 'react';

import {LoginRequest} from '../../api/authApi';
import {AuthenticationContext} from './AuthenticationProvider';

export interface useAuthenticationResult {
  isLoggedIn: boolean | undefined;
  login: (loginRequest: LoginRequest) => void;
  logout: () => void;
  loading: boolean | undefined;
}

export const useAuthentication = (): useAuthenticationResult => {
  const {isLoggedIn, login, logout, loading} = useContext(
    AuthenticationContext,
  );

  return {isLoggedIn, login, logout, loading};
};
