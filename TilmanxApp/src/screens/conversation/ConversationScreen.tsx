import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {useMessagesByConversationQuery} from '../../hooks/useMessageQuery';
import {useConversationQuery} from '../../hooks/useConversationQuery';
import {AppBar} from '../../components/AppBar/AppBar';
import {MessageList} from '../../components/MessageList/MessageList';

export const ConversationScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Conversation'>
> = ({route}) => {
  const conversationId = route.params.conversationId;
  const conversationQuery = useConversationQuery(conversationId);
  const messagesQuery = useMessagesByConversationQuery(
    route.params.conversationId,
  );
  const messages = messagesQuery.data || [];

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        {renderAppBar()}
        <MessageList messages={messages} style={styles.messages} />
      </View>
    );
  };

  const renderAppBar = (): React.ReactElement => {
    const title = conversationQuery.data?.addressee || '';
    return <AppBar title={title} />;
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    paddingHorizontal: 25,
  },
});
