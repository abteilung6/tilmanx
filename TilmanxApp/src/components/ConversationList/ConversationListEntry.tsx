import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {formatDistance} from 'date-fns';

import {Conversation} from '../../models/conversation';
import {defaultTheme} from '../../styles/theme';
import {Avatar} from '../Avatar/Avatar';

export interface ConversationListEntryProps {
  conversation: Conversation;
  onPress?: (Conversation: Conversation) => void;
}

export const ConversationListEntry: React.FC<ConversationListEntryProps> = ({
  conversation,
  onPress,
}) => {
  const render = (): React.ReactElement => {
    return (
      <Pressable
        style={styles.container}
        onPress={() => onPress && onPress(conversation)}>
        <Avatar size={24} />
        <View style={styles.textView}>
          <View>
            <Text style={[defaultTheme.typography.body2, styles.name]}>
              {conversation.addressee}
            </Text>
            <Text numberOfLines={1} style={defaultTheme.typography.subtitle2}>
              {conversation.latest_message}
            </Text>
          </View>
          <View>
            <Text style={defaultTheme.typography.description1}>
              {conversation.latest_message_at &&
                formatDistance(conversation.latest_message_at, new Date(), {
                  addSuffix: true,
                })}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  textView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 16,
  },
  name: {
    color: defaultTheme.solidColors.black,
  },
});
