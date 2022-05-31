import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {
  useCreateMessageMutation,
  useMessagesByConversationQuery,
} from '../../hooks/useMessageQuery';
import {useConversationQuery} from '../../hooks/useConversationQuery';
import {AppBar} from '../../components/AppBar/AppBar';
import {MessageList} from '../../components/MessageList/MessageList';
import {ChatInput} from '../../components/ChatInput/ChatInput';
import {useUserMeQuery} from '../../hooks/useUserQuery';

export const ConversationScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Conversation'>
> = ({route}) => {
  const conversationId = route.params.conversationId;
  const userMeQuery = useUserMeQuery();
  const userId = userMeQuery.data?.id || NaN;
  const conversationQuery = useConversationQuery(conversationId);
  const messagesQuery = useMessagesByConversationQuery(
    route.params.conversationId,
  );
  const messages = messagesQuery.data || [];
  const createMessageMutation = useCreateMessageMutation({
    onSuccess: _message => {
      setInputValue('');
    },
  });
  const [inputValue, setInputValue] = useState('');

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        {renderAppBar()}
        <MessageList
          messages={messages}
          style={styles.messages}
          userId={userId}
          extraData={userId}
          refreshing={messagesQuery.isFetching}
          onRefresh={() => messagesQuery.refetch()}
        />
        <ChatInput
          value={inputValue}
          placeholder="Type here ..."
          style={styles.input}
          onChangeText={setInputValue}
          onSubmitEditing={_props =>
            createMessageMutation.mutate({
              conversation: conversationId,
              message: inputValue,
            })
          }
        />
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
  input: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
