import {useQuery, UseQueryOptions} from 'react-query';

import {UserApi, UserSearchParams} from '../api/userApi';
import {User} from '../models/user';

export const useUserSearchQuery = (
  searchParams: UserSearchParams,
  options?: UseQueryOptions<ReadonlyArray<User>>,
) => {
  return useQuery<ReadonlyArray<User>>(
    ['users', searchParams],
    async () => {
      const {data} = await new UserApi().search(searchParams);
      return data.map(user => new User(user));
    },
    {
      ...options,
    },
  );
};

export const useUserMeQuery = (options?: UseQueryOptions<User>) => {
  return useQuery<User>(
    ['user'],
    async () => {
      const {data} = await new UserApi().me();
      return new User(data);
    },
    {
      ...options,
    },
  );
};
