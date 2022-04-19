import {UseQueryOptions, useQuery} from 'react-query';

import {ConversationApi} from '../api/conversationApi';
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
