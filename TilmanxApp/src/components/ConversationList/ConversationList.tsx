import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

import {Conversation, ConversationType} from '../../models/conversation';
import {ConversationListEntry} from './ConversationListEntry';

export type ConversationListProps = Omit<
  FlatListProps<Conversation>,
  'data' | 'renderItem'
> & {
  conversations: ReadonlyArray<Conversation>;
  onPress?: (Conversation: Conversation) => void;
};

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onPress,
  ...props
}) => {
  const render = (): React.ReactElement => {
    const _conversations = [...conversations]
      .filter(conversation => conversation.type === ConversationType.Private)
      .filter(conversation => conversation.latest_message_at !== null)
      .sort(Conversation.compare);

    return (
      <FlatList
        data={_conversations}
        renderItem={({item, index}) => (
          <ConversationListEntry
            key={index}
            conversation={item}
            onPress={onPress}
          />
        )}
        {...props}
      />
    );
  };

  return render();
};
