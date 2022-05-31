import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';

import {CreateMessageRequest, MessageApi} from '../api/messageApi';
import {QueryManager} from '../lib/queryManager';
import {Message} from '../models/message';

export const useMessagesByConversationQuery = (
  id: number,
  options?: UseQueryOptions<ReadonlyArray<Message>>,
) => {
  return useQuery<ReadonlyArray<Message>>(
    QueryManager.getMessagesByConversationKey(id),
    async () => {
      const {data} = await new MessageApi().byConversation(id);
      return data.map(message => new Message(message));
    },
    {
      ...options,
    },
  );
};

export const useCreateMessageMutation = (
  options?: Omit<
    UseMutationOptions<Message, Error, CreateMessageRequest>,
    'mutationFn'
  >,
) =>
  useMutation<Message, Error, CreateMessageRequest>(async variables => {
    const {data} = await new MessageApi().post<CreateMessageRequest>(variables);
    return new Message(data);
  }, options);
