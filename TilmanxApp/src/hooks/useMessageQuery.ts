import {useQuery, UseQueryOptions} from 'react-query';

import {MessageApi} from '../api/messageApi';
import {UserApi} from '../api/userApi';
import {Message} from '../models/message';

export const useMessagesByConversationQuery = (
  id: number,
  options?: UseQueryOptions<ReadonlyArray<Message>>,
) => {
  return useQuery<ReadonlyArray<Message>>(
    ['messages', 'by_conversation', id],
    async () => {
      const [{data: userData}, {data: messagesData}] = await Promise.all([
        new UserApi().me(),
        new MessageApi().byConversation(id),
      ]);

      return messagesData.map(message => new Message(message, userData.id));
    },
    {
      ...options,
    },
  );
};
