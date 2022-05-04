import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
} from 'react-query';

import {ConversationApi} from '../api/conversationApi';
import {UserApi} from '../api/userApi';
import {Conversation} from '../models/conversation';

export const useConversationsQuery = (
  options?: UseQueryOptions<ReadonlyArray<Conversation>>,
) => {
  return useQuery<ReadonlyArray<Conversation>>(
    ['conversations'],
    async () => {
      const {data} = await new ConversationApi().list();
      return data.map(conversation => new Conversation(conversation));
    },
    {
      ...options,
    },
  );
};

export const useConversationQuery = (
  id: number,
  options?: UseQueryOptions<Conversation>,
) => {
  return useQuery<Conversation>(
    ['conversations', id],
    async () => {
      const {data} = await new ConversationApi().retrieve(id);
      return new Conversation(data);
    },
    {
      ...options,
    },
  );
};

export const useCreateConversationMutation = (
  options?: Omit<UseMutationOptions<Conversation, Error, number>, 'mutationFn'>,
) =>
  useMutation<Conversation, Error, number>(async variables => {
    const {data} = await new UserApi().create_conversation(variables);
    return new Conversation(data);
  }, options);
