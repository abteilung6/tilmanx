import {useMutation, UseMutationOptions} from 'react-query';

import {
  AuthApi,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../api/authApi';

export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginRequest>,
    'mutationFn'
  >,
) =>
  useMutation<LoginResponse, Error, LoginRequest>(async variables => {
    const {data} = await new AuthApi().login(variables);
    return data;
  }, options);

export const useRefreshTokenMutation = (
  options?: Omit<
    UseMutationOptions<RefreshTokenResponse, Error, RefreshTokenRequest>,
    'mutationFn'
  >,
) =>
  useMutation<RefreshTokenResponse, Error, RefreshTokenRequest>(
    async variables => {
      const {data} = await new AuthApi().refresh(variables);
      return data;
    },
    options,
  );
