import {
  UseQueryOptions,
  useQuery,
  UseMutationOptions,
  useMutation,
} from 'react-query';

import {
  FriendshipApi,
  UpstreamCreateFriendshipProperties,
} from '../api/friendshipApi';
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

export const useCreateFriendshipMutation = (
  options?: Omit<
    UseMutationOptions<Friendship, Error, UpstreamCreateFriendshipProperties>,
    'mutationFn'
  >,
) =>
  useMutation<Friendship, Error, UpstreamCreateFriendshipProperties>(
    async variables => {
      const {data} =
        await new FriendshipApi().post<UpstreamCreateFriendshipProperties>(
          variables,
        );
      return new Friendship(data);
    },
    options,
  );
