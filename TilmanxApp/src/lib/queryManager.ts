import {QueryClient} from 'react-query';

import {Message} from '../models/message';

export class QueryManager {
  public static getConversationMessagesKey(conversationId: number) {
    return ['messages', 'by_conversation', conversationId];
  }

  public static getConversationsKey() {
    return ['conversations'];
  }

  public static mergeConversationMessages(
    queryClient: QueryClient,
    conversationId: number,
    messages: ReadonlyArray<Message>,
  ) {
    queryClient.setQueryData(
      this.getConversationMessagesKey(conversationId),
      previousMessages => [
        ...(previousMessages as ReadonlyArray<Message>),
        ...messages,
      ],
    );
  }

  public static invalidateConversations(queryClient: QueryClient) {
    queryClient.invalidateQueries(this.getConversationsKey());
  }
}
