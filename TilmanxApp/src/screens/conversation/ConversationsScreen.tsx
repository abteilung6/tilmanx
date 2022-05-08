import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {useConversationsQuery} from '../../hooks/useConversationQuery';
import {AppBar} from '../../components/AppBar/AppBar';
import {ConversationList} from '../../components/ConversationList/ConversationList';

export const ConversationsScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Conversations'>
> = ({navigation}) => {
  const conversationQuery = useConversationsQuery();
  const conversations = conversationQuery.data || [];

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Messages" />
        {renderConversations()}
      </View>
    );
  };

  const renderConversations = (): React.ReactNode => {
    return (
      <View style={styles.conversations}>
        <ConversationList
          conversations={conversations}
          onPress={conversation =>
            navigation.navigate('Conversation', {
              conversationId: conversation.id,
            })
          }
          refreshing={conversationQuery.isFetching}
          onRefresh={() => conversationQuery.refetch()}
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conversations: {
    marginHorizontal: 25,
  },
});
