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

export const useAcceptFriendshipMutation = (
  options?: Omit<UseMutationOptions<Friendship, Error, number>, 'mutationFn'>,
) =>
  useMutation<Friendship, Error, number>(async variables => {
    const {data} = await new FriendshipApi().accept(variables);
    return new Friendship(data);
  }, options);

export const useDeclineFriendshipMutation = (
  options?: Omit<UseMutationOptions<any, Error, number>, 'mutationFn'>,
) =>
  useMutation<any, Error, number>(async variables => {
    const {data} = await new FriendshipApi().decline(variables);
    return data;
  }, options);
