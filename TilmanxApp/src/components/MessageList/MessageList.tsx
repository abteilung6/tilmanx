import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

import {Message} from '../../models/message';
import {MessageListEntry} from './MessageListEntry';

export type MessageListProps = Omit<
  FlatListProps<Message>,
  'data' | 'renderItem'
> & {
  messages: ReadonlyArray<Message>;
  /**
   * Set the current user.
   * In order to decide wether it's a sender or recipient message.
   */
  userId: number;
};

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  userId,
  style,
  ...props
}) => {
  const compare = (left: Message, right: Message): number => {
    // created_at descending
    return right.created_at.getTime() - left.created_at.getTime();
  };

  const render = (): React.ReactElement => {
    const _messages = [...messages].sort(compare);

    return (
      <FlatList
        inverted
        data={_messages}
        style={[style]}
        renderItem={({item, index}) => (
          <MessageListEntry key={index} message={item} userId={userId} />
        )}
        {...props}
      />
    );
  };

  return render();
};
