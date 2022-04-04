import {useQuery, UseQueryOptions} from 'react-query';

import {UserApi} from '../api/userApi';
import {User} from '../models/user';

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
