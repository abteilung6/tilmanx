import {QueryClient} from 'react-query';
import {Friendship} from '../models/friendship';

import {Message} from '../models/message';

export enum StringOnlyQueryKey {
  Conversations = 'conversations',
  Friendships = 'friendships',
  Messages = 'messages',
}

export class QueryManager {
  // Methods for QueryKeys

  public static getFriendshipsKey() {
    return StringOnlyQueryKey.Friendships;
  }

  public static getMessagesByConversationKey(conversationId: number) {
    return [StringOnlyQueryKey.Messages, conversationId];
  }

  // Methods for updating QueryData

  public static mergeMessagesByConversation(
    queryClient: QueryClient,
    conversationId: number,
    messages: ReadonlyArray<Message>,
  ) {
    queryClient.setQueryData<ReadonlyArray<Message> | undefined>(
      this.getMessagesByConversationKey(conversationId),
      existing => this._mergeMessages(existing || [], messages),
    );
  }

  private static _mergeMessages(
    existing: ReadonlyArray<Message>,
    overrides: ReadonlyArray<Message>,
  ): ReadonlyArray<Message> {
    const excludeIds = overrides.map(message => message.id);
    const excluded = existing.filter(
      message => !excludeIds.includes(message.id),
    );
    return [...excluded, ...overrides];
  }

  public static mergeFriendships(
    queryClient: QueryClient,
    friendships: ReadonlyArray<Friendship>,
  ) {
    queryClient.setQueriesData<ReadonlyArray<Friendship> | undefined>(
      this.getFriendshipsKey(),
      existing => this._mergeFriendships(existing || [], friendships),
    );
  }

  private static _mergeFriendships(
    existing: ReadonlyArray<Friendship>,
    overrides: ReadonlyArray<Friendship>,
  ): ReadonlyArray<Friendship> {
    const excludeIds = overrides.map(friendship => friendship.id);
    const excluded = existing.filter(
      friendship => !excludeIds.includes(friendship.id),
    );
    return [...excluded, ...overrides];
  }

  // Methods for invalidating QueryDaTa

  public static invalidateConversations(queryClient: QueryClient) {
    queryClient.invalidateQueries(StringOnlyQueryKey.Conversations);
  }
}
