import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Message} from '../../models/message';
import {defaultTheme} from '../../styles/theme';

export interface MessageListEntryProps {
  message: Message;
}

export const MessageListEntry: React.FC<MessageListEntryProps> = ({
  message,
}) => {
  const render = (): React.ReactElement => {
    if (message.isSender) {
      return renderSenderMessage();
    } else {
      return renderRecipientMessage();
    }
  };

  const renderSenderMessage = (): React.ReactElement => {
    return (
      <View style={[styles.container, styles.senderView]}>
        <Text style={[defaultTheme.typography.subtitle2, styles.senderText]}>
          {message.message}
        </Text>
      </View>
    );
  };

  const renderRecipientMessage = (): React.ReactElement => {
    return (
      <View style={[styles.container, styles.recipientView]}>
        <Text style={[defaultTheme.typography.subtitle2, styles.recipientText]}>
          {message.message}
        </Text>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  senderView: {
    borderBottomRightRadius: 0,
    alignSelf: 'flex-end',
    backgroundColor: defaultTheme.solidColors.blue,
  },
  recipientView: {
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start',
    backgroundColor: defaultTheme.solidColors.lightGray,
  },
  senderText: {
    color: defaultTheme.solidColors.white,
  },
  recipientText: {
    color: defaultTheme.solidColors.black,
  },
});
