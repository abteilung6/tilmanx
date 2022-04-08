import {useMutation, UseMutationOptions} from 'react-query';

import {
  AuthApi,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
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

export const useRegisterMutation = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, Error, RegisterRequest>,
    'mutationFn'
  >,
) =>
  useMutation<RegisterResponse, Error, RegisterRequest>(async variables => {
    const {data} = await new AuthApi().register(variables);
    return data;
  }, options);
