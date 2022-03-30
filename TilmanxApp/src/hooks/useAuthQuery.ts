import {useMutation, UseMutationOptions} from 'react-query';

import {AuthApi, LoginRequest, LoginResponse} from '../api/authApi';

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
