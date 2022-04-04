import {UseQueryOptions, useQuery} from 'react-query';

import {FriendshipApi} from '../api/friendshipApi';
import {Friendship} from '../models/friendship';

export const useFriendshipsQuery = (
  options?: UseQueryOptions<ReadonlyArray<Friendship>>,
) => {
  return useQuery<ReadonlyArray<Friendship>>(
    ['friendships'],
    async () => {
      const {data} = await new FriendshipApi().list();
      return data.map(friendship => new Friendship(friendship));
    },
    {
      ...options,
    },
  );
};
